const keystone = require('keystone')
const Types = keystone.Field.Types

const Story = new keystone.List('Story', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
})

Story.add({
  title: { type: String, required: true },
  stereotype: { type: Types.Select, options: [
    { value: 'default', label: 'Default' },
    { value: 'mirrored', label: 'Mirrored' }
  ]},
  background: { type: Types.Select, options: [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
  ]},
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage },
  legend: { type: String },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Story.register()
