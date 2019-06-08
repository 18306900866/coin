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

	<body class="has_menu has_header">

	<?php if(is_array($currency)): $i = 0; $__LIST__ = $currency;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$arr): $mod = ($i % 2 );++$i;?><div class="top_header">
			<a class="back"><img src="/Public/oxc/img/back_icon.jpg"/></a>
			<h3><?php echo ($arr["keyname"]); ?> / <?php echo ($arr["types"]); ?></h3>
		</div>

		<div class="top_deta">
			<p class="deta1"><?php echo ($arr["money"]); ?></p>
			<div class="subdeta clearfix">
				<span>≈¥ <?php echo ($arr["money"]); ?> </span>
				<?php if($arr["defloat"] > 0 ): ?><span class="green_font">+<?php echo ($arr["defloat"]); ?>%</span>
					<?php else: ?>
					<span class="red_font"><?php echo ($arr["defloat"]); ?>%</span><?php endif; ?>
			</div>
			<a href="" class="bzzj"><img src="/Public/oxc/img/bzzl.jpg"/></a>
			
			<table>
				<tr>
					<td>
						<p>24H成交量</p>
						<?php echo ($arr["sales_today"]); ?>
					</td>
					<td>
						<p>24H最高价</p>
						<?php echo ($arr["money_max"]); ?>
					</td>
					<td>
						<p>24H最低价</p>
						<?php echo ($arr["money_min"]); ?>
					</td>
				</tr>
			</table>
		</div><?php endforeach; endif; else: echo "" ;endif; ?>
		
		<div class="fssd">
			<a href="javascript:;" class="on">分时</a>
			<a href="javascript:;">深度</a>
		</div>
		
		<div class="fssd_item clearfix">
			<div class="item" style="display: block;">
				<div class="imgbox">
					<img src="/Public/oxc/img/line.jpg"/>
				</div>
			</div>
			<div class="item">
				<div class=" imgbox2">
					<img src="/Public/oxc/img/lin2.jpg"/>
				</div>
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
		
		
		<div class="bottom_menu bottom_buy_btn">
			<table>
				<tr>
					<td>
						<a  class="a_href" data-href="/home/Index/buy?hid=<?php echo ($hid); ?>">买入</a>
					</td>
					<td>
						<a  class="a_href" data-href="/home/Index/sale?hid=<?php echo ($hid); ?>">卖出</a>
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
		$(".fssd a").click(function(){
			var this_index = $(this).index();
			$(".fssd_item .item").hide();
			$(".fssd_item .item").eq(this_index).show();
			
			$(".fssd a").removeClass('on');
			
			$(this).addClass('on');
			
		})
	</script>

</html>