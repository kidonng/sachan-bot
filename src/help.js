const { bot } = require('..')
const outdent = require('outdent')

module.exports = bot.hears(/\/help(.+)?/, ({ match, replyWithMarkdown }) =>
  replyWithMarkdown(
    match[1] === ' ip'
      ? outdent`
        Get location according to IPv4/6 address.
        *Example* \`/ip 1.1.1.1\`
        *API* https://ip.sb/api/
      `
      : match[1] === ' link'
      ? outdent`
        Shorten link to t.cn & u.nu.
        The final URL after redirects is shortened if redirects exist.
        *Example* \`/link example.com\`
        *API* [Weibo Open Platform](https://open.weibo.com/wiki/Short_url/shorten) & [U.NU](https://u.nu/api/)
      `
      : match[1] === ' space'
      ? outdent`
        Insert whitespaces between CJK and half-width characters.
        *Example* \`/space 当你凝视bug的时候，bug也在凝视你。\`
        *API* https://github.com/vinta/pangu.js
      `
      : match[1] === ' photo'
      ? outdent`
        *Usage* Send a photo and choose a operation.

        *waifu2x*
        Scale photo using [waifu2x](https://github.com/nagadomi/waifu2x).
        Max resolution after scaling is 1600x1600.
        Processed photo will be sent as document for best quality.
        *API* https://deepai.org/machine-learning-model/waifu2x
      `
      : 'Type /help \\[command] to get corresponding info.',
    { disable_web_page_preview: true }
  )
)
