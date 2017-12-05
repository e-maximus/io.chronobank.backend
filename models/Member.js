const keystone = require('keystone')
const download = require('../utils').download.intoDirectory(process.env.UPLOAD_DIR)
const Types = keystone.Field.Types

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
})

Member.defaultColumns = 'name, avatar, position'

Member.schema.post('save', async (d) => {
  await Promise.all([d.avatar, d.avatar2x]
    .map(image => (image && image.secure_url)
      ? download(image.secure_url)
      : Promise.resolve())
    )
})

Member.register()
