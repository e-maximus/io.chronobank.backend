const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

const Member = new keystone.List('Member', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Member.add({
  name: { type: String, required: true },
  avatar: { type: Types.CloudinaryImage },
  avatar2x: { type: Types.CloudinaryImage },
  position: { type: String },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
},
  'Internationalization',
  withTranslation.all({
    name: { type: String, label: 'Name' },
    position: { type: String, label: 'Position' },
    brief: { type: Types.Html, wysiwyg: true, label: 'Brief', height: 150 }
  })
)

applyTranslationHook(Member.schema)

Member.defaultColumns = 'name, avatar, position, i18nTranslations'

Member.schema.post('save', async (d) => {
  await Promise.all([d.avatar, d.avatar2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Member.register()
