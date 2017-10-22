const keystone = require('keystone')
const Types = keystone.Field.Types

const Product = new keystone.List('Product', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
})

Product.add({
  name: { type: String, required: true },
  title: { type: String },
  stereotype: { type: Types.Select, options: [
    { value: 'default', label: 'Default' },
    { value: 'mirrored', label: 'Mirrored' }
  ]},
  background: { type: Types.Select, options: [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
  ]},
  icon: { type: Types.CloudinaryImage },
  icon2x: { type: Types.CloudinaryImage },
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage },
  mission: { type: Types.Html, wysiwyg: true, height: 100 },
  brief: { type: Types.Html, wysiwyg: true, height: 300 },
  downloads: { type: Types.Relationship, ref: 'ProductDownload', many: true },
  distros: { type: Types.Relationship, ref: 'ProductDistro', many: true },
  features: { type: Types.Relationship, ref: 'ProductFeature', many: true }
})

Product.register()
