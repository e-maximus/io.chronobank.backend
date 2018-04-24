const parseJson = (obj) => {
  let result = []

  const parse = (obj, prevKey = undefined) => {
    Object.keys(obj).forEach((key) => {
      const path = prevKey ? [prevKey, key].join('.') : key
      if (typeof obj[key] === 'string') {
        result.push({ name: key, path: path, value: key, translation: obj[key]})
      } else {
        parse(obj[key], path)
      }
    })

    return result
  }

  return parse(obj)
}

module.exports = {
  parseJson
}
