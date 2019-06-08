/**
 * Created by Administrator on 2017/3/17.
 */
function verify() {
    $(".verify").attr("src", "Login/verify");
}
function login() {
    var name=$('.userName').val();
    var pwd=$('.pwd').val();
    var yzm=$('.verifys').val();
    // alert()
    if(name==''||name=='请输入用户名'||pwd==''||pwd=='请输入密码'){
        alert('请输入账号密码！');
        verify();
    }else {
        if(yzm==''||yzm=='请输入验证码'){
            alert('请输入验证码！');
            verify();
        }else{
            var obj={name:name,pwd:pwd,verify:yzm};
            $.ajax({
                url: "Login/Ajax", method: "post", async: "true",
                data: obj, timeout: 50000, dataType: "json",
                success: function (data) {
                    var list=eval(data);
                    if(list['result']=='0'){
                        alert('验证码错误！');
                        verify();
                    }else if(list['result']=='1'){
                        alert('账号或密码错误！');
                        verify();
                    }else if(list['result']=='2'){
                        $(window).attr('location','./Home');
                        verify();
                    }else{
                        alert('ip位置错误！');
                        verify();
                    }
                }
            });
        }
    }
}
