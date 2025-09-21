import echart from 'echarts';
// import AMap from 'AMap';

export function getMultiBarOption(legend, xaxis, data) {
    const series = []
    const bottomColor = ['#0067FF', '#F21C60', '#1d976c'];
    const topColor = ['#56CCF2', '#E53C30', '#54e78f']
    for (let _ = 0; _ < data.length; _++) {
        series.push({
            name: legend[_],
            type: 'bar',
            data: data[_],
            barWidth: '15%',
            itemStyle: {
                normal: {
                    color: new echart.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: topColor[_]
                    }, {
                        offset: 1,
                        color: bottomColor[_]
                    }]),
                    barBorderRadius: [12, 12, 0, 0]
                }
            }
        })
    }

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            top: 0,
            left: 0,
            text: "数据量总览(周)",
            textStyle: {
                fontSize: '16',
            },
        },
        legend: {
            data: legend,
            right: 10,
            top: 11,
            itemWidth: 14,
            itemHeight: 14,
            icon: 'circle',
            textStyle: {
                padding: [3, 0, 0, 0],
                fontWeight: 'bold'
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '5%',
            top: '16%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: xaxis,
                axisLine: {
                    lineStyle: {
                        color: '#DCE2E8'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 25,
                    textStyle: {
                        color: '#556677',
                        fontWeight: 'bold'
                    },
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#C3C9CF'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#556677',
                        fontWeight: 'bold'
                    }
                },
                splitNumber: 4
            }
        ],
        series: series
    }

    return option;
}

export function getMultiPieOption(data) {
    var titleArr = [
        {
            top: 0,
            left: 0,
            text: '边缘计算资源总览',
            textStyle: {
                fontSize: '16',
            },
        }
    ], seriesArr = [];
    const colors = [['#389af4', '#dfeaff'], ['#ff8c37', '#ffdcc3'], ['#fd6f97', '#fed4e0'], ['#a181fc', '#e3d9fe'], ['#ffc257', '#ffedcc']]
    data.forEach(function (item, index) {
        titleArr.push(
            {
                text: item.name,
                left: index % 2 == 0 ? "25%" : "75%",
                top: index < 2 ? "48%" : "92%",
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '16',
                    color: colors[index][0],
                    textAlign: 'center',
                },
            }
        );
        seriesArr.push(
            {
                name: item.name,
                type: 'pie',
                clockWise: false,
                radius: [40, 50],
                itemStyle: {
                    normal: {
                        color: colors[index][0],
                        shadowColor: colors[index][0],
                        shadowBlur: 0,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                hoverAnimation: false,
                center: [index % 2 == 0 ? "25%" : "75%", index < 2 ? "30%" : " 75%"],
                data: [{
                    value: item.value,
                    label: {
                        normal: {
                            formatter: function (params) {
                                return params.value + '%';
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                                color: colors[index][0]
                            }
                        }
                    },
                }, {
                    value: 100 - item.value,
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            color: colors[index][1]
                        },
                        emphasis: {
                            color: colors[index][1]
                        }
                    }
                }]
            }
        )
    });


    const option = {
        title: titleArr,
        series: seriesArr
    }
    console.log(option)
    return option
}

export function  getModelLine(name, xName, xData, yName, data, legends) {
  const option = {
    title: {
      text: name
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: legends,
      orient: 'vertical',
      x: 'right',
      y: 'top'
    },
    grid: {
      show: false,
      z: 0,
      left: "8%",
      top: 60,
      right: "8%",
      bottom: 40,
      containLabel: false,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    },
    xAxis: {
      name: xName,
      nameTextStyle :{
        fontSize: 15
    },
      type: 'category',
      boundaryGap: false,
      data: xData,
    },
    yAxis: {
      scale: true,
      name: yName,
      nameTextStyle :{
        fontSize: 15
    },
      type: 'value'
    },
    series: []
  }
  for(let i in data) {
    let temp = {'name': data[i].name, 'type':'line', 'data':data[i].value}
    option.series.push(temp)
  }
  return option
}

