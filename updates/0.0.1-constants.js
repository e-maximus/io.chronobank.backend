/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
  Constant: [
    {"name": "Phone", "value": "Phone"},
    {"name": "and Yes, it’s easy to deploy!", "value": "and Yes, it’s easy to deploy!" },
    {"name": "Thank you for interest in", "value": "Thank you for interest in" },
    {"name": "Confirm vacancy message", "value": "We have received your application and we look forward to reviewing the applications soon. We will call successful applicants for an interview at that time." },
    {"name": "Thank you! Our team will contact you shortly.", "value": "Thank you! Our team will contact you shortly." },
    {"name": "Send", "value": "Send" },
    {"name": "OK", "value": "OK" },
    {"name": "Additional information links", "value": "Additional information, links: portfolio url, linkedin, github, telegram, skype etc." },
    {"name": "News", "value": "News" },
    {"name": "Buy time tokens", "value": "Buy time tokens" },
  ]
}
