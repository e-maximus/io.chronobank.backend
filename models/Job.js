const keystone = require('keystone')
const Types = keystone.Field.Types

const Job = new keystone.List('Job', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

Job.add({
  title: { type: String, required: true },
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  details: { type: Types.Html, wysiwyg: true, height: 250 }
})

Job.relationship({ path: 'applications', ref: 'Application', refPath: 'job' })

Job.register()
