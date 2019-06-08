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

<body>
<div class="panel admin-panel">
    <div class="panel-head">
        <i class="fa icon-reorder" style="font-size: 19px;"></i>
        <strong class="zijing">用户提现申请</strong>
    </div>
    <div style="position: relative" class="clearfix txjl">
        <div class="form-group txjl_form-group_select_tongxiu">
            <label>用户ID(多查询请用","隔开)</label>
            <input type="text" placeholder="请输入用户ID" class="form-control user_id input_border_ra">
        </div>
        <div class="form-group txjl_form-group_select_tongxiu">
            <label>用户账号(多查询请用","隔开)</label>
            <input type="text" placeholder="请输入用户账号" class="form-control user_account input_border_ra">
        </div>
        <div class="form-group txjl_form-group_select_tongxiu chosen-container chosen-container-multi chosen-with-drop chosen-container-active " style="width: 320px;float: left;margin-left: 20px">
            <label>充值金额</label>
            <div style="position: relative" class="clearfix">
                <input type="text" placeholder="最小金额" class="form-control money_start input_border_ra" style="width: 40%;float: left;margin-right: 5px">
                <input type="text" placeholder="最大金额" class="form-control money_end input_border_ra" style="width: 40%;float: left;margin-right: 5px">
            </div>
        </div>
        <div style="float: left;margin-left: 20px;line-height: 57px; height: 57px;">
            <button class="select btn btn-sm btn-primary margin_top20 search vertical_al_midd" type="submit"><strong>搜 索</strong></button>
            <button class="btn btn-sm btn-primary margin_top20 cancel vertical_al_midd" type="submit"><strong>清 空</strong></button>
        </div>
    </div>
</div>
<div class="tabale_txjl" style="min-height: 470px">
    <table class="table">
        <thead>
        <td class="soc select" name="u.uid">用户ID<i class="sorting_ascss on"></i></td>
        <td>用户账号</td>
        <td>推荐人</td>
        <td>注册时间</td>
        <td>注册IP</td>
        <td>最后登录时间</td>
        <td>最后登录IP</td>
        <td>最后登录地址</td>
        <td class="soc select" name="money">用户余额<i class="sorting_ascss"></i></td>
        <td>货币详情</td>
        <td>操作</td>
        </thead>
        <tbody>
        <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$arr): $mod = ($i % 2 );++$i;?><tr class="alls">
                <td><?php echo ($arr["uid"]); ?></td>
                <td><?php echo ($arr["account"]); ?></td>
                <td><?php echo ($arr["referrer"]); ?></td>
                <td><?php echo ($arr["register_time"]); ?></td>
                <td><?php echo ($arr["register_ip"]); ?></td>
                <td><?php echo ($arr["login_time"]); ?></td>
                <td><?php echo ($arr["login_ip"]); ?></td>
                <td><?php echo ($arr["login_city"]); ?></td>
                <td><?php echo ($arr["money"]); ?></td>
                <td><?php echo ($arr["currency"]); ?></td>
                <td>
                    <?php if($arr["states"] == '1' ): ?><button class="btn btn-danger">停用</button>
                        <?php else: ?>
                        <button class="btn btn-primary">启用</button><?php endif; ?>
                </td>
            </tr><?php endforeach; endif; else: echo "" ;endif; ?>
        </tbody>
    </table>
</div>

<div class="box clearfix">
    <div class="left_dibu">
        <?php if($count > 1): ?><button class='select button border-blue'>首页</button>
            <button class='button border-yellow'>1</button>
            <?php
 for($i=2;$i<=$count && $i<10;$i++){ echo "<button class='select button border-green'>$i</button> "; } endif; ?>
        <?php if($count > 9): ?><button class='select button border-blue'>尾页</button><?php endif; ?>
    </div>

    <div class="right_dibu" style="">
        <input type="number" placeholder="页" class="dump_to" style="width: 50px;margin-right: 5px;padding: 0 5px;border: 1px solid #1ab394; font-size: 10px; line-height: 34px;height: 34px; display: inline-block;">
        <button class='button border-blue select'><strong>跳转</strong></button>
        <span class="zongyeshu">页数:1/总页数:<?php echo ($count); ?></span>
    </div>

</div>
<input type="hidden" value="0" id="type" />
</body>

<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
<script src="/Public/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/Public/js/plugins/cropper/cropper.min.js"></script>
<script src="/Public/js/demo/form-advanced-demo.min.js"></script>
<script src="/Public/js/banks.js"></script>
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
</script>
</html>