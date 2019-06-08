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

<link rel="stylesheet" type="text/css" href="/Public/zhifu/css/zhifu.css"/>

<body class="has_menu has_header">

<div class="top_header">
	<h3><a href="javascript:;" id="show_more_coin"> <?php echo ($nowname); ?> <img src="/Public/oxc/img/arr2.png"/></a></h3>
</div>

<div class="chose_coin">
	<div class="coin_box">
		<table>
			<tbody>

				<?php if(is_array($currencys)): $i = 0; $__LIST__ = $currencys;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$currency): $mod = ($i % 2 );++$i;?><tr><td><a class="a_href" data-href="/home/Index/buy?hid=<?php echo ($currency["id"]); ?>"><?php echo ($currency["keyname"]); ?>/<?php echo ($currency["types"]); ?></a></td></tr><?php endforeach; endif; else: echo "" ;endif; ?>

			</tbody>
		</table>
	</div>
</div>

<div class="jy_switch">
	<table>
		<tr>
			<td class="on"><a>买入</a></td>
			<td><a  class="a_href" data-href="/home/Index/sale?hid=<?php echo ($hid); ?>">卖出</a></td>
			<td><a  class="a_href" data-href="/home/Index/history?hid=<?php echo ($hid); ?>">历史成交</a></td>
		</tr>
	</table>
</div>

<div class="jy_wrap clearfix">
	<div class="col-xs-6 lf">
		<p class="f1">单价</p>

		<div class="inputbox">
			<table>
				<tr>
					<td width="20%"><a href="javascript:;"> </a></td>
					<td id="nowmoney"><a><?php echo ($nowmoney); ?></a></td>
					<td width="20%"><a href="javascript:;"> </a></td>
				</tr>
			</table>
		</div>

		<p class="f1">≈¥<?php echo ($nowmoney); ?></p>


		<div class="inputbox" style="margin-top: .2rem;">
			<table>
				<tr>
					<td width="20%" class="numa"><a href="javascript:;">-</a></td>
					<td><input class="numx" type="text"  placeholder="数量(ETH)"  maxlength="8" oninput="this.value=this.value.replace(/[^0-9]/g,'');"></td>
					<td width="20%" class="numb"><a href="javascript:;">+</a></td>
				</tr>
			</table>
		</div>

		<div class="jy_btns">
			<table>
				<tr>
					<td class="on"><a>+10</a></td>
					<td class="on"><a>+100</a></td>
					<td class="on"><a>+200</a></td>
					<td class="on"><a>+500</a></td>
				</tr>
			</table>
		</div>

		<div class="inputbox2">
			<input id="allmoney" type="text" placeholder="总额(BTC)" disabled="disabled" />
		</div>

		<div class="jy_zj">
			<p>可用 <?php echo ($usermoney); ?><span id="smoney">0BTC</span></p>
			<p>冻结 <?php echo ($userapplying); ?><span id="sapplying">0BTC</span></p>
		</div>

		<input type="hidden" value="<?php echo ($hid); ?>" id="nowid">
		<a href="javascript:void(0);" class="green_btn ljzf_but all_w"  >买入</a>

		<div class="jy_info1" style="color: white">
			<span>买</span>
			<span>卖</span>
		</div>

		<img src="<?php echo ($imgzs); ?>"/>

	</div>
	<div class="col-xs-6" style="padding-right: 0;padding-left: 0;">
		<table class="jy_date">
			<tr>
				<td>价格(BTC)</td>
				<td>数量(ETH)</td>
			</tr>


			<?php if(is_array($saledata)): $i = 0; $__LIST__ = $saledata;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$sale): $mod = ($i % 2 );++$i;?><tr>
					<td class="red_font"><?php echo ($sale["money"]); ?></td>
					<td><?php echo ($sale["quantity"]); ?></td>
				</tr><?php endforeach; endif; else: echo "" ;endif; ?>

			<tr>
				<td colspan="2">
					<div class="gap green_font">
						¥<?php echo ($nowmoney); ?><br />
						<span>≈¥<?php echo ($nowmoney); ?></span>
					</div>
				</td>
			</tr>

			<?php if(is_array($buydata)): $i = 0; $__LIST__ = $buydata;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$buy): $mod = ($i % 2 );++$i;?><tr>
					<td class="green_font"><?php echo ($buy["money"]); ?></td>
					<td><?php echo ($buy["quantity"]); ?></td>
				</tr><?php endforeach; endif; else: echo "" ;endif; ?>
		</table>
	</div>
