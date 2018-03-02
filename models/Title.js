const keystone = require('keystone')
const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

const Title = new keystone.List('Title', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Title.add({
  name: { type: String, required: true },
  value: { type: Types.Html, wysiwyg: true, height: 150 },
},
  'Internationalization',
  withTranslation.withAllTranslations({
    value: { type: Types.Html, wysiwyg: true, height: 150, label: 'Value' },
  })
)

applyTranslationHook(Title.schema)

Title.register()
