const schema = {
    scripts: {
        c: {
            msgdetails: {
                trigger: {
                    type: 'regexp',
                    value: '.*'
                },
                action: {
                    type: 'method',
                    value: 'answerwho'
                },
                command: true
            }
        }
    }
}

require('dotenv').config()
const BotCMS = require('botcms')

const bot = new BotCMS({
    networks: [
        {
            name: 'tg',
            token: process.env.TG_TOKEN,
        }
    ]
})

bot.loadSchema(schema)
bot.init().then(() => bot.launch())

Object.defineProperty(process, 'answerwho', {
    value: ctx => {
        let msg = 'JSON MESSAGE: \n\n' + JSON.stringify(ctx.context.update, null, 4)
        let parcel = new bot.config.classes.Parcel()
        parcel.message = msg
        ctx.reply(parcel)
    },
    writable: true,
    enumerable: true,
    configurable: true
});