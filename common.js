import echart from "echarts";
import AMap from "AMap";

export function getMultiBarOption(legend, xaxis, data) {
  const series = [];
  const bottomColor = ["#0067FF", "#F21C60", "#1d976c"];
  const topColor = ["#56CCF2", "#E53C30", "#54e78f"];
  for (let _ = 0; _ < data.length; _++) {
    series.push({
      name: legend[_],
      type: "bar",
      data: data[_],
      barWidth: "15%",
      itemStyle: {
        normal: {
          color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: topColor[_]
            },
            {
              offset: 1,
              color: bottomColor[_]
            }
          ]),
          barBorderRadius: [12, 12, 0, 0]
        }
      }
    });
  }

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    title: {
      top: 0,
      left: 0,
      text: "数据量总览(周)",
      textStyle: {
        fontSize: "16"
      }
    },
    legend: {
      data: legend,
      right: 10,
      top: 11,
      itemWidth: 14,
      itemHeight: 14,
      icon: "circle",
      textStyle: {
        padding: [3, 0, 0, 0],
        fontWeight: "bold"
      }
    },
    grid: {
      left: "2%",
      right: "4%",
      bottom: "5%",
      top: "16%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: xaxis,
        axisLine: {
          lineStyle: {
            color: "#DCE2E8"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 25,
          textStyle: {
            color: "#556677",
            fontWeight: "bold"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#C3C9CF"
          }
        },
        axisLabel: {
          textStyle: {
            color: "#556677",
            fontWeight: "bold"
          }
        },
        splitNumber: 4
      }
    ],
    series: series
  };

  return option;
}

export function getMultiPieOption(data) {
  var titleArr = [
      {
        top: 0,
        left: 0,
        text: "边缘计算资源总览",
        textStyle: {
          fontSize: "16"
        }
      }
    ],
    seriesArr = [];
  const colors = [
    ["#389af4", "#dfeaff"],
    ["#ff8c37", "#ffdcc3"],
    ["#fd6f97", "#fed4e0"],
    ["#a181fc", "#e3d9fe"],
    ["#ffc257", "#ffedcc"]
  ];
  data.forEach(function(item, index) {
    titleArr.push({
      text: item.name,
      left: index % 2 == 0 ? "25%" : "75%",
      top: index < 2 ? "48%" : "92%",
      textAlign: "center",
      textStyle: {
        fontWeight: "normal",
        fontSize: "16",
        color: colors[index][0],
        textAlign: "center"
      }
    });
    seriesArr.push({
      name: item.name,
      type: "pie",
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
          }
        }
      },
      hoverAnimation: false,
      center: [index % 2 == 0 ? "25%" : "75%", index < 2 ? "30%" : " 75%"],
      data: [
        {
          value: item.value,
          label: {
            normal: {
              formatter: function(params) {
                return params.value + "%";
              },
              position: "center",
              show: true,
              textStyle: {
                fontSize: "20",
                fontWeight: "bold",
                color: colors[index][0]
              }
            }
          }
        },
        {
          value: 100 - item.value,
          name: "invisible",
          itemStyle: {
            normal: {
              color: colors[index][1]
            },
            emphasis: {
              color: colors[index][1]
            }
          }
        }
      ]
    });
  });

  const option = {
    title: titleArr,
    series: seriesArr
  };
  console.log(option);
  return option;
}

