const keystone = require('keystone')
const Types = keystone.Field.Types

const Statistic = new keystone.List('Statistic', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
})

Statistic.add({
  title: { type: String, required: true },
  image: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Statistic.register()
