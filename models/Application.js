const keystone = require('keystone')
const Types = keystone.Field.Types

const Application = new keystone.List('Application', {
  nocreate: true,
  noedit: true,
})

Application.add({
  name: { type: String, required: true },
  email: { type: Types.Email, required: true },
  phone: { type: String },
  job: { type: Types.Relationship, ref: 'Job' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

Application.defaultSort = '-createdAt'
Application.defaultColumns = 'name, email, enquiryType, createdAt'
Application.register()
