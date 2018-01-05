/**
 * Created by xiaomi on 2017/3/23.
 */
function get_table_data(data_type, request_date, media_type, ad_form, date_type) {
    if (parseInt(date_type) != 1 && media_type != "all") {
        alert("暂不支付分媒体查看周/月数据");
        return false;
    }

    var tbody = window.document.getElementById("tbody-result");
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/demand/api/data/" + data_type + '?d=' + request_date + "&mt=" + media_type + '&af=' + ad_form + "&dt=" + date_type,
        success: function (msg) {
            if (msg.ret) {
                var str = "";
                var data = msg.data;

                for (var i in data) {
                    str += "<tr>" +
                    "<td>" + data[i].customer_name + "</td>" +
                    "<td>" + data[i].agent_name + "</td>" +
                    "<td>" + data[i].core_agent_name + "</td>" +
                    "<td>" + data[i].industry_name + "</td>" +
//                        "<td width=\"10%\">" + data[i].app_names + "</td>" +
                    "<td>" + Math.round(data[i].consume*100)/100.0 + "</td>" +
                    "<td>" + Math.round(data[i].share*10000)/100.0 + "%" + "</td>" +
                    "<td> <a href=\"/customer/history/" + data[i].customer_id + "\" target=\"_blank\">趋势</a> </td>" +
                    "</tr>";
                }
                tbody.innerHTML = str;
            }
        },
        error: function () {
            alert("查询失败")
        }
    });
}