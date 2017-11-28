# /bin/bash

cp -R ./server/. ../../production/admin_production

echo '服务端代码拷贝完成'

cp -R ./dist/css ../../production/admin_production/public
cp -R ./dist/fonts ../../production/admin_production/public
cp -R ./dist/img ../../production/admin_production/public
cp -R ./dist/js ../../production/admin_production/public

echo '静态资源拷贝完成'

cp -R ./dist/admin.html ../../production/admin_production/views

echo '页面拷贝完成'

find ../../production/admin_production/app.js | xargs perl -pi -e 's|127.0.0.1:27017/test|xiongwengang.xyz:27017/blog|g'

find ../../production/admin_production/app.js | xargs perl -pi -e 's|useMongoClient: true|user: "admin", pass: "admin2015@", auth: { authdb: "admin" }, useMongoClient: true|g'

echo '数据库操作连接代码替换完成'
