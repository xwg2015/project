# 步行街热帖项目

## 产品需求
开发一款移动端步行街热帖应用，只展示今日热帖和亮回复，只有浏览的功能，针对那些只爱看热帖且不回复的用户。

## 技术栈
H5：vue + vuex + axios  
[步行街热帖m站](http://106.14.201.222/bxj.html#/list)

APP：H5项目构建出来的代码通过apicloud平台打包成IOS或者安卓（目前只支持安卓）  
![image](https://raw.githubusercontent.com/JustLikeU/project/master/vue_buxingjie/bxj1024.png) 

## 本地跑代码（记得开跨域）

``` bash
npm install

npm run dev
```

## 项目缺陷
1. 通过浏览器打开的页面看不到图片，禁止访问；
2. 安卓app内不知道为何能访问到图片，但是动图动不了；
3. 爬虫很懒，都是人工手动触发爬取，有时间再研究下如何再服务端定期工作；
4. 未知bug的存在。
