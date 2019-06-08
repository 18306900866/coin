$(document).ready()
{
    function Ajax(obj) {
        $.ajax({
            url: "/UserCenter/upstate", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (data) {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg('操作成功');
                });
            }
        });
    }
    function del(id, but) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.confirm('是否暂停该账户使用权?', {
                btn: ['确认','取消'] //按钮
            }, function(){
                var obj = {id: id, type: 0};
                Ajax(obj);
                var tr = but.parentNode;
                tr.innerHTML='<a class="button border-main" onclick="return on(id,this)">启用</a>';
            });
        });
    }
    function on(id, but) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.confirm('是否开启该账户使用权?', {
                btn: ['确认','取消'] //按钮
            }, function(){
                layer.close();
                var obj = {id: id, type: 1};
                Ajax(obj);
                var tr = but.parentNode;
                tr.innerHTML='<a class="button border-red" onclick="return del(id,this)">停用</a>';
            });
        });
    }
    function search() {
        var ip=$(".ip").val();
        var id=$(".userid").val();
        var money=$(".money_start").val()+','+$(".money_end").val();
        var earning=$(".earning_start").val()+','+$(".earning_end").val();
        var r_time = $(".r_start").val() + ',' + $(".r_end").val();
        var l_time = $(".l_start").val() + ',' + $(".l_end").val();
        var rt_reorder=$(".rt_reorder").find("option:selected").text();
        var money_reorder=$(".money_reorder").find("option:selected").text();
        var earning_reorder=$(".earning_reorder").find("option:selected").text();
        var operator='';
        var lt_reorder=$(".lt_reorder").find("option:selected").text();
        var order='';
        if(rt_reorder!='注册时间'){
            order=rt_reorder;
        }else if(money_reorder!='余额'){
            order=money_reorder;
        }else if(earning_reorder!='今日输赢'){
            order=earning_reorder;
        }else if(lt_reorder!='最后登录时间'){
            order=lt_reorder;
        }
//            if($(".equipment").find("option:selected").text()!='设备'){
//                equipment=$(".equipment").find("option:selected").text();
//            }
        if($(".operator").find("option:selected").text()!='运营商'){
            operator=$(".operator").find("option:selected").text();
        }
        var arr = {ip: ip, uid: id, money: money, earning: earning, r_time: r_time,l_time:l_time,order:order,operator:operator};
        var obj = {pageNo: 1, search: arr};
        $.ajax({
            //这里省略了ajax数据交互
            async:true,
            data: obj,
            type:"post",
            dataType:"json",
            url: "/UserCenter/search",
            success: function (res) {
                if(res.success='succeed'){
                    var list = eval(res.list);
                    $('.upbody').remove();
                    var table = $('.to');
                    for (var i=0; i < list.length; i++) {
                        var tr='<tr class="upbody"><td class="uid">'+list[i]['uid']+'</td><td>'+list[i]['account']+'</td><td>'+list[i]['referrer']+'</td>' +
                            '<td>'+list[i]['r_time']+'</td><td>'+list[i]['money']+'</td><td>'+list[i]['earning']+'</td><td>'+list[i]['l_ip']+'</td>' +
                            '<td>'+list[i]['l_facility']+'</td><td>'+list[i]['network']+'</td><td>'+list[i]['city']+'</td><td>'+list[i]['l_time']+'</td>';
                        if(list[i]['limits']==1){
                            tr+='<td><div class="button-group"><a class="button border-red" onclick="return del('+list[i]['uid']+',this)">停用</a></div></td></tr>';
                        }else {
                            tr+='<td><div class="button-group"><a class="button border-main" onclick="return on('+list[i]['uid']+',this)">启用</a></div></td></tr>';
                        }
                        table.append(tr);
                    }
                    flushpage(res.pageCount,arr,"/UserCenter/search");
                }
            }
        });
    }
    function flushpage(pageCount,searchdata,url) {
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
                        var self  = this;
                        $('.upbody').remove();
                        $.ajax({
                            //这里省略了ajax数据交互
                            async:true,
                            data: {
                                'pageNo': curr,
                                'search': searchdata
                            },
                            type:"post",
                            dataType:"json",
                            url: url,
                            success: function (res) {
                                if(res.success='succeed'){
                                    var list = eval(res.list);
                                    var table = $('.to');
                                    for (var i=0; i < list.length; i++) {
                                        var tr='<tr class="upbody"><td class="uid" style="cursor:pointer">'+list[i]['uid']+'</td><td>'+list[i]['account']+'</td><td>'+list[i]['referrer']+'</td>' +
                                            '<td>'+list[i]['r_time']+'</td><td>'+list[i]['money']+'</td><td>'+list[i]['earning']+'</td><td>'+list[i]['l_ip']+'</td>' +
                                            '<td>'+list[i]['l_facility']+'</td><td>'+list[i]['network']+'</td><td>'+list[i]['city']+'</td><td>'+list[i]['l_time']+'</td>';
                                        if(list[i]['limits']==1){
                                            tr+='<td><div class="button-group"><a class="button border-red" onclick="return del('+list[i]['uid']+',this)">停用</a></div></td></tr>';
                                        }else {
                                            tr+='<td><div class="button-group"><a class="button border-main" onclick="return on('+list[i]['uid']+',this)">启用</a></div></td></tr>';
                                        }
                                        table.append(tr);
                                    }
                                }
                            }
                        });
                    }

                }
            });
        });
    }
    search();
    $('.search').on('click',function () {
        search();
    });
    $(".cancel").on("click",function () {
        $(".ip").val('');
        $(".userid").val('');
        $(".money_start").val('');
        $(".money_end").val('');
        $(".earning_start").val('');
        $(".earning_end").val('');
        $(".r_start").val('');
        $(".r_end").val('');
        $(".l_start").val('');
        $(".l_end").val('');
    });
    $('.daochu').on('click',function () {
        var ip=$(".ip").val();
        var id=$(".userid").val();
        var money=$(".money_start").val()+','+$(".money_end").val();
        var earning=$(".earning_start").val()+','+$(".earning_end").val();
        var r_time = $(".r_start").val() + ',' + $(".r_end").val();
        var l_time = $(".l_start").val() + ',' + $(".l_end").val();
        var rt_reorder=$(".rt_reorder").find("option:selected").text();
        var money_reorder=$(".money_reorder").find("option:selected").text();
        var earning_reorder=$(".earning_reorder").find("option:selected").text();
        var opts='';
        var lt_reorder=$(".lt_reorder").find("option:selected").text();
        var order='';
        if(rt_reorder!='注册时间'){
            order=rt_reorder;
        }else if(money_reorder!='余额'){
            order=money_reorder;
        }else if(earning_reorder!='今日输赢'){
            order=earning_reorder;
        }else if(lt_reorder!='最后登录时间'){
            order=lt_reorder;
        }
//            if($(".equipment").find("option:selected").text()!='设备'){
//                equipment=$(".equipment").find("option:selected").text();
//            }
        if($(".operator").find("option:selected").text()!='运营商'){
            opts = $(".operator").find("option:selected").text();
        }
        var arr = {ip: ip, uid: id, money: money, earning: earning, r_time: r_time,l_time:l_time,order:order,opts:opts};
        window.location.href = "/UserCenter/userexcel?uid="+arr.uid+"&ip="+arr.ip+"&money="+arr.money+"&earning="+arr.money+"&r_time="+arr.r_time+"&l_time="+arr.l_time+"&order="+arr.order+"&operator="+arr.opts;
    });
    $(".rt_reorder").change(function () {
        if($(".rt_reorder").find("option:selected").attr("value")!="0"){
            $(".money_reorder").find("option").attr("selected",false);
            $(".money_reorder").find("option[value='0']").attr("selected",true);
            $(".earning_reorder").find("option").attr("selected",false);
            $(".earning_reorder").find("option[value='0']").attr("selected",true);
            $(".lt_reorder").find("option").attr("selected",false);
            $(".lt_reorder").find("option[value='0']").attr("selected",true);
        }
        search();
    })
    $(".money_reorder").change(function () {
        if($(".money_reorder").find("option:selected").attr("value")!="0"){
            $(".rt_reorder").find("option").attr("selected",false);
            $(".rt_reorder").find("option[value='0']").attr("selected",true);
            $(".earning_reorder").find("option").attr("selected",false);
            $(".earning_reorder").find("option[value='0']").attr("selected",true);
            $(".lt_reorder").find("option").attr("selected",false);
            $(".lt_reorder").find("option[value='0']").attr("selected",true);
        }
        search();
    })
    $(".earning_reorder").change(function () {
        if($(".earning_reorder").find("option:selected").attr("value")!="0"){
            $(".rt_reorder").find("option").attr("selected",false);
            $(".rt_reorder").find("option[value='0']").attr("selected",true);
            $(".money_reorder").find("option").attr("selected",false);
            $(".money_reorder").find("option[value='0']").attr("selected",true);
            $(".lt_reorder").find("option").attr("selected",false);
            $(".lt_reorder").find("option[value='0']").attr("selected",true);
        }
        search();
    })
    $(".lt_reorder").change(function () {
        if($(".lt_reorder").find("option:selected").attr("value")!="0"){
            $(".rt_reorder").find("option").attr("selected",false);
            $(".rt_reorder").find("option[text='注册时间']").attr("selected",true);
            $(".money_reorder").find("option").attr("selected",false);
            $(".money_reorder").find("option[text='余额']").attr("selected",true);
            $(".earning_reorder").find("option").attr("selected",false);
            $(".earning_reorder").find("option[text='今日输赢']").attr("selected",true);
        }
        search();
    })
    $(".operator").change(function () {
        search();
    })

    $(document).on("click", ".uid", function () {
        // alert(1);
        window.location.href="/UserCenter/userdata?uid="+$(this).text();
    })
}