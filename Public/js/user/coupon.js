$(document).ready()
{
    var curr = 1;
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //时间选择器
        laydate.render({
            elem: '#date1'
            , type: 'date'
        });
        laydate.render({
            elem: '#date2'
            , type: 'date'
        });
    })
    $(".coupon_add").click(function () {
        title = $("input[name=title]").val();
        type = $("input[name=type]").val();
        cmoney = $("input[name=cmoney]").val();
        lmoney = $("input[name=lmoney]").val();
        origin = $("input[name=origin]").val();
        lose = $("input[name=lose]").val();
        uid = $("input[name=uid]").val();
        introduce = $("textarea[name=introduce]").val();
        if(title==''){ alert('请输入标题内容');return;}
        if(type==''){ alert('请输入优惠券类型');return;}
        if(cmoney==''){ alert('请输入优惠金额');return;}
        if(lmoney==''){ alert('请输入限制使用金额');return;}
        if(origin==''){ alert('请输入成效日期');return;}
        if(lose==''){ alert('请输入失效日期');return;}
        if(uid==''){ alert('请输入所属用户ID组');return;}
        if(introduce==''){ alert('请输入优惠券介绍内容');return;}
        var arr={title:title,type:type,cmoney:cmoney,lmoney:lmoney,origin:origin,lose:lose,uid:uid,introduce:introduce}
        $.ajax({
            url: "/UserCenter/couponadd", method: "post",
            async: "true", data: arr, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                $("input[name=uid]").val('');
                updatelist(paixu);
            },
            error:function(){
                alert('添加失败');
            }
        });
    });
    $(".cancel").click(function () {
        $("input[name=title]").val('');
        $("input[name=type]").val('');
        $("input[name=cmoney]").val('');
        $("input[name=lmoney]").val('');
        $("input[name=origin]").val('');
        $("input[name=lose]").val('');
        $("input[name=uid]").val('');
        $("textarea[name=introduce]").val('');
    })
    function Ajax(obj) {
        $.ajax({
            url: "/UserCenter/cpstate", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                if(res.code=='0'){
                    alert('操作成功')
                }else {
                    alert('操作失败')
                }
            }
        });
    }
    function qux(id, but) {
        var con= confirm('确认取消？');
        if(con==true){
            var obj = {id: id, type: 1};
            Ajax(obj);
            var tr = but.parentNode;
            tr.innerHTML='<a style="text-decoration: none" class="button border-main" onclick="return qiyon(id,this)">启用</a>';
        }
    }
    function qiyon(id, but) {
        var con= confirm('确认启用？');
        if(con==true){
            var obj = {id: id, type: 2};
            Ajax(obj);
            var tr = but.parentNode;
            tr.innerHTML='<a style="text-decoration: none" class="button border-red" onclick="return qux(id,this)">取消</a>';
        }
    }
    function del(id) {
        var con= confirm('确认删除？');
        if(con==true){
            var obj = {id: id, type: 3};
            Ajax(obj);
            updatelist(paixu);
        }
    }
    function tableshow(tabledata) {
        var list = eval(tabledata['list']);
        var table = $('table.on');
        $('.alls').remove();
        for (var i = 0; i < list.length; i++) {
            var tr = '<tr class="alls"><td>' + list[i]['id'] + '</td><td>' + list[i]['type'] + '</td><td>' + list[i]['title'] + '</td><td class="soc">' + list[i]['origin'] +
                '</td><td class="soc">' + list[i]['lose'] + '</td><td  class="soc">' + parseFloat(list[i]['money']).toFixed(2) + '</td><td  class="soc">' + parseFloat(list[i]['limit']).toFixed(2) +
                '</td><td>' + list[i]['uid'] + '</td><td>' + list[i]['state'] + '</td>';
            if (list[i]['action'] ==1 ) {
                tr+='<td><div class="button-group"><a style="text-decoration: none" class="button border-red" onclick="return qux('+list[i]['id']+',this)">取消</a></div></td></tr>';
            }else if(list[i]['action'] ==2){
                tr+='<td><div class="button-group"><a style="text-decoration: none" class="button border-main" onclick="return qiyon('+list[i]['id']+',this)">启用</a></div></td></tr>';
            }else {
                tr+='<td><div class="button-group"><a style="text-decoration: none" class="button border-red" onclick="return del('+list[i]['id']+',this)">删除</a></div></td></tr>';
            }
            table.append(tr);
        }
    }
    function flushpage(pageCount,order,url) {
        layui.use(['laypage', 'layer'], function() {
            var laypage = layui.laypage
                , layer = layui.layer;
            //完整功能
            laypage.render({
                elem: 'demo'
                ,count: pageCount
                ,limit: 12
                ,curr: curr
                ,layout: ['count', 'prev', 'page', 'next', 'skip']
                ,jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //一定要加此判断，否则初始时会无限刷新
                        curr = obj.curr;
                        var self  = this;
                        $.ajax({
                            //这里省略了ajax数据交互
                            async:true,
                            data: {
                                'pageNo': curr,
                                'order' : order
                            },
                            type:"post",
                            dataType:"json",
                            url: url,
                            success: function (res) {
                                if(res.code=='0'){
                                    tableshow(res.tabledata);
                                }
                            }
                        });
                    }
                }
            });
        });
    }
    function updatelist(order) {
        var obj = {order:order,pageNo:curr};
        $.ajax({
            url: "/UserCenter/couponlist", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                if(res.code=='0'){
                    tableshow(res.tabledata);
                    $("#demo").css('display','block');
                    flushpage(parseInt(res.tabledata['count']),order, '/UserCenter/couponlist');
                }else {
                    $("#demo").css('display','none');
                }
            }
        });
    }
    updatelist('');
    //排序事件方法
    var paixu;
    $("body").on("click","thead tr .soc",function(){
        if($(this).find(".sorting_ascss").hasClass("on")){
            $(".table thead tr .soc").each(function(){
                $(this).find(".sorting_ascss").removeClass("on");
                $(this).find(".sorting_ascss").removeClass("tw");
            })
            paixu="asc/"
            $(this).find(".sorting_ascss").addClass("tw");

        }else{
            $(".table thead tr .soc").each(function(){
                $(this).find(".sorting_ascss").removeClass("on");
                $(this).find(".sorting_ascss").removeClass("tw");
            })
            $(this).find(".sorting_ascss").addClass("on");
            paixu="desc/"
        }
        paixu = paixu + $(this).attr('val');
        //console.log(title);
        updatelist(paixu);
    })
}