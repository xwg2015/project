# /bin/bash

cp -R ./server/. ../../production/blog_admin_production

echo '服务端代码拷贝完成'

cp -R ./dist/css ../../production/blog_admin_production/public
cp -R ./dist/fonts ../../production/blog_admin_production/public
cp -R ./dist/img ../../production/blog_admin_production/public
cp -R ./dist/js ../../production/blog_admin_production/public

echo '静态资源拷贝完成'

cp -R ./dist/blog_admin.html ../../production/blog_admin_production/views

echo '页面拷贝完成'

