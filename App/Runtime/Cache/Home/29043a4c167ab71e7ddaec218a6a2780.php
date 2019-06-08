<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="format-detection" content="telephone=no" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=no" />
		<title>BBD</title>
		<meta name="description" content="">
		<meta name="keywords" content="">
		<link rel=”icon” href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" type="text/css" href="/Public/oxc/css/media.css?v=1234"/>
		<link rel="stylesheet" type="text/css" href="/Public/oxc/css/main.css?v=1234" />
		<link rel="stylesheet" type="text/css" href="/Public/oxc/swiper/4.1/swiper.min.css" />
		<script src="/Public/oxc/js/resize.js" type="text/javascript" charset="utf-8"></script>
		<script src="/Public/oxc/js/function.js" type="text/javascript" charset="utf-8"></script>
	</head>
<style type="text/css">
	.form_input .inputbox input {
	    width: 100%;
	    height: .7rem;
	    padding: 0 .15rem;
	    background: #fff; 
	    font-size: .23rem;
	}
</style>
	<body class="has_menu has_header">
		
		<div class="top_header">
			<a class="back"><img src="/Public/oxc/img/back_icon.jpg"/></a>
			<h3>登陆</h3>
			<a href="/home/Login/register" class="right_icon zc">注册</a>
		</div>
		
		<div class="form_input " style="margin-top: .2rem;">
			<ul>
				<li>
					<p class="tl1">手机号码</p>
					<div class="inputbox">
						<input type="text" name="" id="" class="name" value="" placeholder="手机号码"/>
					</div>
				</li>
				<li>
					<p class="tl1">密码</p>
					<div class="inputbox">
						<input type="password" name="" id="" class="pass" value="" placeholder="请输入新密码"/>
					</div>
				</li>
				<li class="sp">
					<!-- <p class="tl1">短信验证码</p>
					<div class="inputbox">
						<input type="password" name="" id="" value="" placeholder="请输入短信验证码"/>
					</div> -->
					<a href="/home/Login/forget" class="blue_btn" style="background: none; font-size: 15px;">忘记密码?</a>
				</li>
			</ul>
		</div>
		
		
		<a  class="blue_btn logins" style="margin-top: 1rem;">登入</a>
		
	</body>

	<script src="/Public/oxc/js/jquery-2.1.0.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="/Public/oxc/swiper/4.1/swiper.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="/Public/oxc/js/common.js" type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript">
		$(".a_href").click(function(){
			window.location.href = $(this).attr('data-href');
			
		});

		//ajax公共方法(只传参数访问)
		function ajaxone(urlcel,data){
			$.ajax({
				dataType: 'json',
				type: "post",
				url: urlcel,
				data: data,
				cache: false,
				success: function(res) {
					// goo(res);
					ajaxonef(res);
					// console.log(res);
					// return ajaxonef(res);
				},
				error: function(error){
					console.log(error);
				}
			});
		}

		$(".back").click(function(){
			window.history.back(-1)
		});

		function timer(intDiff){
		    window.setInterval(function(){
		    if(intDiff < 0){
		    	$('.coding').html('获取验证码');
		    	return;
		    }
		    var day=0,
		        hour=0,
		        minute=0,
		        second=0;//时间默认值
		    if(intDiff > 0){
		        day = Math.floor(intDiff / (60 * 60 * 24));
		        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
		        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
		        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		    }
		    if (minute <= 9) minute = '0' + minute;
		    if (second <= 9) second = '0' + second;
		    // $('#day_show').html(day+"天");
		    // $('#hour_show').html('<s id="h"></s>'+hour+'时');
		    // $('#minute_show').html('<s></s>'+minute+'分');
		    $('.coding').html(second+'s');
		    intDiff--;
		    }, 1000);
		};


	</script>
	<script type="text/javascript">

		$(".logins").click(function(){

			var name = $('.name').val();//选中的值
            var pass = $('.pass').val();//选中的值
			var urlcel = '/home/Login/login';
			var data = {
				name:name,
				pass:pass
			};
			ajaxone(urlcel,data);
		});


		function ajaxonef(res){
			console.log(res);
			if(res.code == 400){
				alert(res.msg);
			}else{
				alert('登入成功！');
				window.location.replace(res.msg);
			}
		}
		
	</script>

</html>