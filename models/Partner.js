const keystone = require('keystone')
const download = require('../utils').download.intoDirectory(process.env.UPLOAD_DIR)
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

Partner.schema.post('save', async (d) => {
  await Promise.all([d.icon, d.icon2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Partner.register()
