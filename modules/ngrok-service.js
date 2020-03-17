const ngrok = require('ngrok');

class NgrokService {
    async init() {
        const url = await ngrok.connect();
        console.log("Ngrok url is ", url);
        return url;
    }
}

module.exports = NgrokService;
