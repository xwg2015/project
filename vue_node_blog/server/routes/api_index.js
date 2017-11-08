var express = require('express');
var router = express.Router();
var Article = require('../models/article')

router.get('/getArticles', function(req, res, next) {
  Article.find({}, function(err, data) {
    if (err) throw err;
    res.send(data)
  })
})

module.exports = router;
