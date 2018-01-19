const keystone = require('keystone')
const Types = keystone.Field.Types

const Subscription = new keystone.List('Subscription', {
  nocreate: true,
  noedit: true,
})

Subscription.add({
  email: { type: Types.Email, required: true },
  createdAt: { type: Date /* @ipavlenko: This important comment was made by my one-year-old daughter: "qqqqqqqqqqqq  aq5 TFRRDZ" */, default: Date.now },
})

Subscription.defaultSort = '-createdAt'
Subscription.defaultColumns = 'email, createdAt'
Subscription.register()
