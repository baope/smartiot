<template>
  <div class="pow-container">
    <div class="pow">
      <div class="pow-setting">
        <div class="title">仿真设置</div>
        <div class="setting-info">
          <div><span>步长:</span><el-input v-model="powStep"></el-input></div>
          <div style="padding-left: 10px">
            <span>仿真时间:</span>
            <el-input v-model="simultaionTime"></el-input>
          </div>
          <el-button class="setting-btn" @click="changeSetting">仿真</el-button>
        </div>
      </div>
      <div class="node-config">
        <div class="config-header">
          <div class="config-header-left title">节点配置选择</div>
          <div class="config-header-btns"></div>
        </div>

        <div class="config-list">
          <el-table
            ref="multipleTable"
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              ).length == 0
                ? tableData.slice(
                    (currentPage - 2) * pageSize,
                    (currentPage - 1) * pageSize
                  )
                : tableData.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )
            "
            highlight-current-row
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            :max-height="tableHeight"
            @current-change="handleCurrentChange"
            style="width: 100%"
            class="order"
          >
            <el-table-column
              prop="ConfigName"
              label="配置名"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="Ctype"
              :show-overflow-tooltip="true"
              label="种类"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="NodeNum" label="节点数量" align="center">
            </el-table-column>
            <el-table-column
              prop="Blocksize"
              label="区块大小(KB)"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="ConfirmSpeed"
              label="确认速度(区块数)"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="Step" label="仿真步长" align="center">
            </el-table-column>
            <el-table-column prop="SyncRate" label="区块同步率" align="center">
            </el-table-column>
            <el-table-column
              prop="TransactionPerBlock"
              label="单位区块交易数"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="operate"
              label="操作"
              width="270"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="ChangeGraph(scope.$index, scope.row.networkId)"
                  >切换</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  round
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row.networkId)"
                ></el-button>
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-download"
                  round
                  style="margin-top: 0.5vw"
                  @click="exportData(scope.$index)"
                >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-box flex-center">
            <el-pagination
              align="center"
              @size-change="handleSizeChange"
              @current-change="ChangePage"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            >
            </el-pagination>
          </div>
        </div>
      </div>

      <div class="pow-performance">
        <div class="title">性能指标</div>
        <div class="pow-performance-box">
          <div class="performance-item item">
            <div class="performance-title">平均吞吐量</div>
            <div class="performance-content">
              <el-input
                disabled
                v-model="performanceInfo.thoughtPer"
              ></el-input>
            </div>
          </div>
          <div class="performance-item item">
            <div class="performance-title">总分叉次数</div>
            <div class="performance-content">
              <el-input
                disabled
                v-model="performanceInfo.ForkTimesDealSum"
              ></el-input>
            </div>
          </div>
          <div class="performance-item item">
            <div class="performance-title">已被确认区块</div>
            <div class="performance-content">
              <el-input
                disabled
                v-model="performanceInfo.blockHeight"
              ></el-input>
            </div>
          </div>
          <div class="performance-item item">
            <div class="performance-title">峰值吞吐量</div>
            <div class="performance-content">
              <el-input disabled v-model="performanceInfo.TpsPeak"></el-input>
            </div>
          </div>
          <div class="performance-item item">
            <div class="performance-title">分叉率</div>
            <div class="performance-content">
              <el-input disabled v-model="performanceInfo.forkRate"></el-input>
            </div>
          </div>
          <div class="performance-item item">
            <div class="performance-title">最新区块</div>
            <div class="performance-content">
              <el-input
                disabled
                v-model="performanceInfo.HeightThroughput"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="pow-graphs">
        <div class="pow-graph-01 graph-box">
          <div class="title" style="font-size: 1.2vw; font-weight: 700">
            吞吐量变化曲线
          </div>
          <div id="pow-01" class="pow-graph"></div>
        </div>
        <div class="pow-graph-02 graph-box">
          <div class="title" style="font-size: 1.2vw; font-weight: 700">
            确认速度变化曲线
          </div>
          <div id="pow-02" class="pow-graph"></div>
        </div>
        <div class="pow-graph-03 graph-box">
          <div class="title" style="font-size: 1.2vw; font-weight: 700">
            分叉次数变化曲线
          </div>
          <div id="pow-03" class="pow-graph"></div>
        </div>
      </div>
    </div>
    <!-- <div class="gatewayInfo">
      <GatewayInfo />
    </div> -->
  </div>
