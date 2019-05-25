const { bot } = require('../sachan')
const pangu = require('pangu')

module.exports = bot.hears(/\/space ([^]+)/, ({ match, reply }) =>
  reply(pangu.spacing(match[1]))
)
