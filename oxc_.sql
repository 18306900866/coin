/*
Navicat MySQL Data Transfer

Source Server         : localhsot
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : oxc

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-05-11 09:48:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_pageconfig
-- ----------------------------
DROP TABLE IF EXISTS `admin_pageconfig`;
CREATE TABLE `admin_pageconfig` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_pageconfig
-- ----------------------------

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `login_ip` varchar(30) DEFAULT NULL,
  `login_area` varchar(30) DEFAULT NULL,
  `jurisdiction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('1', 'admin', '83f07a64942a729d', '超级管理员', null, null, null, null);

-- ----------------------------
-- Table structure for code
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `code` varchar(10) DEFAULT NULL COMMENT '验证码',
  `time` varchar(20) DEFAULT NULL COMMENT '限制时间',
  `nub` int(1) DEFAULT NULL COMMENT '获取次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='验证码表';

-- ----------------------------
-- Records of code
-- ----------------------------

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj` varchar(50) DEFAULT NULL COMMENT '对象',
  `configs` varchar(255) DEFAULT NULL COMMENT '配置值',
  `types` varchar(255) DEFAULT NULL COMMENT '类型',
  `url` varchar(255) DEFAULT '' COMMENT '路径',
  `img` varchar(255) DEFAULT NULL COMMENT '图像地址',
  `msg` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` int(1) DEFAULT '1' COMMENT '1显示    0不显示',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES ('4', 'crona', '60', 's', '', '2019-03-14 14:15:00', '定时浮动频率', '1');
INSERT INTO `config` VALUES ('5', '轮播图', null, '1', '', 'http://wx3.sinaimg.cn/mw690/007EJ1SSgy1g113t0cdc3j308f03kmxs.jpg', '轮播图', '0');
INSERT INTO `config` VALUES ('6', '轮播图', null, '1', '', 'http://wx3.sinaimg.cn/large/007EJ1SSgy1g2boepf3yaj309v046wg5.jpg', '轮播图', '0');
INSERT INTO `config` VALUES ('7', '轮播图', null, '1', '', 'http://wx4.sinaimg.cn/mw690/007EJ1SSgy1g111aswri5j30ic0ac3zs.jpg', '轮播图', '1');
INSERT INTO `config` VALUES ('8', '轮播图', null, '1', '', 'http://wx3.sinaimg.cn/large/007EJ1SSgy1g2boepf3yaj309v046wg5.jpg', '轮播图', '1');
INSERT INTO `config` VALUES ('9', '迷你走势图', null, '3', '', 'http://tobee.vip/Upload/1552361689zw1.jpg', '迷你走势图', '1');
INSERT INTO `config` VALUES ('10', '轮播图', null, '1', '', 'http://wx1.sinaimg.cn/mw690/007EJ1SSgy1g2bogcp1vqj309v04bwgj.jpg', '轮播图', '1');
INSERT INTO `config` VALUES ('11', '轮播图', null, '1', '', 'http://wx1.sinaimg.cn/mw690/007EJ1SSgy1g12ji3tcmmj30gb07fwkz.jpg', '轮播图', '0');

-- ----------------------------
-- Table structure for currency
-- ----------------------------
DROP TABLE IF EXISTS `currency`;
CREATE TABLE `currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL COMMENT '中文名',
  `keyname` varchar(10) DEFAULT NULL COMMENT '缩写',
  `types` varchar(10) DEFAULT NULL COMMENT '类型',
  `money` decimal(12,3) unsigned DEFAULT NULL COMMENT '当前价格',
  `money_max` decimal(12,3) unsigned DEFAULT NULL COMMENT '24H 最高价',
  `money_min` decimal(12,3) unsigned DEFAULT NULL COMMENT '24H 最低价',
  `sales_all` varchar(20) DEFAULT NULL COMMENT '总销量',
  `sales_today` varchar(20) DEFAULT NULL COMMENT '24H 销量',
  `sales_max` varchar(20) DEFAULT NULL COMMENT '24H 最高价',
  `sales_min` varchar(20) DEFAULT NULL COMMENT '24H  最低价',
  `defloat` decimal(5,3) DEFAULT NULL COMMENT '初始浮动',
  `states` int(3) DEFAULT '0' COMMENT '1开 0关',
  `sort` int(5) DEFAULT '100' COMMENT '排序',
  `img` varchar(255) DEFAULT '' COMMENT '图片地址',
  `float_start` int(5) DEFAULT NULL COMMENT '初始浮动',
  `money_start` decimal(12,3) DEFAULT NULL COMMENT '发行价格（初始价）',
  `upfloat` decimal(5,3) DEFAULT NULL COMMENT '向上浮动',
  `dofloat` decimal(5,3) DEFAULT NULL COMMENT '向下浮动',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='币种信息表';

-- ----------------------------
-- Records of currency
-- ----------------------------

-- ----------------------------
-- Table structure for currency_history
-- ----------------------------
DROP TABLE IF EXISTS `currency_history`;
CREATE TABLE `currency_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hid` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `defloat` decimal(5,3) DEFAULT NULL COMMENT '浮动比',
  `types` varchar(3) DEFAULT NULL COMMENT '浮动类型 0下降 1上升',
  `money` decimal(12,3) DEFAULT NULL COMMENT '目前价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=869946 DEFAULT CHARSET=utf8 COMMENT='货币浮动记录';

-- ----------------------------
-- Records of currency_history
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(12) DEFAULT NULL COMMENT '账号',
  `password` varchar(35) DEFAULT NULL COMMENT '密码',
  `password_zj` varchar(35) DEFAULT NULL COMMENT '资金密码',
  `register_time` varchar(35) DEFAULT NULL COMMENT '注册时间',
  `register_ip` varchar(35) DEFAULT NULL COMMENT '注册ip',
  `login_time` varchar(35) DEFAULT NULL COMMENT '最后登录时间',
  `login_ip` varchar(35) DEFAULT NULL COMMENT '最后登录IP',
  `login_city` varchar(35) DEFAULT NULL COMMENT '最后登录城市',
  `referrer` varchar(10) DEFAULT NULL COMMENT '推荐人',
  `states` int(11) DEFAULT '1' COMMENT '1可用 0封号',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for user_authentication
-- ----------------------------
DROP TABLE IF EXISTS `user_authentication`;
CREATE TABLE `user_authentication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `name` varchar(10) DEFAULT NULL COMMENT '身份证名',
  `card_code` varchar(20) DEFAULT NULL COMMENT '身份证号码',
  `bank_code` varchar(35) DEFAULT NULL COMMENT '银行卡号码',
  `result` varchar(10) DEFAULT '0' COMMENT '结果 0审核中  1审核成功 2审核失败',
  `operator` varchar(10) DEFAULT '' COMMENT '操作人',
  `operator_time` varchar(30) DEFAULT '' COMMENT '审核时间',
  `time` varchar(30) DEFAULT NULL COMMENT '申请时间',
  `nubers` int(1) DEFAULT NULL COMMENT '申请次数',
  `city` varchar(20) DEFAULT '' COMMENT '开户行',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='信息认证表';

-- ----------------------------
-- Records of user_authentication
-- ----------------------------

-- ----------------------------
-- Table structure for user_buy
-- ----------------------------
DROP TABLE IF EXISTS `user_buy`;
CREATE TABLE `user_buy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `account` varchar(20) DEFAULT NULL COMMENT '用户账号',
  `time` varchar(30) DEFAULT NULL COMMENT '买卖时间',
  `quantity` varchar(10) DEFAULT NULL COMMENT '数量',
  `money` decimal(12,3) DEFAULT NULL COMMENT '单价',
  `money_all` decimal(12,3) DEFAULT NULL COMMENT '总计',
  `result` varchar(20) DEFAULT NULL COMMENT '购买结果',
  `orders` varchar(30) DEFAULT NULL COMMENT '订单号',
  `currency_id` varchar(4) DEFAULT NULL COMMENT '货币ID',
  `currency_name` varchar(20) DEFAULT NULL COMMENT '货币名称 KEY/CLASS',
  `types` varchar(2) DEFAULT NULL COMMENT '1 买入 0卖出',
  `real_order` tinyint(3) DEFAULT '1' COMMENT '0系统订单   1用户订单',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='货币交易表';

-- ----------------------------
-- Records of user_buy
-- ----------------------------

-- ----------------------------
-- Table structure for user_drawings
-- ----------------------------
DROP TABLE IF EXISTS `user_drawings`;
CREATE TABLE `user_drawings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `account` varchar(12) DEFAULT NULL COMMENT '用户账号',
  `money` decimal(12,3) DEFAULT NULL COMMENT '提现金额',
  `time` varchar(30) DEFAULT NULL COMMENT '申请时间',
  `bankcrad` varchar(40) DEFAULT NULL COMMENT '申请提现卡号',
  `result` varchar(10) DEFAULT NULL COMMENT '申请结果',
  `operator` varchar(10) DEFAULT NULL COMMENT '操作人',
  `orders` varchar(20) DEFAULT NULL COMMENT '订单号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='提现记录表';

-- ----------------------------
-- Records of user_drawings
-- ----------------------------

-- ----------------------------
-- Table structure for user_moneylog
-- ----------------------------
DROP TABLE IF EXISTS `user_moneylog`;
CREATE TABLE `user_moneylog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `orders` varchar(20) DEFAULT NULL COMMENT '流水号 C 充值  T 提现 P 买卖货币',
  `types` varchar(2) DEFAULT NULL COMMENT '类型：1收入  0支出',
  `money` decimal(12,3) DEFAULT NULL COMMENT '当前余额',
  `change` decimal(12,3) DEFAULT NULL COMMENT '变动金额',
  `time` datetime DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流水表';

-- ----------------------------
-- Records of user_moneylog
-- ----------------------------

-- ----------------------------
-- Table structure for user_property
-- ----------------------------
DROP TABLE IF EXISTS `user_property`;
CREATE TABLE `user_property` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `money` decimal(12,3) DEFAULT '0.000' COMMENT '余额',
  `currency` varchar(255) DEFAULT NULL COMMENT '货币 a=1,b=2,f=1',
  `applying` decimal(12,3) DEFAULT '0.000' COMMENT '申请提现中的金额',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户资产信息';

-- ----------------------------
-- Records of user_property
-- ----------------------------

-- ----------------------------
-- Table structure for user_recharge
-- ----------------------------
DROP TABLE IF EXISTS `user_recharge`;
CREATE TABLE `user_recharge` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单流水号',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `account` varchar(12) DEFAULT NULL COMMENT '用户账号',
  `time` varchar(30) DEFAULT NULL COMMENT '操作时间',
  `money` decimal(12,3) DEFAULT NULL COMMENT '充值金额',
  `result` varchar(10) DEFAULT NULL COMMENT '充值结果',
  `orders` varchar(30) DEFAULT NULL COMMENT '订单流水号',
  `alipay` varchar(500) DEFAULT NULL COMMENT '官方订单号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户充值';

-- ----------------------------
-- Records of user_recharge
-- ----------------------------
