const axios = require('axios')
const sanitizeHtml = require('sanitize-html')
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

FaqQuestion.defaultColumns = 'name|20%, title, topic|20%'

const solr = axios.create({
  baseURL: process.env.SOLR_URI
})

FaqQuestion.schema.post('save', async (d) => {
  try {
    const { data } = await solr.post('update?commitWithin=1000&overwrite=true', [
      {
        id: `FaqQuestion:${d._id}`,
        title_txt_en: d.title,
        brief_txt_en: sanitizeHtml(d.brief, {
          allowedTags: [],
          allowedAttributes: []
        })
      }
    ])
    // eslint-disable-next-line
    console.log('posted', `FaqQuestion:${d._id}`, data)
  } catch (e) {
    // eslint-disable-next-line
    console.log('error', e)
  }
})

FaqQuestion.schema.post('remove', async (d) => {
  try {
    const { data } = await solr.post('update?commitWithin=1000', {
      'delete': `FaqQuestion:${d._id}`
    })
    // eslint-disable-next-line
    console.log('removed', `FaqQuestion:${d._id}`, data)
  } catch (e) {
    // eslint-disable-next-line
    console.log('error', e)
  }
})

FaqQuestion.schema.statics.search = async ({ query = '*', offset = 0, limit = 10 } = { query: '*', offset: 0, limit: 10}) => {
  const pattern = /([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\"])/g
  const { data } = await solr.get('select', {
    params: {
      defType: 'edismax',
      q: query.replace(pattern, "\\$1"),
      qf: 'title_txt_en^3 brief_txt_en^2',
      fl: '*,score',
      start: offset,
      rows: limit
    }
  })
  try {
    const { response } = data
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
