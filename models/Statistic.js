const keystone = require('keystone')
const download = require('../utils').download.intoDirectory(process.env.UPLOAD_DIR)
const Types = keystone.Field.Types

const Statistic = new keystone.List('Statistic', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Statistic.add({
  title: { type: String, required: true },
  image: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Statistic.defaultColumns = 'title, image'

Statistic.schema.post('save', async (d) => {
  if (d.image && d.image.secure_url) {
    await download(d.image.secure_url)
  }
})

Statistic.register()
