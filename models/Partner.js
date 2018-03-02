const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

const Partner = new keystone.List('Partner', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Partner.add({
  title: { type: String, required: true },
  url: { type: Types.Url },
  icon: { type: Types.CloudinaryImage },
  icon2x: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
},
  'Internationalization',
  withTranslation.withAllTranslations({
    brief: { type: Types.Html, wysiwyg: true, label: 'Brief', height: 150 }
  })
)

applyTranslationHook(Partner.schema)

Partner.defaultColumns = 'title, icon, url, i18nTranslations'

Partner.schema.post('save', async (d) => {
  await Promise.all([d.icon, d.icon2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Partner.register()
