const { MessageEmbed } = require('discord.js')
const moment = require("moment");
const getEmbed =(author, text, ref)=> {
    let desc = `**Имя Фамилия:**\n${author.nickname} | ${author.user.tag} (<@${author.id}>)\n\n**Действие:**\n${text}${ref?`\n\n**Кто выдал/принял:**\n${ref.nickname} (<@${ref.id}>)`:''}`

    return new MessageEmbed()
        .setTitle('Отчет по оружию')
        .setDescription(desc)
        .setFooter({
            text:moment().format('DD.MM.YYYY | HH:MM:ss')
        })
        .setColor(15914195)
}

module.exports ={
    name:'отчет',
    aliases: [
        'отчёт'
    ],
    async execute(message, args){
        await message.delete()
        // console.log(message)
        const text =()=>{
            let prepared_string = args.toString().replaceAll(',', ' ')
            for(let [k, v] of message.mentions.users.concat(message.mentions.roles)){
                prepared_string = prepared_string.replace(`<${v.permissions?"@&":"@"}${k}>`, '')
            }
            return prepared_string
        }

        let users = message.mentions.users.first()?[message.author.id, message.mentions.users.first().id]:[message.author.id]

        message.guild.members.fetch({user:users}).then(users=>{
            message.channel.send({
                embeds: [getEmbed(users.get(message.author.id),
                    text(),
                    users.get(message.mentions.users.first()?.id))]
            })
        })


    }
}