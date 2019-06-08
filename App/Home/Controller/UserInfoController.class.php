<?php
namespace Home\Controller;
use Think\Controller;
use Home\Model;
header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , GET');

class UserInfoController extends Controller {
    public function _initialize(){
        if(!$_SESSION['uid'] && !$_SESSION['user']){
            $this->redirect('Login/index');
        }
    }
    // 我的
    public function index(){
        $user = $_SESSION['user'];
        $this->assign('user',$user);
        $this->display('wode');
    }

    public function wode(){
        $user = $_SESSION['user'];
        $this->assign('user',$user);
        $this->display();
    }

    // 设置列表
    public function shezhi(){
        $this->display();
    }

    // 修改密码
    public function editps(){
        $this->display();
    }

    // 关于我们
    public function guanyu(){
        $this->display();
    }

    // 资金设置
    public function moneypasz(){
        $this->assign('user',$_SESSION['user']);
        $msg = M('users')->where(array('uid'=>$_SESSION['uid']))->find();
        $msgdata = '';
        if($msg['password_zj']){
            $msgdata = '密码已设置';
        }
        $this->assign('msg',$msgdata);
        $this->display();
    }

    // 身份认证
    public function renzheng(){
        $bank = M('user_authentication')->where(array('uid' => $_SESSION['uid']))->find();
        if($bank){
            $this->redirect('UserInfo/showrz');
        }
        $this->display();
    }

    // 身份认证过显示
    public function showrz(){
        $bank = M('user_authentication')->where(array('uid' => $_SESSION['uid']))->find();
        if($bank['result']){
            $bank['result'] = '审核通过';
        }else{
            $bank['result'] = '审核中';
        }
        $this->assign('bank',$bank);
        $this->display();
    }

    // 提交身份认证
    public function tjrz(){
        $pwdata = I('post.');
        if(mb_strlen($pwdata['name'])<2){
            $data = array(
                'code'=> 400,
                'msg'=>'姓名不正确！'
            );
            echo json_encode($data);die;
        }
        if(mb_strlen($pwdata['name'])>10){
            $data = array(
                'code'=> 400,
                'msg'=>'姓名不正确！'
            );
            echo json_encode($data);die;
        }
        if(mb_strlen($pwdata['card_code'])<17){
            $data = array(
                'code'=> 400,
                'msg'=>'身份证不正确！'
            );
            echo json_encode($data);die;
        }
        if(mb_strlen($pwdata['card_code'])>18){
            $data = array(
                'code'=> 400,
                'msg'=>'身份证不正确！'
            );
            echo json_encode($data);die;
        }
        if( mb_strlen($pwdata['city'])<5){
            $data = array(
                'code'=> 400,
                'msg'=>'城市或开户行不正确！'
            );
            echo json_encode($data);die;
        }
        if( mb_strlen($pwdata['city'])>30){
            $data = array(
                'code'=> 400,
                'msg'=>'城市或开户行不正确！'
            );
            echo json_encode($data);die;
        }
        if( mb_strlen($pwdata['bank_code'])<12){
            $data = array(
                'code'=> 400,
                'msg'=>'银行卡不正确！'
            );
            echo json_encode($data);die;
        }
        if( mb_strlen($pwdata['bank_code'])>30){
            $data = array(
                'code'=> 400,
                'msg'=>'银行卡不正确！'
            );
            echo json_encode($data);die;
        }

        $bank = array(
            'uid' => $_SESSION['uid'],
            'name' => $pwdata['name'],
            'card_code' => $pwdata['card_code'],
            'bank_code' => $pwdata['bank_code'],
            'city' => $pwdata['city'],
            'nubers' =>1,
            'time' =>date('Y-m-d H:i:s',time())
        );
        $isbank = M('user_authentication')->add($bank);
        if($isbank){
            $data = array(
                'code'=> 200,
            'msg'=>'/home/UserInfo/wode'
            );
            echo json_encode($data);die;
        }
        $data = array(
            'code'=> 400,
            'msg'=>'参数错误'
        );
        echo json_encode($data);die;
    }

    // 密码修改
    public function passedit(){
        $pwdata = I('post.');
        $mi = mi($pwdata['pass_new']);
        if(!$mi){
            $data = array(
                'code'=> 400,
                'msg'=>'密码为6-16位！'
            );
            echo json_encode($data);die;
        }
        if($pwdata['pass_new'] != $pwdata['pass_new_con']){
            $data = array(
                'code'=> 400,
                'msg'=>'重复密码不一致！'
            );
            echo json_encode($data);die;
        }
        $where['uid'] = $_SESSION['uid'];
        $result = M('users')->where($where)->find();
        if($result['password'] != md5($pwdata['pass'].'password')){
            $data = array(
                'code'=> 400,
                'msg'=>'密码错误!'
            );
            echo json_encode($data);die;
        }else{
            $map = array(
                'uid' => $result['uid'],
                'password' => md5($pwdata['pass_new'].'password')
            );
            M('users')->save($map);
            $data = array(
                'code'=> 200,
            'msg'=>'/home/UserInfo/shezhi'
            );
            echo json_encode($data);die;
        }
        $data = array(
            'code'=> 400,
            'msg'=>'参数错误'
        );
        echo json_encode($data);die;
    }

