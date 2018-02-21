const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

const Article = new keystone.List('Article', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Article.add({
  title: { type: String, required: true },
  source: { type: String },
  url: { type: Types.Url },
  icon: { type: Types.CloudinaryImage },
  icon2x: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
},
  'Internationalization',
  withTranslation.all({
    title: { type: String, label: 'Title' },
    brief: { type: Types.Html, wysiwyg: true, label: 'Brief', height: 150 }
  })
)

applyTranslationHook(Article.schema)

Article.defaultColumns = 'title, icon, source, url, i18nTranslations'

Article.schema.post('save', async (d) => {
  await Promise.all([d.icon, d.icon2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Article.register()
