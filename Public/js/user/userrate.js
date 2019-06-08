$(document).ready()
{
    layui.use(['form','layer'], function() {
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(formDemo)', function(data){
            // layer.alert(JSON.stringify(data.field), {
            //     title: '最终的提交信息'
            // })
            getratelist(data.field);
            return false;
        });
    });
    function flushpage(pageCount,searchdata,url) {
        if(searchdata!=null){
            var uid = searchdata.uid;
        }
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
                        $.ajax({
                            //这里省略了ajax数据交互
                            async:true,
                            data: {
                                'pageNo': curr,
                                'uid': uid,
                            },
                            type:"post",
                            dataType:"json",
                            url: url,
                            success: function (res) {
                                flashtable(res.ratelist);
                            }
                        });
                    }
                }
            });
        });
    }

    function edit(uid,but) {
        var rate = $(".rate").val();
        var pinlv = $(".pinlv").val();
        var type = $(".type").val();
        if(pinlv<0||pinlv>2){
            alert('频率数值必须为0或1或2');
            return;
        }
        if(type<0||type>1){
            alert('返点类型数值必须为0或1');
            return;
        }
        if(rate<=20&&rate>0){
            $.ajax({
                url: "/UserCenter/setrate", type:"post",
                async: "true", data: {uid:uid,rate:rate,pinlv:pinlv,type:type}, timeout: 5000, dataType: "json",
                success: function (res) {
                    alert(res.msg);
                }
            });
        }else {
            alert('返点数值范围必须在1~20之内');
            return;
        }

    }
    function flashtable(tabledata) {
        var table = $('table.on');
        $('.alls').remove();
        for (var i = 0; i < tabledata.length; i++) {
            var tr = '<tr class="alls"><td>' + tabledata[i]['uid'] + '</td>';
            if(tabledata[i]['state'] == 1) tr += "<td><div class='switch-sw switch-on'><div class='switch-a' data-state='1' data-type='state' data-stateid='"+tabledata[i]['uid']+"'>已开启</div></div></td>";
            if(tabledata[i]['state'] == 0) tr += "<td><div class='switch-sw switch-on'><div class='switch-b' data-state='0' data-type='state' data-stateid='"+tabledata[i]['uid']+"'>已关闭</div></div></td>";
            tr +=  '<td><input class="layui-input rate" type="number" style="width: 40%;" value="' + tabledata[i]['rate'] + '"></td>';
            tr +=  '<td><input class="layui-input pinlv" type="number" style="width: 40%;" value="' + tabledata[i]['pinlv'] + '"></td>';
            tr +=  '<td><input class="layui-input type" type="number" style="width: 40%;" value="' + tabledata[i]['type'] + '"></td>';
            tr += '<td><div class="button-group" style="float: left;margin-left: 10px;"><a style="text-decoration: none"  class="button border-main" onclick="return edit('+tabledata[i]['uid']+',this)">修改</a></div>'+'</td></tr>';
            table.append(tr);
        }
    }
    function getratelist(obj) {
        $.ajax({
            url: "/UserCenter/getratelist", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                flashtable(res.ratelist);
                flushpage(res.dcount,obj,"/UserCenter/getratelist");
            }
        });
    }
    getratelist(null);

    function setswitch(stat,but) {
        if(stat == 0){
            but.removeClass();
            but.addClass('switch-b');
            but.attr('data-state','0');
            but.html('');
            but.html('已关闭');
        }else{
            but.removeClass();
            but.addClass('switch-a');
            but.attr('data-state','1');
            but.html('');
            but.html('已开启');
        }
    }
    //彩种开关合买开关
    $("body").on("click",".switch-on",function() {
        var swt = $(this).children('div');
        var state = swt.attr('data-state');
        var stateid = swt.attr('data-stateid');
        // var claa = $(this).children('div').attr('data-state','0');
        //alert(stateid);
        if (state == '1') {
            var netstate = 0;
        } else {
            var netstate = 1;
        }
        var dataa = {
            uid: stateid,
            state: netstate,
        }
        $.ajax({
            url: "/UserCenter/setstate", type: "post",
            async: "true", data: dataa, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                //console.log(swt);
                setswitch(res.sttr, swt);
            }
        });
    });
}