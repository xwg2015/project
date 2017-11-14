var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var User = require("../models/user");
 
/**
 * 统一返回格式
 * code: 0 无错误
 */
var responseData;

router.use(function(req, res, next) {
  responseData = {
    code: 0,
    msg: "success",
    data: [],
    total: 0,
    userInfo: {
      username: ''
    }
  };
  next();
});

// 获取全部文章
// TODO: 实现标签查询
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

/**
 * 获取用户列表
 * 该列表只有超级管理员才有权限查看
 */
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
  var role;
  // 邀请码
  // TODO: 实现动态邀请码
  if (req.body.code === "_admin1122@") {
    role = 3
  } else if (req.body.code === "_admin1028@") {
    role = 2
  } else {
    role = 1
  }
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    role: role
  });

  user.save(function(err) {
    if (err) throw err;
    res.json(responseData);
  });
});

/**
 * 用户登录
 * code:1 用户名或密码错误
 */
router.post("/login", function(req, res, next) {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }).then(function(userInfo) {
    if (!userInfo) {
      responseData.code = 1;
      responseData.msg = '用户名或密码错误';
      res.json(responseData);
      return;
    }
    responseData.msg = '登录成功';
    responseData.userInfo.username = userInfo.username;
    /**
     * NOTE:
     * http的header字符集支持US-ASCII子集的字符集，故设置中文是'utf8'时就会报错
     * new Buffer('xxx').toString('base64')    转base64字符
     * new Buffer('xxx', 'base64').toString()  base64字符还原
     */
    req.cookies.set('userInfo', JSON.stringify({
      username: new Buffer(userInfo.username).toString('base64')
    }));
    res.json(responseData);
    return;
  });
});

module.exports = router;
