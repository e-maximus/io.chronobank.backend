const keystone = require('keystone')
const Types = keystone.Field.Types

const ProductDownload = new keystone.List('ProductFeature', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

ProductDownload.add({
  name: { type: String, required: true },
  title: { type: String },
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage }
})

ProductDownload.relationship({ ref: 'Product', path: 'product', refPath: 'features' })

ProductDownload.register()
