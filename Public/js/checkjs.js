$(window).load(function () {

    var title;
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
        $('.bank_card').val('');
        $('.start').val('');
        $('.end').val('');
        $('.money_start').val('');
        $('.money_end').val('');
        $('.uid').val('');
        $('.bank_u').val('');
    })
    $("body").on("touchstart",".cancel",function(){
        $('.bank_card').val('');
        $('.start').val('');
        $('.end').val('');
        $('.money_start').val('');
        $('.money_end').val('');
        $('.uid').val('');
        $('.bank_u').val('');
    })
    $("body").on("click",".multiple",function(){
        $(this).attr("class", "alls multiple2");
    })
    $("body").on("touchstart",".multiple",function(){
        $(this).attr("class", "alls multiple2");
    })
    $("body").on("click",".multiple2",function(){
        $(this).attr("class", "alls multiple");
    })
    $("body").on("touchstart",".multiple2",function(){
        $(this).attr("class", "alls multiple");
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
        var bank_card=$('.bank_card').val();
        var start=$('.start').val();
        var end=$('.end').val();
        var money_start=$('.money_start').val();
        var money_end=$('.money_end').val();
        var uid=$('.uid').val();
        var bank_u=$('.bank_u').val();
        var time_start=$('.time_start').val();
        var time_end=$('.time_end').val();
        //      请求参数
        var arr={type:text, orders:order, bank_u:bank_card, start:start, end:end, min:money_start,
            max:money_end, uid:uid, bank_a:bank_u, dump:dump, time_start:time_start, time_end:time_end};
        $.ajax({
            url:"pays", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                console.log(array);
                var allpage=array['allpage'];
                var nowpage=array['nowpage'];
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
                    var tr = head
                        + '</td><td>' + list[i]['id']
                        + '</td><td>' + list[i]['order']
                        + '</td><td>' + list[i]['number']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['time']
                        + '</td><td>' + list[i]['account']
                        + '</td><td>' + list[i]['name']
                        + '</td><td>' + list[i]['bank']
                        + '</td><td>' + list[i]['type']
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
                    }
                    if ( nowpage-4<1 && nowpage+4<=allpage ){
                        var start=1;
                        var stop=9;
                        var strings='';
                        for (var i=start;i<stop && i<=allpage;i++){
                            var button="<button class='selects button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }
                    if ( nowpage-4>0 && nowpage+4>allpage ){
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
    $("body").on("click",".btn-danger",function(){
        var array=[];
        $(".multiple2").each(function(){
            var obj=$(this).children().eq(1).html();
            $(this).children().eq(0).html('已接单');
            $(this).attr("class", "alls");
            array.push(obj);
        })
        if (array.length == 0) return
        var arr={order:array};
        $.ajax({
            url:"submmit", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                alert(array['num']);
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
        var bank_card=$('.bank_card').val();
        var start=$('.start').val();
        var end=$('.end').val();
        var money_start=$('.money_start').val();
        var money_end=$('.money_end').val();
        var uid=$('.uid').val();
        var bank_u=$('.bank_u').val();
        var time_start=$('.time_start').val();
        var time_end=$('.time_end').val();
        //      请求参数
        var arr={type:text, orders:order, bank_u:bank_card, start:start, end:end, min:money_start,
            max:money_end, uid:uid, bank_a:bank_u, dump:dump, time_start:time_start, time_end:time_end};
        $.ajax({
            url:"pays", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                console.log(array);
                var allpage=array['allpage'];
                var nowpage=array['nowpage'];
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
                    var tr = head
                        + '</td><td>' + list[i]['id']
                        + '</td><td>' + list[i]['order']
                        + '</td><td>' + list[i]['number']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['time']
                        + '</td><td>' + list[i]['account']
                        + '</td><td>' + list[i]['name']
                        + '</td><td>' + list[i]['bank']
                        + '</td><td>' + list[i]['type']
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
                    }
                    if ( nowpage-4<1 && nowpage+4<=allpage ){
                        var start=1;
                        var stop=9;
                        var strings='';
                        for (var i=start;i<stop && i<=allpage;i++){
                            var button="<button class='selects button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=strings+button;
                        }
                        box.append(strings);
                    }
                    if ( nowpage-4>0 && nowpage+4>allpage ){
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
    $("body").on("touchstart",".btn-danger",function(){
        var array=[];
        $(".multiple2").each(function(){
            var obj=$(this).children().eq(1).html();
            $(this).children().eq(0).html('已接单');
            $(this).attr("class", "alls");
            array.push(obj);
        })
        if (array.length == 0) return
        var arr={order:array};
        $.ajax({
            url:"submmit", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                alert(array['num']);
            }
        })
    })
})