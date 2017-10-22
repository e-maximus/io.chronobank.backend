const keystone = require('keystone')
const Types = keystone.Field.Types

const Testimonial = new keystone.List('Testimonial', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
})

Testimonial.add({
  name: { type: String, required: true },
  position: { type: String },
  image: { type: Types.CloudinaryImage },
  image2x: { type: Types.CloudinaryImage },
  image448: { type: Types.CloudinaryImage },
  image2x448: { type: Types.CloudinaryImage },
  brief: { type: Types.Html, wysiwyg: true, height: 150 }
})

Testimonial.register()
