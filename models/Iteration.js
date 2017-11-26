const keystone = require('keystone')
const download = require('../utils').download.intoDirectory(process.env.UPLOAD_DIR)
const Types = keystone.Field.Types

const Iteration = new keystone.List('Iteration', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Iteration.add({
  title: { type: String, required: true },
  date: { type: Types.Date, index: true },
  image: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Iteration.defaultColumns = 'title, image, date'

Iteration.schema.post('save', async (d) => {
  if (d.image && d.image.secure_url) {
    try {
      await download(d.image.secure_url)
    } catch (e) {
      console.log(e)
    }
  }
})

Iteration.register()
