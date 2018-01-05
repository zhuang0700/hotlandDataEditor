$.extend({checkColVisiablity:function(){
	var offCheckbox = $(".dimen-right").find("input[type='checkbox']");
	var j = 0;
	
	for(var i=0;i<offCheckbox.length;i++){
		var colType = $(offCheckbox[i]).attr('id').split('-')[2];
		var colName = "col-"+colType;
		if($(offCheckbox[i]).is(":checked")) {
			j++;
			$("."+colName+"").parent().show();
			// if(colName == "col-date"){
			// 	$('.col-date').css('padding-right',"70")
			// }
			var thwidth = parseInt($($("."+colName+"")[0]).css('width'));
			var tdwidth = parseInt($($("."+colName+"")[1]).css('width'));
			var width = thwidth>tdwidth?thwidth:tdwidth;
			$("."+colName+"").css('width',width);

		} else {
			$("."+colName+"").parent().hide();
		}
	}
	if(j <=5){
		$("#thead-offline").find('th').css('border-right',"none");
		if($('.thappend').length == 0){
			$("#thead-offline").append("<th class='thappend'></th>")

		}
	}
	// debugger
}});


$(function() {
	function table(param){
		var width = $(param[0]).css('width');
		$(param[1]).css('width',width);
	}
	table($('.col-date'))
	table($('.col-retrieve'))
	table($('.col-result'))
	table($('.col-rank'))
	table($('.col-direction'))
	table($('.col-biz'))
	table($('.col-common'))
	table($('.col-other'))
	function siToDicemalWithTwo(num){
		var yuan = num/10000;
		return yuan.toFixed(2);
	}
	//adIdVl的值，每次请求都要使用，最上面的搜索的功能
	var adIdValue;
	$('#myModal').modal('show');
	var adTems;
	$("#adButton").bind('paste', function(e) { 
		var el = $(this); 
		var that = this;
		setTimeout(function() { 
			var text = $(el).val().trim();
			if(~text.indexOf('-')){
				$(el).val(text.split('-')[0]);
			}
			searchAd(event,that);
		}, 100); 
	}); 

	function searchAd(event,ele){
		// event.preventDefault();
		var adIdVal = $(ele).val().trim();
		if(adIdVal == ""){
			$(".ad-select").hide();
			return;
		}
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "/diagnose_api/creatives/?ad_id="+adIdVal,
			success: function (msg) {
				if (msg.ret) {
					var str = "";
					adTems = msg.data;
					for (var i in adTems) {
						str += "<li value='" + adTems[i].ad_id + "'>"  + adTems[i].ad_id + "-" + adTems[i].ad_name + "</li>";
					}
					$(".ad-select").html(str);
					if(adTems.length>0){
						$(".ad-select").show();
						if($(".ad-select").height() > 180){
							$(".ad-select").css('height','190px');
							$(".ad-select").css("overflow","auto");
						}else{
							$(".ad-select").height("auto");
							$(".ad-select").css("overflow","visible");

						}                       
					}else{
						$(".ad-select").hide();
					}
				} else {
					// alert("查询错误")
				}
			},
			error: function () {
				// alert("查询失败")
			}
		});
	}
	function searchAll(){	
		$('.media').text('全部');
		$('.tag-id').text('全部');
		$('.downpage').text(10);
		$('.media').val('');
		$('.tag-id').val('');
		hisGroup = 'all';
		hisTagId = "all";
		hisMedia = -1;
		optendDate = nowdate;
		optpageNum = 1;
		offMedia="all";
		offTagId="all";
		offStartDate = startDate;
		offEndDate = tomorrowdate;
		offpageNum = 1;
		offPageSize=10
		oprtBhr = 0;
		oprtOpt = "all";
		optstartDate = startDate;
		optendDate = nowdate;
		optpageNum = 1;
		optPageSize=10;

		$(".panel-body").css("display","block");
		$(".my-icon").removeClass("glyphicon-menu-up");
		$(".my-icon").addClass("glyphicon-menu-down");

		var showTime = new Date();
		var nowdate = showTime.Format("yyyy-MM-dd");
		var endDate = new Date(showTime-24*3600*1000).Format("yyyy-MM-dd");
		var startDate = new Date(showTime-7*24*3600*1000).Format("yyyy-MM-dd");
		var nowdate = showTime.Format("yyyy-MM-dd");
		var tomorrowdate = new Date(showTime.getTime()+24*3600*1000).Format("yyyy-MM-dd");
		var endDate = new Date(showTime).Format("yyyy-MM-dd");
		$("#off-date").data('dateRangePicker').destroy()
		$("#off-date").val(startDate + "~" + nowdate);
		$("#off-date").dateRangePicker({
			format : 'YYYY-MM-DD',
			language : 'cn',
			startDate: startDate,
			separator: '~',
			endDate: nowdate,
			singleMonth: true,
			showShortcuts: false,
			showTopbar: false,

			autoClose: true,
			singleDate : false
		})
		$("#opt-date").data('dateRangePicker').destroy();	
		$("#opt-date").val(startDate + "~" + endDate);
		$("#opt-date").dateRangePicker({
			format : 'YYYY-MM-DD',
			language : 'cn',
			startDate: startDate,
			separator: '~',
			endDate: endDate,
			singleMonth: true,
			showShortcuts: false,
			showTopbar: false,

			autoClose: true,
			singleDate : false
		})
		$('.dimen-right').find('input').prop('checked',true);
		$('.dimen-right').find('input:eq("1")').prop('checked',false);
		$('.dimen-right').find('input:eq("2")').prop('checked',false);
		$('.dimen-right').find('input:eq("3")').prop('checked',false);
		var str = "";
		var result = "";
		setTimeout(function(){
			$.ajax({
				type: "GET",
				dataType: "json",
				url: "/diagnose_api/base_info?ad_id="+tempIndex,
				success: function (msg) {
					if (msg.ret) {
						var data = msg.data;
						var imgs = [];
						//正式使用的
						var imgAssets;
						if(data['assets'][0]){
							imgAssets = JSON.parse(data['assets'][0]['img']);
							var picture = "";
							//测试的
							// var imgAssets = ["AdCenter/00c07e49690e844630b12f751d5f95a36df53e9ee/AdCenter00c07e49690e844630b12f751d5f95a36df53e9ee.jpg?width=480&height=320","AdCenter/0fc07e49690e844620b12e751d6f95ac6df5ee9ee/AdCenter0fc07e49690e844620b12e751d6f95ac6df5ee9ee.jpg?width=480&height=320","AdCenter/0cc07e49690e844630b12f751dff95a96df5de9ee/AdCenter0cc07e49690e844630b12f751dff95a96df5de9ee.jpg?width=480&height=320"];
							for(var i = 0;i < imgAssets.length;i++){
								picture += "<img src='http://file.market.xiaomi.com/thumbnail/jpeg/w240/"+ imgAssets[i].split("?")[0]+"'/>"
							}
						}

						var tdDirection="——";
						if(data['direction'] && Object.keys(data['direction']).length > 0 ) {
							tdDirection="<a href='javascript:;' class='taggle-target'>点击查看</a>";
							var result = "";
							var direction = Object.keys(data['direction']);
							for(var i = 0;i<direction.length;i++){
								var arrresult = "<span style='white-space: normal;float:left;width:300px;word-break: break-all;text-align: justify;'>";
								var dic = data['direction'][direction[i]];
								if($.type(dic) == "array"){
									for(var j = 0;j<dic.length;j++){
										arrresult += dic[j] + "&nbsp;";
										// arrresult += '<span class="dic-span">'+dic[j] +'</span>';
									}
									arrresult += "</span>"								
									result += "<span style='font-weight:700;display:inline-block;float:left;margin-right:15px;'>"+direction[i]+"</span>"+arrresult+"<br>"
								}else{
									result += "<span style='font-weight:700;margin-right:15px;'>"+direction[i]+"</span><span>"+dic+"</span><br>"
								}
							}
						}

						$("tr").remove(".canDel");
						str += "<tr class='canDel'>\
						<td>"+ data['ad_id']+"</td>\
						<td>"+ data['ad_name']+"</td>\
						<td>"+ data['create_time']+"</td>\
						<td>"+ data['app_name']+"</td>\
						<td>"+ data['ad_type']+"</td>\
						<td>"+ data['billing_type']+"</td>\
						<td>"+ siToDicemalWithTwo(data['bid'])+"</td>\
						<td>"+ data['group_id']+"</td>\
						<td>"+ data['campaign_id']+"</td>\
						<td  class='ad-target'>"+tdDirection+"</td>\
						<td>"+ siToDicemalWithTwo(data['campaign_budget'])+"</td>\
						<td>"+ siToDicemalWithTwo(data['account_budget'])+"</td>\
						<td>"+ data['ad_status_text']+"</td>\
						<td>"+ data['group_status_text']+"</td>\
						<td>"+ data['campaign_status_text']+"</td>\
						<td>"+ siToDicemalWithTwo(data['creative_effect'])+"</td>\
						<td>"+ siToDicemalWithTwo(data['campaign_effect'])+"</td>\
						<td>"+ data['customer_id']+"</td>\
						<td><a target='_blank' href='../customer/history/" +data['customer_id'] +"'>" + data['sub_account_company']+"</a></td>\
						<td class='showpicture'><a target='_blank' href='javascript:;'>查看原图</a></td>\
						</tr>";
						$("#table-bordered").append(str);
						$(".ad-target-result").html(result);
						$('.taggle-target').on('click',function(){
							if($(".ad-target-result").html()){
								var lefts = $('.taggle-target').offset().left;
								var leftfa = $('.fa-ad').offset().left;
								var tops = $('.taggle-target').offset().top;
								var topfa= $('.fa-ad').offset().top;
								var left = lefts - leftfa-11;
								var top = tops - topfa+26;
								$(".ad-target-result").css('left',left);
								$(".ad-target-result").css('top',top);

								$(".ad-target-result").toggle();							
							}
						})
						$('.table-responsive').scroll(function(){
							var lefts = $('.taggle-target').offset().left;
							var leftfa = $('.fa-ad').offset().left;
							var tops = $('.taggle-target').offset().top;
							var topfa= $('.fa-ad').offset().top;
							var left = lefts - leftfa-11;
							var top = tops - topfa+26;
							$(".ad-target-result").css('left',left);
							$(".ad-target-result").css('top',top);
						})
						$("#outer_result").html(data["outer_result"])
						$(".ad-select").hide();
						$(".ad-select").hide(); 
						$(".pictures").html(picture);
						var clickNum = 0;
						$(".pictures").css('display',"none")
						$(".showpicture").click(function(){
							clickNum ++;
							if(clickNum%2 == 1){
								$(".pictures").css('display',"block")
							}else{
								$(".pictures").css('display',"none")
							}
						})
						offlineclick();
						historyClick();
						optclick();
					} else {
						// alert("查询错误")
					}
				},
				error: function () {
					// alert("查询失败")
				}
			});
},100);

$(".canDel").html(str);
$(".ad-target-result").html(result);
return
}

	// $("#adButton").on("keyup",function(event){
	// 	if(event.keyCode !=13){
	// 		searchAd(event,this);
	// 	}else{
	// 		searchAll()
	// 	}
	// })
	$("#adButton").on("keyup",function(event){
		if(event.keyCode !=13){
			searchAd(event,this);
		}
	})
	$('#btn-info').on('click',function(){
		$('.col-date').css('width',"auto");
		$('.col-retrieve').css('width',"auto");
		$('.col-result').css('width',"auto");
		$('.col-rank').css('width',"auto");
		$('.col-direction').css('width',"auto");
		$('.col-biz').css('width',"auto");
		$('.col-common').css('width',"auto");
		$('.col-other').css('width',"auto");
		searchAll()
	})
	//最上边的 广告详情
	var tempIndex;
	$('.ad-search').focus(function(){		
		$('.diag-del').show();
	})
	$(".ad-select").on("click","li",function(){
		var content = $(this).text();
		var id = $(this).val();
		$("#adButton").val(content);
		$("#adId").val(id);
		tempIndex = $(this).attr('value');

		adIdValue = tempIndex;
		$(".ad-select").hide();
		$('#adButton')[0].focus();

	})
	 //诊断结果
	 $(".result-all>a").mouseover(function(){
	 	$(this).siblings('.result-ext').css('display','block');
	 })
	 $(".result-all>a").mouseleave(function(){
	 	$(this).siblings('.result-ext').css('display','none');
	 })

	 $("body").on('click', '[data-stopPropagation]', function(e) {
	 	$(this).addClass("show-color").siblings("div").removeClass("show-color");
	 	var i = $(this).index();
	 	$(".dimen-right>ul").eq(i).show().siblings("ul").hide();
	 	
	 });

	 $("body").on('click', 'input', function(e) {
	 	e.stopPropagation();
	 });
	 $("body").on('click', '.off-li', function(e) {
	 	e.stopPropagation();
	 	if($(this).children("input").prop('checked')){
	 		$(this).children("input").prop('checked',false);
	 	}else{
	 		$(this).children("input").prop('checked',true);
	 	}	 	
	 	$.checkColVisiablity();
	 });
	 $("body").on('click', '.dimen', function(e) {
	 	e.stopPropagation();
	 });

	// 离线诊断
	$("body").on('click', '[data-stopPropagation1]', function(e) {
		e.stopPropagation();
		$(this).siblings("ul").toggle().parent().siblings().find('ul').hide();
	});
	//选择几页
	var offPageSize=10;
	$(".downnum").on('click',"li",function(){
		var btn = $(this).parent().siblings("button");
		var lival = $(this).text();
		offPageSize = lival;
		$(btn).find('.numtxt').text(lival);
		$(this).parent().toggle();
	})
	//离线诊断的翻页
	var offpageNum = 1;
	// $(".offcombineiconright").click(function(){
	// 	offpageNum = offpageNum>=offpageSum?offpageSum:++offpageNum;
	// 	$(".offpage").text("第"+offpageNum+"页");
	// 	offlineclick();
	// })
	// $(".offcombineiconleft").click(function(){
	// 	offpageNum = offpageNum<=1?1:--offpageNum;
	// 	$(".offpage").text("第"+offpageNum+"页");
	// 	offlineclick();
	// })


	// 日期
	var showTime = new Date();
	var nowdate = showTime.Format("yyyy-MM-dd");
	var endDate = new Date(showTime).Format("yyyy-MM-dd");
	var startDate = new Date(showTime-7*24*3600*1000).Format("yyyy-MM-dd");
	var offStartDate;
	var offEndDate;

	
	$("#off-date").val(startDate + "~" + nowdate);
	$("#off-date").dateRangePicker({
		format : 'YYYY-MM-DD',
		language : 'cn',
		startDate: startDate,
		separator: '~',
		endDate: nowdate,
		singleMonth: true,
		showShortcuts: false,
		showTopbar: false,

		autoClose: true,
		singleDate : false
	}).bind('datepicker-change',function(event,obj){
		offStartDate = obj.value.split('~')[0];
		offEndDate = new Date(obj.date2*1+1*24*3600*1000).Format("yyyy-MM-dd");
	})
	//离线诊断的请求
	var offMedia="";
	var offTagId="";

	//离线诊断查询媒体名称
	$('.off-media-search').keyup(function(){
		var val = $(this).val();
		if(!val.trim()){
			var str = '';
			for (var i in allMesiaText) {
				str += "<li data-name="+allMesiaText[i].split('-')[0]+"><a href='javascript:;'>" + allMesiaText[i] + "</a></li>";
			}
			$("#offline-media").html(str);
			if($("#offline-media").height() >= 200){
				$("#offline-media").height(210);
				$("#offline-media").css("overflow","auto");
			}else{
				$("#offline-media").height("auto");
				$("#offline-media").css("overflow","visible");

			}
			return
		}
		var length = allMesiaText.length;
		var accurateArr = [];
		var notAccurateArr = [];
		for(var i = 0;i<length;i++){
			if(allMesiaText[i].indexOf(val.toUpperCase()) == 0 || allMesiaText[i].indexOf(val.toLowerCase()) == 0){
				accurateArr.push(allMesiaText[i])
			}else if(~allMesiaText[i].indexOf(val.toUpperCase()) || ~allMesiaText[i].indexOf(val.toLowerCase())){
				notAccurateArr.push(allMesiaText[i])
			}
		}
		var allSelectArr = [];
		allSelectArr = allSelectArr.concat(accurateArr).concat(notAccurateArr);
		if(allSelectArr.length == 0){
			$(".media-context").css("display","none");
			return
		}
		var selectedMedia = '';
		for (var i in allSelectArr) {
			selectedMedia += "<li data-name="+allSelectArr[i].split('-')[0]+"><a href='javascript:;'>" + allSelectArr[i] + "</a></li>";
		}
		$("#offline-media").html(selectedMedia);
		$("#offline-media").css("display","block");
		if($("#offline-media").height() >= 200){
			$("#offline-media").height(210);
			$("#offline-media").css("overflow","auto");
		}else{
			$("#offline-media").height("auto");
			$("#offline-media").css("overflow","visible");

		}
	})
	//事件委托
	$("#offline-media").on("mousedown","li",function(event){
		event.preventDefault(); 
		var btn = $(this).parent().siblings("input");
		var lival = $(this).text();
		$(this).siblings('.result-media').css("display","none");
		offMedia = $(this).attr('data-name');
		if(lival == '全部'){
			offMedia = "all";
		}
		$(btn).val(lival);
		$("#offline-media").css("display","none");
	});
	//点击离线诊断媒体名称
	$(".off-media-search").click(function(e){
		$("#offline-media").html(mediaNameDet);
		$(this).val('');
		$("#offline-media").css("display","block");
		$("#offline-media").height(210);
		$("#offline-media").css("overflow","auto");
		$(".result-media").css("display","none");
		return false;
	})
	$(".off-media-search").on("blur",function(){
		$("#offline-media").css("display","none");
	})
	//点击离线诊断tag-id
	$(".off-tagId-search").click(function(){
		$("#offline-TagId").html(TagIdNameDet);
		$(this).val('');
		$("#offline-TagId").css("display","block");
		// showOrHideMedia($(this));
		$("#offline-TagId").height(210);
		$("#offline-TagId").css("overflow","auto");
		$(".result-media").css("display","none");
		return false;
	})	
	$(".off-tagId-search").on("blur",function(){
		$("#offline-TagId").css("display","none");
	})

	
	$('.off-tagId-search').on("keyup",function(){
		var val = $(this).val();
		if(!val.trim()){
			return
		}
		var length = allTagIdText.length;
		var accurateArr = [];
		var notAccurateArr = [];
		for(var i = 0;i<length;i++){
			if(allTagIdText[i].indexOf(val.toLowerCase()) == 0 || allTagIdText[i].indexOf(val.toUpperCase()) == 0){
				accurateArr.push(allTagIdText[i]);
			}else if(~allTagIdText[i].indexOf(val.toUpperCase()) || ~allTagIdText[i].indexOf(val.toLowerCase())){
				notAccurateArr.push(allTagIdText[i]);
			}
		}
		var allSelectArr = [];
		allSelectArr = allSelectArr.concat(accurateArr).concat(notAccurateArr);
		if(allSelectArr.length == 0){
			$("#his-TagId").css("display","none");
			return
		}
		var str = '';
		for (var i in allSelectArr) {
			var currentSelect = allSelectArr[i];
			str += "<li  data-id="+ currentSelect.substring(0,currentSelect.indexOf('-')) +"><a href='javascript:;'>" + currentSelect + "</a></li>";
		}
		$("#offline-TagId").html(str);
		if($("#offline-TagId").height() > 210){
			$("#offline-TagId").height(210);
			$("#offline-TagId").css("overflow","auto");
		}else{
			$("#offline-TagId").height("auto");
			$("#offline-TagId").css("overflow","visible");

		}
	})
	$("#offline-TagId").on("mousedown","li",function(event){
		event.preventDefault(); 
		var btn = $(this).parent().siblings("input");
		var lival = $(this).text();
		offTagId = $(this).attr('data-id');
		if(lival == '全部'){
			offTagId = 'all';			
		}
		$(btn).val(lival);
		$("#his-media").css('display','none');
	});
	$("input[type='checkbox']").click(function(){
		//只有点击指标触发表格列的显示隐藏，维度不会
		if($(this).parent().parent().is(".dimen-only")){
			return;
		}
		$.checkColVisiablity();
	});
	var group_by_mode;
	var offlineRecords;
	var offlineFilters;
	window.offlineclick = function(){
		var ad_id = $("#adId").val();
		var media = offMedia;
		var tag_id = offTagId;
		group_by_mode = "";
		if($("#off-checkbox-date").is(":checked")) {
			group_by_mode += "day,";
		}
		if($("#off-checkbox-hour").is(":checked")) {
			group_by_mode += "hour,";
		}
		if($("#off-checkbox-media").is(":checked")) {
			group_by_mode += "media,";
		}
		if($("#off-checkbox-tag").is(":checked")) {
			group_by_mode += "tag,";
		}
		// console.log(media)
		// console.log(offTagId)
		if(!offStartDate){
			offStartDate = startDate;
		}
		if(!offEndDate){
			offEndDate = new Date(new Date().getTime() + 24*3600*1000).Format("yyyy-MM-dd");
		}
		if(!media){
			media = 'all';
		}
		if(!tag_id){
			tag_id = "all";
		}
		offpageNum = window.offpageNum1||1;
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "/diagnose_api/request_statistics/?ad_id="+ad_id+"&media="+media+"&tag="+tag_id+"&group_by_mode="+
			group_by_mode+"&start_date="+offStartDate+"&end_date="+offEndDate+"&page_no="+offpageNum+"&page_size="+offPageSize,
			success: function (msg) {
				if (msg.ret) {
					//页码
					dealpage(msg,offpageNum);

					var data = msg.data;
					offlineRecords = data.records;
					offlineFilters = data.filters;
					if(data != null) {
						//fill table head
						var thead_add_str = '<th click="1" logo="request_date"><div class="col-date">Day<span  class="updown"></span></div></th>'+
						'<th click="1" logo="request_hour"><div class="col-hour">Hour<span class="updown"></span></div></th>'+
						'<th><div class="col-media">Media</div></th>'+
						'<th><div class="col-tag">TagId</div></th>'+
						'<th click="1" logo="retrieve_count"><div class="col-retrieve">触发次数<i class="i-e-help"><span class="table-tip">即创意被请求出来的次数,是创意在检索端走的第一步。一般来讲 触发次数=下发次数+各种被过滤的次数。</span></i><span class="updown"></span></div></th>'+
						'<th click="1" logo="rank_count"><div class="col-rank">进入rank队列次数<i class="i-e-help"><span class="table-tip">即创意有预估eCPM，参与排序的次数，能进入rank队列，表示创意距离被成功下发不远了。</span></i><span class="updown"></span></div></th>'+
						'<th click="1" logo="result_count"><div class="col-result">下发次数<i class="i-e-help"><span class="table-tip">即创意被成功下发给客户端的次数，下发次数与曝光次数挂钩。</span></i><span class="updown"></span></div></th>';
						//头部全部的信息
						var filter_keys = new Array();

						for(var i=0; i<data.filters.length;i++) {
							filter_keys.push(data.filters[i]);
							var checkboxId = "off-checkbox-" + data.filters[i].show_code;
							var ul_filter = $("#"+checkboxId+"").nextAll("ul");
							var sub_filter_str = "";
							for(var j in data.filters[i].sub_dict) {
								filter_keys.push(data.filters[i].sub_dict[j]);
								sub_filter_str += "<li class='off-li'><input type='checkbox' id='off-checkbox-"+data.filters[i].sub_dict[j].show_code+"'><span>"+data.filters[i].sub_dict[j].name+"</span></li>"
							}
							ul_filter.html(sub_filter_str);
						}
						//给所有checkbox重新绑定事件
						$("input[type='checkbox']").click(function(){
							//只有点击指标触发表格列的显示隐藏，维度不会
							if($(this).parent().parent().is(".dimen-only")){
								return;
							}
							$.checkColVisiablity();
						});
						if(filter_keys != null) {
							for(var i=0;i<filter_keys.length;i++) {
								thead_add_str += "<th  logo='"+"filters."+filter_keys[i].show_code+"' click='1'><div class='col-"+filter_keys[i].show_code +"'>" + filter_keys[i].name + "<span class='updown'></span></div></th>"
							}
							$("#thead-offline").html(thead_add_str);
						}
						//fill table content
						var records = data.records;
						var str="";
						if(records.length != 0) {
							$('.table-body').css('height',304);
							for (var i=0; i<records.length;i++) {
								str += "<tr>" +
								"<td><div class='col-date'>" + records[i].request_date + "</div></td>" +
								"<td><div class='col-hour'>" + records[i].request_hour + "</div></td>" +
								"<td><div class='col-media'>" + records[i].media_name + "</div></td>" +
								"<td><div class='col-tag'>" + records[i].tag_id + "</div></td>" +
								"<td><div class='col-retrieve'>" + records[i].retrieve_count + "</div></td>" +
								"<td><div class='col-rank'>" + records[i].rank_count + "</div></td>" +
								"<td><div class='col-result'>" + records[i].result_count + "</div></td>"
								for(var j=0;j<filter_keys.length;j++) {
									var filter_code = filter_keys[j].show_code;
									if(records[i].filters[filter_code] != null) {
										str += "<td><div class='col-"+filter_code+"'>" + records[i].filters[filter_code] + "</div></td>"
									} else {
										records[i].filters[filter_code] = 0;
										str += "<td><div class='col-"+filter_code+"'>0</div></td>"
									}

								}
								str += "<tr>"
							}
						}else{
							$('.table-body').css('height',50);							
						}
						$("#tbody-offline").html(str);

						$.checkColVisiablity();
						// $('.updown').on("click",function(){
						// 	var logo = $(this).attr("logo");
						// 	var clickTime = $(this).attr("click");

						// 	if(clickTime == "1"){
						// 		var reup = offlineRecords.sort(compareup(logo));
						// 	}else if(clickTime == "2"){
						// 		var reup = offlineRecords.sort(comparedown(logo));
						// 		$(this).attr("click","3");
						// 	}else if(clickTime == "3"){
						// 		var reup = offlineRecords.sort(compareup(logo));
						// 		$(this).attr("click","1");
						// 	}
						// 	reRender(clickTime,$(this),offlineFilters,reup);

						// })
						//升序和降序
						$('#thead-offline').on('click',"th",function(){
							var logo = $(this).attr("logo");
							var clickTime = $(this).attr("click");

							if(clickTime == "1"){
								var reup = offlineRecords.sort(compareup(logo));
								$(this).attr("click","2");
							}else if(clickTime == "2"){
								var reup = offlineRecords.sort(comparedown(logo));
								$(this).attr("click","3");
							}else if(clickTime == "3"){
								var reup = offlineRecords.sort(compareup(logo));
								$(this).attr("click","1");
							}
							reRender(clickTime,$(this).find('div').children('.updown'),offlineFilters,reup);

						})
					}
					
				} else {
					// alert("查询错误")
				}
			},
			error: function () {
				// alert("查询失败")
			}
		});

}