</template>
  
  <script>
import GatewayInfo from "@/components/GatewayInfo.vue";
import qs from "qs";
export default {
  components: { GatewayInfo },
  created() {
    axios
      .get("http://localhost:8080/api/config/list", qs.stringify({}))
      .then((response) => {
        this.form = response.data;
        for (var i = 0; i < this.form.length; i++) {
          let Form = {
            networkId: "",
            ConfigName: "",
            Ctype: "",
            NodeNum: "",
            Blocksize: "",
            ConfirmSpeed: "",
            Step: "",
            SyncRate: "",
            TransactionPerBlock: "",
          };
          Form.networkId = this.form[i].networkId;
          Form.ConfigName = this.form[i].name;
          Form.Ctype = this.form[i].kind == 1 ? "无标度网络" : "随机生成网络";
          Form.NodeNum = this.form[i].number;
          Form.Blocksize = this.form[i].size;
          Form.ConfirmSpeed = this.form[i].speed;
          Form.Step = this.form[i].step;
          Form.SyncRate = this.form[i].rate;
          Form.TransactionPerBlock = this.form[i].number_of_trade;
          this.tableData.push(Form);
        }
        console.log(this.tableData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      performanceInfo: {
        thoughtPer: "",
        forkRate: "",
        blockHeight: "",
        ForkTimesDealSum: "",
        ConfirmSpeedAvergae: "",
        HeightThroughput: "",
        TpsPeak: "",
        tableData: [],
      },
      form: {
        networkId: "",
        ConfigName: "",
        Ctype: "",
        NodeNum: "",
        Blocksize: "",
        ConfirmSpeed: "",
        step: "",
        SyncRate: "",
        TransactionPerBlock: "",
      },
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
      data: {},
      powStep: "",
      simultaionTime: "",
      split: 0.3,
      nodeDetail: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      percentage: 0,
      customColors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
      figure1: undefined,
      figure2: undefined,
      figure3: undefined,
      tpsDetail: [],
      confirmSpeed: [],
      fork: [],
      tableData: [],
      totalData: [],
      total: "",
      pageSize: 4,
      currentPage: 1,
      radio: "",
    };
  },
  methods: {
    getNodeInfo(id) {},
    changeConfig() {
    //   let configName = this.radio;
    //   axios
    //     .post(`http://localhost:8080/configmanage/${configName}`)
    //     .then((res) => {
    //       if (res.status == 200) {
    //         this.$message.success("切换配置成功");
    //         this.edgesArray = res.data.edges;
    //         this.nodesArray = res.data.nodes;
    //         this.getNodeInfo(this.nodesArray[0].id);

    //         // this.init();
    //       } else {
    //         this.$message.error("切换配置失败");
    //       }
    //     });
    },
    tableRowStyle() {
      return "background-color: white; color: black;";
    },
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color: #323546;color: white;font-weight: 500;";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getConfigInfo() {
      axios.get("http://localhost:8080/configmanage/webconfig").then((res) => {
        this.configNum = res.data.ConfigNum;
        this.configName = res.data.PresentConfigName;
        this.AlgConduct = res.data.AlgConduct;
        this.PresentConfigName = res.data.PresentConfigName;
        this.radio = res.data.PresentConfigName;
        this.changeConfig();
      });
    },
    handleCurrentChangeTable(val) {
      this.radio = val.ConfigName;
    },
    changeSetting() {
      const data3 = {
        steplenth: parseInt(this.powStep),
        stepnum: parseFloat(this.simultaionTime),
      };
      this.percentage = 0;
      let that = this;
      setInterval(function () {
        if (that.percentage < 99) {
          that.percentage = that.percentage + 1;
        }
      }, 1);
      axios.post("http://localhost:8080/simulation/pow", data3).then((res) => {
        this.tpsDetail = res.data.TpsDetail;
        this.confirmSpeed = res.data.ConfirmSpeed;
        this.fork = res.data.ForkTimesDealDetail;
        this.data = res.data;
        this.performanceInfo.blockHeight = res.data.Height;
        this.performanceInfo.HeightThroughput = res.data.HeightThroughput;
        this.performanceInfo.ForkTimesDealSum = res.data.ForkTimesDealSum;
        this.performanceInfo.TpsPeak =
          parseInt(res.data.TpsPeak * 1000) / 1000 + " tps";
        this.performanceInfo.forkRate =
          parseInt(res.data.ForkRate * 1000) / 10 + "%";
        this.performanceInfo.ConfirmSpeedAvergae =
          parseInt(res.data.ConfirmSpeedAvergae * 1000) / 1000;
        this.performanceInfo.thoughtPer =
          parseInt(res.data.TpsAverage * 1000) / 1000 + " tps";
        this.percentage = 100;

        let tps_x = [];
        let tps_y = [];
        for (let i = 0; i < this.tpsDetail.length; i++) {
          tps_y.push(this.tpsDetail[i].Value);
          tps_x.push(i);
        }
        let confirmSpeed_x = [];
        let confirmSpeed_y = [];
        for (let i = 0; i < this.confirmSpeed.length; i++) {
          confirmSpeed_y.push(this.confirmSpeed[i].Value);
          confirmSpeed_x.push(i);
        }
        let forkRate_x = [];
        let forkRate_y = [];
        for (let i = 0; i < this.fork.length; i++) {
          forkRate_y.push(this.fork[i]);
          forkRate_x.push(i);
        }
        let option1 = {
          title: {
            text: "吞吐量（TPS）",
            textStyle: {
              fontSize: 15,
            },
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [],
          },
          grid: {
            left: "3%",
            right: "6%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            right: "5%",
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            name: "时刻",
            boundaryGap: false,
            data: tps_x,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "TPS",
              type: "line",
              stack: "Total",
              data: tps_y,
            },
          ],
        };
        let option2 = {
          title: {
            text: "吞吐量（TPS）",
            textStyle: {
              fontSize: 15,
            },
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [],
          },
          grid: {
            left: "3%",
            right: "6%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            right: "5%",
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            name: "时刻",
            boundaryGap: false,
            data: confirmSpeed_x,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "TPS",
              type: "line",
              stack: "Total",
              data: confirmSpeed_y,
            },
          ],
        };
        let option3 = {
          title: {
            text: "分叉次数",
            textStyle: {
              fontSize: 15,
            },
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [],
          },
          grid: {
            left: "3%",
            right: "6%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            right: "5%",
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            name: "时刻",
            boundaryGap: false,
            data: forkRate_x,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "分叉次数",
              type: "line",
              stack: "Total",
              data: forkRate_y,
            },
          ],
        };

        this.figure1 = this.$echarts.init(document.getElementById("pow-01"));
        this.figure2 = this.$echarts.init(document.getElementById("pow-02"));
        this.figure3 = this.$echarts.init(document.getElementById("pow-03"));

        this.figure1 && this.figure1.setOption(option1);
        this.figure2 && this.figure2.setOption(option2);
        this.figure3 && this.figure3.setOption(option3);
      });
    },
    getConfigList() {

    //   axios.get("http://localhost:8080/configmanage/200").then((res) => {
    //     if (res.status == 200) {
    //       this.$message.success("获取配置列表成功");
    //       this.totalData = res.data.reverse();
    //       this.total = this.totalData.length;
    //       this.configNum = this.total;
    //       this.tableData = this.totalData.slice(0, this.pageSize);
    //     } else {
    //       this.$message.error("获取配置列表失败");
    //     }
    //   });

    },

    /* 配置表格所需函数 */
    handleCurrentChange(val) {
      //当当前行发生改变后调用该函数

      this.currentRow = val;
      this.radio = val;
      console.log(this.currentRow);
      // this.tableData = this.totalData.slice(
      //   this.pageSize * (val - 1),
      //   this.pageSize * val
      // );
      console.log(val);
    },

    ShowNodeTopology(index, networkId) {
      let index_total = (this.currentPage - 1) * this.pageSize + index;
      let num = this.form[index_total].number;
      this.$router.push({
        path: "/NodesTopology",
        query: {
          NumofNodes: num,
          networkId: networkId,
        },
      });
    },

    handleDelete(index, id) {
      //删除配置项
      var str = "?configId=" + id;
      if (index == null) {
        return;
      }
      index = (this.currentPage - 1) * this.pageSize + index;
      this.tableData.splice(index, 1);
      axios
        .get("http://localhost:8080/api/config/delete" + str, qs.stringify())
        .then((response) => {
          this.$message.success("删除成功！");
        })
        .catch((error) => {
          this.$message.error("删除失败！");
          console.error(error);
        });
    },

    exportData(index) {
      //下载配置文件所需函数
      index = (this.currentPage - 1) * this.pageSize + index;
      let data = JSON.stringify(this.tableData[index]);
      let blob = new Blob([data], {
        type: "application/json",
      });
      var str = this.tableData[index].ConfigName + ".json";
      FileSaver.saveAs(blob, str);
    },

    ChangeGraph(index, id) {
      if (index == null) {
        return;
      }
      index = (this.currentPage - 1) * this.pageSize + index;
      console.log(`index为${index}`);
      var str = "?configId=" + id;
      this.GeneraateGraph(str, index);
    }, //改变图
  },
  mounted() {
    // this.changeSetting();
    this.getConfigInfo();
    // this.getConfigList();
    // axios.get("http://localhost:8080/simulation/pow").then((res) => {
    //   if (res.status == 200) {
    //     this.$message.success("成功获取上次PoW结果");
    //     this.tpsDetail = res.data.TpsDetail;
    //     this.confirmSpeed = res.data.ConfirmSpeed;
    //     this.fork = res.data.ForkTimesDealDetail;
    //     this.data = res.data;
    //     this.performanceInfo.blockHeight = res.data.Height;
    //     this.performanceInfo.HeightThroughput = res.data.HeightThroughput;
    //     this.performanceInfo.ForkTimesDealSum = res.data.ForkTimesDealSum;
    //     this.performanceInfo.TpsPeak =
    //       parseInt(res.data.TpsPeak * 1000) / 1000 + " tps";
    //     this.performanceInfo.forkRate =
    //       parseInt(res.data.ForkRate * 1000) / 10 + "%";
    //     this.performanceInfo.ConfirmSpeedAvergae =
    //       parseInt(res.data.ConfirmSpeedAvergae * 1000) / 1000;
    //     this.performanceInfo.thoughtPer =
    //       parseInt(res.data.TpsAverage * 1000) / 1000 + " tps";
    //     // this.percentage = 100;
    //     console.log(this.tpsDetail);
    //     console.log(this.confirmSpeed);
    //     console.log(this.fork);

    //     console.log(this.tpsDetail);
    //     console.log(this.confirmSpeed);
    //     console.log(this.fork);

    //     let tps_x = [];
    //     let tps_y = [];
    //     for (let i = 0; i < this.tpsDetail.length; i++) {
    //       tps_y.push(this.tpsDetail[i].Value);
    //       tps_x.push(i);
    //     }
    //     let confirmSpeed_x = [];
    //     let confirmSpeed_y = [];
    //     for (let i = 0; i < this.confirmSpeed.length; i++) {
    //       confirmSpeed_y.push(this.confirmSpeed[i].Value);
    //       confirmSpeed_x.push(i);
    //     }
    //     let forkRate_x = [];
    //     let forkRate_y = [];
    //     for (let i = 0; i < this.fork.length; i++) {
    //       forkRate_y.push(this.fork[i]);
    //       forkRate_x.push(i);
    //     }
    //     let option1 = {
    //       title: {
    //         text: "吞吐量（TPS）",
    //         textStyle: {
    //           fontSize: 15,
    //         },
    //       },
    //       tooltip: {
    //         trigger: "axis",
    //       },
    //       legend: {
    //         data: [],
    //       },
    //       grid: {
    //         left: "3%",
    //         right: "6%",
    //         bottom: "3%",
    //         containLabel: true,
    //       },
    //       toolbox: {
    //         right: "5%",
    //         feature: {
    //           saveAsImage: {},
    //         },
    //       },
    //       xAxis: {
    //         type: "category",
    //         boundaryGap: false,
    //         name: "时刻",
    //         data: tps_x,
    //       },
    //       yAxis: {
    //         type: "value",
    //       },
    //       series: [
    //         {
    //           name: "TPS",
    //           type: "line",
    //           stack: "Total",
    //           data: tps_y,
    //         },
    //       ],
    //     };
    //     let option2 = {
    //       title: {
    //         text: "吞吐量（TPS）",
    //         textStyle: {
    //           fontSize: 15,
    //         },
    //       },
    //       tooltip: {
    //         trigger: "axis",
    //       },
    //       legend: {
    //         data: [],
    //       },
    //       grid: {
    //         left: "3%",
    //         right: "6%",
    //         bottom: "3%",
    //         containLabel: true,
    //       },
    //       toolbox: {
    //         right: "5%",
    //         feature: {
    //           saveAsImage: {},
    //         },
    //       },
    //       xAxis: {
    //         type: "category",
    //         name: "时刻",
    //         boundaryGap: false,
    //         data: confirmSpeed_x,
    //       },
    //       yAxis: {
    //         type: "value",
    //       },
    //       series: [
    //         {
    //           name: "TPS",
    //           type: "line",
    //           stack: "Total",
    //           data: confirmSpeed_y,
    //         },
    //       ],
    //     };
    //     let option3 = {
    //       title: {
    //         text: "分叉次数",
    //         textStyle: {
    //           fontSize: 15,
    //         },
    //       },
    //       tooltip: {
    //         trigger: "axis",
    //       },
    //       legend: {
    //         data: [],
    //       },
    //       grid: {
    //         left: "3%",
    //         right: "6%",
    //         bottom: "3%",
    //         containLabel: true,
    //       },
    //       toolbox: {
    //         right: "5%",
    //         feature: {
    //           saveAsImage: {},
    //         },
    //       },
    //       xAxis: {
    //         type: "category",
    //         name: "时刻",
    //         boundaryGap: false,
    //         data: forkRate_x,
    //       },
    //       yAxis: {
    //         type: "value",
    //       },
    //       series: [
    //         {
    //           name: "分叉次数",
    //           type: "line",
    //           stack: "Total",
    //           data: forkRate_y,
    //         },
    //       ],
    //     };

    //     this.figure1 = this.$echarts.init(document.getElementById("pow-01"));
    //     this.figure2 = this.$echarts.init(document.getElementById("pow-02"));
    //     this.figure3 = this.$echarts.init(document.getElementById("pow-03"));

    //     this.figure1 && this.figure1.setOption(option1);
    //     this.figure2 && this.figure2.setOption(option2);
    //     this.figure3 && this.figure3.setOption(option3);
    //   } else {
    //     this.$message.error("获取信息失败");
    //   }
    // });
    
  },
};
</script>
  
  <style lang="less" scoped>
