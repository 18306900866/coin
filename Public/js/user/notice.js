$(document).ready()
{
    //kg = false;
    function tz(type) {
        if(type==0){
            $("input[name=url]").val('无');
            $("input[name=url]").attr('readonly',true);
        }else {
            $("input[name=url]").removeAttr('readonly');
        }
    }
    function Ajax(obj) {
        $.ajax({
            url: "/Appmsg/addnotice", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                if(res.code=='0'){
                    flashnoticcelist();
                }
            }
        });
    }
    function doajax(obj) {
        $.ajax({
            url: "/Appmsg/donotice", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                if(res.code=='0'){
                    flashnoticcelist();
                }else {
                    alert(res.msg);
                }
            }
        });
    }

    function del(id) {
        var con= confirm('确认删除该公告？');
        if(con==true){
            var obj = {id: id, type: 1};
            doajax(obj);
        }
    }
    function qxtop(id) {
        var con= confirm('确认取消置顶？');
        if(con==true){
            var obj = {id: id, type: 2};
            doajax(obj);
        }
    }
    function dotop(id) {
        var con= confirm('确认置顶该公告？');
        if(con==true){
            var obj = {id: id, type: 3};
            doajax(obj);
        }
    }
    function flashnoticcelist(){
        $.ajax({
            url: "/Appmsg/noticelist", type:"post",
            async: "true", data: {}, timeout: 5000, dataType: "json",
            success: function (res) {
                var list = eval(res.notice);
                var table = $('table.on');
                $('.alls').remove();
                for (var i = 0; i < list.length; i++) {
                    var tr = '<tr class="alls"><td>' + list[i]['id'] + '</td><td>' + list[i]['time'] + '</td><td>' + list[i]['title'] +
                        '</td><td>' + list[i]['message'] + '</td>';
                    if(list[i]['type'] ==0){
                        tr += '<td>  不跳转  </td>'
                    }else if(list[i]['type'] ==1){
                        tr += '<td>  内部跳转  </td>'
                    }else {
                        tr += '<td>  外部跳转  </td>'
                    }
                    if(list[i]['url']){
                        tr +=  '<td>' + list[i]['url'] + '</td>';
                    }else {
                        tr +=  '<td>' + '' + '</td>';
                    }
                    if(list[i]['state']==1){
                        tr += '<td> 正常 </td>'+'<td><div class="button-group"><a style="text-decoration: none" class="button border-red" onclick="return del('+list[i]['id']+',this)">删除</a></div>'+
                            '<div class="button-group" style="margin-top:5px"><a style="text-decoration: none" class="button border-main" onclick="return dotop('+list[i]['id']+',this)">置顶</a></div>'+'</td></tr>';
                    }else {
                        tr += '<td> 置顶 </td>'+'<td><div class="button-group"><a style="text-decoration: none" class="button border-red" onclick="return del('+list[i]['id']+',this)">删除</a></div>'+
                            '<div class="button-group" style="margin-top:5px"><a style="text-decoration: none" class="button border-main" onclick="return qxtop('+list[i]['id']+',this)">取消置顶</a></div>'+'</td></tr>';
                    }
                    table.append(tr);
                }
            }
        });
    }
    layui.use('form', function() {
        var form = layui.form
        //监听指定开关
//            form.on('switch(top)', function(data){
//
//            });
        //监听提交
        form.on('submit(formDemo)', function(data){
            Ajax(data.field);
            return false;
        });
        form.on('select(type)', function(data){
            tz(data.value);
        });
    });
    tz($("#type").val());
    flashnoticcelist();
}