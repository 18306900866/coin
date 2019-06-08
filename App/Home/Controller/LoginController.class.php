<?php

namespace Home\Controller;

use Think\Controller;
use Home\Model;

header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , GET');

class LoginController extends Controller
{
    // 登入
    public function index()
    {
        $this->display();
    }

    // 注册
    public function register()
    {
        $this->display();
    }

    // 找回密码
    public function forget()
    {
        $this->display();
    }

    // 登入
    public function login()
    {
        $y = $this->userinf();
        if ($y != 'Y') {
            die;
        }
        $pwdata = I('post.');
        $where['account'] = $pwdata['name'];
        $ze = ze($pwdata['name']);
        if (!$ze) {
            $data = array('code' => 400, 'msg' => '手机号不正确！');
            echo json_encode($data);
            die;
        }
        $where['password'] = md5($pwdata['pass'] . 'password');
        $result = M('users')->where($where)->find();
        $data = array('code' => 200, 'msg' => '/home/Index/index');
        if (!$result) {
            $data = array('code' => 400, 'msg' => '账号或密码错误');
            echo json_encode($data);
            die;
        } else {
            if (!$result['states']) {
                $data = array('code' => 400, 'msg' => '账号或密码错误!');
                echo json_encode($data);
                die;
            }
            $map = array('id' => $result['id'], 'login_time' => date('Y-m-d H:i:s', time()), 'login_ip' => $_SERVER['REMOTE_ADDR']);
            M('users')->save($map);
        }
        $_SESSION['uid'] = $result['uid'];
        $_SESSION['user'] = $result['account'];
        echo json_encode($data);
        die;
        // $this->redirect('Index/index');
    }

    // 注册
    public function registerin()
    {
        $y = $this->userinf();
        if ($y != 'Y') {
            die;
        }
        $pwdata = I('post.');
        $where['phone'] = $pwdata['name'];
        $code = M('code')->where($where)->find();
        if ($code['time'] + 240 < time()) {
            $data = array('code' => 400, 'msg' => '验证码已过期，请重新获取！');
            echo json_encode($data);
            die;
        }
        $wheres['account'] = $pwdata['name'];
        $users = M('users')->where($wheres)->find();
        if ($users['account']) {
            $data = array('code' => 400, 'msg' => '用户已存在！');
            echo json_encode($data);
            die;
        }
        $ze = ze($pwdata['name']);
        if (!$ze) {
            $data = array('code' => 400, 'msg' => '手机号不正确！');
            echo json_encode($data);
            die;
        }
        $mi = mi($pwdata['pass']);
        if (!$mi) {
            $data = array('code' => 400, 'msg' => '密码为6-16位！');
            echo json_encode($data);
            die;
        }
        if ($pwdata['pass'] != $pwdata['pass_com']) {
            $data = array('code' => 400, 'msg' => '重复密码不一致！');
            echo json_encode($data);
            die;
        }
        if ($code['code'] != $pwdata['code']) {
            $data = array('code' => 400, 'msg' => '验证码错误！');
            echo json_encode($data);
            die;
        }
        $umap = array('account' => $pwdata['name'], 'password' => md5($pwdata['pass'] . 'password'), 'register_time' => date('Y-m-d H:i:s', time()), 'register_ip' => $_SERVER['REMOTE_ADDR']);
        $uid = M('users')->add($umap);
        $ummap = array('uid' => $uid);
        $money = M('user_property')->add($ummap);
        if ($uid && $money) {
            M('code')->where(array('phone' => $_SESSION['user']))->setField('time', 0);
            $data = array('code' => 200, 'msg' => '/home/Index/index');
            $_SESSION['uid'] = $result['uid'];
            $_SESSION['user'] = $result['account'];
            echo json_encode($data);
            die;
        }
        $data = array('code' => 400, 'msg' => '参数错误');
        echo json_encode($data);
        die;
    }

    // 找回密码
    public function forgetin()
    {
        $y = $this->userinf();
        if ($y != 'Y') {
            die;
        }
        $pwdata = I('post.');
        $where['phone'] = $pwdata['name'];
        $code = M('code')->where($where)->find();
        if ($code['time'] + 240 < time()) {
            $data = array('code' => 400, 'msg' => '验证码已过期，请重新获取！');
            echo json_encode($data);
            die;
        }
        $wheres['account'] = $pwdata['name'];
        $users = M('users')->where($wheres)->find();
        if (!$users['account']) {
            $data = array('code' => 400, 'msg' => '用户不存在！');
            echo json_encode($data);
            die;
        }
        $ze = ze($pwdata['name']);
        if (!$ze) {
            $data = array('code' => 400, 'msg' => '手机号不正确！');
            echo json_encode($data);
            die;
        }
        $mi = mi($pwdata['pass']);
        if (!$mi) {
            $data = array('code' => 400, 'msg' => '密码为6-16位！');
            echo json_encode($data);
            die;
        }
        if ($pwdata['pass'] != $pwdata['pass_com']) {
            $data = array('code' => 400, 'msg' => '重复密码不一致！');
            echo json_encode($data);
            die;
        }
        if ($code['code'] != $pwdata['code']) {
            $data = array('code' => 400, 'msg' => '验证码错误！');
            echo json_encode($data);
            die;
        }
        $umap = array('uid' => $users['uid'], 'password' => md5($pwdata['pass'] . 'password'), 'login_time' => date('Y-m-d H:i:s', time()), 'login_ip' => $_SERVER['REMOTE_ADDR']);
        $uid = M('users')->save($umap);
        if ($uid !== 'null') {
            M('code')->where(array('phone' => $_SESSION['user']))->setField('time', 0);
            $data = array('code' => 200, 'msg' => '/home/Index/index');
            $_SESSION['uid'] = $result['uid'];
            $_SESSION['user'] = $result['account'];
            echo json_encode($data);
            die;
        }
        $data = array('code' => 400, 'msg' => '参数错误');
        echo json_encode($data);
        die;
    }

