<template>
  <div class="index-wrapper">
    <div class="left-container">
      <div class="left-row row-1"></div>
      <div class="left-row row-2">
        <div class="node message">
          <div class="node-content">
            <div class="title">节点属性设置</div>
            <el-divider></el-divider>
            <div class="headers">
              <div class="common back n-header"></div>
              <div class="common back n-input">存储容量(MB)</div>
              <div class="common back n-input">CPU频率(Hz)</div>
              <div class="common back n-input">CPU核数</div>
              <div class="common back n-input">内存(MB)</div>
              <div class="common back n-input">I/O速率(KB/s)</div>
              <div class="common back n-input">带宽(bps)</div>
            </div>
            <div class="headers" v-for="(item, i) in nodeinfos" :key="i">
              <div class="common n-header">
                <span :title="item.name">
                  {{ item.name }}
                </span>
              </div>
              <div class="n-input displays" :id="`mark${i}`">
                <el-input
                  v-model="item.capacity"
                  placeholder="请输入存储容量"
                  class="node_input"
                  @input="getNewNode1($event, i)"
                >
                </el-input>
              </div>
              <div class="n-input displays" :id="`mark${i}`">
                <el-input
                  v-model="item.frequency"
                  placeholder="请输入CPU频率"
                  class="node_input"
                  @input="getNewNode2($event, i)"
                >
                </el-input>
              </div>
              <div class="n-input displays" :id="`mark${i}`">
                <el-input
                  v-model="item.number"
                  placeholder="请输入CPU核数"
                  class="node_input"
                  @input="getNewNode3($event, i)"
                >
                </el-input>
              </div>
              <div class="n-input displays" :id="`mark${i}`">
                <el-input
                  v-model="item.memory"
                  placeholder="请输入内存"
                  class="node_input"
                  @input="getNewNode4($event, i)"
                >
                </el-input>
              </div>
              <div class="n-input displays" :id="`mark${i}`">
                <el-input
                  v-model="item.speed"
                  placeholder="请输入I/O速率"
                  class="node_input"
                  @input="getNewNode5($event, i)"
                >
                </el-input>
              </div>
              <div class="n-input displays" :id="`mark${i}`">
                <el-input
                  v-model="item.bandwidth"
                  placeholder="请输入带宽"
                  class="node_input"
                  @input="getNewNode6($event, i)"
                >
                </el-input>
              </div>
            </div>
            <div class="headers">
              <div class="common n-header">
                <span>节点性能权重: </span>
              </div>
              <div class="n-input displays">
                <el-input
                  v-model="percentage[0]"
                  placeholder="请输入权重"
                  class="node_input"
                ></el-input>
              </div>
              <div class="n-input displays">
                <el-input
                  v-model="percentage[1]"
                  placeholder="请输入权重"
                  class="node_input"
                ></el-input>
              </div>
              <div class="n-input displays">
                <el-input
                  v-model="percentage[2]"
                  placeholder="请输入权重"
                  class="node_input"
                ></el-input>
              </div>
              <div class="n-input displays">
                <el-input
                  v-model="percentage[3]"
                  placeholder="请输入权重"
                  class="node_input"
                ></el-input>
              </div>
              <div class="n-input displays">
                <el-input
                  v-model="percentage[4]"
                  placeholder="请输入权重"
                  class="node_input"
                ></el-input>
              </div>
              <div class="n-input displays">
                <el-input
                  v-model="percentage[5]"
                  placeholder="请输入权重"
                  class="node_input"
                ></el-input>
              </div>
            </div>

            <div class="nodeheader">
              <span>节点性能:</span>
              <el-input
                v-model="nodeinput[0]"
                placeholder="请输入内容"
                class="label-input"
              ></el-input>
              <span>节点交互信誉:</span>
              <el-input
                v-model="nodeinput[1]"
                placeholder="请输入内容"
                class="label-input1"
              ></el-input>
              <el-button
                plain
                type="primary"
                class="test-botton"
                @click="handleSubmit(0)"
                >开始测试</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="left-row row-3">
        <div class="title">节点信誉管理实验</div>
        <el-divider></el-divider>
        <div class="linechart" id="config-chart4"></div>
        <div class="barchart" id="config-chart5"></div>
      </div>
      <div class="left-row row-4">
        <p>
          算法来源：DLBN: Group Storage Mechanism Based on Double Layer
          Blockchain Network[J]. IEEE Internet of Things Journal, 2022.
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
  name: "Model3",
  components: { GatewayInfo },
  data() {
    return {
      node_input: [
        ["4", "1000", "2", "6", "1", "1000"],
        ["4", "1000", "2", "6", "1", "1000"],
        ["4", "1000", "2", "6", "1", "1000"],
        ["4", "1000", "2", "6", "1", "1000"],
        ["4", "1000", "2", "6", "1", "1000"],
      ],
      percentage: ["0.2", "0.2", "0.1", "0.2", "0.2", "0.1"],
      nodeinput: ["0.1", "0.9"],
      nodeinfos: [
        {
          name: "节点1",
          capacity: "2048",
          frequency: "3",
          number: "4",
          memory: "8",
          speed: "120",
          bandwidth: "40",
        },
        {
          name: "节点2",
          capacity: "2048",
          frequency: "3",
          number: "4",
          memory: "8",
          speed: "110",
          bandwidth: "30",
        },
        {
          name: "节点3",
          capacity: "2048",
          frequency: "2",
          number: "4",
          memory: "16",
          speed: "100",
          bandwidth: "40",
        },
        {
          name: "节点4",
          capacity: "4096",
          frequency: "3",
          number: "4",
          memory: "8",
          speed: "100",
          bandwidth: "30",
        },
        {
          name: "节点5",
          capacity: "1024",
          frequency: "2",
          number: "4",
          memory: "16",
          speed: "90",
          bandwidth: "20",
        },
      ],
      lineData4: [],
      lineChart4: undefined,
      barData5: [],
      barChart5: undefined,
    };
  },
  mounted() {
    this.lineChart4 = this.$echarts.init(
      document.getElementById("config-chart4")
    );
    this.barChart5 = this.$echarts.init(
      document.getElementById("config-chart5")
    );
    this.handleSubmit(1);
  },
  methods: {
    getNewnode1(value, i) {
      this.node_input[i][0] = value;
      this.$forceUpdate();
    },
    getNewnode2(value, i) {
      this.node_input[i][1] = value;
      this.$forceUpdate();
    },
    getNewnode3(value, i) {
      this.node_input[i][2] = value;
      this.$forceUpdate();
    },
    getNewnode4(value, i) {
      this.node_input[i][3] = value;
      this.$forceUpdate();
    },
    getNewnode5(value, i) {
      this.node_input[i][4] = value;
      this.$forceUpdate();
    },
    getNewnode6(value, i) {
      this.node_input[i][5] = value;
      this.$forceUpdate();
    },
    handleSubmit(init) {
      let blockInfo = {
        init: init,
        t11: this.node_input[0][0],
        t12: this.node_input[0][1],
        t13: this.node_input[0][2],
        t14: this.node_input[0][3],
        t15: this.node_input[0][4],
        t16: this.node_input[0][5],
        t21: this.node_input[1][0],
        t22: this.node_input[1][1],
        t23: this.node_input[1][2],
        t24: this.node_input[1][3],
        t25: this.node_input[1][4],
        t26: this.node_input[1][5],
        t31: this.node_input[2][0],
        t32: this.node_input[2][1],
        t33: this.node_input[2][2],
        t34: this.node_input[2][3],
        t35: this.node_input[2][4],
        t36: this.node_input[2][5],
        t41: this.node_input[3][0],
        t42: this.node_input[3][1],
        t43: this.node_input[3][2],
        t44: this.node_input[3][3],
        t45: this.node_input[3][4],
        t46: this.node_input[3][5],
        t51: this.node_input[4][0],
        t52: this.node_input[4][1],
        t53: this.node_input[4][2],
        t54: this.node_input[4][3],
        t55: this.node_input[4][4],
        t56: this.node_input[4][5],
        p1: this.percentage[0],
        p2: this.percentage[1],
        p3: this.percentage[2],
        p4: this.percentage[3],
        p5: this.percentage[4],
        p6: this.percentage[5],
        n1: this.nodeinput[0],
        n2: this.nodeinput[1],
      };

      const data = {
        Commond: "dlbn",
        CommondInfo: blockInfo,
      };
      instance.post("/block", data).then((res) => {
        this.lineData4 = res.data.Repuinfo;
        let xdata = [];
        let Repu1 = [];
        let Repu2 = [];
        let Repu3 = [];
        let Repu4 = [];
        let Repu5 = [];
        for (let item in res.data.Repuinfo) {
          xdata.push(res.data.Repuinfo[item].BlockHeight);
          Repu1.push(res.data.Repuinfo[item].Repu1);
          Repu2.push(res.data.Repuinfo[item].Repu2);
          Repu3.push(res.data.Repuinfo[item].Repu3);
          Repu4.push(res.data.Repuinfo[item].Repu4);
          Repu5.push(res.data.Repuinfo[item].Repu5);
        }
        let data1 = [];
        data1.push({ name: "Repu1", value: Repu1 });
        data1.push({ name: "Repu2", value: Repu2 });
        data1.push({ name: "Repu3", value: Repu3 });
        data1.push({ name: "Repu4", value: Repu4 });
        data1.push({ name: "Repu5", value: Repu5 });
        let legends1 = ["Repu1", "Repu2", "Repu3", "Repu4", "Repu5"];
        this.lineChart4 &&
          this.lineChart4.setOption(
            getModelLine(
              [],
              "区块高度",
              xdata,
              "存储节点信誉变化",
              data1,
              legends1
            )
          );
        this.barData5 = res.data.Storageinfo;
        let xData = [];
        let s1 = [];
        let s2 = [];
        let s3 = [];
        let s4 = [];
        let s5 = [];
        for (let item in res.data.Storageinfo) {
          xData.push(res.data.Storageinfo[item].BlockHeight);
          s1.push(res.data.Storageinfo[item].S1);
          s2.push(res.data.Storageinfo[item].S2);
          s3.push(res.data.Storageinfo[item].S3);
          s4.push(res.data.Storageinfo[item].S4);
          s5.push(res.data.Storageinfo[item].S5);
        }
        let data2 = [];
        data2.push({ name: "S1", value: s1 });
        data2.push({ name: "S2", value: s2 });
        data2.push({ name: "S3", value: s3 });
        data2.push({ name: "S4", value: s4 });
        data2.push({ name: "S5", value: s5 });
        let legends2 = ["S1", "S2", "S3", "S4", "S5"];
        this.barChart5 &&
          this.barChart5.setOption(
            getModelBar([], "区块高度", xData, "存储分配状态", data2, legends2)
          );
      });
    },
  },
};
</script>

