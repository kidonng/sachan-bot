const { bot } = require('..')
const got = require('got')
const outdent = require('outdent')
const urlRegex = require('url-regex')

module.exports = bot.hears(
  /\/link (.+)/,
  ({ match, reply, replyWithMarkdown }) => {
    if (match[1].match(urlRegex({ strict: false })))
      (async () => {
        // Final URL after redirects
        const redirect = (await got(match[1])).url

        // t.cn: [{"url_short":"http://t.cn/xxxx","url_long":"http://example.com/","type":0}]
        const tcn = JSON.parse(
          (await got('https://api.t.sina.com.cn/short_url/shorten.json', {
            query: {
              source: 2849184197,
              url_long: redirect
            }
          })).body
        )[0].url_short.replace('http', 'https')

        // u.nu: https://u.nu/xxxx
        const unu = (await got('https://u.nu/api.php', {
          query: {
            action: 'shorturl',
            format: 'simple',
            url: redirect
          }
        })).body

        replyWithMarkdown(
          outdent`
          *Original* ${match[1]} ${
            match[1] === redirect ? '' : `\n*Redirected* ${redirect}`
          }
          *Shortened*
            - ${tcn}
            - ${unu}
          `,
          { disable_web_page_preview: true }
        )
      })()
    else reply("Well, that doesn't seem right.")
  }
)
