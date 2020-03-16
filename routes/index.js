const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';

const MainBotService = require('./../services/main-bot-service');
const mainBotService = new MainBotService();

router.post('/', (req, res) => {
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
    } else {
        // if no hello present, just respond with 200
        res.status(200).send({});
    }


});

router.get('/init', async (req, res) => {
    try {
        await mainBotService.connectNgrokUrlToTelegram();
        return res.send({status: "success"});
    } catch (e) {
        return res.send({
            status: "error",
            response: {
                error_message: e
            }
        });

    }
});

module.exports = router;
