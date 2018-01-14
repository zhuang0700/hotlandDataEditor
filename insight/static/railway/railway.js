$("#showImportData").on('click',function (event) {
    show_import_data(event)
});

function show_import_data(event) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/api/railway/show_import_data",
        success: function (msg) {
            if (msg.data) {
            	for(var i=0;i<msg.data.length;i++) {
            		var data = msg.data[i];
            		str += "<tr class='canDel'>\
					<td>"+ data['city_name']+"</td>\
					<td>"+ data['line_name']+"</td>\
					<td>"+ data['mileage']+"</td>\
					<td>"+ data['marshalling_ext']+"</td>\
					<td>"+ data['max_speed']+"</td>\
					<td>"+ data['opening_time']+"</td>\
					<td>"+ data['investment']+"</td>\
					<td>"+ data['remark']+"</td>\
					</tr>";
				}
				$(".tbody").html(str);
            } else {
                // alert("查询错误")
            }
        },
        error: function () {
            // alert("查询失败")
        }
    });
}