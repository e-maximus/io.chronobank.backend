/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
  Language: [
    {"title": "English", "label": "Eng", "key": "en"},
    {"title": "Russian", "label": "Rus", "key": "ru"},
    {"title": "Chinese", "label": "Chn", "key": "cn"},
    {"title": "German", "label": "Deu", "key": "de"},
    {"title": "Korean", "label": "Kor", "key": "ko"},
    {"title": "Malaysia", "label": "Msa", "key": "ms"},
    {"title": "Thai", "label": "Tha", "key": "th"},
    {"title": "Spanish", "label": "Spa", "key": "es"},
    {"title": "Viatnamese", "label": "Vie", "key": "vi"},
    {"title": "Arabian", "label": "Ara", "key": "ar"},
    
  ]
}
