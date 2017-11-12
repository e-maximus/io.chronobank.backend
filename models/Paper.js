const keystone = require('keystone')

const Paper = new keystone.List('Paper', {
  map: { name: 'title' },
  sortable: true
})

Paper.add({
  title: { type: String, required: true },
  url: { type: String },
})

Paper.defaultColumns = 'title, url'

Paper.register()
