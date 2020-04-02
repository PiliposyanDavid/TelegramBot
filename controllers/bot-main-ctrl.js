const logger = require('log4js').getLogger('ChatsService.srv');

const axios = require('axios');
const url = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';

module.exports = function BotMainCtrl(mainBotService, chatsService) {
    this.handleMessages = handleMessages;
    this.init = init;

    this.initJob = initJob;
    this.startJob = startJob;
    this.stopJob = stopJob;

    async function handleMessages(req, res) {
        console.log(req.body);

        const chatId = req.body.message.chat.id;
        const userId = req.body.message.from.id;
        const firstName = req.body.message.from.first_name;
        const lastName = req.body.message.from.last_name;
        const sentMessage = req.body.message.text;

        logger.info("info message", sentMessage);

        if ((req.body.message && req.body.message.new_chat_participant && req.body.message.new_chat_participant.is_bot)
            || (req.body.message && req.body.message.new_chat_member && req.body.message.new_chat_member.is_bot)) {

            await axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: `Please leave this chat`
                });

            return res.status(200).send({statusText: "OK"});
        }

        await chatsService.createIfNotExists(chatId, firstName, lastName, userId);

        if (sentMessage === "/start") {
            await axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: `Barev ${firstName} jan 👋, dzez maxtum enq urax jamanac`
                });

            return res.status(200).send({statusText: "OK"});
        }


        // if no hello present, just respond with 200
        await chatsService.addMessage(chatId, sentMessage);
        await axios.post(`${url}${apiToken}/sendMessage`,
            {
                chat_id: chatId,
                text: 'Ete smsn injvor patasxan aknkalox e, apa kkapnvenq dzer het, hakarak depqum kxndrei chgrel !!!'
            });
        return res.status(200).send({statusText: "OK"});
    }

    async function init(req, res) {
        try {
            let url;
            if (req.query.q) {
                url = req.query.q;
            }

            await mainBotService.connectUrlToTelegram(url);
            return res.send({status: "success"});
        } catch (e) {
            return res.send({
                status: "error",
                response: {
                    error_message: e
                }
            });
        }
    }

    async function initJob(req, res) {
        try {
            await mainBotService.initJob();
            return res.send({status: "success"});
        } catch (err) {
            logger.error("Error in initialization ", err);
            return res.send({status: "error", response: err});
        }
    }

    async function startJob(req, res) {
        try {
            await mainBotService.startJob();
            return res.send({status: "success"});
        } catch (err) {
            logger.error("Error in starting job ", err);
            return res.send({status: "error", response: err});
        }
    }

    async function stopJob(req, res) {
        try {
            await mainBotService.stopJob();
            return res.send({status: "success"});
        } catch (err) {
            logger.error("Error in stop job ", err);
            return res.send({status: "error", response: err});
        }
    }
};
