const keystone = require('keystone')
const Types = keystone.Field.Types

const Enquiry = new keystone.List('Enquiry', {
  nocreate: true,
  noedit: true,
})

Enquiry.add({
  name: { type: String, required: true },
  email: { type: Types.Email, required: true },
  phone: { type: String },
  enquiryType: { type: Types.Select, options: [
    { value: 'message', label: 'Just leaving a message' },
    { value: 'question', label: 'I\'ve got a question' },
    { value: 'other', label: 'Something else...' },
  ] },
  message: { type: Types.Textarea, height: 150, required: true },
  createdAt: { type: Date, default: Date.now },
})

Enquiry.defaultSort = '-createdAt'
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt'
Enquiry.register()
