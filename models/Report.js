const keystone = require('keystone')
const Types = keystone.Field.Types

const Report = new keystone.List('Report', {
  nocreate: true,
  noedit: true
})

Report.add({
  name: { type: String, required: true },
  email: { type: Types.Email, required: true },
  phone: { type: String },
  message: { type: Types.Textarea, required: true },
  createdAt: { type: Date, default: Date.now },
})

Report.defaultSort = '-createdAt'
Report.defaultColumns = 'name, email, phone, createdAt'
Report.register()
