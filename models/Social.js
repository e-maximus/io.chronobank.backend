const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types

const Social = new keystone.List('Social', {
  map: { name: 'title' },
  sortable: true
})

Social.add({
  title: { type: String, required: true },
  icon32x32: { type: Types.CloudinaryImage },
  url: { type: String },
})

Social.defaultColumns = 'title, icon32x32, url'

Social.schema.post('save', async (d) => {
  if (d.icon32x32 && d.icon32x32.secure_url) {
    await download(d.icon32x32.secure_url)
  }
})

Social.register()
