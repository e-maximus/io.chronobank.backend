const keystone = require('keystone')
const Types = keystone.Field.Types

const Subscription = new keystone.List('Subscription', {
  map: { name: 'email' },
  nocreate: true,
  noedit: true,
})

Subscription.add({
  email: { type: Types.Email, required: true },
  createdAt: { type: Date, default: Date.now },
})

Subscription.defaultSort = '-createdAt'
Subscription.defaultColumns = 'email, createdAt'
Subscription.register()
