module.exports = {
    name:'ping',
    aliases:[
        'пинг'
    ],
    async execute(message, args){
        message.reply('pong')
    }
}