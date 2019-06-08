$(window).load(function(){
    $(".sousuo").focus(function(){
        $(this).addClass("hover")
    })
    $(".sousuo").blur(function(){
        $(this).removeClass("hover")
    })
    $(".yh_bt_sousuo").click(function () {
        var uid = $("input.sousuo").val()
        if (uid==null||uid==undefined||uid==''){
            return;
        }
        $(".groups").text('');
        $(".bets").text('');
        $(".wins").text('');
        $(".recharge").text('');
        $(".txs").text('');
        $(".acts").text('');
        $.ajax({
            url: "/UserCenter/groupsearch", type: "post",
            async: "true", data: {uid:uid}, timeout: 5000, dataType: "json",
            success: function (res) {
                if(res.code=='0'){
                    var group = res.group;
                    $(".groups").text(group['users']);
                    $(".bets").text(group['bets']);
                    $(".wins").text(group['wins']);
                    $(".recharge").text(group['recharge']);
                    $(".txs").text(group['txs']);
                    $(".acts").text(group['acts']);
                }else {
                    alert(res.msg);
                }
            }
        });
    })
})