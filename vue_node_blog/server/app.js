var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compression = require('compression')

var app = express();

// nodejs通过compression中间件开通gzip
app.use(compression());
app.use(logger('dev'));

// You need to use express.cookieParser() before app.router; middleware is run in order, meaning it’s never even reaching cookieParser() before your route is executed.
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());

// 开发过程中取消模板缓存，vuejs混合nodejs项目，无模板
// var swig = require('swig');
// swig.setDefaults({cache: false});

// 连接数据库
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/test', {useMongoClient: true});

// cookie设置
var Cookies = require('cookies');
app.use(function (req, res, next) {
  req.cookies = new Cookies(req, res);
  req.userInfo = {};
  if (req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

// 解析post提交的数据
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup，vuejs混合nodejs项目，无模板
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'public')));

// api接口
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

/**
 * FIXME:
 * 本地开发服务端支持跨域设置
 * 默认情况下，标准的跨域请求是不会发送cookie等用户认证凭据的
 * 1.前端请求 widthCredentials: true
 * 2.服务端响应头 Access-Control-Allow-Origin: req.getHeader("Origin") 不能再是通配符
 * 3.服务端响应头 Access-Control-Allow-Credentials: true
 * 以上方式未能实现，采取proxytable方式
 */
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.getHeader("Origin"));
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", '3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
