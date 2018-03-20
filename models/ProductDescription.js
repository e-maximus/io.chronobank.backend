const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const { withTranslation, applyTranslationHook } = require('../utils')
const Types = keystone.Field.Types

const ProductDescription = new keystone.List('ProductDescription', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

ProductDescription.add({
  name: { type: String, required: true },
  title: { type: String },
  subtitle: { type: Types.Html, wysiwyg: true, height: 150 },
  details: { type: Types.Html, wysiwyg: true, height: 150 }
},
  'Internationalization',
  withTranslation.withAllTranslations({
    title: { type: String, label: 'Title' },
    subtitle: { type: Types.Html, wysiwyg: true, height: 150 },
    details: { type: Types.Html, wysiwyg: true, height: 150 }
  })
)
applyTranslationHook(ProductDescription.schema)

ProductDescription.relationship({ ref: 'Product', path: 'product', refPath: 'descriptions' })

ProductDescription.schema.post('save', async (d) => {
  await Promise.all([d.image, d.image2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
  )
})

ProductDescription.register()
