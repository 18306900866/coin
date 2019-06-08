/**
 * Created by admin on 2017/6/2.
 */
$(window).load(function () {
    $(document).on("click",".checks_re",function () {
        var year = $(this).parent().children().eq(1).val();
        var month = $(this).parent().children().eq(2).val();
        var day = $(this).parent().children().eq(3).val();
        var time=year+"-"+month+'-'+day;
        $.post('timeajax', {time: time,type:"recharge"}, function (data) {
            var list = JSON.parse(data);
            $(".rec").remove();
            var table=$(".table_rec");
            for(var i=0;i<list.length;i++){
                var tr="<tr class='rec'><td>"+list[i]['cname']+"</td><td>"+list[i]['time']+"</td><td>"+list[i]['money']+"</td></tr>";
                table.append(tr)
            }
        })
    })
    $(document).on("click",".checks_bet",function () {
        var year = $(this).parent().children().eq(1).val();
        var month = $(this).parent().children().eq(2).val();
        var day = $(this).parent().children().eq(3).val();
        var time=year+"-"+month+'-'+day;
        $.post('timeajax', {time: time,type:"bet"}, function (data) {
            var list = JSON.parse(data);
            $(".bet").remove();
            var table=$(".table_bet");
            for(var i=0;i<list.length;i++){
                if(list[i]['state']=='平衡'){
                    var state='<td><span class="label label-success">'+list[i]['state']+'</span>';
                }else if(list[i]['state']=='盈利'){
                    var state='<td><span class="label label-primary">'+list[i]['state']+'</span>';
                }else{
                    var state='<td><span class="label label-warning">'+list[i]['state']+'</span>'
                }
                var tr="<tr class='bet'><td>"+list[i]['cname']+"</td><td>"+list[i]['time']+"</td><td>"+list[i]['bet']+"</td><td>"+list[i]['price']+"</td><td>"+state+"</td></tr>";
                table.append(tr)
            }
            // var tr="<tr class='gradeU userdaily'><td>"+list['num']+"</td><td>"+list['bet']+"</td><td>"+list['price']+"</td><td class='center'>"+list['recharge']+"</td><td class='center'>"+list['tixian']+"</td><td class='center'>"+list['yue']+"</td></tr>"

        })
    })
    $(document).on("click",".checks_user",function () {
        var year = $(this).parent().children().eq(1).val();
        var month = $(this).parent().children().eq(2).val();
        var day = $(this).parent().children().eq(3).val();
        var time=year+"-"+month+'-'+day;
        $.post('timeajax', {time: time,type:"user"}, function (data) {
            var list = JSON.parse(data);
            $(".userdaily").remove();
            var table=$(".table_user");
            var tr="<tr class='gradeU userdaily'><td>"+list['num']+"</td><td>"+list['bet']+"</td><td>"+list['price']+"</td><td class='center'>"+list['recharge']+"</td><td class='center'>"+list['tixian']+"</td><td class='center'>"+list['yue']+"</td></tr>"
            table.append(tr)
        })
    })
    $(document).on("click",".checks_day",function () {
        var year = $(this).parent().children().eq(1).val();
        var month = $(this).parent().children().eq(2).val();
        var day = $(this).parent().children().eq(3).val();
        var time=year+"-"+month+'-'+day;
        $.post('timeajax', {time: time,type:"day"}, function (data) {
            var list = JSON.parse(data);
            $(".daily").remove();
            var table=$(".table_daily");
            var tr="<tr class='gradeU daily'><td>"+list['total']+"</td><td>"+list['xiaoe']+"</td><td>"+list['xianxia']+"</td><td class='center'>"+list['tixian']+"</td><td class='center'>"+list['yingli']+"</td></tr>"
            table.append(tr)
        })
    })
    $(document).on("click",".check_month",function () {
        var year = $(this).parent().children().eq(1).val();
        var month = $(this).parent().children().eq(2).val();
        var time=year+"-"+month;
        $.post('timeajax', {time: time,type:"month"}, function (data) {
            var list = JSON.parse(data);
            $(".month").remove();
            var table=$(".table_month");
            var tr="<tr class='gradeU month'><td>"+list['total']+"</td><td>"+list['xiaoe']+"</td><td>"+list['xianxia']+"</td><td class='center'>"+list['tixian']+"</td><td class='center'>"+list['yingli']+"</td></tr>"
            table.append(tr)
        })
    })
})