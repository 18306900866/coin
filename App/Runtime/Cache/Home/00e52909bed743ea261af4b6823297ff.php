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

<body class="has_menu">

<!--顶部轮播图-->
<div class="index_banner">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <?php if(is_array($img)): $i = 0; $__LIST__ = $img;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$arr): $mod = ($i % 2 );++$i; if($arr["url"] == '' ): ?><div class="swiper-slide"><img src="<?php echo ($arr["img"]); ?>"/></div>
                    <?php else: ?>
                    <a href="<?php echo ($arr["url"]); ?>">
                        <div class="swiper-slide"><img src="<?php echo ($arr["img"]); ?>"/></div>
                    </a><?php endif; endforeach; endif; else: echo "" ;endif; ?>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</div>


<div class="index_list">
    <div class="gap_title1">
        <img src="/Public/oxc/img/icon1.jpg"/>市场涨幅榜
        <div class="a_href" data-href="http://kefu.ziyun.com.cn/vclient/chat/?websiteid=144998&wc=33d543"
             style="float: right"><img src="/public/img/serice.jpg" style="border-radius: 50%;" />在线客服
        </div>
    </div>
    <ul class="new_box">

        <!--绿涨   红跌-->
        <?php if(is_array($currency)): $i = 0; $__LIST__ = $currency;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$arr): $mod = ($i % 2 );++$i; if($arr["defloat"] > 0): ?><li class="green"><?php endif; ?>
            <?php if($arr["defloat"] < 0): ?><li class="red"><?php endif; ?>
            <?php if($arr["defloat"] == 0): ?><li class=""><?php endif; ?>
            <table>
                <tr class="a_href" data-href="/home/Index/message?hid=<?php echo ($arr["id"]); ?>">
                    <td><img src="<?php echo ($arr["img"]); ?>"/></td>
                    <td class="st1">
                        <?php echo ($arr["keyname"]); ?> <span class="gray_font1">/ <?php echo ($arr["types"]); ?> </span><br/>
                        <span class="gray_font1">成交量 <?php echo ($arr["sales_all"]); ?></span>
                    </td>
                    <td class="st2">

                        <?php if($arr["defloat"] > 0): ?><span class="green_font"><?php echo ($arr["money"]); ?></span><br/><?php endif; ?>
                        <?php if($arr["defloat"] < 0): ?><span class="red_font"><?php echo ($arr["money"]); ?></span><br/><?php endif; ?>
                        <?php if($arr["defloat"] == 0): ?><span class="green_font"><?php echo ($arr["money"]); ?></span><br/><?php endif; ?>

                        <span class="gray_font1">≈¥ <?php echo ($arr["money"]); ?></span>
                    </td>


                    <td class="st3">
                        <?php if($arr["defloat"] > 0): ?><div class="list_btn green"><?php echo ($arr["defloat"]); ?>%</div><?php endif; ?>
                        <?php if($arr["defloat"] < 0): ?><div class="list_btn red"><?php echo ($arr["defloat"]); ?>%</div><?php endif; ?>
                        <?php if($arr["defloat"] == 0): ?><div class="list_btn"><?php echo ($arr["defloat"]); ?>%</div><?php endif; ?>
                    </td>
                </tr>
            </table>
            </li><?php endforeach; endif; else: echo "" ;endif; ?>
    </ul>
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


    $(window).load(function () {


        setTimeout(function () {
        }, 5000)
        setInterval(showTime, 10000);

        function showTime() {
            $.ajax({
                url: "/home/Index/ajaxcurrency", method: "post",
                async: "true", data: [], timeout: 5000, dataType: "json",
                success: function (data) {
                    var arr = eval(data);
                    var array = arr['data'];
                    var sum = arr['sum'];

                    var ul = '';


                    for (var i = 0; i < sum; i++) {
                        var defloat = parseInt(array[i]['defloat']);

                        var li = '';
                        if (defloat > 0) {
                            li = '<li class="green">';
                        } else if (defloat < 0) {
                            li = '<li class="red">';
                        } else {
                            li = '<li class="green">';
                        }
                        li = li + '<table><tr class="a_href" data-href="/home/Index/message?hid=' +
                            array[i]['id'] +
                            '"><td><img src="' +
                            array[i]['img'] +
                            '"/></td><td class="st1">' +
                            array[i]['keyname'] +
                            ' <span class="gray_font1">/ ' +
                            array[i]['types'] +
                            ' </span><br /><span class="gray_font1">成交量 ' +
                            array[i]['sales_all'] +
                            '</span></td><td class="st2">';

                        if (array[i]['defloat'] < 0) {
                            li = li + '<span class="red_font">' +
                                array[i]['money'] +
                                '</span><br /><span class="gray_font1">≈¥ ' +
                                array[i]['money'] +
                                '</span></td><td class="st3">' +
                                '<div class="list_btn red">' +
                                array[i]['defloat'] +
                                '%</div></td></tr></table></li>';
                        } else {
                            li = li + '<span class="green_font">' +
                                array[i]['money'] +
                                '</span><br /><span class="gray_font1">≈¥ ' +
                                array[i]['money'] +
                                '</span></td><td class="st3">' +
                                '<div class="list_btn green">' +
                                array[i]['defloat'] +
                                '%</div></td></tr></table></li>';
                        }

                        ul = ul + li;
                    }


                    $('.new_box').html(ul);

                    $(".a_href").click(function () {
                        window.location.href = $(this).attr('data-href');
                    });

                }
            })
        }
    })


    //		$(function(){
    //		})

</script>


</html>