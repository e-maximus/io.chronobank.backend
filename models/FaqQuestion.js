const keystone = require('keystone')
const FaqQuestionIndex = require('../index/FaqQuestionIndex')
const Types = keystone.Field.Types

const FaqQuestion = new keystone.List('FaqQuestion', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

FaqQuestion.add({
  name: { type: String, required: true },
  title: { type: String },
  topic: { type: Types.Relationship, ref: 'FaqTopic' },
  brief: { type: Types.Html, wysiwyg: true, height: 350 },
})

FaqQuestion.defaultColumns = 'name|20%, title, topic|20%'


FaqQuestion.schema.post('save', async (d) => {
  try {
    FaqQuestionIndex.saveIndex([d])
  } catch (e) {
    // eslint-disable-next-line
    console.log('Error saving document index')
  }
})

FaqQuestion.schema.post('remove', async (d) => {
  try {
    FaqQuestionIndex.removeIndex([d])
  } catch (e) {
    // eslint-disable-next-line
    console.log('Error removing document index')
  }
})

FaqQuestion.schema.statics.search = async (...args) => {
  try {
    const { response } = await FaqQuestionIndex.search.apply(null, args)
    return {
      total: response.numFound,
      offset: response.start,
      elements: response.docs
        ? await Promise.all(
          response.docs
            .map(async (doc) => ({
              score: doc.score,
              document: await FaqQuestion.model.findById(doc.id.split(':')[1]).exec()
            }))
        )
        : []
    }
  } catch (e) {
    // eslint-disable-next-line
    console.log('Error in solr query', e)
    return {}
  }
}

FaqQuestion.register()
