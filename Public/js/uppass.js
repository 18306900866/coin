$(window).load(function() {

    $(function () {
        $(".bg-main").on("click",function () {
            var name=$('.mmmmmm').text();
            var mpass=$('.mpass').val();
            var newpass=$('.newpass').val();
            var obj={name:name,old:mpass,new:newpass}
            $.ajax({
                url: "Ajaxup", method: "post", async: "true",
                data:obj, timeout: 50000, dataType: "json",
                success: function (data) {
                    switch(data){
                        case 0:
                            alert("修改失败,原密码错误！");
                            break;
                        case 1:
                            alert("修改成功！");
                            break;
                    }
                }
            });
        })
        $(".bg-main").on("tap",function () {
            var name=$('.mmmmmm').text();
            var mpass=$('.mpass').val();
            var newpass=$('.newpass').val();
            var obj={name:name,old:mpass,new:newpass}
            $.ajax({
                url: "Ajaxup", method: "post", async: "true",
                data:obj, timeout: 50000, dataType: "json",
                success: function (data) {
                    switch(data){
                        case 0:
                            alert("修改失败,原密码错误！");
                            break;
                        case 1:
                            alert("修改成功！");
                            break;
                    }
                }
            });
        })
    })
})