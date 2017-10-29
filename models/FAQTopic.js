const keystone = require('keystone')
const Types = keystone.Field.Types

const FaqTopic = new keystone.List('FaqTopic', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
})

FaqTopic.add({
  name: { type: String, required: true },
  title: { type: String },
  questions: { type: Types.Relationship, ref: 'FaqQuestion', many: true }
})

FaqTopic.relationship({ path: 'questions', ref: 'FaqQuestion', refPath: 'topic' });

FaqTopic.register()
