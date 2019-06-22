const { bot, telegram } = require('..')
const got = require('got')
const FormData = require('form-data')

module.exports = {
  photoListener: bot.on('photo', async ({ session, message, reply }) => {
    session.photo = await telegram.getFileLink(
      message.photo.slice(-1)[0].file_id
    )
    reply('What do you want to do with the photo?', {
      reply_markup: {
        inline_keyboard: [[{ text: 'waifu2x', callback_data: 'waifu2x' }]]
      }
    })
  }),

  callback: bot.on(
    'callback_query',
    async ({
      session,
      callbackQuery,
      editMessageText,
      deleteMessage,
      replyWithDocument
    }) => {
      if (callbackQuery.data === 'waifu2x' && process.env.DEEPAI_API_KEY) {
        editMessageText('Processing...')

        const form = new FormData()
        form.append('image', session.photo)

        replyWithDocument({
          url: JSON.parse(
            (await got.post('https://api.deepai.org/api/waifu2x', {
              headers: { 'Api-Key': process.env.DEEPAI_API_KEY },
              body: form
            })).body
          ).output_url,
          filename: 'waifu2x.png'
        })

        deleteMessage()
      }
    }
  )
}
