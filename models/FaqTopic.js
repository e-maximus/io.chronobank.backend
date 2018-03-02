const keystone = require('keystone')
// const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')


const FaqTopic = new keystone.List('FaqTopic', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

FaqTopic.add({
  name: { type: String, required: true },
  title: { type: String }
},
  'Internationalization',
  withTranslation.all({
    title: { type: String, label: 'Title' },
  })
)

applyTranslationHook(FaqTopic.schema)

FaqTopic.schema.virtual('questions', {
  ref: 'FaqQuestion',
  localField: '_id',
  foreignField: 'topic',
  justOne: false
})

FaqTopic.relationship({ path: 'questions', ref: 'FaqQuestion', refPath: 'topic' })

FaqTopic.register()
