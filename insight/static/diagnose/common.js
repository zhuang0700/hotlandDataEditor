//页数：
function init(showNum,page,pages){
    //显示的最多的页码数 showNum
    var step = Math.floor(showNum/2);
    //page表示的是当前的页码数
    //min当前展示的最小的页数
    var min = page >= showNum ? page - step : 1;

    if(page < showNum){
        var max = showNum < pages ? showNum : pages  ;
    }else if(page + step <= pages){
        var max = page + step;
    }else{
        var max = pages
        var min = max - showNum+1
    }
    min = min;
    max = max;
    return {
        min:min,
        max:max,
    }
}
//点击首页上一页，下一页，末页 ，str 首页传1，上一页传up，下一页传next，末页传总页数
function clickPageTxt(event,str,pages,page){
    var parent = event.target.parentNode;
    if (~parent.className.indexOf("disabled")) {
        return;
    }
    if(str == "1" || str == pages){
        str = str*1;
    }
    page *= 1
    switch(str){

        case 1 : 
        page = 1;
        break;
        case pages : 
        page = pages;
        break;
        case 'up' :
        page = page - 1 ;
        break;
        case 'next' : 
        page = page + 1;
        break;
    }

    if(page >pages){
        page = pages;
    }
    
    if(page <= 0){
        page = 1;
    }
    return {
        page:page
    }

}
window.optpageNum1;
function dealoptpage(msg,optpageNum){
    optpageNum *= 1;
    //页码：
    var total = msg.count;
    var optPageSize = msg.pageSize;
    var optpageSum = Math.ceil(total/optPageSize)||1;
    // $(".opttotal").text("共"+optpageSum+"页");
    var pageRange = init(9,optpageNum,optpageSum);
    var optpageStr = '<li>\
    <div class="dropdown optpage-drop">\
    <button class="btn dropdown-toggle optpage-btn" type="button">\
    <span class="dropdown-title">'+optpageNum+'</span>\
    <span class="caret"></span>\
    </button>\
    <ul class="dropdown-menu optpage-ul">\
    </ul>\
    </div>\
    </li>'+
    '<li class="optpageTxt"  data="next"><a href="javascript:;" class="icon_left"><i></i></a></li>';
    var ulstr = "";
    if(pageRange.min > 1){
        optpageStr += '<li><a href="javascript:;">...</a></li>';
    }
    for(var i = 0;i<pageRange.max;i++){
        if(i + 1 >= pageRange.min){
            if(i == (optpageNum-1)){
                optpageStr += '<li class="active optpage'+ (i+1)+' optpage"><a href="javascript:;">'+ (i + 1) +'</a></li>';                             
            }else{
                optpageStr += '<li class="optpage'+ (i+1)+' optpage"><a href="javascript:;">'+ (i + 1) +'</a></li>';                                
            }                       
        }
    }
    for(var i = 0;i<optpageSum;i++){
        ulstr += '<li>'+ (i + 1) +'</a></li>';
    }
    if(pageRange.max < optpageSum){
        optpageStr += '<li><a href="javascript:;">...</a></li>';
    }
    optpageStr +=  '<li class="optpageTxt"  data="next"><a href="javascript:;" class="icon_right"><i></i></a></li>';
    $('#opt-page').html(optpageStr);

    //下拉的page
    $('.optpage-ul').html(ulstr);
    $('.optpage-btn').on('click',function(){
        $('.optpage-ul').toggle();
    })
    $('.optpage-ul').on('mouseover','li',function(event){
        $(this).css('background-color',"#f5f7f8")
    })
    $('.optpage-ul').on('mouseleave','li',function(event){
        $(this).css('background-color',"#fff")
    })
    $('.optpage-ul').on('click','li',function(event){
        event.stopPropagation();
        event.preventDefault();
        optpageNum = this.innerText.trim();
        $('.dropdown-title').text(optpageNum);
        $('.optpage-ul').toggle();
        // optlineclick();
        window.optpageNum1 = dealoptpage(msg,optpageNum);
        $('.optpage'+optpageNum).addClass('active').siblings('li').removeClass('active');
        window.optclick();

        if(optpageNum == 1){
            $('.optpre').addClass('disabled');
            $('.optnext').removeClass('disabled');
        }else if(optpageNum == optpageSum){
            $('.optpre').removeClass('disabled');
            $('.optnext').addClass('disabled');                     
        }else{
            $('.optpageTxt').removeClass('disabled')
        }
    })
    $('.optpageTxt').on('click',function(){
        var str = $(this).attr('data');
        var pageInfo = clickPageTxt(event,str,optpageSum,optpageNum);
        if(pageInfo){
            optpageNum = pageInfo.page;
            $('.optpage'+optpageNum).addClass('active').siblings('li').removeClass('active');
        }
        if(optpageNum == 1){
            $('.optpre').addClass('disabled');
            $('.optnext').removeClass('disabled');
        }else if(optpageNum == optpageSum){
            $('.optpre').removeClass('disabled');
            $('.optnext').addClass('disabled');                     
        }else{
            $('.optpageTxt').removeClass('disabled')
        }
        window.optpageNum1 = dealoptpage(msg,optpageNum,optpageSum);
        window.optclick();


    })
    $('.optpage').on('click',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
        optpageNum = this.innerText;
        $('.optdownpage').innerText = optpageNum;
        $('.optpage'+optpageNum).addClass('active').siblings('li').removeClass('active');
        // optlineclick();
        if(optpageNum == 1){
            $('.optpre').addClass('disabled');
            $('.optnext').removeClass('disabled');
        }else if(optpageNum == optpageSum){
            $('.optpre').removeClass('disabled');
            $('.optnext').addClass('disabled');                     
        }else{
            $('.optpageTxt').removeClass('disabled')
        }
        window.optpageNum1 = dealoptpage(msg,optpageNum,optpageSum);
        window.optclick();
    })
    return optpageNum;
}


