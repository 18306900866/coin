/**
 * Created by admin on 2017/6/2.
 */
$(window).load(function () {
    $(document).on("click", ".addthis", function () {
        var f = $(this)
        var val = f.children().eq(0).text()
        var admin = $(".adminname").text()
        var id = $(".adminid").val();
        var power = $(this).val();
        $.post('editpower', {id: id, power: power, state: $(this).text(), admin: admin}, function (data) {
            var list = JSON.parse(data);
            if (list['result'] == 1) {
                if (val == '添加') {
                    f.children().eq(0).text("取消")
                    f.addClass("btn-default").removeClass("btn-danger")
                } else {
                    f.children().eq(0).text("添加")
                    f.addClass("btn-danger").removeClass("btn-default")
                }
            }
        })
    })
    $(document).on("click", ".add", function () {
        var str = '';
        var f = $(this).parent().parent();
        f.find(".addthis").each(function () {
            str += $(this).val() + ","
        });
        var val = $(this).children().eq(0).text()
        var admin = $(".adminname").text()
        var id = $(".adminid").val();
        // if(str==''){
        //     // f.find(".footable-row-detail").find(".footable-row-detail-cell").find("footable-row-detail-inner").find(".footable-row-detail-row").each(function () {
        //     //     str+=$(this).find(".footable-row-detail-value").find(".addthis").val()+',';
        //     // })
        //     f.children().eq(1).children().eq(0).children().eq(0).children().eq(0).each(function () {
        //         str+=$(this).find(".footable-row-detail-row").children().eq(1).children().eq(0).val()+','
        //     })
        // }
        var power=str;
        // alert(power);

        // $.post('editallpower', {id: id, power: power, state: val, admin: admin}, function (data) {
        //     var list = JSON.parse(data);
        //     if (list['result'] == 1) {
        //         if (val == '全部添加') {
        //             f.find(".addthis").each(function () {
        //                 $(this).addClass("btn-default").removeClass("btn-danger")
        //                 $(this).children().eq(0).text("取消")
        //             });
        //         } else {
        //             f.find(".addthis").each(function () {
        //                 $(this).children().eq(0).text("添加")
        //                 $(this).addClass("btn-danger").removeClass("btn-default")
        //             });
        //         }
        //         alert('修改成功')
        //     } else {
        //         alert('无需修改')
        //     }
        // })
    })
})