const keystone = require('keystone')
const middleware = require('./middleware')
const medium = require('./medium')
const restful = require('restful-keystone')(keystone, {
  root: '/api/v1',
})

const Gallery = keystone.list('Gallery')
const Product = keystone.list('Product')
const Enquiry = keystone.list('Enquiry')
const Member = keystone.list('Member')
const Application = keystone.list('Application')
const Subscription = keystone.list('Subscription')
const Header = keystone.list('Header')
const Story = keystone.list('Story')
const FaqTopic = keystone.list('FaqTopic')
const FaqQuestion = keystone.list('FaqQuestion')
const Menu = keystone.list('Menu')

const FaqQuestionIndex = require('../index/FaqQuestionIndex')

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

// Setup Route Bindings
exports = module.exports = function (app) {

  // eslint-disable-next-line
  function errorHandler (err, req, res, next) { // Forced to have 4 arguments due to express convension about error handlers
    // eslint-disable-next-line
    console.log(err)
    res.status(500).send('error', { error: err })
  }

  app.use(errorHandler)

  app.all('/api/v1/*', keystone.middleware.cors)

  app.options('/api/v1/*', (req, res) => {
    res.send(200)
  })

  app.get('/', (req, res) => {
    res.redirect('/keystone/')
  })

  app.get('/api/v1/galleries/s/:slug', async (req, res) => {
    const gallery = await Gallery.model
      .findOne({
        'slug': req.params.slug
      })
      .populate({ path: 'images', options: { sort: { sortOrder: 1 } } })
      .exec()
    res.send(gallery)
  })

  app.get('/api/v1/galleries', async (req, res) => {
    const galleries = await Gallery.model
      .find({})
      .populate({ path: 'images', options: { sort: { sortOrder: 1 } } })
      .exec()
    res.send({
      galleries
    })
  })

  app.get('/api/v1/products/s/:slug', async (req, res) => {
    const product = await Product.model
      .findOne({
        'slug': req.params.slug
      })
      .populate('downloads')
      .populate('distros')
      .populate('features')
      .exec()
    res.send(product)
  })

  app.get('/api/v1/products', async (req, res) => {
    const products = await Product.model
      .find({})
      .populate('downloads')
      .populate('distros')
      .populate('features')
      .exec()
    res.send({
      products
    })
  })

  app.get('/api/v1/headers/s/:slug', async (req, res) => {
    const header = await Header.model
      .findOne({
        'slug': req.params.slug
      })
      .exec()
    res.send(header)
  })

  app.get('/api/v1/headers', async (req, res) => {
    const headers = await Header.model
      .find()
      .exec()
    res.send({
      headers
    })
  })

  app.get('/api/v1/stories/s/:slug', async (req, res) => {
    const product = await Story.model
      .findOne({
        'slug': req.params.slug
      })
      .exec()
    res.send(product)
  })

  // eslint-disable-next-line
  app.get('/api/v1/faq-questions/search', async (req, res) => {
    const page = await FaqQuestion.model.search(req.query)
    res.send(page)
  })

  app.get('/api/v1/faq-questions/reindex', async (req, res) => {
    await FaqQuestionIndex.clearIndex()
    await FaqQuestionIndex.saveIndex(await FaqQuestion.model.find().exec())
    res.send('OK')
  })

  app.post('/api/v1/enquiries', async (req, res) => {
    const body = req.body
    const persisted = await Enquiry.model.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      enquiryType: 'message',
      message: body.message
    })
    res.send(persisted)
  })

  app.post('/api/v1/subscriptions', async (req, res) => {
    const body = req.body
    const persisted = await Subscription.model.create({
      email: body.email
    })
    res.send(persisted)
  })

  app.post('/api/v1/applications', async (req, res) => {
    const body = req.body
    const persisted = await Application.model.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      job: body.job,
      message: body.message
    })
    res.send(persisted)
  })

  app.get('/api/v1/faq-topics', async (req, res) => {
    const topics = await FaqTopic.model
      .find()
      .sort(req.query.order || 'sortOrder')
      .populate({ path: 'questions', options: { sort: { sortOrder: 1 } } })
      .exec()
    res.send(topics.map(topic => ({
      ...topic.toJSON(),
      questions: [...topic.questions]
    })))
  })

  app.get('/api/v1/members', async (req, res) => {
    const members = await Member.model
      .find()
      .sort(req.query.order || 'sortOrder')
      .exec()
    res.send({
      members
    })
  })

  app.get('/api/v1/menus', async (req, res) => {
    const menus = await Menu.model
      .find()
      .sort(req.query.order || 'sortOrder')
      .populate({ path: 'children', options: { sort: { sortOrder: 1 } } })
      .exec()
    res.send(menus.map(menu => ({
      ...menu.toJSON(),
      children: [...menu.children]
    })))
  })

  app.use('/api/v1/medium', medium)

  restful.expose({
    Article: {
      methods: ['list', 'retrieve']
    },
    Contact: {
      methods: ['list', 'retrieve']
    },
    Feature: {
      methods: ['list', 'retrieve']
    },
    Job: {
      methods: ['list', 'retrieve']
    },
    Header: {
      methods: ['retrieve'],
    },
    Iteration: {
      methods: ['list', 'retrieve'],
    },
    Member: {
      methods: ['retrieve']
    },
    Menu: {
      methods: ['retrieve']
    },
    Paper: {
      methods: ['list', 'retrieve']
    },
    Partner: {
      methods: ['list', 'retrieve']
    },
    Post: {
      methods: ['list', 'retrieve'],
      populate: ['categories', 'author'],
    },
    Product: {
      methods: ['retrieve'],
      populate: ['downloads', 'distros', 'features'],
    },
    Social: {
      methods: ['list', 'retrieve']
    },
    Statistic: {
      methods: ['list', 'retrieve']
    },
    Story: {
      methods: ['list', 'retrieve'],
    },
    Testimonial: {
      methods: ['list', 'retrieve'],
    }
  }).start()
}
