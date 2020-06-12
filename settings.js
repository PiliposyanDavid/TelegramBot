module.exports = {
    api_token: "1134768703:AAGjZ6VSAO8G1sLCZZ85g2mYpRM0QyvLBoU",
    telegram_bot_base_url: "https://api.telegram.org/bot",
    ADMIN_USERS_CHATS_IDS: [938812149],
    ADMIN_USERS_IDS: [938812149],
    messages: {
        initial_case: function (firstName) {
            return `Հարգելի ${firstName} 👋, Եթե կցանկանաք ստանալ 18+ անեկդոտներ ապա սեխմեք /over18 հրամանն 🔞, համակարգի սառեցման համար սեխմեք /stop հրամանն 
                    \nԵթե ցանկանում եք անեկդոտ գրել ապա, տեքստի առջևում գրել /joke որից հետո բուն տեքստն, ցանկալի է գրել հայատառ Օրինակ ՝ 
                    \n /joke Մինսկի խումբն առաջարկել է խաղաղապահ քերոբներ մտցնել Ազգային ժողով։
                    \nՀաճելի ժամանց Ձեզ։`
        },

        joke_without_text: function (firstName) {
            return `Հարգելի ${firstName}, /joke -ի հետ միասին գրեք անեկդոտն, Օրինակ \n/joke Մինսկի խումբն առաջարկել է խաղաղապահ քերոբներ մտցնել Ազգային ժողով։`
        },

        joke_to_review: function (firstName) {
            return `Հարգելի ${firstName} 👋, Ձեր անեկդոտն վերանայվելուց հետո կցուցադրվի բոլորին`
        },

        join_to_bot: function (firstName, userId) {
            return `${firstName} - ը միացել է մեր համակարգին, id ${userId} հեռացնելու համար \n/remove_user_${userId}`
        },

        request_to_over18: function (firstName, chatId) {
            return `${firstName} - ը միացել է մեր համակարգի 18+ մասին, id ${chatId} հեռացնելու համար \n/remove_from_over18_${chatId}`
        },

        request_to_low18: function (firstName, chatId) {
            return `${firstName} - ը չեղարկել է մեր համակարգի 18+ մասը, id ${chatId}`
        },

        request_to_create_joke: function (firstName, userId, text, jokeId) {
            return `${firstName}-ը ուղղարկել է անեկդոտ, userId ${userId}, անեկդոտ \n${text} \n հաստատելու համար, եթե 18+ է ապա \n/approve_user_created_joke_over18_${jokeId}, հակառակ դեպքում \n/approve_user_created_joke_low18_${jokeId}, հեռացնելու համար \n/remove_user_created_joke_${jokeId}`
        },

        admin_joke_to_review: function (firstName) {
            return `Հարգելի ${firstName}, Անեկդոտն բարեհաջող ավելացվել է`
        },

        joke_show_success: function (firstName) {
            return `${firstName} Ձան բոլորի մոտ անդեկդոտներն թարմացվել է բարեհաջող`
        },

        unknown_admin_message: function (firstName, over18CountChats, low18CountChats, over18CountJokes, low18CountJokes) {
            return `${firstName} Ջան անհասկանալի նամակ. 
            \nԱնեկդոտ ավելացնլեու համար /joke և /18
            \nԱլգորիթմի աշխատացնելու համար /333 
            \nԱնեկդոտներ տեսնելու համար /get_jokes_0 
            \nՕգտատերերին տեսնելու համար /get_users_0
            \nՕգտատերերին նամակ գրելու համար / message_to_user_chatId_
            \n18+ Անեկդոտների Քանակն ${over18CountJokes}, Մնացածն ${low18CountJokes} 
            \n18+ Օգտատերերի Քանակն ${over18CountChats}, Մնացածն ${low18CountChats}`
        },

        unknown_user_message: function (firstName, message, chatId, userId) {
            return `${firstName}-ից եկած անհասկանալի նամակ, \n${message}, \nՆամակագրության ստացման համար \n/get_messages_${chatId},\n/get_user_info_${userId}\n${chatId}`
        },

        joke_show_error: function (err) {
            return `Առկա է խնդիր անեկդոտներն բոլորին ցուցադրելու, Error - ${err}`
        },

        error_removing_user: function (err, message) {
            return `Առկա է խնդիր օգտատերին հեռացնելու հետ ${message}, Error - ${err}`
        },

        error_getting_messages: function (err, message) {
            return `Առկա է խնդիր օգտատերին հաղորդագրություններն հավաքագրելու հետ ${message}, Error - ${err}`
        },

        error_getting_info: function (err, message) {
            return `Առկա է խնդիր օգտատերի ինֆո հավաքագրելու հետ ${message}, Error - ${err}`
        },

        error_getting_jokes: function (err, message) {
            return `Առկա է խնդիր անեկդոտների հավաքագրելու հետ ${message}, Error - ${err}`
        },

        parse_error: function (err, message) {
            return `Առկա է խնդիր օգտատերերին հավաքագրելու հետ ${message}, Error - ${err}`
        },

        error_approving_joke: function (err, message) {
            return `Առկա է խնդիր անեկդոտն հաստատելու հետ ${message}, Error - ${err}`
        },

        error_rejecting_joke: function (err, message) {
            return `Առկա է խնդիր անեկդոտն հեռացնելու հետ ${message}, Error - ${err}`
        },

        approve_joke_message: function (username, text) {
            return `Հարգելի ${username}, Շնորհակալություն անեկդոտի համար, Ձեր անեկդոտն հաստատվել է,\nԱնեկդոտ ${text}`
        },

        reject_joke_message: function (username, text) {
            return `Հարգելի ${username}, Շնորհակալություն անեկդոտի համար, սակայն այն չի հաստատվել,\nԱնեկդոտ ${text}`
        },

        reject_update_null_id: function () {
            return `Id-ին չի հայտնաբերվել հրամանի միջից`
        },

        success_update_joke_over: function (text, over18) {
            return `Անեկդոտն փոփոխվել է, over18 - ${over18},\ntext - ${text}`
        },

        success_removing_user: function (userId) {
            return `Օգտատերն հեռացված է 18+ ից, ${userId}`
        },

        success_stop_for_user: function (firstName, userId) {
            return `${firstName} Օգտատերն կանգնեցրել է աշխատանքն, ${userId}`
        },

        success_stop_request: function (firstName) {
            return `Հարգելի ${firstName}, Ես դադարեցնում եմ Ձեզ ուրախացնել։ Եթե կցանկանաք վերականգնել աշխտանքն ապա սեղմեք /start հրամանն`
        },

        user_info_sending: function (info, offset = 0) {
            return `/remove_user_${info.userId} \n/remove_from_over18_${info.chatId} \n/get_messages_${info.chatId},\nName - ${info.firstName} \nLast name - ${info.lastName} \nusername - ${info.username} \nover18 - ${info.over18} \nchatId - ${info.chatId} \nuserId - ${info.userId}\nNext page /get_users_${offset}`
        },

        jokes_send_with_offset: function (joke, offset) {
            return `text - ${joke.text}\nover18 - ${joke.over_18}\nNext page /get_jokes_${offset}\nRemove joke - /jokes_remove_${joke._id},\nUpdate over18 - /jokes_over18_${joke.over_18 ? 0 : 2}_${joke._id}`
        },

        jokes_success_remove: function (text) {
            return `Անեկդոտն ջնջվեց`
        },

        chats_send_with_offset: function (chats, offset) {
            return `${chats}\nNext page /get_users_${offset}`
        },

        send_message_to_user: function (text) {
            return `Ադմինի կողմից եկած նամակ\n${text}`
        },

        send_message_to_user_for_admin: function (text) {
            return `Նամակն ուղղարկվել է\n${text}`
        },

        success_approve_joke: function () {
            return `Անեկդոտն հաստատված է`
        },

        success_reject_joke: function () {
            return `Անեկդոտն հեռացված է`
        },

        generic_cases: function (userId, chatId) {
            return `/remove_user_${userId} \n/remove_from_over18_${chatId} \n/get_messages_${userId}`
        },

        spam_message: `Please leave this chat`,
        finish_jokes: `Անեկդոտներն ավարտվել են`,
        finish_users: `Օգտատերերն ավարտվել են`,
        change_over18: "Շնորհակալություն, Ձեր կարգավիճակի փոփոխությունն կատարված է, փոփոխությունն չեղարկելու համար ուղղարկեք /cancel_over18 հրամանն",
        change_low18: "Շնորհակալություն, Ձեր կարգավիճակի փոփոխությունն կատարված է, փոփոխությունն չեղարկելու համար ուղղարկեք /over18 հրամանն",
        unknown_case: "Անահասկանալի հրաման, Եթե հրամանն պատասխան ակնկալող է ապա կկապնվենեք Ձեզ հետ"
    }
};
