const keystone = require('keystone')
const Types = keystone.Field.Types

const Header = new keystone.List('Header', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
})

Header.add({
  title: { type: String, required: true },
  stereotype: { type: Types.Select, options: [
    { value: 'default', label: 'Default' },
    { value: 'splash', label: 'Splash' },
    { value: 'product', label: 'Product' },
    { value: 'text', label: 'Text' }
  ]},
  background: { type: Types.Select, options: [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
  ]},
  image: { type: Types.CloudinaryImage },
  image320: { type: Types.CloudinaryImage },
  image480: { type: Types.CloudinaryImage },
  image640: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage },
  image2x320: { type: Types.CloudinaryImage },
  image2x480: { type: Types.CloudinaryImage },
  image2x640: { type: Types.CloudinaryImage },
  video: { type: Types.Url },
  brief: { type: Types.Html, wysiwyg: true, height: 300 },
})

Header.register()
