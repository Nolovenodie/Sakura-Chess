# Sakura-Chess

服务器 linux centos7
先安装环境
可以使用宝塔安装环境（www.bt.cn）
Apache2.4 mysql5.6 php7.1
环境安装完，导入数据库文件db.sql
数据库文件导入之后，修改根目录下的两个配置文件
data/conf/db.php
auto/php54n/config.php
配置文件修改之后，登录后台 http://域名/admin
后台默认帐号admin默认密码www.php85.com
建议登录之后修改密码
服务器需要开放6000-7000端口
然后进入服务器auto目录 运行./start-all.sh  启动游戏服务端
这里已经全部安装完成，然后是进入后台配置微信公众号

进入https://mp.weixin.qq.com，登录微信公众平台，在开发----->基本配置获取开发者ID(AppID)和开发者密码(AppSecret)，并设置微信IP白名单，然后在设置----->公众号设置----->功能设置，配置你的业务域名，JS接口安全域名，网页授权域名。然后进入网站后台填写微信appid和微信key，填完之后，点击保存按钮，然后再点击微信access_token的获取按钮，获取他的access_token。这里就全部配置完成了。

微信前台地址：  http://域名/