window.offpageNum1;
function dealpage(msg,offpageNum){
    offpageNum *= 1;
        //页码：
        var total = msg.count;
        var offPageSize = msg.pageSize;
        var offpageSum = Math.ceil(total/offPageSize)||1;
        // $(".offtotal").text("共"+offpageSum+"页");
        var pageRange = init(9,offpageNum,offpageSum);
        var offpageStr = '<li>\
        <div class="dropdown offpage-drop">\
        <button class="btn dropdown-toggle offpage-btn" type="button">\
        <span class="dropdown-title">'+offpageNum+'</span>\
        <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu offpage-ul">\
        </ul>\
        </div>\
        </li>'+
        '<li class="offpageTxt" data="up"><a href="javascript:;" class="icon_left"><i></i></a></li>';
        var ulstr = "";
        if(pageRange.min > 1){
            offpageStr += '<li><a href="javascript:;">...</a></li>';
        }
        for(var i = 0;i<pageRange.max;i++){
            if(i + 1 >= pageRange.min){
                if(i == (offpageNum-1)){
                    offpageStr += '<li class="active offpage'+ (i+1)+' offpage"><a href="javascript:;">'+ (i + 1) +'</a></li>';                             
                }else{
                    offpageStr += '<li class="offpage'+ (i+1)+' offpage"><a href="javascript:;">'+ (i + 1) +'</a></li>';                                
                }                       
            }
        }
        for(var i = 0;i<offpageSum;i++){
            ulstr += '<li>'+ (i + 1) +'</a></li>';
        }
        if(pageRange.max < offpageSum){
            offpageStr += '<li><a href="javascript:;">...</a></li>';
        }
        offpageStr +=  '<li class="offpageTxt" data="next"><a href="javascript:;" class="icon_right"><i></i></a></li>'+
        '</li>';
        $('#off-page').html(offpageStr);

        //下拉的page
        $('.offpage-ul').html(ulstr);
        $('.offpage-btn').on('click',function(){
            $('.offpage-ul').toggle();
        })
        $('.offpage-ul').on('mouseover','li',function(){
            $(this).css('background-color',"#f5f7f8")
        })
        $('.offpage-ul').on('mouseleave','li',function(){
            $(this).css('background-color',"#fff")
        })
        $('.offpage-ul').on('click','li',function(event){
            event.stopPropagation();
            event.preventDefault();
            offpageNum = this.innerText.trim();
            $('.dropdown-title').text(offpageNum);
            $('.offpage-ul').toggle();
            // window.offlineclick();
            window.offpageNum1 = dealpage(msg,offpageNum);
            $('.offpage'+offpageNum).addClass('active').siblings('li').removeClass('active');
            window.offlineclick();

            if(offpageNum == 1){
                $('.offpre').addClass('disabled');
                $('.offnext').removeClass('disabled');
            }else if(offpageNum == offpageSum){
                $('.offpre').removeClass('disabled');
                $('.offnext').addClass('disabled');                     
            }else{
                $('.offpageTxt').removeClass('disabled')
            }
        })
        $('.offpageTxt').on('click',function(){
            var str = $(this).attr('data');
            var pageInfo = clickPageTxt(event,str,offpageSum,offpageNum);
            if(pageInfo){
                offpageNum = pageInfo.page;
                $('.offpage'+offpageNum).addClass('active').siblings('li').removeClass('active');                           
                // window.offlineclick();                          
            }
            if(offpageNum == 1){
                $('.offpre').addClass('disabled');
                $('.offnext').removeClass('disabled');
            }else if(offpageNum == offpageSum){
                $('.offpre').removeClass('disabled');
                $('.offnext').addClass('disabled');                     
            }else{
                $('.offpageTxt').removeClass('disabled')
            }
            window.offpageNum1 = dealpage(msg,offpageNum);
            window.offlineclick();
        })
        $('.offpage').on('click',function(){
            $(this).addClass('active').siblings('li').removeClass('active');
            offpageNum = this.innerText;
            $('.offdownpage').innerText = offpageNum;
            $('.offpage'+offpageNum).addClass('active').siblings('li').removeClass('active');
            if(offpageNum == 1){
                $('.offpre').addClass('disabled');
                $('.offnext').removeClass('disabled');
            }else if(offpageNum == offpageSum){
                $('.offpre').removeClass('disabled');
                $('.offnext').addClass('disabled');                     
            }else{
                $('.offpageTxt').removeClass('disabled')
            }            
            window.offpageNum1 = dealpage(msg,offpageNum);
            window.offlineclick();
        })

        return offpageNum;
    }