</div>
<div class="gap_title1 gap_title3" style="margin-top: .2rem;">
	<img src="/Public/oxc/img/newst_icon.jpg">最新成交
</div>

<div class="jy_date_list">
	<table>
		<thead>
		<tr>
			<td>时间</td>
			<td>数量</td>
			<td>价格</td>
		</tr>
		</thead>

		<tbody>

		<?php if(is_array($news)): $i = 0; $__LIST__ = $news;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$arr): $mod = ($i % 2 );++$i;?><tr>
				<td><?php echo ($arr["time"]); ?></td>
				<td><?php echo ($arr["quantity"]); ?></td>
				<?php if($arr["types"] == 1 ): ?><td class="green_font"><?php echo ($arr["money"]); ?></td>
					<?php else: ?>
					<td class="red_font"><?php echo ($arr["money"]); ?></td><?php endif; ?>
			</tr><?php endforeach; endif; else: echo "" ;endif; ?>
		</tbody>
	</table>
</div>


<div class="ftc_wzsf">
	<div class="srzfmm_box">
		<div class="qsrzfmm_bt clear_wl">
			<img src="/Public/zhifu/images/xx_03.jpg" class="tx close fl">
			<span class="fl">请输入支付密码</span></div>
		<div class="zfmmxx_shop">
			<div class="mz">购买货币</div>
			<div class="zhifu_price">￥88.88</div>
		</div>
		<ul class="mm_box">
			<li></li><li></li><li></li><li></li><li></li><li></li>
		</ul>
	</div>
	<div class="numb_box">
		<div class="xiaq_tb">
			<img src="/Public/zhifu/images/jftc_14.jpg" height="10"></div>
		<ul class="nub_ggg">
			<li><a href="javascript:void(0);" class="zf_num">1</a></li>
			<li><a href="javascript:void(0);" class="zj_x zf_num">2</a></li>
			<li><a href="javascript:void(0);" class="zf_num">3</a></li>
			<li><a href="javascript:void(0);" class="zf_num">4</a></li>
			<li><a href="javascript:void(0);" class="zj_x zf_num">5</a></li>
			<li><a href="javascript:void(0);" class="zf_num">6</a></li>
			<li><a href="javascript:void(0);" class="zf_num">7</a></li>
			<li><a href="javascript:void(0);" class="zj_x zf_num">8</a></li>
			<li><a href="javascript:void(0);" class="zf_num">9</a></li>
			<li><a href="javascript:void(0);" class="zf_empty">清空</a></li>
			<li><a href="javascript:void(0);" class="zj_x zf_num">0</a></li>
			<li><a href="javascript:void(0);" class="zf_del">删除</a></li>
		</ul>
	</div>
	<div class="hbbj"></div>
</div>


<div class="bottom_menu">
	<table>
		<tr>
			<td <?php if(ACTION_NAME == index): ?>class="on"<?php endif; ?>>
				<a href="/home/Index/index">
					<i class="i1"></i>
					<p>首页</p>
				</a>
			</td>
			<td <?php if(ACTION_NAME == buy): ?>class="on"<?php endif; ?>>
				<a href="/home/Index/buy">
					<i class="i2"></i>
					<p>交易</p>
				</a>
			</td>
			<td <?php if(ACTION_NAME == property): ?>class="on"<?php endif; ?>>
				<a href="/home/Index/property">
					<i class="i3"></i>
					<p>资金</p>
				</a>
			</td>
			<td <?php if(ACTION_NAME == wode): ?>class="on"<?php endif; ?>>
				<a href="/home/UserInfo/wode">
					<i class="i4"></i>
					<p>我的</p>
				</a>
			</td>
		</tr>
	</table>
