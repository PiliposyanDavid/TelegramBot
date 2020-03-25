const axios = require('axios');
const url = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';

module.exports = function BotMainCtrl(mainBotService) {
    this.handleMessages = handleMessages;
    this.init = init;

    function handleMessages(req, res) {
        console.log(req.body);
        const chatId = req.body.message.chat.id;
        const sentMessage = req.body.message.text;

        if (sentMessage.match(/barev/gi)) {
            axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: 'hazar bari 👋'
                })
                .then((response) => {
                    res.status(200).send(response);
                }).catch((error) => {
                res.send(error);
            });
        } else if (sentMessage.match(/vonces/gi)) {
            axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: 'normal du?'
                })
                .then((response) => {
                    res.status(200).send(response);
                }).catch((error) => {
                res.send(error);
            });
        } else if (sentMessage.match(/chem/gi)) {
            axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: 'apsos'
                })
                .then((response) => {
                    res.status(200).send(response);
                }).catch((error) => {
                res.send(error);
            });
        } else if (sentMessage.match(/anunt incha/gi)) {
            axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: 'Es anun chunem es bot em ete uzumes boti masin texekutyun stanas mti https://www.cloudflare.com/learning/bots/what-is-a-bot/'
                })
                .then((response) => {
                    res.status(200).send(response);
                }).catch((error) => {
                res.send(error);
            });
        } else if (sentMessage.match(/txeqy voncen/gi)) {
            axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: 'txeqy laven, Gagon sevana, Hovon erevan'
                })
                .then((response) => {
                    res.status(200).send(response);
                }).catch((error) => {
                res.send(error);
            });
        } else {
            // if no hello present, just respond with 200
            res.status(200).send({});
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
