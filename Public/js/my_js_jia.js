$(function () {
    $('.select_top_nav').bind("change", function () {
        var cname = $(".select").find("option:selected").text();
        var val = $(".select").find("option:selected").val();
        // alert('A:'+cname+',B:'+val)
        $.post('Home/bet', {cname: cname,val:val}, function (data) {
            var list = JSON.parse(data);
            // alert(list['money'])
            $('.czbet').text(list['money']);
        })
    })

})

function show_money() {
    if ($(".jp_nav_top").hasClass("on")) {
        $(".jp_nav_top").removeClass("on");
    } else {
        $(".jp_nav_top").addClass("on");
    }
}