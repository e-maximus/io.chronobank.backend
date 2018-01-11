const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
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

Feature.schema.post('save', async (d) => {
  if (d.image && d.image.secure_url) {
    await download(d.image.secure_url)
  }
})

Feature.register()
