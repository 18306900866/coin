/**
 * Created by admin on 2017/6/2.
 */
$(window).load(function () {
    $(document).on("click", ".area", function () {
        var f = $(this)
        var area = $(".area").val()
        $.post('areasearch', {area: area}, function (data) {
            var list = JSON.parse(data);
            var table = $('.table');
            $('.upbody').remove();
            for (var i=0; i < list.length; i++) {
                var tr='<tr class="upbody"><td>'+list[i]['cname']+'</td><td>'+list[i]['bet']+'</td><td>'+list[i]['win']+'</td></tr>';
                table.append(tr);
            }
        })
    })
})