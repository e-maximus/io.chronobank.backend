const keystone = require('keystone')
const Types = keystone.Field.Types

const ProductDownload = new keystone.List('ProductDownload', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
})

ProductDownload.add({
  title: { type: String, required: true },
  icon: { type: Types.CloudinaryImage },
  url: { type: Types.Url }
})

ProductDownload.relationship({ ref: 'Product', path: 'product', refPath: 'downloads' })

ProductDownload.register()