</div>

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

	$("#show_more_coin").on('click',function(){
		if($(".chose_coin").hasClass('on')){
			$(".chose_coin").removeClass('on');
		}else{
			$(".chose_coin").addClass('on');
		}
	})

	function upmoney(){
		var num = $('.numx').val();
		if ( num<1 ) return
		var nowmoney = $('#nowmoney').text();
		var allmoney = parseInt(num) * nowmoney;
		allmoney = allmoney.toFixed(3);
		allmoney = '总额：'+allmoney+' (BTC)';
		$('#allmoney').val(allmoney);
	}

	$('.numx').blur(function(){
		upmoney();
	});

	$(".numa").on('click',function(){
		var num = $('.numx').val();
		if ( num<1 ) num = 0;
		num = parseInt(num) - 1 ;
		if ( num<1 ) num = 1;
		$('.numx').val(num);
		upmoney();
	})

	$(".numb").on('click',function(){
		var num = $('.numx').val();
		if ( num<1 ) num = 0;
		num = parseInt(num) + 1 ;
		if ( num>99999999 ) num = 99999999;
		$('.numx').val(num);
		upmoney();
	})

	$(".on").on('click',function(){
		var num = $('.numx').val();
		var xx = $(this).text();
		if ( num<1 ) num = 0;
		xx = xx.substring(1);
		num = parseInt(num) + parseInt(xx);
		if ( num>99999999 ) num = 99999999;
		$('.numx').val(num);
		upmoney();
	})

	function payhb(hid){
		var num = $('#num').val();
		if (num < 1) return;
		var data = {hid:hid,num:num,types:1}
		$.ajax({
			url:"ajaxpay", method: "post",
			async: "true", data:data, timeout: 5000, dataType: "json",
			success: function (data){
				var arr = eval(data);

				$('#smoney').text(arr['money']);
				$('#sapplying').text(arr['applying']);
				alert(arr['message']);
			}
		})
	}

	$(function(){
		//出现浮动层
		$(".ljzf_but").click(function(){

			var num = $('.numx').val();
			if ( num<1 ) return

			var nowmoney = $('#nowmoney').text();
			var allmoney = parseInt(num) * nowmoney;
			allmoney = '￥' + allmoney.toFixed(3);

			$('.zhifu_price').html(allmoney);

			$(".ftc_wzsf").show();
		});
		//关闭浮动
		$(".close").click(function(){
			$(".ftc_wzsf").hide();
			$(".mm_box li").removeClass("mmdd");
			$(".mm_box li").attr("data","");
			i = 0;
		});
		//数字显示隐藏
		$(".xiaq_tb").click(function(){
			$(".numb_box").slideUp(500);
		});
		$(".mm_box").click(function(){
			$(".numb_box").slideDown(500);
		});
		//----
		var i = 0;
		$(".nub_ggg li .zf_num").click(function(){

			if(i<6){
				$(".mm_box li").eq(i).addClass("mmdd");
				$(".mm_box li").eq(i).attr("data",$(this).text());
				i++
				if (i==6) {

					setTimeout(function(){
						var pwd = "";
						$(".mm_box li").each(function(){
							pwd += $(this).attr("data");
						});
						//密码输入完成
						var hid = $('#nowid').val();
						var numx = $('.numx').val();
						if (numx < 1) return;
						var datasss = {hid:hid,nums:numx,types:1,pwd:pwd}
						$.ajax({
							url:"ajaxpay", method: "post",
							async: "true", data:datasss, timeout: 5000, dataType: "json",
							success: function (data){
								var arr = eval(data);
								$('#smoney').text(arr['money']);
								$('#sapplying').text(arr['applying']);

								if (arr['message'] == '1'){
									$(".ftc_wzsf").hide();
									$(".mm_box li").removeClass("mmdd");
									$(".mm_box li").attr("data","");
									i = 0;

									alert('购买成功！');
								}else if(arr['message'] == '-1') {
									alert('密码错误！');
									$(".mm_box li").removeClass("mmdd");
									$(".mm_box li").attr("data","");
									i = 0;
								}else if(arr['message'] == '0') {
									alert('余额不足！');
									$(".ftc_wzsf").hide();
									$(".mm_box li").removeClass("mmdd");
									$(".mm_box li").attr("data","");
									i = 0;
								}else{
									alert(arr['message']);
									$(".ftc_wzsf").hide();
									$(".mm_box li").removeClass("mmdd");
									$(".mm_box li").attr("data","");
									i = 0;
								}
							}
						})


					},100);
				};
			}
		});

		$(".nub_ggg li .zf_del").click(function(){
			if(i>0){
				i--
				$(".mm_box li").eq(i).removeClass("mmdd");
				$(".mm_box li").eq(i).attr("data","");
			}
		});

		$(".nub_ggg li .zf_empty").click(function(){
			$(".mm_box li").removeClass("mmdd");
			$(".mm_box li").attr("data","");
			i = 0;
		});

	});
</script>

</html>