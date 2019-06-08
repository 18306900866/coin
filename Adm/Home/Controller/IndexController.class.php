<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function _initialize(){
        // if ($_SERVER['DOCUMENT_URI']=='/index.php') redirect('/Home',0.1, ' ');
        // // 统一配置信息
        // $_GET['m'] = 'Home';
        // date_default_timezone_set('PRC');

        // // 验证登陆状态
        // if($_SESSION['username']=='') redirect('home/Login',1, '未登录!  登录页面跳转中...');

        // //最后登陆IP
        // $where['adminid']=I('session.adminid');
        // $arr=M('adminuser')->where($where)->find();

        // $last_ip=$arr['last_ip'];
        // $this_ip=$_SESSION['ip'];

        // if($last_ip!=$this_ip){
        //     redirect('/Login',1, '异地登陆该账号!  登录页面跳转中...');
        // }

        // // 用户权限
        // $power=M("admin_power")->where($where)->find();
        // $_SESSION['power']=$power;
//        $_SESSION['type']='超级管理员';
        //session(null);

        if (!isset($_SESSION['adminid'])){
            redirect('./Login');
        }
    }
}