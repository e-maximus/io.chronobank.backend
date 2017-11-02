const keystone = require('keystone')
const Types = keystone.Field.Types

const Member = new keystone.List('Member', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Member.add({
  name: { type: String, required: true },
  avatar: { type: Types.CloudinaryImage },
  avatar2x: { type: Types.CloudinaryImage },
  position: { type: String },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Member.defaultColumns = 'order, name, avatar, position'

Member.register()
