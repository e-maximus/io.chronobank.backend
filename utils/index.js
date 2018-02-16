const download = require('./lib/download')
const withTranslation = require('./lib/withTranslation')
const { applyTranslationHook } = require('./lib/applyTranslationHook')

module.exports = {
  download,
  withTranslation,
  applyTranslationHook
}
