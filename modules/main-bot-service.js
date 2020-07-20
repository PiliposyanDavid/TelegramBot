const axios = require('axios');
const logger = require('log4js').getLogger('MainBotService.srv');

class MainBotService {
    constructor(chatsService, jokesService, settings) {
        this.chatsService = chatsService;
        this.jokesService = jokesService;
        this.settings = settings;
    }

    async runJob() {
        logger.info("Start job");
        const chats = await this.chatsService.getAllChats();
        const chatIds = (chats || [])
            .map((chat) => chat.chat_id)
            .filter(Boolean);

        if (!chatIds.length) {
            logger.error("chat ids not found");
            return;
        } else {
            logger.info(`Chat ids length ${chatIds.length}`);
        }


        for (const chat of chats) {
            try {
                const joke = await this.jokesService.getJokeFromNonReadedForUserAndSorted(chat.user_id, chat.over_18);
                if (!joke || !joke.text) {
                    logger.info(`For ${chat.user_id} user not found joke`);
                    continue
                }

                logger.info(`ChatId is ${chat.chat_id}, joke for this user - ${joke.text}`);

                await this.sendMessageToChat(chat.chat_id, joke.text);

                await this.jokesService.updateJokeReadedForUser(joke._id, chat.user_id);
                await this.chatsService.addJokeIdToReadedForUser(chat.user_id, joke._id);
            } catch (e) {
                logger.error("Error in job process for user", chat.user_id, e);
                await this.sendMessageToAllAdminsChat("Error in job process for user " + chat.user_id + ", \n/remove_user_" + chat.user_id + "\n" + e);
            }
        }

        logger.info("finish successfully !!!")
    }

    async runJobForSpecifyJoke(joke) {
        if (!joke || !joke.text || !joke._id) {
            await this.sendMessageToAllAdminsChat("invalid joke," + JSON.stringify(joke));
            return null;
        }

        logger.info("Start job");
        const chats = await this.chatsService.getAllChats();
        const chatIds = (chats || [])
            .map((chat) => chat.chat_id)
            .filter(Boolean);

        if (!chatIds.length) {
            logger.error("chat ids not found");
            return;
        } else {
            logger.info(`Chat ids length ${chatIds.length}`);
        }


        for (const chat of chats) {
            try {
                logger.info(`ChatId is ${chat.chat_id}, joke for this user - ${joke.text}`);

                await this.sendMessageToChat(chat.chat_id, joke.text);
                await this.jokesService.updateJokeReadedForUser(joke._id, chat.user_id);
                await this.chatsService.addJokeIdToReadedForUser(chat.user_id, joke._id);
            } catch (e) {
                logger.error("Error in job process for user", chat.user_id, e);
                await this.sendMessageToAllAdminsChat("Error in job process for user " + chat.user_id + ", \n/remove_user_" + chat.user_id + "\n" + e);
            }
        }

        logger.info("finish successfully !!!")
    }

    async sendMessageToChat(chatId, message) {
        await this.chatsService.addMessage(chatId, "From our - " + message);
        await axios.post(`${this.settings.telegram_bot_base_url}${this.settings.api_token}/sendMessage`,
            {
                chat_id: chatId,
                text: message
            });
    }

    async sendMessageToAllAdminsChat(message) {
        for (const chatId of this.settings.ADMIN_USERS_CHATS_IDS) {
            await axios.post(`${this.settings.telegram_bot_base_url}${this.settings.api_token}/sendMessage`,
                {
                    chat_id: chatId,
                    text: message
                });
        }
    }

    async sendJokeToUserByChatId(chatId) {
        const chat = await this.chatsService.getChatByChatId(chatId);
        try {
            if (!chat || !chat.chat_id) {
                throw new Error("Fail to find chat, chatId " + chatId);
            }
            const joke = await this.jokesService.getJokeFromNonReadedForUserAndSorted(chat.user_id, chat.over_18);
            if (!joke || !joke.text) {
                logger.info(`For ${chat.user_id} user not found joke`);
            }

            logger.info(`ChatId is ${chat.chat_id}, joke for this user - ${joke.text}`);

            setTimeout(this.sendMessageToChat(chat.chat_id, joke.text), 60000);


            // await this.sendMessageToChat(chat.chat_id, joke.text);
            await this.jokesService.updateJokeReadedForUser(joke._id, chat.user_id);
            await this.chatsService.addJokeIdToReadedForUser(chat.user_id, joke._id);

            await this.sendMessageToAllAdminsChat("Success joke send\n" + joke.text);
            return joke.text;

        } catch (e) {
            logger.error("Error in job process for user", chat.user_id, e);
            await this.sendMessageToAllAdminsChat("Error in job process for user " + chat.user_id + ", " + e);
            return "!!!!";
        }

    }
}

module.exports = MainBotService;
