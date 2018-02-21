const keystone = require('keystone')
const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

const Job = new keystone.List('Job', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Job.add({
  title: { type: String, required: true },
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  details: { type: Types.Html, wysiwyg: true, height: 250 }
},
  'Internationalization',
  withTranslation.all({
    title: { type: String, label: 'Title' },
    brief: { type: Types.Html, wysiwyg: true, label: 'Brief', height: 150 },
    details: { type: Types.Html, wysiwyg: true, label: 'Details', height: 250 }
  })
)

applyTranslationHook(Job.schema)

Job.relationship({ path: 'applications', ref: 'Application', refPath: 'job' })

Job.register()