export function getMcsPinaoLine(data) {
  var xAxisData = [];
  var data = [];
  for (var i = 0; i < 50; i++) {
    xAxisData.push(i);
    data.push(Math.abs((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5));
  }

  const option = {
    // backgroundColor: '#404a59',
    backgroundColor: "#fff",
    xAxis: [
      {
        show: false,
        data: xAxisData
      },
      {
        show: false,
        data: xAxisData
      }
    ],
    title: {
      top: "10px",
      left: "10px",
      text: "区块链上传量总览(月)",
      textStyle: {
        fontSize: "16"
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      dimension: 0,
      inRange: {
        color: [
          "#4a657a",
          "#308e92",
          "#24A170",
          "#FF8C37",
          "#f5898b",
          "#ef5055"
        ]
      }
    },
    yAxis: {
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
        name: "Simulate Shadow",
        type: "line",
        data: data,
        z: 2,
        showSymbol: false,
        animationDelay: 0,
        animationEasing: "linear",
        animationDuration: 1200,
        lineStyle: {
          normal: {
            color: "transparent"
          }
        },
        areaStyle: {
          normal: {
            color: "#E3D9FE",
            shadowBlur: 50,
            shadowColor: "rgba(0,0,0,0.3)"
          }
        }
      },
      {
        name: "front",
        type: "bar",
        data: data,
        xAxisIndex: 1,
        z: 3,
        itemStyle: {
          normal: {
            barBorderRadius: 5
          }
        }
      }
    ],
    animationEasing: "elasticOut",
    animationEasingUpdate: "elasticOut",
    animationDelay: function(idx) {
      return idx * 20;
    },
    animationDelayUpdate: function(idx) {
      return idx * 20;
    }
  };

  return option;
}

export function getPolluteOption(collect) {
  const option = {
    grid: {
      top: "10%",
      left: 30,
      right: 20,
      bottom: 35
    },
    legend: {
      icon: "circle",
      top: "0%",
      right: 20,
      itemWidth: 6,
      itemGap: 20,
      textStyle: {
        color: "#556677"
      }
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#DCE2E8"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#556677"
          }
        },
        boundaryGap: false,
        data: collect.xtick
      }
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#DCE2E8"
          }
        },
        axisLabel: {
          textStyle: {
            color: "#556677"
          }
        },
        splitLine: {
          show: false
        },
        splitNumber: 4
      }
    ],
    series: [
      {
        name: collect.data[0].name,
        type: "line",
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
            width: 3
          }
        },
        tooltip: {
          show: false
        },
        areaStyle: {
          normal: {
            color: new echart.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(69,222,227,0.3)"
                },
                {
                  offset: 1,
                  color: "rgba(69,222,227,0)"
                }
              ],
              false
            ),
            shadowColor: "rgba(69,222,227, 0.9)",
            shadowBlur: 20
          }
        },
        data: collect.data[0].val
      },
      {
        name: collect.data[1].name,
        type: "line",
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
            width: 3
          }
        },
        tooltip: {
          show: false
        },
        areaStyle: {
          normal: {
            color: new echart.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0,202,149,0.3)"
                },
                {
                  offset: 1,
                  color: "rgba(0,202,149,0)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0,202,149, 0.9)",
            shadowBlur: 20
          }
        },
        data: collect.data[1].val
      }
    ]
  };
  return option;
}

function isObject(o) {
  return (typeof o === "object" || typeof o === "function") && o !== null;
}

function deepClone(obj) {
  if (!isObject(obj)) {
    throw new Error("obj 不是一个对象！");
  }

  let isArray = Array.isArray(obj);
  let cloneObj = isArray ? [] : {};
  for (let key in obj) {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  }

  return cloneObj;
}

export function getDistributePieOption(collect) {
  const data = [];
  const data2 = [];
  let allData = 0;
  const color = [
    "#33C2F0",
    "#249EFF",
    "#6EBDFE",
    "#9DD3FF",
    "#0181CE",
    "#022866"
  ];
  for (var i = 0; i < collect.length; i++) {
    data.push({
      value: collect[i].val,
      name: collect[i]._id,
      itemStyle: { normal: { borderWidth: 4, borderColor: color[i] } }
    });
    data2.push({
      value: collect[i].val,
      name: collect[i]._id,
      itemStyle: { normal: { borderWidth: 4, borderColor: color[i] } }
    });
    allData += collect[i].val;
  }
  var seriesOption = [
    {
      name: "",
      type: "pie",
      clockWise: false,
      center: ["45%", "50%"],
      radius: ["70%", "72%"],
      hoverAnimation: false,
      data: data,
      itemStyle: {
        normal: { label: { show: false }, labelLine: { show: false } }
      }
    }
  ];
  var option = {
    color: color,
    series: seriesOption,
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)"
    }
  };

  var option2 = deepClone(option);
  option2.series[0].data = data2;
  option2.series[0].radius = ["35%", "55%"];
  return [allData, option, option2];
}
export function formatUnixtimestamp(timestamp) {
  var unixtimestamp = new Date(timestamp);
  var year = 1900 + unixtimestamp.getYear();
  var month = "0" + (unixtimestamp.getMonth() + 1);
  var date = "0" + unixtimestamp.getDate();
  var hour = "0" + unixtimestamp.getHours();
  var minute = "0" + unixtimestamp.getMinutes();
  var second = "0" + unixtimestamp.getSeconds();
  return (
    year +
    "-" +
    month.substring(month.length - 2, month.length) +
    "-" +
    date.substring(date.length - 2, date.length) +
    " " +
    hour.substring(hour.length - 2, hour.length) +
    ":" +
    minute.substring(minute.length - 2, minute.length) +
    ":" +
    second.substring(second.length - 2, second.length)
  );
}

