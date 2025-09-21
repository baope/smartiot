<template>
  <div class="wraper">
    <!------------------------- 搜索框header  -------------------------------->
    <div>
      <el-tabs v-model="activeitem" @tab-click="handletabclick" stretch>
        <el-tab-pane label="区块分块拓扑图" name="first"> </el-tab-pane>
        <el-tab-pane label="区块链分片信息检索" name="second"> </el-tab-pane>
        <el-tab-pane label="相关信息图表" name="third"> </el-tab-pane>
      </el-tabs>
    </div>
    <!------------------------- 搜索框Body  -------------------------------->
    <transition name="searchTransition">
      <div class="searchBox" v-show="isSearchshow">
        <!------------------------- 搜索框grid1  -------------------------------->
        <div class="searchFirst">
          <div class="compareAttribute">
            <p>shardId</p>
          </div>
          <div class="compareSign">
            <p>==</p>
          </div>
          <div class="compareInput">
            <p>操作数:</p>
            <div class="numberInput">
              <el-input
                v-model="inputNumber1"
                placeholder="请输入大于0的比较数字"
              ></el-input>
            </div>
          </div>
        </div>
        <!-------------------------  逻辑符  -------------------------------->
        <div class="searchLogic">
          <p>AND</p>
        </div>
        <!------------------------- 搜索框grid2  -------------------------------->
        <div class="searchSecond">
          <div class="compareAttribute">
            <p>shardId</p>
          </div>
          <div class="compareSign">
            <p>==</p>
          </div>
          <div class="compareInput">
            <p>操作数:</p>
            <div class="numberInput">
              <el-input
                v-model="inputNumber2"
                placeholder="请输入大于0的比较数字"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!------------------------- 搜索框Footer  -------------------------------->
    <transition name="searchTransition">
      <div class="serachFooter" v-if="isSearchshow">
        <el-button type="danger" icon="el-icon-close" @click="deleteSearch()"
          >一键清空</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchingResult()"
          >搜索</el-button
        >
      </div>
    </transition>
    <!------------------------- 分片拓扑图  -------------------------------->
    <div class="NodesShard" id="NodesGraph" v-show="isGraphshow">
      <!-- <div v-for="(item,index) of 2" :key="item" style="background-color:#f1f5fd" id="wrapper_div">
        <div style="background-color:white; float:left; border:2px solid #4DD1D1;  text-align:center" :id="'div'+(index*2+1)">
          <h2>分片{{index*2+1}}拓扑图</h2>
        </div>
        <div style="background-color:white; float:right; border:2px solid #4DD1D1;  text-align:center" :id="'div'+(index*2+2)">
          <h2>分片{{index*2+2}}拓扑图</h2>
        </div>
      </div> -->
    </div>
    <!-------------------------  图表  -------------------------------->
    <div class="Charts" v-show="isChartshow">
      <div id="chart1" style="width: 600px; height: 500px"></div>
      <div id="chart2" style="width: 600px; height: 500px"></div>
      <div id="chart3" style="width: 600px; height: 500px"></div>
      <div id="chart4" style="width: 600px; height: 500px"></div>
      <div id="chart5" style="width: 600px; height: 500px"></div>
      <div id="chart6" style="width: 600px; height: 500px"></div>
      <div id="chart7" style="width: 600px; height: 500px"></div>
      <div id="chart8" style="width: 600px; height: 500px"></div>
    </div>
  </div>
</template>

<script>
import ElementUI, { Carousel } from "element-ui";
import G6, { G6GraphEvent } from "@antv/g6";
import { compileToFunctions } from "vue-template-compiler";
import { clone } from "@antv/util";
import * as echarts from "echarts";

