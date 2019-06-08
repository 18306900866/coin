<?php
namespace Home\Controller;
use Think\Controller;
use Home\Model;
header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , GET');
class BuysController extends Controller {
    public function pay(){
        $money = 1;
        $money = 2 * 10000;

        $input = array(
	    'orderAmount' => '20000',
	    'asynNotifyUrl' => 'http://fgcazwd.cn/home/buys/notify',
	    'synNotifyUrl' => 'http://fgcazwd.cn/home/index',
	    'merId' => '800002072',
	    'prdOrdNo' => 'TESTP'.time(),
	    'payMode' => '0'
	    );


		$datas = '';
		foreach ($input as $key => $value) {
		    if($value!=''){
		        $datas .= $key .'='.$value.'&';
		    }
		}

		$sign = $this->sign($input);

		$datas = $datas.'signData='.$sign;
		$data = trim($datas, "&");

		$url='http://online.cbd889.com/pay/pay/payapply';
	    $curl = curl_init();
	    curl_setopt($curl, CURLOPT_URL, $url);
	    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
	    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
	    if (!empty($data)){
	        curl_setopt($curl, CURLOPT_POST, 1);
	        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	    }
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
	    $output = curl_exec($curl);
	    curl_close($curl);
	    $arr=json_decode($output,true);
	    if($arr['retCode']=='1'){
	        $jumpurl=$arr['retMsg'];
	        header("Location: ".$jumpurl."");
	    }else{
	        echo $arr['retMsg'];
	    }


    }

    public function notify(){
    	header("Content-type: text/html; charset=utf-8");
		date_default_timezone_set('PRC'); // 中国时区

	    $input = file_get_contents("php://input");
	    $input=urldecode($input);
		$signData=isset($_POST["signData"])?$_POST["signData"]:"";
		$signDatalocal=$this->signStringnotify($input);
		if (MD5($signDatalocal)==MD5($signData)){
			$add['uid'] = 4;
			$add['account'] = 1;
			$add['time'] = date('Y-m-d H:i:s',$time);
			$add['money'] = 1;
			$add['result'] = 'test';
			$add['orders'] = 1;
			$add['alipay'] = 1;

			$add_r = M('user_recharge')->add($add);

			echo 'SUCCESS';
		}else{
			echo 'FAIL';
		}
    }


    public function sign($input){
	    $KEY="2DC79FC810AF236A340AF46F2DC034CF";
	    ksort($input);
	    $string='';
	    foreach ($input as $key => $value) {
	        if($value!=''){
	            $string .= $key .'='.$value.'&';
	        }
	    }
	    $string=$string.'key='. $KEY;
	    $sign=strtoupper(md5($string));
	    return $sign;
	}

	//上游通知组合签名用于验签
	function signStringnotify($input){
		$KEY="2DC79FC810AF236A340AF46F2DC034CF";
	    $pieces = explode("&", $input);
	    sort($pieces);
	    $string='';
	    foreach ($pieces as $value){
	        if($value!=''){
	            $vlaue1= explode("=", $value);
	            if($vlaue1[1]!='' && $value[1]!=null && $vlaue1[0]!='signData'){
	                $string=$string.$value.'&';
	            }
	        }
	    }
	    $stringmd5=$string.'key='.$KEY.'';
	    $sign=strtoupper(md5($stringmd5));
	    //$string=$string.'&signData='.$sign;
	    return $sign;
	}
}