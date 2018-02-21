const keystone = require('keystone')
const config = require('config')
const download = require('../utils').download.intoDirectory(config.get('uploads.dir'))
const Types = keystone.Field.Types

const GalleryImage = new keystone.List('GalleryImage', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

GalleryImage.add({
  title: { type: String, initial: true, required: true },
  gallery: { type: Types.Relationship, ref: 'Gallery', initial: true, required: true },
  image: { type: Types.CloudinaryImage, initial: true, required: true }
})

GalleryImage.defaultColumns = 'title, gallery, image'

GalleryImage.schema.post('save', async (d) => {
  if (d.image && d.image.secure_url) {
    await download(d.image.secure_url)
  }
})

GalleryImage.register()
