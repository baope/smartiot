<template>
  <div class="index-wrapper">
    <div class="left-container">
      <div class="committee-box">
        <div class="title">委员会的迭代收敛速度</div>
        <el-divider></el-divider>
        <div class="committee-list">
          <div
            class="committee-item"
            v-for="(item, i) in configInfos1"
            :key="item.name"
          >
            <div v-if="item.name < 3">
              <div>
                <div class="mod1">
                  <span class="items">{{ item.title }}</span>
                  <div>
                    <span>恶意节点历史算力比例：</span>
                    <span>迭代周期:</span>
                  </div>
           
                  <el-input
                    v-model="configInput11[i]"
                    placeholder="请输入内容"
                    class="configinput"
                  ></el-input>
                  <el-input
                    v-model="configInput12[i]"
                    placeholder="请输入内容"
                    class="configinput"
                  ></el-input>
                </div>
              </div>
            </div>
            <div v-if="item.name == 3">
              <span class="items">对比配置3</span>
              <el-button
                plain
                type="primary"
                class="committee-button"
                align="center"
                @click="handleSubmit1(0)"
                >提交
              </el-button>
              <div>
                <div class="mod11">
                  <div>
                    <span>恶意节点历史算力比例：</span>
                    <span>迭代周期:</span>
                  </div>
                  <el-input
                    v-model="configInput11[i]"
                    placeholder="请输入内容"
                    class="configinput"
                  ></el-input>
                  <el-input
                    v-model="configInput12[i]"
                    placeholder="请输入内容"
                    class="configinput"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="committee-chart" id="config-chart1"></div>
      </div>
      <div class="credit-box">
        <div class="title">信誉管理的存储开销</div>
        <el-divider></el-divider>
        <div class="credits">
          <span>迭代周期:</span>
          <el-input
            v-model="configInput2[0]"
            placeholder="请输入内容"
            class="committinput1"
          ></el-input>
          <span>平均每次迭代淘汰的节点数:</span>
          <el-input
            v-model="configInput2[1]"
            placeholder="请输入内容"
            class="committinput1"
          ></el-input>
          <span>委员会节点数量范围:</span>
          <el-input
            v-model="configInput2[2]"
            placeholder="请输入内容"
            class="committinput2"
          ></el-input>
          <span>~</span>
          <el-input
            v-model="configInput2[3]"
            placeholder="请输入内容"
            class="committinput2"
          ></el-input>
          <el-button
            plain
            type="primary"
            class="credit-button"
            align="center"
            @click="handleSubmit2(0)"
            >提交
          </el-button>
        </div>
        <div class="credit-chart" id="config-chart2"></div>
      </div>
      <div class="throughput-box">
        <div class="title">吞吐量</div>
        <el-divider></el-divider>
        <div class="throughputs">
          <span>全网节点数:</span>
          <el-input v-model="configInput3[0]" class="throughinput"></el-input>
          <span>单个节点邻居数:</span>
          <el-input v-model="configInput3[1]" class="throughinput1"></el-input>
          <el-button
            plain
            type="primary"
            class="throughput-button"
            align="center"
            @click="handleSubmit3(0)"
            >提交</el-button
          >
        </div>
        <div class="throughput-list">
          <div
            class="throughput-item"
            v-for="(item, i) in configInfos3"
            :key="item.name"
          >
            <div v-if="item.name < 3">
              <div>
                <div class="mod1">
                  <span class="items">{{ item.title }}</span>
                  <div>
                    <t>委员会节点数:</t>
                    <t>带宽(Mbps):</t>
                  </div>
                  <el-input
                    v-model="configInput31[i]"
                    placeholder="请输入内容"
                    class="throughputinput"
                  ></el-input>
                  <el-input
                    v-model="configInput32[i]"
                    placeholder="请输入内容"
                    class="throughputinput"
                  ></el-input>
                </div>
              </div>
            </div>
            <div v-if="item.name == 3">
              <span class="items">对比配置3</span>
              <div>
                <div class="mod11">
                  <div>
                    <t>委员会节点数:</t>
                    <t>带宽(Mbps):</t>
                  </div>
                  <el-input
                    v-model="configInput31[i]"
                    placeholder="请输入内容"
                    class="throughputinput"
                  ></el-input>
                  <el-input
                    v-model="configInput32[i]"
                    placeholder="请输入内容"
                    class="throughputinput"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="throughput-chart" id="config-chart3"></div>
      </div>
      <div class="textbox">
        <p>
          算法来源：一种带有预验证机制的区块链动态共识算法.《软件学报》, 2022
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import GatewayInfo from "@/components/GatewayInfo.vue";
import { getModelLine, getModelBar } from "@/utils/common";
import { instance } from "@/utils/http";

