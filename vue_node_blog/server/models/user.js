var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 *  role 角色/权限
 *  1:游客 前后台页面均可访问，但无操作权限
 *  2:管理员 新建文章，简历，项目，只可编辑与自己有关的
 *  3:超级管理员 为所欲为
 */

var userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: Number,
    default: 1
  },
  time: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("User", userSchema);
