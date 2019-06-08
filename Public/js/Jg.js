$(window).load(function () {
    var state=0;
    var html_state=0;
    var html_html='';
    $(".submit").on("click",function () {
            // alert(pList);
            var message=$(".text").val();
            if (state==1) return;
            if($(".text").val()==''){
                alert("请选择要推送的内容");
            }else{
                var pList = "";
                $("[type='checkbox']").each(function () {
                    if ($(this).is(':checked')) {
                        pList += $(this).parent().children().eq(2).text() + ",";
                    }
                });
                if(pList==''){
                    alert("请选择要推送的APP名称");
                }else{
                    var arr={'name':pList,'message':message}
                    state=1;
                    $.ajax({
                        url: "Jg/JgAjax",
                        method: "POST",
                        async: "true",
                        data: arr,    //数据名
                        timeout: 8000, dataType: "json",
                        success: function (data) {
                            var list = eval(data);
                            if(list['result']='发送成功'){
                                alert(list['result']);
                            }
                            state=0;
                        }
                    });
                }
            }
        });
    $(".submit").on("touchstart",function () {
            // alert(pList);
            var message=$(".text").val();
            if (state==1) return;
            if($(".text").val()==''){
                alert("请选择要推送的内容");
            }else{
                var pList = "";
                $("[type='checkbox']").each(function () {
                    if ($(this).is(':checked')) {
                        pList += $(this).parent().children().eq(2).text() + ",";
                    }
                });
                if(pList==''){
                    alert("请选择要推送的APP名称");
                }else{
                    var arr={'name':pList,'message':message}
                    state=1;
                    $.ajax({
                        url: "Jg/JgAjax",
                        method: "POST",
                        async: "true",
                        data: arr,    //数据名
                        timeout: 8000, dataType: "json",
                        success: function (data) {
                            var list = eval(data);
                            if(list['result']='发送成功'){
                                alert(list['result']);
                            }
                            state=0;
                        }
                    });
                }
            }
        });


    $("body").on("click",".selects",function(){
        var text=$(this).text();
        var dump=$('.dump_to').val();
        if (text=='跳转' && dump<1){
            alert('请输入正确页码！');
            return false;
        }
        var soc = $('.soc');//.attr('name');

        //      获取查询条件

        var name=$('.name').val();
        var min=$('.min').val();
        var max=$('.max').val();
        var pay_name='';
        var pay_type='';
        var pay_state='';
        $(".pay_name>.chosen-container>.chosen-choices>.search-choice").each(function () {
            pay_name += $(this).children().eq(0).text() + ",";
        })
        $(".pay_type>.chosen-container>.chosen-choices>.search-choice").each(function () {
            pay_type += $(this).children().eq(0).text() + ",";
        })
        $(".pay_state>.chosen-container>.chosen-choices>.search-choice").each(function () {
            pay_state += $(this).children().eq(0).text() + ",";
        })

        //      请求参数
        var arr={type:text,dump:dump,name:name,min:min,max:max,
            pay_name:pay_name, pay_type:pay_type, pay_state:pay_state};
        $.ajax({
            url:"pays", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                // console.log(array);
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
                    var tr = '<tr class="alls">'
                        + '<td>' + list[i]['id']
                        + '</td><td>' + list[i]['name']
                        + '</td><td>' + list[i]['class']
                        + '</td><td>' + list[i]['message']
                        + '</td><td><input type="text" readonly style="width:100%;" value="' + list[i]['money']
                        + '" /></td><td><img style="width:50px;height:50px" src="' + list[i]['logo']
                        + '"></td><td><input type="text" readonly style="width:100%;" value="' + list[i]['logo']
                        + '" /></td><td><input type="text" readonly style="width:50px;" value="' + list[i]['limit']
                        + '" /></td>';

                    if (list[i]['state']==1){
                        tr=tr+'<td><div class="btn btn-sm btn-danger closes">关闭</div> ';
                    }else {
                        tr=tr+'<td><div class="btn btn-sm btn-success closes">开启</div> ';
                    }
                    if (list[i]['top']==1){
                        tr=tr+' <div class="btn btn-sm btn-default closes">取消置顶</div></td>';
                    }else {
                        tr=tr+' <div class="btn btn-sm btn-warning closes">置顶</div></td>';
                    }
                    tr=tr+'<td><div class="btn btn-outline btn-w-m  btn-primary">修改</div></td>';
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
    $("body").on("click",".cancel",function(){
        $('.search-choice-close').each(function () {$(this).click();})
        $('.name').val('');
        $('.max').val('');
        $('.min').val('');
    });
    //开关
    $("body").on("click",".closes",function(){
        var type=$(this).text();
        var obj=$(this).parent();
        var newhtml='';var actions='';
        switch (type) {
            case ("关闭"):
                newhtml='<div class="btn btn-sm btn-success closes">开启</div>';
                actions=0;
                break;
            case ("开启"):
                newhtml='<div class="btn btn-sm btn-danger closes">关闭</div>';
                actions=0;
                break;
            case ("取消置顶"):
                newhtml='<div class="btn btn-sm btn-warning closes">置顶</div>';
                actions=1;
                break;
            case ("置顶"):
                newhtml='<div class="btn btn-sm btn-default closes">取消置顶</div>';
                actions=1;
                break;
        }
        if (actions==1){
            obj.append(newhtml);
        }else if(actions==0){
            obj.prepend(newhtml);
        }
        $(this).remove();
        //      提交请求
        var id=obj.parent().children().eq(0).text();
        var arr={'id':id,'type':type};
        $.ajax({
            url: "PayAjax",
            method: "POST",
            async: "true",
            data: arr,    //数据名
            timeout: 8000, dataType: "json",
            success: function (data) {
                var list = eval(data);
                if(list['result']==0) alert('操作失败')
            }
        });
    });
    //修改
    $("body").on("click",".btn-outline",function(){
        var txt=$(this).text();
        if (txt=='修改'){
            if (html_state==1) return;
            var tr=$(this).parent().parent();
            html_html=tr.html();html_state=1;
            tr.children().eq(4).children().eq(0).removeAttr("readonly");
            tr.children().eq(6).children().eq(0).removeAttr("readonly");
            tr.children().eq(7).children().eq(0).removeAttr("readonly");
            $(this).parent().html('<div class="btn btn-outline btn-success">确认</div> ' +
                '<div class="btn btn-outline btn-danger">取消</div>');
        }else if(txt=='取消'){
            $(this).parent().parent().html(html_html);
            html_state=0;
        }else if(txt=='确认'){
            html_state=0;
            var tr=$(this).parent().parent();
            var id=tr.children().eq(0).text();
            var money=tr.children().eq(4).children().eq(0).val();
            var url=tr.children().eq(6).children().eq(0).val();
            var limit=tr.children().eq(7).children().eq(0).val();
            var arr={'id':id,'money':money,'url':url,'limit':limit};
            //  ajax    //
            $.ajax({
                url: "UpAjax",
                method: "POST",
                async: "true",
                data: arr,    //数据名
                timeout: 8000, dataType: "json",
                success: function (data) {
                    var list = eval(data);
                    if(list['result']==0) alert('操作失败')
                }
            });
            var url="<img style='width:50px;height:50px' src='"+url+"'+>";
            tr.children().eq(5).html(url);
            tr.children().eq(4).children().eq(0).attr("readonly","readonly");
            tr.children().eq(6).children().eq(0).attr("readonly","readonly");
            tr.children().eq(7).children().eq(0).attr("readonly","readonly");
            $(this).parent().html('<div class="btn btn-outline btn-w-m  btn-primary">修改</div>');
        }

    });

    $("body").on("touchstart",".selects",function(){
        var text=$(this).text();
        var dump=$('.dump_to').val();
        if (text=='跳转' && dump<1){
            alert('请输入正确页码！');
            return false;
        }
        var soc = $('.soc');//.attr('name');

        //      获取查询条件

        var name=$('.name').val();
        var min=$('.min').val();
        var max=$('.max').val();
        var pay_name='';
        var pay_type='';
        var pay_state='';
        $(".pay_name>.chosen-container>.chosen-choices>.search-choice").each(function () {
            pay_name += $(this).children().eq(0).text() + ",";
        })
        $(".pay_type>.chosen-container>.chosen-choices>.search-choice").each(function () {
            pay_type += $(this).children().eq(0).text() + ",";
        })
        $(".pay_state>.chosen-container>.chosen-choices>.search-choice").each(function () {
            pay_state += $(this).children().eq(0).text() + ",";
        })

        //      请求参数
        var arr={type:text,dump:dump,name:name,min:min,max:max,
            pay_name:pay_name, pay_type:pay_type, pay_state:pay_state};
        $.ajax({
            url:"pays", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                // console.log(array);
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
                    var tr = '<tr class="alls">'
                        + '<td>' + list[i]['id']
                        + '</td><td>' + list[i]['name']
                        + '</td><td>' + list[i]['class']
                        + '</td><td>' + list[i]['message']
                        + '</td><td><input type="text" readonly style="width:100%;" value="' + list[i]['money']
                        + '" /></td><td><img style="width:50px;height:50px" src="' + list[i]['logo']
                        + '"></td><td><input type="text" readonly style="width:100%;" value="' + list[i]['logo']
                        + '" /></td><td><input type="text" readonly style="width:50px;" value="' + list[i]['limit']
                        + '" /></td>';

                    if (list[i]['state']==1){
                        tr=tr+'<td><div class="btn btn-sm btn-danger closes">关闭</div> ';
                    }else {
                        tr=tr+'<td><div class="btn btn-sm btn-success closes">开启</div> ';
                    }
                    if (list[i]['top']==1){
                        tr=tr+' <div class="btn btn-sm btn-default closes">取消置顶</div></td>';
                    }else {
                        tr=tr+' <div class="btn btn-sm btn-warning closes">置顶</div></td>';
                    }
                    tr=tr+'<td><div class="btn btn-outline btn-w-m  btn-primary">修改</div></td>';
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
    $("body").on("touchstart",".cancel",function(){
        $('.search-choice-close').each(function () {$(this).click();})
        $('.name').val('');
        $('.max').val('');
        $('.min').val('');
    });
    //开关
    $("body").on("touchstart",".closes",function(){
        var type=$(this).text();
        var obj=$(this).parent();
        var newhtml='';var actions='';
        switch (type) {
            case ("关闭"):
                newhtml='<div class="btn btn-sm btn-success closes">开启</div>';
                actions=0;
                break;
            case ("开启"):
                newhtml='<div class="btn btn-sm btn-danger closes">关闭</div>';
                actions=0;
                break;
            case ("取消置顶"):
                newhtml='<div class="btn btn-sm btn-warning closes">置顶</div>';
                actions=1;
                break;
            case ("置顶"):
                newhtml='<div class="btn btn-sm btn-default closes">取消置顶</div>';
                actions=1;
                break;
        }
        if (actions==1){
            obj.append(newhtml);
        }else if(actions==0){
            obj.prepend(newhtml);
        }
        $(this).remove();
        //      提交请求
        var id=obj.parent().children().eq(0).text();
        var arr={'id':id,'type':type};
        $.ajax({
            url: "PayAjax",
            method: "POST",
            async: "true",
            data: arr,    //数据名
            timeout: 8000, dataType: "json",
            success: function (data) {
                var list = eval(data);
                if(list['result']==0) alert('操作失败')
            }
        });
    });
    //修改
    $("body").on("touchstart",".btn-outline",function(){
        var txt=$(this).text();
        if (txt=='修改'){
            if (html_state==1) return;
            var tr=$(this).parent().parent();
            html_html=tr.html();html_state=1;
            tr.children().eq(4).children().eq(0).removeAttr("readonly");
            tr.children().eq(6).children().eq(0).removeAttr("readonly");
            tr.children().eq(7).children().eq(0).removeAttr("readonly");
            $(this).parent().html('<div class="btn btn-outline btn-success">确认</div> ' +
                '<div class="btn btn-outline btn-danger">取消</div>');
        }else if(txt=='取消'){
            $(this).parent().parent().html(html_html);
            html_state=0;
        }else if(txt=='确认'){
            html_state=0;
            var tr=$(this).parent().parent();
            var id=tr.children().eq(0).text();
            var money=tr.children().eq(4).children().eq(0).val();
            var url=tr.children().eq(6).children().eq(0).val();
            var limit=tr.children().eq(7).children().eq(0).val();
            var arr={'id':id,'money':money,'url':url,'limit':limit};
            //  ajax    //
            $.ajax({
                url: "UpAjax",
                method: "POST",
                async: "true",
                data: arr,    //数据名
                timeout: 8000, dataType: "json",
                success: function (data) {
                    var list = eval(data);
                    if(list['result']==0) alert('操作失败')
                }
            });
            var url="<img style='width:50px;height:50px' src='"+url+"'+>";
            tr.children().eq(5).html(url);
            tr.children().eq(4).children().eq(0).attr("readonly","readonly");
            tr.children().eq(6).children().eq(0).attr("readonly","readonly");
            tr.children().eq(7).children().eq(0).attr("readonly","readonly");
            $(this).parent().html('<div class="btn btn-outline btn-w-m  btn-primary">修改</div>');
        }

    });

})
