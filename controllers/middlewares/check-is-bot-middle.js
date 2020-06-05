const logger = require('log4js').getLogger('ChatsService.srv');

return module.exports = function (mainBotService, settings) {
    return async (req, res, next) => {
        const chatId = req.body.message.chat.id;
        const userId = req.body.message.from.id;
        const firstName = req.body.message.from.first_name;
        const lastName = req.body.message.from.last_name;
        const sentMessage = req.body.message.text;

        if (req.body && ((req.body.message && req.body.message.new_chat_participant && req.body.message.new_chat_participant.is_bot)
            || (req.body.message && req.body.message.new_chat_member && req.body.message.new_chat_member.is_bot))) {

            logger.warn("Its a bot. chat id", chatId, "userId", userId, "firstName", firstName, "message", sentMessage);

            await mainBotService.sendMessageToChat(chatId, settings.messages.spam_message);
            return res.status(200).send({statusText: "OK"});
        }
        next();
    };
}
