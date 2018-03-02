const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

const Testimonial = new keystone.List('Testimonial', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Testimonial.add({
  name: { type: String, required: true },
  position: { type: String },
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage },
  image448: { type: Types.CloudinaryImage },
  image2x448: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
},
  'Internationalization',
  withTranslation.withAllTranslations({
    name: { type: String, label: 'Name' },
    position: { type: String, label: 'Position' },
    brief: { type: Types.Html, wysiwyg: true, label: 'Brief', height: 150 }
  })
)

applyTranslationHook(Testimonial.schema)

Testimonial.defaultColumns = 'name, position, image, i18nTranslations'

Testimonial.schema.post('save', async (d) => {
  await Promise.all([d.image, d.image2x, d.image448, d.image2x448]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Testimonial.register()
