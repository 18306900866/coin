<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" type="text/css" href="/Public/css/login.css">
    <title>后台管理系统</title>
</head>
<body>
<div id="a">
    <div id="a1">
    </div>
    <div id="a2">
        <h3 style="margin-left: 35%">后台登录界面</h3>
    </div>
    <div id="a3">
        <input id="name" class="in userName" type="text" value="请输入用户名"
               onblur="if(this.value==''){this.value='请输入用户名'}" onfocus="if(this.value=='请输入用户名'){this.value=''}"/>
    </div>
    <div id="a4">
        <input id="pwd" class="in pwd" type="text" value="请输入密码"
               onblur="if(this.value==''){this.value='请输入密码';this.type='text';}"
               onfocus="if(this.value=='请输入密码'){this.value=''}{this.type='password'}"/>
    </div>
    <div id="a6">
        <ul>
            <li class="li1"><img class="verify"  src="Login/verify" onclick="return verify()"
                     title="点击刷新验证码"/></li>
            <li class="li2"><input type="text" class="in verifys" value="请输入验证码"
                       onblur="if(this.value==''){this.value='请输入验证码'}"
                       onfocus="if(this.value=='请输入验证码'){this.value=''}"/></li>
        </ul>
    </div>
    <div id="a5">
        <input class="inn" type="button" value="登陆" Onclick="return login()" />
    </div>
</div>
</body>
<script src="/Public/js/jquery-2.1.0.js"></script>
<script type="text/javascript" src="/Public/js/login.js"></script>
<script type="text/javascript">
    (function(){
        var $i=$('body');
        $i.keyup(function(e){
            if(e.keyCode == 13){
                login();
            }
        });
    })();
</script>
</html>