$(".down-load").click(function(){
	var ad_id = $("#adId").val();
	var media = offMedia;
	var tag_id = offTagId;
	group_by_mode = "";
	if (ad_id == undefined || ad_id == "" || ad_id == null) {
		alert("未知的广告");
		return;
	}
	if($("#off-checkbox-date").is(":checked")) {
		group_by_mode += "day,";
	}
	if($("#off-checkbox-hour").is(":checked")) {
		group_by_mode += "hour,";
	}
	if($("#off-checkbox-media").is(":checked")) {
		group_by_mode += "media,";
	}
	if($("#off-checkbox-tag").is(":checked")) {
		group_by_mode += "tag,";
	}
	if(!offStartDate){
		offStartDate = startDate;
	}
	if(!offEndDate){
		offEndDate = new Date(new Date().getTime() + 24*3600*1000).Format("yyyy-MM-dd");
	}
	window.location.href="/diagnose_api/request_statistics/export?ad_id="+ad_id+"&media="+media+"&tag="+tag_id+"&group_by_mode="+
	group_by_mode+"&start_date="+offStartDate+"&end_date="+offEndDate+"&page_no="+offpageNum+"&page_size="+offPageSize;
        // $.ajax({
        //     type: "GET",
        //     dataType: "json",
        //     url: "/diagnose_api/request_statistics/export?ad_id=" + ad_id + "&media=" + media + "&tag=" + tag_id + "&group_by_mode=" +
        //     group_by_mode + "&start_date=" + offStartDate + "&end_date=" + offEndDate + "&page_no=" + offpageNum + "&page_size=" + offPageSize,
        //     success: function () {
        //
        //     },
        //     error: function () {
        //         alert("查询失败")
        //     }
        // });
    });
