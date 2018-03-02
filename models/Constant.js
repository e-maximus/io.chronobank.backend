const keystone = require('keystone')
const { withTranslation, applyTranslationHook } = require('../utils')

const Constants = new keystone.List('Constant', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Constants.add({
  name: { type: String, required: true },
  value: { type: String }
},
  'Internationalization',
  withTranslation.withAllTranslations({
    value: { type: String, label: 'Value' },
  })
)

applyTranslationHook(Constants.schema)

Constants.register()
