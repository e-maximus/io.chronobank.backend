const keystone = require('keystone')
const { withTranslation, applyTranslationHook } = require('../utils')
var Types = keystone.Field.Types

const MintTranslation = new keystone.List('MintTranslation', {
  map: { name: 'name' },
  sortable: true
})

MintTranslation.add({
  name: { type: String, required: true, initial: true },
  path: { type: String, required: true, initial: true, unique: true },
  value: { type: String },
  isActive: { type: Boolean, label: 'Is active' },
  createdAt: { type: Types.Datetime, default: Date.now, noedit: true },
  updatedAt: { type: Types.Datetime, default: Date.now, noedit: true, index: true }
},
  'Internationalization',
  withTranslation.withTranslation(...withTranslation.LANGUAGES_ARRAY)({
    value: { type: String, label: 'Value' },
  })
)

applyTranslationHook(MintTranslation.schema, ($this) => {
  $this.updatedAt = Date.now()
})

MintTranslation.defaultColumns = 'path|30%, name, i18nTranslations, isActive, updatedAt'
MintTranslation.searchFields = 'name, path'

MintTranslation.register()