export function getModelBar(name, xName, xData, yName, data, legends) {
  let option = {
    title: {
      text: name
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: legends,
      orient: 'vertical',
      x: 'right',
      y: 'top'
    },
    grid: {
      show: false,
      z: 0,
      left: "8%",
      top: 60,
      right: "8%",
      bottom: 40,
      containLabel: false,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    },
    xAxis: {
      name: xName,
      type: 'category',
      boundaryGap: true,
      data: xData,
      nameTextStyle :{
        fontSize: 15
    }
    },
    yAxis: {
      name: yName,
      type: 'value',
      nameTextStyle :{
        fontSize: 15
    }
    },
    series: []
  };
  for(let i in data) {
    let temp = {'name': data[i].name, 'type':'bar', 'data':data[i].value,  barGap: "0%",}
    option.series.push(temp)
  }
  return option
}

export function getDynamicLine(name, data) {
  const option = {
    title: {
      text: name
    },
    grid: {
      x:'100',
      show: false,
      z: 0,
      left: "5%",
      top: 60,
      right: "8%",
      bottom: 40,
      containLabel: false,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      nameTextStyle:{fontSize:14},
      name:"区块高度",
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      nameTextStyle:{fontSize:14},
      name:"吞吐量",
      boundaryGap: [0, '100%'],
      axisLine: {
        show: false //显示坐标刻度不显示轴
      },
      axisTick: {
        show: false//显示坐标刻度不显示轴
      },
      type: 'value',
      splitLine: {
        lineStyle: {
          // 使用深浅的间隔色
          color: '#eee'
        },
        textStyle: {
          color: '#ff0000', //更改坐标轴文字颜色
          //更改坐标轴文字大小
        },
        fontSize: 8
      }
    },
    series: [
      {
        name: '吞吐量',
        type: 'line',
        showSymbol: false,
        data: data
      }
    ]
  }
  return option
}

export function getPianoLine(name, data) {
    var xAxisData = [];
     var data = data;
     if(data.length == 0){
       for (var i = 0; i < 50; i++) {
           xAxisData.push(i);
           data.push(Math.abs((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5));
       }
     }

    const option = {
        // backgroundColor: '#404a59',
        backgroundColor: '#fff',
        xAxis: [{
            show: false,
            data: xAxisData
        }, {
            show: false,
            data: xAxisData
        }],
        title: {
            top: '10px',
            left: '10px',
            text: name,
            textStyle: {
                fontSize: '16',
            },
        },
        visualMap: {
            show: false,
            min: 0,
            max: 50,
            dimension: 0,
            inRange: {
                color: ['#4a657a', '#308e92', '#24A170', '#FF8C37', '#f5898b', '#ef5055']
            }
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#A4B5E9'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#A4B5E9'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: 'Simulate Shadow',
            type: 'line',
            data: data,
            z: 2,
            showSymbol: false,
            animationDelay: 0,
            animationEasing: 'linear',
            animationDuration: 1200,
            lineStyle: {
                normal: {
                    color: 'transparent'
                }
            },
            areaStyle: {
                normal: {
                    color: '#E3D9FE',
                    shadowBlur: 50,
                    shadowColor: 'rgba(0,0,0,0.3)'
                }
            }
        }, {
            name: 'front',
            type: 'bar',
            data: data,
            xAxisIndex: 1,
            z: 3,
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            }
        }],
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay: function (idx) {
            return idx * 20;
        },
        animationDelayUpdate: function (idx) {
            return idx * 20;
        }
    };

    return option
}

