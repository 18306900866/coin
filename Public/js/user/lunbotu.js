$(document).ready()
{
    function tz(type) {
        if(type==0){
            $("input[name=url]").val('');
            $("input[name=url]").attr('readonly',true);
        }else {
            $("input[name=url]").removeAttr('readonly');
        }
    }
    function addlunbotu(obj) {
        $.ajax({
            url: "/Appmsg/addlunbotu", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                if(res.code=='0'){
                    $("input[name=imgurl]").val('');
                    flashlunbotulist();
                }
            }
        });
    }
    function doajax(obj) {
        $.ajax({
            url: "/Appmsg/dolunbotu", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
            }
        });
    }

    function del(id) {
        var con= confirm('确认删除该活动？');
        if(con==true){
            var obj = {id: id, type: 2};
            doajax(obj);
            flashlunbotulist();
        }
    }
    function sure(id,but) {
        var con= confirm('确认修改该轮播图？');
        if(con==true){
            var table = but.parentNode.parentNode.parentNode;
            var text = table.childNodes;
            var area = text[2];
            var tiaoz = text[3];
            var tzurl = text[4];
            var imgurl = area.childNodes[0].value;
            var tztype = tiaoz.childNodes[0].value;
            var tiaozurl = tzurl.childNodes[0].value;
            var obj = {id: id,imgurl:imgurl,tztype:tztype,tiaozurl:tiaozurl,type:1};
            //console.log(obj);
            doajax(obj);
            area.childNodes[0].setAttribute('readonly',true);
            tiaoz.childNodes[0].setAttribute('readonly',true);
            tzurl.childNodes[0].setAttribute('readonly',true);
            var tr = but.parentNode.parentNode;
            tr.innerHTML='<td style="width: 15%;"><div class="button-group"><a style="text-decoration: none"  class="button border-main" onclick="return editimg('+id+',this)">修改</a></div>'+
                '<div class="button-group" style="margin-left: 5px"><a style="text-decoration: none"  class="button border-red" onclick="return del('+id+',this)">删除</a></div>'+'</td></tr>';
        }
    }
    function editimg(id,but) {
        var table = but.parentNode.parentNode.parentNode;
        var text = table.childNodes;
        var area = text[2];
        var tiaoz = text[3];
        var tzurl = text[4];
        area.childNodes[0].removeAttribute('readonly');
        tiaoz.childNodes[0].removeAttribute('readonly');
        tzurl.childNodes[0].removeAttribute('readonly');
        var tr = but.parentNode.parentNode;
        tr.innerHTML='<td style="width: 15%;"><div class="button-group"><a style="text-decoration: none"  class="button border-main" onclick="return sure('+id+',this)">确认</a></div>'+
            '<div class="button-group" style="margin-left: 5px"><a style="text-decoration: none"  class="button border-red" onclick="return cancel('+id+',this)">取消</a></div>'+'</td></tr>';
    }

    function cancel(id,but) {
        var table = but.parentNode.parentNode.parentNode;
        var text = table.childNodes;
        var area = text[2];
        var tiaoz = text[3];
        var tzurl = text[4];
        area.childNodes[0].setAttribute('readonly',true);
        tiaoz.childNodes[0].setAttribute('readonly',true);
        tzurl.childNodes[0].setAttribute('readonly',true);
        var tr = but.parentNode.parentNode;
        tr.innerHTML='<td style="width: 15%;"><div class="button-group"><a style="text-decoration: none"  class="button border-main" onclick="return editimg('+id+',this)">修改</a></div>'+
            '<div class="button-group" style="margin-left: 5px"><a style="text-decoration: none"  class="button border-red" onclick="return del('+id+',this)">删除</a></div>'+'</td></tr>';
    }

    function flashlunbotulist(){
        $.ajax({
            url: "/Appmsg/lunbotulist", type:"post",
            async: "true", data: {}, timeout: 5000, dataType: "json",
            success: function (res) {
                var list = eval(res.lunbotu);
                var table = $('table.on');
                $('.alls').remove();
                for (var i = 0; i < list.length; i++) {
                    var tr = '<tr class="alls"><td>' + list[i]['id'] + '</td><td>' + list[i]['app'] +
                        '</td><td style="width: 50%;"><textarea class="layui-textarea" readonly style="width: 100%;height: 80px;">' + list[i]['image'] +'</textarea></td>';
                    if(list[i]['type'] ==0){
                        tr += '<td><input class="layui-input" value="不跳转" readonly></td>'
                    }else if(list[i]['type'] ==1){
                        tr += '<td><input class="layui-input" value="内部跳转" readonly></td>'
                    }else {
                        tr += '<td><input class="layui-input" value="外部跳转" readonly></td>'
                    }
                    if(list[i]['url']){
                        tr +=  '<td style="width: 20%;"><input class="layui-input" value="' + list[i]['url'] + '" readonly style="width: 98%;"></td>';
                    }else {
                        tr +=  '<td style="width: 20%;"><input class="layui-input" value="" readonly style="width: 98%;"></td>';
                    }
                    tr +=  '<td style="width: 15%;"><div class="button-group"><a style="text-decoration: none"  class="button border-main" onclick="return editimg('+list[i]['id']+',this)">修改</a></div>'+
                        '<div class="button-group" style="margin-left: 5px"><a style="text-decoration: none"  class="button border-red" onclick="return del('+list[i]['id']+',this)">删除</a></div>'+'</td></tr>';
                    table.append(tr);
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
            addlunbotu(data.field);
            return false;
        });
        form.on('select(type)', function(data){
            tz(data.value);
        });
    });
    tz($("#type").val());
    flashlunbotulist();
}