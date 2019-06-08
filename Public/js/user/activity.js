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
    function addact(obj) {
        $.ajax({
            url: "/Appmsg/addactivity", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                if(res.code=='0'){
                    flashactivitylist();
                }
            }
        });
    }
    function doajax(obj) {
        $.ajax({
            url: "/Appmsg/doactivity", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                if(res.code=='-1'){
                    alert(res.msg);
                }
            }
        });
    }

    function del(id) {
        var con= confirm('确认删除该活动？');
        if(con==true){
            var obj = {id: id, type: 1};
            doajax(obj);
            flashactivitylist();
        }
    }
    function dohide(id,but) {
        var con= confirm('确认隐藏该活动？');
        if(con==true){
            var obj = {id: id, type: 2};
            doajax(obj);
            var tr = but.parentNode;
            tr.innerHTML='<a style="text-decoration: none" class="button border-main" onclick="return doshow(id,this)">显示</a>';
        }
    }
    function doshow(id,but) {
        var con= confirm('确认显示该活动？');
        if(con==true){
            var obj = {id: id, type: 3};
            doajax(obj);
            var tr = but.parentNode;
            tr.innerHTML='<a style="text-decoration: none" class="button border-red" onclick="return dohide(id,this)">隐藏</a>';
        }
    }
    function flashactivitylist(){
        $.ajax({
            url: "/Appmsg/activitylist", type:"post",
            async: "true", data: {}, timeout: 5000, dataType: "json",
            success: function (res) {
                var list = eval(res.activity);
                var table = $('table.on');
                $('.alls').remove();
                for (var i = 0; i < list.length; i++) {
                    var tr = '<tr class="alls"><td>' + list[i]['id'] + '</td><td>' + list[i]['time'] + '</td><td>' + list[i]['title'] +
                        '</td><td>' + list[i]['message'] + '</td><td>' + list[i]['content'] + '</td>';
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
                    tr += '<td><img src="' + list[i]['img'] + '" style="width: 100px"></td>';
                    if(parseInt(list[i]['state'])>0){
                        tr +=  '<td> 显示 </td>'+'<td><div class="button-group"><a style="text-decoration: none" class="button border-red" onclick="return dohide('+list[i]['id']+',this)">隐藏</a></div>'+
                            '<div class="button-group"  style="margin-left: 5px"><a style="text-decoration: none" class="button border-red" onclick="return del('+list[i]['id']+',this)">删除</a></div>'+'</td></tr>';
                    }else {
                        tr +=  '<td> 不显示 </td>'+'<td><div class="button-group"><a style="text-decoration: none" class="button border-main" onclick="return doshow('+list[i]['id']+',this)">显示</a></div>'+
                            '<div class="button-group"  style="margin-left: 5px"><a style="text-decoration: none" class="button border-red" onclick="return del('+list[i]['id']+',this)">删除</a></div>'+'</td></tr>';
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
            addact(data.field);
            return false;
        });
        form.on('select(type)', function(data){
            tz(data.value);
        });
    });
    tz($("#type").val());
    flashactivitylist();
}