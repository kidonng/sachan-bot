const { bot_token, agent } = require('./config')
const bot = new (require('telegraf'))(bot_token, agent ? { telegram: { agent } } : {})
const telegram = new (require('telegraf/telegram'))(bot_token, agent ? { agent } : {})
const session = require('telegraf/session')
const got = require('got').extend(agent ? { agent } : {})
const outdent = require('outdent')

bot.use(session())
bot.start(({ reply }) => reply('Howdy!'))
bot.launch()

module.exports = { bot, telegram, got, outdent }

require('./src/ip')
require('./src/link')
require('./src/photo')
require('./src/space')
require('./src/help')
require('./src/json')
