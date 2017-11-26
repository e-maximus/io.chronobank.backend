const keystone = require('keystone')
const Types = keystone.Field.Types

const ProductFeature = new keystone.List('ProductFeature', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

ProductFeature.add({
  name: { type: String, required: true },
  title: { type: String },
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage }
})

ProductFeature.relationship({ ref: 'Product', path: 'product', refPath: 'features' })

ProductFeature.register()