/**
* yyyy-MM-dd HH:mm
* @param {Date| number | str} dataStr
* @param {Object} pattern
*/
function formatDate(require, exports, module) {
    var d = {
        buildDate: function(str) {
            if (typeof(str) == "number") {
                return new Date(str);
            } else if (str instanceof Date) {
                return str;
            }
            if (!str) {
                return null;
            }
            if (str.indexOf("+") >= 0) {
                str = str.replace("+0800 ", "");
            }
            str = str.replace(/-/g, "/");
            return new Date(str);
        },
            /**
             * yyyy-MM-dd HH:mm
             * @param {Date| number | str} dataStr
             * @param {Object} pattern
             */
             format: function(dataStr, pattern) {
                var date = this.buildDate(dataStr);
                var hour = date.getHours();
                var o = {
                    "M+": date.getMonth() + 1, //month
                    "d+": date.getDate(), //day
                    "H+": hour, //hour
                    "h+": (hour > 12 ? hour - 12 : hour), //hour
                    "m+": date.getMinutes(), //minute
                    "s+": date.getSeconds(), //second
                    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                    "S": date.getMilliseconds() //millisecond
                }
                if (/(y+)/.test(pattern)) {
                    pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(pattern)) {
                        pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                    return pattern;
                },
                getChineseDate: function(tar, res) {

                    if (!res) {
                        res = new Date();
                    }
                    if (typeof(tar) == "string") {
                        tar = this.buildDate(tar)
                    }
                    if (!tar || !tar.getTime()) {
                        return "";
                    }
                    var resTime = res.getTime();
                    var tarTime = tar.getTime();
                    var between = (resTime - tarTime) / 1000;
                    return this.between(between) + "前";
                },
                between: function(bet) {
                    bet = Math.abs(parseInt(bet));
                    bet = bet == 0 ? 1 : bet;
                    if (bet < 60) {
                        return bet + "秒";
                    }
                    if (bet < 3600) {
                        return parseInt(bet / 60) + "分钟";
                    }
                    if (bet < 3600 * 24) {
                        return parseInt(bet / 3600) + "小时";
                    }
                    if (bet < 3600 * 24 * 30) {
                        return parseInt(bet / (3600 * 24)) + "天";
                    }
                    if (bet < 3600 * 24 * 30 * 12) {
                        return parseInt(bet / (3600 * 24 * 30)) + "月";
                    }
                    return parseInt(bet / (3600 * 24 * 30 * 12)) + "年"
                },
            /**
             * 剩余多少时间
             * 1天20小时15分20秒
             * @param {Object} second
             */
             liveTime: function(second) {

             },
             /**时间差*/
             differenceTime: function(second, str, flag) {
                var m = parseInt(second / 60);
                var h = parseInt(m / 60);
                var s = second % 60;
                m = m < 10 ? "0" + m : m;
                s = s < 10 ? "0" + s : s;
                if (!/h+/.test(str)) {
                    var o = {
                        'm+': m,
                        's+': s
                    }
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(str)) {
                            str = str.replace(RegExp.$1, o[k]);
                        }
                    } else {
                        h = h < 10 ? "0" + h : h;
                        m = m % 60;
                        m = m < 10 ? "0" + m : m;
                        var o = {
                            'h+': h,
                            'm+': m,
                            's+': s
                        }
                        for (var k in o)
                            if (new RegExp("(" + k + ")").test(str)) {
                                str = str.replace(RegExp.$1, o[k]);
                            }
                        }
                        if (h == 0 && flag === true) {
                            return str.substr(3, 7);
                        }
                        return str;
                    },
                    getUTCDate: function(date) {
                // date = this.buildDate(date);
                // // date = new Date(date)
                // console.log(date)
                // return date

                var dateArr = date.split(' ');
                dates = dateArr[0].split('-')

                if (dateArr[1]) {
                    var times = dateArr[1].split(':')
                    return new Date(
                        dates[0], dates[1]-1, dates[2], times[0], times[1], times[2]
                        );

                }

                return new Date(
                    dates[0], dates[1] - 1, dates[2]
                    );
            }
        }
        // console.log(d.getUTCDate('2014-11-20').getMonth())
        return d;
    }
    $(function(){
        window.mediaNameDet = '';
        window.TagIdNameDet = '';
        window.historyMediaId = new Map();
        window.tagIdId = new Map();
        window.allMesiaText = [];
        window.allTagIdText = [];
        //媒体名称 获取
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/diagnose_api/media_types",
            success: function (msg) {
                if (msg.ret) {
                    mediaNameDet = "<li data-id='-1'><a href='javascript:;'>全部</a></li>";
                    var mediaName = msg.data;

                    for (var i in mediaName) {
                        historyMediaId.set(mediaName[i].media_name,mediaName[i].media_id);
                        if (mediaName[i].media_id >= 0) {
                            mediaNameDet += "<li data-id=" + mediaName[i].media_id + " data-name=" + mediaName[i].media_name + "><a href='javascript:;'>" + mediaName[i].media_name + "-" + mediaName[i].display_name + "</a></li>";
                        }
                    }
                    $(".media-context").html(mediaNameDet);
                    if($(".media-context").height() > 210){
                        $(".media-context").height(210);
                        $(".media-context").css("overflow","auto");
                    }else{
                        $(".media-context").height("auto");
                        $(".media-context").css("overflow","visible");

                    }  

                    var mediaLi = Array.from($('#his-media').find("li"));
                    mediaLi.forEach(function(value,index){
                        allMesiaText.push($(value).text());
                    }) 

                } else {
                    alert("查询错误")
                }
            },
            error: function () {
                alert("查询失败")
            }
        });
        //tag-id的获取
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/diagnose_api/tag_ids",
            success: function (msg) {
                if (msg.ret) {
                    var str = "<li data-id='all'><a href='javascript:;'>全部</a></li>";
                    var items = msg.data;
                    for (var i in items) {
                        tagIdId.set(items[i].tag_name,items[i].tag_id);
                        str += "<li data-id=" +items[i].tag_id+ " data-name="+ items[i].tag_name +"><a href='javascript:;'>" + items[i].tag_id +"-"+items[i].tag_name+"</a></li>";
                    }                
                    TagIdNameDet = str;
                    $(".tag-content").html(str);
                    if($(".tag-content").height() > 210){
                        $(".tag-content").height(210);
                        $(".tag-content").css("overflow","auto");
                    }else{
                        $(".tag-content").height("auto");
                        $(".tag-content").css("overflow","visible");

                    }                   
                    var tagIdLi = Array.from($('#offline-TagId').find("li"));
                    tagIdLi.forEach(function(value,index){
                        if($(value).text() == "全部"){
                            allTagIdText.push("all-" + $(value).text());
                        }else{
                            allTagIdText.push($(value).text());                         
                        }
                    })
                } else {
                    alert("查询错误")
                }
            },
            error: function () {
                alert("查询失败")
            }
        });
        //固定定位
        $(window).scroll(function(){
            if($(window).scrollTop() > oneTop && $(window).scrollTop() < twoTop){
                $(".small-flag").find("li:eq(0)").css("background-color","#e8f0fa").siblings().css("background-color","#fff");
            }else if($(window).scrollTop() > twoTop && $(window).scrollTop() < threeTop){
                $(".small-flag").find("li:eq(1)").css("background-color","#e8f0fa").siblings().css("background-color","#fff");
            }else if($(window).scrollTop() > threeTop && $(window).scrollTop() < fourTop){
                $(".small-flag").find("li:eq(2)").css("background-color","#e8f0fa").siblings().css("background-color","#fff");
            }else if($(window).scrollTop() > fourTop && $(window).scrollTop() < fiveTop){
                $(".small-flag").find("li:eq(3)").css("background-color","#e8f0fa").siblings().css("background-color","#fff");
            }else if($(window).scrollTop() > fiveTop){
                $(".small-flag").find("li:eq(4)").css("background-color","#e8f0fa").siblings().css("background-color","#fff");
            }
        })
        // 固定定位
        $(".small-flag").on("click mouseover","li",function(){
            $(this).css("background-color","#e8f0fa").siblings().css("background-color","#fff");

        });

        //删除的功能
        $(".diag-del").click(function(){
            $(this).siblings('input').val('');
            $(this).hide();
        })
        var oneTop = $("#one").offset().top;
        var twoTop = $("#two").offset().top;
        var threeTop = $("#three").offset().top;
        var fourTop = $("#four").offset().top;
        var fiveTop = $("#five").offset().top;
        //鼠标进过媒体名称
        $(".media").mouseover(function(){
            $(this).siblings(".result-media").text($(this).val()||"全部");
            $(this).siblings(".result-media").css("display","block")
        })
        $(".media").mouseleave(function(){
            $(this).siblings(".result-media").css("display","none")
        })
        //鼠标经过tag-id的名称
        $(".tag-id").mouseover(function(){
            $(this).siblings(".result-tagId").text($(this).val()||"全部")
            $(this).siblings(".result-tagId").css("display","block")
        })
        $(".tag-id").mouseleave(function(){
            $(this).siblings(".result-tagId").css("display","none")
        })    

        //每一栏的折叠的功能
        $(".my-icon").click(function(){
            if($(this).siblings(".panel-body").css("display") == "none"){
                $(this).siblings(".panel-body").css("display","block");
                $(this).removeClass("glyphicon-menu-up");
                $(this).addClass("glyphicon-menu-down");
            }else{
                $(this).siblings(".panel-body").css("display","none");
                $(this).removeClass("glyphicon-menu-down");
                $(this).addClass("glyphicon-menu-up");
            }
        })
        var spanarr = [$('.offline-spanm'),$('.offline-spant'),$('.his-spanm'),$('.his-spant')];

        $('.offline-spanm').on("click",function(){
            $(this).siblings('ul').toggle();
            showOrHide($(this));
            return false;
        })
        $('.offline-spant').on("click",function(){
            $(this).siblings('ul').toggle();
            showOrHide($(this));
            return false;
        })
        $('.his-spanm').on("click",function(){
            $(this).siblings('ul').toggle();
            showOrHide($(this));
            return false;
        })
        $('.his-spant').on("click",function(){
            $(this).siblings('ul').toggle();
            showOrHide($(this));
            return false;
        })
        $('body').on('click',function(){
            $('.icon-search').siblings('ul').css('display','none')
        })
        $('.off-span').on('click',function(){
            if($(this).siblings('ul').css('display') == 'none'){
                $('.off-span').addClass('glyphicon-menu-right');
                $('.off-span').removeClass('glyphicon-menu-down');
                $(this).addClass('glyphicon-menu-down');
            }else{
                $('.off-span').addClass('glyphicon-menu-right');
                $('.off-span').removeClass('glyphicon-menu-down');
                $(this).addClass('glyphicon-menu-right');

            }
        })
        

        //页数：
        $('.buttonnum').on('click',function(){
            $(this).siblings('.downnum').toggle();
        })
        $('.downnum').on('mouseover','li',function(){
            $(this).css('background-color','#f5f7f8')
        })
        $('.downnum').on('mouseout','li',function(){
            $(this).css('background-color','#fff')
        })
        //页数
        $('.buttonnum').on('click',function(){
            $(this).siblings('.downnum1').toggle();
        })
        $('.downnum1').on('mouseover','li',function(){
            $(this).css('background-color','#f5f7f8')
        })
        $('.downnum1').on('mouseout','li',function(){
            $(this).css('background-color','#fff')
        })

    })