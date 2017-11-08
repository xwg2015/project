var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    author: String,
    title: String,
    content: String,
    type: String,
    tag: String,
    time: {
      type: Date,
      default : Date.now()
    }
});

module.exports = mongoose.model('Article', articleSchema);