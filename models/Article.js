const keystone = require('keystone')
const Types = keystone.Field.Types

const Article = new keystone.List('Article', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Article.add({
  title: { type: String, required: true },
  source: { type: String },
  url: { type: Types.Url },
  icon: { type: Types.CloudinaryImage },
  icon2x: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Article.defaultColumns = 'title, icon, source, url'

Article.register()
