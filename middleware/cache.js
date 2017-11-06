const LRU = require("lru-cache")

// options - LRU cache options (see https://www.npmjs.com/package/lru-cache)
module.exports = (name, options = {}) => {

  const cache = new LRU(options)

  return function (req, res, next) {
    const cached = cache.get(req.originalUrl)
    if (cached) {
      res.send(cached)
      return
    }
    res.sendCached = (maxAge, body) => {
      cache.set(req.originalUrl, body, maxAge)
      res.send(body)
    }
    next()
  }
}
