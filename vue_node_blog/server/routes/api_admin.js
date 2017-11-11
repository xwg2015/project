var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var User = require("../models/user");

// 统一返回格式
var responseData;

router.use(function(req, res, next) {
  responseData = {
    code: 200,
    msg: "success",
    data: [],
    total: 0
  };
  next();
});

// 获取全部文章
// TODO:增加标签查询
router.get("/getArticle", function(req, res, next) {
  Article.find({ type: req.query.type }, function(err, data) {
    if (err) throw err;
    responseData.total = data.length;
  });

  Article.find({ type: req.query.type })
    .skip(Number((req.query.pageCurrent - 1) * req.query.pageSize))
    .limit(Number(req.query.pageSize))
    .sort({
      isTop: -1,
      _id: -1
    })
    .exec(function(err, data) {
      if (err) throw err;
      responseData.data = data;
      res.json(responseData);
    });
});

// 新建文章
router.post("/addArticle", function(req, res, next) {
  var article = new Article({
    author: "小熊",
    title: req.body.title,
    type: req.body.type,
    tags: req.body.tags,
    content: req.body.content
  });

  article.save(function(err) {
    if (err) throw err;
    res.json(responseData);
  });
});

// 更新文章
router.post("/editArticle", function(req, res, next) {
  var query = { _id: req.body.id };
  var update = {
    $set: {
      author: "小熊",
      title: req.body.title,
      type: req.body.type,
      tags: req.body.tags,
      content: req.body.content
    }
  };

  Article.update(query, update, function(err) {
    if (err) throw err;
    res.json(responseData);
  });
});

// 置顶文章、取消置顶
router.post("/topArticle", function(req, res, next) {
  var query = { _id: req.body.id };
  var update = {
    $set: {
      isTop: req.body.isTop
    }
  };

  Article.update(query, update, function(err) {
    if (err) throw err;
    res.json(responseData);
  });
});

// 前台页面隐藏文章、显示文章
router.post("/hideArticle", function(req, res, next) {
  var query = { _id: req.body.id };
  var update = {
    $set: {
      isShow: req.body.isShow
    }
  };

  Article.update(query, update, function(err) {
    if (err) throw err;
    res.json(responseData);
  });
});

// 获取用户列表
router.get("/getUser", function(req, res, next) {
  User.find({}, function(err, data) {
    if (err) throw err;
    responseData.total = data.length;
  });

  User.find({})
    .skip(Number((req.query.pageCurrent - 1) * req.query.pageSize))
    .limit(Number(req.query.pageSize))
    .sort({
      role: -1,
      _id: -1
    })
    .exec(function(err, data) {
      if (err) throw err;
      responseData.data = data;
      res.json(responseData);
    });
});

// 用户注册
router.post("/register", function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) throw err;
    res.json(responseData);
  });
});

// 用户登录

module.exports = router;
