var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * name 标签名称
 * type 标签所属类型
 * articles 标签文章列表
 */
var tagSchema = new Schema({
    name: String,
    type: String,
    articles: Array,
    articlesNum: Number
});

module.exports = mongoose.model('Tag', tagSchema);
