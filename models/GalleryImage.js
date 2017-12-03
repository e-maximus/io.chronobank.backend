const keystone = require('keystone')
const download = require('../utils').download.intoDirectory(process.env.UPLOAD_DIR)
const Types = keystone.Field.Types

const GalleryImage = new keystone.List('GalleryImage', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true
})

GalleryImage.add({
  title: { type: String, required: true },
  image: { type: Types.CloudinaryImage }
})

GalleryImage.relationship({ ref: 'Gallery', path: 'gallery', refPath: 'images' })

GalleryImage.defaultColumns = 'title, icon, url'

GalleryImage.schema.post('save', async (d) => {
  if (d.image && d.image.secure_url) {
    await download(d.image.secure_url)
  }
})

GalleryImage.register()
