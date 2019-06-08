/**
 * Created by admin on 2017/12/13.
 */
// touchstart
$("body").on("click",".submit",function(){
    var text=$(this).html();
    var order=$(this).parent().parent().children().eq(1).html();
    var box=$(this).parent();
    var arr={order:order,type:'pay',text:text};
    $.ajax({
        url:"action", method: "post",
        async: "true", data:arr, timeout: 5000, dataType: "json",
        success: function (data){
            box.html('操作成功');
        }
    })
})
$("body").on("click",".submit_bank",function(){
    var text=$(this).html();
    var order=$(this).parent().parent().children().eq(0).html();
    var box=$(this).parent();
    var arr={order:order,type:'bank',text:text};
    $.ajax({
        url:"action", method: "post",
        async: "true", data:arr, timeout: 5000, dataType: "json",
        success: function (data){
            box.html('操作成功');
        }
    })
})