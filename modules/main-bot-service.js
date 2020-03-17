const axios = require('axios');
const BaseUrl = 'https://api.telegram.org/bot';
const apiToken = '1027941776:AAEDWmjmstiGtYpObH3NjN0g9IePgVh-h4E';

class MainBotService {
    constructor(ngrokService) {
        this.ngrokService = ngrokService;
    }

    async connectNgrokUrlToTelegram() {
        const url = await this.ngrokService.init();

        return axios.post(`${BaseUrl}${apiToken}/setwebhook`, {url: url})
            .then((response) => {
                if (response.statusText !== "OK") {
                    console.error("WTF", response.description);
                    throw new Error("Ngrok connection error :: " + response.description);
                }
            });
    }
}

module.exports = MainBotService;
