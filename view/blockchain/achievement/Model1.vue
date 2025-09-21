<template>
  <div class="index-wrapper">
    <div class="left-container">
      <!-- 测试数据配置  -->
      <div class="row-2">
        <div class="title">测试数据配置</div>
        <el-divider></el-divider>
        <div class="inputss">
          <span>存储节点数量：</span>
          <el-input
            v-model="testInput[0]"
            placeholder="请输入内容"
            class="testinputs"
          ></el-input>
          <span>数据片段数量：</span>
          <el-input
            v-model="testInput[1]"
            placeholder="请输入内容"
            class="testinputs"
          ></el-input>
          <span>纠删码片段数量：</span>
          <el-input
            v-model="testInput[2]"
            placeholder="请输入内容"
            class="testinputs"
          ></el-input>
          <el-button
            plain
            type="primary"
            class="input-button"
            @click="configTest(i)"
            >提交</el-button
          >
        </div>
      </div>
      <div class="storage-box">
        <div class="collapse-title">存储算法配置</div>
        <el-collapse
          class="collapse-block"
          v-model="activeNames"
          @change="handleChange"
        >
          <el-collapse-item
            v-for="(item, i) in collapseInfos"
            :key="item.name"
            :title="item.title"
            :name="item.name"
          >
            <div class="collapse-item">
              <div class="collapse-inputs">
                <div class="collapse-input-container">
                  <span>种群大小：</span>
                  <el-input
                    v-model="algInput1[i]"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <div class="collapse-input-container">
                  <span>交叉概率:</span>
                  <el-input
                    v-model="algInput2[i]"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <div class="collapse-input-container">
                  <span>变异概率:</span>
                  <el-input
                    v-model="algInput3[i]"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <div class="collapse-input-container">
                  <span>迭代次数:</span>
                  <el-input
                    v-model="algInput4[i]"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <el-row>
                  <el-col :span="12">
                    <div class="collapse-input-container" v-if="i == 2">
                      <span>alpha:</span>
                      <el-input
                        v-model="algInput5"
                        placeholder="请输入内容"
                      ></el-input>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="collapse-input-container" v-if="i == 2">
                      <span>gama:</span>
                      <el-input
                        v-model="algInput6"
                        placeholder="请输入内容"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-button
                  plain
                  type="primary"
                  class="input-button"
                  align="center"
                  @click="configAlgorithm(i, 0)"
                  >运行算法</el-button
                >
              </div>
              <!-- TODO_RLJ -->
              <div class="collapse-chart" :id="item.id"></div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="row-4">
        <p>
          算法来源：A Scalable Two-layer Blockchain System for Distributed
          Multi-cloud Storage in IIoT[J]. IEEE Transactions on Industrial
          Informatics, 2022.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import GatewayInfo from "@/components/GatewayInfo.vue";
import { getModelLine } from "@/utils/common";
import { instance } from "@/utils/http";

