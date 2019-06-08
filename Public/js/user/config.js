$(document).ready()
{
    function doajax(obj) {
        $.ajax({
            url: "/Appmsg/doconfig", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
            }
        });
    }
    function sure(id,but) {
        var con= confirm('确认修改该配置对象？');
        if(con==true){
            var table = but.parentNode.parentNode.parentNode;
            var text = table.childNodes;
            var area = text[3];
            var tiaoz = text[4];
            var tzurl = text[5];
            var config = area.childNodes[0].value;
            var describe = tiaoz.childNodes[0].value;
            var message = tzurl.childNodes[0].value;
            var obj = {id: id,config:config,describe:describe,message:message};
            //console.log(obj);
            doajax(obj);
            area.childNodes[0].setAttribute('readonly',true);
            tiaoz.childNodes[0].setAttribute('readonly',true);
            tzurl.childNodes[0].setAttribute('readonly',true);
            var tr = but.parentNode.parentNode;
            tr.innerHTML='<td style="width: 15%;"><div class="button-group"><a style="text-decoration: none"  class="button border-main" onclick="return edit('+id+',this)">修改</a></div>'+'</td></tr>';
        }
    }

    function edit(id, but) {
        var table = but.parentNode.parentNode.parentNode;
        var text = table.childNodes;
        var area = text[3];
        var tiaoz = text[4];
        var tzurl = text[5];
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
        var area = text[3];
        var tiaoz = text[4];
        var tzurl = text[5];
        area.childNodes[0].setAttribute('readonly',true);
        tiaoz.childNodes[0].setAttribute('readonly',true);
        tzurl.childNodes[0].setAttribute('readonly',true);
        var tr = but.parentNode.parentNode;
        tr.innerHTML='<td style="width: 15%;"><div class="button-group"><a style="text-decoration: none"  class="button border-main" onclick="return edit('+id+',this)">修改</a></div>'+'</td></tr>';
    }
    function flashtable(tabledata) {
        var table = $('table.on');
        $('.alls').remove();
        for (var i = 0; i < tabledata.length; i++) {
            var tr = '<tr class="alls"><td>' + tabledata[i]['id'] + '</td><td>' + tabledata[i]['object'] + '</td><td>' + tabledata[i]['type'] + '</td>';
            tr +=  '<td><input class="layui-input" value="' + tabledata[i]['config'] + '" readonly></td>';
            tr +=  '<td><input class="layui-input" value="' + tabledata[i]['describe'] + '" readonly></td>';
            tr +=  '<td><input class="layui-input" value="' + tabledata[i]['message'] + '" readonly></td>';
            tr +=  '<td style="width: 15%;"><div class="button-group"><a style="text-decoration: none"  class="button border-main" onclick="return edit('+tabledata[i]['id']+',this)">修改</a></div>'+'</td></tr>';
            table.append(tr);
        }
    }
    function getdownlist(obj) {
        $.ajax({
            url: "/Appmsg/configlist", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                flashtable(res.configlist);
            }
        });
    }
    getdownlist(null);
}