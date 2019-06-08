$(window).load(function () {
    $(document).on("click",".gt",function () {
        var state=$(".state")
        var f=$(this)
        var d=$(".lt")
        // alert(f.children().eq(0).text())
        if(f.hasClass("btn-danger")){
            alert("无需修改")
        }else{
            $.post('editrate', {type: "lt"}, function (data) {
                var list = JSON.parse(data);
                if (list['result'] == '修改成功') {
                    state.text("当前状态:今日输赢小于0返还")
                    f.addClass("btn-success").removeClass("btn-danger")
                    d.addClass("btn-danger").removeClass("btn-success")
                }
            })
        }
    })
    $(document).on("click",".lt",function () {
        var state=$(".state")
        var f=$(this)
        var d=$(".gt")
        // alert(f.children().eq(0).text())
        if(f.hasClass("btn-danger")){
            alert("无需修改")
        }else{
            $.post('editrate', {type: "gt"}, function (data) {
                var list = JSON.parse(data);
                if (list['result'] == '修改成功') {
                    state.text("当前状态:今日输赢大于0返还")
                    f.addClass("btn-success").removeClass("btn-danger")
                    d.addClass("btn-danger").removeClass("btn-success")
                }
            })
        }
    })
})