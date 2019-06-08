<?php

namespace Home\Controller;

use Think\Controller;
header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , GET');
class IndexController extends Controller {
    // public function _initialize(){
    // $_SESSION['uid'] = '1';
    // $_SESSION['user'] = 'yk';
    // }
    // 首页
    function index() {
        $data = array();
        $img_where['obj'] = '轮播图';
        $img_where['state'] = '1';
        $data['img'] = M('config') -> where($img_where) -> field('id,img,url') -> select();
        $hb_where['states'] = '1';
        $data['currency'] = M('currency') -> where($hb_where) -> field('money_start,id,img,keyname,types,sales_all,money,defloat') -> order('sort desc') -> select();
        $this -> assign('img', $data['img']);
        $this -> assign('currency', $data['currency']);
        $this -> assign('list', $data);
        $this -> display();
    }
    // 数据刷新
    function ajaxcurrency() {
        $hb_where['states'] = '1';
        $data = M('currency') -> where($hb_where) -> field('id,money_start,img,keyname,types,sales_all,money,defloat') -> order('sort desc') -> select();
        echo json_encode(array('data' => $data, 'sum' => count($data)));
    }
    // 货币详细信息表
    function message() {
        $data = array();
        $hb_where['id'] = I('get.hid');
        $data['currency'] = M('currency') -> where($hb_where) -> field('id,keyname,types,money,defloat,sales_today,money_max,money_min') -> order('sort desc') -> select();
        // 走势图
        $data['image'] = array('fs' => '', 'sd' => '');
        // 最新成交
        $but_where['currency_id'] = $hb_where['id'];
        $data['news'] = M('user_buy') -> where($but_where) -> field('time,quantity,money,types') -> order('id desc') -> limit(30) -> select();
        for ($i = 0; $i < count($data['news']); $i++) {
            $data['news'][$i]['time'] = substr($data['news'][$i]['time'], -8);
        }
        $this -> assign('list', $data);
        $this -> assign('currency', $data['currency']);
        $this -> assign('image', $data['image']);
        $this -> assign('news', $data['news']);
        $this -> assign('hid', $hb_where['id']);
        $this -> display();
    }
    // 币种资料
    function currency() {
    }
    // 买入--卖出 界面  交易历史
    function buy() {
        $data = array();
        $hid = I('get.hid', 0);
        if (!$_SESSION['uid'] && !$_SESSION['user']) {
            $this -> redirect('Login/index');
        }
        // 头部货币类型
        $currency = M('currency') -> where(array('states' => 1)) -> field('id,keyname,types,money') -> order('sort desc') -> select();
        if ($hid == 0) {
            $hid = $currency[0]['id'];
        }
        $data['top'] = array();
        foreach ($currency as $arr) {
            $data['top'] = array('id' => $arr['id'], 'name' => $arr['keyname'] . '/' . $arr['types']);
            if ($hid == $arr['id']) {
                $nowmoney = $arr['money'];
                $nowname = $arr['keyname'] . '/' . $arr['types'];
            }
        }
        $data['user'] = M('user_property') -> where(array('uid' => $_SESSION['uid'])) -> field('money,applying') -> find();
        $where1['currency_id'] = $hid;
        $where1['types'] = 1;
        $where2['currency_id'] = $hid;
        $where2['types'] = 0;
        // 最近卖出价
        $data['saledata'] = M('user_buy') -> where($where1) -> field('money,quantity') -> order('id desc') -> limit(6) -> select();
        // 最近买入价
        $data['buydata'] = M('user_buy') -> where($where2) -> field('money,quantity') -> order('id desc') -> limit(6) -> select();
        $but_where['currency_id'] = $hid;
        $but_where['time'] = array('elt', date('Y-m-d H:i:s'));
        $news = M('user_buy') -> where($but_where) -> field('time,quantity,money,types') -> order('time desc') -> limit(20) -> select();
        foreach ($news as $newarr) {
            $newarr['time'] = substr($newarr['time'], -8);
            $news_view[] = $newarr;
        }
        $imgzs = M('config') -> where(array('types' => 3)) -> limit(1) -> getField('img');
        $this -> assign('imgzs', $imgzs);
        $this -> assign('list', $data);
        $this -> assign('currencys', $currency);
        $this -> assign('usermoney', $data['user']['money']);
        $this -> assign('userapplying', $data['user']['applying']);
        $this -> assign('nowmoney', $nowmoney);
        $this -> assign('nowname', $nowname);
        $this -> assign('saledata', $data['saledata']);
        $this -> assign('buydata', $data['buydata']);
        $this -> assign('news', $news_view);
        $this -> assign('hid', $hid);
        $this -> display();
    }
    function buyt() {
        $dasss = M('currency') -> select();
        var_dump($dasss);
        $dasss = M('user_buy') -> limit(5) -> select();
        var_dump($dasss);
        $data = array();
        $hid = I('get.hid', 0);
        if (!$_SESSION['uid'] && !$_SESSION['user']) {
            $this -> redirect('Login/index');
        }
        // 头部货币类型
        $currency = M('currency') -> where(array('states' => 1)) -> field('id,keyname,types,money') -> order('sort desc') -> select();
        if ($hid == 0) {
            $hid = $currency[0]['id'];
        }
        $data['top'] = array();
        foreach ($currency as $arr) {
            $data['top'] = array('id' => $arr['id'], 'name' => $arr['keyname'] . '/' . $arr['types']);
            if ($hid == $arr['id']) {
                $nowmoney = $arr['money'];
                $nowname = $arr['keyname'] . '/' . $arr['types'];
            }
        }
        $data['user'] = M('user_property') -> where(array('uid' => $_SESSION['uid'])) -> field('money,applying') -> find();
        $where1['currency_id'] = $hid;
        $where1['types'] = 1;
        $where2['currency_id'] = $hid;
        $where2['types'] = 0;
        // 最近卖出价
        $data['saledata'] = M('user_buy') -> where($where1) -> field('money,quantity') -> limit(6) -> select();
        // 最近买入价
        $data['buydata'] = M('user_buy') -> where($where2) -> field('money,quantity') -> limit(6) -> select();
        $but_where['time'] = array('elt', date('Y-m-d H:i:s'));
        $news = M('user_buy') -> where($but_where) -> field('time,quantity,money,types') -> order('time desc') -> limit(20) -> select();
        foreach ($news as $newarr) {
            $newarr['time'] = substr($newarr['time'], -8);
            $news_view[] = $newarr;
        }
        $imgzs = M('config') -> where(array('types' => 3)) -> limit(1) -> getField('img');
        var_dump($imgzs);
        var_dump($data);
        var_dump($currency);
        var_dump($nowmoney);
        var_dump($nowname);
        var_dump($news_view);
    }
    function sale() {
        $data = array();
        $hid = I('get.hid', 0);
        if (!$_SESSION['uid'] && !$_SESSION['user']) {
            $this -> redirect('Login/index');
        }
        $uid = I('session.uid');
        // 头部货币类型
        $currency = M('currency') -> where(array('states' => 1)) -> field('id,keyname,types,money') -> order('sort desc') -> select();
        if ($hid == 0) {
            $hid = $currency[0]['id'];
        }
        $data['top'] = array();
        foreach ($currency as $arr) {
            $data['top'] = array('id' => $arr['id'], 'name' => $arr['keyname'] . '/' . $arr['types']);
            if ($hid == $arr['id']) {
                $nowmoney = $arr['money'];
                $nowname = $arr['keyname'] . '/' . $arr['types'];
            }
        }
        $data['user'] = M('user_property') -> where(array('uid' => $uid)) -> field('money,applying') -> find();
        $where1['currency_id'] = $hid;
        $where1['types'] = 1;
        $where2['currency_id'] = $hid;
        $where2['types'] = 0;
        // 最近卖出价
        $data['saledata'] = M('user_buy') -> where($where1) -> field('money,quantity') -> limit(6) -> select();
        // 最近买入价
        $data['buydata'] = M('user_buy') -> where($where2) -> field('money,quantity') -> limit(6) -> select();
        $but_where['time'] = array('elt', date('Y-m-d H:i:s'));
        $news = M('user_buy') -> where($but_where) -> field('time,quantity,money,types') -> order('time desc') -> limit(20) -> select();
        foreach ($news as $newarr) {
            $newarr['time'] = substr($newarr['time'], -8);
            $news_view[] = $newarr;
        }
        $imgzs = M('config') -> where(array('types' => 3)) -> limit(1) -> getField('img');
        $this -> assign('imgzs', $imgzs);
        $this -> assign('list', $data);
        $this -> assign('currencys', $currency);
        $this -> assign('usermoney', $data['user']['money']);
        $this -> assign('userapplying', $data['user']['applying']);
        $this -> assign('nowmoney', $nowmoney);
        $this -> assign('nowname', $nowname);
        $this -> assign('saledata', $data['saledata']);
        $this -> assign('buydata', $data['buydata']);
        $this -> assign('news', $news_view);
        $this -> assign('hid', $hid);
        $this -> display();
    }
    function history() {
        $data = array();
        $hid = I('get.hid', 0);
        if (!$_SESSION['uid'] && !$_SESSION['user']) {
            $this -> redirect('Login/index');
        }
        $uid = I('session.uid');
        // 头部货币类型
        $currency = M('currency') -> where(array('states' => 1)) -> field('id,keyname,types,money') -> order('sort desc') -> select();
        if ($hid == 0) {
            $hid = $currency[0]['id'];
        }
        $data['top'] = array();
        foreach ($currency as $arr) {
            $data['top'] = array('id' => $arr['id'], 'name' => $arr['keyname'] . '/' . $arr['types']);
            if ($hid == $arr['id']) {
                $nowname = $arr['keyname'] . '/' . $arr['types'];
            }
        }
        // 头部货币类型
        $but_where['uid'] = $uid;
        $but_where['currency_id'] = $hid;
        $tb_user_buy = M('user_buy') -> where($but_where) -> field('currency_name,time,quantity,money,money_all,types') -> order('time desc') -> limit(100) -> select();
        $this -> assign('hid', $hid);
        $this -> assign('list', $tb_user_buy);
        $this -> assign('currencys', $currency);
        $this -> assign('nowname', $nowname);
        $this -> display();
    }
    function ajaxpay() {
        // 买卖
        $types = I('post.types', 1);
        $hid = I('post.hid', 1);
        $num = I('post.nums', 1);
        $uid = I('session.uid', 1);
        $uname = I('session.uesr', 1);
        $pwd = I('post.pwd');
        // 验证密码
        $uwhere['uid'] = $uid;
        // $uwhere['password_zj'] = md5($pwd.'password');
        $password_zj = M('users') -> where($uwhere) -> getField('password_zj');
        $pwd_zj = md5($pwd . 'password');
        if ($password_zj == md5($pwd . 'password')) {
            $tb_user_property = M('user_property') -> where(array('uid' => $uid)) -> find();
            $user_money = $tb_user_property['money'];
            $tb_currency = M('currency') -> where(array('id' => $hid)) -> find();
            $currency_name = $tb_currency['keyname'] . '/' . $tb_currency['types'];
            $data['message'] = '购买失败！';
            if ($types == 1) {
                // 买
                $aggregate = $num * $tb_currency['money'];
                if ($aggregate > $user_money) {
                    $data['message'] = '0';
                } else {
                    // 扣钱
                    $model1 = M('user_property');
                    $model2 = M('user_moneylog');
                    $model3 = M('user_buy');
                    $model1 -> startTrans();
                    $model2 -> startTrans();
                    $model3 -> startTrans();
                    $where['uid'] = $uid;
                    $user_property_currency = $model1 -> where($where) -> getField('currency');
                    $where['money'] = array('egt', $aggregate);
                    $result1 = $model1 -> where($where) -> setDec('money', $aggregate);
                    // 加币
                    if ($result1) {
                        $have = explode(',', $user_property_currency);
                        $have_arr = array();
                        foreach ($have as $str) {
                            $arr = explode('=', $str);
                            if ($arr[0] != '') {
                                $have_arr[$arr[0]] = $arr[1];
                            }
                        }
                        if (isset($have_arr[$hid])) {
                            $have_arr[$hid] += $num;
                        } else {
                            $have_arr[$hid] = $num;
                        }
                        foreach ($have_arr as $key => $value) {
                            $new_currency[] = $key . '=' . $value;
                        }
                        $new_currency = implode(',', $new_currency);
                        $usermy = $model1 -> where(array('uid' => $uid)) -> setField('currency', $new_currency);
                        // 购买记录
                        $add_order = array('uid' => $uid, 'account' => $uname, 'time' => date('Y-m-d H:i:s'), 'quantity' => $num, 'money' => $tb_currency['money'], 'money_all' => $aggregate, 'result' => '购买成功', 'orders' => 'P' . time() . $uid, 'currency_id' => $hid, 'currency_name' => $currency_name, 'types' => '1', 'real_order' => '1');
                        $add_log = array('uid' => $uid, 'orders' => $add_order['orders'], 'types' => 0, 'money' => M('user_property') -> where(array('uid' => $uid)) -> getField('money'), 'change' => $aggregate, 'time' => $add_order['time']);
                        $addorders = $model3 -> add($add_order);
                        $logmsgs = $model2 -> add($add_log);
                        if ($result1 && $usermy && $addorders && $logmsgs) {
                            $model1 -> commit();
                            $model2 -> commit();
                            $model3 -> commit();
                            $data['message'] = '1';
                        } else {
                            $model1 -> rollback();
                            $model2 -> rollback();
                            $model3 -> rollback();
                            $data['message'] = '0';
                        }
                        // 流水
                    } else {
                        $data['message'] = '0';
                    }
                }
            } else {
                // 卖
                // 扣币 加钱 记录 流水
                $model1 = M('user_property');
                $model2 = M('user_moneylog');
                $model3 = M('user_buy');
                $model1 -> startTrans();
                $model2 -> startTrans();
                $model3 -> startTrans();
                $user_property_currency = $model1 -> where(array('uid' => $uid)) -> getField('currency');
                $have = explode(',', $user_property_currency);
                $have_arr = array();
                foreach ($have as $str) {
                    $arr = explode('=', $str);
                    $have_arr[$arr[0]] = $arr[1];
                }
                if (!isset($have_arr[$hid])) {
                    $have_arr[$hid] = 0;
                }
                $have_arr[$hid] = $have_arr[$hid] - (int) $num;
                $data['q'] = $have_arr;
                if ($have_arr[$hid] < 0) {
                    $data['message'] = '0';
                } else {
                    // 扣币
                    $new_c = array();
                    foreach ($have_arr as $key => $value) {
                        $new_c[] = $key . '=' . $value;
                    }
                    $new_currency = implode(',', $new_c);
                    $where['uid'] = $uid;
                    $result1 = $model1 -> where(array('uid' => $uid)) -> setField('currency', $new_currency);
                    // 加钱
                    if ($result1) {
                        $aggregate = $num * $tb_currency['money'] * 0.97;
                        // $aggregate = number_format($aggregate,3);
                        $usermys = $model1 -> where($where) -> find();
                        $moneymap = array('id' => $usermys['id'], 'money' => $usermys['money'] + $aggregate);
                        $usermy = $model1 -> save($moneymap);
                        // 购买记录
                        $add_order = array('uid' => $uid, 'account' => $uname, 'time' => date('Y-m-d H:i:s'), 'quantity' => $num, 'money' => $tb_currency['money'], 'money_all' => $aggregate, 'result' => '卖出成功', 'orders' => 'P' . time() . $uid, 'currency_id' => $hid, 'currency_name' => $currency_name, 'types' => '0', 'real_order' => '1');
                        $add_log = array('uid' => $uid, 'orders' => $add_order['orders'], 'types' => 1, 'money' => M('user_property') -> where(array('uid' => $uid)) -> getField('money'), 'change' => $aggregate, 'time' => $add_order['time']);
                        $addorders = $model3 -> add($add_order);
                        $logmsgs = $model2 -> add($add_log);
                        if ($result1 && $usermy && $addorders && $logmsgs) {
                            $model1 -> commit();
                            $model2 -> commit();
                            $model3 -> commit();
                            $data['message'] = '1';
                        } else {
                            $model1 -> rollback();
                            $model2 -> rollback();
                            $model3 -> rollback();
                            $data['message'] = '0';
                        }
                        // 流水
                    } else {
                        $data['message'] = '0';
                    }
                }
            }
        } else {
            if ($password_zj == null) {
                $data['message'] = '未设置提现密码！';
            } else {
                $data['message'] = '-1';
            }
        }
        $tb_user_property = M('user_property') -> where(array('uid' => $uid)) -> find();
        $data['money'] = '余额' . $tb_user_property['money'] . 'BTC';
        $data['applying'] = '冻结' . $tb_user_property['applying'] . 'BTC';
        echo json_encode($data);
    }
    // 交易接口  Ajax—api
    function transaction() {
        $types = I('post.types');
        $hid = I('post.hid');
        $uid = I('session.uid');
        $quantity = I('post.quantity');
        $money = ' ';
        // 买入或卖出的当前价格
        $money_all = $money * $quantity;
        $user_arr = M('users') -> where("uid={$uid}") -> select();
        $user_money = M('user_property') -> where("uid={$uid}") -> select();
        if ($types == 1) {
            // 金额是否充足 -》扣款
            if ($money_all >= $user_money['money']) {
                $return = array('result' => 0, 'message' => '余额不足');
                $is_ok = 0;
            } else {
                $Dec_where['uid'] = $uid;
                $Dec_where['money'] = array('egt', $money_all);
                $Dec_money = M('user_property') -> where($Dec_where) -> setDec('money', $money_all);
                $is_ok = $Dec_money;
            }
        } else {
            // 数量是否充足 -》卖出
            $have_num = 0;
            $new_message_arr = '';
            $have = explode(',', $user_money['currency']);
            foreach ($have as $cy) {
                $cy_arr = explode('=', $cy);
                if ($cy_arr[0] == $hid) {
                    $have_num = $cy_arr[1];
                } else {
                    $new_message_arr[] = $cy;
                }
            }
            if ($have_num >= $quantity) {
                // 卖出
                $hid_have = $have_num - $quantity;
                $new_message_arr[] = $hid . '=' . $hid_have;
                $new_message = implode(',', $new_message_arr);
                $user_property_up = M('user_property') -> where("uid={$uid}") -> setField('currency', $new_message);
                if ($user_property_up) {
                    // 加钱
                    $Dec_money = M('user_property') -> where("uid={$uid}") -> setInc('money', $money_all);
                    $is_ok = $Dec_money;
                } else {
                    $return = array('result' => 0, 'message' => '剩余数量不足');
                    $is_ok = 0;
                }
            }
        }
        if ($is_ok == 1) {
            $currency = M('currency') -> where("id={$hid}") -> field('id,keyname,types,money') -> find();
            $class = $types == 1 ? '购买成功' : '卖出成功';
            $data = array('uid' => $uid, 'account' => $user_arr['account'], 'time' => date('Y-m-d H:i:s'), 'quantity' => $quantity, 'money' => $money, 'money_all' => $money_all, 'result' => $class, 'orders' => 'M' . time() . $uid, 'currency_id' => $hid, 'currency_name' => $currency['keyname'] . '/' . $currency['types'], 'types' => $types);
            M('user_buy') -> add($data);
            $return = array('result' => 1);
        }
        echo json_encode($return);
    }
    // 资金详细页面
    function property() {
        if (!$_SESSION['uid'] && !$_SESSION['user']) {
            $this -> redirect('Login/index');
        }
        $data = array();
        $currency_arr = array();
        $data_hbmoney = array();
        $uid = I('session.uid', 0);
        if ($uid == 0) {
            A('Login/index');
        }
        $where['uid'] = $uid;
        $property = M('user_property') -> where($where) -> find();
        $tb_currency = M('currency') -> where(array('states' => 1)) -> select();
        $data['money'] = $property['money'];
        $currency = explode(',', $property['currency']);
        foreach ($currency as $arr) {
            $hb = explode('=', $arr);
            $currency_arr[$hb[0]] = $hb[1];
        }
        foreach ($tb_currency as $array) {
            $num = isset($currency_arr[$array['id']]) ? $currency_arr[$array['id']] : 0;
            $money = $array['money'] * $num;
            $data_hbmoney[] = $money;
            $money = number_format($money, 3);
            $data['currency'][] = array('logo' => $array['img'], 'name' => $array['keyname'], 'num' => $num, 'money' => $money);
        }
        $data['hbmoney'] = array_sum($data_hbmoney);
        $this -> assign('list', $data);
        $this -> assign('hbmoney', $data['hbmoney']);
        $this -> assign('money', number_format($data['money'], 3));
        $this -> assign('currency', $data['currency']);
        $this -> display();
    }
    // 定时任务 A  10S/次
    function crona() {
        // 获取当前所有货币信息
        $tb_currency = M('currency') -> where(array('states' => '1')) -> select();
        // 获取频率
        $tb_config = M('config') -> where(array('obj' => 'crona')) -> find();
        $time = $tb_config['img'];
        $second = $tb_config['time'];
        $last_time = date('Y-m-d H:i:s', strtotime("+{$second} second", strtotime($time)));
        $now = date('Y-m-d H:i:s');
        if ($now < $last_time) {
            die('时间未到');
        }
        foreach ($tb_currency as $currency) {
            $up = $currency['upfloat'] * 10000;
            $down = '-' . $currency['dofloat'] * 10000;
            $ss = mt_rand($down, $up);
            $FD = $ss / 10000;
            // + $currency['float_start'];
            $types = $FD >= 0 ? 1 : 0;
            if ($currency['money_start'] >= 1 && $currency['money_start'] < 10) {
                $dl = 1;
            } elseif ($currency['money_start'] >= 10 && $currency['money_start'] < 100) {
                $dl = 10;
            } elseif ($currency['money_start'] >= 100 && $currency['money_start'] < 1000) {
                $dl = 100;
            } elseif ($currency['money_start'] >= 1000 && $currency['money_start'] < 10000) {
                $dl = 1000;
            }
            $new_money = $currency['money_start'] * ($dl + $FD) / $dl;
            $FD = $ss / 10000 + $currency['float_start'];
            $adddata[] = array('hid' => $currency['id'], 'time' => $now, 'defloat' => $FD, 'types' => $types, 'money' => $new_money . '*' . $ss);
            // 更新货币信息
            $data['money'] = $new_money;
            $data['defloat'] = $FD;
            if ($FD > 0 && $new_money > $currency['money_max']) {
                $data['money_max'] = $new_money;
            }
            if ($FD < 0 && $new_money < $currency['money_min']) {
                $data['money_min'] = $new_money;
            }
            M('currency') -> where(array('id' => $currency['id'])) -> save($data);
            // 随机添加订单
            if (rand(0, 99) > 97) {
                $user_buy_data[] = array('time' => date('Y-m-d H:i:s'), 'quantity' => mt_rand(100, 999), 'money' => $new_money, 'currency_id' => $currency['id'], 'currency_name' => $currency['keyname'] . '/' . $currency['types'], 'types' => rand(0, 1));
            }
        }
        // 记录涨幅记录
        if (isset($adddata)) {
            M('currency_history') -> addAll($adddata);
        }
        if (isset($user_buy_data)) {
            M('user_buy') -> addAll($user_buy_data);
        }
    }
    function delch() {
        $time = time();
        $time = $time - 600;
        M('currency_history') -> where(array('time' => array('lt', date('Y-m-d H:i:s', $time)))) -> delete();
    }
    // 支付宝充值 第二次
    function pay() {
        if (!$_SESSION['uid'] && !$_SESSION['user']) {
            $this -> redirect('Login/index');
        }
        $this -> assign('order', 'C' . time() . $_SESSION['uid']);
        $this -> display();
    }
    // 支付  第一次
    function pays() {
        $this -> assign('order', 'C' . time() . $_SESSION['uid']);
        $this -> display();
    }
    // 支付  第二次
    function aapay() {
        $this -> assign('order', 'C' . time() . $_SESSION['uid']);
        $this -> display();
    }
    // 新第三方 from 提交地址 第三次
    function apay() {
        if (!$_SESSION['uid'] && !$_SESSION['user']) {
            $this -> redirect('Login/index');
        }
        $total = I('post.money', 200) * 100;
        // $prdOrdNo = I('post.orderid','C'.time().$_SESSION['uid']);
        $out_trade_no = 'C' . time() . $_SESSION['uid'];
        $url = 'http://pay.1000pays.com/Gateway/api';
        // 请求地址请联系本公司技术专员获取
        // 接口参数
        $data = ['appid' => '3298877565', 'method' => 'wx_native', 'data' => ['store_id' => '', 'total' => $total, 'nonce_str' => $this -> getRandom(), 'openid' => '', 'body' => 'oxc充值', 'out_trade_no' => $out_trade_no, 'return_url' => 'http://fgcazwd.cn/home/Index/property']];
        $data['sign'] = $this -> sign($data['data']);
        $jsonStr = json_encode($data);
        $result = json_decode($this -> curl_post($url, $jsonStr), true);
        // 拿到返回的地址后跳转到该地址即可，这里生成二维码只是为了测试
        if ($result['code'] == 100) {
            // print_r($result);die;
            header("location:" . 'http://api.k780.com:88/?app=qr.get&data=' . $result['data']['code_url']);
            die;
        } else {
            var_dump($result);
        }
    }
    // 第三方 第三次
    function apays() {
        // if(!$_SESSION['uid'] && !$_SESSION['user']) $this->redirect('Login/index');
        $total = I('post.money', 200) * 100;
        // $prdOrdNo = I('post.orderid','C'.time().$_SESSION['uid']);
        $out_trade_no = 'C' . time() . '4';
        $url = 'http://pay.1000pays.com/Gateway/api';
        // 请求地址请联系本公司技术专员获取
        // 接口参数
        $data = ['appid' => '3298877565', 'method' => 'ali_native', 'data' => ['store_id' => '', 'total' => '1', 'nonce_str' => $this -> getRandom(), 'openid' => '', 'body' => 'oxc充值', 'out_trade_no' => $out_trade_no, 'return_url' => 'http://fgcazwd.cn/home/Index/property']];
        $data['sign'] = $this -> sign($data['data']);
        $jsonStr = json_encode($data);
        $result = json_decode($this -> curl_post($url, $jsonStr), true);
        // 拿到返回的地址后跳转到该地址即可，这里生成二维码只是为了测试
        if ($result['code'] == 100) {
            // print_r($result);die;
            header("location:" . $result['data']['code_url']);
            die;
        } else {
            var_dump($result);
        }
    }
    // 新第三方 from 提交地址  第二次
    function aapays() {
        if (!$_SESSION['uid'] && !$_SESSION['user']) {
            $this -> redirect('Login/index');
        }
        $orderAmount = I('post.money', 200) * 100;
        // $prdOrdNo = I('post.orderid','C'.time().$_SESSION['uid']);
        $prdOrdNo = 'C' . time() . $_SESSION['uid'];
        $input = array('orderAmount' => $orderAmount, 'asynNotifyUrl' => 'http://fgcazwd.cn/home/Index/aanotify', 'synNotifyUrl' => 'http://fgcazwd.cn/home/index', 'merId' => '800002145', 'prdOrdNo' => $prdOrdNo, 'payMode' => '0', 'merParam' => '');
        $datas = '';
        foreach ($input as $key => $value) {
            if ($value != '') {
                $datas .= $key . '=' . $value . '&';
            }
        }
        $sign = $this -> signs($input);
        $datas = $datas . 'signData=' . $sign;
        $data = trim($datas, "&");
        $url = 'http://online.cbd889.com/pay/pay/payapply';
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        if (!empty($data)) {
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $output = curl_exec($curl);
        curl_close($curl);
        $arr = json_decode($output, true);
        if ($arr['retCode'] == '1') {
            $jumpurl = $arr['retMsg'];
            header("Location: " . $jumpurl . "");
        } else {
            echo $arr['retMsg'];
        }
    }
    // 支付异步通知 第三次
    public function anotify() {
        header("Content-type: text/html; charset=utf-8");
        $data = json_decode(file_get_contents('php://input'), true);
        $sign = $data['sign'];
        unset($data['sign']);
        $checkSign = $this -> sign($data);
        if ($sign == $checkSign && $data['status'] == 1) {
            $out_trade_no = $data['u_out_trade_no'];
            $Uid = substr($out_trade_no, 11);
            $Order = $out_trade_no;
            $time = substr($out_trade_no, 1, 10);
            // 是否已经充值过
            $where['alipay'] = $data['out_trade_no'];
            $is = M('user_recharge') -> where($where) -> count();
            // 加充值记录
            if ($is == 0) {
                $add['uid'] = $Uid;
                $add['account'] = M('users') -> where(array('uid' => $Uid)) -> getField('account');
                $add['time'] = date('Y-m-d H:i:s', $time);
                $add['money'] = $data['total_fee'] / 100;
                $add['result'] = '充值成功';
                $add['orders'] = $Order;
                $add['alipay'] = $where['alipay'];
                $add_r = M('user_recharge') -> add($add);
                if ($add_r) {
                    // 加钱
                    $inc_money = M('user_property') -> where(array('uid' => $Uid)) -> setInc('money', $add['money']);
                    if ($inc_money) {
                        // 加流水
                        $add = array();
                        $add['uid'] = $Uid;
                        $add['orders'] = $Order;
                        $add['types'] = 1;
                        $add['money'] = M('user_property') -> where(array('uid' => $Uid)) -> getField('money');
                        $add['change'] = $data['total_fee'] / 100;
                        $add['time'] = date('Y-m-d H:i:s');
                        M('user_moneylog') -> add($add);
                    }
                }
            }
            return '验签ok';
        } else {
            return '验签错误';
        }
    }
    // 新第三方 异步 通知地址  第二次
    public function aanotify() {
        header("Content-type: text/html; charset=utf-8");
        date_default_timezone_set('PRC');
        $input = file_get_contents("php://input");
        $input = urldecode($input);
        $signData = isset($_POST["signData"]) ? $_POST["signData"] : "";
        $signDatalocal = $this -> signStringnotify($input);
        if (MD5($signDatalocal) == MD5($signData)) {
            $out_trade_no = $_POST['prdOrdNo'];
            $Uid = substr($out_trade_no, 11);
            $Order = $out_trade_no;
            $time = substr($out_trade_no, 1, 10);
            // 是否已经充值过
            $where['alipay'] = $_POST['payId'];
            $is = M('user_recharge') -> where($where) -> count();
            // 加充值记录
            if ($is == 0) {
                $add['uid'] = $Uid;
                $add['account'] = M('users') -> where(array('uid' => $Uid)) -> getField('account');
                $add['time'] = date('Y-m-d H:i:s', $time);
                $add['money'] = $_POST['orderAmount'] / 100;
                $add['result'] = '充值成功';
                $add['orders'] = $Order;
                $add['alipay'] = $where['alipay'];
                $add_r = M('user_recharge') -> add($add);
                if ($add_r) {
                    // 加钱
                    $inc_money = M('user_property') -> where(array('uid' => $Uid)) -> setInc('money', $add['money']);
                    if ($inc_money) {
                        // 加流水
                        $add = array();
                        $add['uid'] = $Uid;
                        $add['orders'] = $Order;
                        $add['types'] = 1;
                        $add['money'] = M('user_property') -> where(array('uid' => $Uid)) -> getField('money');
                        $add['change'] = $add['money'];
                        $add['time'] = date('Y-m-d H:i:s');
                        M('user_moneylog') -> add($add);
                    }
                }
            }
            echo 'SUCCESS';
        } else {
            echo 'FAIL';
        }
    }
    function payapi() {
    }
    function aliback() {
    }
    function alinotify() {
        date_default_timezone_set('Asia/Shanghai');
        $out_trade_no = $_POST['out_trade_no'];
        $key = $_POST['key'];
        $trade = $_POST['trade'];
        $sign = substr($key, 0, 6);
        $sign = md5($sign);
        if ($sign != $key) {
            $Uid = substr($out_trade_no, 11);
            $Order = $out_trade_no;
            $time = substr($out_trade_no, 1, 10);
            // 是否已经充值过
            $where['alipay'] = $trade;
            $is = M('user_recharge') -> where($where) -> count();
            // 加充值记录
            if ($is == 0) {
                $add['uid'] = $Uid;
                $add['account'] = M('users') -> where(array('uid' => $Uid)) -> getField('account');
                $add['time'] = date('Y-m-d H:i:s', $time);
                $add['money'] = $_POST['amount'];
                $add['result'] = '充值成功';
                $add['orders'] = $Order;
                $add['alipay'] = $_POST['trade'];
                $add_r = M('user_recharge') -> add($add);
                if ($add_r) {
                    // 加钱
                    $inc_money = M('user_property') -> where(array('uid' => $Uid)) -> setInc('money', $_POST['amount']);
                    if ($inc_money) {
                        // 加流水
                        $add = array();
                        $add['uid'] = $Uid;
                        $add['orders'] = $Order;
                        $add['types'] = 1;
                        $add['money'] = M('user_property') -> where(array('uid' => $Uid)) -> getField('money');
                        $add['change'] = $_POST['amount'];
                        $add['time'] = date('Y-m-d H:i:s');
                        M('user_moneylog') -> add($add);
                        return 1;
                    }
                }
            }
        }
    }
    // 随机字符串 支付第三次
    public function getRandom() {
        $str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $key = "";
        for ($i = 0; $i < 16; $i++) {
            $key .= $str[mt_rand(0, 32)];
            // 生成随机数
        }
        return $key;
    }
    // 支付  第三次
    public function sign($value) {
        $key = 'RR3AMP3WDCEHV68SBK06RM';
        $value = array_filter($value);
        ksort($value);
        $str = '';
        foreach ($value as $k => $v) {
            if ($k == 'sign' || $v == null || $v == '') {
                continue;
            }
            $str .= $k . '=' . $v . '&';
        }
        $str = $str . 'key=' . $key;
        // 此处填写appKey
        $str = strtoupper(md5($str));
        return $str;
    }
    // 支付 第三次
    public function curl_post($url, $data = array(), $https = true) {
        $curl = curl_init();
        // 创建一个新CURL资源 返回一个CURL句柄，出错返回 FALSE。
        curl_setopt($curl, CURLOPT_REFERER, $_SERVER['HTTP_HOST']);
        // 构造来源
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
        // 模拟用户使用的浏览器
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 300);
        // 在发起连接前等待的时间，如果设置为0，则无限等待。
        curl_setopt($curl, CURLOPT_TIMEOUT, 300);
        // 设置CURL允许执行的最长秒数
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        // 获取的信息以文件流的形式返回，而不是直接输出。
        if ($https) {
            // 设置为https请求，不验证证书和hosts
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        }
        $header[] = 'ContentType:application/json;charset=UTF-8';
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        // 用来设置HTTP头字段的数组
        curl_setopt($curl, CURLOPT_URL, $url);
        // 设置请求地址
        curl_setopt($curl, CURLOPT_POST, true);
        // 发送POST请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        // 发送的POST数据
        curl_setopt($curl, CURLINFO_HEADER_OUT, true);
        // 启用时追踪句柄的请求字符串
        $result = curl_exec($curl);
        // 执行CURL
        if (curl_errno($curl)) {
            // 检查是否有错误发生
            echo 'Curl error: ' . curl_error($curl);
            // 返回最后一次的错误号
        }
        curl_close($curl);
        // print_r($result);die;                                        //关闭CURL 并且释放系统资源
        return $result;
    }
    // 支付 第二次
    public function signs($input) {
        $KEY = "9EC74A11C7C25E8B352610EC71673788";
        ksort($input);
        $string = '';
        foreach ($input as $key => $value) {
            if ($value != '') {
                $string .= $key . '=' . $value . '&';
            }
        }
        $string = $string . 'key=' . $KEY;
        $sign = strtoupper(md5($string));
        return $sign;
    }
    // 上游通知组合签名用于验签  第二次
    function signStringnotify($input) {
        $KEY = "9EC74A11C7C25E8B352610EC71673788";
        $pieces = explode("&", $input);
        sort($pieces);
        $string = '';
        foreach ($pieces as $value) {
            if ($value != '') {
                $vlaue1 = explode("=", $value);
                if ($vlaue1[1] != '' && $value[1] != null && $vlaue1[0] != 'signData') {
                    $string = $string . $value . '&';
                }
            }
        }
        $stringmd5 = $string . 'key=' . $KEY . '';
        $sign = strtoupper(md5($stringmd5));
        // $string=$string.'&signData='.$sign;
        return $sign;
    }
}
?>