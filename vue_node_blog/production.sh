# /bin/bash

cp -R ./server/. /Users/xwg/Documents/gitlab/blog_admin

echo '服务端代码拷贝完成'

cp -R ./dist/css /Users/xwg/Documents/gitlab/blog_admin/public
cp -R ./dist/fonts /Users/xwg/Documents/gitlab/blog_admin/public
cp -R ./dist/img /Users/xwg/Documents/gitlab/blog_admin/public
cp -R ./dist/js /Users/xwg/Documents/gitlab/blog_admin/public

echo '静态资源拷贝完成'

cp -R ./dist/admin.html /Users/xwg/Documents/gitlab/blog_admin/views

echo '页面拷贝完成'

find /Users/xwg/Documents/gitlab/blog_admin/app.js | xargs perl -pi -e 's|127.0.0.1:27017/test|xiongwengang.xyz:27017/blog|g'

find /Users/xwg/Documents/gitlab/blog_admin/app.js | xargs perl -pi -e 's|useMongoClient: true|user: "root", pass: "xwg2015@", auth: { authdb: "admin" }, useMongoClient: true|g'

echo '数据库操作连接代码替换完成'
