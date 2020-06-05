const awilix = require('@shahen.poghosyan/awilix');
const {asValue, asClass, Lifetime} = awilix;

const settings = {
    api_token: "1134768703:AAGjZ6VSAO8G1sLCZZ85g2mYpRM0QyvLBoU",
    telegram_bot_base_url: "https://api.telegram.org/bot",
    ADMIN_USERS_CHATS_IDS: [938812149],
    ADMIN_USERS_IDS: [938812149],
    messages: {
        initial_case: function (firstName) {
            return `Հարգելի ${firstName} 👋, Եթե կցանկանաք ստանալ 18+ անեկդոտներ ապա սեխմեք /over18 ի վրա ))
                    \nԵթե ցանկանում եք անեկդոտ գրել ապա, տեքստի առջևում գրել /joke որից հետո բուն տեքստն, ցանկալի է գրել հայատառ Օրինակ ՝ 
                    \n /joke Մինսկի խումբն առաջարկել է խաղաղապահ քերոբներ մտցնել Ազգային ժողով։
                    \nՀաճելի ժամանց Ձեզ։`
        },

        joke_without_text: function (firstName) {
            return `Հարգելի ${firstName},/joke-ի հետ միասին գրեք անեկդոտն, Օրինակ\t /joke Մինսկի խումբն առաջարկել է խաղաղապահ քերոբներ մտցնել Ազգային ժողով։`
        },

        joke_to_review: function (firstName) {
            return `Հարգելի ${firstName} 👋, Ձեր անեկդոտն վերանայվելուց հետո կցուցադրվի բոլորին`
        },

        admin_joke_to_review: function (firstName) {
            return `Հարգելի ${firstName}, Ձեր անեկդոտն կցուցադրվի բոլորին`
        },

        joke_show_success: function (firstName) {
            return `${firstName} Ձան բոլորի մոտ անդեկդոտներն թարմացվել է բարեհաջող`
        },

        unknown_admin_message: function (firstName) {
            return `${firstName} Ջան անհասկանալի նամակ. Անեկդոտ ավելացնլեու համար /joke և /18+, Ալգորիթմի աշխատացնելու համար /333`
        },

        joke_show_error: function (err) {
            return `Առկա է խնդիր անեկդոտներն բոլորին ցուցադրելու, Error - ${err}`
        },

        spam_message: `Please leave this chat`,
        change_over18: "Շնորհակալություն, Ձեր փոփոխությունն կատարված է",
        unknown_case: "Անահասկանալի հրաման, Եթե հրամանն պատասխան ակնկալող է ապա կկապվնեք Ձեզ հետ."
    }
};

function bootstrap() {
    const container = awilix.createContainer({
        injectionMode: awilix.InjectionMode.CLASSIC
    });

    container.loadModules([
        './modules/**/*.js',
        './controllers/**/*.js',
        './dao/**/*.js',
        './routes.js'
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: Lifetime.SINGLETON
        }
    });
    container.register('settings', asValue(settings));

    return container;
}

module.exports = bootstrap;
