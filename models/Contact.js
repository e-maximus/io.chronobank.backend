const keystone = require('keystone')
const Types = keystone.Field.Types

const Contact = new keystone.List('Contact', {
  map: { name: 'title' },
  sortable: true
})

Contact.add({
  title: { type: String, required: true },
  icon32x32: { type: Types.CloudinaryImage },
  url: { type: String },
}, 'Display Options', {
  isVisibleInContacts: { type: Boolean, label: 'Show in the Contacts section' },
  isVisibleInFooter: { type: Boolean, label: 'Show in the Footer section' }
})

Contact.defaultColumns = 'title, icon32x32, url'

Contact.register()
