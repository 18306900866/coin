<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <title>首页</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="/Public/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="/Public/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="/Public/css/animate.min.css" rel="stylesheet">
    <link href="/Public/css/style.min.css?v=4.0.0" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/Public/css/my_css_jia.css"/>

    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>

</head>

<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
<div id="wrapper">
    <!--左侧导航开始-->
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="nav-close"><i class="fa fa-times-circle"></i>
        </div>
        <div class="sidebar-collapse">
            <ul class="nav" id="side-menu">
                <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="nav-header">
                        <div class="dropdown profile-element">
                            <span><img alt="image" class="img-circle" src="/Public/img/profile_small.jpg"/></span>
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                    <span class="clear">
                               <span class="block m-t-xs"><strong class="font-bold">Admin</strong></span>
                                    <span class="text-muted text-xs block">超级管理员<b class="caret"></b></span>
                                    </span>
                            </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li>
                                    <a class="J_menuItem" href="Admin/pwd">修改密码</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="Login/quit">安全退出</a>
                                </li>
                            </ul>
                        </div>
                        <div class="logo-element">Admin</div>
                    </li><?php endforeach; endif; else: echo "" ;endif; ?>

                <!--<li>-->
                    <!--<a href="#">-->
                        <!--<i class="fa fa-user"></i>-->
                        <!--<span class="nav-label">管理员操作</span>-->
                        <!--<span class="fa arrow"></span>-->
                    <!--</a>-->
                    <!--<ul class="nav nav-second-level">-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Admin/recharge">后台充值</a>-->
                        <!--</li>-->
                        <!--&lt;!&ndash;<li>&ndash;&gt;-->
                            <!--&lt;!&ndash;<a class="J_menuItem" href="Admin/adminlog">管理员操作记录</a>&ndash;&gt;-->
                        <!--&lt;!&ndash;</li>&ndash;&gt;-->
                        <!---->
                    <!--</ul>-->
                <!--</li>-->
                <li>
                    <a href="#">
                        <i class="fa fa-users"></i>
                        <span class="nav-label">用户管理</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a class="J_menuItem" href="Operation/user">用户列表</a>
                        </li>
                        
                        <li>
                            <a class="J_menuItem" href="UserInfo/ubank">用户信息认证</a>
                        </li>

                        <li>
                            <a class="J_menuItem" href="Admin/recharge">后台充值/扣款</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-hourglass-1"></i>
                        <span class="nav-label">用户申请记录</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a class="J_menuItem" href="Operation/chongzhi">充值记录</a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="Operation/tixian">提现申请记录</a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="Operation/pay">货币购买记录</a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="Operation/water">资金流水记录</a>
                        </li>
                    </ul>

                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-money"></i>
                        <span class="nav-label">货币信息配置</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a class="J_menuItem" href="Operation/ope">基础信息</a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="Currency/add">添加新货币</a>
                        </li>

                    </ul>
                </li>

                <li>
                    <a href="#">
                        <i class="fa fa-money"></i>
                        <span class="nav-label">设置</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a class="J_menuItem" href="Upimg/img">图片管理</a>
                            <a class="J_menuItem" href="Upimg/kf">图片上传</a>
                        </li>

                    </ul>
                </li>

                <!--<li>-->
                    <!--<a href="#">-->
                        <!--<i class="fa fa-money"></i>-->
                        <!--<span class="nav-label">机器人</span>-->
                        <!--<span class="fa arrow"></span>-->
                    <!--</a>-->
                    <!--<ul class="nav nav-second-level">-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=1">北京28-普通房</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=2">北京28-贵宾房</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=3">北京28-vip房</a>-->
                        <!--</li>-->

                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=4">加拿大28-普通房</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=5">加拿大28-贵宾房</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=6">加拿大28-vip房</a>-->
                        <!--</li>-->

                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=7">西班牙28-普通房</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=8">西班牙28-贵宾房</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Robot/bjo?id=9">西班牙28-vip房</a>-->
                        <!--</li>-->

                    <!--</ul>-->
                <!--</li>-->

                <!--<li>-->
                    <!--<a href="#">-->
                        <!--<i class="fa fa-newspaper-o"></i>-->
                        <!--<span class="nav-label">彩种开奖信息</span>-->
                        <!--<span class="fa arrow"></span>-->
                    <!--</a>-->
                    <!--<ul class="nav nav-second-level">-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Ajf/pcdd">北京28</a>-->
                        <!--</li>-->

                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Ajf/jianada">加拿大28 </a>-->
                        <!--</li>-->

                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Ajf/xibanya">西班牙28 </a>-->
                        <!--</li>-->

                    <!--</ul>-->

                <!--</li>-->
                <!--<li>-->
                    <!--<a href="#">-->
                        <!--<i class="fa fa-table"></i>-->
                        <!--<span class="nav-label">投注记录</span>-->
                        <!--<span class="fa arrow"></span>-->
                    <!--</a>-->
                    <!--<ul class="nav nav-second-level">-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Ajf/betjl">历史投注记录</a>-->
                        <!--</li>-->

                    <!--</ul>-->

                <!--</li>-->
                <!--<li>-->
                    <!--<a href="#">-->
                        <!--<i class="fa fa-tasks"></i>-->
                        <!--<span class="nav-label">设置</span>-->
                        <!--<span class="fa arrow"></span>-->
                    <!--</a>-->
                    <!--<ul class="nav nav-second-level">-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="User/config">信息设置</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Czkg">彩种开关</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Rate">倍率修改</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Bet/room">彩种信息设置</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Bet/roomall">玩法信息设置</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Wcme/img">彩种图片设置</a>-->
                        <!--</li>-->

                        <!--<li>-->
                            <!--<a class="J_menuItem" href="Upimg/kf">图片上传(客服 活动)</a>-->
                        <!--</li>-->

                         <!--<li>-->
                            <!--<a class="J_menuItem" href="Shtml/guize">规则编辑</a>-->
                        <!--</li>-->

                    <!--</ul>-->

                <!--</li>-->
            </ul>
        </div>
    </nav>
    <!--左侧导航结束-->
    <!--右侧部分开始-->
    <div id="page-wrapper" class="gray-bg dashbard-1">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i>
                    </a>
                    <!--<form role="search" class="navbar-form-custom top_nav" method="post" action="">-->
                        <!--<div class="form-group">-->
                                    <!--<span class="balance " id="top_nav_renshu">-->
                                    <!--盈利&nbsp;:&nbsp;<strong class="online"><?php echo ($num); ?></strong>-->
                                <!--</span>-->
                        <!--</div>-->
                    <!--</form>-->



                </div>
                <ul class="nav navbar-top-links navbar-right">

                    <li class="dropdown hidden-xs">
                        <a class="right-sidebar-toggle" aria-expanded="false">
                            <i class="fa fa-tasks"></i> 主题
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="row content-tabs">
            <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
            </button>
            <nav class="page-tabs J_menuTabs">
                <div class="page-tabs-content">
                    <a href="javascript:;" class="active J_menuTab" data-id="index_v1.html">首页</a>
                </div>
            </nav>
            <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
            </button>
            <div class="btn-group roll-nav roll-right">
                <button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span>

                </button>
                <ul role="menu" class="dropdown-menu dropdown-menu-right">
                    <li class="J_tabShowActive">
                        <a>定位当前选项卡</a>
                    </li>
                    <li class="divider"></li>
                    <li class="J_tabCloseAll">
                        <a>关闭全部选项卡</a>
                    </li>
                    <li class="J_tabCloseOther">
                        <a>关闭其他选项卡</a>
                    </li>
                </ul>
            </div>
            <a href="./Login/quit" class="roll-nav roll-right J_tabExit"><i class="fa fa fa-sign-out"></i> 退出</a>
        </div>
        <div class="row J_mainContent" id="content-main">
            <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="" frameborder="0"
                    data-id="http://www.baidu.com/" seamless></iframe>
        </div>
        <div class="footer">
            <div class="pull-right">&copy; 2014-2015
                <a href="http://www.zi-han.net/" target="_blank">zihan's blog</a>
            </div>
        </div>
    </div>
    <!--右侧部分结束-->
    <!--右侧边栏开始-->
    <div id="right-sidebar">
        <div class="sidebar-container">
            <ul class="nav nav-tabs navs-3">
                <li class="active">
                    <a data-toggle="tab" href="#tab-1">
                        <i class="fa fa-gear"></i> 主题
                    </a>
                </li>
            </ul>

            <div class="tab-content">
                <div id="tab-1" class="tab-pane active">
                    <div class="sidebar-title">
                        <h3><i class="fa fa-comments-o"></i> 主题设置</h3>
                        <small><i class="fa fa-tim"></i> 你可以从这里选择和预览主题的布局和样式，这些设置会被保存在本地，下次打开的时候会直接应用这些设置。</small>
                    </div>
                    <div class="skin-setttings">
                        <div class="title">主题设置</div>
                        <div class="setings-item">
                            <span>收起左侧菜单</span>
                            <div class="switch">
                                <div class="onoffswitch">
                                    <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox"
                                           id="collapsemenu">
                                    <label class="onoffswitch-label" for="collapsemenu">
                                        <span class="onoffswitch-inner"></span>
                                        <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="setings-item">
                            <span>固定顶部</span>

                            <div class="switch">
                                <div class="onoffswitch">
                                    <input type="checkbox" name="fixednavbar" class="onoffswitch-checkbox"
                                           id="fixednavbar">
                                    <label class="onoffswitch-label" for="fixednavbar">
                                        <span class="onoffswitch-inner"></span>
                                        <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="setings-item">
                                    <span>
                        固定宽度
                    </span>

                            <div class="switch">
                                <div class="onoffswitch">
                                    <input type="checkbox" name="boxedlayout" class="onoffswitch-checkbox"
                                           id="boxedlayout">
                                    <label class="onoffswitch-label" for="boxedlayout">
                                        <span class="onoffswitch-inner"></span>
                                        <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="title">皮肤选择</div>
                        <div class="setings-item default-skin nb">
                                    <span class="skin-name ">
                         <a href="#" class="s-skin-0">
                             默认皮肤
                         </a>
                    </span>
                        </div>
                        <div class="setings-item blue-skin nb">
                                    <span class="skin-name ">
                        <a href="#" class="s-skin-1">
                            蓝色主题
                        </a>
                    </span>
                        </div>
                        <div class="setings-item yellow-skin nb">
                                    <span class="skin-name ">
                        <a href="#" class="s-skin-3">
                            黄色/紫色主题
                        </a>
                    </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


</div>
<script src="/Public/js/jquery.min.js?v=2.1.4"></script>
<script src="/Public/js/bootstrap.min.js?v=3.3.5"></script>
<script src="/Public/js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="/Public/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="/Public/js/plugins/layer/layer.min.js"></script>
<script src="/Public/js/hplus.min.js?v=4.0.0"></script>
<script src="/Public/js/contabs.min.js"></script>
<script src="/Public/js/plugins/pace/pace.min.js"></script>
<script src="/Public/js/home.js"></script>
<script src="/Public/js/my_js_jia.js"></script>


</body>

</html>