//无刷新替换表格 和分页
$(window).load(function() {
	var title;
	$("body").on("click","thead tr .soc",function(){
		if($(this).find(".sorting_ascss").hasClass("on")){
			$(".table thead tr .soc").each(function(){
			
			$(this).find(".sorting_ascss").removeClass("on");
			$(this).find(".sorting_ascss").removeClass("tw");
		})
			
		title="升序/"
		$(this).find(".sorting_ascss").addClass("tw");
		
		}else{
			$(".table thead tr .soc").each(function(){
			
			$(this).find(".sorting_ascss").removeClass("on");
			$(this).find(".sorting_ascss").removeClass("tw");
		})
			$(this).find(".sorting_ascss").addClass("on");
			title="降序/"
		}
		
		
		

		title = title + $(this).text();
		console.log(title)
		
	})
})
//初始访问
$(window).load(function() {
	var dataa = {
		page:'',
	};
	if(url == 'showlist'){
		dataa = {
			czname:czname,
			cztype:cztype,
			issue:''
		};

		var urlcel = 'shuai';
		ajaxone(urlcel,dataa);
	}
	console.log(dataa)
	ajax(url,dataa);



//第二次访问 分页
$("body").on("click",".button",function(){
	var pagenum = $(this).html();
	var moye = $('.pagenum').attr('data-num');
	if(pagenum == '首页') pagenum = 1;
	if(pagenum == '尾页') pagenum = moye;
	if(pagenum == '跳转'){
		pagenum = $('.pagenum').val();
		if(Number(pagenum) > Number(moye)) {
			alert('不能大于尾页数');return;
		}
	}


	var dataa = sco();
	if(pagenum == '彩种排序'){
		var a = $(this).parent().parent().children('td');
		dataa = '';
		var dataa = ssc(a);
	}

	if(pagenum == '彩种图片修改'){
		var a = $(this).parent().parent().children('td');
		dataa = '';
		var dataa = ssc(a);
	}
	if(pagenum == '图片修改'){
		var a = $(this).parent().parent().children('td');
		dataa = '';
		var dataa = ssc(a);
	}

	if(pagenum == '通过'){
		var a = $(this).parent().parent().children('td');
		dataa = '';
		var dataa = ssc(a);
	}

	if(pagenum == '拒绝'){
		var a = $(this).parent().parent().children('td');
		dataa = '';
		var dataa = ssc(a);
	}

	if(pagenum == '重置'){
		var a = $(this).parent().parent().children('td');
		dataa = '';
		var dataa = ssc(a);
	}

	if(pagenum == '修改'){
		var a = $(this).parent().parent().children('td');
		dataa = '';
		var dataa = ssc(a);
	}

	if(pagenum == '彩种类型倍率修改'){
		var a = $(this).parent().parent().children('td');
		ssc(a);
		return;
	}

	if(pagenum == '彩种返点修改'){
		var a = $(this).parent().parent().children('td');
		ssc(a);
		return;
	}

	if(pagenum == '时间修改'){
		var a = $(this).parent().parent().children('td');
		ssc(a);
		return;
	}


	dataa.page=pagenum;

	console.log(dataa);

	ajax(url,dataa);
});

//排序
$("body").on("click","thead tr .soc",function(){

	var a = $(this).attr('name');
	var b = $(this).find("i").attr('class');


    if(b != 'sorting_ascss'){
    	// namem = $name;
    	if(b == 'sorting_ascss tw') varr = 'asc';
    	if(b == 'sorting_ascss on') varr = 'desc';
    }

    var dataa = sco();
    dataa.namem=a;
    dataa.varr=varr;

    console.log(dataa);
	// alert(varr)
	ajax(url,dataa);

});


//搜索
$("body").on("click",".search",function(){

	var dataa = sco();
	// alert(dataa);
	// document.write(sco)
	dataa.page='';
	// console.log(dataa);
	ajax(url,dataa);
});

//彩种单个撤单搜索
$("body").on("click",".searchh",function(){

	var dataa = sco();
	// alert(dataa);
	// document.write(sco)
	// dataa.page='';
	// console.log(dataa);
	ajax(url,dataa);
});



//取消 刷新页面
$("body").on("click",".cancel",function(){

	location.reload([true]) //刷新頁面
});

//倍率类型单击取消
// $("body").on("click",".chosen-drop",function(){

// 	// location.reload([true]) //刷新頁面
// 	// alert(11);
// 	// $(".search-choice").remove();
// });


//彩种开关合买开关
$("body").on("click",".switch-on",function(){


	var state = $(this).children('div').attr('data-state');
	var stateid = $(this).children('div').attr('data-stateid');
	var type = $(this).children('div').attr('data-type');
	// var claa = $(this).children('div').attr('data-state','0');
	// alert(type);
	if(state == '1'){
		$(this).children('div').removeClass();
		$(this).children('div').addClass('switch-b');
		$(this).children('div').attr('data-state','0');
		$(this).children('div').html('');
		$(this).children('div').html('已关闭');
	}else{
		$(this).children('div').removeClass();
		$(this).children('div').addClass('switch-a');
		$(this).children('div').attr('data-state','1');
		$(this).children('div').html('');
		$(this).children('div').html('已开启');
	}

	var dataa = {
		id:stateid,
		state:state,
		type:type
	}
	console.log(dataa);

	ajax(url,dataa);

});


//订单详细
$("body").on("click",".dingdan",function(){


	var xx = $(this).attr('name');
	var srcc = '/adm/buys/buysdetails?id='+xx;
	$(".ifra").attr("src",srcc)

});


//合买系统撤单
$("body").on("click",".systema",function(){

	if(!confirm('你确定要修改吗？')){
		return;
	}

	var a = $(this);
	var id = $(this).attr('name');
	$(this).removeClass();
	$(this).addClass('systemc');
	$(this).addClass('systemon');
	// alert(id);
	urlcel = 'cancel';

	data = {id:id};
	console.log(data);

	ajaxone(urlcel,data);
	// alert(a);
	// console.log(a.length);
});

//普通撤单
$("body").on("click",".systemp",function(){

	var type = "";     //类型
    var issue=$(".issue").val();
    var jump=$("select option:selected").attr("name");
    var time = $(this).attr('name');
    // alert(jump);return;

    type = $('.lo-bet-type').eq(0).val();

	var data = {
		type:type,
		issue:issue,
		jump:jump,
		time:time
	};

	// alert(id);
	$(this).removeClass();
	$(this).addClass('systemc');
	$(this).addClass('systemon');

	urlcel = 'cancel';

	console.log(data);
	ajaxone(urlcel,data);
	// alert(a);
	// console.log(a.length);
});


//刷新期号
$("body").on("click",".shuai",function(){

	dataa = {
		czname:czname,
		cztype:cztype
	};

	var urlcel = 'shuai';
	ajaxone(urlcel,dataa);
});

//测试开号
$("body").on("click",".test",function(){
	// var code = $('.code').value();
	var code = $(".code").val();
	var issue = $(".showissue").val();
	dataa = {
		class:czname,
		code:code,
		issue:issue
	};

	console.log(dataa);

	var urlcel = 'testopen';
	ajaxone(urlcel,dataa);
});

//修改开号
$("body").on("click",".edit",function(){

	if(!confirm("是否确定修改!")){
		return;
	}

	var code = $(".code").val();
	var issue = $(".showissue").val();
	dataa = {
		class:czname,
		code:code,
		issue:issue
	};

	console.log(dataa);

	// var urlcel = '/Icode';
	var urlcel = 'edit';
	ajaxone(urlcel,dataa);
});



//彩种开关
$('.switch-on-sui').click(function(){

	var state = $(this).children('div').attr('data-state');
		// alert(1);
	// var claa = $(this).children('div').attr('data-state','0');
	// alert(cla);
	if(state == '1'){
		$(this).children('div').removeClass();
		$(this).children('div').addClass('switch-b');
		$(this).children('div').attr('data-state','0');
		$(this).children('div').html('');
		$(this).children('div').html('已关闭');
	}else{
		$(this).children('div').removeClass();
		$(this).children('div').addClass('switch-a');
		$(this).children('div').attr('data-state','1');
		$(this).children('div').html('');
		$(this).children('div').html('已开启');
	}

	var urlcel = 'suiji';

	var dataa = {
		cname:czname,
		state:state
	}
	console.log(dataa);

	// ajax(url,dataa);
	ajaxone(urlcel,dataa)

});



//ajax公共方法
function ajax(url,dataa){
	$.ajax({
		dataType: 'json',
		type: "post",
		url: url,
		data: dataa,
		cache: false,
		success: function(res) {
			goo(res);
			// console.log(res);
		},
		error: function(error){
			console.log(error);
		}
	});
}

//ajax公共方法(只传参数访问)
function ajaxone(urlcel,data){
	$.ajax({
		dataType: 'json',
		type: "post",
		url: urlcel,
		data: data,
		cache: false,
		success: function(res) {
			// goo(res);
			ajaxonef(res);
			// console.log(res);
			// return ajaxonef(res);
		},
		error: function(error){
			console.log(error);
		}
	});
}


//处理获取数据 显示i
function goo(res){
	// console.log(res);

	var g_table = $("tbody");
	var page = $(".box");
	var count = $("#countid");
	g_table.html('');
	page.html('');
	page.html(res.page);
	count.html('');
	count.html(res.count);
	console.log(res);
	$.each(res.data,function(key,val){
		var data_tr = $("<tr></tr>");
			console.log(val);

			var data_td = tdshow(val);
			data_tr.append(data_td);

		g_table.append(data_tr);

	});

	$(".dingdan").click(function() {

		$(".gp_bnt").addClass("on");
		$(".gp_content").removeClass("wwwwww");
		$(".gp_content").removeClass("zzzzzz");
		$(".gp_content").addClass("wwwwww");

	})
	$(".layer-close").click(function() {
		$(".gp_content").removeClass("wwwwww");
		$(".gp_content").removeClass("zzzzzz");
		$(".gp_content").addClass("zzzzzz");
		setTimeout(function() {
			$(".gp_bnt").removeClass("on");
		}, 400)

	})

}

function ajaxonef(res){
	console.log(res);

	if(res.chedan == 'no'){
		var son = $('.systemon');
		son.removeClass()
		son.addClass('systemb');
		son.html('');
		son.html('无法撤单');

		// return 1;
	}

	if(res.chedan == 'yes'){
		var son = $('.systemon');
		son.removeClass('.systemon');

		var pa = son.parent().parent().children('td');

		pa.eq(9).html('已撤单');
		son.html('已撤单');
		// return 1;
	}

	if(res.nowissue){
		// alert(1);
		var nowissuet = $('.showissue');
		nowissuet.val('');
		nowissuet.val(res.nowissue);
		// return 1;
	}

	if(res.result){
		alert(res.result);
	}

}




})

