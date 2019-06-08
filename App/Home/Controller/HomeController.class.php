<?php
namespace Home\Controller;
use Think\Controller;
class HomeController extends Controller {

    public function index(){


        $this->display();
    }

    public function duanxi(){
        $code = '1233';
        $post_data['userid'] = 7282;
        $post_data['account'] = 'lcs123';
        $post_data['password'] = 'qazwsx123';
        $post_data['content'] = '【BBD】您的验证码是感谢您的试用！';
        //多个手机号码用英文半角豆号‘,’分隔
        $post_data['mobile'] = '13178255111';
        $url='http://sms.kingtto.com:9999/sms.aspx?action=send';
        $o='';
        foreach ($post_data as $k=>$v)
        {
            //短信内容需要用urlencode编码，否则可能收到乱码
            $o.="$k=".urlencode($v).'&';
        }
        $post_data=substr($o,0,-1);
        // echo $o;die;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //如果需要将结果直接返回到变量里，那加上这句。
        $result = curl_exec($ch);
        // var_dump($result);
    }

    public function test(){
        $this->duanxi();
    }

}