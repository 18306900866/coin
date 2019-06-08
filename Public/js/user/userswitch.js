$(document).ready()
{

    function Ajax(obj) {
        $.ajax({
            url: "/UserCenter/addtestID", type:"post",
            async: "true", data: obj, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                if(res.code=='0'){
                    flashtestId();
                }
            }
        });
    }
    $(".test_ID").click(function () {
        tid = $("input[name=tid]").val();
        if(tid=='1'){
            alert('请不要添加ID为1的测试号');
            return;
        }
        if(tid==''){
            alert('请输入要添加的测试号ID');
        }else {
            obj = {tid:tid};
            Ajax(obj)
        }
    });
    function flashtestId() {
        $.ajax({
            url: "/UserCenter/gettestId", type:"post",
            async: "true", data: {}, timeout: 5000, dataType: "json",
            success: function (res) {
                var tlist = eval(res.testlist);
                $("#usertype option").remove();
                for(var i = 0; i < tlist.length; i++){
                    var id = tlist[i]["id"];
                    $("#usertype").append("<option value='"+id+"'>"+id+"</option>");
                }
            }
        });
    }
    $(".deltest").click(function () {
        var tid = $("#usertype").val();
//            alert(tid);
        $.ajax({
            url: "/UserCenter/deletetest", type: "post",
            async: "true", data: {tid: tid}, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                if(res.code=='0'){
                    flashtestId();
                }
            }
        });
    });
    function huifu(uid,but) {
        $.ajax({
            url: "/UserCenter/recovery", type: "post",
            async: "true", data: {uid:uid}, timeout: 5000, dataType: "json",
            success: function (res) {
                alert(res.msg);
                if(res.code=='0'){
                    flashtestId();
                    flashqhlist();
                }
            }
        });
    }
    function flashqhlist() {
        $.ajax({
            url: "/UserCenter/qhlist", type:"post",
            async: "true", data: {}, timeout: 5000, dataType: "json",
            success: function (res) {
                var tabledata = eval(res.qhlist);
                var table = $('table.on');
                $('.alls').remove();
                for (var i = 0; i < tabledata.length; i++) {
                    var tr = '<tr class="alls"><td>' + tabledata[i]['formal'] + '</td><td>' + tabledata[i]['test'] + '</td><td>' + tabledata[i]['time'] + '</td>';
                    tr += '<td><div class="button-group" style="float: left;margin-left: 10px;"><a style="text-decoration: none"  class="button border-main" onclick="return huifu('+tabledata[i]['formal']+',this)">恢复</a></div>'+'</td></tr>';
                    table.append(tr);
                }
            }
        });
    }
    $(".switch").click(function () {
        var tet = $("#usertype").val();
        var user = $("input[name=uid]").val();
        //alert(user);
        if(user!=''){
            if(tet!='') {
                $.ajax({
                    url: "/UserCenter/userqiehuan", type: "post",
                    async: "true", data: {testid: tet,uid:user}, timeout: 5000, dataType: "json",
                    success: function (res) {
                        alert(res.msg);
                        if(res.code=='0'){
                            flashtestId();
                        }
                    }
                });
            }else {
                alert('请选择要切换的测试号');
            }
        }else {
            alert('请输入要切换的用户ID');
        }
    });
    flashtestId();
    flashqhlist();
}