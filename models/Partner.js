const keystone = require('keystone')
const Types = keystone.Field.Types

const Partner = new keystone.List('Partner', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Partner.add({
  title: { type: String, required: true },
  url: { type: Types.Url },
  icon: { type: Types.CloudinaryImage },
  icon2x: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Partner.defaultColumns = 'title, icon, url'

Partner.register()
