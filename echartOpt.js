import echarts from 'echarts';

export function getCpuOption(num) {
    var placeHolderStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            color: "rgba(0,0,0,0)",
            borderWidth: 0
        },
        emphasis: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0
        }
    };


    var dataStyle = {
        normal: {
            formatter: '{c}%',
            position: 'center',
            show: true,
            textStyle: {
                fontSize: '40',
                fontWeight: 'normal',
                color: '#34374E'
            }
        }
    };


    const option = {
        backgroundColor: '#fff',
        grid: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        title: [{
            text: 'CPU-0',
            left: '24.8%',
            top: '60%',
            textAlign: 'center',
            textStyle: {
                fontWeight: 'normal',
                fontSize: '16',
                color: '#AAAFC8',
                textAlign: 'center',
            },
        }, {
            text: 'CPU-1',
            left: '75%',
            top: '60%',
            textAlign: 'center',
            textStyle: {
                color: '#AAAFC8',
                fontWeight: 'normal',
                fontSize: '16',
                textAlign: 'center',
            },
        }],

        //第一个图表
        series: [{
            type: 'pie',
            hoverAnimation: false, //鼠标经过的特效
            radius: ['80%', '90%'],
            center: ['25%', '50%'],
            startAngle: 225,
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: 100,
                itemStyle: {
                    normal: {
                        color: '#E1E8EE'
                    }
                },
            }, {
                value: 35,
                itemStyle: placeHolderStyle,
            },

            ]
        },
        //上层环形配置
        {
            type: 'pie',
            hoverAnimation: false, //鼠标经过的特效
            radius: ['80%', '90%'],
            center: ['25%', '50%'],
            startAngle: 225,
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: num[0] > 40 ? num[0]: num[0] + 20,
                itemStyle: {
                    normal: {
                        color: '#6F78CC'
                    }
                },
                label: dataStyle,
            }, {
                value: 35,
                itemStyle: placeHolderStyle,
            },

            ]
        },


        //第二个图表
        {
            type: 'pie',
            hoverAnimation: false,
            radius: ['80%', '90%'],
            center: ['75%', '50%'],
            startAngle: 225,
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: 100,
                itemStyle: {
                    normal: {
                        color: '#E1E8EE'


                    }
                },

            }, {
                value: 35,
                itemStyle: placeHolderStyle,
            },

            ]
        },

        //上层环形配置
        {
            type: 'pie',
            hoverAnimation: false,
            radius: ['80%', '90%'],
            center: ['75%', '50%'],
            startAngle: 225,
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: num[1] > 40 ? num[1] : num[1] + 20,
                itemStyle: {
                    normal: {
                        color: '#4897f6'
                    }
                },
                label: dataStyle,
            }, {
                value: 55,
                itemStyle: placeHolderStyle,
            },

            ]
        },
        ]
    };
    return option
}
export function initopoVertex() {
    const topoVertex = {
        slaveVertex: [],
        masterVertex: [],
        gateway: {
            name: "边缘计算中心",
            value: [500, 60],
            symbolSize: 65,
            // symbol:'image://http://cdn.denghuolife.com/gateway.png',
            symbol: 'image://' + require('./assets/gateway1.png'),
            category: 1,
            label: {
                normal: {
                    fontWeight: 'bolder', fontSize: '30',

                }
            }
        }
    };
    const slaveCnt = 25;
    // const colCnt = 12;
    //  const rowCnt = (25 / 2) - colCnt;
    const slavecordvalue = [-60, 1060,
        400, 1060,
        1070, 1060,
        10, 850,
        135, 850,
        240, 850,
        370, 850,
        475, 850,
        600, 850,
        710, 850,
        830, 850,
    -60, 600,
        1070, 600,
        10, 380,
        135, 380,
        240, 380,
        370, 380,
        475, 380,
        600, 380,
        710, 380,
        830, 380,
    -60, 155,
        400, 155,
        1070, 155,
        1070, 155,

    ]
    for (let i = 0; i < slaveCnt; i++) {
        /* let value = [0, 0]
         if (i < colCnt) {
             value = [i * 1000 / colCnt, 1000]
         } else if (i < colCnt + rowCnt) {
             let j = i - colCnt
             value = [1000, (rowCnt - j) * 1000 / rowCnt]
         } else if (i < colCnt + rowCnt + colCnt) {
             let j = i - colCnt - rowCnt
             value = [(colCnt - j) * 1000 / colCnt, 0]
         } else {
             let j = i - colCnt - rowCnt - colCnt
             value = [0, j * 1000 / rowCnt]
         }*/

        if (i == 24) {
            topoVertex.slaveVertex.push({
                name: '监测节点' + (i + 1),
                category: 1,
                symbolSize: 0,
                value: [slavecordvalue[2 * i], slavecordvalue[2 * i + 1]],
                label: {
                    normal: {
                        fontSize: '0'
                    }
                }
            })
        }
        else {
            topoVertex.slaveVertex.push({
                name: '监测节点' + (i + 1),
                category: 1,
                symbolSize: 20,
                value: [slavecordvalue[2 * i], slavecordvalue[2 * i + 1]]
            })
        }
    }
    const slaveConfig = {
        category: 1,
        symbolSize: 25
    }
    const gatewayx = 10
    const gatewayy = 500
    const masterCount = 10
    const radius = 300
    const masterConfig = {
        category: 1,
        symbolSize: 35,
        category: 1,
        label: {
            normal: {
                fontSize: '20'
            }
        },
    }
    /*for (let i = 0; i < masterCount; i++) {
        let rad = 2 * Math.PI / 360 * (i * 360 / masterCount)
        // let value = [gatewayx - Math.cos(rad) * radius, gatewayy + Math.sin(rad) * radius]
        let value = [50 + (i - 1) * gatewayx, 500]
        topoVertex.masterVertex.push({
            name: '主节点' + (i + 1),
            value,
            ...masterConfig
        })
    }*/
    topoVertex.masterVertex = [
        {
            name: '汇聚节点1',
            value: [40, 600],
            ...masterConfig
        },
        {
            name: '汇聚节点2',
            value: [140, 600],
            ...masterConfig
        },
        {
            name: '汇聚节点3',
            value: [240, 600],
            ...masterConfig
        },
        {
            name: '汇聚节点4',
            value: [370, 600],
            ...masterConfig
        },
        {
            name: '汇聚节点5',
            value: [470, 600],
            ...masterConfig
        },
        {
            name: '汇聚节点6',
            value: [600, 600],
            ...masterConfig
        },
        {
            name: '汇聚节点7',
            value: [700, 600],
            ...masterConfig
        },
        {
            name: '汇聚节点8',
            value: [840, 600],
            ...masterConfig
        },
        {
            name: '汇聚节点9',
            value: [40, 600],
            symbolSize: 0,
            category: 0,
            label: {
                normal: {
                    fontSize: '0'
                }
            },
        },
        {
            name: '汇聚节点10',
            value: [140, 600],
            symbolSize: 0,
            category: 0,
            label: {
                normal: {
                    fontSize: '0'
                }
            }
        }]

    return topoVertex
}
export function initopoVertex2() {
    const topoVertex = {
        slaveVertex: [],
        masterVertex: [],
        gateway: {
            name: "边缘计算中心",
            value: [500, 40],
            symbolSize: 65,
            // symbol:'image://http://cdn.denghuolife.com/gateway.png',
            symbol: 'image://' + require('./assets/gateway1.png'),
            category: 1,
            label: {
                normal: {
                    fontWeight: 'bolder', fontSize: '30',

                }
            }
        }
    };
    const ad=35;
    const slaveCnt = 25;
    // const colCnt = 12;
    //  const rowCnt = (25 / 2) - colCnt;
    const slavecordvalue = [10,750,
    10,750,
    10,750,
    10, 800,
        135+ad, 800,
        240+ad*2, 800,
        370+ad*3, 800,
        475+ad*4, 800,
        600+ad*5, 800,
        710+ad*6, 800,
        830+ad*7, 800,
    10,750,
    10,750,
        10, 300,
        135+ad, 300,
        240+ad*2, 300,
        370+ad*3, 300,
        475+ad*4, 300,
        600+ad*5, 300,
        710+ad*6, 300,
        830+ad*7, 300,
        10,750,
        10,750,
        10,750,
        10,750,

    ]
    for (let i = 0; i < slaveCnt; i++) {
        /* let value = [0, 0]
         if (i < colCnt) {
             value = [i * 1000 / colCnt, 1000]
         } else if (i < colCnt + rowCnt) {
             let j = i - colCnt
             value = [1000, (rowCnt - j) * 1000 / rowCnt]
         } else if (i < colCnt + rowCnt + colCnt) {
             let j = i - colCnt - rowCnt
             value = [(colCnt - j) * 1000 / colCnt, 0]
         } else {
             let j = i - colCnt - rowCnt - colCnt
             value = [0, j * 1000 / rowCnt]
         }*/

        if (i == 24||i==1||i==2||i==0||i==12||i==11||i==22||i==23||i==21) {
            topoVertex.slaveVertex.push({
                name: '监测节点' + (i + 1),
                category: 1,
                symbolSize: 0,
                value: [slavecordvalue[2 * i], slavecordvalue[2 * i + 1]],
                label: {
                    normal: {
                        fontSize: '0'
                    }
                }
            })
        }
        else {
            topoVertex.slaveVertex.push({
                name: '监测节点' + (i + 1),
                category: 1,
                symbolSize: 20,
                value: [slavecordvalue[2 * i], slavecordvalue[2 * i + 1]]
            })
        }
    }
    const slaveConfig = {
        category: 1,
        symbolSize: 25
    }
    const gatewayx = 10
    const gatewayy = 500
    const masterCount = 10
    const radius = 300
    const masterConfig = {
        category: 1,
        symbolSize: 35,
        category: 1,
        label: {
            normal: {
                fontSize: '20'
            }
        },
    }
    /*for (let i = 0; i < masterCount; i++) {
        let rad = 2 * Math.PI / 360 * (i * 360 / masterCount)
        // let value = [gatewayx - Math.cos(rad) * radius, gatewayy + Math.sin(rad) * radius]
        let value = [50 + (i - 1) * gatewayx, 500]
        topoVertex.masterVertex.push({
            name: '主节点' + (i + 1),
            value,
            ...masterConfig
        })
    }*/
    const ad1=30
    topoVertex.masterVertex = [
        {
            name: '汇聚节点1',
            value: [40+ad1, 550],
            ...masterConfig
        },
        {
            name: '汇聚节点2',
            value: [140+ad1*2, 550],
            ...masterConfig
        },
        {
            name: '汇聚节点3',
            value: [240+ad1*3, 550],
            ...masterConfig
        },
        {
            name: '汇聚节点4',
            value: [340+ad1*4, 550],
            ...masterConfig
        },
        {
            name: '汇聚节点5',
            value: [440+ad1*5, 550],
            ...masterConfig
        },
        {
            name: '汇聚节点6',
            value: [540+ad1*6, 550],
            ...masterConfig
        },
        {
            name: '汇聚节点7',
            value: [640+ad1*7, 550],
            ...masterConfig
        },
        {
            name: '汇聚节点8',
            value: [740+ad1*8, 550],
            ...masterConfig
        },
        {
            name: '汇聚节点9',
            value: [40, 600],
            symbolSize: 0,
            category: 0,
            label: {
                normal: {
                    fontSize: '0'
                }
            },
        },
        {
            name: '汇聚节点10',
            value: [140, 600],
            symbolSize: 0,
            category: 0,
            label: {
                normal: {
                    fontSize: '0'
                }
            }
        }]

    return topoVertex
}
export function initopoVertex3() {
    const topoVertex = {
        slaveVertex: [],
        masterVertex: [],
        gateway: {
            name: "边缘计算中心",
            value: [500, 950],
            symbolSize: 65,
            // symbol:'image://http://cdn.denghuolife.com/gateway.png',
            symbol: 'image://' + require('./assets/gateway1.png'),
            category: 1,
            label: {
                normal: {
                    fontWeight: 'bolder', fontSize: '30',

                }
            }
        }
    };
    const slaveCnt = 25;
    // const colCnt = 12;
    //  const rowCnt = (25 / 2) - colCnt;
    const slavecordvalue = [-60, 900,
       -60,600,
        -60,300,
        1050, 900,
        1050,600,
        1050,300,
        250, 790,
        430,790,
        570,790,
        755, 790,
        230, 540,
        510, 540,
        230, 260,
        425, 540,
        425,400,
        425,260,
        600, 540,
        600,400,
        600, 260,
        780,540,
        510,260,
        780,260,
        400, 155,
        1070, 155,
        1070, 155,

    ]
    for (let i = 0; i < slaveCnt; i++) {
        /* let value = [0, 0]
         if (i < colCnt) {
             value = [i * 1000 / colCnt, 1000]
         } else if (i < colCnt + rowCnt) {
             let j = i - colCnt
             value = [1000, (rowCnt - j) * 1000 / rowCnt]
         } else if (i < colCnt + rowCnt + colCnt) {
             let j = i - colCnt - rowCnt
             value = [(colCnt - j) * 1000 / colCnt, 0]
         } else {
             let j = i - colCnt - rowCnt - colCnt
             value = [0, j * 1000 / rowCnt]
         }*/

        if (i > 21 || (i>12 && i<19)|| i<6) {
            topoVertex.slaveVertex.push({
                name: '监测节点' + (i + 1),
                category: 1,
                symbolSize: 0,
                value: [slavecordvalue[2 * i], slavecordvalue[2 * i + 1]],
                label: {
                    normal: {
                        fontSize: '0'
                    }
                }
            })
        }
        else {
            topoVertex.slaveVertex.push({
                name: '监测节点' + (i + 1),
                category: 1,
                symbolSize: 20,
                value: [slavecordvalue[2 * i], slavecordvalue[2 * i + 1]]
            })
        }
    }
    const slaveConfig = {
        category: 1,
        symbolSize: 25
    }
    const gatewayx = 10
    const gatewayy = 500
    const masterCount = 10
    const radius = 300
    const masterConfig = {
        category: 1,
        symbolSize: 35,
        category: 1,
        label: {
            normal: {
                fontSize: '20'
            }
        },
    }
    const hidemasterConfig = {
        category: 1,
        symbolSize: 0,
        category: 1,
        label: {
            normal: {
                fontSize: '0'
            }
        },
    }
    /*for (let i = 0; i < masterCount; i++) {
        let rad = 2 * Math.PI / 360 * (i * 360 / masterCount)
        // let value = [gatewayx - Math.cos(rad) * radius, gatewayy + Math.sin(rad) * radius]
        let value = [50 + (i - 1) * gatewayx, 500]
        topoVertex.masterVertex.push({
            name: '主节点' + (i + 1),
            value,
            ...masterConfig
        })
    }*/
    topoVertex.masterVertex = [
        {
            name: '汇聚节点1',
            value: [340, 580],
            ...masterConfig
        },
        {
            name: '汇聚节点2',
            value: [670, 580],
            ...masterConfig
        },
        {
            name: '汇聚节点3',
            value: [340, 300],
            ...masterConfig
        },
        {
            name: '汇聚节点4',
            value: [670,300],
            ...masterConfig
        }, {
            name: '汇聚节点5',
            value: [-60, 1050],
            ...hidemasterConfig
        },
        {
            name: '汇聚节点6',
            value: [1050, 1050],
            ...hidemasterConfig
        },
        {
            name: '汇聚节点7',
            value: [1050, 200],
            ...hidemasterConfig
        },
        {
            name: '汇聚节点8',
            value: [-60, 200],
            ...hidemasterConfig
        },
       
        {
            name: '汇聚节点9',
            value: [40, 600],
            symbolSize: 0,
            category: 0,
            label: {
                normal: {
                    fontSize: '0'
                }
            },
        },
        {
            name: '汇聚节点10',
            value: [140, 600],
            symbolSize: 0,
            category: 0,
            label: {
                normal: {
                    fontSize: '0'
                }
            }
        }]

    return topoVertex
}
export function iniadhocnet() {
    const adhocnetstruc = {
        node: []
    };
    const nodecount = 50;
    for(let i=0;i<nodecount;i++)
      adhocnetstruc.node.push({
        name: '自组网节点' + (i + 1),
        symbolSize: 20,
        value: [(i+1)*20,(i+1)*20],
        label: {
            normal: {
                fontSize: '5'
            },
            category:0
        }
    })
}
export function getNetworkOption(topoVertex, links = [], linesData = []) {

    const curveness = -0.25;
    const categories = [{
        name: '故障',
        itemStyle: {
            normal: {
                color: '#FF6462',
                borderColor: 'black',
                borderWidth: 3
            }
        },
        label: {
            normal: {
                fontWeight: 'bolder',
                color: 'black',
                fontSize: '20'
            }
        },
    }, {
        name: '正常',
        itemStyle: {
            normal: {
                color: '#545454',
                borderColor: 'black',
                borderWidth: 3,

            }
        },
        label: {
            normal: {
                fontWeight: 'bolder',
                fontSize: '20',
                color: 'black',
                distance: 12
            }
        },
    }, {
        name: '传输中',
        itemStyle: {
            normal: {
                color: '#00f4f6',
                borderColor: '#6CE0E6',
                borderWidth: 3
            }
        },
        label: {
            normal: {
                color: '#000000',
                fontWeight: 'bolder',
                fontSize: '20',
                distance: 10
            }
        },
    }];

    const linesToGateway = []
    topoVertex.masterVertex.map(item => {
        if (item.category == 2) {
            linesToGateway.push([item.value, topoVertex.gateway.value])
        }
    });

    topoVertex.gateway.category = linesToGateway.length > 0 ? 2 : 1
    const data = [].concat([
        ...topoVertex.slaveVertex,
        ...topoVertex.masterVertex,
        topoVertex.gateway
    ]);



    const option = {
        backgroundColor: "",
        legend: [{
            formatter: function (name) {
                return echarts.format.truncateText(name, 100, '18px Microsoft Yahei', '…');
            },
            tooltip: {
                show: true,

            },
            textStyle: {
                fontSize: 30,
                color: '#000000'
            },
            selectedMode: false,
            right: 120,
            top: 10,
            data: [],
            data: categories.map(function (el) {
                return el.name;
            })
        }],
        xAxis: {
            show: false,
            type: 'value',
            min: 0,
            max: 1000,
        },
        yAxis: {
            show: false,
            type: 'value',
            min: 0,
            max: 1000
        },
        series: [{
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            symbolSize: 20,
            z: 3,
            label: {
                normal: {
                    show: true,
                    position: 'bottom',
                    color: '#5e5e5e',
                    font: '19px Microsoft Yahei'
                }
            },
            itemStyle: {
                normal: {
                    shadowColor: 'none'
                },
                emphasis: {

                }
            },
            lineStyle: {
                normal: {
                    width: 1,
                    shadowColor: 'none'
                },
            },
            data: data,
            links: links,
            categories: categories
        }, {
            name: 'A',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            z: 1,
            effect: {
                show: true,
                period: 1,
                smooth: false,
                trailLength: 0,
                symbol: "arrow",
                color: '#6CE0E6',
                symbolSize: 12,
                loop: false,
            },
            lineStyle: {
                normal: {
                    width: 7,
                    curveness: curveness,
                    color: '#6CE0E6'
                }
            },
            data: linesData
        }, {
            name: 'A',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            z: 1,
            effect: {
                show: true,
                period: 1,
                smooth: false,
                trailLength: 0,
                symbol: "arrow",
                color: '#FFBB00',
                symbolSize: 12,
                delay: 1000 + linesData.length * 20,
                loop: false,
            },
            lineStyle: {
                normal: {
                    width: 7,
                    curveness: -0.25,
                    color: '#FFBB00'
                }
            },
            data: linesToGateway
        }]
    };
    return option
}
export function getEdgeLineOption(xticks, data, text) {
    const colorList = ["#516b91", '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3']
    const series = data.map((item, _) => {
        return {
            // name: '节点' + (_ + 1),
            name: '边缘服务器' + (_ + 1),
            type: 'line',
            data: item,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                color: colorList[_]
            },
            itemStyle: {
                normal: {
                    color: colorList[_],
                    borderColor: colorList[_]
                }
            }
        }
    })
    const option = {
        title: {
            text,
            top: '3%',
        },
        legend: {
            icon: 'circle',
            top: '5%',
            right: '10%',
            itemWidth: 6,
            itemGap: 20,
            textStyle: {
                color: '#556677'
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    show: true,
                    backgroundColor: '#fff',
                    color: '#556677',
                    borderColor: 'rgba(0,0,0,0)',
                    shadowColor: 'rgba(0,0,0,0)',
                    shadowOffsetY: 0
                },
                lineStyle: {
                    width: 0
                }
            },
            backgroundColor: '#fff',
            textStyle: {
                color: '#5c6c7c'
            },
            padding: [10, 10],
            extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        grid: {
            top: '15%'
        },
        xAxis: [{
            type: 'category',
            data: xticks,
            axisLine: {
                lineStyle: {
                    color: '#DCE2E8'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#556677'
                },
                fontSize: 12,
                margin: 15
            },
            axisPointer: {
                label: {
                    padding: [0, 0, 10, 0],
                    margin: 15,
                    fontSize: 12,
                    backgroundColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#fff' // 0% 处的颜色
                        }, {
                            offset: 0.86,

                            color: '#fff' // 0% 处的颜色
                        }, {
                            offset: 0.86,
                            color: '#33c0cd' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#33c0cd' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            },
            boundaryGap: false
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
            }
        }],
        series
    };
    return option
}
export function getAdhocnet() {

    const targetCoord = [350, 0];
   
    const curveness = -0.25;
    const categories = [{
        name: '正常',
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#01acca'
                }, {
                    offset: 1,
                    color: '#5adbe7'
                }]),
            }
        },
        label: {
            normal: {
                fontSize: '14'
            }
        },
    }];
    const itemmain = {
        name: "网关",
        value: [0, 250],
        symbolSize: 100,
        category: 0,
        /*itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                   color: '#01acca'
                }, {
                    offset: 1,
                    color: '#5adbe7'
                }]),
            }
        },*/
        label: {
            normal: {
                fontSize: '14'
            }
        },
    };
    const item0 = {
        name: "主节点1",
        value: targetCoord,
        symbolSize: 50,
        category: 0,
        
        /* itemStyle: {
             normal: {
                 color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                     offset: 0,
                     color: '#01acca'
                 }, {
                     offset: 1,
                     color: '#5adbe7'
                 }]),
             }
         },*/
        label: {
            normal: {
                fontSize: '14'
            }
        },
    };
   /* const items = [{
        name: "子节点1",
        category: 0,
        speed: '100 TPS',
        value: [1000, 500]
    }, {
        name: "子节点2",
        category: 0,
        active: true,
        speed: '50 TPS',
        value: [1000, 450]
    }, {
        name: "子节点3",
        category: 0,
        speed: '50 TPS',
        value: [1000, 400]
    }, {
        name: "子节点4",
        category: 0,
        value: [1000, 350]
    }, {
        name: "子节点5",
        category: 0,
        active: true,
        speed: '90 TPS',
        value: [1000, 300]
    }, {
        name: "子节点6",
        category: 0,
        value: [1000, 250]
    }, {
        name: "子节点7",
        category: 0,
        value: [1000, 200]
    }, {
        name: "子节点8",
        category: 0,
        value: [1000, 150]
    }, {
        name: "子节点9",
        category: 0,
        value: [1000, 100]
    }, {
        name: "子节点10",
        active:true,
        category: 0,
        value: [1000, 50]
    }, ];*/
    const items=[];
    for(let i=0;i<25;i++)
    {
        items.push({
            name: '自组网节点' + (i + 1),           
            symbol: 'image://' + require('./assets/nodefig.png'), 
            symbolSize: 80,
            value: [((i-(i)%5)/5)*200,((i)%5)*100],
            label: {
                normal: {
                    fontSize: '13',
                    fontWeight: 'bolder'
                },
               // category:0
            } })
    }
    for(let i=25;i<50;i++)
    {
        items.push({
            name: '自组网节点' + (i + 1),
            symbol: 'image://' + require('./assets/nodefig.png'), 
            symbolSize: 80,
            value: [((i-i%5)/5)*200+200,(i%5)*100],
            label: {
                normal: {
                    fontSize: '13',
                    fontWeight: 'bolder'
                },
               // category:0
            } })
    }
    
   const data = items;
   
    const option = {
        /*legend: [{
            formatter: function(name) {
                return echarts.format.truncateText(name, 100, '18px Microsoft Yahei', '…');
            },        
            right: 0,
            data: categories.map(function(el) {
                return el.name;
            })
        }],*/
        xAxis: {
            show: false,
        },
        yAxis: {
            show: false,
        },
        series: [{
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            symbolSize: 20,
            z: 3,
            label: {
                normal: {
                    show: true,
                    position: 'bottom',
                    color: '#5e5e5e'
                }
            },
            itemStyle: {
                normal: {
                    shadowColor: 'none'
                },
                emphasis: {
    
                }
            },          
          
            data: data,
            categories: categories
        }, ]
    };
    return option
}