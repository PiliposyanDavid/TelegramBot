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

        const chatId = req.body.message.chat.id;
        const userId = req.body.message.from.id;
        const firstName = req.body.message.from.first_name;
        const lastName = req.body.message.from.last_name;
        const sentMessage = req.body.message.text;

        logger.info("info message", sentMessage);


        await chatsService.createIfNotExists(chatId, firstName, lastName, userId);

        if (sentMessage === "/start") {
            return handleInitialCase();
        }

        if (sentMessage.includes('/joke')) {
            return addJokeToReview()
        }

        await chatsService.addMessage(chatId, sentMessage);
        await axios.post(`${url}${apiToken}/sendMessage`,
            {
                chat_id: chatId,
                text: 'Մենք կկապնվենք Ձեզ հետ, եթե կա դրա կարիքն'
            });
        return res.status(200).send({statusText: "OK"});

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
            await axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: `Ողջույն ${firstName} 👋, Ձեր անեկդոտն ստուգվելուց հետո կցուցադրվի բոլորին`
                });

            return res.status(200).send({statusText: "OK"});
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
