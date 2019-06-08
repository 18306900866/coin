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
            url:"users", method: "post",
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
                        + '</td><td>' + list[i]['uid']
                        + '</td><td>' + list[i]['account']
                        + '</td><td>' + list[i]['referrer']
                        + '</td><td>' + list[i]['register_time']
                        + '</td><td>' + list[i]['register_ip']
                        + '</td><td>' + list[i]['login_time']
                        + '</td><td>' + list[i]['login_ip']
                        + '</td><td>' + list[i]['login_city']
                        + '</td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['currency']
                        + '</td><td>';
                    if (list[i]['states'] == '1' ){
                        tr += '<button class="btn btn-danger">停用</button></td></tr>';
                    }else {
                        tr += '<button class="btn btn-primary">启用</button></td></tr>';
                    }

                    table.append(tr);
                }
                //      分页显示
                var box=$('.left_dibu');
                box.append(" <button class='select button border-blue'>首页</button> ");
                if (allpage<=9){
                    var start=1;
                    var stop=allpage;
                    var strings='';
                    for (var i=start;i<=stop;i++){
                        var button="<button class='select button border-green'>"+ i +"</button> ";
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
                            var button="<button class='select button border-green'>"+ i +"</button> ";
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
                            var button="<button class='select button border-green'>"+ i +"</button> ";
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
                            var button="<button class='select button border-green'>"+ i +"</button> ";
                            if(i==nowpage) button="<button class='button border-yellow''>"+ i +"</button> ";
                            strings=button+strings;
                        }
                        box.append(strings);
                    }
                }
                box.append(" <button class='select button border-blue'>尾页</button> ");
                //      总页数
                var alpage_txt='页数:'+nowpage+'/总页数:'+allpage;
                $('.zongyeshu').html(alpage_txt);
            }
        });

    })

    //btn btn-primary
    //btn btn-danger

    $("body").on("click",".btn-primary",function(){
        var obj=$(this).parent();
        var uid=$(this).parent().parent().children().eq(0).html();
        
        var arr={uid:uid,states:1};
        $.ajax({
            url:"close", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);

                if (array['result'] == 1){
                    obj.html('<button class="btn btn-danger">停用</button>');
                }
            }
        })
    })

    $("body").on("click",".btn-danger",function(){

        var obj=$(this).parent();
        var uid=$(this).parent().parent().children().eq(0).html();

        var arr={uid:uid,states:0};
        $.ajax({
            url:"close", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);

                if (array['result'] == 1){
                    obj.html('<button class="btn btn-primary">启用</button>');
                }
            }
        })
    })







})