.pointer {
  cursor: pointer;
}

.pow-container {
  display: flex;

  .pow {
    // width: calc(~"100% - 430px");
    width:100%;
    padding: 0 10px;

    .pow-setting {
      background-color: #fff;
      margin: 10px 0;
      padding: 8px;

      .setting-info {
        display: flex;
        margin-left: 18px;

        div {
          display: flex;
          font-size: 24px;

          span {
            width: 160px;
            margin: auto;
            text-align: center;
          }
        }

        .setting-btn {
          margin-left: 10px;
        }
      }
    }

    .pow-performance {
      margin: 10px 0;
      background: #fff;
      padding: 8px;

      .pow-performance-box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        .performance-item.item {
          flex: 1;
        }

        .performance-item {
          margin: 10px 20px;
          padding: 10px;
          height: 80px;
          line-height: 60px;
          border: 1px solid #f0f0f0;
          position: relative;

          .performance-title {
            position: absolute;
            top: 8px;
            left: 0px;
            font-size: 15px;
            font-weight: 550;
          }

          .performance-content {
            position: absolute;
            top: 0px;
            right: 5px;
            font-size: 36px;
            color: cornflowerblue;
          }

          .progress {
            bottom: -20px;
          }
        }
      }
    }

    .pow-graphs {
      // margin: 10px;

      .graph-box {
        background-color: #fff;
        padding: 8px;
        margin: 10px 0;
      }

      .pow-graph {
        margin: 10px;
        height: 300px;
        width: 100%;
      }
    }

    .node-info-box {
      margin: 10px;
      background-color: #fff;
    }

    .node-info {
      height: 360px;
      margin-top: 10px;

      .split-pane {
        padding: 10px;
        background-color: #fff;
      }

      .node-list {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        height: 340px;
      }

      .node-detail {
        display: flex;
        overflow-y: auto;
        height: 360px;
      }
    }
  }

  .gatewayInfo {
    margin-top: 20px;
    // border-radius: 5px;
    padding: 0 10px;
    background: white;
    box-sizing: border-box;
    height: 980px;
  }
}

.node-config {
  margin: 10px 0;
  background-color: #fff;
  padding: 10px;

  .config-list {
    height: 385px;
  }

  .config-header {
    display: flex;
    margin: 0 10px;

    .config-header-left {
      flex: 1;
      margin-left: -10px;
    }

    .config-header-btns {
      margin-right: 40px;
    }
  }
}

.pagination-box {
  margin-top: 10px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-progress.pow-progress-2.el-progress--line {
  display: flex;
}

.config-btn {
  margin-top: 10px;
  margin-right: -20px;
}
</style>
  