export const topologyCurveOption = {
    backgroundColor: "#fff",
    xAxis: {
        type: "category",
        data: Array.from({ length: 20 }, (_, i) => i),
        boundaryGap: false,
        axisLabel: {
            interval: 1
        }
    },
    yAxis: {
        type: "value",
        axisLine: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: "#A4B5E9"
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: "#A4B5E9"
            }
        },
        axisTick: {
            show: false
        }
    },
    series: [
        {
            name: "随机数据",
            type: "line",
            data: Array(20)
                .fill()
                .map(() => Math.random()),
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            }
        }
    ],
    title: {
        text: "鲁棒性曲线",
        textStyle: {
            color: "#000",
            fontSize: 16
        }
    },
    tooltip: {
        trigger: "item", // 触发类型。可以是 'item'（在数据项上触发）或 'axis'（在坐标轴上触发）
        formatter: function (params) {
            return params[0].name + ": " + params[0].value;
        }
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "18%",
        containLabel: true
    },
    visualMap: {
        show: false,
        min: 0,
        max: 1,
        // "dimension": 0,
        inRange: {
            color: ["#4a657a", "#308e92", "#24A170", "#FF8C37", "#f5898b", "#ef5055"]
        }
    },
    animationEasing: "elasticOut",
    animationEasingUpdate: "elasticOut",
    animationDelay: 20,
    animationDelayUpdate: 20
};
