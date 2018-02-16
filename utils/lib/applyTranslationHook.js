const applyTranslationHook = (schema) => {

  if (!schema) {
    return
  }

  schema.pre('save', function(next){
    const i18n = {}
    for (const [k, v] of Object.entries(this.i18n.toJSON())) {
      if (v && v.active) {
        i18n[k] = v
      }
    }
    this.i18n = i18n
    this.i18nTranslations = Object.keys(i18n).join(', ')
    next()
  })

}



module.exports = {
  applyTranslationHook
}
