/**
 * Created by admin on 2017/6/2.
 */
$(window).load(function () {
    $(document).on("click", ".sub", function () {
        var password = $(".psw").val()
        var oldpassword = $(".opsw").val()
        var con = $(".confim").val()
        if(password==''||oldpassword==''||con==''){
            alert("请完善信息")
        }else{
            if(con!=password){
                alert('两次密码不正确')
            }else{
                if(oldpassword==password){
                    alert("与旧密码相同")
                }else{
                    $.post('change', {oldpassword: oldpassword,password:password}, function (data) {
                        var list = JSON.parse(data);
                        if(list['result']==1){
                            alert('旧密码不正确')
                        }else{
                            alert("修改成功");
                        }
                    })
                }
            }
        }

    })
})