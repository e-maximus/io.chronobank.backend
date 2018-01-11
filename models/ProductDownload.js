const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
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
})

ProductDownload.relationship({ ref: 'Product', path: 'product', refPath: 'downloads' })

ProductDownload.defaultColumns = 'title, icon, url'

ProductDownload.schema.post('save', async (d) => {
  if (d.icon && d.icon.secure_url) {
    await download(d.icon.secure_url)
  }
})

ProductDownload.register()
