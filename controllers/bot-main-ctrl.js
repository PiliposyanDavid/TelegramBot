const logger = require('log4js').getLogger('BotMainCtrl.srv');

module.exports = function BotMainCtrl(mainBotService, chatsService, jokesService, settings) {
    this.handleMessages = handleMessages;
    this.startJob = startJob;

    async function handleMessages(req, res) {
        try {
            const chatId = req.body.message.chat.id;
            const userId = +req.body.message.from.id;
            const firstName = req.body.message.from.first_name;
            const lastName = req.body.message.from.last_name;
            let sentMessage = req.body.message.text;
            let username = req.body.message.from.username;

            if (!username) username = `${firstName} ${lastName}`;
            sentMessage = sentMessage.trim();
            logger.info("info message", sentMessage);

            await chatsService.createIfNotExists(chatId, firstName, lastName, userId, username);
            await chatsService.addMessage(chatId, sentMessage);

            if (settings.ADMIN_USERS_IDS.includes(userId)) {
                return await handleAdminQueries();
            }

            if (sentMessage === "/start") {
                return await handleInitialCase();
            }

            if (sentMessage === "/stop") {
                return await stopBotForUser();
            }

            if (sentMessage === "/over18") {
                return await changeUserToOver18();
            }

            if (sentMessage === "/cancel_over18") {
                return await changeUserToLow18();
            }

            if (sentMessage.includes('/joke')) {
                return await addJokeToReview()
            }

            return await unknownCase();

            async function unknownCase() {
                await mainBotService.sendMessageToAllAdminsChat(settings.messages.unknown_user_message(username, sentMessage, chatId, userId));
                await mainBotService.sendMessageToChat(chatId, settings.messages.unknown_case);
                return res.status(200).send({statusText: "OK"});
            }

            async function handleInitialCase() {
                await mainBotService.sendMessageToAllAdminsChat(settings.messages.join_to_bot(username, userId));
                await mainBotService.sendMessageToChat(chatId, settings.messages.initial_case(firstName));
                return res.status(200).send({statusText: "OK"});
            }

            async function stopBotForUser() {
                await chatsService.removeChatByUserId(userId);
                await mainBotService.sendMessageToAllAdminsChat(settings.messages.success_stop_for_user(username, userId));
                await mainBotService.sendMessageToChat(chatId, settings.messages.success_stop_request(firstName));
                return res.status(200).send({statusText: "OK"});
            }

            async function changeUserToOver18() {
                await chatsService.updateUserOver18(chatId, true);
                await mainBotService.sendMessageToChat(chatId, settings.messages.change_over18);
                await mainBotService.sendMessageToAllAdminsChat(settings.messages.request_to_over18(username, chatId));
                return res.status(200).send({statusText: "OK"});
            }

            async function changeUserToLow18() {
                await chatsService.updateUserOver18(chatId, false);
                await mainBotService.sendMessageToChat(chatId, settings.messages.change_low18);
                await mainBotService.sendMessageToAllAdminsChat(settings.messages.request_to_low18(username, chatId));
                return res.status(200).send({statusText: "OK"});
            }

            async function addJokeToReview() {
                const text = sentMessage.replace('/joke', "");
                if (!text) {
                    await mainBotService.sendMessageToChat(chatId, settings.messages.joke_without_text(firstName));
                    return res.status(200).send({statusText: "OK"});
                }

                const joke = await jokesService.addJokeToReviewedJokesList(text, userId, chatId);
                await mainBotService.sendMessageToChat(chatId, settings.messages.joke_to_review(firstName));
                await mainBotService.sendMessageToAllAdminsChat(settings.messages.request_to_create_joke(username, userId, joke.text, joke._id));
                return res.status(200).send({statusText: "OK"});
            }


            async function handleAdminQueries() {
                if (sentMessage.includes("/333")) {
                    try {
                        await mainBotService.runJob();
                    } catch (err) {
                        logger.error("Error in job !!!", err);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.joke_show_error(err));
                        return res.status(200).send({statusText: "OK"});
                    }

                    await mainBotService.sendMessageToChat(chatId, settings.messages.joke_show_success(firstName));
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/joke')) {
                    const over18 = sentMessage.includes('/18');
                    let text = sentMessage.replace('/joke', "");
                    text = text.replace('/18', "");

                    if (!text) {
                        await mainBotService.sendMessageToChat(chatId, settings.messages.joke_without_text(firstName));
                        return res.status(200).send({statusText: "OK"});
                    }

                    await jokesService.addJoke(text, over18, userId);

                    await mainBotService.sendMessageToChat(chatId, settings.messages.admin_joke_to_review(firstName));
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/remove_from_over18_')) {
                    let chatIdFromText = sentMessage.replace('/remove_from_over18_', "");
                    try {
                        chatIdFromText = parseInt(chatIdFromText);

                        await chatsService.updateUserOver18(chatIdFromText, false);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.success_removing_user(chatIdFromText));
                    } catch (e) {
                        logger.error("cant parse userId to number", e);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.error_removing_user(e, sentMessage));
                    }
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/approve_user_created_joke_')) {
                    try {
                        let jokeIdFromText = null;
                        let over18 = null;

                        if (sentMessage.includes("over18")) {
                            jokeIdFromText = sentMessage.replace('/approve_user_created_joke_over18_', "");
                            over18 = true;
                        } else {
                            jokeIdFromText = sentMessage.replace('/approve_user_created_joke_low18_', "");
                            over18 = false;
                        }

                        await jokesService.approveReviewedJoke(jokeIdFromText, over18);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.success_approve_joke());
                    } catch (e) {
                        logger.error("cant approve joke", e);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.error_approving_joke(e, sentMessage));
                    }
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/remove_user_created_joke_')) {
                    try {
                        let jokeIdFromText = sentMessage.replace('/remove_user_created_joke_', "");

                        await jokesService.rejectJoke(jokeIdFromText);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.success_reject_joke());
                    } catch (e) {
                        logger.error("cant rejecting joke", e);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.error_rejecting_joke(e, sentMessage));
                    }
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/remove_user_')) {
                    let userId = sentMessage.replace('/remove_user_', "");
                    try {
                        userId = parseInt(userId);
                        await chatsService.removeChatByUserId(userId);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.success_removing_user(userId));
                    } catch (e) {
                        logger.error("cant parse userId to number", e);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.error_removing_user(e, sentMessage));

                    }
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/get_messages_')) {
                    let messagesChatId = sentMessage.replace('/get_messages_', "");
                    try {
                        messagesChatId = parseInt(messagesChatId);
                        const messages = await chatsService.getMessagesByChatId(messagesChatId);
                        await mainBotService.sendMessageToChat(chatId, messages);
                    } catch (e) {
                        logger.error("cant parse userId to number", e);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.error_getting_messages(e, sentMessage));

                    }
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/get_user_info_')) {
                    let userId = sentMessage.replace('/get_user_info_', "");
                    try {
                        userId = parseInt(userId);
                        const info = await chatsService.getUserInfoByUserId(userId);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.user_info_sending(userId, chatId, JSON.stringify(info)));
                    } catch (e) {
                        logger.error("cant parse userId to number", e);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.error_getting_info(e, sentMessage));

                    }
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/get_jokes_')) {
                    try {
                        let offset = parseInt(sentMessage.replace("/get_jokes_", ""));
                        let jokes = await jokesService.getJokes(offset, 5);

                        if (!jokes.length) jokes = "Անեկդոտներն ավարտվել են";
                        await mainBotService.sendMessageToChat(chatId, settings.messages.jokes_send_with_offset(JSON.stringify(jokes), offset + 5));
                    } catch (e) {
                        logger.error("cant parse userId to number", e);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.error_getting_jokes(e, sentMessage));

                    }
                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/get_users_')) {
                    try {
                        let offset = parseInt(sentMessage.replace("/get_users_", ""));
                        let chats = await chatsService.getChats(offset, 20);
                        if (!chats.length) chats = "Օգտատերերն ավարտվել են";

                        await mainBotService.sendMessageToChat(chatId, settings.messages.chats_send_with_offset(JSON.stringify(chats), offset + 20));
                    } catch (e) {
                        logger.error("cant parse userId to number", e);
                        await mainBotService.sendMessageToChat(chatId, settings.messages.error_getting_jokes(e, sentMessage));

                    }
                    return res.status(200).send({statusText: "OK"});
                }

                const over18CountChats = await chatsService.getChatsCount(true);
                const low18CountChats = await chatsService.getChatsCount(false);

                const over18CountJokes = await jokesService.getJokesCount(true);
                const low18CountJokes = await jokesService.getJokesCount(false);

                await mainBotService.sendMessageToChat(chatId, settings.messages.unknown_admin_message(firstName, over18CountChats, low18CountChats, over18CountJokes, low18CountJokes));
                return res.status(200).send({statusText: "OK"});
            }
        } catch (e) {
            logger.error("Error", e);
            return res.status(200).send({statusText: "OK"});
        }
    }

    async function startJob(req, res) {
        try {
            await mainBotService.runJob();
            return res.send({status: "success"});
        } catch (err) {
            logger.error("Error in starting job ", err);
            return res.send({status: "error", response: err});
        }
    }
};
