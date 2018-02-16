var keystone = require('keystone')
var Types = keystone.Field.Types
const { withTranslation, applyTranslationHook } = require('../utils')

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
})

Post.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  image: { type: Types.CloudinaryImage },
  url: { type: Types.Url },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 },
  },
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
},
  'Internationalization',
  withTranslation.all({
    title: { type: String, label: 'Title' },
    content: {
      brief: { type: Types.Html, wysiwyg: true, label: 'Content Brief', height: 150 },
      extended: { type: Types.Html, wysiwyg: true, label: 'Content Extended', height: 400 },
    },
    categories: { type: String, label: 'Title' },
  })
)

applyTranslationHook(Post.schema)

Post.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief
})

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20% , i18nTranslations'
Post.register()
