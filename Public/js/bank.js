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
        $('.user_id').val('');
        $('.user_account').val('');
        $('.money_start').val('');
        $('.money_end').val('');
    })
    $("body").on("touchstart",".cancel",function(){
        $('.user_id').val('');
        $('.user_account').val('');
        $('.money_start').val('');
        $('.money_end').val('');
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
        if (type=='') order='';
        //      获取查询条件
        var user_id=$('.user_id').val();
        var user_account=$('.user_account').val();
        var money_start=$('.money_start').val();
        var money_end=$('.money_end').val();
        //      请求参数
        var arr={type:text, orders:order, user_id:user_id, user_account:user_account,
            min:money_start, max:money_end, dump:dump};

        console.log(arr);
        $.ajax({
            url:"chongzhis", method: "post",
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
                    head = '<tr class="alls">';

                    var tr = head
                        + '</td><td>' + list[i]['orders']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['account']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['time']
                        + '</td>';
                    if (list[i]['result'] == '充值成功' ){
                        tr += '<td class="text-success">充值成功</td></tr>';
                    }else if  (list[i]['result'] == '充值失败' ){
                        tr += '<td class="text-danger">充值失败</td></tr>';
                    }else {
                        tr += '<td class="text-info">充值中</td></tr>';
                    }

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

    $("body").on("click",".select",function(){
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
        if (type=='') order='';
        //      获取查询条件
        var user_id=$('.user_id').val();
        var user_account=$('.user_account').val();
        var money_start=$('.money_start').val();
        var money_end=$('.money_end').val();
        //      请求参数
        var arr={type:text, orders:order, user_id:user_id, user_account:user_account,
            min:money_start, max:money_end, dump:dump};

        console.log(arr);
        $.ajax({
            url:"tixians", method: "post",
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
                    head = '<tr class="alls">';

                    var tr = head
                        + '</td><td>' + list[i]['orders']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['account']
                        + '</td><td>' + list[i]['bankcrad']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['time']
                        + '</td>';
                    if (list[i]['result'] == '提现成功' ){
                        tr += '<td class="text-success">提现成功</td></tr>';
                    }else if  (list[i]['result'] == '提现失败' ){
                        tr += '<td class="text-danger">提现失败</td></tr>';
                    }else {
                        tr += '<td><button type="button" class="btn btn-w-m btn-primary">确认提现</button>' +
                            '<button type="button" class="btn btn-w-m btn-warning">取消提现</button></td></tr>';
                    }

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

    $("body").on("click",".selectx",function(){
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
        if (type=='') order='';
        //      获取查询条件
        var user_id=$('.user_id').val();
        var user_account=$('.user_account').val();
        var money_start=$('.money_start').val();
        var money_end=$('.money_end').val();
        //      请求参数
        var arr={type:text, orders:order, user_id:user_id, user_account:user_account,
            min:money_start, max:money_end, dump:dump};

        console.log(arr);
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
                    head = '<tr class="alls">';

                    var tr = head
                        + '</td><td>' + list[i]['orders']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['account']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['time']
                        + '</td><td>' + list[i]['currency_name']
                        + '</td><td>' + list[i]['quantity']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['money_all']
                        + '</td>';
                    if (list[i]['result'] == '购买成功' ){
                        tr += '<td class="text-success">购买成功</td></tr>';
                    }else {
                        tr += '<td class="text-danger">购买失败</td></tr>';
                    }

                    table.append(tr);
                }
                //      分页显示
                var box=$('.left_dibu');
                box.append(" <button class='selectx button border-blue'>首页</button> ");
                if (allpage<=9){
                    var start=1;
                    var stop=allpage;
                    var strings='';
                    for (var i=start;i<=stop;i++){
                        var button="<button class='selectx button border-green'>"+ i +"</button> ";
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
                            var button="<button class='selectx button border-green'>"+ i +"</button> ";
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
                            var button="<button class='selectx button border-green'>"+ i +"</button> ";
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
                            var button="<button class='selectx button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=button+strings;
                        }
                        box.append(strings);
                    }
                }
                box.append(" <button class='selectx button border-blue'>尾页</button> ");
                //      总页数
                var alpage_txt='页数:'+nowpage+'/总页数:'+allpage;
                $('.zongyeshu').html(alpage_txt);
            }
        });

    })


    $("body").on("click",".selecto",function(){
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
        if (type=='') order='';
        //      获取查询条件
        var user_id=$('.user_id').val();
        var money_start=$('.money_start').val();
        var money_end=$('.money_end').val();
        var order_id=$('.order_id').val();
        //      请求参数
        var arr={type:text, orders:order, user_id:user_id,
            min:money_start, max:money_end, order_id:order_id, dump:dump};

        console.log(arr);
        $.ajax({
            url:"waters", method: "post",
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
                    head = '<tr class="alls">';

                    var tr = head
                        + '</td><td>' + list[i]['orders']
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['time']
                        + '</td><td>' + list[i]['change']
                        + '</td><td>' + list[i]['money']
                        + '</td>';
                    if (list[i]['types'] == '1' ){
                        tr += '<td class="text-success">收入</td></tr>';
                    }else {
                        tr += '<td class="text-danger">支出</td></tr>';
                    }

                    table.append(tr);
                }
                //      分页显示
                var box=$('.left_dibu');
                box.append(" <button class='selecto button border-blue'>首页</button> ");
                if (allpage<=9){
                    var start=1;
                    var stop=allpage;
                    var strings='';
                    for (var i=start;i<=stop;i++){
                        var button="<button class='selecto button border-green'>"+ i +"</button> ";
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
                            var button="<button class='selecto button border-green'>"+ i +"</button> ";
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
                            var button="<button class='selecto button border-green'>"+ i +"</button> ";
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
                            var button="<button class='selecto button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=button+strings;
                        }
                        box.append(strings);
                    }
                }
                box.append(" <button class='selecto button border-blue'>尾页</button> ");
                //      总页数
                var alpage_txt='页数:'+nowpage+'/总页数:'+allpage;
                $('.zongyeshu').html(alpage_txt);
            }
        });

    })

    $("body").on("click",".btn-primary",function(){
        var obj=$(this).parent().parent().children().eq(6);
        var orders=$(this).parent().parent().children().eq(0).html();
        
        var arr={orders:orders,types:1};
        $.ajax({
            url:"shenhe", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);

                if (array['result'] == 1){
                    obj.html('<td class="text-success">提现成功</td>');
                }
            }
        })
    })

    $("body").on("click",".btn-warning",function(){
        var obj=$(this).parent().parent().children().eq(6);
        var orders=$(this).parent().parent().children().eq(0).html();

        var arr={orders:orders,types:0};
        $.ajax({
            url:"shenhe", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);

                if (array['result'] == 1){
                    obj.html('<td class="text-danger">提现失败</td>');
                }
            }
        })
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
            url:"submmitb", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                alert(array['num']);
            }
        })
    })

    function tijiao(type,id) {
        var arr={type:type,id:id};

        console.log(arr);
        $.ajax({
            url:"tijiao", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                console.log(array);
            }
        })


    }

    $("body").on("click",".tijiao",function(){
        var id=$(this).parent().parent().children().eq(0).text();
        var type=$(this).text();
        tijiao(type,id);

        $(this).parent().html('');

    })
})