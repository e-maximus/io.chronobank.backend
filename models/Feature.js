const keystone = require('keystone')
const Types = keystone.Field.Types

const Feature = new keystone.List('Feature', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Feature.add({
  title: { type: String, required: true },
  image: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Feature.defaultColumns = 'title, image'

Feature.register()
