let result = []
const parseJson = (object, prevKey = undefined) => {
  Object.keys(object).forEach((key) => {
      const path = prevKey ? [prevKey, key].join('.') : key
      if (typeof object[key] === 'string') {
        result.push({ name: key, path: path, value: key, translation: object[key]})
      } else {
        parseJson(object[key], path)
      }
  })

  return result
}

module.exports = {
  parseJson
}
