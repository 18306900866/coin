<?php

function duanxi($phone,$code,$msg=null)
{
	$post_data['userid'] = 7405;
	$post_data['account'] = 'slh123';
	$post_data['password'] = 'aa112233';
	$post_data['content'] = '【JPM】您的验证码是:'.$code.'，感谢您的试用！';
	//多个手机号码用英文半角豆号‘,’分隔
	$post_data['mobile'] = $phone;
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
	// return $result;
}


// 随机验证码
function randomKeys($length)
 {
    $key='';
    $pattern='1234567890';
    for($i=0;$i<$length;++$i) {
        $key .= $pattern{mt_rand(0,9)};    // 生成php随机数
    }
    return $key;

}

//手机正则
function ze($mobiles){
	// preg_match_all("/^1[34578]\d{9}$/", $mobiles, $phone);
	// return $phone;
	if(preg_match("/^1[34578]\d{9}$/",$mobiles)){ 
		return true; 
	}else{ 
		return false; 
	}
}

//密码正则
function mi($password){
	if(preg_match("/^[\x{4e00}-\x{9fa5}A-Za-z0-9_]{2,10}$/u",$password)){ 
		return true; 
	}else{ 
		return false; 
	}
}