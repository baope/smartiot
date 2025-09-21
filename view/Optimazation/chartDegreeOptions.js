export const topologyDegreeOption = {
    "backgroundColor": "#fff",
    "title": {
        "text": "\u5ea6\u6570\u5206\u5e03\u66f2\u7ebf",
        "textStyle": {
            "color": "#000",
            "fontSize": 16
        },
        "padding": [
            0,
            5,
            0,
            5
        ]
    },
    "grid": {
        "left": "4%",
        "right": "4%",
        "bottom": "7%",
        "top": "18%",
        "containLabel": "true"
    },
    "xAxis": {
        "logBase": 2,
        "min": 2,
        "type": "log",
        "name": "\u5ea6\u6570",
        "nameLocation": "middle",
        "nameGap": 20
    },
    "yAxis": {
        "logBase": 2,
        "type": "log",
        "name": "\u8282\u70b9\u6570\u91cf",
        "axisLine": {
            "show": false
        },
        "axisLabel": {
            "textStyle": {
                "color": "#A4B5E9"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": "#A4B5E9"
            }
        },
        "axisTick": {
            "show": false
        },
        "nameLocation": "middle",
        "nameGap": 25
    },
    "series": [
        {
            "name": "Degree",
            "type": "line",
            "data": [[2, 504], [3, 202], [4, 96], [5, 51], [6, 32], [7, 25], [8, 23], [9, 12], [10, 5], [11, 5], [12, 10], [13, 3], [14, 3], [15, 3], [17, 4], [18, 3], [19, 2], [20, 1], [21, 3], [22, 1], [24, 1], [25, 1], [27, 1], [28, 2], [29, 2], [46, 1], [49, 1], [50, 1], [60, 1], [77, 1]],
            "itemStyle": {
                "normal": {
                    "barBorderRadius": 5,
                    "color": "rgba(0,0,0,0.5)"
                }
            },
            "lineStyle": {
                "color": {
                    "type": "linear",
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 0,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#4a657a"
                        },
                        {
                            "offset": 0.2,
                            "color": "#308e92"
                        },
                        {
                            "offset": 0.4,
                            "color": "#24A170"
                        },
                        {
                            "offset": 0.6,
                            "color": "#FF8C37"
                        },
                        {
                            "offset": 0.8,
                            "color": "#f5898b"
                        },
                        {
                            "offset": 1,
                            "color": "#ef5055"
                        }
                    ]
                }
            }
        }
    ],
    "animationEasing": "elasticOut",
    "animationEasingUpdate": "elasticOut",
    "animationDelay": 20,
    "animationDelayUpdate": 20
};
