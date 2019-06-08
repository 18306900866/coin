$(window).load(function () {
    var title;
    var butred=0;
    var upobj='';
    $("body").on("click","thead tr .soc",function(){
        if($(this).find(".sorting_ascss").hasClass("on")){
            $(".table thead tr .soc").each(function(){
                $(this).find(".sorting_ascss").removeClass("on");
                $(this).find(".sorting_ascss").removeClass("tw");
            })
            title="升序/"
            $(this).find(".sorting_ascss").addClass("tw");
        }else{
            $(".table thead tr .soc").each(function(){

                $(this).find(".sorting_ascss").removeClass("on");
                $(this).find(".sorting_ascss").removeClass("tw");
            })
            $(this).find(".sorting_ascss").addClass("on");
            title="降序/"
        }
        title = title + $(this).text();
        console.log(title)
    })
    $("body").on("touchstart","thead tr .soc",function(){
        if($(this).find(".sorting_ascss").hasClass("on")){
            $(".table thead tr .soc").each(function(){
                $(this).find(".sorting_ascss").removeClass("on");
                $(this).find(".sorting_ascss").removeClass("tw");
            })
            title="升序/"
            $(this).find(".sorting_ascss").addClass("tw");
        }else{
            $(".table thead tr .soc").each(function(){

                $(this).find(".sorting_ascss").removeClass("on");
                $(this).find(".sorting_ascss").removeClass("tw");
            })
            $(this).find(".sorting_ascss").addClass("on");
            title="降序/"
        }
        title = title + $(this).text();
        console.log(title)
    })
    $("body").on("click",".cancel",function(){
        $('.search-choice-close').each(function () {$(this).click();})
        $('.num_id').val('');
        $('.orders').val('');
        $('.user_id').val('');
        $('.start').val('');
        $('.end').val('');
        $('.issue').val('');
        $('.play').val('');
        $('.bet_start').val('');
        $('.bet_end').val('');
        $('.win_start').val('');
        $('.win_end').val('');
        $('.dump_to').val('');
        $('.time_start').val('');
        $('.time_end').val('');
    })
    $("body").on("touchstart",".cancel",function(){
        $('.search-choice-close').each(function () {$(this).click();})
        $('.num_id').val('');
        $('.orders').val('');
        $('.user_id').val('');
        $('.start').val('');
        $('.end').val('');
        $('.issue').val('');
        $('.play').val('');
        $('.bet_start').val('');
        $('.bet_end').val('');
        $('.win_start').val('');
        $('.win_end').val('');
        $('.dump_to').val('');
        $('.time_start').val('');
        $('.time_end').val('');
    })

    $("body").on("click",".selects",function(){
        var text=$(this).text();
        var dump=$('.dump_to').val();
        if (text=='跳转' && dump<1){
            alert('请输入正确页码！');
            return false;
        }
        var soc = $('.soc');//.attr('name');
        var type = '';
        var varr = '';
        $.each(soc,function(key,val){
            var $this = $(this);
            var $name = $this.attr('name');
            var $li = $this.find("i").attr('class');
            if($li != 'sorting_ascss'){
                type = $name;
                if($li == 'sorting_ascss tw') varr ='asc';
                if($li == 'sorting_ascss on') varr ='desc';
                return false;
            }
        });
        var order=type+' '+varr;
        //      获取查询条件

        var num_id=$('.num_id').val();
        var orders=$('.orders').val();
        var user_id=$('.user_id').val();
        var start=$('.start').val();
        var end=$('.end').val();
        var issue=$('.issue').val();
        var play=$('.play').val();
        var bet_start=$('.bet_start').val();
        var bet_end=$('.bet_end').val();
        var win_start=$('.win_start').val();
        var win_end=$('.win_end').val();
        var time_start=$('.time_start').val();
        var time_end=$('.time_end').val();
        var cname='';
        var type='';
        $(".cname>.chosen-container>.chosen-choices>.search-choice").each(function () {
            cname += $(this).children().eq(0).text() + ",";
        })
        $(".type>.chosen-container>.chosen-choices>.search-choice").each(function () {
            type += $(this).children().eq(0).text() + ",";
        })

        //      请求参数
        var arr={type:text, order:order, num_id:num_id, orders:orders,
            user_id:user_id, start:start, end:end, issue:issue, play:play,
            bet_start:bet_start,bet_end:bet_end,win_start:win_start,win_end:win_end
            ,cname:cname,result:type,time_start:time_start,time_end:time_end};
        $.ajax({
            url:"select", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                console.log(array);
                var allpage=parseInt(array['allpage']);
                var nowpage=parseInt(array['nowpage']);
                var list=array['list'];
                // 清空原数据
                var sum_all='总投注金额:'+array['allmoney']+'总中奖金额:'+array['winmoney'];
                $('.sum_all').text(sum_all);
                $('.alls').remove();
                $('.left_dibu').text('');
                if (allpage==0){alert('该条件无数据！，请重新搜索');return}
                //      记录显示
                var table = $('.table');
                for (var i = 0; i < list.length; i++) {
                    if (list[i]['conductor']==0){
                        var head = '<tr class="alls multiple"><td><div></div>';
                    }else {
                        var head = '<tr class="alls"><td>已接单';
                    }
                    var tr = '<tr class="alls">'
                        + '<td>' + list[i]['id']
                        + '</td><td>' + list[i]['order']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['time']
                        + '</td><td>' + list[i]['cname']
                        + '</td><td>' + list[i]['issue']
                        + '</td><td>' + list[i]['type']
                        + '</td><td>' + list[i]['rate']
                        + '</td><td>' + list[i]['number']
                        + '</td><td>' + list[i]['price']
                        + '</td><td>' + list[i]['win_bet']
                        + '</td><td>' + list[i]['bets']
                        + '</td><td>' + list[i]['win_money']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['multiple']
                        + '</td><td>' + list[i]['result']
                        + '</td></tr>';
                    table.append(tr);
                }
                //      分页显示
                var box=$('.left_dibu');
                box.append(" <button class='selects button border-blue'>首页</button> ");
                if (allpage<=9){
                    var start=1;
                    var stop=allpage;
                    var strings='';
                    for (var i=start;i<=stop;i++){
                        var button="<button class='selects button border-green'>"+ i +"</button> ";
                        if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                        strings=strings+button;
                    }
                    box.append(strings);
                }else {
                    if ( nowpage-4>0 && nowpage+4<=allpage ){
                        var start=nowpage-4;
                        var stop=nowpage+5;
                        var strings='';
                        for (var i=start;i<stop;i++){
                            var button="<button class='selects button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }else if ( nowpage-4<1 && nowpage+4<=allpage ){
                        var start=1;
                        var stop=9;
                        var strings='';
                        for (var i=start;i<stop && i<=allpage;i++){
                            var button="<button class='selects button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }else if ( nowpage-4>0 && nowpage+4>allpage ){
                        var start=allpage;
                        var stop=allpage-9;
                        var strings='';
                        for (var i=start;i>stop && i>0;i--){
                            var button="<button class='selects button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=button+strings;
                        }
                        box.append(strings);
                    }
                }
                box.append(" <button class='selects button border-blue'>尾页</button> ");
                //      总页数
                var alpage_txt='页数:'+nowpage+'/总页数:'+allpage;
                $('.zongyeshu').html(alpage_txt);
            }
        });

    })
    $("body").on("click",".selectb",function(){
        var text=$(this).text();
        var dump=$('.dump_to').val();
        if (text=='跳转' && dump<1){
            alert('请输入正确页码！');
            return false;
        }
        var soc = $('.soc');//.attr('name');
        var type = '';
        var varr = '';
        $.each(soc,function(key,val){
            var $this = $(this);
            var $name = $this.attr('name');
            var $li = $this.find("i").attr('class');
            if($li != 'sorting_ascss'){
                type = $name;
                if($li == 'sorting_ascss tw') varr ='asc';
                if($li == 'sorting_ascss on') varr ='desc';
                return false;
            }
        });
        var order=type+' '+varr;
        //      获取查询条件

        var num_id=$('.num_id').val();
        var orders=$('.orders').val();
        var user_id=$('.user_id').val();
        var start=$('.start').val();
        var end=$('.end').val();
        var issue=$('.issue').val();
        var play=$('.play').val();
        var bet_start=$('.bet_start').val();
        var bet_end=$('.bet_end').val();
        var win_start=$('.win_start').val();
        var win_end=$('.win_end').val();
        var time_start=$('.time_start').val();
        var time_end=$('.time_end').val();
        var cname='';
        $(".cname>.chosen-container>.chosen-choices>.search-choice").each(function () {
            cname += $(this).children().eq(0).text() + ",";
        })

        //      请求参数
        var arr={type:text, order:order, num_id:num_id, orders:orders,
            user_id:user_id, start:start, end:end, issue:issue, play:play,
            bet_start:bet_start,bet_end:bet_end,win_start:win_start,win_end:win_end
            ,cname:cname,time_start:time_start,time_end:time_end};
        $.ajax({
            url:"selectb", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                // console.log(array);
                var allpage=parseInt(array['allpage']);
                var nowpage=parseInt(array['nowpage']);
                var list=array['list'];
                // 清空原数据
                $('.alls').remove();
                $('.left_dibu').text('');
                if (allpage==0){alert('该条件无数据！，请重新搜索');return}
                //      记录显示
                var table = $('.table');
                for (var i = 0; i < list.length; i++) {
                    if (list[i]['conductor']==0){
                        var head = '<tr class="alls multiple"><td><div></div>';
                    }else {
                        var head = '<tr class="alls"><td>已接单';
                    }
                    var tr = '<tr class="alls">'
                        + '<td>' + list[i]['id']
                        + '</td><td>' + list[i]['order']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['time']
                        + '</td><td><div>' + list[i]['cname']
                        + '</div></td><td>' + list[i]['issue']
                        + '</td><td><div>' + list[i]['type']
                        + '</div></td><td><div>' + list[i]['rate']
                        + '</div></td><td><div>' + list[i]['number']
                        + '</div></td><td><div>' + list[i]['price']
                        + '</div></td><td><div>' + list[i]['win_bet']
                        + '</div></td><td><div>' + list[i]['bets']
                        + '</div></td><td><div>' + list[i]['win_money']
                        + '</div></td><td><div>' + list[i]['money']
                        + '</div></td><td><div>' + list[i]['multiple']
                        + '</div></td><td><button class="btn btn-sm btn-danger">修改</button></td></tr>';
                    table.append(tr);
                }
                //      分页显示
                var box=$('.left_dibu');
                box.append(" <button class='selectb button border-blue'>首页</button> ");
                if (allpage<=9){
                    var start=1;
                    var stop=allpage;
                    var strings='';
                    for (var i=start;i<=stop;i++){
                        var button="<button class='selectb button border-green'>"+ i +"</button> ";
                        if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                        strings=strings+button;
                    }
                    box.append(strings);
                }else {
                    if ( nowpage-4>0 && nowpage+4<=allpage ){
                        var start=nowpage-4;
                        var stop=nowpage+5;
                        var strings='';
                        for (var i=start;i<stop;i++){
                            var button="<button class='selectb button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }else if ( nowpage-4<1 && nowpage+4<=allpage ){
                        var start=1;
                        var stop=9;
                        var strings='';
                        for (var i=start;i<stop && i<=allpage;i++){
                            var button="<button class='selectb button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }else if ( nowpage-4>0 && nowpage+4>allpage ){
                        var start=allpage;
                        var stop=allpage-9;
                        var strings='';
                        for (var i=start;i>stop && i>0;i--){
                            var button="<button class='selectb button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=button+strings;
                        }
                        box.append(strings);
                    }
                }
                box.append(" <button class='selectb button border-blue'>尾页</button> ");
                //      总页数
                var alpage_txt='页数:'+nowpage+'/总页数:'+allpage;
                $('.zongyeshu').html(alpage_txt);
            }
        });

    })

    //修改
    $("body").on("click",".btn-danger",function(){
        if (butred==0){
            upobj=$(this).parent().parent().html();

            var tr=$(this).parent().parent();
            tr.find("div").attr("contenteditable","true");
            tr.find("div").css("border","1px solid gray");
            $(this).parent().html(' <button class="btn btn-sm btn-primary submit">确认</button> <button class="btn btn-sm btn-warning submit">取消</button>');
        }
        butred=1;

    })
    //取消
    $("body").on("click",".btn-warning",function(){
        $(this).parent().parent().html(upobj);
        $(this).parent().html('<button class="btn btn-sm btn-danger">修改</button>');
        butred=0;
    })
    //确认
    $("body").on("click",".submit",function(){
        var tr=$(this).parent().parent();
        var id=tr.children().eq(0).html();
        var cname=tr.children().eq(4).children().eq(0).html();
        var issue=tr.children().eq(5).html();
        var type=tr.children().eq(6).children().eq(0).html();
        var rate=tr.children().eq(7).children().eq(0).html();
        var number=tr.children().eq(8).children().eq(0).html();
        var price=tr.children().eq(9).children().eq(0).html();
        var win_bet=tr.children().eq(10).children().eq(0).html();
        var bets=tr.children().eq(11).children().eq(0).html();
        var win_money=tr.children().eq(12).children().eq(0).html();
        var money=tr.children().eq(13).children().eq(0).html();
        var multiple=tr.children().eq(14).children().eq(0).html();

        var arr={id:id, cname:cname, issue:issue, type:type, rate:rate, number:number, price:price,
            win_bet:win_bet, bets:bets, win_money:win_money,money:money,multiple:multiple};

        $(this).parent().parent().find("div").removeAttr("contenteditable");
        $(this).parent().parent().find("div").css("border","0");
        $(this).parent().html('<button class="btn btn-sm btn-danger">修改</button>');
        butred=0;
        $.ajax({
            url:"sub", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                if (array['result']==0){
                    tr.html(upobj);tr.children().eq(15).html('无法修改');
                }
            }
        })

    })



    $("body").on("touchstart",".selects",function(){
        var text=$(this).text();
        var dump=$('.dump_to').val();
        if (text=='跳转' && dump<1){
            alert('请输入正确页码！');
            return false;
        }
        var soc = $('.soc');//.attr('name');
        var type = '';
        var varr = '';
        $.each(soc,function(key,val){
            var $this = $(this);
            var $name = $this.attr('name');
            var $li = $this.find("i").attr('class');
            if($li != 'sorting_ascss'){
                type = $name;
                if($li == 'sorting_ascss tw') varr ='asc';
                if($li == 'sorting_ascss on') varr ='desc';
                return false;
            }
        });
        var order=type+' '+varr;
        //      获取查询条件

        var num_id=$('.num_id').val();
        var orders=$('.orders').val();
        var user_id=$('.user_id').val();
        var start=$('.start').val();
        var end=$('.end').val();
        var issue=$('.issue').val();
        var play=$('.play').val();
        var bet_start=$('.bet_start').val();
        var bet_end=$('.bet_end').val();
        var win_start=$('.win_start').val();
        var win_end=$('.win_end').val();
        var time_start=$('.time_start').val();
        var time_end=$('.time_end').val();
        var cname='';
        var type='';
        $(".cname>.chosen-container>.chosen-choices>.search-choice").each(function () {
            cname += $(this).children().eq(0).text() + ",";
        })
        $(".type>.chosen-container>.chosen-choices>.search-choice").each(function () {
            type += $(this).children().eq(0).text() + ",";
        })

        //      请求参数
        var arr={type:text, order:order, num_id:num_id, orders:orders,
            user_id:user_id, start:start, end:end, issue:issue, play:play,
            bet_start:bet_start,bet_end:bet_end,win_start:win_start,win_end:win_end
            ,cname:cname,result:type,time_start:time_start,time_end:time_end};
        $.ajax({
            url:"select", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                console.log(array);
                var allpage=parseInt(array['allpage']);
                var nowpage=parseInt(array['nowpage']);
                var list=array['list'];
                // 清空原数据
                var sum_all='总投注金额:'+array['allmoney']+'总中奖金额:'+array['winmoney'];
                $('.sum_all').text(sum_all);
                $('.alls').remove();
                $('.left_dibu').text('');
                if (allpage==0){alert('该条件无数据！，请重新搜索');return}
                //      记录显示
                var table = $('.table');
                for (var i = 0; i < list.length; i++) {
                    if (list[i]['conductor']==0){
                        var head = '<tr class="alls multiple"><td><div></div>';
                    }else {
                        var head = '<tr class="alls"><td>已接单';
                    }
                    var tr = '<tr class="alls">'
                        + '<td>' + list[i]['id']
                        + '</td><td>' + list[i]['order']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['time']
                        + '</td><td>' + list[i]['cname']
                        + '</td><td>' + list[i]['issue']
                        + '</td><td>' + list[i]['type']
                        + '</td><td>' + list[i]['rate']
                        + '</td><td>' + list[i]['number']
                        + '</td><td>' + list[i]['price']
                        + '</td><td>' + list[i]['win_bet']
                        + '</td><td>' + list[i]['bets']
                        + '</td><td>' + list[i]['win_money']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['multiple']
                        + '</td><td>' + list[i]['result']
                        + '</td></tr>';
                    table.append(tr);
                }
                //      分页显示
                var box=$('.left_dibu');
                box.append(" <button class='selects button border-blue'>首页</button> ");
                if (allpage<=9){
                    var start=1;
                    var stop=allpage;
                    var strings='';
                    for (var i=start;i<=stop;i++){
                        var button="<button class='selects button border-green'>"+ i +"</button> ";
                        if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                        strings=strings+button;
                    }
                    box.append(strings);
                }else {
                    if ( nowpage-4>0 && nowpage+4<=allpage ){
                        var start=nowpage-4;
                        var stop=nowpage+5;
                        var strings='';
                        for (var i=start;i<stop;i++){
                            var button="<button class='selects button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }else if ( nowpage-4<1 && nowpage+4<=allpage ){
                        var start=1;
                        var stop=9;
                        var strings='';
                        for (var i=start;i<stop && i<=allpage;i++){
                            var button="<button class='selects button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }else if ( nowpage-4>0 && nowpage+4>allpage ){
                        var start=allpage;
                        var stop=allpage-9;
                        var strings='';
                        for (var i=start;i>stop && i>0;i--){
                            var button="<button class='selects button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=button+strings;
                        }
                        box.append(strings);
                    }
                }
                box.append(" <button class='selects button border-blue'>尾页</button> ");
                //      总页数
                var alpage_txt='页数:'+nowpage+'/总页数:'+allpage;
                $('.zongyeshu').html(alpage_txt);
            }
        });

    })
    $("body").on("touchstart",".selectb",function(){
        var text=$(this).text();
        var dump=$('.dump_to').val();
        if (text=='跳转' && dump<1){
            alert('请输入正确页码！');
            return false;
        }
        var soc = $('.soc');//.attr('name');
        var type = '';
        var varr = '';
        $.each(soc,function(key,val){
            var $this = $(this);
            var $name = $this.attr('name');
            var $li = $this.find("i").attr('class');
            if($li != 'sorting_ascss'){
                type = $name;
                if($li == 'sorting_ascss tw') varr ='asc';
                if($li == 'sorting_ascss on') varr ='desc';
                return false;
            }
        });
        var order=type+' '+varr;
        //      获取查询条件

        var num_id=$('.num_id').val();
        var orders=$('.orders').val();
        var user_id=$('.user_id').val();
        var start=$('.start').val();
        var end=$('.end').val();
        var issue=$('.issue').val();
        var play=$('.play').val();
        var bet_start=$('.bet_start').val();
        var bet_end=$('.bet_end').val();
        var win_start=$('.win_start').val();
        var win_end=$('.win_end').val();
        var time_start=$('.time_start').val();
        var time_end=$('.time_end').val();
        var cname='';
        $(".cname>.chosen-container>.chosen-choices>.search-choice").each(function () {
            cname += $(this).children().eq(0).text() + ",";
        })

        //      请求参数
        var arr={type:text, order:order, num_id:num_id, orders:orders,
            user_id:user_id, start:start, end:end, issue:issue, play:play,
            bet_start:bet_start,bet_end:bet_end,win_start:win_start,win_end:win_end
            ,cname:cname,time_start:time_start,time_end:time_end};
        $.ajax({
            url:"selectb", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                // console.log(array);
                var allpage=parseInt(array['allpage']);
                var nowpage=parseInt(array['nowpage']);
                var list=array['list'];
                // 清空原数据
                $('.alls').remove();
                $('.left_dibu').text('');
                if (allpage==0){alert('该条件无数据！，请重新搜索');return}
                //      记录显示
                var table = $('.table');
                for (var i = 0; i < list.length; i++) {
                    if (list[i]['conductor']==0){
                        var head = '<tr class="alls multiple"><td><div></div>';
                    }else {
                        var head = '<tr class="alls"><td>已接单';
                    }
                    var tr = '<tr class="alls">'
                        + '<td>' + list[i]['id']
                        + '</td><td>' + list[i]['order']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['time']
                        + '</td><td><div>' + list[i]['cname']
                        + '</div></td><td>' + list[i]['issue']
                        + '</td><td><div>' + list[i]['type']
                        + '</div></td><td><div>' + list[i]['rate']
                        + '</div></td><td><div>' + list[i]['number']
                        + '</div></td><td><div>' + list[i]['price']
                        + '</div></td><td><div>' + list[i]['win_bet']
                        + '</div></td><td><div>' + list[i]['bets']
                        + '</div></td><td><div>' + list[i]['win_money']
                        + '</div></td><td><div>' + list[i]['money']
                        + '</div></td><td><div>' + list[i]['multiple']
                        + '</div></td><td><button class="btn btn-sm btn-danger">修改</button></td></tr>';
                    table.append(tr);
                }
                //      分页显示
                var box=$('.left_dibu');
                box.append(" <button class='selectb button border-blue'>首页</button> ");
                if (allpage<=9){
                    var start=1;
                    var stop=allpage;
                    var strings='';
                    for (var i=start;i<=stop;i++){
                        var button="<button class='selectb button border-green'>"+ i +"</button> ";
                        if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                        strings=strings+button;
                    }
                    box.append(strings);
                }else {
                    if ( nowpage-4>0 && nowpage+4<=allpage ){
                        var start=nowpage-4;
                        var stop=nowpage+5;
                        var strings='';
                        for (var i=start;i<stop;i++){
                            var button="<button class='selectb button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }else if ( nowpage-4<1 && nowpage+4<=allpage ){
                        var start=1;
                        var stop=9;
                        var strings='';
                        for (var i=start;i<stop && i<=allpage;i++){
                            var button="<button class='selectb button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }else if ( nowpage-4>0 && nowpage+4>allpage ){
                        var start=allpage;
                        var stop=allpage-9;
                        var strings='';
                        for (var i=start;i>stop && i>0;i--){
                            var button="<button class='selectb button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=button+strings;
                        }
                        box.append(strings);
                    }
                }
                box.append(" <button class='selectb button border-blue'>尾页</button> ");
                //      总页数
                var alpage_txt='页数:'+nowpage+'/总页数:'+allpage;
                $('.zongyeshu').html(alpage_txt);
            }
        });

    })

    //修改
    $("body").on("touchstart",".btn-danger",function(){
        if (butred==0){
            upobj=$(this).parent().parent().html();

            var tr=$(this).parent().parent();
            tr.find("div").attr("contenteditable","true");
            tr.find("div").css("border","1px solid gray");
            $(this).parent().html(' <button class="btn btn-sm btn-primary submit">确认</button> <button class="btn btn-sm btn-warning submit">取消</button>');
        }
        butred=1;

    })
    //取消
    $("body").on("touchstart",".btn-warning",function(){
        $(this).parent().parent().html(upobj);
        $(this).parent().html('<button class="btn btn-sm btn-danger">修改</button>');
        butred=0;
    })
    //确认
    $("body").on("touchstart",".submit",function(){
        var tr=$(this).parent().parent();
        var id=tr.children().eq(0).html();
        var cname=tr.children().eq(4).children().eq(0).html();
        var issue=tr.children().eq(5).html();
        var type=tr.children().eq(6).children().eq(0).html();
        var rate=tr.children().eq(7).children().eq(0).html();
        var number=tr.children().eq(8).children().eq(0).html();
        var price=tr.children().eq(9).children().eq(0).html();
        var win_bet=tr.children().eq(10).children().eq(0).html();
        var bets=tr.children().eq(11).children().eq(0).html();
        var win_money=tr.children().eq(12).children().eq(0).html();
        var money=tr.children().eq(13).children().eq(0).html();
        var multiple=tr.children().eq(14).children().eq(0).html();

        var arr={id:id, cname:cname, issue:issue, type:type, rate:rate, number:number, price:price,
            win_bet:win_bet, bets:bets, win_money:win_money,money:money,multiple:multiple};

        $(this).parent().parent().find("div").removeAttr("contenteditable");
        $(this).parent().parent().find("div").css("border","0");
        $(this).parent().html('<button class="btn btn-sm btn-danger">修改</button>');
        butred=0;
        $.ajax({
            url:"sub", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                if (array['result']==0){
                    tr.html(upobj);tr.children().eq(15).html('无法修改');
                }
            }
        })

    })

})







