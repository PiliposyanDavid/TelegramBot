const axios = require('axios');
const BaseUrl = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';
const CronJob = require('cron').CronJob;
const Promise = require('bluebird');

const logger = require('log4js').getLogger('MainBotService.srv');

class MainBotService {
    constructor(ngrokService, chatsService, jokesService) {
        this.ngrokService = ngrokService;
        this.chatsService = chatsService;
        this.jokesService = jokesService;
        this.job = null;
    }

    async initJob() {
        // 0 0 11-22 * * *
        this.job = new CronJob('* * * * * *', this.jobLogic());
    }

    async startJob() {
        this.job.start();
    }

    async stopJob() {
        this.job.stop();
    }

    async jobLogic() {
        // const chats = await this.chatsService.getAllChats();
        // const chatIds = (chats || [])
        //     .map((chat) => chat.chat_id)
        //     .filter(Boolean);
        //
        // if (!chatIds.length) {
        //     logger.error("chat ids not found");
        //     return;
        // } else {
        //     logger.info(`Chat ids length ${chatIds.length}`);
        // }
        logger.info("Start job");

        const joke = await this.jokesService.getJokeFromNonReadedAndSorted();

        if (!joke || !joke.text) {
            logger.error("joke not found");
            return;
        } else {
            logger.info("joke text ::", joke.text);
        }

        await axios.post(`${BaseUrl}${apiToken}/sendMessage`,
            {
                chat_id: 938812149,
                text: "barev"
            });

        logger.info("finish !!!")

        // const promises = [];
        // chatIds.forEach((chatId) => {
        //     promises.push(axios.post(`${BaseUrl}${apiToken}/sendMessage`,
        //         {
        //             chat_id: chatId,
        //             text: joke.text
        //         }))
        // });
        //
        // await Promise.all(promises);
        // await this.jokesService.updateJokeReaded(joke.id);
    }

    async connectUrlToTelegram(url) {
        if (!url) {
            url = await this.ngrokService.init();
            console.log("url getting from ngrok ", url);
        } else {
            console.log("Url set up from query", url);
        }

        const response = await axios.post(`${BaseUrl}${apiToken}/setwebhook`, {url: url})
        if (response.statusText !== "OK") {
            console.error("WTF", response.description);
            throw new Error("Ngrok connection error :: " + response.description);
        }

    }
}

module.exports = MainBotService;
