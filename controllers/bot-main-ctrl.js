const logger = require('log4js').getLogger('ChatsService.srv');

const axios = require('axios');
const url = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';

const ADMIN_USER_IDS = [938812149];

module.exports = function BotMainCtrl(mainBotService, chatsService, jokesService) {
    this.handleMessages = handleMessages;
    this.startJob = startJob;

    // this.init = init;
    // this.initJob = initJob;
    // this.stopJob = stopJob;

    async function handleMessages(req, res) {
        try {
            const chatId = req.body.message.chat.id;
            const userId = +req.body.message.from.id;
            const firstName = req.body.message.from.first_name;
            const username = req.body.message.from.username;
            const lastName = req.body.message.from.last_name;
            const sentMessage = req.body.message.text;

            logger.info("info message", sentMessage);

            await chatsService.createIfNotExists(chatId, firstName, lastName, userId, username);
            await chatsService.addMessage(chatId, sentMessage);
            if (chatId !== 938812149) {
                await axios.post(`${url}${apiToken}/sendMessage`,
                    {
                        chat_id: 938812149,
                        text: `${username} ից եկած նամակ, ${sentMessage}`
                    });
            }


            if (ADMIN_USER_IDS.includes(userId)) {
                return handleAdminQueries();
            }

            if (sentMessage === "/start") {
                return handleInitialCase();
            }

            if (sentMessage.includes('/joke')) {
                return addJokeToReview()
            }

            return unknownCase();

            async function unknownCase() {
                await axios.post(`${url}${apiToken}/sendMessage`,
                    {
                        chat_id: chatId,
                        text: 'Մենք կկապնվենք Ձեզ հետ, եթե կա դրա կարիքն'
                    });
                return res.status(200).send({statusText: "OK"});
            }

            async function handleInitialCase() {
                await axios.post(`${url}${apiToken}/sendMessage`,
                    {
                        chat_id: chatId,
                        text: `Ողջույն ${firstName} 👋,
                    \nԵթե ցանկանում եք անեկդոտ գրել ապա, տեքստի առջևում գրել /jok որից հետո բուն տեքտն, ցանկալի է գրել հայատառ Օրինակ ՝ 
                    \n /joke Մինսկի խումբն առաջարկել է խաղաղապահ քերոբներ մտցնել Ազգային ժողով։
                    \nՀաճելի ժամանց Ձեզ։`
                    });

                return res.status(200).send({statusText: "OK"});
            }

            async function addJokeToReview() {

                await jokesService.addJokeToReviewedJokesList(sentMessage.replace('/joke', ""), userId, chatId);
                await axios.post(`${url}${apiToken}/sendMessage`,
                    {
                        chat_id: chatId,
                        text: `Ողջույն ${firstName} 👋, Ձեր անեկդոտն ստուգվելուց հետո կցուցադրվի բոլորին`
                    });

                return res.status(200).send({statusText: "OK"});
            }

            async function handleAdminQueries() {
                if (sentMessage.includes("/333")) {
                    await mainBotService.runJob();
                    await axios.post(`${url}${apiToken}/sendMessage`,
                        {
                            chat_id: chatId,
                            text: `${firstName} Ձան բոլորի մոտ անդեկդոտներն թարմացվել է բարեհաջող`
                        });

                    return res.status(200).send({statusText: "OK"});
                }

                if (sentMessage.includes('/joke')) {
                    const over18 = sentMessage.includes('/18+');
                    let text = sentMessage.replace('/joke', "");
                    text = text.replace('/18+', "");
                    await jokesService.addJoke(text, over18, 938812149);

                    await axios.post(`${url}${apiToken}/sendMessage`,
                        {
                            chat_id: chatId,
                            text: `${firstName} Ջան Ձեր անեկդոտն ստուգվելուց բարեհաջող ավելացված է`
                        });

                    return res.status(200).send({statusText: "OK"});
                }

                await axios.post(`${url}${apiToken}/sendMessage`,
                    {
                        chat_id: chatId,
                        text: `${firstName} Ջան անհասկանալի նամակ. Անեկդոտ ավելացնլեու համար /joke և /18+, Ալգորիթմի աշխատացնելու համար /333`
                    });

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

    //@Deprecated
    // async function init(req, res) {
    //     try {
    //         let url;
    //         if (req.query.q) {
    //             url = req.query.q;
    //         }
    //
    //         await mainBotService.connectUrlToTelegram(url);
    //         return res.send({status: "success"});
    //     } catch (e) {
    //         return res.send({
    //             status: "error",
    //             response: {
    //                 error_message: e
    //             }
    //         });
    //     }
    // }

    // async function initJob(req, res) {
    //     try {
    //         await mainBotService.initJob();
    //         return res.send({status: "success"});
    //     } catch (err) {
    //         logger.error("Error in initialization ", err);
    //         return res.send({status: "error", response: err});
    //     }
    // }

    // async function stopJob(req, res) {
    //     try {
    //         await mainBotService.stopJob();
    //         return res.send({status: "success"});
    //     } catch (err) {
    //         logger.error("Error in stop job ", err);
    //         return res.send({status: "error", response: err});
    //     }
    // }
};
