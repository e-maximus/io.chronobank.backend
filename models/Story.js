const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types

const Story = new keystone.List('Story', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
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

Story.defaultColumns = 'title, image, legend'

Story.schema.post('save', async (d) => {
  await Promise.all([d.image, d.image2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Story.register()
