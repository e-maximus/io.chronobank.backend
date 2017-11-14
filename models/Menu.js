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
  symbol: { type: Types.CloudinaryImage },
  icon32x32: { type: Types.CloudinaryImage },
  icon40x40: { type: Types.CloudinaryImage },
  children: { type: Types.Relationship, ref: 'Menu', many: true },
}, 'Display Options', {
  isVisibleInHeader: { type: Boolean, label: 'Show in the Header section' },
  isVisibleInFooter: { type: Boolean, label: 'Show in the Footer section' }
})

Menu.relationship({ ref: 'Menu', path: 'parent', refPath: 'children' })

Menu.defaultColumns = 'title, symbol, icon32x32, icon40x40, isVisibleInHeader, isVisibleInFooter, url'

Menu.register()
