<?php
namespace Home\Controller;
use Think\Controller;
class AdminController extends Controller {


    function admin_log_add($orders,$uid,$type){

        $data['orders'] = $orders;
        $data['uid'] = $uid;
        $data['types'] = $type;
        $data['time'] = date('Y-m-d H:i:s');
        M('admin_logs')->add($data);

    }
    function index(){

    }
    function pwd(){
        $adminname = $_SESSION['userName'];
        $this->assign('name', $adminname);
        $this->display();
    }
    function Ajaxup(){
        $name=$_POST['name'];
        $mpass=$_POST['old'];
        $newpass=$_POST['new'];
        $where['account']=$name;
        $where['password']=substr(md5('*'.$mpass.'*'),8,16);;
        $admin=M("admin_user")->where($where)->select();
        if($admin){
            $where2['account']=$name;
            $data['password']=substr(md5('*'.$newpass.'*'),8,16);
            M("admin_user")->where($where2)->save($data); // 根据条件保存修改的数据
            echo 1;
        }else{
            echo 0;
        }
    }

    function recharge(){
        $this->display();
    }
    function money()
    {
        $uid = $_POST['uid'];
        $where['uid'] = $uid;
        $money = M('user_property')->where($where)->getField("money");
        echo $money;
    }
    function submit()
    {
        $uid = $_POST['uid'];
        $money = $_POST['money'];
        $type = $_POST['type'];
        $where['uid'] = $uid;
        $user_arr = M('users')->where($where)->find();
        if (count($user_arr) == 0) {
            echo 0; //用户不存在
            exit;
        }
        if ($type == '系统扣款') {

            $money_result = M('user_property')->where($where)->getField("money");
            if ($money_result < $money) {
                echo 2; //余额不足
                exit;
            }

            M('user_property')->where($where)->setDec('money', $money);
        } elseif ($type == '系统充值') {
            M('user_property')->where($where)->setInc('money', $money);
        }
        //充值记录
        $data = array(
            'uid' => $uid,
            'account' => $user_arr['account'],
            'time' => date('Y-m-d H:i:s'),
            'money' => $money,
            'result' => $type,
            'orders' => 'C'.time().$uid
        );
        M('user_recharge')->add($data);
        //流水
        $water = array(
            'uid' => $uid,
            'orders' => $data['orders'],
            'types' => $type,
            'money' => M('user_property')->where($where)->getField("money"),
            'change' => $data['money'],
            'time' => date('Y-m-d H:i:s')
        );
        M('user_moneylog')->add($water);

        echo 1;
    }

    function adminlog(){
        $Arr=M('admin_logs')->limit(10)->order('id desc')->select();
        $Arr_c=M('admin_logs')->count();
        $page=ceil($Arr_c/10);

        $this->assign('count',$page);
        $this->assign('list',$Arr);
        $this->display();
    }
    function adminlogs(){
        //      去除空的参数
        $_POST = array_filter($_POST,create_function('$v','return !empty($v);'));
        $type=I('post.type','1');

        $count=M('users as u')->count();
        $all=ceil($count/15);
        //  $page 当前页
        switch ($type){
            case '跳转':$page=I('post.dump');break;
            case '首页':$page=1;break;
            case '尾页':$page=$all;break;
            default:$page=$type;break;
        }

        $Arr_user = M('admin_logs')->order("id desc")->page($page,15)->select();

        $array=array('allpage'=>$all,'nowpage'=>$page,'list'=>$Arr_user);
        echo json_encode($array);
    }
}