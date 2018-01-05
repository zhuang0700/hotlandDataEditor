/**
 * Created by xiaomi on 2017/3/23.
 */

//var myChart = echarts.init(document.getElementById('main-chart'), 'shine');

function get_data() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/leads/api/message/trend",
        success: function (msg) {
            if (msg.ret) {
                var xAxis = [];
                var yAxis = [];
                for (var i in msg.data) {
                    xAxis.push(msg.data[i].key);
                    yAxis.push(msg.data[i].value);
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
                        data:['咨询数', '数量']
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
                            name: '咨询数',
                            type: 'line',
                            data: yAxis
                        },
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


