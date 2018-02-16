const keystone = require('keystone')
const { withTranslation, applyTranslationHook } = require('../utils')

const Gallery = new keystone.List('Gallery', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Gallery.add({
  name: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now }
},
  'Internationalization',
  withTranslation.all({
    name: { type: String, label: 'Name' },
  })
)

applyTranslationHook(Gallery.schema)

Gallery.schema.virtual('images', {
  ref: 'GalleryImage',
  localField: '_id',
  foreignField: 'gallery',
  justOne: false
})

Gallery.relationship({ path: 'images', ref: 'GalleryImage', refPath: 'gallery' })

Gallery.register()
