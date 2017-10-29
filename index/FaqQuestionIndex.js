const axios = require('axios')
const sanitizeHtml = require('sanitize-html')

const solr = axios.create({
  baseURL: process.env.SOLR_URI
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
  { query = '*', topic = null, offset = 0, limit = 10 } =
  { query: '*', topic: null, offset: 0, limit: 10}
) {
  const pattern = /([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\"])/g
  const params = {
    defType: 'edismax',
    q: query.replace(pattern, "\\$1"),
    fq: !topic
      ? null
      : (Array.isArray(topic) ? topic : [ topic ]).map(c => `(topic_s:${c})`).join(' OR '),
    qf: 'title_txt_en^3 brief_txt_en^2',
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