export default {
  name: "Model2",
  components: { GatewayInfo },
  data() {
    return {
      activeNames1: ["1"],
      configInfos1: [
        { name: "1", title: "对比配置1" },
        { name: "2", title: "对比配置2" },
        { name: "3", title: "对比配置3" },
      ],
      configInput11: ["0.4", "0.5", "0.6"],
      configInput12: ["50", "50", "100"],
      lineData1: [],
      lineChart1: undefined,
      myForm: {},
      configInput2: ["50", "3", "100", "1000"],
      barData2: [],
      barChart: undefined,

      activeNames3: ["1"],
      configInput3: ["500", "5"],
      configInfos3: [
        { name: "1", title: "对比配置1" },
        { name: "2", title: "对比配置2" },
        { name: "3", title: "对比配置3" },
      ],
      configInput31: ["50", "100", "150"],
      configInput32: ["20", "20", "20"],
      lineData3: [],
      lineChart3: undefined,
    };
  },
  mounted() {
    this.lineChart1 = this.$echarts.init(
      document.getElementById("config-chart1")
    );
    this.barChart2 = this.$echarts.init(
      document.getElementById("config-chart2")
    );
    this.lineChart3 = this.$echarts.init(
      document.getElementById("config-chart3")
    );
    this.handleSubmit1(1);
    this.handleSubmit2(1);
    this.handleSubmit3(1);
  },
  methods: {
    handleChange1(val) {
      // console.log(val);
    },

    handleChange3(val) {
      // console.log(val);
    },

    handleSubmit1(init) {
      let blockInfo = {
        init: init,
        t1: this.configInput11[0],
        t2: this.configInput12[0],
        t3: this.configInput11[1],
        t4: this.configInput12[1],
        t5: this.configInput11[2],
        t6: this.configInput12[2],
      };
      const data = {
        Commond: "dbcp_iter",
        CommondInfo: blockInfo,
      };
      // 使用非默认ip!!!需要预先设置instance的具体ip    instance.post("").then((res) => {})
      instance.post("/block", data).then((res) => {
        this.lineData1 = res.data;
        let xData = [];
        let repu1 = [];
        let repu2 = [];
        let repu3 = [];
        for (let item in res.data) {
          xData.push(res.data[item].Timehour);
          repu1.push(res.data[item].Repu1);
          repu2.push(res.data[item].Repu2);
          repu3.push(res.data[item].Repu3);
        }
        let data = [];
        data.push({ name: "Repu1", value: repu1 });
        data.push({ name: "Repu2", value: repu2 });
        data.push({ name: "Repu3", value: repu3 });
        let legends = ["Repu1", "Repu2", "Repu3"];
        this.lineChart1 &&
          this.lineChart1.setOption(
            getModelLine(
              [],
              "时间/小时",
              xData || [],
              "诚实节点比例",
              data,
              legends
            )
          );
      });
    },

    handleSubmit2(init) {
      let blockInfo = {
        init: init,
        t1: this.configInput2[0],
        t2: this.configInput2[1],
        t3: this.configInput2[2],
        t4: this.configInput2[3],
      };
      const data = {
        Commond: "dbcp_storage",
        CommondInfo: blockInfo,
      };
      instance.post("/block", data).then((res) => {
        // console.log(res.data);

        this.lineData1 = res.data;
        let xData = [];
        let bitcoin = [];
        let byzcoin = [];
        let dbcp = [];
        for (let item in res.data) {
          xData.push(res.data[item].NumofVal);
          bitcoin.push(res.data[item].Bitcoin);
          byzcoin.push(res.data[item].Byzcoin);
          dbcp.push(res.data[item].Dbcp);
        }
        let data = [];
        data.push({ name: "Bitcoin", value: bitcoin });
        data.push({ name: "Dbcp", value: dbcp });
        data.push({ name: "Byzcoin", value: byzcoin });
        let legends = ["Bitcoin", "Dbcp", "Byzcoin"];
        this.barChart2 &&
          this.barChart2.setOption(
            getModelBar(
              [],
              "委员会节点数量",
              xData,
              "单个区块存储开销/MB",
              data,
              legends
            )
          );
      });
    },

    handleSubmit3(init) {
      let blockInfo = {
        init: init,
        t1: this.configInput3[0],
        t2: this.configInput3[1],
        t3: this.configInput31[0],
        t4: this.configInput32[0],
        t5: this.configInput31[1],
        t6: this.configInput32[1],
        t7: this.configInput31[2],
        t8: this.configInput32[2],
      };
      const data = {
        Commond: "dbcp_throughput",
        CommondInfo: blockInfo,
      };
      instance.post("/block", data).then((res) => {
        // console.log(res.data);

        this.lineData3 = res.data;
        let xData = [];
        let throughput1 = [];
        let throughput2 = [];
        let throughput3 = [];
        let Bitcoin = [];
        for (let item in res.data) {
          xData.push(res.data[item].BlockHeight);
          Bitcoin.push(res.data[item].Bitcoin);
          throughput1.push(res.data[item].Throughput1);
          throughput2.push(res.data[item].Throughput2);
          throughput3.push(res.data[item].Throughput3);
        }
        let data = [];
        data.push({ name: "对比配置1", value: throughput1 });

        data.push({ name: "对比配置2", value: throughput2 });
        data.push({ name: "对比配置3", value: throughput3 });
        data.push({ name: "Bitcoin", value: Bitcoin });
        let legends = ["对比配置1", "对比配置2", "对比配置3", "Bitcoin"];
        this.lineChart3 &&
          this.lineChart3.setOption(
            getModelLine(
              [],
              "区块高度",
              xData,
              "吞吐量（交易/秒）",
              data,
              legends
            )
          );
      });
    },
  },
};
</script>

