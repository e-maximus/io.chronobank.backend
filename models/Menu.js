const keystone = require('keystone')
const Types = keystone.Field.Types

const Menu = new keystone.List('Menu', {
  map: { name: 'title' },
  sortable: true
})

Menu.add({
  title: { type: String, required: true },
  subtitle: { type: String },
  url: { type: String },
  icon18x18: { type: Types.CloudinaryImage },
  icon40x40: { type: Types.CloudinaryImage }
})

Menu.defaultColumns = 'title, url, icon18x18, icon40x40'

Menu.register()
