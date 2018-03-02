const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const { withTranslation, applyTranslationHook } = require('../utils')
const Types = keystone.Field.Types

const ProductDownload = new keystone.List('ProductDownload', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

ProductDownload.add({
  title: { type: String, required: true },
  icon: { type: Types.CloudinaryImage },
  url: { type: Types.Url }
},
  'Internationalization',
  withTranslation.withAllTranslations({
    title: { type: String, label: 'Title' },
  })
)

applyTranslationHook(ProductDownload.schema)

ProductDownload.relationship({ ref: 'Product', path: 'product', refPath: 'downloads' })

ProductDownload.defaultColumns = 'title, icon, url, i18nTranslations'

ProductDownload.schema.post('save', async (d) => {
  if (d.icon && d.icon.secure_url) {
    await download(d.icon.secure_url)
  }
})

ProductDownload.register()
