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
		.clearfix:after {
			clear: both;
			content: '';
			display: block;
			font-size: 0;
			line-height: 0;
			visibility: hidden;
			width: 0;
			height: 0;
		}
		
		.clearfix {
			*display: inline-block;
		}
		
		* html .clearfix {
			height: 1%;
		}
		
		.right_dibu {
			float: right;
			width: 40%;
			
			
		}
		.left_dibu{
			float: left;
			width: 55%;
		}
		.box div.left_dibu{
			margin-left: 0;
		}
		.box{
			max-width: 1000px;
			width: auto;
			margin-bottom: 30px;
		}
		
		.zongyeshu {
			line-height: 34px;
			height: 34px;
			border: 1px solid #1ab394;
			display: inline-block;
			border-radius: 5px;
			padding: 0 5px;
		}
		
		@media only screen and (max-width: 900px) {
			.right_dibu {
				clear: both;
				text-align: center;
				width: 100%;
				padding: 10px 0;
			}
			.left_dibu{
			float: left;
			width: 100%;
		}
			.box {
				text-align: center;
				width: 100%;
			}
		}
		
	</style>

	<body>
		<div class="panel admin-panel">
			<div class="panel-head">
				<i class="fa icon-reorder" style="font-size: 19px;"></i>
				<strong class="zijing" name="miao">图片上传</strong>
			</div>
		</div>

		<div class="tabale_txjl" style="min-height: 470px"  name="miaoo">
		<form action="upimg" method="post" enctype="multipart/form-data">
			<table class="table">
				<thead>
					<td>上传类型</td>
					<td>上传文件</td>
					<td>提交</td>
					<tbody>
						<tr style=" text-align: center">
							<td style="width:30%">
								<select style="width:120px;" name='type'>
									<option value="1">轮播图</option>
									<option value="2">走势图</option>
									<option value="3">迷你走势图</option>
									<option value="4">客服</option>
								</select>
							</td>
							<td style="width:50%"><input type="file" name="file" onchange="PreviewImage(this,'imgHeadPhoto','divPreview');" size="20" /></td>
							<td style="width:20%"><input  type="submit" value="上传"/></td>
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

		<!-- // <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script> -->
		<script src="/Public/goo/goo.js"></script>


	</body>

</html>