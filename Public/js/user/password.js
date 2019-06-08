$(document).ready(function () {
    $(".cancel").click(function () {
        var Tel=$(".Tel").val('');
    })
    $(".confirm").click(function () {
        if($(".Tel").val()==''){
            alert('请输入要重置的账户');
            return;
        }
        if($('#dlpwd').is(':checked')==false&&$('#txpwd').is(':checked')==false){
            alert('请至少选择一种重置类型');
        }else{
            var con= confirm('确认修改？');
            if(con==true){
                if($('#dlpwd').is(':checked')==true){
                    var newpassword = $(".np").val();
                }else {
                    var newpassword = '';
                }
                if($('#txpwd').is(':checked')==true){
                    var newtxpwd = $(".np").val();
                }else {
                    var newtxpwd = '';
                }
                var obj={'Tel':$(".Tel").val(),'newpassword':newpassword,'newtxpwd':newtxpwd};
                $.ajax({
                    url: "/UserCenter/updatepwd",
                    method: "post", async: "true", data: obj,
                    timeout: 5000, dataType: "json",
                    success: function (res) {
                        alert(res.msg);
                    }
                });
            }else{
                alert('修改取消');
                $(".Tel").val('');
            }
        }
    })
})