const keystone = require('keystone')
const Types = keystone.Field.Types

const FAQTopic = new keystone.List('FAQTopic', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
})

FAQTopic.add({
  name: { type: String, required: true },
  title: { type: String },
  questions: { type: Types.Relationship, ref: 'FAQQuestion', many: true }
})

FAQTopic.register()
