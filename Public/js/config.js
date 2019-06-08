$(window).load(function () {
    function tijiao(type,id) {
        var arr={type:type,id:id};

        console.log(arr);
        $.ajax({
            url:"tijiao2", method: "post",
            async: "true", data:arr, timeout: 5000, dataType: "json",
            success: function (data){
                var array = eval(data);
                console.log(array);

                return array['return'];
            }
        })
    }

    $("body").on("click",".tijiao",function(){
        var id=$(this).parent().parent().children().eq(0).text();
        var type=$(this).text();

        var cc=tijiao(type,id);
        console.log(cc);

        if (type=='开启'){
            $(this).parent().html('<button class="button border-red tijiao">关闭</button>');
        }else{
            $(this).parent().html('<button class="button border-green tijiao">开启</button>');
        }

    })

    $("body").on("click",".border-blue",function(){

        var tr=$(this).parent().parent();

        var td=tr.children('td');

        td.contentEditable='true';

    })

})