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
    $(".search").on("click", function () {
        var page = 1;
        var start =$(".start").val();
        var end = $(".end").val();
        var ip = $(".ip").val();
        var operate = $(".operate").val();
        var admin = "";     //类型
        var controller="Admin/record_page";
        $(".type>.chosen-container>.chosen-choices>.search-choice").each(function () {
            admin += $(this).children().eq(0).text() + ",";
        })
        if (start != '' || ip != '' || operate != '' || admin != ''||end!='') {
            ajax(page,start,end,ip,operate,admin,controller);
        }
    })
    $(".box").on("click", ".border-green", function () {
        $('.alls').remove();
        $('.box').text('');
        var page = $(this).text();
        // var time = $(".start").val() + ',' + $(".end").val();
        var start =$(".start").val();
        var end = $(".end").val();
        var ip = $(".ip").val();
        var operate = $(".operate").val();
        var admin = "";     //类型
        var controller="Admin/record_page";
        $(".type>.chosen-container>.chosen-choices>.search-choice").each(function () {
            admin += $(this).children().eq(0).text() + ",";
        })
        ajax(page,start,end,ip,operate,admin,controller);
    })

    $(".cancel").on("click", function () {
        $(".operate").val('');
        $(".start").val('');
        $(".end").val('');
        $(".ip").val('');
        $(".type>.chosen-container>.chosen-choices>.search-choice").each(function () {
            $(this).removeClass("search-choice-close")
        })
    })

    $(document).on("click", ".daochu", function () {
        var timestamp = (new Date()).valueOf();
        var time = $(".start").val() + ',' + $(".end").val();
        var ip = $(".ip").val();
        var operate = $(".operate").val();
        var admin = "";     //类型
        $(".type>.chosen-container>.chosen-choices>.search-choice").each(function () {
            admin += $(this).children().eq(0).text() + ",";
        })

        if (time == ',' && ip == '' && operate == '' && admin == '') {
            alert("请选择条件");
        } else {
            window.location.href = "Admin/output?time=" + time + "&ip=" + ip + "&operate=" + operate + "&admin=" + admin + "&timestamp=" + timestamp ;
            // window.location.href = "www.baidu.com";
        }
    })
})