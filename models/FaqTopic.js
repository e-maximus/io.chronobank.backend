const keystone = require('keystone')
// const Types = keystone.Field.Types

const FaqTopic = new keystone.List('FaqTopic', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

FaqTopic.add({
  name: { type: String, required: true },
  title: { type: String }
})

FaqTopic.schema.virtual('questions', {
  ref: 'FaqQuestion',
  localField: '_id',
  foreignField: 'topic',
  justOne: false
})

FaqTopic.relationship({ path: 'questions', ref: 'FaqQuestion', refPath: 'topic' })

FaqTopic.register()