export function getPianoLine1(name, data) {
    var xAxisData = [];
     var data = data;
     if(data.length == 0){
       for (var i = 0; i < 50; i++) {
           xAxisData.push(i);
           data.push(Math.abs((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5));
       }
     }

    const option = {
        // backgroundColor: '#404a59',
        backgroundColor: '#fff',
        xAxis: [{
            show: false,
            data: xAxisData
        }, {
            show: false,
            data: xAxisData
        }],
        title: {
            top: '10px',
            left: '10px',
            text: name,
            textStyle: {
                fontSize: '16',
            },
        },
        visualMap: {
            show: false,
            min: 0,
            max: 50,
            dimension: 0,
            inRange: {
                color: '#fa8c35'
            }
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#A4B5E9'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#A4B5E9'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: 'Simulate Shadow',
            type: 'line',
            data: data,
            z: 2,
            showSymbol: false,
            animationDelay: 0,
            animationEasing: 'linear',
            animationDuration: 1200,
            lineStyle: {
                normal: {
                    color: 'transparent'
                }
            },
            areaStyle: {
                normal: {
                    color: '#E3D9FE',
                    shadowBlur: 50,
                    shadowColor: 'rgba(0,0,0,0.3)'
                }
            }
        }, {
            name: 'front',
            type: 'bar',
            data: data,
            xAxisIndex: 1,
            z: 3,
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                }
            }
        }],
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay: function (idx) {
            return idx * 20;
        },
        animationDelayUpdate: function (idx) {
            return idx * 20;
        }
    };

    return option
}

export function getPolluteOption(collect) {
    const option = {
        grid: {
            top: '10%',
            left: 30,
            right: 20,
            bottom: 35,
        },
        legend: {
            icon: 'circle',
            top: '0%',
            right: 20,
            itemWidth: 6,
            itemGap: 20,
            textStyle: {
                color: '#556677'
            }
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#DCE2E8'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#556677'
                },
            },
            boundaryGap: false,
            data: collect.xtick,
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#DCE2E8'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#556677'
                }
            },
            splitLine: {
                show: false
            },
            splitNumber: 4
        }],
        series: [{
            name: collect.data[0].name,
            type: 'line',
            smooth: true, //是否平滑
            symbolSize: 0,
            itemStyle: {
                normal: {
                    color: "#45DEE3"
                }
            },
            lineStyle: {
                normal: {
                    color: "#45DEE3",
                    width: 3,
                },
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                normal: {
                    color: new echart.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(69,222,227,0.3)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(69,222,227,0)'
                    }
                    ], false),
                    shadowColor: 'rgba(69,222,227, 0.9)',
                    shadowBlur: 20
                }
            },
            data: collect.data[0].val
        },
        {
            name: collect.data[1].name,
            type: 'line',
            smooth: true, //是否平滑
            symbolSize: 0,
            itemStyle: {
                normal: {
                    color: "#00ca95"
                }
            },
            lineStyle: {
                normal: {
                    color: "#00ca95",
                    width: 3,
                },
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                normal: {
                    color: new echart.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,202,149,0.3)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(0,202,149,0)'
                    }
                    ], false),
                    shadowColor: 'rgba(0,202,149, 0.9)',
                    shadowBlur: 20
                }
            },
            data: collect.data[1].val,
        },
        ]
    };
    return option;
}

function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
}

function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    for (let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }

    return cloneObj
}

export function getDistributePieOption(collect) {
    const data = [];
    const data2 = [];
    let allData = 0;
    const color = ['#33C2F0', '#249EFF', '#6EBDFE', '#9DD3FF', '#0181CE', '#022866']
    for (var i = 0; i < collect.length; i++) {
        data.push(
            {
                value: collect[i].val,
                name: collect[i]._id,
                itemStyle: { normal: { borderWidth: 4, borderColor: color[i] } }
            },
        )
        data2.push(
            {
                value: collect[i].val,
                name: collect[i]._id,
                itemStyle: { normal: { borderWidth: 4, borderColor: color[i] } }
            }
        )
        allData += collect[i].val;
    }
    var seriesOption = [{
        name: '',
        type: 'pie',
        clockWise: false,
        center: ['45%', '50%'],
        radius: ['70%', '72%'],
        hoverAnimation: false,
        data: data,
        itemStyle: { normal: { label: { show: false, }, labelLine: { show: false } } }
    }];
    var option = {
        color: color,
        series: seriesOption,
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
    };

    var option2 = deepClone(option);
    option2.series[0].data = data2;
    option2.series[0].radius = ['35%', '55%']
    return [allData, option, option2]
}
export function formatUnixtimestamp(timestamp) {
    var unixtimestamp = new Date(timestamp);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
        + " " + hour.substring(hour.length - 2, hour.length) + ":"
        + minute.substring(minute.length - 2, minute.length) + ":"
        + second.substring(second.length - 2, second.length);
}

