/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
  ProductDescription: [
    {
      "name": "Middleware - The significance",
      "title": "The significance",
      "subtitle": "<p>of blockchain</p>\n" +
      "<p>has grown dramatically</p>",
      "details": "<p>Blockchain implementations appear on the market almost every day: BTC, LTC, BCC, BGC, Ethereum, NEM, WAVES and much more!</p>\n" +
      "<p>Each has its advantages and disadvantages, own architecture and rules.</p>",
    },{
      "name": "Middleware - Which blockchain",
      "title": "Which blockchain",
      "subtitle": "<p>to follow?</p>",
      "details": "<p>Money are not the only value, this value may be whatever you&rsquo;d want to &ndash; from simple number in balance, up to complex data usage in erc20, assets and mosaics.</p>\n" +
      "<p>As a result, each platform has its own significant purpose.</p>",
    },{
      "name": "Middleware - No need to choose",
      "title": "No need to choose",
      "subtitle": "<p>the better platform</p>",
      "details": null,
    },{
      "name": "Middleware - Make all platforms",
      "title": "Make all platforms act as your own service with ​DMT.",
      "subtitle": null,
      "details": "<p>DMT is a micro-services based platform, which aims to unite the different blockhain implementations into a single ecosystem, with unified interface and excellent scalability.</p>",
    },
  ]
}
