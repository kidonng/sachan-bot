const bot = new (require('telegraf'))(process.env.TELEGRAM_BOT_TOKEN)
const telegram = new (require('telegraf/telegram'))(process.env.TELEGRAM_BOT_TOKEN)

bot.use((require('telegraf/session'))())
bot.start(({ reply }) => reply('Howdy!'))
bot.launch()

module.exports = { bot, telegram }

require('./src/ip')
require('./src/link')
require('./src/photo')
require('./src/space')
require('./src/help')
require('./src/json')