export function formatTimestamp(timestamp) {
    var unixtimestamp = new Date()
    if (timestamp) {
        unixtimestamp = new Date(timestamp);

    }
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();

    return hour.substring(hour.length - 2, hour.length) + ":"
        + minute.substring(minute.length - 2, minute.length) + ":"
        + second.substring(second.length - 2, second.length);
}
// export function lnglatToG20(map, lnglat) {
//     lnglat = map.lngLatToGeodeticCoord(lnglat);
//     lnglat.x = AMap.Util.format(lnglat.x, 3);
//     lnglat.y = AMap.Util.format(lnglat.y, 3);
//     return lnglat;
// }

export function add3dPoints(center, lineGeo, pointsGeo) {
    const size = 20;
    const height = -100;

    lineGeo.vertices.push(center.x, center.y, 0);
    lineGeo.vertexColors.push(255 / 255, 255 / 255, 255 / 255, 0.75);
    lineGeo.vertices.push(center.x, center.y, height);
    lineGeo.vertexColors.push(255 / 255, 255 / 255, 255 / 255, 0.75);

    pointsGeo.vertices.push(center.x, center.y, 0); // 尾部小点
    pointsGeo.pointSizes.push(5);
    pointsGeo.vertexColors.push(255 / 255, 255 / 255, 255 / 255, 0.75);

    pointsGeo.vertices.push(center.x, center.y, height); // 空中点
    pointsGeo.pointSizes.push(size);
    pointsGeo.vertexColors.push(255 / 255, 255 / 255, 255 / 255, 0.75);
}

export function convertWeatherIcon(weather) {
    const map = {
        '晴': 'sun',
        '少云': 'cloud-sun',
        '晴间多云': 'cloud-sun',
        '多云': 'cloud',
        '阴': 'cloud',
        '有风': 'wind',
        '平静': 'sun',
        '微风': 'wind',
        '和风': 'wind',
        '清风': 'wind',
        '强风/劲风': 'wind',
        '疾风': 'wind',
        '大风': 'wind',
        '烈风': 'wind',
        '风暴': 'wind',
        '狂爆风': 'wind',
        '飓风': 'wind',
        '热带风暴': 'wind',
        '霾': 'smog',
        '中度霾': 'smog',
        '重度霾': 'smog',
        '严重霾': 'smog',
        '阵雨': 'cloud-rain',
        '雷阵雨': 'cloud-rain',
        '雷阵雨并伴有冰雹': 'cloud-meatball',
        '小雨': 'cloud-rain',
        '中雨': 'cloud-rain',
        '大雨': 'cloud-rain',
        '暴雨': 'cloud-showers-heavy',
        '大暴雨': 'cloud-showers-heavy',
        '特大暴雨': 'cloud-showers-heavy',
        '强阵雨': 'cloud-showers-heavy',
        '强雷阵雨': 'cloud-showers-heavy',
        '极端降雨': 'cloud-showers-heavy',
        '毛毛雨/细雨': 'cloud-sun-rain',
        '雨': 'cloud-rain',
        '小雨-中雨': 'cloud-rain',
        '中雨-大雨': 'cloud-rain',
        '大雨-暴雨': 'cloud-rain',
        '暴雨-大暴雨': 'cloud-showers-heavy',
        '大暴雨-特大暴雨': 'cloud-showers-heavy',
        '雨雪天气': 'snowflake',
        '雨夹雪': 'snowflake',
        '阵雨夹雪': 'snowflake',
        '冻雨': 'cloud-meatball',
        '雪': 'snowflake',
        '阵雪': 'snowflake',
        '小雪': 'snowflake',
        '中雪': 'snowflake',
        '大雪': 'snowflake',
        '暴雪': 'snowflake',
        '小雪-中雪': 'snowflake',
        '中雪-大雪': 'snowflake',
        '大雪-暴雪': 'snowflake',
        '浮尘': 'smog',
        '扬沙': 'smog',
        '沙尘暴': 'smog',
        '强沙尘暴': 'meteor',
        '龙卷风': 'wind',
        '雾': 'smog',
        '浓雾': 'smog',
        '强浓雾': 'smog',
        '轻雾': 'smog',
        '大雾': 'smog',
        '特强浓雾': 'smog',
        '热': 'temperature-high',
        '冷': 'temperature-low',
        '未知': 'rainbow'
    }
    return map[weather];
}

