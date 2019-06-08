/**
 * Created by admin on 2017/6/2.
 */
$(window).load(function () {
    $(document).on("click", ".fenghao", function () {
        // $(".fenghao").on("click", function () {
        var f = $(this);
        var id = $(this).parent().parent().children().eq(0).text();
        var admin = $(this).parent().parent().children().eq(1).text();
        if (confirm("确定停用"+admin+"账号?")) {
            $.post('editadmin', {id: id, admin: admin, state: 0}, function (data) {
                var list = JSON.parse(data);
                if (list['result'] == '修改成功') {
                    f.parent().parent().children().eq(10).text("封号");
                    f.addClass("btn-primary").removeClass("btn-danger")
                    f.addClass("jiefeng").removeClass("fenghao")
                    f.children().eq(0).text("解封");
                }
                alert(list['result'])
            })
        }
    })
    $(document).on("click", ".jiefeng", function () {
        // $(".jiefeng").on("click", function () {
        var f = $(this);
        var id = $(this).parent().parent().children().eq(0).text();
        var admin = $(this).parent().parent().children().eq(1).text();
        if (confirm("确定恢复"+admin+"账号?")) {
            $.post('editadmin', {id: id, admin: admin, state: 1}, function (data) {
                var list = JSON.parse(data);
                if (list['result'] == '修改成功') {
                    f.parent().parent().children().eq(10).text("解封");
                    f.addClass("btn-danger").removeClass("btn-primary")
                    f.addClass("fenghao").removeClass("jiefeng")
                    f.children().eq(0).text("封号");
                }
                alert(list['result'])
            })
        }
    })
    $(document).on("click",".change",function () {
        var f=$(this);
        var id = $(this).parent().parent().children().eq(0).text();
        var admin = $(this).parent().parent().children().eq(1).text();
        if(confirm("确定重置"+admin+"的密码?")){
            $.post('changeadminpassword', {id: id, admin: admin}, function (data) {
                var list = JSON.parse(data);
                alert(list['result'])
            })
        }
    })
    $(document).on("click", ".record", function () {
        var admin=$(this).parent().parent().children().eq(1).text();
        window.location.href="self_record?name="+admin;
    })
    $(document).on("click",".add_but",function () {
        var newadmin=$(".account").val();
        var psw=$(".password1").val();
        var npsw=$(".password2").val();
        if(newadmin!==''&&psw!==''&&npsw!==''){
            if(psw==npsw){
                var adminpsd = prompt("请输入超级管理员密码:");
                var arr={'admin':newadmin,'psw':psw,'comfigpsw':adminpsd};
                $.ajax({
                    url: "add",
                    method: "post", async: "true", data: arr,
                    timeout: 5000, dataType: "json",
                    success: function (data) {
                        var list=eval(data)
                        if(list['result']==0){
                            alert('管理员密码错误')
                        }else if(list['result']==2){
                            alert('该账号已存在');
                        }else if(list['result']==1){
                            alert('添加成功');
                        }
                    }
                })
            }else{
                alert("两次密码不同!");
            }
        }else{
            alert("请完善数据");
        }
    })
    $(document).on("click",".power",function () {
        var admin=$(this).parent().parent().children().eq(1).text();
        var id=$(this).parent().parent().children().eq(0).text();
        window.location.href = "admin_power?admin="+admin+"&id="+id;
    })
    $(document).on("click",".delete",function () {
        var f=$(this).parent().parent();
        var id = f.children().eq(0).text();
        var admin=f.children().eq(1).text();
        // alert(id)
        if(confirm("确认删除改管理员?")){
            $.post('deleteadmin', {id: id,admin:admin}, function (data) {
                var list = JSON.parse(data);
                f.remove();
                alert(list['r']);
            })
        }
    })
})