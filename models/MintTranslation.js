const keystone = require('keystone')
const { withTranslation, applyTranslationHook } = require('../utils')
var Types = keystone.Field.Types

const MintTranslation = new keystone.List('MintTranslation', {
  map: { name: 'path' },
  sortable: true
})

MintTranslation.add({
  name: { type: String, required: true, initial: true },
  path: { type: String, readonly: true, required: true, initial: true, unique: true },
  value: { type: String },
  isActive: { type: Boolean, label: 'Is active' },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
  updatedAt: { type: Types.Datetime, default: Date.now, noedit: true, index: true }
},
  'Internationalization',
  withTranslation.withTranslation(...withTranslation.LANGUAGES_ARRAY)({
    value: { type: String, label: 'Value En' },
  })
)

applyTranslationHook(MintTranslation.schema, ($this) => {
  $this.updatedAt = Date.now()
})

MintTranslation.defaultColumns = 'path|25%, i18nTranslations, i18n.en.overrides.value|25%, updatedAt'
MintTranslation.searchFields = 'path'

MintTranslation.register()
