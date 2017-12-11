var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * name 项目名称
 * title 项目作者
 * about 项目简介
 * cover 封面图
 * link 项目链接
 * isShow 前台展示
 */
var projectSchema = new Schema({
    name: String,
    author: String,
    about: String,
    cover: String,
    link: String,
    isShow: {
      type: Boolean,
      default: true
    },
    updateTime: {
      type: Date,
      default: Date.now
    },
    createTime: Date
});

module.exports = mongoose.model('Project', projectSchema);