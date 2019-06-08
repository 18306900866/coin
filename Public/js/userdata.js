$(window).load(function(){
    $(".sousuo").focus(function(){
        $(this).addClass("hover")
    })
    $(".sousuo").blur(function(){
        $(this).removeClass("hover")
    })
})
$(window).load(function(){
    function flushpage(pageCount,searchdata,order,url) {
        layui.use(['laypage', 'layer'], function() {
            var laypage = layui.laypage
                , layer = layui.layer;
            //完整功能
            laypage.render({
                elem: 'demo'
                ,count: pageCount
                ,limit: 12
                ,layout: ['count', 'prev', 'page', 'next', 'skip']
                ,jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //一定要加此判断，否则初始时会无限刷新
                        var curr = obj.curr;
                        var uid = $("input.sousuo").val()
                        var self  = this;
                        $('.upbody').remove();
                        $.ajax({
                            //这里省略了ajax数据交互
                            async:true,
                            data: {
                                'pageNo': curr,
                                'type': searchdata,
                                'uid': uid,
                                'order':order
                            },
                            type:"post",
                            dataType:"json",
                            url: url,
                            success: function (res) {
                                if(res.code=='0'){
                                    tableshow(searchdata,res.pagedata);
                                }
                            }
                        });
                    }
                }
            });
        });
    }
    function tableshow(type,tabledata) {
        if(type==1) {
            var list = eval(tabledata['list']);
            var table = $('table.on');
            $('.alls').remove();
            for (var i = 0; i < list.length; i++) {
                var tr = '<tr class="alls"><td>' + list[i]['cname'] + '</td><td>' + list[i]['issue'] + '</td><td class="soc">' + list[i]['time'] + '</td>' +
                    '<td style="width: 20%;">' + list[i]['type'] + '</td><td>'+ list[i]['rate']+'</td><td>'+ list[i]['number']+'</td><td  class="soc">' + parseFloat(list[i]['money']).toFixed(2) +
                    '</td><td>' + list[i]['result'] + '</td>';
                var lius = parseFloat(list[i]['win_money']) - parseFloat(list[i]['money']);
                if(list[i]['state']==3||list[i]['state']==4||list[i]['state']==5){
                    lius = 0;
                }
                var liushui = lius.toFixed(2);
                if (lius >= 0) {
                    tr += '<td style="color: #00A5A5">'+liushui+'</td></tr>';
                } else {
                    tr += '<td style="color: red">'+liushui+'</td></tr>';
                }
                table.append(tr);
            }

        }
        if(type==2){
            var list = eval(tabledata['list']);
            var table = $('table.on');
            $('.alls').remove();
            for (var i = 0; i < list.length; i++) {
                var tr = '<tr class="alls"><td>' + list[i]['order'] + '</td><td class="soc">' + list[i]['time'] + '</td>' +
                    '<td>' + list[i]['type'] + '</td><td  class="soc">' + list[i]['money'] + '</td><td>' + list[i]['result'] + '</td>';
                table.append(tr);
            }
        }
        if(type==3){
            var list = eval(tabledata['list']);
            var table = $('table.on');
            $('.alls').remove();
            for (var i = 0; i < list.length; i++) {
                var tr = '<tr class="alls"><td>' + list[i]['bank'] + '</td><td>'+list[i]['city']+'</td><td>'+list[i]['card']+'</td><td class="soc">' + list[i]['money'] + '</td>' +
                    '<td>' + list[i]['name'] + '</td><td  class="soc">' + list[i]['time'] + '</td><td>' + list[i]['result'] + '</td>';
                table.append(tr);
            }
        }
        if(type==4){
            var list = eval(tabledata['list']);
            var table = $('table.on');
            $('.alls').remove();
            for (var i = 0; i < list.length; i++) {
                var tr = '<tr class="alls"><td>' + list[i]['order'] + '</td><td>' + list[i]['time'] + '</td><td>'
                    + list[i]['money'] + '</td>';
                if (list[i]['usemoney'] > 0) {
                    tr += '<td style="color: #00A5A5">'+list[i]['usemoney']+'</td>';
                } else {
                    tr += '<td style="color: red">'+list[i]['usemoney']+'</td>';
                }
                tr += '<td>'+list[i]['event']+'</td><td>'+list[i]['describe']+'</td></tr>';
                table.append(tr);
            }
        }
    }
    function tableswitch(uid, type,order) {
        var obj = {uid:uid,type:type,order:order};
        $.ajax({
            url: "/UserCenter/userMsg", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                if(res.code=='0'){
                    var userMsg = res.userMsg;
                    $(".uname").text(userMsg['name']);
                    $(".utel").text(userMsg['account']);
                    $(".uxin").text(userMsg['real_name']);
                    $(".idcard").text(userMsg['card_id']);
                    $(".uservip").val(userMsg['level']);
                    $(".uref").text(userMsg['referrer']);
                    $(".umoney").text(userMsg['money']);
                    $(".uearning").text(userMsg['earning']);
                    $(".uzctime").text(userMsg['r_time']);
                    $(".ulgtime").text(userMsg['l_time']);
                    $(".ulgip").text(userMsg['l_ip']);
                    $(".utxlimits").val(userMsg['limits']);
                    $(".utxcishu").val(userMsg['txlimit']);
                    $(".utxmb").val(userMsg['upper']);
                    $(".utx").text(userMsg['bankall']);
                    $(".ucz").text(userMsg['recharge']);
                    $(".utxs").text(userMsg['bank']);
                    $("#txedit").css('display','block');
                    $("#txcedit").css('display','block');
                    $("#txmedit").css('display','block');
                    $("#uservip").css('display','block');
                    tableshow(type,res.tabledata);
                    if(parseInt(res.tabledata['count'])>0){
                        $("#demo").css('display','block');
                        flushpage(parseInt(res.tabledata['count']),type,order,'/UserCenter/mxpage');
                    }else {
                        $("#demo").css('display','none');
                    }
                }else {
                    alert(res.msg);
                    $(".uname").text('');
                    $(".utel").text('');
                    $(".uxin").text('');
                    $(".idcard").text('');
                    $(".uservip").val('');
                    $(".uref").text('');
                    $(".umoney").text('');
                    $(".uearning").text('');
                    $(".uzctime").text('');
                    $(".ulgtime").text('');
                    $(".ulgip").text('');
                    $(".utxlimits").val('');
                    $(".utxcishu").val('');
                    $(".utxmb").val('');
                    $("#txedit").css('display','none');
                    $("#txcedit").css('display','none');
                    $("#txmedit").css('display','none');
                    $("#uservip").css('display','none');
                    $(".utx").text('');
                    $(".ucz").text('');
                    $(".utxs").text('');
                    $("#demo").css('display','none');
                    $('.alls').remove();
                }
            }
        });
    }
    $(".yh_bt_sousuo").click(function () {
        var uid = $("input.sousuo").val()
        if (uid==null||uid==undefined||uid==''){
            return;
        }
        var type = $(".yh_tab li.on").attr('val');
        tableswitch(uid,type);
    })
    $(".yh_tab li").click(function(){
        var old_type = $(".yh_tab li.on").attr('val');
        var new_type = $(this).attr('val');
        if(old_type==new_type){
            return;
        }
        $(".yh_tab li").removeClass("on")
        var wz = $(this).index();
        $(this).addClass("on")
        $(".tabale_txjl .table").removeClass("on");
        $(".tabale_txjl .table").eq(wz).addClass("on");
        var uid = $("input.sousuo").val()
        if (uid==null||uid==undefined||uid==''){
            return;
        }
        if($(".utel").text()!=''){
            tableswitch(uid,new_type,'');
        }
    })

    function txedit(obj) {
        $.ajax({
            url: "/UserCenter/edittxlimit", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg(res.msg);
                });
            }
        });
    }

    $("#txedit").click(function () {
        uid = $("input.sousuo").val();
        txlm = $(".utxlimits").val();
        dotype = 1;
        obj = {uid:uid,txlm:txlm,dotype:dotype};
        //console.log(obj);
        txedit(obj);
    });
    $("#txcedit").click(function () {
        uid = $("input.sousuo").val();
        txlm = $(".utxcishu").val();
        dotype = 2;
        obj = {uid:uid,txlm:txlm,dotype:dotype};
        //console.log(obj);
        txedit(obj);
    });
    $("#txmedit").click(function () {
        uid = $("input.sousuo").val();
        txlm = $(".utxmb").val();
        dotype = 3;
        obj = {uid:uid,txlm:txlm,dotype:dotype};
        //console.log(obj);
        txedit(obj);
    });
    $("#uservip").click(function () {
        uid = $("input.sousuo").val();
        txlm = $(".uservip").val();
        dotype = 4;
        obj = {uid:uid,txlm:txlm,dotype:dotype};
        //console.log(obj);
        txedit(obj);
    });
    $("#back").click(function () {
        window.location.href="/UserCenter/userlist";
    });
    //排序事件方法
    var title;
    $("body").on("click","thead tr .soc",function(){
        if($(this).find(".sorting_ascss").hasClass("on")){
            $(".table thead tr .soc").each(function(){
                $(this).find(".sorting_ascss").removeClass("on");
                $(this).find(".sorting_ascss").removeClass("tw");
            })
            title="asc/"
            $(this).find(".sorting_ascss").addClass("tw");

        }else{
            $(".table thead tr .soc").each(function(){
                $(this).find(".sorting_ascss").removeClass("on");
                $(this).find(".sorting_ascss").removeClass("tw");
            })
            $(this).find(".sorting_ascss").addClass("on");
            title="desc/"
        }
        title = title + $(this).attr('val');
        //console.log(title);
        var uid = $("input.sousuo").val()
        if (uid==null||uid==undefined||uid==''){
            return;
        }
        var type = $(".yh_tab li.on").attr('val');
        tableswitch(uid,type,title);
    })
    var uid = $("input.sousuo").val()
    if (uid==null||uid==undefined||uid==''){
        return;
    }
    var type = $(".yh_tab li.on").attr('val');
    tableswitch(uid,type,'');
})