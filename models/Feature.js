const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types
const withTranslation = require('../utils').withTranslation

const Feature = new keystone.List('Feature', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Feature.add({
  title: {type: String, required: true},
  image: {type: Types.CloudinaryImage},
  brief: {type: Types.Html, wysiwyg: true, height: 150},
},
  'Internationalization',
  withTranslation.all({
    brief: { type: Types.Html, wysiwyg: true, label: 'Brief', height: 150 }
  })
  
)

Feature.schema.pre('save', function (next) {
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

Feature.defaultColumns = 'title, image, i18nTranslations'

Feature.schema.post('save', async (d) => {
  if (d.image && d.image.secure_url) {
    await download(d.image.secure_url)
  }
})

Feature.register()
