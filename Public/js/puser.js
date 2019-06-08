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
        //      请求参数
        var arr={type:text, orders:order, user_id:user_id, dump:dump};

        console.log(arr);
        $.ajax({
            url:"indexx", method: "post",
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
                        + '</td><td>' + list[i]['name']
                        + '</td><td><img src="' + list[i]['img']
                        + '"></td><td>' + list[i]['money']
                        + '</td><td>' + list[i]['earning']
                        + '</td><td>' + list[i]['yesterday']
                        + '</td><td>' + list[i]['pay']
                        + '</td><td>' + list[i]['bank']
                        + '</td><td>' + list[i]['limits']
                        + '</td><td>' + list[i]['enroll_time']
                        + '</td><td>' + list[i]['login_time']
                        + '</td><td>' + list[i]['city']
                        + '</td><td>';

                    if (list[i]['states']=='0'){
                        tr=tr+'<button class="button border-red tijiao">禁用</button></td>';
                    }else {
                        tr=tr+'<button class="button border-green tijiao">恢复</button></td>';
                    }
                    if (list[i]['pid']==0){
                        tr=tr+'<td><button class="button border-green daili">开启</button></td></tr>';
                    }
                    if (list[i]['pid']==1){
                        tr=tr+'<td><button class="button border-red daili">关闭</button></td></tr>';
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


    function tijiao(type,uid) {
        var arr={type:type,uid:uid};

        console.log(arr);
        $.ajax({
            url:"tijiao", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                console.log(array);

                return array['return'];
            }
        })


    }
    $("body").on("click",".tijiao",function(){
        var uid=$(this).parent().parent().children().eq(0).text();
        var type=$(this).text();

        var cc=tijiao(type,uid);
        console.log(cc);

        if (type=='禁用'){
            $(this).parent().html('<button class="button border-green tijiao">恢复</button>');
        }else{
            $(this).parent().html('<button class="button border-red tijiao">禁用</button>');
        }

    })

    function daili(type,uid) {
        var arr={type:type,uid:uid};

        console.log(arr);
        $.ajax({
            url:"daili", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                console.log(array);

                return array['return'];
            }
        })


    }
    $("body").on("click",".daili",function(){
        var uid=$(this).parent().parent().children().eq(0).text();
        var type=$(this).text();

        var cc=daili(type,uid);
        console.log(cc);

        if (type=='关闭'){
            $(this).parent().html('<button class="button border-green daili">开启</button>');
        }else{
            $(this).parent().html('<button class="button border-red daili">关闭</button>');
        }

    })

})