const keystone = require('keystone')
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

Social.register()