//升序
var compareup = function (prop) {
	return function (obj1, obj2) {
		if(prop.indexOf('.') != -1){
			var val1 = obj1[prop.split('.')[0]][prop.split('.')[1]];
			var val2 = obj2[prop.split('.')[0]][prop.split('.')[1]];
		}else{			
			var val1 = obj1[prop];
			var val2 = obj2[prop];
		}
		if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
			val1 = Number(val1);
			val2 = Number(val2);
		}
		if (val1 < val2) {
			return -1;
		} else if (val1 > val2) {
			return 1;
		} else {
			return 0;
		}            
	}
}
var comparedown = function (prop) {
	return function (obj1, obj2) {
		if(prop.indexOf('.') != -1){
			var val1 = obj1[prop.split('.')[0]][prop.split('.')[1]];
			var val2 = obj2[prop.split('.')[0]][prop.split('.')[1]];
		}else{			
			var val1 = obj1[prop];
			var val2 = obj2[prop];
		}
		if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
			val1 = Number(val1);
			val2 = Number(val2);
		}
		if (val1 < val2) {
			return 1;
		} else if (val1 > val2) {
			return -1;
		} else {
			return 0;
		}            
	} 
}
//重新渲染列表
function reRender(clickTime,t,filters,records){
	$('.updown').css('background-image',"url(/static/diagnose/img/icon_p_t_d.png)");
	var thead_add_str = $("#thead-offline").html();
	if(clickTime == "1"){
		t.css('background-image',"url(/static/diagnose/img/icon_p_t_d_u.png)");
		t.attr("click","2");
	}else if(clickTime == "2"){
		t.css('background-image',"url(/static/diagnose/img/icon_p_t_d_d.png)");
		t.attr("click","3");
	}else if(clickTime == "3"){
		t.css('background-image',"url(/static/diagnose/img/icon_p_t_d.png)");
		t.attr("click","1");
	}

	// var clickTime = t.attr("click");
	//头部全部的信息
	var filter_keys = new Array();
	for(var i=0; i<filters.length;i++) {
		filter_keys.push(filters[i]);
		for(var j in filters[i].sub_dict) {
			filter_keys.push(filters[i].sub_dict[j]);
		}
	}
	//给所有checkbox重新绑定事件
	// $("input[type='checkbox']").click(function(){
	// 	//只有点击指标触发表格列的显示隐藏，维度不会
	// 	if($(this).parent().parent().is(".dimen-only")){
	// 		return;
	// 	}
	// 	$.checkColVisiablity();
	// });
	if(records != null){
		var restr;
		for (var i=0; i<records.length;i++) {
			restr += "<tr>" +
			"<td><div class='col-date'>" + records[i].request_date + "</div></td>" +
			"<td><div class='col-hour'>" + records[i].request_hour + "</div></td>" +
			"<td><div class='col-media'>" + records[i].media_name + "</div></td>" +
			"<td><div class='col-tag'>" + records[i].tag_id + "</div></td>" +
			"<td><div class='col-retrieve'>" + records[i].retrieve_count + "</div></td>" +
			"<td><div class='col-rank'>" + records[i].rank_count + "</div></td>" +
			"<td><div class='col-result'>" + records[i].result_count + "</div></td>"
			for(var j=0;j<filter_keys.length;j++) {
				var filter_code = filter_keys[j].show_code;
				if(records[i].filters[filter_code] != null) {
					restr += "<td><div class='col-"+filter_code+"'>" + records[i].filters[filter_code] + "</div></td>"
				} else {
					records[i].filters[filter_code] = 0;
					restr += "<td><div class='col-"+filter_code+"'>0</div></td>"
				}

			}
			restr += "<tr>"
		}

	}	
	$("#tbody-offline").html(restr);
	$.checkColVisiablity();

	var clickTime = t.attr("click");
}


