const { bot } = require('..')
const prettier = require('prettier')

let listenMessage = false

module.exports = {
  info: bot.command('json', ({ reply }) => {
    reply("Send a message and I'll return JSON response.")

    listenMessage = true
  }),

  messageListener: bot.on('message', ({ message, replyWithMarkdown }) => {
    if (listenMessage) {
      replyWithMarkdown(
        `\`${prettier.format(JSON.stringify(message), { parser: 'json' })}\``
      )

      listenMessage = false
    }
  })
}
