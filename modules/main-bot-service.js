const axios = require('axios');
const BaseUrl = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';

class MainBotService {
    constructor(ngrokService) {
        this.ngrokService = ngrokService;
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
