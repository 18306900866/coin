$(document).ready()
{
    //重新渲染表单
    function renderForm(){
        layui.use('form', function(){
            var form = layui.form;
            form.render();
        });
    }
    function downloadcztype() {
        $.ajax({
            url: "/Appmsg/loadcz", type: "post",
            async: "true", data: null, timeout: 5000, dataType: "json",
            success: function (res) {
                var list = eval(res.cztype);
                var type = $("select#cztype");
                console.log($("#type"));
                for (var i = 0; i < list.length; i++) {
                    type.append("<option>" + list[i]['czname'] + "</option>");
                    renderForm();
                }
            }
        });
    }
    function flashtable(tabledata) {
        var list = eval(tabledata);
        var table = $('table.on');
        $('.alls').remove();
        for (var i = 0; i < list.length; i++) {
            var tr = '<tr class="alls"><td>' + list[i]['id'] + '</td><td>' + list[i]['time'] + '</td><td>' + list[i]['cname'] +
                '</td><td>' + list[i]['title'] + '</td>';
            tr += '<td><div class="button-group"><a style="text-decoration: none" class="button border-main" href="'+list[i]['url']+'" target="_blank">查看内容</a></div></td>';
            tr += '<td><div class="button-group"><a style="text-decoration: none" class="button border-red" onclick="return del('+list[i]['id']+')" >删除</a></div></td></tr>';
            table.append(tr);
        }
    }
    function flushpage(pageCount,url) {
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
                        curr = obj.curr;
                        var self  = this;
                        $.ajax({
                            //这里省略了ajax数据交互
                            async:true,
                            data: {
                                'pageNo': curr,
                            },
                            type:"post",
                            dataType:"json",
                            url: url,
                            success: function (res) {
                                flashtable(res.forecast);
                            }
                        });
                    }
                }
            });
        });
    }
    function addforc(obj) {
        $.ajax({
            url: "/Appmsg/addforecast", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                if(res.code=='0'){
                    flashforecastlist();
                }
            }
        });
    }
    function doajax(obj) {
        $.ajax({
            url: "/Appmsg/doforecast", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                if(res.code=='-1'){
                    alert(res.msg);
                }
            }
        });
    }

    function del(id) {
        var con= confirm('确认删除该条预测？');
        if(con==true){
            var obj = {id: id};
            doajax(obj);
            flashforecastlist();
        }
    }
    function flashforecastlist(){
        $.ajax({
            url: "/Appmsg/forecastlist", type:"post",
            async: "true", data: {}, timeout: 5000, dataType: "json",
            success: function (res) {
                if(parseInt(res.cout)>0){
                    flashtable(res.forecast);
                    $("#demo").css('display','block');
                    flushpage(res.cout,"/Appmsg/forecastlist");
                }else {
                    $("#demo").css('display','none');
                }
            }
        });
    }

    layui.use('form', function() {
        var form = layui.form
        //监听提交
        form.on('submit(formDemo)', function(data){
//                layer.alert(JSON.stringify(data.field), {
//                    title: '最终的提交信息'
//                })
            var aa =$("textarea.note-codable").val()
            var postdata = data.field;
            postdata['content'] = encodeURI(aa);
            //console.log(postdata);
            addforc(postdata);
            return false;
        });
    });
    flashforecastlist();
    downloadcztype();
}