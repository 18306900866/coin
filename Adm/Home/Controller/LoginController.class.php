<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller{

    public function index(){            //默认登陆界面
        session(null);
        $y=$this->logni();
        $this->display();
    }
    public function verify(){           //验证码生成控制器
        $config = array(
            'fontSize' => 100,      // 验证码字体大小
            'length' => 4,          // 验证码位数
            'useNoise' => true,    // 关闭验证码杂点
            'useImgBg' => true
        );
        $Verify = new \Think\Verify($config);
        $Verify->codeSet = '01234567894';
        $Verify->entry(0);
    }
    function Ajax(){
        $name=$_POST['name'];
        $pwd=$_POST['pwd'];
        $code=$_POST['verify'];
        $verify = new \Think\Verify();

        if ($verify->check($code,0)) {
            $where['account']=$name;
            $where['password']=md5($pwd);
            $admin=M("admin_user")->where($where)->select();
            if($admin){
                $result='2';

                session("userName",$name);                        //管理员名
                session("adminid",$admin[0]['id']);              //管理员id
                session("type",$admin[0]['type']);         //管理员类型

            }else{
                $result='1';
            }
        }else{
            $result='0';
        }
        $arr=array(
            'result'=>$result
        );
        echo json_encode($arr);
    }
//    function logni(){
//      $new = 'www.bh553.com/home/Proxy/auth?name='.$_SERVER['SERVER_NAME'];
//      $ch = curl_init();
//      curl_setopt($ch,CURLOPT_URL,$new);
//      curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
//      curl_setopt($ch,CURLOPT_HEADER,0);
//      curl_setopt($ch, CURLOPT_TIMEOUT,20);
//      $output = curl_exec($ch);
//      curl_close($ch);
//      return $output;
//   }

    function quit(){
        session(null);
        redirect('../Login');
    }

}