$("#offline-select").click(offlineclick);

var hisData;
diagToolEchart();
	//历史数据请求的的函数
	var echartsText = [];
	var chartSeries;
	function initEmtpyMap(){
		var map = new Map();
		for(var i=0;i<7;i++){
			// debugger
			map.set(showDate[i],0);
		}
		return map;
	}
	function historyClick(event){
		hisGroup = !hisGroup?'all':hisGroup;
		// console.log(hisMedia)
		// console.log(hisTagId)
		if(!hisMedia){
			hisMedia = -1;
		}
		if(!hisTagId){
			hisTagId = "all";
		}
		$.ajax({
			type: "GET",
			dataType: "json",
			//测试使用的
			// url: "/diagnose_api/history_data?ad_id=" + adIdValue + "&media="+ hisMedia +"&tag=&group_by_mode=" + hisGroup,
			//正式使用的       
			url: "/diagnose_api/history_data/?ad_id=" + adIdValue + "&media="+ hisMedia +"&tag="+ hisTagId +"&group_by_mode=" + hisGroup,
			success: function (msg) {
				if (msg.ret) {
					var str = "";
					echartsText = [];
					chartSeries = [];
					hisData = msg.data;
					for(var i in hisData){
						var arrClickTemp = [];
						var arrViewTemp = [];
						var arrCostTemp = [];
						var arreCPMTemp = [];
						var arrCPCTemp = []; 
						var arrCPDTemp = [];
						var arrdownloadTemp = [];
						var selectedGroupBy = $('.group-by').html().trim();
						var selectedMedia = $('.media-selected').html().trim();
						var selectedTag = $('.tag-selected').html().trim();
						var clickDateMap = initEmtpyMap();
						var viewDateMap = initEmtpyMap();
						var costDateMap = initEmtpyMap();
						var eCPMTDateMap = initEmtpyMap();
						var cpcDateMap = initEmtpyMap();
						var cpdDateMap = initEmtpyMap();
						var downloadDateMap = initEmtpyMap();
						for(var date=0;date<7;date++){
							if(hisData[i][date]){
								clickDateMap.set(hisData[i][date].record_date.split(' ')[0], hisData[i][date].clicks);
								viewDateMap.set(hisData[i][date].record_date.split(' ')[0], hisData[i][date].view);
								costDateMap.set(hisData[i][date].record_date.split(' ')[0], hisData[i][date].cost);
								eCPMTDateMap.set(hisData[i][date].record_date.split(' ')[0], hisData[i][date].eCPM);
								cpcDateMap.set(hisData[i][date].record_date.split(' ')[0], hisData[i][date].cpc);
								cpdDateMap.set(hisData[i][date].record_date.split(' ')[0], hisData[i][date].cpd);
								downloadDateMap.set(hisData[i][date].record_date.split(' ')[0], hisData[i][date].download);
							}
							if(date == 0){
								if(selectedGroupBy == '全部'){
									if(selectedGroupBy == "全部" || selectedMedia == '全部'){
										echartsText.push("全部")
									}else if(selectedGroupBy != "全部"){
										echartsText.push(hisData[i][date].tag_id)
									}else if(selectedMedia != '全部'){
										echartsText.push(hisData[i][date].media_name)                                        
									}
								}else if(selectedGroupBy == '媒体名称'){
									echartsText.push(hisData[i][date].media_name)                                    

								}else if(selectedGroupBy == '广告位名称'){
									echartsText.push(hisData[i][date].tag_id)
								}
							}
						}
						clickDateMap.forEach(function(value,key){
							arrClickTemp.push(value);
						})

						viewDateMap.forEach(function(value,key){
							arrViewTemp.push(value);
						})

						costDateMap.forEach(function(value,key){
							arrCostTemp.push(value);
						})

						eCPMTDateMap.forEach(function(value,key){
							arreCPMTemp.push(value);
						})
						
						cpcDateMap.forEach(function(value,key){
							arrCPCTemp.push(value);
						})
						
						cpdDateMap.forEach(function(value,key){
							arrCPDTemp.push(value);
						})

						downloadDateMap.forEach(function(value,key){
							arrdownloadTemp.push(value);
						})
						
						chartSeries.push({
							symbol: 'circle',
							name: 'view',
							type: 'line',
							data: arrViewTemp,
							symbolSize:8,

						},{
							symbol: 'circle',
							name: 'clicks',
							type: 'line',
							data: arrClickTemp,
							symbolSize:8
						},{
							symbol: 'circle',
							name: 'cost',
							type: 'line',
							data:  arrCostTemp,
							symbolSize:8
						},{
							symbol: 'circle',
							name: 'eCPM',
							type: 'line',
							data: arreCPMTemp,
							symbolSize:8
						},{
							symbol: 'circle',
							name: 'cpc',
							type: 'line',
							data: arrCPCTemp,
							symbolSize:8
						},{
							symbol:'circle',
							name: 'cpd',
							type: 'line',
							data: arrCPDTemp,
							symbolSize:8
						},{
							symbol:'circle',
							name: 'download',
							type: 'line',
							data: arrdownloadTemp,
							symbolSize:8
						})
					}
					diagToolEchart()
				} else {
					// alert("查询错误")
				}
			},
			error: function () {
				// alert("查询失败")
			}
		});
}

	//历史数据
	var hisGroup;
	var hisMedia;
	var hisTagId;
	$("#his-group").on("click","li",function(){
		var btn = $(this).parent().siblings("button");
		var lival = $(this).text();
		hisGroup = $(this).attr('data-id');
		$(btn).text(lival);
	});
	//点击历史记录媒体名称
	$(".his-media-search").click(function(){
		$(".media-context").html(mediaNameDet);
		$(this).val('');
		$("#his-media").css("display","block");
		// showOrHideMedia($(this));
		$("#his-media").height(210);
		$("#his-media").css("overflow","auto");
		$(".result-media").css("display","none");
		return false;
	})

	$(".his-media-search").on("blur",function(){
		$("#his-media").css("display","none");
	})
	//历史数据查询媒体名称
	$('.his-media-search').on("keyup",function(){
		var val = $(this).val();
		if(!val.trim()){
			return
		}
		var length = allMesiaText.length;
		var accurateArr = [];
		var notAccurateArr = [];
		for(var i = 0;i<length;i++){
			if(allMesiaText[i].indexOf(val.toUpperCase()) == 0 || allMesiaText[i].indexOf(val.toLowerCase()) == 0){
				accurateArr.push(allMesiaText[i]);
			}else if(~allMesiaText[i].indexOf(val.toUpperCase()) || ~allMesiaText[i].indexOf(val.toLowerCase())){
				notAccurateArr.push(allMesiaText[i]);
			}
		}
		var allSelectArr = [];
		allSelectArr = allSelectArr.concat(accurateArr).concat(notAccurateArr);
		if(allSelectArr.length == 0){
			$(".media-context").css("display","none");
			return
		}
		var str = '';
		for (var i in allSelectArr) {
			var currentSelect = allSelectArr[i];
			str += "<li  data-id="+ historyMediaId.get(currentSelect.split('-')[0]) +"><a href='javascript:;'>" + currentSelect + "</a></li>";
		}
		$("#his-media").html(str);
		$("#his-media").css("display","block");
		if($("#his-media").height() > 210){
			$("#his-media").height(210);
			$("#his-media").css("overflow","auto");
		}else{
			$("#his-media").height("auto");
			$("#his-media").css("overflow","visible");

		}
	})
	$("#his-media").on("mousedown","li",function(event){
		event.preventDefault(); 
		var btn = $(this).parent().siblings("input");
		var lival = $(this).text();
		hisMedia = $(this).attr('data-id');
		$(btn).val(lival);
		$("#his-media").css('display','none');
	});
	//历史数据查询tagId
	$(".his-tagId-search").click(function(){
		$("#his-TagId").html(TagIdNameDet);
		$(this).val('');
		$("#his-TagId").css("display","block");
		// showOrHideMedia($(this));
		$("#his-TagId").height(210);
		$("#his-TagId").css("overflow","auto");
		$(".result-tagId").css("display","none");
		return false;
	})

	$(".his-tagId-search").on("blur",function(){
		$("#his-TagId").css("display","none");
	})
	$('.his-tagId-search').on("keyup",function(){
		var val = $(this).val();
		if(!val.trim()){
			return
		}
		var length = allTagIdText.length;
		var accurateArr = [];
		var notAccurateArr = [];
		for(var i = 0;i<length;i++){
			if(allTagIdText[i].indexOf(val.toLowerCase()) == 0 || allTagIdText[i].indexOf(val.toUpperCase()) == 0){
				accurateArr.push(allTagIdText[i]);
			}else if(~allTagIdText[i].indexOf(val.toLowerCase()) || ~allTagIdText[i].indexOf(val.toUpperCase())){
				notAccurateArr.push(allTagIdText[i]);
			}
		}
		var allSelectArr = [];
		allSelectArr = allSelectArr.concat(accurateArr).concat(notAccurateArr);
		if(allSelectArr.length == 0){
			$("#his-TagId").css("display","none");
			return
		}
		var str = '';
		for (var i in allSelectArr) {
			var currentSelect = allSelectArr[i];
			str += "<li  data-id="+ currentSelect.substring(0,currentSelect.indexOf('-')) +"><a href='javascript:;'>" + currentSelect + "</a></li>";
		}
		$("#his-TagId").html(str);
		if($("#his-TagId").height() > 210){
			$("#his-TagId").height(210);
			$("#his-TagId").css("overflow","auto");
		}else{
			$("#his-TagId").height("auto");
			$("#his-TagId").css("overflow","visible");

		}
	})
	$("#his-TagId").on("mousedown","li",function(event){
		event.preventDefault(); 
		var btn = $(this).parent().siblings("input");
		var lival = $(this).text();
		hisTagId = $(this).attr('data-id');
		$(btn).val(lival);
		$("#his-media").css('display','none');
	});
	//echarts图表
	function diagToolEchart(){
		var clickTime = 1;
		var myChart = echarts.init($("#main")[0]);
		var option = {
			tooltip: {
	            // 坐标轴触发
	            trigger: 'item',
	            // show:false,
	            triggerOn :'mousemove',
	            formatter: function (params) {
	            	var res = params.name + "<br/>";
	            	res += params.seriesName  + ' : ' + params.value +'&nbsp;&nbsp;'+ echartsText[Math.floor((params.seriesIndex)/7)] + "<br/>";
	            	return res;
	            },
	        },
	        color:['#48cda6','#fd87ab','#11abff','#da464a','#968ade','#ffdf33','#b733ac'],
	        legend: {
	        	width: "100%",
	        	height: 80,
	        	bottom: 'bottom',
	        	right:'35%',
	        	selected : {
	        		'view' : true,
	        		'clicks' : false,
	        		'cost' : false,
	        		'eCPM' : false,
	        		'cpc' : false,
	        		'cpd' : false,
	        		'download' : false
	        	},
	        	itemWidth : 10,
	        	itemHeight : 10,
	        	data:[{
	        		name:'view',
	        		textStyle:{
	        			fontSize:12,
	        			fontWeight:'bold',
	        			color:'#000'
	        		},
	        		icon:'circle'
	        	},{
	        		name:'clicks',
	        		textStyle:{
	        			fontSize:12,
	        			fontWeight:'bold',
	        			color:'#000'
	        		},
	        		icon:'circle'
	        	},{   
	        		name:'cost',
	        		textStyle:{
	        			fontSize:12,
	        			fontWeight:'bold',
	        			color:'#000'
	        		},
	        		icon:'circle'
	        	},{   
	        		name:'eCPM',
	        		textStyle:{
	        			fontSize:12,
	        			fontWeight:'bold',
	        			color:'#000'
	        		},
	        		icon:'circle'
	        	},{   
	        		name:'cpc',
	        		textStyle:{
	        			fontSize:12,
	        			fontWeight:'bold',
	        			color:'#000'
	        		},
	        		icon:'circle'
	        	},{
	        		name:'cpd',
	        		textStyle:{
	        			fontSize:12,
	        			fontWeight:'bold',
	        			color:'#000'
	        		},
	        		icon:'circle'
	        	},{
	        		name:'download',
	        		textStyle:{
	        			fontSize:12,
	        			fontWeight:'bold',
	        			color:'#000'
	        		},
	        		icon:'circle'
	        	}]
	        },
	        grid: {
	        	left: '3%',
	        	right: '4%',
	        	bottom: '3%',
	        	top: 40,
	        	height: 420,
	        	containLabel: true

	        },
	        xAxis: {
	        	type: 'category',
	        	boundaryGap: false,
	        	data: showDate
	        },
	        yAxis: [
	        {
	        	type: 'value',
	        	splitLine:{
	        		lineStyle:{
	        			color:'#ccc',
	        			type:'solid',                            
	        		}
	        	},
	        	axisLine:{
	        		lineStyle:{
	        			color:'#000',
	        			type:'solid',  
	        		}
	        	},
	        	axisLabel: {
	        		show: true,
	        		textStyle: {
	        			color: '#000'
	        		}
	        	},
	        },
	        {
	        	type: 'value',
	        	splitLine:{
	        		lineStyle:{
	        			type:'dotted',
	        			color:'#337ab7',
	        		}
	        	},
	        	axisLine:{
	        		lineStyle:{
	        			type:'dotted',
	        			color:'#337ab7',  
	        		}
	        	},
	        	axisLabel: {
	        		show: true,
	        		textStyle: {
	        			color: '#337ab7'
	        		}
	        	},
	        },

	        ],
	        series: chartSeries
	    };

	    myChart.setOption(option);
	    let currentOption = myChart.getOption();
	    currentOption.series = chartSeries;
	    myChart.setOption(currentOption,true);
	    clickTime++;
	    var selNum;
	    myChart.on("legendselectchanged",function(parmas){
	    	if(parmas.name == 'download'){
	    		if(parmas.selected.download == true){
	    			let currentOption = myChart.getOption();
	    			data = currentOption.legend[0].data;
	    			myChart.setOption(currentOption,true);
	    		}else{
	    			let currentOption = myChart.getOption();
	    			data = currentOption.legend[0].data;
	    			myChart.setOption(currentOption,true);
	    		}
	    	}
	    	selNum = 0;
	    	var selected = parmas.selected;
	    	for(var key in selected){
	    		if(selected[key]){
	    			selNum += 1;
	    		}
	    	}
	    	if(selNum >= 3){
	    		let currentName = parmas.name;
	    		selected[currentName] = false;
	    		let currentOption = myChart.getOption();
	    		currentOption.legend[0].selected = selected;
	    		myChart.setOption(currentOption,true);
	    	}else if(selNum == 2){
	    		for(var i=0;i<chartSeries.length;i++){
	    			if(chartSeries[i].name == parmas.name){
	    				chartSeries[i].yAxisIndex = 1;
	    			}else{
	    				chartSeries[i].yAxisIndex = 0;
	    			}
	    		}
	    		let currentOption = myChart.getOption();
	    		currentOption.series = chartSeries;
	    		myChart.setOption(currentOption,true);
	    	}else if(selNum == 1){
	    		for(var i=0;i<chartSeries.length;i++){
	    			chartSeries[i].yAxisIndex = 0;
	    		}
	    		let currentOption = myChart.getOption();
	    		currentOption.series = chartSeries;
	    		myChart.setOption(currentOption,true);
	    	}
	    })
	    // myChart.on('click', function (params) {
	    // 	myChart.dispatchAction({
	    // 		type: 'showTip',
	    // 		seriesIndex: params.seriesIndex,
	    // 		dataIndex: params.dataIndex,
	    // 	});
	    // });
	    $(window).resize(function() {
	    	myChart.resize();  
	    	var left = $(".container").offset().left;
	    	var fixedLeft = left - 80 ;
	    	$(".small-flag").css("left",fixedLeft);
	    });
	}

	$("#history").on('click',historyClick)

	var showDate = [];
	for(var i=8;i>=1;i--){
		showDate[8-i] = formatDate().format(new Date().getTime() - 1000 * 3600 * 24 * i,'yyyy-MM-dd')
	}
	showDate = showDate.slice(1);
	
	
	//操作日志
	var oprtBhr;
	var oprtOpt;
	var optstartDate;
	var optendDate;
	$("#oprt-opt").on("click","li",function(){
		var btn = $(this).parent().siblings("button");
		var lival = $(this).text();
		oprtOpt = $(this).attr('data-id');
		$(btn).text(lival);
	});
	$("#oprt-bhr").on("click","li",function(){
		var btn = $(this).parent().siblings("button");
		var lival = $(this).text();
		oprtBhr = $(this).attr('data-id');
		$(btn).text(lival);
	});
	//日期
	$("#opt-date").val(startDate + "~" + endDate);
	$("#opt-date").dateRangePicker({
		format : 'YYYY-MM-DD',
		language : 'cn',
		separator: '~',
		startDate: startDate,
		endDate: endDate,
		singleMonth: true,
		showShortcuts: false,
		showTopbar: false,

		autoClose: true,
		singleDate : false
	}).bind('datepicker-change',function(event,obj){
		optstartDate = obj.value.split('~')[0];
		optendDate = new Date(obj.date2*1+1*24*3600*1000).Format("yyyy-MM-dd");
	})
	//自定义每一页的条数
	var optPageSize = 10;
	$(".downnum1").on('click',"li",function(){
		var btn = $(this).parent().siblings("button");
		var lival = $(this).text();
		optPageSize = lival;
		$(btn).find('.numtxt').text(lival);
		$(this).parent().toggle();
	})
	//操作日志的点击请求的事件
	//操作日志  操作后的处理
	var VAL_SOURCE_REG = /(图片|视频)：(\[[^\]]+\])/g; 
	var val_repalce = function (value) {
		if(value){
			if (~value.indexOf("图片") || ~value.indexOf("视频")) {
				return value.replace(VAL_SOURCE_REG, function (all, txt , data_str) {
					var label = "" , type = "", p = "";
					var data = JSON.parse(data_str);
					if (txt === "图片") {
						label = "图片" ;
						type = "image";
						p = "http://file.market.xiaomi.com/thumbnail/jpeg/w240/";
						return  txt +"："+ data.filter(function (path) {
							return path; 
						}).map(function (path, index){
							index ++;
							return '<a href="'+p+path+'" data-type="'+type+'" class="outer-source js-outer-source" target="_blank">'+label+'('+index+')</a>'; 
						});

					} else {
						label = "视频" ;
						p = "http://file.market.xiaomi.com/thumbnail/jpeg/w240/";
						type = "video" 
						return txt +"："+ data.map(function (path, index) {
							index ++;
							path = path.split(",")[0];
							return '<a href="'+p+path+'" data-type="'+type+'" class="outer-source js-outer-source" target="_blank">'+label+'('+index+')</a>';
						});
					} 

				})  
			} else {
				return value; 
			}
		}else{
			return " ";

		}
	};
	var optpageSum;
	window.optclick = function(){
		if(!oprtBhr){
			oprtBhr = 0;
		}
		if(!oprtOpt){
			oprtOpt = "all";
		}
		if(!optstartDate){
			optstartDate = startDate;
		}
		if(!optendDate){
			optendDate = new Date(new Date().getTime() + 24*3600*1000).Format("yyyy-MM-dd");
		}
		optpageNum = window.optpageNum1 || 1;
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "/diagnose_api/operation_record/?ad_id=" + adIdValue + "&target="+ oprtOpt +"&operate_type="+ oprtBhr + "&start_date=" + optstartDate + "&end_date=" + optendDate + "&page_no="+ optpageNum + "&page_size=" + optPageSize,
			success: function (msg) {
				if (msg.ret) {
					dealoptpage(msg,optpageNum)
					var str = "";
					var data = msg.data;
					for (var i in data) {
						str += "<tr><td>"+data[i]['operate_time']+"</td><td>"+data[i]['target']+"</td><td>"+data[i]['operate_type']+"</td><td style='text-align:left;word-wrap: break-word;white-space: normal;'>"+val_repalce(data[i]['old_value'])+"</td><td style='text-align:left;word-wrap: break-word;white-space: normal;'>"+val_repalce(data[i]['new_value'])+"</td></tr>";
					}
					$(".opt_value").html(str);
					var total = msg.count;
					optpageSum = Math.ceil(total/optPageSize)||1;
					$(".opttotal").text("共"+optpageSum+"页");
				} else {
					// alert("查询错误")
				}
			},
			error: function () {
				// alert("查询失败")
			}
		});
	}
	//操作日志翻页的代码
	var optpageNum = 1;
	// $(".optcombineiconright").click(function(){
	// 	optpageNum = optpageNum>=optpageSum?optpageSum:++optpageNum;
	// 	$(".optpage").text("第"+optpageNum+"页");
	// 	optclick();
	// })
	// $(".optcombineiconleft").click(function(){
	// 	optpageNum = optpageNum<=1?1:--optpageNum;
	// 	$(".optpage").text("第"+optpageNum+"页");
	// 	optclick();
	// })
	$("#operate").on('click',optclick);

	var left = $(".container").offset().left;
	var fixedLeft = left - 80 ;
	$(".small-flag").css("left",fixedLeft);

	
	$('.table-body').scroll(function() {
		$('.table-header').css('margin-left',-$(this).scrollLeft())
	});

})