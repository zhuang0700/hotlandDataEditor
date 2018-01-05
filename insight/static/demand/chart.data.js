/**
 * Created by xiaomi on 2017/3/23.
 */

//var myChart = echarts.init(document.getElementById('main-chart'), 'shine');

function get_data(data_type, media_type, ad_form) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/demand/api/history/" + data_type + "?mt=" + media_type + '&af=' + ad_form,
        success: function (msg) {
            if (msg.ret) {
                var xAxis = [];
                var yAxis = [];
                var y2Axis = [];
                for (var i in msg.data) {
                    xAxis.push(msg.data[i].key);
                    yAxis.push(msg.data[i].value);
                    y2Axis.push(msg.data[i].consume);
                }

                // 指定图表的配置项和数据
                var option = {
                    title: {
//                        text: '客户趋势'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['客户数', '收入(万元)']
                    },
                    toolbox: {
//                        show : true,
//                        feature : {
//                            mark : {show: true},
//                            dataView : {show: true, readOnly: true},
//                            magicType : {show: true, type: ['line', 'bar']},
//                            restore : {show: true},
//                            saveAsImage : {show: true}
//                        }
                    },
                    xAxis: {
                        data: xAxis
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '客户数',
                            type: 'line',
                            data: yAxis
                        },
                        {
                            name: '收入(万元)',
                            type: 'line',
                            data: y2Axis
                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        error: function () {
            alert("查询失败")
        }
    });
}


