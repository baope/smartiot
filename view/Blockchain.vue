

<template>
  <div class="blockchainview">
    <div class="block">
      <div class="summary-table0">
        <div>
          <div id="test-chart" style="height: 300px"></div>
        </div>
      </div>
      <div class="summary-table2">
        <h3>当前区块链节点状态</h3>
        <table class="runapps">
          <thead>
            <tr class="tr">
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, _) in peerstatus" :key="_">
              <td>{{ item.Peername }}</td>
              <td>
                <img
                  class="peerstatus"
                  v-if="item.Status == 'on'"
                  :src="onImgUrl"
                />
                <img class="peerstatus" v-else :src="offImgUrl" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="view-head1">
      <div class="search-input">
        <i class="fas fa-search" />
        <input
          placeholder="请输入传感器ID"
          type="text"
          v-model="searchId"
          @change="handleInputChange"
        />
      </div>
    </div>
    <div class="summary-table1">
      <h3>链上传感器节点最新状态</h3>
      <table class="runapps">
        <thead>
          <tr class="tr">
            <th>SensorID</th>
            <th>SensorArea</th>
            <th>SensorStatus</th>
            <th>DataTimestamp</th>
            <th>DataType</th>
            <th>DataInfo</th>
            <th>history</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tr" v-for="(item, _) in showBlockChain" :key="_">
            <td>{{ item.Respinfo.SensorId }}</td>
            <td>{{ item.Respinfo.SensorArea }}</td>
            <td>{{ item.Respinfo.SensorStatus }}</td>
            <td>{{ item.Respinfo.SensorData.DataTimestamp }}</td>
            <td>{{ item.Respinfo.SensorData.DataType }}</td>
            <td>{{ item.Respinfo.SensorData.DataInfo }}</td>
            <td>
              <Button type="text" @click="queryHistory(item.Respinfo.SensorId)">
                查询历史
              </Button>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal title="节点历史记录" v-model="dialogVisible" width="70%">
        <Spin fix v-if="queryLoading">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
        <div class="summary-table1">
          <table class="runapps">
            <thead>
              <tr class="tr">
                <th>SensorID</th>
                <th>SensorArea</th>
                <th>SensorStatus</th>
                <th>DataTimestamp</th>
                <th>DataType</th>
                <th>DataInfo</th>
              </tr>
            </thead>
            <tbody>
              <tr class="tr" v-for="(item, _) in historyList" :key="_">
                <td>{{ item.SensorId }}</td>
                <td>{{ item.SensorArea }}</td>
                <td>{{ item.SensorStatus }}</td>
                <td>{{ item.SensorData.DataTimestamp }}</td>
                <td>{{ item.SensorData.DataType }}</td>
                <td>{{ item.SensorData.DataInfo }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <Button type="primary" @click="dialogVisible = false">确 定</Button>
        </span>
      </Modal>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      dialogVisible: false,
      cloop: false,
      timep: 500,
      blockChainOverview: [],
      peerstatus: [],
      showBlockChain: [],
      queryLoading: false,
      historyList: [],
      searchId: "",
      onImgUrl: require("../assets/ON.png"),
      offImgUrl: require("../assets/off.png"),
      chart: undefined,
      basictimespan: 1.2,
      timer: null,
      valuezz: 0,
      blockname: 0,
      cani: true,
      frontsizez: 20,
      blockxoffset: 780,
      blockyoffset: 1012,
      blockxspan: 125,
      blockyspan: -530,
      chainxoffset: 842,
      chainyoffset: 1002,
      chainxspan: 125,
      chainyspan: -525,
      blocksize: [60, 60],
    };
  },
  mounted() {
    // 等同于onload,页面加载完成后执行该函数
    this.queryAll();
    this.queryStatus();
    this.chart = this.$echarts.init(document.getElementById("test-chart"));
    this.setChartOption();
    this.timer = setInterval(this.get, 8000);
  },
  methods: {
    get() {
      this.valuezz++;
      console.log(this.valuezz);
      this.cani = false;
      this.chart.clear();
      this.setChartOption();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    // {
    //   Commond: "queryall",
    //   SensorID: "tanklab01",
    //   SensorArea: "tju-55-331",
    //   SensorStatus: "on",
    //   SensorData: {
    //     DataTimestamp: "20201023-16:20",
    //     DataType: "temperture",
    //     DataInfo: "11",
    //   },
    // }
    setChartOption() {
      const option = {
        animation: this.cani,
        title: {
          text: "   " + "数据上链流程",
          textStyle: {
            fontSize: 20,
            fontWeight: "bolder",
          },
        },

        tooltip: {
          formatter: "{b}",
        },
        animationDurationUpdate: 0,

        xAxis: {
          show: false,
          type: "value",
          min: 0,
          max: 1000,
        },
        yAxis: {
          show: false,
          type: "value",
          min: 0,
          max: 1000,
        },
        series: [
          {
            type: "graph",
            layout: "none",
            coordinateSystem: "cartesian2d",

            label: {
              show: true,
              position: "bottom",
            },

            data: [
              {
                name: "chain",
                symbolSize: [35, 15.46],
                symbol: "image://" + require("../assets/chain1.png"),
                label: {
                  show: false,
                },
                // x: 300,
                // y: 300
                value: [this.chainxoffset, this.chainyoffset],
              },
              {
                name: "chain1",
                symbolSize: [35, 15.46],
                symbol: "image://" + require("../assets/chain1.png"),
                label: {
                  show: false,
                },
                // x: 300,
                // y: 300
                value: [this.chainxoffset + this.chainxspan, this.chainyoffset],
              },
              {
                name: "chain2",
                symbolSize: [15.46, 35],
                symbol: "image://" + require("../assets/chain2.png"),
                label: {
                  show: false,
                },
                // x: 300,
                // y: 300
                value: [
                  this.chainxoffset + this.chainxspan + 63,
                  this.chainyoffset - 250,
                ],
              },
              {
                name: "chain3",
                symbolSize: [35, 15.46],
                symbol: "image://" + require("../assets/chain1.png"),
                label: {
                  show: false,
                },
                // x: 300,
                // y: 300
                value: [
                  this.chainxoffset + this.chainxspan,
                  this.chainyoffset + this.chainyspan,
                ],
              },
              {
                name: "chain4",
                symbolSize: [35, 15.46],
                symbol: "image://" + require("../assets/chain1.png"),
                label: {
                  show: false,
                },
                // x: 300,
                // y: 300
                value: [this.chainxoffset, this.chainyoffset + this.chainyspan],
              },
              {
                name: "chain5",
                symbolSize: [15.46, 35],
                symbol: "image://" + require("../assets/chain2.png"),
                label: {
                  show: false,
                },
                // x: 300,
                // y: 300
                value: [
                  this.chainxoffset - 63,
                  this.chainyoffset + 1.5 * this.chainyspan,
                ],
              },
              {
                name: "chain6",
                symbolSize: [35, 15.46],
                symbol: "image://" + require("../assets/chain1.png"),
                label: {
                  show: false,
                },
                // x: 300,
                // y: 300
                value: [
                  this.chainxoffset,
                  this.chainyoffset + 2 * this.chainyspan,
                ],
              },
              {
                name: "chain7",
                symbolSize: [35, 15.46],
                symbol: "image://" + require("../assets/chain1.png"),
                label: {
                  show: false,
                },
                // x: 300,
                // y: 300
                value: [
                  this.chainxoffset + this.chainxspan,
                  this.chainyoffset + 2 * this.chainyspan,
                ],
              },

              {
                name: "Sensor",
                symbolSize: [170, 210],
                symbol: "image://" + require("../assets/sensornew.png"),
                label: {
                  show: false,
                  position: "bottom",
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                },
                // x: 300,
                // y: 300
                value: [30, 470],
              },
              {
                name: "Orderer",
                symbolSize: [100, 85],
                symbol: "image://" + require("../assets/orderernew.png"),
                label: {
                  position: "bottom",
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                },
                // x: 955,
                // y: 400
                value: [550, 19],
              },
              {
                name: "Peer(Comitter)",
                symbolSize: [90, 90],
                symbol: "image://" + require("../assets/Peer(Comitter)new.png"),
                // x: 1150,
                // y: 100
                label: {
                  position: "top",
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                },
                value: [655, 900],
              },
              {
                name: "Peer(Endorser)",
                symbolSize: [90, 90],
                symbol: "image://" + require("../assets/Peer(Endorser)new.png"),
                label: {
                  position: "top",
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                },
                // x: 750,
                // y: 100
                value: [445, 900],
              },
              {
                name: "SDK",
                symbolSize: [95, 113.4],
                symbol: "image://" + require("../assets/sdk1.png"),
                label: {
                  show: false,
                  position: "bottom",
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                },
                // x: 550,
                // y: 300
                value: [263, 450],
              },
              {
                name: this.valuezz + 8 + "",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/block.png"),
                // x: 1150,
                // y: 100
                label: {
                  show: true,
                  fontSize: this.frontsizez,
                  color: "rgba(55,155,255,1)",
                  position: "top",
                  fontWeight: "bolder",
                },
                value: [this.blockxoffset, this.blockyoffset],
              },
              {
                name: this.valuezz + 7 + "",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/block.png"),
                // x: 1150,
                // y: 100
                label: {
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                  color: "rgba(55,155,255,1)",
                  position: "top",
                },
                value: [this.blockxoffset + this.blockxspan, this.blockyoffset],
              },
              {
                name: this.valuezz + 6 + "",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/block.png"),
                label: {
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                  color: "rgba(55,155,255,1)",
                  position: "top",
                },
                // x: 1150,
                // y: 100
                value: [
                  this.blockxoffset + 2 * this.blockxspan,
                  this.blockyoffset,
                ],
              },
              {
                name: this.valuezz + 5 + "",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/block.png"),
                label: {
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                  color: "rgba(55,155,255,1)",
                },
                // x: 1150,
                // y: 100
                value: [
                  this.blockxoffset + 2 * this.blockxspan,
                  this.blockyoffset + this.blockyspan,
                ],
              },
              {
                name: this.valuezz + 4 + "",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/block.png"),
                label: {
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                  color: "rgba(55,155,255,1)",
                },
                // x: 1150,
                // y: 100
                value: [
                  this.blockxoffset + this.blockxspan,
                  this.blockyoffset + this.blockyspan,
                ],
              },
              {
                name: this.valuezz + 3 + "",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/block.png"),
                label: {
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                  color: "rgba(55,155,255,1)",
                  position: "top",
                },
                // x: 1150,
                // y: 100
                value: [this.blockxoffset, this.blockyoffset + this.blockyspan],
              },
              {
                name: this.valuezz + 2 + "",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/block.png"),
                label: {
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                  color: "rgba(55,155,255,1)",
                },
                // x: 1150,
                // y: 100
                value: [
                  this.blockxoffset,
                  this.blockyoffset + 2 * this.blockyspan,
                ],
              },
              {
                name: this.valuezz + 1 + "",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/block.png"),
                label: {
                  show: true,
                  fontWeight: "bolder",
                  fontSize: this.frontsizez,
                  color: "rgba(55,155,255,1)",
                },
                // x: 1150,
                // y: 100
                value: [
                  this.blockxoffset + this.blockxspan,
                  this.blockyoffset + 2 * this.blockyspan,
                ],
              },
              {
                name: "shengluehao",
                symbolSize: this.blocksize,
                symbol: "image://" + require("../assets/shengluehao.png"),
                label: {
                  show: false,
                },
                // x: 1150,
                // y: 100
                value: [
                  this.blockxoffset + 2 * this.blockxspan,
                  this.blockyoffset + 2 * this.blockyspan - 20,
                ],
              },
            ],
          },
          {
            name: "调用接口",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              loop: this.cloop,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.timep,
              symbol: "image://" + require("../assets/tx1.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: [66.5, 51],
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 3,
              },
            },
            data: [[{ coord: [140, 430] }, { coord: [205, 430] }]],
          },
          {
            name: "提交提案",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              period: this.basictimespan,
              delay: this.basictimespan * 1000 + this.timep,
              loop: this.cloop,
              trailLength: 0,
              symbol: "image://" + require("../assets/tx11.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: [66.5, 51],
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 3,
              },
            },
            data: [[{ coord: [315, 720] }, { coord: [380, 890] }]],
          },
          {
            name: "汇总签名",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 2000 + this.timep,
              loop: this.cloop,
              trailLength: 0,
              symbol: "image://" + require("../assets/correct11.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: [68, 49],
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 3,
              },
            },
            data: [[{ coord: [390, 665] }, { coord: [325, 495] }]],
          },
          {
            name: "发送交易请求",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 3000 + this.timep,
              loop: this.cloop,
              symbol: "image://" + require("../assets/correct1.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: [68, 49],
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 3,
              },
            },
            data: [[{ coord: [340, 300] }, { coord: [475, 50] }]],
          },
          {
            name: "发送交易区块",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 4000 + this.timep,
              loop: this.cloop,
              symbol: "image://" + require("../assets/blockz1.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: [70, 70],
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 3,
              },
            },
            data: [[{ coord: [530, 300] }, { coord: [480, 590] }]],
          },
          {
            name: "发送交易区块",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 4000 + this.timep,
              loop: this.cloop,
              symbol: "image://" + require("../assets/blockz1.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: [70, 70],
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 3,
              },
            },
            data: [[{ coord: [565, 300] }, { coord: [615, 590] }]],
          },
          {
            name: "blockchain",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 5000 + this.timep,
              loop: this.cloop,
              symbol: "image://" + require("../assets/block3.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: this.blocksize,
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 0,
              },
            },
            data: [
              [
                { coord: [this.blockxoffset, this.blockyoffset] },
                {
                  coord: [
                    this.blockxoffset + this.blockxspan,
                    this.blockyoffset,
                  ],
                },
              ],
              [
                {
                  coord: [
                    this.blockxoffset + this.blockxspan,
                    this.blockyoffset,
                  ],
                },
                {
                  coord: [
                    this.blockxoffset + 2 * this.blockxspan,
                    this.blockyoffset,
                  ],
                },
              ],
            ],
          },
          {
            name: "blockchain",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 5000 + this.timep,
              loop: this.cloop,
              symbol: "image://" + require("../assets/block2.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: this.blocksize,
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 0,
              },
            },
            data: [
              [
                {
                  coord: [
                    this.blockxoffset + 2 * this.blockxspan,
                    this.blockyoffset,
                  ],
                },
                {
                  coord: [
                    this.blockxoffset + 2 * this.blockxspan,
                    this.blockyoffset + this.blockyspan,
                  ],
                },
              ],
            ],
          },
          {
            name: "blockchain",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 5000 + this.timep,
              loop: this.cloop,
              symbol: "image://" + require("../assets/block1.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: this.blocksize,
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 0,
              },
            },
            data: [
              [
                {
                  coord: [
                    this.blockxoffset + 2 * this.blockxspan,
                    this.blockyoffset + this.blockyspan,
                  ],
                },
                {
                  coord: [
                    this.blockxoffset + this.blockxspan,
                    this.blockyoffset + this.blockyspan,
                  ],
                },
              ],
              [
                {
                  coord: [
                    this.blockxoffset + this.blockxspan,
                    this.blockyoffset + this.blockyspan,
                  ],
                },
                {
                  coord: [
                    this.blockxoffset,
                    this.blockyoffset + this.blockyspan,
                  ],
                },
              ],
            ],
          },
          {
            name: "blockchain",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 5000 + this.timep,
              loop: this.cloop,
              symbol: "image://" + require("../assets/block2.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: this.blocksize,
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 0,
              },
            },
            data: [
              [
                {
                  coord: [
                    this.blockxoffset,
                    this.blockyoffset + this.blockyspan,
                  ],
                },
                {
                  coord: [
                    this.blockxoffset,
                    this.blockyoffset + 2 * this.blockyspan,
                  ],
                },
              ],
            ],
          },
          {
            name: "blockchain",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            effect: {
              show: true,
              smooth: false,
              trailLength: 0,
              period: this.basictimespan,
              delay: this.basictimespan * 5000 + this.timep,
              loop: this.cloop,
              symbol: "image://" + require("../assets/block3.png"),
              color: "rgba(55,155,255,0.5)",
              symbolSize: this.blocksize,
            },
            lineStyle: {
              normal: {
                curveness: 0,
                width: 0,
              },
            },
            data: [
              [
                {
                  coord: [
                    this.blockxoffset,
                    this.blockyoffset + 2 * this.blockyspan,
                  ],
                },
                {
                  coord: [
                    this.blockxoffset + this.blockxspan,
                    this.blockyoffset + 2 * this.blockyspan,
                  ],
                },
              ],
              [
                {
                  coord: [
                    this.blockxoffset + this.blockxspan,
                    this.blockyoffset + 2 * this.blockyspan,
                  ],
                },
                {
                  coord: [
                    this.blockxoffset + 2 * this.blockxspan - 50,
                    this.blockyoffset + 2 * this.blockyspan,
                  ],
                },
              ],
            ],
          },
        ],
      };
      this.chart.setOption(option, true);
    },
    handleInputChange() {
      if (this.searchId.length == 0) {
        this.showBlockChain = [...this.blockChainOverview];
      } else {
        const showBlockChain = [];
        this.blockChainOverview.map((item) => {
          if (item.Respinfo.SensorId.indexOf(this.searchId) > -1) {
            showBlockChain.push(item);
          }
        });
        this.showBlockChain = showBlockChain;
      }
    },
    queee() {
      //  console.log(this.cloop);
      this.chart.clear();
      this.setChartOption();
      //this.chart.resize()
    },
    queryAll() {
      this.$axios
        .post("/blockchain/smartiot", {
          Commond: "queryall",
        })
        .then((res) => {
          this.blockChainOverview = res.data;
          this.showBlockChain = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    queryStatus() {
      this.$axios
        .post("/blockchain/smartiot", {
          Commond: "querystatus",
        })
        .then((res) => {
          this.peerstatus = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    queryHistory(SensorId) {
      this.historyList = [];
      this.dialogVisible = true;
      this.queryLoading = true;
      this.$axios
        .post("/blockchain/smartiot", {
          Commond: "queryhistory",
          SensorId,
        })
        .then((res) => {
          this.historyList = res.data.Respinfo || [];
          this.historyList.reverse();
          this.queryLoading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.blockchainview {
  margin-left: 1%;
  margin-top: 0.5%;
  width: 80%;
  display: flex;
  flex-direction: column;
  table {
    td {
      text-align: center;
    }
  }
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.block {
  display: flex;
  flex-direction: row;
}
.view-head1 {
  margin-top: 10px;
  line-height: 40px;
  padding: 0 30px;
  box-sizing: border-box;
  line-height: 60px;
  height: 60px;
  width: 100%;
  position: relative;
  background: white;
  // box-shadow: 5px 1px 5px rgba(0,0,0,0.1);

  .search-input {
    background: white;
    padding: 0px 20px;
    box-sizing: border-box;
    display: inline-block;
    border-radius: 30px;
    input {
      margin-left: 10px;
      border: none;
      background: transparent;
      outline: none;
      font-size: 18px;
    }
  }
}
.summary-table0 {
  width: 77%;
  padding-top: 15px;
  padding-left: 0px;
  background: white;
  // border-radius: 15px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  h3 {
    margin-bottom: 10px;
  }
  table {
    border: 1px solid #ebeef5;
    border-left: 0;
    border-collapse: separate;
    width: 100%;
    tbody > tr:nth-child(odd) > td {
      background-color: #fafafa;
    }
  }
}
.summary-table1 {
  padding: 20px 50px;
  background: white;
  // border-radius: 15px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  h3 {
    margin-bottom: 10px;
  }
  table {
    border: 1px solid #ebeef5;
    border-left: 0;
    text-align: center;
    border-collapse: separate;
    width: 100%;
    tbody > tr:nth-child(odd) > td {
      background-color: #fafafa;
    }
  }
}
.summary-table2 {
  margin-left: 1%;
  width: 23%;
  padding: 15px;
  background: white;
  // border-radius: 15px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  h3 {
    margin-bottom: 10px;
  }
  table {
    font-size: 25px;
    border: 1px solid #ebeef5;
    border-left: 0;
    border-collapse: separate;
    width: 100%;
    tbody > tr:nth-child(odd) > td {
      background-color: #fafafa;
    }
    img {
      top: 5.7px;
      margin: 0 auto;
      width: 35px;
      height: 35px;
      position: relative;
    }
  }
}
</style>


<style lang="less">
#blockchain-img {
  margin-left: 4.5%;
  width: 40%;
  height: 40%;
}
.peerstatus {
}
#bt {
  position: relative;
  color: white;
  font-size: 30px;
  width: 40%;
  top: 4px;
  margin: 0 auto;
  text-align: center;
}
#sideBar1 {
  width: 50%;
  height: 50%;
  margin-top: 15px;
}
.searchUl .list01 select {
  width: 100px;
}
.searchUl .list02 input {
  width: 300px;
}
.searchUl .list03 input {
  width: 100px;
  padding: 2px 15px;
  display: inline-block;
  color: #fff;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #0d6d9b;
}

ul {
  list-style: none;
}
:focus {
  outline: 0;
}
a:link {
  color: #696c73;
  text-decoration: none;
}

a:visited {
  color: #696c73;
  text-decoration: none;
}

a:hover {
  color: #696c73;
  text-decoration: underline;
}

a:active {
  color: #696c73;
  text-decoration: underline;
}

iframe#car {
  min-height: 685px;
  height: 100%;
}
#conts {
  width: 100%;
}
#f2 {
  margin: 0 auto;
  width: 453px;
  font-size: 17px;
  color: white;
  top: 30px;
  position: relative;
}
#chaxun {
}
#bt1 {
  padding: 2px 0px;
  font-size: 20px;
}
</style>

