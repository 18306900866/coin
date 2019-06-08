<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn" xmlns="http://www.w3.org/1999/html">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="renderer" content="webkit">
        <meta http-equiv="Cache-Control" content="no-siteapp" />
        <title>H+ 后台主题UI框架 - 主页</title>
        <link rel="stylesheet" href="/Public/css/UI1.css">
        <link rel="stylesheet" href="/Public/css/UI2.css">
        <link rel="stylesheet" href="/Public/css/pay.css">
        <link rel="stylesheet" href="/Public/css/users.css">
        <link rel="shortcut icon" href="favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="favicon.ico">
        <link href="/Public/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
        <link href="/Public/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
        <link href="/Public/css/plugins/chosen/chosen.css" rel="stylesheet">
        <link href="/Public/css/plugins/colorpicker/css/bootstrap-colorpicker.min.css" rel="stylesheet">
        <link href="/Public/css/plugins/cropper/cropper.min.css" rel="stylesheet">
        <link href="/Public/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
        <link href="/Public/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" rel="stylesheet">
        <link href="/Public/css/plugins/clockpicker/clockpicker.css" rel="stylesheet">
        <link href="/Public/css/animate.min.css" rel="stylesheet">
        <link href="/Public/css/style.min.css?v=4.0.0" rel="stylesheet">
        <link rel="stylesheet" href="/Public/css/my_css_jia.css" />
        <link rel="stylesheet" href="/Public/goo/goo.css" />
        <!-- <base target="_blank"> -->




    </head>
    <style>
        
        
    </style>

    <body>
        <div class="panel admin-panel">
            <div class="panel-head">
                <i class="fa icon-reorder" style="font-size: 19px;"></i>
                <strong class="zijing" name="miao">币种信息添加</strong>
            </div>

        </div>
        <div class="tabale_txjl" style="min-height: 470px"  name="miaoo">
            <form action="upimg" method="post" enctype="multipart/form-data">
            <table class="table" style="text-align: center; width: 60%">
                <thead>
                    <tr>
                        <td>彩种名</td>
                        <td>期号</td>
                    </tr>
                    <tbody>
                        <tr>
                            <td>中文名</td>
                            <td><input type="text" name="name"></td>
                        </tr>
                        <tr>
                            <td>缩写</td>
                            <td><input type="text" name="keyname"></td>
                        </tr>
                        <tr>
                            <td>图标</td>
                            <td style="width:50%"><input type="file" name="file" onchange="PreviewImage(this,'imgHeadPhoto','divPreview');" size="20" /></td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td><input type="text" name="types"></td>
                        </tr>
                        <tr>
                            <td>当前价格</td>
                            <td><input type="text" name="money"></td>
                        </tr>
                        <tr>
                            <td>24H 最高价</td>
                            <td><input type="text" name="money_max"></td>
                        </tr>
                        <tr>
                            <td>24H 最低价</td>
                            <td><input type="text" name="money_min"></td>
                        </tr>
                        <tr>
                            <td>总销量</td>
                            <td><input type="text" name="sales_all"></td>
                        </tr>
                        <tr>
                            <td>24H 销量</td>
                            <td><input type="text" name="sales_today"></td>
                        </tr>
                        <tr>
                            <td>24H 最高价</td>
                            <td><input type="text" name="sales_max"></td>
                        </tr>
                        <tr>
                            <td>24H  最低价</td>
                            <td><input type="text" name="sales_min"></td>
                        </tr>
                        <tr>
                            <td>初始浮动</td>
                            <td><input type="text" name="defloat"></td>
                        </tr>
                        <tr>
                            <td>向上浮动</td>
                            <td><input type="text" name="upfloat"></td>
                        </tr>
                        <tr>
                            <td>向下浮动</td>
                            <td><input type="text" name="dofloat"></td>
                        </tr>
                        <tr>
                            <td style="width:20%" colspan="2"><input  type="submit" value="提交"/></td>
                        </tr>
                    </tbody>

            </table>
            </form>
        </div>
        <div class="box clearfix">
        

        </div>
        <input type="hidden" value="0" id="type" />

        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <link rel="stylesheet" href="/Public/css/001.css" />
        <script src="/Public/js/jquery.min.js?v=2.1.4"></script>
        <script src="/Public/js/bootstrap.min.js?v=3.3.5"></script>
        <script src="/Public/js/content.min.js?v=1.0.0"></script>
        <script src="/Public/js/plugins/chosen/chosen.jquery.js"></script>
        <script src="/Public/js/plugins/datapicker/bootstrap-datepicker.js"></script>
        <script src="/Public/js/plugins/iCheck/icheck.min.js"></script>
        <script src="/Public/js/plugins/colorpicker/bootstrap-colorpicker.min.js"></script>
        <script src="/Public/js/plugins/clockpicker/clockpicker.js"></script>
        <script src="/Public/js/plugins/cropper/cropper.min.js"></script>
        <script src="/Public/js/demo/form-advanced-demo.min.js"></script>
        <!-- // <script src="/Public/js/with.js"></script> -->
        <script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
        
        <script src="/Public/js/my_js_jia.js"></script>
        <script src="/Public/goo/jquery.maskedinput.js" type="text/javascript"></script>

        <!-- // <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script> -->
        <script src="/Public/goo/goo.js"></script>

    </body>

</html>