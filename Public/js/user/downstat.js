$(document).ready()
{
    layui.use(['form','layer'], function() {
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(formDemo)', function(data){
//                layer.alert(JSON.stringify(data.field), {
//                    title: '最终的提交信息'
//                })
            getdownlist(data.field);
            return false;
        });
    });
    function flushpage(pageCount,searchdata,url) {
        if(searchdata!=null){
            var ip = searchdata.ip;
            var nation = searchdata.nation;
            var area = searchdata.area;
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
                                'ip': ip,
                                'nation':nation,
                                'area':area
                            },
                            type:"post",
                            dataType:"json",
                            url: url,
                            success: function (res) {
                                flashtable(res.downlist);
                            }
                        });
                    }
                }
            });
        });
    }
    function flashtable(tabledata) {
        var table = $('table.on');
        $('.alls').remove();
        for (var i = 0; i < tabledata.length; i++) {
            var tr = '<tr class="alls"><td>' + tabledata[i]['id'] + '</td><td>' + tabledata[i]['ip'] + '</td><td>' + tabledata[i]['time'] +
                '</td><td>' + tabledata[i]['nation'] + '</td><td>' + tabledata[i]['area'] + '</td>';
            table.append(tr);
        }
    }
    function getdownlist(obj) {
        $.ajax({
            url: "/Downstat/downlist", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                flashtable(res.downlist);
                flushpage(res.dcount,obj,"/Downstat/downlist");
            }
        });
    }
    getdownlist(null);
}