export default {
  name: "Model1",
  components: { GatewayInfo },
  data() {
    return {
      testInput: ["", "", ""],
      activeNames: ["1", "2", "3"],
      configInfos: ["", "", ""],
      collapseInfos: [
        { name: "1", title: "GA", id: "collapse-chart1" },
        { name: "2", title: "NSGA2", id: "collapse-chart2" },
        { name: "3", title: "RL-NSGA2", id: "collapse-chart3" },
      ],
      // 种群大小，交叉概率，变异概率，迭代次数
      //种群大小，交叉概率，变异概率，迭代次数
      // 种群大小，交叉概率，变异概率，迭代次数，alpha，gama
      algInput1: ["100", "100", "100"],
      algInput2: ["0.9", "0.9", "0.9"],
      algInput3: ["0.1", "0.1", "0.1"],
      algInput4: ["100", "100", "100"],
      algInput5: "0.5",
      algInput6: "0.3",
      lineData: [[], [], []],
      lineChart: [undefined, undefined, undefined],
    };
  },
  mounted() {
    // 初始化3个算法的 echarts
    this.lineChart[0] = this.$echarts.init(
      document.getElementById(this.collapseInfos[0].id)
    );
    this.lineChart[1] = this.$echarts.init(
      document.getElementById(this.collapseInfos[1].id)
    );
    this.lineChart[2] = this.$echarts.init(
      document.getElementById(this.collapseInfos[2].id)
    );
    console.log(111111111111111);
    console.log(this.lineChart);
    console.log(this.collapseInfos);

    console.log(222222222);
    this.handleChange(this.activeNames);
    this.configAlgorithm(0, 1);
    this.configAlgorithm(1, 1);
    this.configAlgorithm(2, 1);
  },
  methods: {
    handleChange(val) {
      let arr = Object.values(val);

      console.log(typeof arr);

      if (arr.includes("1")) {
        this.collapseInfos[0].title =
          "GA\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0GA算法优化过程";
      } else {
        this.collapseInfos[0].title = "GA";
      }
      if (arr.includes("2")) {
        this.collapseInfos[1].title =
          "NSGA2\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0NSGA2算法优化过程";
      } else {
        this.collapseInfos[1].title = "NSGA2";
      }
      if (arr.includes("3")) {
        this.collapseInfos[2].title =
          "RL-NSGA2\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0RL-NSGA2算法优化过程";
      } else {
        this.collapseInfos[2].title = "RL-NSGA2";
      }
    },

    configTest() {
      let blockInfo = {
        t1: this.testInput[0],
        t2: this.testInput[1],
        t3: this.testInput[2],
      };
      if (blockInfo.t1 < blockInfo.t2 + blockInfo.t3) {
        alert("请输入正确数据！");
      } else {
        const data = {
          Commond: "set_storage_allocation",
          CommondInfo: blockInfo,
        };
        instance.post("/block", data).then((res) => {
          console.log(res.data);
          alert(res.data);
        });
      }
    },

    // TODO
    configAlgorithm(num, init) {
      // 初始化3个算法的 echarts

      var blockInfo = {
        algtype: "GA",
        init: init,
        t1: this.algInput1[num],
        t2: this.algInput2[num],
        t3: this.algInput3[num],
        t4: this.algInput4[num],
        t5: this.algInput5,
        t6: this.algInput6,
      };

      if (num == 1) {
        blockInfo.algtype = "NSGA2";
      } else if (num == 2) {
        blockInfo.algtype = "RL-NSGA2";
      }
      if (num != 2) {
        if (
          blockInfo.t1 < 0 ||
          blockInfo.t4 < 0 ||
          blockInfo.t2 < 0 ||
          blockInfo.t2 > 1 ||
          blockInfo.t3 < 0 ||
          blockInfo.t3 > 1
        ) {
          alert("请输入正确数据！");
        } else {
          const data = {
            Commond: "storage_allocation",
            CommondInfo: blockInfo,
          };
          instance.post("/block", data).then((res) => {
            console.log(res);
            this.lineData[num] = res.data;
            let xData = [];
            let availability = [];
            let storageCost = [];
            let storageTime = [];

            for (let item in res.data) {
              xData.push(res.data[item].Itertime);
              availability.push(res.data[item].Availability);
              storageCost.push(res.data[item].StorageCost);
              storageTime.push(res.data[item].StorageTime);
            }
            let data = [];
            data.push({ name: "Availability", value: availability });
            data.push({ name: "StorageCost", value: storageCost });
            data.push({ name: "StorageTime", value: storageTime });
            let legends = ["Availability", "StorageCost", "StorageTime"];
            // 这个是为了什么？？
            this.lineChart[num] &&
              this.lineChart[num].setOption(
                getModelLine(
                  [],
                  "迭代次数",
                  xData || [],
                  "属性值",
                  data,
                  legends
                )
              );
          });
        }
      } else {
        if (
          blockInfo.t1 < 0 ||
          blockInfo.t4 < 0 ||
          blockInfo.t2 < 0 ||
          blockInfo.t2 > 1 ||
          blockInfo.t3 < 0 ||
          blockInfo.t3 > 1 ||
          blockInfo.t5 < 0 ||
          blockInfo.t5 > 1 ||
          blockInfo.t6 < 0 ||
          blockInfo.t6 > 1
        ) {
          alert("请输入正确数据！");
        } else {
          const data = {
            Commond: "storage_allocation",
            CommondInfo: blockInfo,
          };
          instance.post("/block", data).then((res) => {
            console.log(res);
            this.lineData[num] = res.data;
            let xData = [];
            let availability = [];
            let storageCost = [];
            let storageTime = [];

            for (let item in res.data) {
              xData.push(res.data[item].Itertime);
              availability.push(res.data[item].Availability);
              storageCost.push(res.data[item].StorageCost);
              storageTime.push(res.data[item].StorageTime);
            }
            let data = [];
            data.push({ name: "Availability", value: availability });
            data.push({ name: "StorageCost", value: storageCost });
            data.push({ name: "StorageTime", value: storageTime });
            let legends = ["Availability", "StorageCost", "StorageTime"];
            // 这个是为了什么？？
            this.lineChart[num] &&
              this.lineChart[num].setOption(
                getModelLine(
                  [],
                  "迭代次数",
                  xData || [],
                  "属性值",
                  data,
                  legends
                )
              );
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.index-wrapper {
  display: flex;
  .left-container {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .row-2 {
      margin-top: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background-size: 100%;
      background-color: white;
      width: 100%;
      padding: 10px;
      .inputss {
        padding-top: 0px;
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
    }
    /deep/ .el-collapse-item__header {
      font-size: 18px;
      font-weight: bold;
      color: black;
    }
    .inputs {
      display: flex;
      height: 60px;
      line-height: 60px;
      .input-container {
        display: flex;
        flex: 1;
        align-content: center;
        span {
          width: 80px;
          font-size: 16px;
          margin-left: 5px;
        }
      }
    }
    .input-button {
      width: 80px;
      margin-right: 30px;
      margin-left: 15px;
      height: 40px;
      margin-top: 10px;
    }
    .testinputs {
      width: 300px;
      margin-right: 30px;
    }

    .storage-box {
      background-size: 100%;
      background-color: white;
      width: 100%;
      .collapse-title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 15px;
      }
      .collapse-block {
        padding: 5px 0 0 15px;
        display: flex;
        flex-direction: column;

        width: 100%;
        .collapse-item {
          display: flex;
          height: 400px;
          .collapse-inputs {
            display: flex;
            margin-top: 30px;
            flex-direction: column;
            width: 300px;
            height: 60px;
            line-height: 60px;
            .collapse-input-container {
              display: flex;
              align-content: center;

              span {
                width: 120px;
                font-size: 16px;
                margin-left: 5px;
              }
            }

            .input-button {
              width: 120px;
              margin-right: 30px;
              margin-left: 100px;
              height: 40px;
              margin-top: 10px;
            }
          }
          .collapse-chart {
            flex: 1;
            margin-right: 15px;
          }
        }
      }
    }
  }
  .row-4 {
    margin-top: 20px;
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
  .right-container {
    margin-top: 20px;
    // border-radius: 5px;
    padding: 0 10px;
    background: white;

    box-sizing: border-box;
  }
}
</style>