    // 获取验证码
    public function code()
    {
        $y = $this->userinf();
        if ($y != 'Y') {
            die;
        }
        $pwdata = I('post.');
        $where['phone'] = $pwdata['name'];
        $phone = $pwdata['name'];
        $ze = ze($pwdata['name']);
        if (!$ze) {
            $data = array('code' => 400, 'msg' => '手机号不正确！');
            echo json_encode($data);
            die;
        }
        $chushi = M('code')->where($where)->find();
        $code = randomKeys(4);
        $data = array('code' => 400, 'msg' => '已发送！');
        if ($chushi) {
            if (time() < $chushi['time']) {
                $times = $chushi['time'] - time();
                $data = array('code' => 400, 'msg' => '获取速度过快,请' . $times . '后再试！');
                echo json_encode($data);
                die;
            }
            // $code = $chushi['code'];
            $map = array('id' => $chushi['id'], 'code' => $code, 'time' => time() + 60, 'nub' => $chushi['nub'] + 1);
            M('code')->save($map);
        } else {
            $map = array('phone' => $pwdata['name'], 'code' => $code, 'time' => time(), 'nub' => 1);
            M('code')->add($map);
        }
        duanxi($phone, $code, $msg = null);
        echo json_encode($data);
        die;
    }

    public function ssd()
    {
        $pass = I('get.');
        $mi = mi($pass['pass']);
        var_dump($mi);
        echo $mi;
    }

    public function duanxi()
    {
        $code = '1233';
        $post_data['userid'] = 7153;
        $post_data['account'] = 'hl147852';
        $post_data['password'] = '004112012';
        $post_data['content'] = '【金币通】您的验证码是感谢您的试用！';
        // 多个手机号码用英文半角豆号‘,’分隔
        $post_data['mobile'] = '11111111111';
        $url = 'http://sms.kingtto.com:9999/sms.aspx?action=send';
        $o = '';
        foreach ($post_data as $k => $v) {
            // 短信内容需要用urlencode编码，否则可能收到乱码
            $o .= "{$k}=" . urlencode($v) . '&';
        }
        $post_data = substr($o, 0, -1);
        // echo $o;die;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //如果需要将结果直接返回到变量里，那加上这句。
        $result = curl_exec($ch);
        // var_dump($result);
    }

    /*function userinf() {
        $new = 'www.bh553.com/home/Proxy/auth?name=' . $_SERVER['SERVER_NAME'];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $new);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }*/


    public function auto()
    {
        $this->display();
    }


    public function autoCoin()
    {
        //获取所有的已开放的币
        $coinList = M('currency')->where(["states" => 1])->select();
        $str = "";
        //今日0点的时间戳
        $todayTimestrap = strtotime(date('Y-m-d', time()));
        //中午12点的时间戳
        $noonTimestrap = $todayTimestrap + 12 * 60 * 60;
        for ($i = 0; $i < count($coinList); $i++) {
            //是否更新
            $is_update = lcg_value();//范围为 (0, 1) 的伪随机数。

            //进入更新概率区间
            if ($is_update < $coinList[$i]['update_probability'] / 100) {
                //是否上涨
                $is_up = lcg_value();//范围为 (0, 1) 的伪随机数。
                $is_up = round($is_up, 3); //10.46
                if ($is_up > $coinList[$i]['up_probability'] / 100) {
                    $is_up = -$is_up;
                }

                $data = [];
                $data['before_money'] = $coinList[$i]['money'];
                $data['money_value'] = $is_up;
                $data['after_money'] = $coinList[$i]['money'] + $is_up;
                $data['money_value'] = $is_up;
                $data['create_time'] = time();

                $insertId = M('coin_change_log')->add($data);


                if (time() > $noonTimestrap - 30 && time() < $noonTimestrap - 30) {
                    M('currency')->where(["id" => $coinList[$i]['id']])->save(['money' => $data['after_money'], 'defloat' => $is_up, 'money_start' => $data['after_money'],]);
                } else {
                    M('currency')->where(["id" => $coinList[$i]['id']])->save(['money' => $data['after_money'], 'defloat' => $is_up]);

                }

               // $str += "No-|{$insertId}| data has been update!";


            } else {
                continue;
            }

        }

        echo $str;

    }
}

?>