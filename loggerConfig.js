const log4js = require('log4js');

log4js.addLayout('json', () => logEvent => JSON.stringify({
    startTime: logEvent.startTime,
    category: logEvent.categoryName,
    level: logEvent.level.levelStr,
    message: logEvent.data.map(d => d instanceof Error ? d.stack : d).join(' ')
}));

log4js.configure({
    appenders: {
        out: { type: 'stdout', layout: { type: 'json', separator: '\n' } }
    },
    categories: {
        default: { appenders: ['out'], level: 'info' }
    }
});
