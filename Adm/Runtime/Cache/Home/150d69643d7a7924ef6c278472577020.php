<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn" xmlns="http://www.w3.org/1999/html">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="shortcut icon" href="favicon.ico">
    <title></title>

    <script src="/Public/js/jquery-2.1.0.js"></script>
    <link href="/Public/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="/Public/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="/Public/css/style.min.css?v=4.0.0" rel="stylesheet">
    <link rel="stylesheet" href="/Public/css/001.css" />
    <link rel="stylesheet" href="/Public/css/UI2.css">
    <link rel="stylesheet" href="/Public/css/users.css">
    <link rel="stylesheet" href="/Public/css/my_css_jia.css" />
    <link rel="stylesheet" href="/Public/css/checkcss.css" />
    <!--<base target="_blank">-->
</head>
<script type="text/javascript">

</script>
<body>
<div class="panel admin-panel">
    <div class="panel-head">
        <i class="fa icon-reorder" style="font-size: 19px;"></i>
        <strong class="zijing">货币信息查看</strong>
    </div>
</div>
<div class="tabale_txjl" style="min-height: 470px">
    <table class="table">
        <thead>
            <td>货币ID</td>
            <td>货币LOGO</td>
            <td>货币名称</td>
            <td>货币缩写</td>
            <td>货币类型</td>
            <td>基准价格</td>
            <td>当前价格</td>
            <td>24H 最高价</td>
            <td>24H 最低价</td>
            <td>总销量</td>
            <td>24H 销量</td>
            <td>基础浮动值</td>
            <td>当前浮动值</td>
            <td>价格上浮度</td>
            <td>价格下降度</td>
            <td>排序 (由大至小显示)</td>
            <td>开关</td>
            <td>修改</td>
        </thead>
        <tbody>
        <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$arr): $mod = ($i % 2 );++$i;?><tr class="alls">
                <td><?php echo ($arr["id"]); ?></td>
                <td><img src="<?php echo ($arr["img"]); ?>" style="width: 80px" ></td>
                <td contenteditable="true"><?php echo ($arr["name"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["keyname"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["types"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["money_start"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["money"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["money_max"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["money_min"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["sales_all"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["sales_today"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["float_start"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["defloat"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["upfloat"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["dofloat"]); ?></td>
                <td contenteditable="true"><?php echo ($arr["sort"]); ?></td>
                <td>
                <?php if($arr["states"] == '1'): ?><button type="button" class="btn btn-w-m btn-danger">关闭</button>
                    <?php else: ?>
                    <button type="button" class="btn btn-w-m btn-primary">开启</button><?php endif; ?>
                </td>
                <td><button type="button" class="btn btn-w-m btn-warning">修改</button></td>
            </tr><?php endforeach; endif; else: echo "" ;endif; ?>
        </tbody>
    </table>
</div>

<input type="hidden" value="0" id="type" />
</body>

<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
<script src="/Public/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/Public/js/plugins/cropper/cropper.min.js"></script>
<script src="/Public/js/demo/form-advanced-demo.min.js"></script>
<script>
    function replaceNotNumber(hehe) {
        var result = "";
        var timea =hehe.value;
        var bb = timea.replace(/:/g, "");
        for(var i = 0; i < bb.length; i++) {
            result += bb.charAt(i);
            if(i % 2 == 1) result += ':';
        }
        hehe.value =result.substring(0, 8);
    }

    $(window).load(function (){

        $("body").on("click",".btn-primary",function(){

            var td=$(this).parent();
            var id=$(this).parent().parent().children().eq(0).html();

            var arr={
                id:id,
                states:1
            };
            $.ajax({
                url:"upconfig", method: "post",
                async: "true", data:arr, timeout: 5000, dataType: "json",
                success: function (data){
                    var array = eval(data);
                    if (array['result'] == 1){
                        td.html('<button type="button" class="btn btn-w-m btn-danger">关闭</button>');
                    }
                }
            })


        })
        $("body").on("click",".btn-danger",function(){

            var td=$(this).parent();
            var id=$(this).parent().parent().children().eq(0).html();

            var arr={
                id:id,
                states:0
            };
            $.ajax({
                url:"upconfig", method: "post",
                async: "true", data:arr, timeout: 5000, dataType: "json",
                success: function (data){
                    var array = eval(data);
                    if (array['result'] == 1){
                        td.html('<button type="button" class="btn btn-w-m btn-primary">开启</button>');
                    }
                }
            })


        })
        $("body").on("click",".btn-warning",function(){

            var td=$(this).parent();
//            2-12

            var id=$(this).parent().parent().children().eq(0).html();
            var name=$(this).parent().parent().children().eq(2).html();
            var keyname=$(this).parent().parent().children().eq(3).html();
            var types=$(this).parent().parent().children().eq(4).html();

            var money_start=$(this).parent().parent().children().eq(5).html();

            var money=$(this).parent().parent().children().eq(6).html();
            var money_max=$(this).parent().parent().children().eq(7).html();
            var money_min=$(this).parent().parent().children().eq(8).html();
            var sales_all=$(this).parent().parent().children().eq(9).html();
            var sales_today=$(this).parent().parent().children().eq(10).html();

            var float_start=$(this).parent().parent().children().eq(11).html();
            var defloat=$(this).parent().parent().children().eq(12).html();

            var upfloat=$(this).parent().parent().children().eq(13).html();
            var dofloat=$(this).parent().parent().children().eq(14).html();
            var sort=$(this).parent().parent().children().eq(15).html();

            var arr={
                id:id,
                name:name,
                keyname:keyname,
                types:types,
                money:money,
                money_start:money_start,
                money_max:money_max,
                money_min:money_min,
                sales_all:sales_all,
                sales_today:sales_today,
                upfloat:upfloat,
                dofloat:dofloat,
                float_start:float_start,
                sort:sort
            };
            $.ajax({
                url:"upconfig", method: "post",
                async: "true", data:arr, timeout: 5000, dataType: "json",
                success: function (data){
                    var array = eval(data);

                    if (array['result'] == 1) alert('修改成功!');
                }
            })


        })



    })




</script>
</html>