    // 资金密码修改
    public function passzj(){
        $pwdata = I('post.');
        $where['phone'] = $_SESSION['user'];
        $code = M('code')->where($where)->find();
        if($code['time']+240 < time()){
            $data = array(
                'code'=> 400,
                'msg'=>'验证码已过期，请重新获取！'
            );
            echo json_encode($data);die;
        }
        $mi = mi($pwdata['pass_zj']);
        if(!$mi){
            $data = array(
                'code'=> 400,
                'msg'=>'密码为6-16位！'
            );
            echo json_encode($data);die;
        }
        if($pwdata['pass_zj'] != $pwdata['pass_zj_con']){
            $data = array(
                'code'=> 400,
                'msg'=>'重复密码不一致！'
            );
            echo json_encode($data);die;
        }
        if($code['code'] != $pwdata['code']){
            $data = array(
                'code'=> 400,
                'msg'=>'验证码错误！'
            );
            echo json_encode($data);die;
        }

        $umap = array(
            'uid' => $_SESSION['uid'],
            'password_zj' => md5($pwdata['pass_zj'].'password')
        );
        $uid = M('users')->save($umap);
        if($uid !== 'null'){
            M('code')->where(array('phone'=>$_SESSION['user']))->setField('time',  0);
            $data = array(
                'code'=> 200,
                'msg'=>'/home/UserInfo/shezhi'
            );
            echo json_encode($data);die;
        }
        $data = array(
            'code'=> 400,
            'msg'=>'参数错误'
        );
        echo json_encode($data);die;

    }

    // 提款显示
    public function tixian(){
        $uid = $_SESSION['uid'];
        $bank = M('user_authentication')->where(array('uid'=>$uid, 'result'=>1))->find();
        if(!$bank){
            $this->redirect('UserInfo/renzheng');
        }
        $this->display();
    }

    // 提款提交处理
    public function tikuan(){
        $pwdata = I('post.');
        $uid = $_SESSION['uid'];

        $pwdata['money'] = intval($pwdata['money']);
        $money_reg = '/^\d+(\.\d+)?$/';
        if(!preg_match($money_reg, $pwdata['money'])){
            $data = array(
                'code'=> 400,
                'msg'=>'金额错误！'
            );
            echo json_encode($data);die;
        }

        if($pwdata['money']<100){
            $data = array(
                'code'=> 400,
                'msg'=>'最低一百提现!'
            );
            echo json_encode($data);die;
        }

        $user = M('user_property')->where(array('uid'=>$uid))->find();

        if($pwdata['money'] > $user['money']){
            $data = array(
                'code'=> 400,
                'msg'=>'余额不足!'
            );
            echo json_encode($data);die;
        }

        $bank = M('user_authentication')->where(array('uid'=>$uid, 'result'=>1))->find();
        $bankmap = array(
            'uid' => $uid,
            'account' => $_SESSION['user'],
            'money' => $pwdata['money'],
            'time' => date('Y-m-d H:i:s'),
            'bankcrad' => $bank['bank_code'],
            'result' => '申请中',
            'orders' => 'T'.time().$_SESSION['uid'],
        );

        $model1 = M('user_drawings');
        $model2 = M('user_property');
        $model3 = M('user_moneylog');
        $model1->startTrans();
        $model2->startTrans();
        $model3->startTrans();

        $bankres = $model1->add($bankmap);
        $moneyres = $model2->where(array('uid'=>$uid))->setDec('money',$pwdata['money']);
        $nowmoney = M('user_property')->where(array('uid'=>$uid))->find();

        $logmap = array(
            'uid' => $uid,
            'orders' => 'T'.time().$_SESSION['uid'],
            'types' => 0,
            'money' => $nowmoney['money'],
            'change' => $pwdata['money'] * (-1),
            'time' => date('Y-m-d H:i:s', time())
        );
        $log = $model3->add($logmap);

        if($bankres && $moneyres && $log){
            $model1->commit();
            $model2->commit();
            $model3->commit();
            $data = array(
                'code'=> 400,
                'msg'=>'已提交申请！'
            );
            echo json_encode($data);die;
        }else{
            $model1->rollback();
            $model2->rollback();
            $model3->rollback();
        }

        $data = array(
            'code'=> 400,
            'msg'=>'参数错误'
        );
        echo json_encode($data);die;
    }

    // 消费记录
    function xiaofei(){
        $res = M('user_moneylog')->where(array('uid'=>$_SESSION['uid']))->order('id desc')->limit(50)->select();
        // echo '<pre>';
        foreach ($res as $key => $value) {
            if(strstr($value['orders'],'C')){
                $res[$key]['type'] = '充值';
            }elseif(strstr($value['orders'],'T')){
                $res[$key]['type'] = '提现';
            }else{
                $res[$key]['type'] = '买卖货币';
            }

            if($value['types']){
                $res[$key]['typess'] = '收入';
            }else{
                $res[$key]['typess'] = '支付';
            }
            $res[$key]['type'] = $res[$key]['type'].'-'.$res[$key]['typess'];
        }

        $this->assign('list',$res);
        $this->display();
    }

    public function logout(){
        session_unset();//free all session variable
        session_destroy();//销毁一个会话中的全部数据
        $data = array(
            'code'=> 200,
            'msg'=>'/home/Index/index'
        );
        echo json_encode($data);die;
    }

}