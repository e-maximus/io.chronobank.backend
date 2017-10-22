const keystone = require('keystone')
const Types = keystone.Field.Types

const ProductDistro = new keystone.List('ProductDistro', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
})

ProductDistro.add({
  name: { type: String, required: true },
  title: { type: String },
  stereotype: { type: Types.Select, options: [
    { value: 'desktop', label: 'Desktop' },
    { value: 'mobile', label: 'Mobile' }
  ]},
  icon: { type: Types.CloudinaryImage },
  url: { type: Types.Url }
})

ProductDistro.relationship({ ref: 'Product', path: 'product', refPath: 'distros' })

ProductDistro.register()
