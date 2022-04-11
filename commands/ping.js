const moment = require("moment");
module.exports = {
    name:'ping',
    aliases:[
        'пинг'
    ],
    async execute(message, args){
        let sent = moment(message.createdTimestamp).format('DD.MM.YY - HH:mm:ss:SSS')
        let received = moment().format('DD.MM.YY - HH:mm:ss:SSS')
        message.reply(`Отправлено: ${sent}\nПолучено: ${received}`)
    }
}