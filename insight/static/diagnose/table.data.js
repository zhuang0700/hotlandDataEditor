/**
 * Created by xiaomi on 2017/3/23.
 */
function get_table_data(ad_id) {
        var tbody = window.document.getElementById("tbody-base-info");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/diagnose_api/baseInfo" + '?ad_id=' + ad_id,
            success: function (msg) {
                if (msg.ret) {
                    var str = "";
                    var data = msg.data;

                    for (var i in data) {
                        str += "<tr>" +
                        "<td>" + data[i].id + "</td>" +
                        "<td>" + data[i].name + "</td>" +
                        "<td>" + data[i].app_name + "</td>" +
                        "<td>" + data[i].ad_type + "</td>" +
                        "<td>" + data[i].billing_type + "</td>" +
                        "<td>" + data[i].group_id + "</td>" +
                        "<td>" + data[i].directions + "</td>" +
                        "<td>" + data[i].campaign_budget + "</td>" +
                        "</tr>";
                    }
                    tbody.innerHTML = str;
                } else {
                    alert("查询错误")
                }
            },
            error: function () {
                alert("查询失败")
            }
        });
}

function get_operation_record(ad_id, target, operate_type, date, page_no, page_size) {
    var tbody = window.document.getElementById("tbody-operation-record");
    if(date == null || date == undefined|| date=="") {
        date = new Date();
    }
    if(ad_id == null || ad_id == undefined|| ad_id=="") {
        return;
    }
    var lastweek = new Date();
    lastweek.setTime(date.getTime() - 7*24*60*60*1000)
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/diagnose_api/operation_record" +
        '?ad_id=' + ad_id + '&target=' + target + '&operate_type=' + operate_type +
        '&start_date=' + lastweek.toLocaleDateString() + '&end_date=' + date.toLocaleDateString() + '&page_no=' + page_no + '&page_size=' + page_size ,
        success: function (msg) {
            if (msg.ret) {
                var str = "";
                var data = msg.data;
                if(data != null) {
                    for (var i = 0; i < data.length; i++) {
                        str += "<tr>" +
                            "<td>" + data[i].operate_time + "</td>" +
                            "<td>" + data[i].target + "</td>" +
                            "<td>" + data[i].operate_type + "</td>" +
                            "<td>" + data[i].old_value + "</td>" +
                            "<td>" + data[i].new_value + "</td>" +
                            "</tr>";
                    }
                    tbody.innerHTML = str;
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

function get_history_data(ad_id, media, tag, group_by_mode) {
    var tbody = window.document.getElementById("tbody-history-data");
    if(ad_id == null || ad_id == undefined|| ad_id=="") {
        return;
    }
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/diagnose_api/history_data" +
        '?ad_id=' + ad_id + '&media=' + media + '&tag=' + tag +
        '&group_by_mode=' + group_by_mode,
        success: function (msg) {
            if (msg.ret) {
                var str = "";
                var data = msg.data;
                if(data != null) {
                    for (var i = 0; i < data.length; i++) {
                        str += "<tr>" +
                            "<td>" + data[i].record_date + "</td>" +
                            "<td>" + data[i].media_name + "</td>" +
                            "<td>" + data[i].tag_id + "</td>" +
                            "<td>" + data[i].consume/10000 + "</td>" +
                            "<td>" + data[i].start_download + "</td>" +
                            "<td>" + data[i].impression + "</td>" +
                            "<td>" + data[i].click + "</td>" +
                            "</tr>";
                    }
                    tbody.innerHTML = str;
                }
            } else {
                 alert("查询错误")
            }
        },
        error: function () {
            // alert("查询失败")
        }
    });
}

function get_request_statistics(ad_id, media, tag, group_by_mode) {
    var tbody = window.document.getElementById("tbody-offline-data");
    var thead = window.document.getElementById("thead-offline-data");
    if(ad_id == null || ad_id == undefined|| ad_id=="") {
        return;
    }
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/diagnose_api/request_statistics" +
        '?ad_id=' + ad_id + '&media=' + media + '&tag=' + tag +
        '&group_by_mode=' + group_by_mode,
        success: function (msg) {
            if (msg.ret) {
                var str = "";
                var data = msg.data;
                if(data != null) {
                    var thead_add_str = "";
                    var filter_keys = data.filters;
                    var records = data.records;
                    if(records != null) {
                        for (var i=0; i<records.length;i++) {
                            str += "<tr>" +
                                "<td>" + records[i].request_time + "</td>" +
                                "<td>" + records[i].retrieve_count + "</td>" +
                                "<td>" + records[i].rank_count + "</td>" +
                                "<td>" + records[i].result_count + "</td>" +
                                "<td>" + records[i].media_name + "</td>" +
                                "<td>" + records[i].tag_id + "</td>"
                            for(var j=0;j<filter_keys.length;j++) {
                                if(records[i].filters[filter_keys[j]] != null) {
                                    str += "<td>" + records[i].filters[filter_keys[j]] + "</td>"
                                } else {
                                    str += "<td>0</td>"
                                }
                            }
                            str += "<tr>"
                            if(i === 0){
                                thead.innerHTML = thead.innerHTML + thead_add_str;
                            }
                        }
                    }
                    if(filter_keys != null) {
                        for(var i=0;i<filter_keys.length;i++) {
                            thead_add_str += "<th>" + filter_keys[i] + "</th>"
                        }
                        thead.innerHTML = thead.innerHTML + thead_add_str;
                    }
                    tbody.innerHTML = str;
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