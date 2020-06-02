const axios = require('axios');
const BaseUrl = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';
// const CronJob = require('cron').CronJob;
const Promise = require('bluebird');

const logger = require('log4js').getLogger('MainBotService.srv');

class MainBotService {
    constructor(ngrokService, chatsService, jokesService) {
        // this.ngrokService = ngrokService;
        this.chatsService = chatsService;
        this.jokesService = jokesService;
        // this.job = null;
    }

    async runJob() {
        logger.info("Start job");
        // try {
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
            const joke = await this.jokesService.getJokeFromNonReadedForUserAndSorted(chat.user_id, chat.over_18);
            if (!joke || !joke.text) {
                logger.info(`For ${chat.user_id} user not found joke`);
                continue
            }

            logger.info(`ChatId is ${chat.chat_id}, joke for this user - ${joke.text}`);

            await axios.post(`${BaseUrl}${apiToken}/sendMessage`,
                {
                    chat_id: chat.chat_id,
                    text: joke.text
                });

            await this.jokesService.updateJokeReadedForUser(joke._id, chat.user_id);
            await this.chatsService.addJokeIdToReadedForUser(chat.user_id, joke._id);
        }

        logger.info("finish successfully !!!")

        // } catch (err) {
        //     logger.error("Error in job !!!", err);
        // }
        // 0 0 11-22 * * *
        // this.job = new CronJob('0 0 7-20 * * *', async function () {
        // }, null, true).start();
    }

    // async startJob() {
    //     return true;
    // }

    // async stopJob() {
    //     this.job.stop();
    // }

    // async connectUrlToTelegram(url) {
    //     if (!url) {
    //         url = await this.ngrokService.init();
    //         console.log("url getting from ngrok ", url);
    //     } else {
    //         console.log("Url set up from query", url);
    //     }
    //
    //     const response = await axios.post(`${BaseUrl}${apiToken}/setwebhook`, {url: url})
    //     if (response.statusText !== "OK") {
    //         console.error("WTF", response.description);
    //         throw new Error("Ngrok connection error :: " + response.description);
    //     }
    //
    // }
}

module.exports = MainBotService;