export function formatTimestamp(timestamp) {
  var unixtimestamp = new Date();
  if (timestamp) {
    unixtimestamp = new Date(timestamp);
  }
  var hour = "0" + unixtimestamp.getHours();
  var minute = "0" + unixtimestamp.getMinutes();
  var second = "0" + unixtimestamp.getSeconds();

  return (
    hour.substring(hour.length - 2, hour.length) +
    ":" +
    minute.substring(minute.length - 2, minute.length) +
    ":" +
    second.substring(second.length - 2, second.length)
  );
}
export function lnglatToG20(map, lnglat) {
  lnglat = map.lngLatToGeodeticCoord(lnglat);
  lnglat.x = AMap.Util.format(lnglat.x, 3);
  lnglat.y = AMap.Util.format(lnglat.y, 3);
  return lnglat;
}

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
    晴: "sun",
    少云: "cloud-sun",
    晴间多云: "cloud-sun",
    多云: "cloud",
    阴: "cloud",
    有风: "wind",
    平静: "sun",
    微风: "wind",
    和风: "wind",
    清风: "wind",
    "强风/劲风": "wind",
    疾风: "wind",
    大风: "wind",
    烈风: "wind",
    风暴: "wind",
    狂爆风: "wind",
    飓风: "wind",
    热带风暴: "wind",
    霾: "smog",
    中度霾: "smog",
    重度霾: "smog",
    严重霾: "smog",
    阵雨: "cloud-rain",
    雷阵雨: "cloud-rain",
    雷阵雨并伴有冰雹: "cloud-meatball",
    小雨: "cloud-rain",
    中雨: "cloud-rain",
    大雨: "cloud-rain",
    暴雨: "cloud-showers-heavy",
    大暴雨: "cloud-showers-heavy",
    特大暴雨: "cloud-showers-heavy",
    强阵雨: "cloud-showers-heavy",
    强雷阵雨: "cloud-showers-heavy",
    极端降雨: "cloud-showers-heavy",
    "毛毛雨/细雨": "cloud-sun-rain",
    雨: "cloud-rain",
    "小雨-中雨": "cloud-rain",
    "中雨-大雨": "cloud-rain",
    "大雨-暴雨": "cloud-rain",
    "暴雨-大暴雨": "cloud-showers-heavy",
    "大暴雨-特大暴雨": "cloud-showers-heavy",
    雨雪天气: "snowflake",
    雨夹雪: "snowflake",
    阵雨夹雪: "snowflake",
    冻雨: "cloud-meatball",
    雪: "snowflake",
    阵雪: "snowflake",
    小雪: "snowflake",
    中雪: "snowflake",
    大雪: "snowflake",
    暴雪: "snowflake",
    "小雪-中雪": "snowflake",
    "中雪-大雪": "snowflake",
    "大雪-暴雪": "snowflake",
    浮尘: "smog",
    扬沙: "smog",
    沙尘暴: "smog",
    强沙尘暴: "meteor",
    龙卷风: "wind",
    雾: "smog",
    浓雾: "smog",
    强浓雾: "smog",
    轻雾: "smog",
    大雾: "smog",
    特强浓雾: "smog",
    热: "temperature-high",
    冷: "temperature-low",
    未知: "rainbow"
  };
  return map[weather];
}

