const keystone = require('keystone')

const Gallery = new keystone.List('Gallery', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
})

Gallery.add({
  name: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now }
})

Gallery.relationship({ path: 'images', ref: 'GalleryImage', refPath: 'gallery' })

Gallery.register()
