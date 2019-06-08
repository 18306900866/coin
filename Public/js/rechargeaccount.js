/**
 * Created by admin on 2017/6/2.
 */
$(window).load(function () {
    $(document).on("click", ".fenghao", function () {
        var f = $(this);
        var id = $(this).parent().parent().children().eq(0).text();
        if (confirm("确定停用该账号?")) {
            $.post('editrecharge', {id: id, state: 0, type: "fenghao"}, function (data) {
                var list = JSON.parse(data);
                if (list['result'] == 1) {
                    f.parent().parent().children().eq(9).text("停用中");
                    f.addClass("btn-primary").removeClass("btn-danger")
                    f.addClass("jiefeng").removeClass("fenghao")
                    f.children().eq(0).text("启用");
                    alert('修改成功')
                } else {
                    alert('修改失败')
                }

            })
        }
    })
    $(document).on("click", ".jiefeng", function () {
        var f = $(this);
        var id = $(this).parent().parent().children().eq(0).text();
        if (confirm("确定恢复该账号?")) {
            $.post('editrecharge', {id: id, state: 1, type: "fenghao"}, function (data) {
                var list = JSON.parse(data);
                if (list['result'] == 1) {
                    f.parent().parent().children().eq(9).text("使用中");
                    f.addClass("btn-danger").removeClass("btn-primary")
                    f.addClass("fenghao").removeClass("jiefeng")
                    f.children().eq(0).text("停用");
                    alert('修改成功')
                } else {
                    alert('修改失败')
                }
            })
        }
    })
    $(document).on("click", ".delete", function () {
        var f = $(this);
        var id = $(this).parent().parent().children().eq(0).text();
        if (confirm("确定删除该账号?")) {
            $.post('editrecharge', {id: id, state: 0, type: "delete"}, function (data) {
                var list = JSON.parse(data);
                if (list['result'] == 1) {
                    f.parent().parent().remove();
                    alert('删除成功')
                } else {
                    alert('删除失败')
                }
            })
        }
    })
    $(document).on("change", ".bankname", function () {
        var f = $(this);
        var newbank = $(this).find("option:selected").text();
        if (newbank != '请选择银行') {
            $.post('bank_img', {bank: newbank}, function (data) {
                var list = JSON.parse(data);
                var path = list['img'];
                f.parent().parent().children().eq(8).children().eq(0).attr('src', path);
            })
        }
    })
    $(document).on("click", ".edit", function () {
        var f = $(this);
        var id = f.parent().parent().children().eq(0).text();
        var bank = f.parent().parent().children().eq(2).text();
        var newbank = $(this).parent().parent().children().eq(3).children().eq(0).find("option:selected").text();
        var name = f.parent().parent().children().eq(5).text();
        var newname = f.parent().parent().children().eq(4).children().eq(0).val();
        var account = f.parent().parent().children().eq(7).text();
        var newaccount = f.parent().parent().children().eq(6).children().eq(0).val();
        if (newbank == '请选择银行') {
            newbank = bank;
        }
        // alert('旧银行:' + bank + ',新银行:' + newbank + ',旧名字:' + name + ",新名字:" + newname + ",旧帐号:" + account + ",新账号:" + newaccount);
        if (bank == newbank && name == newname && account == newaccount) {
            alert('无需修改');
        } else {
            if(confirm("确认修改?")){
                $.post('editrecharge', {
                    id: id,
                    bank: bank,
                    newbank: newbank,
                    name: name,
                    newname: newname,
                    account: account,
                    newaccount: newaccount,
                    type: "edit"
                }, function (data) {
                    var list = JSON.parse(data);
                    var result = list['result'];
                    if (result == 1) {
                        alert("操作成功")
                        f.parent().parent().children().eq(5).text(newname);
                        f.parent().parent().children().eq(7).text(newaccount);
                        f.parent().parent().children().eq(2).text(newbank);
                    } else {
                        alert('操作失败')
                    }
                })
            }

        }
    })
    $(document).on("click", ".add", function () {
        var bank = $(".addbank").find("option:selected").text();
        var name = $(".addname").val();
        var account = $(".addaccount").val();
        var type = $(this).parent().parent().children().eq(0).text();
        var logo = $(this).parent().parent().children().eq(4).children()[0].src;
        if (bank == "请选择银行" || name == '' || account == '') {
            alert("请完善信息");
        } else {
            if (confirm("确定添加该账号?")) {
                $.post('add_account', {
                    bank: bank,
                    name: name,
                    account: account,
                    class: type,
                    logo: logo
                }, function (data) {
                    var list = JSON.parse(data);
                    if (list['result'] == 1) {
                        var table = $(".account_message");
                        var option = "<option>请选择银行</option>";
                        var bank = list['bank'];
                        for (var i = 0; i < bank.length; i++) {
                            option += "<option>" + bank['bank'] + "</option>";
                        }
                        var record = list['record'][0];
                        var select = "<select class='bankname'>" + option + "</select>"
                        var tr = '<tr class="alls"><td>' + record['id'] + '</td><td>' + record['class'] + '</td><td>' + record['type'] + '</td>' +
                            '<td>' + select + '</td><td><input class="name" value=' + record['name'] + '></td><td style="display: none">' + record['name'] + '</td><td><input class="account" value=' + record['account'] + '></td><td style="display: none">' + record['account'] + '</td><td><img src=' + record['logo'] + '></td><td>使用中</td><td> <button class="btn btn-sm btn-danger margin_top20  fenghao vertical_al_midd" type="submit"> <strong>停用</strong></button><button class="btn btn-sm btn-warning margin_top20  edit vertical_al_midd" type="submit"> <strong>修改</strong> </button> <button class="btn btn-sm btn-default margin_top20  delete vertical_al_midd" type="submit"> <strong>删除</strong> </button></td></tr>';
                        table.prepend(tr);
                        alert('添加成功')
                    } else {
                        alert('添加失败')
                    }
                })
            }
        }
    })
    $(document).on("change", ".addbank", function () {
        var f = $(this);
        var newbank = $(this).find("option:selected").text();
        if (newbank != '请选择银行') {
            $.post('bank_img', {bank: newbank}, function (data) {
                var list = JSON.parse(data);
                var path = list['img'];
                f.parent().parent().children().eq(4).children().eq(0).attr('src', path);
            })
        }
    })
})