export const AllProtocol = [
    {
        name: "Ethernet/IP",
        desc: "Ethernet/IP协议是由控制网国际有限公司（ControlNet International)的技术工作组联合ODVA(Open DeviceNet Vendor Association)世纪九构建的，是现场总线国际标准IEC 61158承认的现在有10种类型总线的国际标准之一，基于CIP（Common Industrial Protocol通用工业协议）作为应用层协议基础上开发，是一种面向对象的协议，可以提供一系列标准服务，包括通过隐式和显示的方式对网络设备进行控制",
        img: undefined,
    },
    {
        name: "HART-IP",
        desc: "HART协议是美国Rosement公司于1985年推出的一种用于现场智能仪表和控制室设备之间的通信协议。现已成为全球智能仪表的工业标准",
        img: undefined,
    },
    {
        name: "Fox",
        desc: "Fox协议是Tridium公司开发的Niagara框架的一部分，广泛应用于楼宇自动化控制系统",
        img: undefined,
    },
    {
        name: "pcworx",
        desc: "PCWorx协议由菲尼克斯电气公司开发，目前广泛使用于工控系统。PCWORX3.11是菲尼克斯电气公司的专用协议",
        img: undefined,
    },
    {
        name: "proconos",
        desc: "ProConOS是德国科维公司(KW-Software GmbH)开发的用于PLC的实时操作系统，它是一个高性能的PLC运行时引擎，目前广泛使用于基于嵌入式和PC的工控系统",
        img: undefined,
    },
    {
        name: "SIP",
        desc: "SIP协议是由IETF制定的多媒体通信协议，SIP的开发目的是用来帮助提供跨越因特网的高级电话业务",
        img: undefined,
    },
    {
        name: "Profinet",
        desc: "PROFINETp是一种新的bai以太网通讯系统，是由西门子公司和pProfibusp用户协会开发。pPROFINETp具有多制造商产品之间的通讯能力，自动化和工程模式，并针对分布式智能自动化系统进行了优化。其应用结果能够大大节省配置和调试费用。pPROFINETp系统集成了基于pProfibusp的系统，提供了对现有系统投资的保护。它也可以集成其它现场总线系统",
        img: undefined,
    },
    {
        name: "IEEE 1588",
        desc: "IEEE1588标准的全称是“网络测量和控制系统的精密时钟同步协议标准（IEEE 1588 Precision Clock Synchronization Protocol）”，简称PTP（Precision Timing Protocol），它的主要原理是通过一个同步信号周期性的对网络中所有节点的时钟进行校正同步，可以使基于以太网的分布式系统达到精确同步，IEEE 1588PTP时钟同步技术也可以应用于任何组播网络中",
        img: undefined,
    },
    {
        name: "Modbus_TCP",
        desc: "用传感器：西门子1200PLC、 光照温度传感器、气体浓度传感器。报文解析格式：header handle：6；事务处理标识 ：2；协议标识符 ：2；长度 2；单元标识符 ：1；PDU:功能码+数据：功能码：1；数据：不定",
        img: require("../assets/Modbus_TCP.png"),
    },
    {
        name: "Modbus_RTU",
        desc: "",
        img: undefined
    },
    {
        name: "BACnet",
        desc: "适用传感器：楼宇控制系统",
        img: require("../assets/BACnet.png"),
    },
    {
        name: "DNP3",
        desc: "适用传感器：电力和自来水公司等公用事业。 1个起始位，1个结束位，8个数据位",
        img: undefined
    },
    {
        name: "IEC-104",
        desc: "适用传感器：应用于电力、城市轨道交通等行业的国际标准",
        img: require("../assets/IEC-104.png")
    },
    {
        name: "S7 Communication",
        desc: "适用传感器：西门子S7-300",
        img: require("../assets/S7.png")
    }
]
