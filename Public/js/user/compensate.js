$(document).ready(function () {
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        //时间选择器
        laydate.render({
            elem: '#time1'
            ,type: 'datetime'
        });
        laydate.render({
            elem: '#time2'
            ,type: 'datetime'
        });
    })
    $(".add_but").on("click",function () {
        var time1=$(".time1").val();
        var time2=$(".time2").val();
        var type=$(".type").val();
        var fd=$(".fd").val();
        var money=$(".money").val();
        if(time1==''){
            alert('请输入起始时间');
        }else{
            if(time2==''){
                alert('请输入终止时间');
            }else{
                if(type==''){
                    alert('请输入补偿类型');
                }else{
                    if(fd==''){
                        alert('请输入返点比例')
                    }else{
                        if(isNaN(fd)==true){
                            alert('请输入数字');
                        }else{
                            if(fd>100||fd<0){
                                alert('返点介于0~100之间')
                            }else {
                                if(money==''){
                                    alert('请输入最低金额')
                                }else{
                                    if(isNaN(money)==true){
                                        alert('请输入数字');
                                    }else{
                                        var arr={start:time1,end:time2,type:type,fd:fd,money:money}
                                        $.ajax({
                                            url: "/UserCenter/buchang", method: "post",
                                            async: "true", data: arr, timeout: 5000, dataType: "json",
                                            success: function (res) {
                                                alert(res.msg);
                                                $(".time1").val('');
                                                $(".time2").val('');
                                                $(".type").val('');
                                                $(".fd").val('');
                                                $(".money").val('');
                                            },
                                            error:function(){
                                                alert('添加失败');
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
})