export const AllProtocol = [
  {
    name: "Modbus/TCP",
    desc:
      "Modbus是一种开放的通信协议，用于工业自动化和控制系统中的设备间通信。最初由Modicon（现在是施耐德电气的一部分）在1979年开发，Modbus被广泛应用于PLC、传感器、变频器和其他工业设备之间的数据交换。",
    img: require("./assets/Modbus_TCP.png")
  },
  {
    name: "BACnet",
    desc:
      "BACnet-APDU（Advanced Protocol Data Unit）是BACnet协议中的一种数据单元，用于在建筑自动化和控制系统中进行设备间的通信。BACnet是一个开放的协议，旨在促进不同制造商设备之间的互操作性，广泛应用于楼宇自动化、暖通空调（HVAC）、照明控制和安全系统等领域。",
    img: require("./assets/BACnet.png")
  },
  {
    name: "ZigBee",
    desc:
      "ZigBee是一种基于IEEE 802.15.4标准的无线通信协议，主要用于低功耗、短距离的无线网络应用。它特别适合于低数据速率和较小设备数量的场景，广泛应用于家庭自动化、智能电网、传感器网络和工业自动化等领域。",
    img: undefined
  },
  {
    name: "MQTT",
    desc:
      "MQTT（Message Queuing Telemetry Transport）是一种轻量级的消息传递协议，专为低带宽、高延迟或不可靠的网络环境设计。最初由IBM在1999年开发，MQTT现在已成为物联网（IoT）应用中的标准通信协议，特别适用于需要快速、可靠传输的小型消息的场景。",
    img: undefined
  },
  {
    name: "Ethernet/IP",
    desc:
      "Ethernet/IP协议是由控制网国际有限公司（ControlNet International)的技术工作组联合ODVA(Open DeviceNet Vendor Association)世纪九构建的，是现场总线国际标准IEC 61158承认的现在有10种类型总线的国际标准之一，基于CIP（Common Industrial Protocol通用工业协议）作为应用层协议基础上开发，是一种面向对象的协议，可以提供一系列标准服务，包括通过隐式和显示的方式对网络设备进行控制",
    img: undefined
  },
  {
    name: "CIP",
    desc:
      "CIP（Common Industrial Protocol）是一种用于工业自动化和控制的通信协议，旨在实现设备间的互操作性。CIP为多种网络协议提供了统一的数据传输和控制方式，广泛应用于各种工业设备、控制系统和自动化应用中。",
    img: undefined
  },
  {
    name: "IEC104",
    desc: "适用传感器：应用于电力、城市轨道交通等行业的国际标准",
    img: require("./assets/IEC-104.png")
  },
  {
    name: "S7 Communication",
    desc: "适用传感器：西门子S7-300",
    img: require("./assets/S7.png")
  },
  {
    name: "DNP3",
    desc:
      "适用传感器：电力和自来水公司等公用事业。 1个起始位，1个结束位，8个数据位",
    img: undefined
  },
  {
    name: "RTSP",
    desc:
      "RTSP（Real-Time Streaming Protocol）是一种网络协议，用于控制实时媒体流的传输。它由IETF（互联网工程任务组）于1998年发布，广泛应用于音频和视频流媒体的控制，特别是在网络摄像头、视频监控和流媒体服务器中。",
    img: undefined
  },

  {
    name: "OPC UA",
    desc:
      "OPC UA（Open Platform Communications Unified Architecture）是一种用于工业自动化和控制的开放标准通信协议，旨在促进设备、应用程序和系统之间的互操作性。OPC UA是OPC（OLE for Process Control）标准的后续版本，具备更高的灵活性和可扩展性。",
    img: undefined
  },
  {
    name: "FINS",
    desc:
      "FINS（Factory Instrument Network Service）是一种由OMRON公司开发的工业通信协议，专门用于其自动化设备和控制系统之间的数据传输。FINS协议被广泛应用于OMRON的PLC、传感器、执行器以及其他工业设备，支持设备间的有效通信和控制。",
    img: undefined
  },
  {
    name: "DICOM",
    desc:
      "DICOM（Digital Imaging and Communications in Medicine）是一种国际标准，用于医学影像的存储、传输和共享。该标准由NEMA（National Electrical Manufacturers Association）于1983年首次发布，并由DICOM组织持续更新。DICOM广泛应用于放射学、超声、核医学等领域，支持各种医疗影像设备之间的数据交换。",
    img: undefined
  },
  {
    name: "SYNCHROPHASOR",
    desc:
      "同步相量（Synchrophasor）是一种用于电力系统监测和分析的技术，主要用于实时测量和记录电力系统中电压和电流的相量信息。同步相量技术结合了全球定位系统（GPS）和数字信号处理，能够提供高精度和高时间分辨率的电力系统数据。",
    img: undefined
  },
  {
    name: "PTPv2",
    desc:
      "PTPv2（Precision Time Protocol version 2）是一种网络协议，用于在计算机网络中实现高精度的时钟同步。PTPv2是IEEE 1588标准的第二个版本，主要应用于需要严格时间同步的领域，如金融服务、工业自动化、广播和通信等。",
    img: undefined
  },
  {
    name: "Ether-S-I/O",
    desc:
      "Ether-S/I/O是一种基于Ethernet的工业通信协议，主要用于现场设备与控制系统之间的高效数据交换。它是由日本OMRON公司开发，专门针对工业自动化和控制领域的需求而设计，旨在实现快速和可靠的设备间通信。",
    img: undefined
  },
  {
    name: "HART-IP",
    desc:
      "HART协议是美国Rosement公司于1985年推出的一种用于现场智能仪表和控制室设备之间的通信协议。现已成为全球智能仪表的工业标准",
    img: undefined
  },

  {
    name: "DG Gryphon",
    desc:
      "DG Gryphon是由GE Digital开发的一种实时数据采集和分析平台，主要用于工业和制造环境中的数据监控和优化。DG Gryphon旨在帮助企业实现智能制造、提高设备效率、降低成本并提升整体运营性能",
    img: undefined
  },
  {
    name: "CoAP",
    desc:
      "CoAP（Constrained Application Protocol）是一种为低功耗和资源受限的设备设计的网络协议，主要用于物联网（IoT）环境中的设备通信。CoAP是基于REST（Representational State Transfer）架构的，类似于HTTP，但专为低带宽和高延迟的网络条件优化。",
    img: undefined
  },
  {
    name: "CIP CM",
    desc:
      "CIP CM（CIP Common Model）是CIP（Common Industrial Protocol）的一个组成部分，旨在提供设备之间的通用信息模型和通信服务，支持工业自动化中的互操作性和数据共享。CIP CM通过定义一系列的对象、属性和服务，使得不同设备能够通过标准化的方式进行通信。",
    img: undefined
  },

  {
    name: "6LoWPAN",
    desc:
      "6LoWPAN（IPv6 over Low-Power Wireless Personal Area Networks）是一种用于低功耗无线个人局域网（WPAN）的网络协议，旨在将IPv6协议扩展到低速率和低功耗的无线网络中。6LoWPAN适合于物联网（IoT）设备的连接，使它们能够通过无线网络与互联网进行通信。",
    img: undefined
  },
  {
    name: "RTPS",
    desc:
      "RTPS（Real-Time Publish-Subscribe）是一种用于实时数据分发的协议，主要应用于分布式系统中，如实时通信、物联网（IoT）和工业自动化。RTPS是DDS（Data Distribution Service）的一个重要部分，旨在实现高效、低延迟和可靠的数据通信。",
    img: undefined
  },
  {
    name: "DCE RPC",
    desc:
      "DCE RPC（Distributed Computing Environment Remote Procedure Call）是一种用于分布式计算环境的协议，旨在简化跨网络的远程过程调用。DCE RPC 是由开放集团（Open Group）开发的，主要用于支持复杂的分布式应用程序。",
    img: undefined
  },
  {
    name: "Portmap",
    desc:
      "Portmap（也称为 rpc.portmap 或 rpcbind）是一个用于网络服务发现的协议，主要在Unix和Linux系统中使用。它允许客户端查询和绑定到网络服务的端口号，特别是在使用RPC（远程过程调用）服务的环境中。",
    img: undefined
  },
  {
    name: "AMQP",
    desc:
      "AMQP（Advanced Message Queuing Protocol）是一种开放标准的消息导向中间件协议，用于高效、安全和可靠地在分布式系统中传递消息。AMQP的设计旨在促进不同平台和语言之间的互操作性，使应用程序能够灵活地发送和接收消息。",
    img: undefined
  },
  {
    name: "SNMP",
    desc:
      "SNMP（Simple Network Management Protocol）是一种网络管理协议，用于监控和管理网络设备。它被广泛应用于网络设备（如路由器、交换机、服务器和打印机）的管理，帮助网络管理员获取设备的状态、性能和配置等信息。",
    img: undefined
  },
  {
    name: "AMS",
    desc:
      "AMS（Automation Message Specification）是由Beckhoff Automation公司开发的一种用于工业自动化的通信协议。AMS主要用于在不同设备和系统之间实现数据交换，特别是在PC与PLC（可编程逻辑控制器）之间的通信。",
    img: undefined
  },
  {
    name: "ANSI C12.22",
    desc:
      "ANSI C12.22是一个由美国国家标准协会（ANSI）制定的标准，专门用于智能电表和其他电力设备之间的通信。该标准定义了一种面向对象的通信协议，旨在实现电力消费数据的收集、监控和管理。",
    img: undefined
  },
  {
    name: "HSRP",
    desc:
      "HSRP（Hot Standby Router Protocol）是由Cisco开发的一种网络协议，用于提供路由器冗余和故障切换。HSRP的主要目的是确保在网络中存在一个可用的默认网关，即使主路由器发生故障，网络流量仍然可以继续转发，从而提高网络的可用性和可靠性。",
    img: undefined
  },
  {
    name: "POWERLINK",
    desc:
      "POWERLINK是一种基于以太网的实时工业通信协议，主要用于实现工业自动化和控制系统中的数据交换。该协议由Ethernet POWERLINK Standardization Group（EPSG）维护，旨在提供高性能的实时数据传输，支持多种工业应用。",
    img: undefined
  },

  {
    name: "COTP",
    desc:
      "COTP（Connection-Oriented Transport Protocol）是一个用于在ISO 8073标准上实现面向连接的传输协议，主要用于网络通信中的数据传输。COTP为上层协议提供了一个可靠的传输服务，适合需要顺序交付和错误检测的应用。",
    img: undefined
  },
  {
    name: "MMS",
    desc:
      "MMS（Manufacturing Message Specification）是一种工业通信协议，主要用于在自动化和控制系统中实现设备间的数据交换和管理。MMS是由国际电工委员会（IEC）在IEC 61850标准中定义的，旨在支持电力和其他工业领域的实时通信。",
    img: undefined
  },
  {
    name: "NBSS",
    desc:
      "NetBIOS Session Service是NetBIOS（Network Basic Input/Output System）协议的一部分，主要用于在局域网中提供会话层服务，支持应用程序之间的通信。NetBIOS是由IBM最初开发的，后来被广泛用于Windows网络环境中。",
    img: undefined
  },
  {
    name: "NTP",
    desc:
      "NTP（Network Time Protocol）是一种用于在计算机网络中同步时间的协议。NTP能够在不同设备之间提供精确的时间信息，确保网络中所有设备的时钟保持一致，通常用于服务器、路由器、交换机和其他网络设备。",
    img: undefined
  },
  {
    name: "SMB",
    desc:
      "SMB（Server Message Block）是一种网络协议，主要用于在计算机网络中共享文件、打印机和其他资源。它允许应用程序在网络上的计算机之间读取和写入文件，也可以在网络中进行远程过程调用（RPC）",
    img: undefined
  },
  {
    name: "TPKT",
    desc:
      "TPKT（Transport Protocol Knowledge Transfer）是一种用于传输协议的数据封装格式，主要用于OSI模型的会话层与传输层之间。TPKT协议通常与其他协议（如ISO 8073和ISO 8802）结合使用，提供可靠的传输机制。",
    img: undefined
  },
  {
    name: "TLSv1",
    desc:
      "TLSv1（Transport Layer Security version 1.0）是传输层安全协议的第一个主要版本，用于在计算机网络中提供安全的通信。TLS协议旨在为网络上的应用程序提供保密性和数据完整性，广泛用于保护互联网流量。",
    img: undefined
  },
  {
    name: "SMPP",
    desc:
      "SMPP（Short Message Peer-to-Peer Protocol）是一种用于发送和接收短消息（SMS）的协议，广泛用于移动通信网络中。SMPP协议允许短信中心（SMSC）、应用程序和其他短信服务提供商之间进行高效的消息传输。",
    img: undefined
  },
  {
    name: "SKINNY",
    desc:
      "SKINNY是一种轻量级的网络协议，主要用于将会话控制信息从应用层传输到多个接收方。它通常与SIP（Session Initiation Protocol）配合使用，适用于VoIP（Voice over IP）和其他实时通信应用。",
    img: undefined
  },
  {
    name: "LON",
    desc:
      "Local Operating Network（LON）是一个用于分布式控制和自动化的网络协议，特别设计用于智能建筑和工业控制系统。它是LonWorks技术的一部分，由Echelon Corporation开发，旨在实现不同设备之间的互联互通。",
    img: undefined
  },

  {
    name: "BSSAP",
    desc:
      "BSSAP（Base Station System Application Part）是用于GSM（全球移动通信系统）网络中的一个协议，主要负责基站系统与移动交换中心之间的信令和通信。BSSAP的主要作用是支持在基站系统和核心网络之间传输各种控制信令。",
    img: undefined
  },
  {
    name: "DB-LSP-DISC",
    desc:
      "DB-LSP-DISC（Database Link State Protocol Discard）是一种用于网络路由的协议，主要用于维护网络拓扑的信息和状态。它通常在基于链路状态的路由协议中使用，帮助路由器有效地发现和维护网络中链路的状态。",
    img: undefined
  },
  {
    name: "LLMNR",
    desc:
      "LLMNR（Link-Local Multicast Name Resolution）是一种用于本地网络中的名称解析协议，主要用于在IPv4和IPv6环境中解析主机名。LLMNR允许设备在没有DNS（域名系统）服务的情况下，通过本地链路进行名称解析。",
    img: undefined
  },
  {
    name: "DHCPv6",
    desc:
      "DHCPv6（Dynamic Host Configuration Protocol for IPv6）是一种用于IPv6网络的动态主机配置协议，主要用于自动为IPv6设备分配IP地址和其他网络配置信息。DHCPv6允许设备在网络中快速而有效地获取所需的网络参数，简化了网络管理。",
    img: undefined
  },
  {
    name: "SRVLOC",
    desc:
      "SRVLOC（Service Location Protocol）是一种用于网络中服务发现的协议，主要允许客户端查找和连接到可用的网络服务。SRVLOC为网络应用提供了一种方法，使其能够在动态环境中自动发现服务，而不需要预先知道服务的位置或地址。",
    img: undefined
  },
  {
    name: "PROFINET",
    desc:
      "PROFINET是一种新的bai以太网通讯系统，是由西门子公司和Profibus用户协会开发。PROFINET具有多制造商产品之间的通讯能力，自动化和工程模式，并针对分布式智能自动化系统进行了优化。其应用结果能够大大节省配置和调试费用。PROFINET系统集成了基于Profibus的系统，提供了对现有系统投资的保护。它也可以集成其它现场总线系统",
    img: undefined
  },
  {
    name: "BVLC",
    desc:
      "BVLC（BACnet Virtual Link Control）是BACnet协议的一部分，用于支持在BACnet网络中建立和管理虚拟连接。BACnet是一种开放的建筑自动化和控制网络协议，广泛应用于HVAC（供暖、通风和空调）、照明控制和其他建筑管理系统。",
    img: undefined
  },
  {
    name: "CAN-ETH",
    desc:
      "CAN-ETH（Controller Area Network over Ethernet）是一种网络协议，旨在将CAN（Controller Area Network）总线的功能与以太网相结合。这种协议使得基于CAN的设备能够通过以太网进行通信，从而实现更高的数据传输速率和更广泛的网络连接能力。",
    img: undefined
  },
  {
    name: "CIP PCCC",
    desc:
      "CIP PCCC（Common Industrial Protocol - Print Command and Control Communications）是CIP协议的一个扩展，专门用于支持工业打印机和其他相关设备之间的通信。CIP本身是一个开放的网络协议，广泛应用于工业自动化领域，包括制造、过程控制和设备管理。",
    img: undefined
  },
  {
    name: "NBNS",
    desc:
      "NBNS（NetBIOS Name Service）是一种用于局域网中通过NetBIOS协议进行名称解析的服务。NBNS允许计算机和设备通过名称（而非IP地址）相互识别和通信，主要用于Windows网络和其他支持NetBIOS的操作系统。",
    img: undefined
  }
];
