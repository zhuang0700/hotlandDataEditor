/**
 * Created by xiaomi on 2017/3/23.
 */
function get_table_data(request_date) {
        var tbody = window.document.getElementById("tbody-result");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/leads/api/message/" + '?d=' + request_date,
            success: function (msg) {
                if (msg.ret) {
                    var str = "";
                    var data = msg.data;

                    for (var i in data) {
                        str += "<tr>" +
                        "<td>" + data[i].commit_time + "</td>" +
                        "<td>" + data[i].province + "</td>" +
                        "<td>" + data[i].company_name + "</td>" +
                        "<td>" + data[i].industry + "</td>" +
                        "<td>" + data[i].website + "</td>" +
//                        "<td width=\"10%\">" + data[i].app_names + "</td>" +
                        "<td>" + data[i].contact_name + "</td>" +
                        "<td>" + data[i].telephone + "</td>" +
                        "<td>" + data[i].contact_email + "</td>" +
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