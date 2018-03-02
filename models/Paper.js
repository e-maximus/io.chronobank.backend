const keystone = require('keystone')
const { withTranslation, applyTranslationHook } = require('../utils')

const Paper = new keystone.List('Paper', {
  map: { name: 'title' },
  sortable: true
})

Paper.add({
  title: { type: String, required: true },
  url: { type: String },
},
  'Internationalization',
  withTranslation.all({
    title: { type: String, label: 'Title' }
  })
)

applyTranslationHook(Paper.schema)

Paper.defaultColumns = 'title, url, i18nTranslations'

Paper.register()