<style lang="less">
.index-wrapper {
  display: flex;
  .left-container {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .committee-box {
      margin: 10px 0 15px 0;
      background-size: 100%;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background-color: white;
      width: 100%;
      padding: 10px;
      span {
        margin-right: 60px;
      }
      .configinput {
        width: 220px;
        margin-right: 20px;
      }
      .committee-title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 15px;
      }
      .committee-list {
        display: flex;
        height: 130px;
        width: 500px;
      }
      .committee-item {
        flex: 1;
        background-color: white;
        margin: 5px;
        border-radius: 5px;
        padding: 6px;
        .item-title {
          border-bottom: 1px solid white;
        }
      }
      .committee-button {
        // display: flex;
        // justify-content: center;
        //align-content: center;
        padding-left: 25px;
        font-size: 12px;
        width: 80px;
        margin-right: 30px;
        margin-left: 108px;
        height: 40px;
        margin-top: 0px;
      }
      .committee-chart {
        margin: 0px 10px;
        height: 300px;
        width: 90%;
      }
    }
    .mod1 {
      padding-left: 5px;
      padding-bottom: 5px;
      width: 500px;
      border-right: 1px dashed grey;
    }
    .mod11 {
      padding-left: 5px;
      padding-bottom: 5px;
      width: 500px;
    }
    .items {
      height: 60px;
      margin-left: 6px;
      line-height: 40px;
      font-size: 16px;
    }
    .committinput1 {
      width: 240px;
      margin-right: 15px;
    }
    .committinput2 {
      width: 240px;
    }
    .credit-box {
      margin: 10px 0 15px 0;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background-size: 100%;
      background-color: white;
      width: 100%;
      padding: 10px;
      .credit-title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 15px;
      }
      .credit-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .input-item {
          margin: 3px 10px;
          display: flex;
          height: 80px;
          flex-direction: column;
          .label {
            width: 240px;
          }
        }
      }
      span {
        margin-left: 12px;
      }
      .credit-button {
        // display: flex;
        // justify-content: center;
        // align-content: center;
        width: 80px;
        margin-left: 50px;
        height: 40px;
        padding-left: 10px;
        margin-top: 0px;
        font-size: 12px;
      }
      .credit-chart {
        margin: 10px 30px;
        height: 300px;
        width: 90%;
      }
      .credits {
        margin-top: 15px;
      }
    }
    .throughput-box {
      margin: 10px 0 15px 0;
      box-shadow: 0px 0px 10px white;
      background-size: 100%;
      background-color: white;
      width: 100%;
      padding: 10px;
      .throughput-title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 15px;
      }
      .throughput-list {
        display: flex;
        height: 120px;
      }
      .mod2 {
        padding-bottom: 5px;
        width: 500px;
      }
      t {
        margin-right: 140px;
      }
      .throughputinput {
        width: 220px;
        margin-right: 20px;
      }
      span {
        margin-left: 12px;
      }
      .throughput-item {
        flex: 1;
        background-color: white;
        margin: 5px;
        border-radius: 5px;
        padding: 6px;
        .item-title {
          border-bottom: 1px solid white;
        }
      }
      .throughput-button {
        //display: flex;
        //justify-content: center;
        //align-content: center;
        width: 80px;
        height: 40px;
        padding-left: 10px;
        margin-left: 20px;
        font-size: 12px;
        margin-top: 0px;
      }

      .throughput-chart {
        margin: 10px 30px;
        height: 300px;
        width: 90%;
      }
      .throughinput {
        width: 410px;
        margin-right: 45px;
      }
      .throughinput1 {
        width: 415px;
        margin-right: 20px;
      }
      .throughputs {
        margin-top: 15px;
      }
    }

    .inputs {
      display: inline;
      .input-container {
        display: flex;
        align-content: center;
        margin-right: 10px;
      }
    }

    .collapse-container {
      background-size: 100%;
      background-color: white;

      width: 100%;
      .collapse-title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 15px;
      }
      .collapse-block {
        margin: 6px 25px;
        justify-content: space-between;
        display: flex;
        width: 100%;
        .collapse-inputs {
          display: flex;
          .collapse-input-container {
            display: flex;
            align-content: center;
            margin-right: 10px;
          }
        }
      }
      .collapse-chart {
        margin: 10px 30px;
        height: 300px;
        width: 90%;
      }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .el-divider--horizontal {
      margin: 5px 0;
      background: 0 0;
      border-top: 1px solid #e8eaec;
    }
    .row-3 {
      margin-top: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      position: relative;
    }

    .center-container {
      display: inline-block;
      padding-top: 20px;
      width: 95%;
      height: 51%;
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      background-repeat: no-repeat;
      background-size: auto 40vh;
      background-position: 43% 14vh;

      .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 40px;
      }
    }

    .data-block {
      padding: 10px;
      background: white;
      // border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    }
    .textbox {
      height: 30px;
      p {
        margin-left: 5px;
        margin-top: 3px;
        font-weight: bold;
        font-size: 18px;
      }
    }
    #overview-bar {
      width: 100%;
      height: 440px;
    }

    #node-pie {
      width: 33%;
      height: 380px;
    }

    #th-line {
      width: 100%;
      height: 380px;
      overflow: hidden;
    }
  }
  .textbox {
    margin-top: 5px;
    margin-bottom: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    background-size: 100%;
    background-color: white;
    width: 100%;
    height: 60px;
  }
  .right-container {
    margin-top: 20px;
    // border-radius: 5px;
    padding: 0 10px;
    background: white;
    box-sizing: border-box;
  }
}
 
</style>
