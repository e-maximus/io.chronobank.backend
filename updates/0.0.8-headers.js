/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
  Header: [
    {
      "title": "Middleware page",
      "stereotype": "splash",
      "background": "middleware",
      "brief": "<h1>Distributed<br /> Blockchain Middleware<br /> Tracker</h1>\n" +
      "<h2>Your bridge to blockchain<br /> made by Chronobank.io</h2>\n" +
      "<p><img style=\"width: 147px; height: 20px;\" src=\"/static/images/logo/logo-white.svg\" alt=\"\" /></p>"
    },
  
  ]
}
