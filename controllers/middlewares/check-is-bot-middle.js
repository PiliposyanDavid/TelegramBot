const logger = require('log4js').getLogger('ChatsService.srv');

const axios = require('axios');
const url = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';

return module.exports = function () {
    return async (req, res, next) => {
        const chatId = req.body.message.chat.id;
        const userId = req.body.message.from.id;
        const firstName = req.body.message.from.first_name;
        const lastName = req.body.message.from.last_name;
        const sentMessage = req.body.message.text;

        if (req.body && ((req.body.message && req.body.message.new_chat_participant && req.body.message.new_chat_participant.is_bot)
            || (req.body.message && req.body.message.new_chat_member && req.body.message.new_chat_member.is_bot))) {

            logger.warn("Its a bot. chat id", chatId, "userId", userId, "firstName", firstName, "message", sentMessage);

            await axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: `Please leave this chat`
                });

            return res.status(200).send({statusText: "OK"});
        }
        next();
    };
}
