const axios = require('axios');
const url = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';

module.exports = function BotMainCtrl(mainBotService, chatsService) {
    this.handleMessages = handleMessages;
    this.init = init;

    async function handleMessages(req, res) {
        console.log(req.body);
        const chatId = req.body.message.chat.id;
        const userId = req.body.message.from.id;
        const firstName = req.body.message.from.first_name;
        const lastName = req.body.message.from.last_name;
        const sentMessage = req.body.message.text;

        if (sentMessage === "/start") {
            await chatsService.create(chatId, firstName, lastName, userId);
            await axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: `Barev ${firstName} jan 👋, dzez maxtum enq urax jamanac`
                });
        } else {
            // if no hello present, just respond with 200
            await chatsService.addMessage(chatId, sentMessage);
            await axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: 'Ete smsn injvor patasxan aknkalox e, apa kkapnvenq dzer het, hakarak depqum kxndrei chgrel !!!'
                });
        }

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
};
