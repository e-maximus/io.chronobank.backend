const keystone = require('keystone')
const { withTranslation } = require('../utils')

const Language = new keystone.List('Language', {
  map: {name: 'title'},
  autokey: {path: 'slug', from: 'title', unique: true},
  sortable: true,
  nocreate: true,
  nodelete: true
})

Language.add({
  title: {type: String, required: true, noedit: true},
  label: {type: String, noedit: true},
  key: {type: String, noedit: true}
},
  'Internationalization',
  withTranslation.withAllTranslations({
    label: {type: String, label: 'Label'}
  }),
  'Display Options', {
    isEnable: { type: Boolean, label: 'Enable' },
  }
)

Language.defaultColumns = 'title, isEnable'

Language.register()
