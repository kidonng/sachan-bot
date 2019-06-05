const { bot } = require('..')
const got = require('got')
const outdent = require('outdent')
const ipRegex = require('ip-regex')

module.exports = bot.hears(
  /\/ip (.+)/,
  ({ match, reply, replyWithMarkdown, replyWithLocation }) => {
    if (match[1].match(ipRegex({ exact: true })))
      (async () => {
        const data = JSON.parse(
          (await got(`https://api.ip.sb/geoip/${match[1]}`)).body
        )

        replyWithMarkdown(outdent`
        *IP* ${data.ip}
        *ASN* ${data.asn ? `AS${data.asn} (${data.organization})` : 'Unknown'}
        *Location* ${data.city ? `${data.city}, ` : ''}${
          data.region ? `${data.region}, ` : ''
        }${data.country} (${data.latitude},${data.longitude})
        `)
        replyWithLocation(data.latitude, data.longitude)
      })()
    else reply("Well, that doesn't seem right.")
  }
)
