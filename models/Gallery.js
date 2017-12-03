const keystone = require('keystone')

const Gallery = new keystone.List('Gallery', {
  autokey: { from: 'name', path: 'key', unique: true },
})

Gallery.add({
  name: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now }
})

Gallery.relationship({ path: 'images', ref: 'GalleryImage', refPath: 'gallery' })

Gallery.register()
