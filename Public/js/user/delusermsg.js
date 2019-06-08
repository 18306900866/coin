$(document).ready(function () {
    $(".add_but").on("click",function () {
        var text="";
        $("input[type=checkbox]").each(function() {
            if ($(this).prop("checked")) {
                text += $(this).val()+",";
            }
        });
        var uid=$(".uid").val();
        if(text==''){
            alert('请选择要删除的类型')
        }else{
            if(uid==''){
                alert("请选择要删除的用户ID")
            }else{
                var arr={tables:text,uid:uid}
                $.ajax({
                    url: "/UserCenter/delrecord", method: "post",
                    async: "true", data: arr, timeout: 5000, dataType: "json",
                    success: function (res) {
                        alert(res.msg);
                        if(res.code=='0'){
                            $(".uid").val('');
                        }
                    },
                    error:function(){
                        alert('操作失败');
                    }
                });
            }
        }
    })
})