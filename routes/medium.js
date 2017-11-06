const express = require('express')
const axios = require('axios')
const FeedParser = require('feedparser')
const sanitizeHtml = require('sanitize-html')
const moment = require('moment')
const cache = require('../middleware/cache')

const router = express.Router()

const MEDIUM = axios.create({
  baseURL: 'https://blog.chronobank.io'
})

router.get('/feed', cache(), async (req, res) => {

  const imageRegex = /<figure><img.*?src="(.*?)".*?\>.*?<\/figure>/gm

  const items = []
  const feedparser = (maxAge) => new FeedParser({
    normalize: false
  })
    .on('error', function (e) {
      // eslint-disable-next-line
      console.log('Error in RSS feed parser', e)
      // res.status(500).send()
    })
    .on('readable', function () {
      let item = null
      while ((item = this.read()) !== null) {
        items.push(item)
      }
    })
    .on('end', () => {
      res.sendCached(maxAge, items.map(item => {
        const imageMatch = imageRegex.exec(item['content:encoded']['#']) // returns first match
        return {
          guid: item['rss:guid']['#'],
          link: item['rss:link']['#'],
          title: item['rss:title']['#'],
          item,
          image: imageMatch ? imageMatch[1] : null,
          categories: item.categories,
          publishedDate: moment(new Date(item['rss:pubdate']['#'])).toISOString()
        }
      }))
    })
  const response = await MEDIUM.get('feed', {
    responseType: 'stream'
  })
  response.data.pipe(feedparser(
    new Date(response.headers.expires).getTime() - new Date().getTime()
  ))
})

module.exports = router
