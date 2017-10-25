const keystone = require('keystone')
const Types = keystone.Field.Types

const FAQQuestion = new keystone.List('FAQQuestion', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
})

FAQQuestion.add({
  name: { type: String, required: true },
  title: { type: String },
  topic: { type: Types.Relationship, ref: 'FAQTopic' },
  brief: { type: Types.Html, wysiwyg: true, height: 350 },
})

FAQQuestion.relationship({ ref: 'FAQTopic', path: 'topic', refPath: 'questions' })

FAQQuestion.register()
