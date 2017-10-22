// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config()

// Require keystone
var keystone = require('keystone')

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
  'name': 'backend.chronobank.io',
  'brand': 'backend.chronobank.io',

  'sass': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  // 'views': 'templates/views',
  // 'view engine': '.hbs',

  // 'custom engine': handlebars.create({
  //   layoutsDir: 'templates/views/layouts',
  //   partialsDir: 'templates/views/partials',
  //   defaultLayout: 'default',
  //   helpers: new require('./templates/views/helpers')(),
  //   extname: '.hbs',
  // }).engine,

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
})

// Load your project's Models
keystone.import('models')

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
})

keystone.set('cors allow origin', true)

// Load your project's Routes
keystone.set('routes', require('./routes'))


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  general: ['stories', 'products', 'product-downloads', 'product-distros', 'product-features', 'features', 'statistics', 'headers', 'iterations'],
  media: ['posts', 'post-categories', 'articles', 'galleries'],
  references: ['testimonials', 'partners', 'members', 'jobs'],
  // galleries: 'galleries',
  enquiries: 'enquiries',
  users: 'users',
})

// Start Keystone to connect to your database and initialise the web server

keystone.start()
