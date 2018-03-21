const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types

const Exchange = new keystone.List('Exchange', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Exchange.add({
  title: { type: String, required: true, initial: true },
  url: { type: Types.Url, initial: true },
  icon: { type: Types.CloudinaryImage, initial: true },
  icon2x: { type: Types.CloudinaryImage, initial: true }
})

Exchange.defaultColumns = 'title, icon, url'

Exchange.schema.post('save', async (d) => {
  await Promise.all([d.icon, d.icon2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Exchange.register()