<style lang="less" scoped>
.index-wrapper {
  display: flex;
  padding-bottom: 10px;
  align-items: stretch;
  .left-container {
    width: 100%;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .left-row {
      display: flex;
      justify-content: space-between;
    }
    .row-1 .overview {
      width: 32%;
      padding-left: 15px;
      padding-bottom: 13px;
      margin-top: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background: white;
      position: relative;
      .value {
        font-size: 26px;
        font-weight: bold;
        margin: 10px 0;
      }
      .background-animation {
        width: 128px;
        height: 128px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-repeat: no-repeat;
        background-position-y: 0;
        background-size: 100%;
      }
      &:hover .background-animation {
        transition: all 0.5s steps(20, end);
        background-position-y: -2560px;
      }
    }

    .row-2 {
      font-size: 16px;
      margin-top: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      position: relative;
      background-color: white;
      height: 500px;
      .test-button {
        width: 80px;
        margin-right: 30px;
        margin-left: 15px;
        height: 40px;
        margin-top: 10px;
      }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .el-divider--horizontal {
      margin: 5px 0;
      background: 0 0;
      border-top: 1px solid #e8eaec;
    }
    .node {
      max-height: 500px;
      overflow: hidden;
      overflow-y: auto;
      border: 1px solid white;
      border-bottom: none;

      .headers {
        display: flex;
        line-height: 30px;
      }
      .nodeheader {
        display: flex;
        line-height: 30px;
        margin-left: 9px;
      }
      .common {
        height: 50px;
        padding: 0 5px;
        overflow: hidden;
        font-size: 16px;
        line-height: 40px;
        color: #333;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px solid white;
      }

      .back {
        background-color: white;
      }

      .n-header {
        width: 170px;
        border-right: 1px solid white;
      }

      .n-input {
        width: 400px;
        border-bottom: 1px solid white;
      }
    }
    .label-input {
      width: 265px;
      margin-right: 120px;
      margin-left: 40px;
    }
    .label-input1 {
      width: 265px;
      margin-right: 260px;
      margin-left: 40px;
    }
    .row-3 {
      margin-top: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      position: relative;
      display: flex;
      background-color: white;
      flex-direction: column;
      .linechart {
        margin: 10px 30px;
        height: 300px;
        width: 90%;
      }
      .barchart {
        margin: 10px 30px;
        height: 300px;
        width: 90%;
      }
    }
    .row-4 {
      margin-top: 5px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background-size: 100%;
      background-color: white;
      width: 100%;
      height: 30px;
      p {
        margin-left: 5px;
        margin-top: 3px;
        font-weight: bold;
        font-size: 17px;
      }
    }
  }
}
 
</style>
