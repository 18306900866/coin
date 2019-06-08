/**
 * Created by admin on 2017/6/2.
 */
$(window).load(function () {
    function ajax(page,start,end,ip,operate,admin,controller) {
        var arr = {'page': page, "start": start, "ip": ip, "operate": operate, "admin": admin,'end':end};
        $.ajax({
            url: controller, method: "post",
            async: "true", data: arr, timeout: 5000, dataType: "json",
            success: function (data) {
                $('.alls').remove();
                $('.box').text('');
                var list = eval(data);
                var max = list[0]['count'];
                if (max == 0) return;
                var table = $('.table');
                for (var i = 0; i < list.length; i++) {
                    var tr = '<tr class="alls"><td>' + list[i]['id'] + '</td><td>' + list[i]['adminid'] + '</td><td>' + list[i]['admin'] + '</td>' +
                        '<td>' + list[i]['type'] + '</td><td>' + list[i]['time'] + '</td><td>' + list[i]['device'] + '</td><td>' + list[i]['area'] + '</td><td>' + list[i]['ip'] + '</td><td>' + list[i]['operate'] + '</td></tr>';
                    table.append(tr);
                }
                var max = list[0]['count'];
                if (page == '首页') page = 1;
                if (page == '尾页') page = max;
                var now = page;
                now = parseInt(now);
                max = parseInt(max);
                $('.allpage').text(max);
                $('.nowpage').text(page);
                if (now > 5 && max > 9) {
                    if (now > max - 4) {
                        if (now != max) var last = '<button class="button border-blue">尾页</button>';
                        $('.box').append(last);
                        for (var i = max; i > max - 9; i--) {
                            if (i == now) {
                                var but = '<button class="button border-blue">' + i + '</button>';
                            } else {
                                var but = '<button class="button border-green">' + i + '</button>';
                            }
                            $('.box').prepend(but);
                        }
                        var no1 = '<button class="button border-blue">首页</button>';
                        $('.box').prepend(no1);
                    } else {
                        var no1 = '<button class="button border-blue">首页</button>';
                        $('.box').prepend(no1);
                        var big = now + 5;
                        for (var i = now - 4; i < big; i++) {
                            if (i == now) {
                                var but = '<button class="button border-blue">' + i + '</button>';
                            } else {
                                var but = '<button class="button border-green">' + i + '</button>';
                            }
                            $('.box').append(but);
                        }
                        var end = '<button class="button border-blue">尾页</button>';
                        $('.box').append(end);
                    }
                } else {
                    if (now > 1) {
                        var b1 = '<button class="button border-blue">首页</button>';
                        $('.box').append(b1);
                    }
                    for (var i = 0; i < max && i < 9; i++) {
                        var b = parseInt(i) + 1;
                        if (b == now) {
                            var but = '<button class="button border-blue">' + b + '</button>';
                        } else {
                            var but = '<button class="button border-green">' + b + '</button>';
                        }
                        $('.box').append(but);
                    }
                    if (now < max) {
                        var last = '<button class="button border-blue">尾页</button>';
                        $('.box').append(last);
                    }
                }
            }
        })
    }

    $(document).on("click",".switch",function () {
        if($(this).hasClass("btn-success")){
        //    可修改
            var model=$(this).text();
            var name=$(this).parent().parent().children().eq(1).text()
            $.ajax({
                url: "switajax", method: "post",
                async: "true", data: arr, timeout: 5000, dataType: "json",
                success: function (data) {


                }
            })
        }
    })
})