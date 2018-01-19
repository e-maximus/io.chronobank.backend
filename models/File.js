const keystone = require('keystone')
const { originalFilename } = require('keystone-storage-namefunctions')
const config = require('config')
const path = require('path')

const Types = keystone.Field.Types

const storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: path.join(config.get('uploads.dir'), 'files'),
    publicPath: '/files/',
    generateFilename: originalFilename
  },
  schema: {
    originalname: true,
    path: true,
    url: true,
    size: true,
    mimetype: true,
  }
})

const File = new keystone.List('File', {
  sortable: true
})

File.add({
  name: { type: String, required: true, initial: true },
  file: { type: Types.File, storage, required: true, initial: true },
  url: { type: String, noedit: true }
})

File.schema.pre('save', async function (next) {
  this.url = this.file.url
  next()
})

File.defaultColumns = 'name, url'

File.register()
