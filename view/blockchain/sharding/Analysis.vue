<template>
    <div class="wraper">
      <!-------------------------  图表  -------------------------------->
      <div class="title">
        重叠分片性能分析
      </div>
      <div class="Charts">
        <div id="chart1" style="width: 100%;height: 400px;"></div>
        <div id="chart2" style="width: 100%;height: 400px;"></div>
        <div id="chart3" style="width: 100%;height: 400px;"></div>
        <div id="chart4" style="width: 100%;height: 400px;"></div>
        <div id="chart5" style="width: 100%;height: 400px;"></div>
        <div id="chart6" style="width: 100%;height: 400px;"></div>
        <div id="chart7" style="width: 100%;height: 400px;"></div>
        <div id="chart8" style="width: 100%;height: 400px;"></div>
      </div>
  
    </div>
  </template>
  
  <script>
    import ElementUI, {
      Carousel
    } from 'element-ui';
    import G6, {
      G6GraphEvent
    } from '@antv/g6';
    import {
      compileToFunctions
    } from 'vue-template-compiler';
    import {
      clone
    } from '@antv/util';
    import * as echarts from 'echarts';
  
    export default {
      name: "analysis",
      mounted() {
        this.initChart1();
        this.initChart2();
        this.initChart3();
        this.initChart4();
        this.initChart5();
        this.initChart6();
        this.initChart7();
        this.initChart8();
  
      },
      methods: {
        initChart1() {
          var chartDom = document.getElementById('chart1');
          var myChart = echarts.init(chartDom);
          var option;
  
          option = {
            title: {
              text: 'Ratio of Transactions Comparison of Different Sharding Schemes',
              textStyle: {
                fontSize: 12
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
            },
            legend: {
              data: ['Omniledger', 'Overlap-random Sharding', 'Reputation_based Sharding', 'DRL-OSS'],
              top: '6%',
              itemWidth: 6,
              itemHeight: 6,
              textStyle: {
                fontSize: 9
              }
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: '93%',
              top: 'center',
              feature: {
                mark: {
                  show: true
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar', 'stack']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            grid: {
              right: '5%'
            },
            xAxis: [{
              name: 'Sharding Scheme',
              type: 'category',
              axisTick: {
                alignWithLabel: true,
                show: false
              },
              axisLabel: {
                interval: 0
              },
              nameLocation: 'center',
              nameGap: 25,
              nameTextStyle: {
                fontSize: 12
              },
              data: ['Intra-shard Txs', 'Overlap-shard Txs', 'Cross-shard Txs']
            }],
            yAxis: [{
              name: 'Ratio(%)',
              type: 'value',
              nameLocation: 'end',
              nameGap: 5,
              nameTextStyle: {
                fontSize: 12
              },
            }],
            series: [{
                name: 'Omniledger',
                type: 'bar',
                barGap: 0,
                emphasis: {
                  focus: 'series'
                },
                data: [8.64, 0.00, 91.36]
              },
              {
                name: 'Overlap-random Sharding',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [10.70, 74.29, 15.01]
              },
              {
                name: 'Reputation_based Sharding',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [16.77, 0.00, 83.23]
              },
              {
                name: 'DRL-OSS',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [66.11, 33.89, 0.00]
              }
            ]
          };
  
          option && myChart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        },
  
        initChart2() {
          var app = {};
  
          var chartDom = document.getElementById('chart2');
          var myChart = echarts.init(chartDom);
          var option;
  
          option = {
            title: {
              text: 'Average Reputation of Shards - Number of Shards',
              textStyle: {
                fontSize: 12
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
            },
            legend: {
              data: ['Omniledger', 'Overlap-random Sharding', 'Reputation_based Sharding', 'DRL-OSS'],
              top: '5%',
              itemWidth: 6,
              itemHeight: 6,
              textStyle: {
                fontSize: 9
              }
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: '93%',
              top: 'center',
              feature: {
                mark: {
                  show: true
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar', 'stack']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            grid: {
              right: '5%'
            },
            xAxis: [{
              name: 'Number of Shards',
              type: 'category',
              data: ['8', '10', '12', '14', '16'],
              axisTick: {
                show: false
              },
              nameLocation: 'center',
              nameGap: 25,
              nameTextStyle: {
                fontSize: 12
              },
            }],
            yAxis: [{
              name: 'Average\nReputation of Shards',
              type: 'value',
              min: '0.70',
              max: '0.80',
              nameLocation: 'end',
              nameGap: 7,
              nameTextStyle: {
                fontSize: 8
              },
            }],
            series: [{
                name: 'Omniledger',
                type: 'bar',
                barGap: 0,
                emphasis: {
                  focus: 'series'
                },
                data: [0.7331, 0.7330, 0.7330, 0.7333, 0.7331]
              },
              {
                name: 'Overlap-random Sharding',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [0.7330, 0.7331, 0.7337, 0.7330, 0.7335]
              },
              {
                name: 'Reputation_based Sharding',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [0.7409, 0.7435, 0.7427, 0.7450, 0.7478]
              },
              {
                name: 'DRL-OSS',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [0.7610, 0.7654, 0.7660, 0.7720, 0.7760]
              }
            ]
          };
  
          option && myChart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        },
  
        initChart3() {
          var app = {};
  
          var chartDom = document.getElementById('chart3');
          var myChart = echarts.init(chartDom);
          var option;
  
          option = {
            title: {
              text: 'Average Reputation of Shards - Iteration Number',
              textStyle: {
                fontSize: 12
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
            },
            legend: {
              data: ['shard=8', 'shard=10', 'shard=12', 'shard=14', 'shard=16'],
              top: '5%',
              itemWidth: 10,
              itemHeight: 10,
              textStyle: {
                fontSize: 10
              }
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: '93%',
              top: 'center',
              feature: {
                mark: {
                  show: true
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar', 'stack']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            grid: {
              right: '5%'
            },
            xAxis: [{
              name: 'Iteration Number',
              type: 'category',
              boundaryGap: false,
              data: ['0', '10000', '20000', '30000', '40000', '50000', '60000', '70000', '80000', '90000',
                '100000'
              ],
              nameLocation: 'center',
              nameGap: 25,
              nameTextStyle: {
                fontSize: 13
              },
            }],
            yAxis: [{
              name: 'Average\nReputation of Shards',
              type: 'value',
              min: '0.74',
              max: '0.78',
              nameLocation: 'end',
              nameGap: 7,
              nameTextStyle: {
                fontSize: 8
              },
            }],
            series: [{
                name: 'shard=8',
                type: 'line',
                barGap: 0,
                emphasis: {
                  focus: 'series'
                },
                data: [0.745, 0.753, 0.758, 0.762, 0.762, 0.762, 0.762, 0.762, 0.762, 0.762, 0.762]
              },
              {
                name: 'shard=10',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [0.745, 0.752, 0.757, 0.762, 0.765, 0.765, 0.765, 0.765, 0.765, 0.765, 0.765]
              },
              {
                name: 'shard=12',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [0.745, 0.750, 0.754, 0.758, 0.762, 0.764, 0.767, 0.767, 0.767, 0.767, 0.767]
              },
              {
                name: 'shard=14',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [0.744, 0.749, 0.755, 0.758, 0.763, 0.766, 0.769, 0.773, 0.773, 0.773, 0.773]
              },
              {
                name: 'shard=16',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [0.744, 0.748, 0.755, 0.760, 0.765, 0.768, 0.773, 0.775, 0.777, 0.777, 0.777]
              },
            ]
          };
  
          option && myChart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        },
        initChart4() {
          var app = {};
  
          var chartDom = document.getElementById('chart4');
          var myChart = echarts.init(chartDom);
          var option;
  
          option = {
            title: {
              text: 'Throughput - Number of Shards',
              textStyle: {
                fontSize: 12
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
            },
            legend: {
              data: ['DRL-OSS', 'Omniledger', 'Overlap-random Sharding', 'Reputation_based Sharding'],
              top: '7%',
              itemWidth: 8,
              itemHeight: 8,
              textStyle: {
                fontSize: 8
              }
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: '94%',
              top: 'center',
              feature: {
                mark: {
                  show: true
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar', 'stack']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            grid: {
              right: '5%'
            },
            xAxis: [{
              name: 'Number of Shards',
              type: 'category',
              boundaryGap: false,
              data: ['8', '10', '12', '14', '16'],
              nameLocation: 'center',
              nameGap: 25,
              nameTextStyle: {
                fontSize: 13
              },
            }],
            yAxis: [{
              name: 'Throughput',
              type: 'value',
              min: '1500',
              max: '5500',
              nameLocation: 'end',
              nameGap: 7,
              nameTextStyle: {
                fontSize: 10
              },
            }],
            series: [{
                name: 'DRL-OSS',
                type: 'line',
                barGap: 0,
                emphasis: {
                  focus: 'series'
                },
                data: [2833, 3458, 4166, 4750, 5292]
              },
              {
                name: 'Omniledger',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [1688, 2042, 2438, 2729, 3125]
              },
              {
                name: 'Overlap-random Sharding',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [2438, 2958, 3479, 3917, 4313]
              },
              {
                name: 'Reputation_based Sharding',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [1833, 2292, 2625, 3042, 3375]
              }
            ]
          };
  
          option && myChart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        },
        initChart5() {
          var chartDom = document.getElementById('chart5');
          var myChart = echarts.init(chartDom);
          var option;
          option = {
            tooltip: {
              trigger: 'axis',
              position: function(pt) {
                return [pt[0], '10%'];
              }
            },
            title: {
              text: 'Throughput - Iteration Number',
              textStyle: {
                fontSize: 12
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              right: '5%'
            },
            xAxis: {
              name: 'Iteration Number',
              type: 'category',
              boundaryGap: false,
              data: [0, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000,
                75000, 80000, 85000, 90000, 95000, 100000
              ],
              nameLocation: 'center',
              nameGap: 25,
              nameTextStyle: {
                fontSize: 13
              },
            },
            yAxis: {
              name: 'Throughput',
              type: 'value',
              boundaryGap: [0, '100%'],
              nameLocation: 'end',
              nameGap: 7,
              nameTextStyle: {
                fontSize: 10
              },
              data: [5100, 5150, 5200, 5250, 5300]
            },
            series: [{
              name: 'Fake Data',
              type: 'line',
              symbol: 'none',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                  }
                ])
              },
              data: [5120, 5040, 5125, 5213, 5247, 5262, 5270, 5251, 5275, 5257, 5296, 5289, 5284, 5293, 5297, 5293,
                5289, 5286, 5284, 5290
              ]
            }]
          };
  
          option && myChart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        },
  
        initChart6() {
          var chartDom = document.getElementById('chart6');
          var myChart = echarts.init(chartDom);
          var option;
  
          option = {
            title: {
              text: 'System Effective Rates - Ratio of Malicious Nodes',
              textStyle: {
                fontSize: 12
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
            },
            legend: {
              data: ['DRL-OSS', 'Omniledger', 'Overlap-random Sharding', 'Reputation_based Sharding'],
              top: '5%',
              itemWidth: 8,
              itemHeight: 8,
              textStyle: {
                fontSize: 8
              }
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: '93%',
              top: 'center',
              feature: {
                mark: {
                  show: true
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar', 'stack']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            grid: {
              right: '5%'
            },
            xAxis: [{
              name: 'Ratio of Malicious Nodes(%)',
              type: 'category',
              boundaryGap: false,
              data: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
              nameLocation: 'center',
              nameGap: 25,
              nameTextStyle: {
                fontSize: 13
              },
            }],
            yAxis: [{
              name: 'System\nEffective Rates(%)',
              type: 'value',
              min: '0',
              max: '100',
              nameLocation: 'end',
              nameGap: 7,
              nameTextStyle: {
                fontSize: 9
              },
            }],
            series: [{
                name: 'DRL-OSS',
                type: 'line',
                barGap: 0,
                emphasis: {
                  focus: 'series'
                },
                data: [100, 100, 87, 73, 25, 12, 0, 0, 0, 0]
              },
              {
                name: 'Omniledger',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [100, 100, 82, 44, 13, 0, 0, 0, 0, 0]
              },
              {
                name: 'Overlap-random Sharding',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [100, 100, 74, 38, 7, 0, 0, 0, 0, 0]
              },
              {
                name: 'Reputation_based Sharding',
                type: 'line',
                emphasis: {
                  focus: 'series'
                },
                data: [100, 100, 81, 44, 12, 0, 0, 0, 0, 0]
              }
            ]
          };
  
          option && myChart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        },
  
        initChart7() {
          var chartDom = document.getElementById('chart7');
          var myChart = echarts.init(chartDom);
          var option;
  
          option = {
            title: {
              text: 'Time - Sharding Scheme',
              textStyle: {
                fontSize: 12
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
            },
            grid: {
              right: '5%'
            },
            xAxis: {
              name: 'Sharding Scheme',
              nameLocation: 'center',
              nameGap: 35,
              nameTextStyle: {
                fontSize: 13
              },
              type: 'category',
              data: [
                {
                  value:'Omniledger',
                  textStyle:{
                    fontSize:10
                  }
                },{
                  value:'Overlap-random\nSharding',
                  textStyle:{
                    fontSize:10
                  }
                },{
                  value:'Reputation_based\nSharding',
                  textStyle:{
                    fontSize:10
                  }
                },{
                  value:'DRL-OSS',
                  textStyle:{
                    fontSize:10
                  }
                }],
              axisTick: {
                alignWithLabel: true,
                show: false
              },
              axisLabel: {
                interval: 0
              },
              axisLine: {
                onZero: true // 开启 x 轴经过 y 轴的 0 点
              },
            },
            yAxis: {
              name: 'Time',
              nameLocation: 'end',
              nameGap: 7,
              nameTextStyle: {
                fontSize: 12
              },
              type: 'value',
            },
            series: [{
              emphasis: {
                focus: 'series'
              },
              data: [{
                  value: 0.0105,
                  itemStyle: {
                    color: '#2CA8E6'
                  }
                },
                {
                  value: 0.0115,
                  itemStyle: {
                    color: '#E59555'
                  }
                },
                {
                  value: 18.4582,
                  itemStyle: {
                    color: '#67E573'
                  }
                },
                {
                  value: 3.8349,
                  itemStyle: {
                    color: '#E53B29'
                  }
                }
              ],
              type: 'bar'
            }]
          };
  
          option && myChart.setOption(option);
        },
  
        initChart8() {
          var chartDom = document.getElementById('chart8');
          var myChart = echarts.init(chartDom);
          var option;
          option = {
            tooltip: {
              trigger: 'axis',
              position: function(pt) {
                return [pt[0], '10%'];
              }
            },
            title: {
              text: 'Reward - Iteration Number',
              textStyle: {
                fontSize: 12
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              right: '5%'
            },
            xAxis: {
              name: 'Interation Number',
              type: 'category',
              boundaryGap: false,
              data: [0,,10000,20000,30000,40000,50000,60000,70000,80000,90000,100000],
              nameLocation: 'center',
              nameGap: 25,
              nameTextStyle: {
                fontSize: 13
              },
            },
            yAxis: {
              name: 'Reward',
              type: 'value',
              boundaryGap: [0, '100%'],
              data: [0.55, 0.60, 0.65, 0.70, 0.75, 0.80],
              nameLocation: 'end',
              nameGap: 7,
              nameTextStyle: {
                fontSize: 10
              },
            },
            series: [{
              name: 'shard=8',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                color: 'black'
              },
              data: [0.645, 0.623, 0.690,0.723, 0.734, 0.725, 0.750, 0.766, 0.774, 0.773, 0.786, 0.775, 0.784,
                0.773, 0.782
              ]
            }, {
              name: 'shard=10',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                color: 'green'
              },
              data: [0.645, 0.623, 0.690,0.605, 0.653, 0.675, 0.735, 0.739, 0.726, 0.741, 0.767, 0.775, 0.781,
                0.767, 0.775]
            }, {
              name: 'shard=12',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                color: 'lightblue'
              },
              data: [0.613, 0.648, 0.625,0.650, 0.673, 0.668, 0.720, 0.713, 0.721, 0.747, 0.753, 0.764, 0.756,
                0.766, 0.760]
            }, {
              name: 'shard=14',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                color: 'red'
              },
              data: [0.590, 0.620, 0.631,0.634, 0.653, 0.663, 0.675, 0.677, 0.700, 0.705, 0.713, 0.721, 0.730,
                0.739, 0.744]
            }, {
              name: 'shard=16',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                color: 'orange'
              },
              data: [0.575, 0.561, 0.600,0.621, 0.637, 0.650, 0.661, 0.674, 0.685, 0.696, 0.713, 0.728, 0.726,
                0.724, 0.733]
            }]
          };
  
          option && myChart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        },
  
      }
    }
  </script>
  
  <style scoped>
  .title{
    font-size: 28px;
    font-weight: 600;
    border-bottom: 1px solid #333;
    width: 1240px;
  }
    .wraper {
      width: 100%;
      background-color: white;
      border-radius: 20px;
      height: auto;
      margin: 2vh 0.6vw;
      padding: 1vw;
    }
  
  
    .wraper .Charts {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      /* grid-template-rows: 50% 50%; */
      height: 100%;
      grid-gap: 5px;
      justify-content: space-between;
      padding: 20px 40px;
    }
  </style>
  