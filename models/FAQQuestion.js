const keystone = require('keystone')
const Types = keystone.Field.Types

const FaqQuestion = new keystone.List('FaqQuestion', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
})

FaqQuestion.add({
  name: { type: String, required: true },
  title: { type: String },
  topic: { type: Types.Relationship, ref: 'FaqTopic' },
  brief: { type: Types.Html, wysiwyg: true, height: 350 },
})

FaqQuestion.relationship({ ref: 'FaqTopic', path: 'topic', refPath: 'questions' })

FaqQuestion.register()
