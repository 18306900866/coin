$(document).ready()
{
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        //时间选择器
        laydate.render({
            elem: '#time1'
            ,type: 'datetime'
        });
    })
    function renderForm(){
        layui.use('form', function(){
            var form = layui.form;
            form.render();
        });
    }
    function loadczname() {
        $.ajax({
            url: "/Appmsg/loadallcz", type: "post",
            async: "true", data: null, timeout: 5000, dataType: "json",
            success: function (res) {
                var list = eval(res.allcz);
                var type = $("select#cname");
                for (var i = 0; i < list.length; i++) {
                    type.append("<option>" + list[i]['czname'] + "</option>");
                    renderForm();
                }
            }
        });
    }
    function addwinning(obj) {
        $.ajax({
            url: "/Appmsg/addwinning", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                layer.alert(res.msg,{title:'最终的提交结果'});
            }
        });
    }
    layui.use(['form','layer'], function() {
        var form = layui.form,
            layer = layui.layer;
        //监听提交
        form.on('submit(formDemo)', function(data){
//                layer.alert(JSON.stringify(data.field), {
//                    title: '最终的提交信息'
//                })
            addwinning(data.field);
            return false;
        });
    });
    loadczname();
}