const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const { withTranslation, applyTranslationHook } = require('../utils')
const Types = keystone.Field.Types

const ProductFeature = new keystone.List('ProductFeature', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

ProductFeature.add({
  name: { type: String, required: true },
  title: { type: String },
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage }
},
  'Internationalization',
  withTranslation.withAllTranslations({
    title: { type: String, label: 'Title' },
  })
)
applyTranslationHook(ProductFeature.schema)

ProductFeature.relationship({ ref: 'Product', path: 'product', refPath: 'features' })

ProductFeature.schema.post('save', async (d) => {
  await Promise.all([d.image, d.image2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

ProductFeature.register()
