const axios = require('axios')
const config = require('config')
const sanitizeHtml = require('sanitize-html')
const { withTranslation } = require('../utils')

const solr = axios.create({
  baseURL: config.get('solr.url')
})

async function saveIndex (documents) {
  return await solr.post('update?commit=true&overwrite=true', documents.map(d => ({
    id: `FaqQuestion:${d._id}`,
    type_s: 'FaqQuestion',
    topic_s: d.topic,
    title_txt_en: d.title,
    brief_txt_en: sanitizeHtml(d.brief, {
      allowedTags: [],
      allowedAttributes: []
    }),
    ...withTranslation.withAllSolrIndices(d, {
      title: (override) => override.title,
      brief: (override) => sanitizeHtml(override.brief, {
        allowedTags: [],
        allowedAttributes: []
      })
    })
  })))
}

async function removeIndex (documents) {
  return solr.post('update?commit=true', {
    'delete': documents.map(d => `FaqQuestion:${d._id}`)
  })
}

async function clearIndex () {
  return solr.post('update?commit=true', {
    'delete': {
      query: 'type_s:FaqQuestion'
    }
  })
}

async function search (
  { locale = 'en', query = '*', topic = null, offset = 0, limit = 10 } =
  { locale: 'en', query: '*', topic: null, offset: 0, limit: 10}
) {
  const lang = withTranslation.LANGUAGES_MAP[locale] || withTranslation.LANGUAGES_MAP['en']
  const pattern = /([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\"])/g
  const params = {
    defType: 'edismax',
    q: query === '*' ? '*' : query.replace(pattern, "\\$1"),
    fq: !topic
      ? null
      : (Array.isArray(topic) ? topic : [ topic ]).map(c => `(topic_s:${c})`).join(' OR '),
    qf: `title_${lang.name}_${lang.solrTypeSuffix}^3 brief_${lang.name}_${lang.solrTypeSuffix}^2`,
    fl: '*,score',
    start: offset,
    rows: limit
  }
  const { data } = await solr.get('select', {
    params
  })

  return data
}

module.exports = {
  saveIndex,
  removeIndex,
  clearIndex,
  search
}