export default {
  name: "Model4",
  mounted() {
    let container = document.getElementById("NodesGraph");

    for (let i = 1; i <= 4; i++) {
      console.log("循环生成div");
      let box = document.createElement("div");
      box.id = "div" + i;
      box.style = "background-color:white; border:2px solid #4DD1D1";
      var h2 = document.createElement("h2");
      h2.textContent = `分片${i}拓扑图`;
      h2.style.textAlign = "center";
      box.appendChild(h2);
      container.appendChild(box);
    }

    this.Generate();
    this.initChart1();
    this.initChart2();
    this.initChart3();
    this.initChart4();
    this.initChart5();
    this.initChart6();
    this.initChart7();
    this.initChart8();
  },

  data() {
    return {
      isChartshow: false,
      isGraphshow: true,
      isSearchshow: false,
      inputNumber1: "",
      inputNumber2: "",
      searchResult: [],
      // 区块链分片数据
      data: {
        nodes: [
          {
            id: "0",
            label: "0",
            cluster: "1,2",
          },
          {
            id: "1",
            label: "1",
            cluster: "1,2",
          },
          {
            id: "2",
            label: "2",
            cluster: "1,4",
          },
          {
            id: "3",
            label: "3",
            cluster: "1",
          },
          {
            id: "4",
            label: "4",
            cluster: "1",
          },
          {
            id: "5",
            label: "5",
            cluster: "1",
          },
          {
            id: "6",
            label: "6",
            cluster: "1",
          },
          {
            id: "7",
            label: "7",
            cluster: "1",
          },
          {
            id: "8",
            label: "8",
            cluster: "1",
          },
          {
            id: "9",
            label: "9",
            cluster: "1",
          },
          {
            id: "10",
            label: "10",
            cluster: "1",
          },
          {
            id: "11",
            label: "11",
            cluster: "1",
          },
          {
            id: "12",
            label: "12",
            cluster: "1",
          },
          {
            id: "13",
            label: "13",
            cluster: "2",
          },
          {
            id: "14",
            label: "14",
            cluster: "2",
          },
          {
            id: "15",
            label: "15",
            cluster: "2",
          },
          {
            id: "16",
            label: "16",
            cluster: "2",
          },
          {
            id: "17",
            label: "17",
            cluster: "2",
          },
          {
            id: "18",
            label: "18",
            cluster: "3",
          },
          {
            id: "19",
            label: "19",
            cluster: "3",
          },
          {
            id: "20",
            label: "20",
            cluster: "3",
          },
          {
            id: "21",
            label: "21",
            cluster: "3",
          },
          {
            id: "22",
            label: "22",
            cluster: "3",
          },
          {
            id: "23",
            label: "23",
            cluster: "3",
          },
          {
            id: "24",
            label: "24",
            cluster: "3",
          },
          {
            id: "25",
            label: "25",
            cluster: "3",
          },
          {
            id: "26",
            label: "26",
            cluster: "3",
          },
          {
            id: "27",
            label: "27",
            cluster: "3",
          },
          {
            id: "28",
            label: "28",
            cluster: "3",
          },
          {
            id: "29",
            label: "29",
            cluster: "3",
          },
          {
            id: "30",
            label: "30",
            cluster: "3",
          },
          {
            id: "31",
            label: "31",
            cluster: "4",
          },
          {
            id: "32",
            label: "32",
            cluster: "4",
          },
          {
            id: "33",
            label: "33",
            cluster: "4",
          },
        ],
        edges: [
          {
            source: "0",
            target: "1",
          },
          {
            source: "0",
            target: "2",
          },
          {
            source: "0",
            target: "3",
          },
          {
            source: "0",
            target: "4",
          },
          {
            source: "0",
            target: "5",
          },
          {
            source: "0",
            target: "7",
          },
          {
            source: "0",
            target: "8",
          },
          {
            source: "0",
            target: "9",
          },
          {
            source: "0",
            target: "10",
          },
          {
            source: "0",
            target: "11",
          },
          {
            source: "0",
            target: "13",
          },
          {
            source: "0",
            target: "14",
          },
          {
            source: "0",
            target: "15",
          },
          {
            source: "0",
            target: "16",
          },
          {
            source: "2",
            target: "3",
          },
          {
            source: "4",
            target: "5",
          },
          {
            source: "4",
            target: "6",
          },
          {
            source: "5",
            target: "6",
          },
          {
            source: "7",
            target: "13",
          },
          {
            source: "8",
            target: "14",
          },
          {
            source: "9",
            target: "10",
          },
          {
            source: "10",
            target: "22",
          },
          {
            source: "10",
            target: "14",
          },
          {
            source: "10",
            target: "12",
          },
          {
            source: "10",
            target: "24",
          },
          {
            source: "10",
            target: "21",
          },
          {
            source: "10",
            target: "20",
          },
          {
            source: "11",
            target: "24",
          },
          {
            source: "11",
            target: "22",
          },
          {
            source: "11",
            target: "14",
          },
          {
            source: "12",
            target: "13",
          },
          {
            source: "16",
            target: "17",
          },
          {
            source: "16",
            target: "18",
          },
          {
            source: "16",
            target: "21",
          },
          {
            source: "16",
            target: "22",
          },
          {
            source: "17",
            target: "18",
          },
          {
            source: "17",
            target: "20",
          },
          {
            source: "18",
            target: "19",
          },
          {
            source: "19",
            target: "20",
          },
          {
            source: "19",
            target: "33",
          },
          {
            source: "19",
            target: "22",
          },
          {
            source: "19",
            target: "23",
          },
          {
            source: "20",
            target: "21",
          },
          {
            source: "21",
            target: "22",
          },
          {
            source: "22",
            target: "24",
          },
          {
            source: "22",
            target: "25",
          },
          {
            source: "22",
            target: "26",
          },
          {
            source: "22",
            target: "23",
          },
          {
            source: "22",
            target: "28",
          },
          {
            source: "22",
            target: "30",
          },
          {
            source: "22",
            target: "31",
          },
          {
            source: "22",
            target: "32",
          },
          {
            source: "22",
            target: "33",
          },
          {
            source: "23",
            target: "28",
          },
          {
            source: "23",
            target: "27",
          },
          {
            source: "23",
            target: "29",
          },
          {
            source: "23",
            target: "30",
          },
          {
            source: "23",
            target: "31",
          },
          {
            source: "23",
            target: "33",
          },
          {
            source: "32",
            target: "33",
          },
        ],
      },
      colors: [
        "#BDD2FD",
        "#BDEFDB",
        "#C2C8D5",
        "#FBE5A2",
        "#F6C3B7",
        "#B6E3F5",
        "#D3C6EA",
        "#FFD8B8",
        "#AAD8D8",
        "#FFD6E7",
      ],
      strokes: [
        "#5B8FF9",
        "#5AD8A6",
        "#5D7092",
        "#F6BD16",
        "#E8684A",
        "#6DC8EC",
        "#9270CA",
        "#FF9D4D",
        "#269A99",
        "#FF99C3",
      ],
      leftGraph: {}, //左侧图片数据
      rightGraph: {}, //右侧图片数据
      intertGraph: {}, //中间图片数据

      activeitem: "first",
    };
  },
  methods: {
    initChart1() {
      var chartDom = document.getElementById("chart1");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "Ratio of Transactions Comparison of Different Sharding Schemes",
          textStyle: {
            fontSize: 17,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [
            "Omniledger",
            "Overlap-random Sharding",
            "Reputation_based Sharding",
            "DRL-OSS",
          ],
          top: "5%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "95%",
          top: "center",
          feature: {
            mark: {
              show: true,
            },
            magicType: {
              show: true,
              type: ["line", "bar", "stack"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        grid: {
          right: "5%",
        },
        xAxis: [
          {
            name: "Sharding Scheme",
            type: "category",
            axisTick: {
              show: false,
            },
            nameLocation: "center",
            nameGap: 25,
            nameTextStyle: {
              fontSize: 15,
            },
            data: ["Intra-shard Txs", "Overlap-shard Txs", "Cross-shard Txs"],
          },
        ],
        yAxis: [
          {
            name: "Ratio(%)",
            type: "value",
            nameRotate: "90",
            nameLocation: "center",
            nameGap: 40,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        series: [
          {
            name: "Omniledger",
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: [8.64, 0.0, 91.36],
          },
          {
            name: "Overlap-random Sharding",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [10.7, 74.29, 15.01],
          },
          {
            name: "Reputation_based Sharding",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [16.77, 0.0, 83.23],
          },
          {
            name: "DRL-OSS",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [66.11, 33.89, 0.0],
          },
        ],
      };

      option && myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initChart2() {
      var app = {};

      var chartDom = document.getElementById("chart2");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "ARS-NS",
          textStyle: {
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [
            "Omniledger",
            "Overlap-random Sharding",
            "Reputation_based Sharding",
            "DRL-OSS",
          ],
          top: "5%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "95%",
          top: "center",
          feature: {
            mark: {
              show: true,
            },
            magicType: {
              show: true,
              type: ["line", "bar", "stack"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        grid: {
          right: "5%",
        },
        xAxis: [
          {
            name: "Number of Shards",
            type: "category",
            data: ["8", "10", "12", "14", "16"],
            axisTick: {
              show: false,
            },
            nameLocation: "center",
            nameGap: 25,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        yAxis: [
          {
            name: "Average Reputation of Shards",
            type: "value",
            min: "0.70",
            max: "0.80",
            nameRotate: "90",
            nameLocation: "center",
            nameGap: 40,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        series: [
          {
            name: "Omniledger",
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: [0.7331, 0.733, 0.733, 0.7333, 0.7331],
          },
          {
            name: "Overlap-random Sharding",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [0.733, 0.7331, 0.7337, 0.733, 0.7335],
          },
          {
            name: "Reputation_based Sharding",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [0.7409, 0.7435, 0.7427, 0.745, 0.7478],
          },
          {
            name: "DRL-OSS",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [0.761, 0.7654, 0.766, 0.772, 0.776],
          },
        ],
      };

      option && myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initChart3() {
      var app = {};

      var chartDom = document.getElementById("chart3");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "ARS-IN",
          textStyle: {
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["shard=8", "shard=10", "shard=12", "shard=14", "shard=16"],
          top: "5%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "95%",
          top: "center",
          feature: {
            mark: {
              show: true,
            },
            magicType: {
              show: true,
              type: ["line", "bar", "stack"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        grid: {
          right: "5%",
        },
        xAxis: [
          {
            name: "Iteration Number",
            type: "category",
            boundaryGap: false,
            data: [
              "0",
              "10000",
              "20000",
              "30000",
              "40000",
              "50000",
              "60000",
              "70000",
              "80000",
              "90000",
              "100000",
            ],
            nameLocation: "center",
            nameGap: 25,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        yAxis: [
          {
            name: "Average Reputation of Shards",
            type: "value",
            min: "0.74",
            max: "0.78",
            nameRotate: "90",
            nameLocation: "center",
            nameGap: 40,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        series: [
          {
            name: "shard=8",
            type: "line",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: [
              0.745, 0.753, 0.758, 0.762, 0.762, 0.762, 0.762, 0.762, 0.762,
              0.762, 0.762,
            ],
          },
          {
            name: "shard=10",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [
              0.745, 0.752, 0.757, 0.762, 0.765, 0.765, 0.765, 0.765, 0.765,
              0.765, 0.765,
            ],
          },
          {
            name: "shard=12",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [
              0.745, 0.75, 0.754, 0.758, 0.762, 0.764, 0.767, 0.767, 0.767,
              0.767, 0.767,
            ],
          },
          {
            name: "shard=14",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [
              0.744, 0.749, 0.755, 0.758, 0.763, 0.766, 0.769, 0.773, 0.773,
              0.773, 0.773,
            ],
          },
          {
            name: "shard=16",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [
              0.744, 0.748, 0.755, 0.76, 0.765, 0.768, 0.773, 0.775, 0.777,
              0.777, 0.777,
            ],
          },
        ],
      };

      option && myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    initChart4() {
      var app = {};

      var chartDom = document.getElementById("chart4");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "ARS-IN",
          textStyle: {
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [
            "DRL-OSS",
            "Omniledger",
            "Overlap-random Sharding",
            "Reputation_based Sharding",
          ],
          top: "5%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "95%",
          top: "center",
          feature: {
            mark: {
              show: true,
            },
            magicType: {
              show: true,
              type: ["line", "bar", "stack"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        grid: {
          right: "5%",
        },
        xAxis: [
          {
            name: "Number of Shards",
            type: "category",
            boundaryGap: false,
            data: ["8", "10", "12", "14", "16"],
            nameLocation: "center",
            nameGap: 25,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        yAxis: [
          {
            name: "Throughput",
            type: "value",
            min: "1500",
            max: "5500",
            nameRotate: "90",
            nameLocation: "center",
            nameGap: 40,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        series: [
          {
            name: "DRL-OSS",
            type: "line",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: [2833, 3458, 4166, 4750, 5292],
          },
          {
            name: "Omniledger",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [1688, 2042, 2438, 2729, 3125],
          },
          {
            name: "Overlap-random Sharding",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [2438, 2958, 3479, 3917, 4313],
          },
          {
            name: "Reputation_based Sharding",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [1833, 2292, 2625, 3042, 3375],
          },
        ],
      };

      option && myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    initChart5() {
      var chartDom = document.getElementById("chart5");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          text: "Thou-IN",
          textStyle: {
            fontSize: 15,
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          right: "5%",
        },
        xAxis: {
          name: "Throughput",
          type: "category",
          boundaryGap: false,
          data: [0, 20000, 40000, 60000, 80000, 100000],
          nameLocation: "center",
          nameGap: 25,
          nameTextStyle: {
            fontSize: 15,
          },
        },
        yAxis: {
          name: "Interation Number",
          type: "value",
          boundaryGap: [0, "100%"],
          nameRotate: "90",
          nameLocation: "center",
          nameGap: 40,
          nameTextStyle: {
            fontSize: 15,
          },
          data: [5100, 5150, 5200, 5250, 5300],
        },
        series: [
          {
            name: "Fake Data",
            type: "line",
            symbol: "none",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: [1, 2, 3, 1],
          },
        ],
      };

      option && myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initChart6() {
      var chartDom = document.getElementById("chart6");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "ARS-IN",
          textStyle: {
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [
            "DRL-OSS",
            "Omniledger",
            "Overlap-random Sharding",
            "Reputation_based Sharding",
          ],
          top: "5%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "95%",
          top: "center",
          feature: {
            mark: {
              show: true,
            },
            magicType: {
              show: true,
              type: ["line", "bar", "stack"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        grid: {
          right: "5%",
        },
        xAxis: [
          {
            name: "Ratio of Malicious Shards(%)",
            type: "category",
            boundaryGap: false,
            data: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
            nameLocation: "center",
            nameGap: 25,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        yAxis: [
          {
            name: "System Effective Rates(%)",
            type: "value",
            min: "0",
            max: "100",
            nameRotate: "90",
            nameLocation: "center",
            nameGap: 40,
            nameTextStyle: {
              fontSize: 15,
            },
          },
        ],
        series: [
          {
            name: "DRL-OSS",
            type: "line",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: [100, 100, 87, 73, 25, 12, 0, 0, 0, 0],
          },
          {
            name: "Omniledger",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [100, 100, 82, 44, 13, 0, 0, 0, 0, 0],
          },
          {
            name: "Overlap-random Sharding",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [100, 100, 74, 38, 7, 0, 0, 0, 0, 0],
          },
          {
            name: "Reputation_based Sharding",
            type: "line",
            emphasis: {
              focus: "series",
            },
            data: [100, 100, 81, 44, 12, 0, 0, 0, 0, 0],
          },
        ],
      };

      option && myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initChart7() {
      var chartDom = document.getElementById("chart7");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          right: "5%",
        },
        xAxis: {
          name: "Sharding Scheme",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontSize: 15,
          },
          type: "category",
          data: [
            "Omniledger",
            "Overlap-random\nSharding",
            "Reputation_based\nSharding",
            "DRL-OSS",
          ],
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
          axisLabel: {
            interval: 0,
          },
          axisLine: {
            onZero: true, // 开启 x 轴经过 y 轴的 0 点
          },
        },
        yAxis: {
          name: "Time",
          nameRotate: "90",
          nameLocation: "center",
          nameGap: 40,
          nameTextStyle: {
            fontSize: 15,
          },
          type: "value",
          data: [0, 0.1, 3, 20], // 设置 y 轴的刻度值
          axisTick: {
            interval: 0.1, // 设置刻度之间的间隔为 1
          },
          // axisLabel: {
          //   formatter: function(value, index) {
          //     return Math.pow(10, value).toFixed(4);
          //   }
          // },
          // scale: true, // 自动调整刻度的分布密度
        },
        series: [
          {
            emphasis: {
              focus: "series",
            },
            data: [
              {
                value: 0.0105,
                itemStyle: {
                  color: "#2CA8E6",
                },
              },
              {
                value: 0.0115,
                itemStyle: {
                  color: "#E59555",
                },
              },
              {
                value: 18.4582,
                itemStyle: {
                  color: "#67E573",
                },
              },
              {
                value: 3.8349,
                itemStyle: {
                  color: "#E53B29",
                },
              },
            ],
            type: "bar",
          },
        ],
      };

      option && myChart.setOption(option);
    },

    initChart8() {
      var chartDom = document.getElementById("chart8");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          text: "Thou-IN",
          textStyle: {
            fontSize: 15,
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          right: "5%",
        },
        xAxis: {
          name: "Throughput",
          type: "category",
          boundaryGap: false,
          data: [1, 2, 3],
          nameLocation: "center",
          nameGap: 25,
          nameTextStyle: {
            fontSize: 15,
          },
        },
        yAxis: {
          name: "Interation Number",
          type: "value",
          boundaryGap: [0, "100%"],
          nameRotate: "90",
          nameLocation: "center",
          nameGap: 40,
          nameTextStyle: {
            fontSize: 15,
          },
        },
        series: [
          {
            name: "Fake Data",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "lightblue",
            },
            data: [1, 2, 3],
          },
        ],
      };

      option && myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    showSerachBody() {
      this.isSearchshow = true;
      this.isGraphshow = true;
      this.isChartshow = false;
    },
    hiddenSerachBody() {
      console.log("隐藏搜索结果");
      this.isSearchshow = false;
      this.isGraphshow = true;
      this.isChartshow = false;

      // 销毁子div
      for (var i = 1; i <= 3; i++) {
        console.log("销毁div");
        var DivName = "Child" + i;
        if (document.getElementById(DivName)) {
          var ChildDiv = document.getElementById(DivName);
          ChildDiv.remove();
        }
      }
      // 显示所有分片
      for (var i = 1; i <= 4; i++) {
        var DivName = "div" + i;
        document.getElementById(DivName).style.display = "initial";
      }
    },
    showCharts() {
      this.isSearchshow = false;
      this.isGraphshow = false;
      this.isChartshow = true;
    },
    // 表达式检查
    beforeSearch() {
      if (this.inputNumber1 == "") {
        alert("请输入操作数1");
        return false;
      }
      if (this.inputNumber2 == "") {
        alert("请输入操作数2");
        return false;
      }
      if (
        isNaN(Number(this.inputNumber1, 10)) ||
        Number(this.inputNumber1, 10) < 0
      ) {
        alert("请在操作数1处填入大于0的数字");
        return false;
      }
      if (
        isNaN(Number(this.inputNumber2, 10)) ||
        Number(this.inputNumber2, 10) < 0
      ) {
        alert("请在操作数2处填入大于0的数字");
        return false;
      }
      if (this.inputNumber1 == this.inputNumber2) {
        alert("操作数1和操作数2应不同");
        return false;
      }
      return true;
    },
    // 搜寻结果
    searchingResult() {
      // 销毁子div
      for (var i = 1; i <= 3; i++) {
        var DivName = "Child" + i;
        if (document.getElementById(DivName)) {
          var ChildDiv = document.getElementById(DivName);
          ChildDiv.remove();
        }
      }

      if (!this.beforeSearch) {
        return;
      }
      this.searchResult = []; // 使用前重新置空
      var node1 = new Array();
      var node2 = new Array();
      var nodeId1 = new Set();
      var nodeId2 = new Set();
      // 找到节点
      for (let i = 0; i < this.data.nodes.length; i++) {
        var cluster = this.data.nodes[i].cluster;
        var clusteres = cluster.split(",");
        for (let j = 0; j < clusteres.length; j++) {
          if (this.inputNumber1 == clusteres[j]) {
            node1.push(this.data.nodes[i]);
            nodeId1.add(this.data.nodes[i].id);
          } else if (this.inputNumber2 == clusteres[j]) {
            node2.push(this.data.nodes[i]);
            nodeId2.add(this.data.nodes[i].id);
          } else {
            // nothing to do
          }
        }
      }
      // 求交集
      const intersection = (a, b) => {
        const s = new Set(b);
        return [...new Set(a)].filter((x) => s.has(x));
      };
      var intertNode = intersection(node1, node2);
      // console.log("node1 is",node1);
      // console.log("node2 is",node2);
      // console.log("intertNode is",intertNode);
      var intertNodeId = new Set();
      for (let i = 0; i < intertNode.length; i++) {
        intertNodeId.add(intertNode[i].id);
      }
      // 找到边
      var edge1 = new Array();
      var edge2 = new Array();
      var intertEdge = new Array();
      for (let i = 0; i < this.data.edges.length; i++) {
        if (
          nodeId1.has(this.data.edges[i].source) &&
          nodeId1.has(this.data.edges[i].target)
        ) {
          edge1.push(this.data.edges[i]);
        }
        if (
          nodeId2.has(this.data.edges[i].source) &&
          nodeId2.has(this.data.edges[i].target)
        ) {
          edge2.push(this.data.edges[i]);
        }
        if (
          intertNodeId.has(this.data.edges[i].source) &&
          intertNodeId.has(this.data.edges[i].target)
        ) {
          intertEdge.push(this.data.edges[i]);
        }
      }
      // console.log(edge1);
      // console.log(edge2);
      // console.log(intertEdge);
      this.leftGraph = {
        node1,
        edge1,
      };
      this.intertGraph = {
        intertNode,
        intertEdge,
      };
      this.rightGraph = {
        node2,
        edge2,
      };
      console.log(this.leftGraph, this.intertGraph, this.rightGraph);
      //  return {leftGraph,intertGraph,rightGraph};

      //处理图片
      for (var i = 1; i <= 4; i++) {
        var DivName = "div" + i;
        document.getElementById(DivName).style.display = "none";
      }

      // 数据变换
      var leftGraph = {
        nodes: [],
        edges: [],
      };

      leftGraph.nodes = clone(this.leftGraph.node1);
      // leftGraph.nodes = this.leftGraph.node1;
      leftGraph.edges = this.leftGraph.edge1;
      for (var i = 0; i < leftGraph.nodes.length; i++) {
        leftGraph.nodes[i].style.fill = this.colors[1];
        leftGraph.nodes[i].style.stroke = this.colors[1];
      }

      var rightGarph = {
        nodes: [],
        edges: [],
      };
      rightGarph.nodes = clone(this.rightGraph.node2);
      rightGarph.edges = this.rightGraph.edge2;
      for (var i = 0; i < rightGarph.nodes.length; i++) {
        rightGarph.nodes[i].style.fill = this.colors[2];
        rightGarph.nodes[i].style.stroke = this.colors[2];
      }

      var middleGarph = {
        nodes: [],
        edges: [],
      };
      middleGarph.nodes = this.intertGraph.intertNode;
      middleGarph.edges = this.intertGraph.intertEdge;
      for (var i = 0; i < middleGarph.nodes.length; i++) {
        middleGarph.nodes[i].style.fill = this.colors[5];
        middleGarph.nodes[i].style.stroke = this.colors[5];
      }

      // 创建三个子div
      var Father = document.getElementById("NodesGraph");
      for (var i = 1; i <= 3; i++) {
        var NewDiv = document.createElement("div");
        // NewDiv.style.display = 'inline-block';
        NewDiv.style.border = "1px dashed black";
        NewDiv.id = "Child" + i;
        if (NewDiv.id == "Child1") {
          // NewDiv.style.float = 'left';
          var h2 = document.createElement("h2");
          h2.textContent = `分片${this.inputNumber1}拓扑图`;
          h2.style.textAlign = "center";
          NewDiv.appendChild(h2);
        } else if (NewDiv.id == "Child2") {
          // NewDiv.style.marginLeft= '4.5vw';
          var h2 = document.createElement("h2");
          h2.textContent = `重叠部分拓扑图`;
          h2.style.textAlign = "center";
          NewDiv.appendChild(h2);
        } else if (NewDiv.id == "Child3") {
          // NewDiv.style.float = 'right';
          var h2 = document.createElement("h2");
          h2.textContent = `分片${this.inputNumber2}拓扑图`;
          h2.style.textAlign = "center";
          NewDiv.appendChild(h2);
        }
        Father.appendChild(NewDiv);
      }

      var DivWidth = document.getElementById("Child1").clientWidth;
      var DivHeight = document.getElementById("Child1").clientHeight - 36;

      // 生成左侧图片
      let Graph_Left = new G6.Graph({
        container: "Child1",
        width: DivWidth,
        height: DivHeight,
        fitCenter: true,
        layout: {
          type: "force2",
          // animate: true,
          maxSpeed: 100,
          linkDistance: 50,
          clustering: true,
          nodeClusterBy: "cluster",
          clusterNodeStrength: 300,
        },
        defaultEdge: {
          type: "line",
          style: {
            stroke: "#A3B1BF",
            endArrow: {
              // 设置终点箭头
              path: G6.Arrow.vee(8, 6, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
              d: 0,
              fill: "#000",
            },
          },
        },
        modes: {
          default: ["zoom-canvas", "drag-canvas"],
        },
      });
      Graph_Left.data(leftGraph);
      Graph_Left.render();

      // 生成中间图片
      let Graph_Middle = new G6.Graph({
        container: "Child2",
        width: DivWidth,
        height: DivHeight,
        fitCenter: true,
        layout: {
          type: "force2",
          // animate: true,
          maxSpeed: 100,
          linkDistance: 50,
          clustering: true,
          nodeClusterBy: "cluster",
          clusterNodeStrength: 300,
        },
        defaultEdge: {
          type: "line",
          style: {
            stroke: "#A3B1BF",
            endArrow: {
              // 设置终点箭头
              path: G6.Arrow.vee(8, 6, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
              d: 0,
              fill: "#000",
            },
          },
        },
        modes: {
          default: ["zoom-canvas", "drag-canvas"],
        },
      });
      Graph_Middle.data(middleGarph);
      Graph_Middle.render();

      // 生成右边图片
      let Graph_Right = new G6.Graph({
        container: "Child3",
        width: DivWidth,
        height: DivHeight,
        fitCenter: true,
        layout: {
          type: "force2",
          // animate: true,
          maxSpeed: 100,
          linkDistance: 50,
          clustering: true,
          nodeClusterBy: "cluster",
          clusterNodeStrength: 300,
        },
        defaultEdge: {
          type: "line",
          style: {
            stroke: "#A3B1BF",
            endArrow: {
              // 设置终点箭头
              path: G6.Arrow.vee(8, 6, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
              d: 0,
              fill: "#000",
            },
          },
        },
        modes: {
          default: ["zoom-canvas", "drag-canvas"],
        },
      });
      Graph_Right.data(rightGarph);
      Graph_Right.render();
    },
    // 一键清空
    deleteSearch() {
      this.inputNumber1 = "";
      this.inputNumber2 = "";
    },
    Generate() {
      let nodes = this.data.nodes;
      let clusterMap = new Map();
      let clusterId = 0;
      let that = this;
      nodes.forEach(function (node) {
        if (node.cluster && clusterMap.get(node.cluster) === undefined) {
          clusterMap.set(node.cluster, clusterId);
          clusterId++;
        }
        let cid = clusterMap.get(node.cluster);
        if (!node.style) {
          node.style = {};
        }
      });

      for (var i = 1; i <= 4; i++) {
        let ShardData = {
          nodes: [],
          edges: [],
        };
        for (var j = 0; j < that.data.nodes.length; j++) {
          //挑选出对应的节点
          let ShardList = that.data.nodes[j].cluster.split(",");
          if (ShardList.indexOf(i.toString()) != -1) {
            ShardData.nodes.push(that.data.nodes[j]);
          }
        }

        function EdgeinShard(x) {
          //判断边的两个端点是否在同一个分区的函数
          for (var k = 0; k < ShardData.nodes.length; k++) {
            if (ShardData.nodes[k].id == x) {
              return true;
            }
          }
          return false;
        }

        for (var j = 0; j < that.data.edges.length; j++) {
          //挑选出对应的边
          if (
            EdgeinShard(that.data.edges[j].source) &&
            EdgeinShard(that.data.edges[j].target)
          ) {
            ShardData.edges.push(that.data.edges[j]);
          }
        }
        for (var k = 0; k < ShardData.nodes.length; k++) {
          //为节点填充颜色
          ShardData.nodes[k].style.fill = that.colors[i % that.colors.length];
          ShardData.nodes[k].style.stroke =
            that.strokes[i % that.strokes.length];
        }

        var DivWidth = document.getElementById("div1").clientWidth;
        var DivHeight = document.getElementById("div1").clientHeight - 36;
        // var h2Height = document.querySelector('#div1 h2');
        // DivHeight = DivHeight - h2Height.clientWidth;
        // console.log(h2Height.clientWidth);
        let graph = new G6.Graph({
          container: "div" + i,
          width: DivWidth,
          height: DivHeight,
          fitCenter: true,
          layout: {
            type: "force2",
            // animate: true,
            maxSpeed: 100,
            linkDistance: 50,
            clustering: true,
            nodeClusterBy: "cluster",
            clusterNodeStrength: 300,
          },
          defaultEdge: {
            type: "line",
            style: {
              stroke: "#A3B1BF",
              endArrow: {
                // 设置终点箭头
                path: G6.Arrow.vee(8, 6, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
                d: 0,
                fill: "#000",
              },
            },
          },
          modes: {
            default: ["zoom-canvas", "drag-canvas"],
          },
        });
        graph.data(ShardData);
        graph.render();
      }
    },
    handletabclick(tab, event) {
      console.log(tab, event);
      console.log(tab.$options.propsData.name);
      switch (tab.$options.propsData.name) {
        case "first":
          this.hiddenSerachBody();
          break;
        case "second":
          this.showSerachBody();
          break;
        case "third":
          this.showCharts();
          break;
      }
    },
  },
};
</script>

<style scoped>
.wraper {
  width: 100%;
  background-color: white;
  border-radius: 20px;
  height: auto;
  margin: 2vh 0.6vw;
  padding: 1vw;
}

/****************** 搜索框头部 ***********************/
.wraper .serachHeader {
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.wraper .serachHeader .searchTitle {
  user-select: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 4px;
  font-size: 16px;
  /* 尝试一下动画过渡效果 */
  transition-property: background-color;
  transition-duration: 500ms;
  transition-delay: 0ms;
  transition-timing-function: ease;
}

/****************** 默认显示区块链分片拓扑按钮 ***********************/
.wraper .serachHeader .searchTitle:first-child {
  background-color: #6c9ef5;
}

/****************** 搜索框身体 ***********************/
.wraper .searchBox {
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 1fr 5fr;
  grid-column-gap: 5px;
  grid-template-rows: 8vh;
  grid-template-areas: "First Logic Second";
  margin-top: 1vh;
  border-top: 1px solid #eee;
}

.wraper .searchBox .searchFirst {
  grid-area: First;
}

.wraper .searchBox .searchLogic {
  grid-area: Logic;
}

.wraper .searchBox .searchSecond {
  grid-area: Second;
}

/* ------------------------   第一个grid比较属性      ------------------------------ */
.wraper .searchBox .searchFirst {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.wraper .searchBox .searchFirst .compareAttribute {
  flex: 1;
}

.wraper .searchBox .searchFirst .compareAttribute p {
  text-align: center;
  font-weight: 300;
  font-size: 18px;
}

/* ------------------------   第一个grid比较符      ------------------------------ */
.wraper .searchBox .searchFirst .compareSign {
  flex: 1;
}

.wraper .searchBox .searchFirst .compareSign p {
  text-align: center;
  font-weight: 300;
  font-size: 18px;
}

/* ------------------------  第一个grid操作符      ------------------------------ */
.wraper .searchBox .searchFirst .compareInput {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wraper .searchBox .searchFirst .compareInput p {
  font-size: 18px;
  font-weight: 300;
  margin-right: 1vw;
}

/* ------------------------   逻辑符      ------------------------------ */
.wraper .searchBox .searchLogic {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wraper .searchBox .searchLogic p {
  font-weight: 300;
  font-size: 18px;
}

/* ------------------------   第二个grid比较属性      ------------------------------ */
.wraper .searchBox .searchSecond {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.wraper .searchBox .searchSecond .compareAttribute {
  flex: 1;
}

.wraper .searchBox .searchSecond .compareAttribute p {
  text-align: center;
  font-weight: 300;
  font-size: 18px;
}

/* ------------------------   第二个grid比较符      ------------------------------ */
.wraper .searchBox .searchSecond .compareSign {
  flex: 1;
}

.wraper .searchBox .searchSecond .compareSign p {
  text-align: center;
  font-weight: 300;
  font-size: 18px;
}

/* ------------------------   第二个grid操作符      ------------------------------ */
.wraper .searchBox .searchSecond .compareInput {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wraper .searchBox .searchSecond .compareInput p {
  font-size: 18px;
  font-weight: 300;
  margin-right: 1vw;
}

/* ------------------------- 搜索框Footer  -------------------------------- */
.wraper .serachFooter {
  width: 100%;
  height: 8vh;
  text-align: center;
}

/* ------------------------   切换动画效果      ------------------------------ */
.searchTransition-enter-active {
  transition: opacity 0.5s ease;
}

.searchTransition-enter {
  opacity: 0;
}

/* -----------------------  gird布局 ------------------------------------- */
.wraper .NodesShard {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: minmax(300px, 1fr);
  height: 100%;
  grid-gap: 5px;
}

.wraper .Charts {
  display: grid;
  grid-template-columns: 50% 50%;
  /* grid-template-rows: 50% 50%; */
  height: 100%;
  grid-gap: 5px;
  justify-content: space-between;
  padding: 20px 40px;
}
</style>
