$(window).load(function() {

    $('input.input').keyup(function(){
        var c=$(this);
        if(/[^\d]/.test(c.val())){//替换非数字字符
            var temp_amount=c.val().replace(/[^\d]/g,'');
            $(this).val(temp_amount);
        }
    })

    $("#user").blur(function(){
        var id=$("#user").val();
        var obj = {uid: id };
        if(id.length>0){
            $.ajax({
                url: "money",
                method: "post", async: "true", data: obj,
                timeout: 15000, dataType: "json",
                success: function (data) {
                    if(data<0){
                        $('#span_m').text('用户不存在');
                    }else{
                        $('#span_m').text('用户余点：'+data);
                    }
                }
            })
        }else {
            $('#span_m').text(' ');
        }
    });
    function Ajax(a,b,c) {
        var obj = {uid: a, money: b, type: c};
        $.ajax({
            url: "submit",
            method: "post", async: "true", data: obj,
            timeout: 15000, dataType: "json",
            success: function (data) {
                switch(data) {
                    case 0:
                        alert('用户不存在！')
                        break;
                    case 1:
                        alert('操作成功！')
                        break;
                    case 2:
                        alert('用户余额不足！')
                        break;
                }
            }
        })
    }
    $('#bus').on('click', function(){
        if (confirm('确认执行该操作？')==true){
            var user=$('#user').val();
            var money=$('#money').val();
            var dradio=$('input:radio[name="dradio"]:checked').val();
            if(user==''||money==''){
                alert('用户ID或金额不能为空！');
            }else if(dradio==null){
                alert('类型不能为空！');
            }else {
                Ajax(user,money,dradio);
                var obj = {uid: user };
                $.ajax({
                    url: "money",
                    method: "post", async: "true", data: obj,
                    timeout: 15000, dataType: "json",
                    success: function (data) {
                            $('#span_m').text('用户余点：'+data);
                    }
                })
            }
        }
    })
    $('#bus').on("tap", function(){
        if (confirm('确认执行该操作？')==true){
            var user=$('#user').val();
            var money=$('#money').val();
            var dradio=$('input:radio[name="dradio"]:checked').val();
            if(user==''||money==''){
                alert('用户ID或金额不能为空！');
            }else if(dradio==null){
                alert('类型不能为空！');
            }else {
                Ajax(user,money,dradio);
                var obj = {uid: user };
                $.ajax({
                    url: "money",
                    method: "post", async: "true", data: obj,
                    timeout: 15000, dataType: "json",
                    success: function (data) {
                        $('#span_m').text('用户余点：'+data);
                    }
                })
            }
        }
    })

})
