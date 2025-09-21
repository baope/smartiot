<template>
  <div>
    <div class="tsn-container">
      <div class="tsn-params">
        <div class="schedule-button">
          <el-button type="primary" @click="openInputDialog" class="custom-button">
            流量调度<i class="el-icon-upload el-icon--right"></i>
          </el-button>

          <el-dialog :visible.sync="inputDialogVisible" title="输入流量数量" width="30%">
            <el-input v-model="trafficQuantity" placeholder="输入流量数量"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="runScript(trafficQuantity)">确定</el-button>
              <el-button @click="inputDialogVisible = false">取消</el-button>
            </span>
          </el-dialog>

          <el-dialog :visible.sync="dialogVisible" title="调度状态" width="30%">
            <div v-if="loading" class="loading-container">
              <i class="el-icon-loading"></i>
              正在调度，请稍候...
            </div>
            <div v-else class="result-container">
              <p class="success-message">调度完成！</p>
              <el-link :href="fileUrl" target="_blank" download="log.txt" class="download-link">下载 log.txt</el-link>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
          </el-dialog>
        </div>

        <div class="params">
          <div class="info-item">
            <span class="title">流量数目</span>
            <div class="text">{{ trafficQuantity }}</div>
          </div>
          <div class="info-item">
            <span class="title">带宽</span>
            <div class="text">1000Mbps</div>
          </div>
          <div class="info-item">
            <span class="title">时隙长度</span>
            <div class="text">0.2ms</div>
          </div>
        </div>
      </div>


      <div class="tsn-top">
        <div class="leftBox">
          <h2>链路利用率</h2>
          <div class="link-info">
            <div class="text">
              <p>D1 → S1:</p>
              <p>S1 → S2:</p>
              <p>S1 → S3:</p>
              <p>S2 → S4:</p>
              <p>S3 → S4:</p>
              <p>S4 → D2:</p>
            </div>

            <div class="matrix">
              <div v-for="(row, rowIndex) in matrix" :key="rowIndex" class="row">
                <div v-for="(block, colIndex) in row" :key="colIndex" class="rectangle">
                  <div class="out-area" :style="{
                    backgroundColor: getFillColor(block.fillPercentage),
                  }">
                    <div class="inner-area" :style="{ height: block.fillPercentage + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text">
              <p>S1 → D1:</p>
              <p>S2 → S1:</p>
              <p>S3 → S1:</p>
              <p>S4 → S2:</p>
              <p>S3 → S4:</p>
              <p>S4 → D2:</p>
            </div>

            <div class="matrix">
              <div v-for="(row, rowIndex) in matrix" :key="rowIndex" class="row">
                <div v-for="(block, colIndex) in row" :key="colIndex" class="rectangle">
                  <div class="out-area" :style="{
                    backgroundColor: getFillColor(block.fillPercentage),
                  }">
                    <div class="inner-area" :style="{ height: block.fillPercentage + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rightBox">
          <h2>网络拓扑</h2>
          <div id="main" style="width: 100%; height: 400px"></div>
        </div>
      </div>
      <div class="bottomBox">
        <div class="tsn-table">
          <h2>链路详细信息</h2>
          <el-table :data="tableData1" stripe style="width: 100%">
            <el-table-column prop="link" label="链路" width="180px">
            </el-table-column>
            <el-table-column prop="bandwidth" label="带宽（Mbps）" width="180px">
            </el-table-column>
            <el-table-column prop="avg_utilization" label="平均占用率" width="220">
            </el-table-column>
            <el-table-column prop="max_utilization" label="最大占用率" width="280">
            </el-table-column>
          </el-table>
        </div>

        <div class="tsn-table">
          <h2>流量详细信息</h2>
          <el-table :data="tableData2" stripe style="width: 100%">
            <el-table-column prop="flow" label="流量" width="180">
            </el-table-column>
            <el-table-column prop="flow_latency" label="平均延迟(us)" width="180">
            </el-table-column>
            <el-table-column prop="flow_jitter" label="平均抖动(us)" width="220">
            </el-table-column>
            <el-table-column prop="flow_period" label="发送周期(ms)" width="240">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      numRows: 6,
      numCols: 10,
      numSuperframes: 20,
      matrix: [],
      currentSuperframe: 0,
      myChart: null,

      dialogVisible: false,
      inputDialogVisible: false,
      trafficQuantity: '',
      loading: false,
      fileUrl: '',
      trafficQuantity: 1000,

      option: {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",

        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 80,
            roam: true,
            label: {
              show: true,
              position: "bottom",
              fontSize: 22,
              color: "black",
              fontWeight: "bold",
            },

            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data: [
              {
                name: "D1",
                x: 300,
                y: 300,
                symbol: "image://" + require("../assets/end_device.png"),
              },
              {
                name: "S1",
                x: 600,
                y: 300,
                symbol: "image://" + require("../assets/tsn_switch.png"),
              },
              {
                name: "S4",
                x: 1100,
                y: 300,
                symbol: "image://" + require("../assets/tsn_switch.png"),
              },
              {
                name: "S2",
                x: 850,
                y: 100,
                symbol: "image://" + require("../assets/tsn_switch.png"),
              },
              {
                name: "S3",
                x: 850,
                y: 500,
                symbol: "image://" + require("../assets/tsn_switch.png"),
              },
              {
                name: "D2",
                x: 1400,
                y: 300,
                symbol: "image://" + require("../assets/end_device.png"),
              },
            ],
            links: [
              {
                source: "D1",
                target: "S1",
              },
              {
                source: "S1",
                target: "S2",
              },
              {
                source: "S1",
                target: "S3",
              },
              {
                source: "S3",
                target: "S4",
              },
              {
                source: "S2",
                target: "S4",
              },
              {
                source: "S4",
                target: "D2",
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      },
      tableData1: [
        {
          link: "D1 → S1",
          bandwidth: "200",
          avg_utilization: "48%",
          max_utilization: "69%",
        },
        {
          link: "S1 → S2",
          bandwidth: "120",
          avg_utilization: "24%",
          max_utilization: "42%",
        },
        {
          link: "S1 → S3",
          bandwidth: "120",
          avg_utilization: "26%",
          max_utilization: "45%",
        },
        {
          link: "S2 → S4",
          bandwidth: "150",
          avg_utilization: "36%",
          max_utilization: "64%",
        },
        {
          link: "S3 → S4",
          bandwidth: "150",
          avg_utilization: "32%",
          max_utilization: "58%",
        },
        {
          link: "S4 → D2",
          bandwidth: "200",
          avg_utilization: "46%",
          max_utilization: "78%",
        },
      ],
      tableData2: [
        {
          flow: "流量6",
          flow_latency: 182,
          flow_jitter: 11,
          flow_period: 200,
        },
        {
          flow: "流量5",
          flow_latency: 169,
          flow_jitter: 11,
          flow_period: 200,
        },
        {
          flow: "流量4",
          flow_latency: 217,
          flow_jitter: 15,
          flow_period: 250,
        },
        {
          flow: "流量3",
          flow_latency: 178,
          flow_jitter: 13,
          flow_period: 250,
        },
        {
          flow: "流量2",
          flow_latency: 304,
          flow_jitter: 18,
          flow_period: 500,
        },
        {
          flow: "流量1",
          flow_latency: 342,
          flow_jitter: 24,
          flow_period: 500,
        },
      ],
    };
  },
  mounted() {
    this.initChart();
    this.generateMatrix();
    this.updateInterval = setInterval(this.updateBlocks, 1000);

    setInterval(() => {
      this.updateRandomRows();
    }, 1000);
  },

  methods: {

    openInputDialog() {
      this.inputDialogVisible = true;
    },
    async runScript(trafficQuantity) {
      this.trafficQuantity = trafficQuantity;
      this.dialogVisible = true;
      this.loading = true;
      try {
        const response = await axios.get(`/tsn/run-script`, {
          params: { quantity: trafficQuantity }, // 将流量数量作为参数传递
          responseType: "blob", // 确保接收的是文件流
          timeout: 5 * 60 * 1000,
        });

        const blob = new Blob([response.data], { type: "text/plain" });
        this.fileUrl = window.URL.createObjectURL(blob);
        console.log(this.fileUrl);
        this.loading = false;
      } catch (error) {
        console.error("Error running script:", error);
        this.loading = false;
      }
    },

    async initChart() {
      const echarts = await import("echarts");
      this.myChart = echarts.init(document.getElementById("main"));
      this.myChart.setOption(this.option);
    },

    generateMatrix() {
      for (let i = 0; i < this.numRows; i++) {
        const row = [];
        for (let j = 0; j < this.numCols; j++) {
          row.push({
            fillPercentage: Math.random() * 50 + 40, // 随机初始化占比
          });
        }
        this.matrix.push(row);
      }
    },
    updateBlocks() {
      if (this.currentSuperframe >= this.numSuperframes) {
        // 重置到第一个超周期
        this.currentSuperframe = 0;
        this.resetMatrix();
      }

      // 随机选择0到2个矩形块
      for (let i = 0; i < this.numRows; i++) {
        const selectedCols = [];
        const numBlocksToChange = Math.floor(Math.random() * 3);
        while (selectedCols.length < numBlocksToChange) {
          const col = Math.floor(Math.random() * this.numCols);
          if (!selectedCols.includes(col)) {
            selectedCols.push(col);
          }
        }

        for (const col of selectedCols) {
          const block = this.matrix[i][col];
          // 随机增加相同的百分比
          const change = -Math.floor(Math.random() * 20); // 可调整增加或减少的值
          block.fillPercentage += change;
          if (block.fillPercentage < 0) {
            block.fillPercentage = 0;
          } else if (block.fillPercentage > 80) {
            block.fillPercentage = 80;
          }
        }
      }

      this.currentSuperframe++;
    },
    resetMatrix() {
      for (let i = 0; i < this.numRows; i++) {
        for (let j = 0; j < this.numCols; j++) {
          this.matrix[i][j].fillPercentage = Math.random() * 50 + 40;
        }
      }
    },

    updateRandomRows() {
      //添加一行数据
      const regex = /([\u4e00-\u9fa5]{2})(\d+)/g;
      const newIndex = this.tableData2[0].flow.replace(
        regex,
        (match, chineseChars, numbers) => {
          let incrementedNumbers = (parseInt(numbers) + 1).toString();
          if (parseInt(numbers) >= this.trafficQuantity) {
            incrementedNumbers = (parseInt(1)).toString();
          }
          return chineseChars + incrementedNumbers;
        }
      );
      this.tableData2.unshift({
        flow: newIndex,
        flow_latency: this.tableData2[5].flow_latency,
        flow_jitter: this.tableData2[5].flow_jitter,
        flow_period: this.tableData2[5].flow_period,
      });

      //删除最后一行数据
      this.tableData2.pop();

      //更新表1数据 随机选择一行或两行来更新
      const rowsToUpdate1 = [];
      for (let i = 0; i < 4; i++) {
        const rowIndex1 = Math.floor(Math.random() * this.tableData1.length);
        rowsToUpdate1.push(rowIndex1);
      }
      rowsToUpdate1.forEach((rowIndex1) => {
        const regex = /(\d+)%/g;
        const originalRow1 = { ...this.tableData1[rowIndex1] };
        // const max_utilize =

        const updatedRow1 = {
          link: originalRow1.link,
          bandwidth: originalRow1.bandwidth,
          avg_utilization: originalRow1.avg_utilization.replace(
            regex,
            (match, numbers) => {
              const originalNumber = parseInt(numbers);
              const randomIncrement =
                originalNumber <= 10
                  ? Math.floor(Math.random() * 3)
                  : originalNumber >= 90
                    ? Math.floor(Math.random() * 3) - 2
                    : Math.floor(Math.random() * 5) - 2;
              const newNumber = originalNumber + randomIncrement;
              return newNumber + "%";
            }
          ),
          max_utilization: originalRow1.max_utilization.replace(
            regex,
            (match, numbers) => {
              const originalNumber = parseInt(numbers);
              const randomIncrement =
                originalNumber <= 10
                  ? Math.floor(Math.random() * 3)
                  : originalNumber >= 90
                    ? Math.floor(Math.random() * 3) - 2
                    : Math.floor(Math.random() * 5) - 2;
              const newNumber = originalNumber + randomIncrement;
              // console.log("---22222222222----------");
              return newNumber + "%";
            }
          ),
        };
        this.$set(this.tableData1, rowIndex1, updatedRow1);
      });

      //// 更新表2数据,随机选择一行或两行来更新
      const rowsToUpdate2 = [];
      for (let i = 0; i < 2; i++) {
        const rowIndex2 = Math.floor(Math.random() * this.tableData2.length);
        rowsToUpdate2.push(rowIndex2);
      }

      rowsToUpdate2.forEach((rowIndex2) => {
        const originalRow = { ...this.tableData2[rowIndex2] };
        const randomDelta = Math.floor(Math.random() * 5) - 2;
        const updatedRow2 = {
          flow: originalRow.flow,
          flow_latency: originalRow.flow_latency + randomDelta,
          flow_jitter: originalRow.flow_jitter,
          flow_period: originalRow.flow_period,
        };
        this.$set(this.tableData2, rowIndex2, updatedRow2);
      });
    },

    getFillColor(percentage) {
      if (percentage < 25) {
        return "#82B0D2";
      } else if (percentage >= 25 && percentage < 50) {
        return "#FA7F6F";
      } else if (percentage >= 50 && percentage < 75) {
        return "#FFBE7A";
      } else {
        return "#8ECFC9";
      }
    },
  },
};

</script>
<style lang="less">
.tsn-container {
  display: flex;
  flex-direction: column;

  .tsn-params {
    display: flex;
    height: 50px;
    margin-top: 10px;

    .custom-button {
      width: 180px;
      display: flex;
      margin-left: 10px;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 22px;
    }

    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #409eff;
    }

    .loading-container i {
      font-size: 24px;
      margin-right: 10px;
    }

    .result-container {
      text-align: center;
    }

    .success-message {
      font-size: 20px;
      font-weight: bold;
      color: #67c23a;
      margin-bottom: 20px;
    }

    .download-link {
      font-size: 16px;
      color: #409eff;
    }

    .params {
      padding: 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: flex-end; /* 子元素靠右对齐 */

    }

    .params-title {
      font-size: 24px;
      color: #333;
      margin-right: auto;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .info-item:last-child {
      border-bottom: none;
    }

    .title {
      margin-left: 30px;
      padding: 5px;
    }

    .text {
      margin-left: 10px;
      font-size: 18px;
      width: 100px;
      background: gainsboro;
      padding: 5px;
      border-radius: 5px;
    }


  }

  .tsn-top {
    display: flex;
    height: 53vh;
    padding: 5px;
  }

  .leftBox {
    width: 58%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 5px;
    margin-left: 5px;
    margin-right: 10px;
    background-color: #fff;
    border-radius: 10px;

  }

  .rightBox {
    width: 41%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 5px;
    margin-left: 10px;
    margin-right: 5px;
    background-color: #fff;
    border-radius: 10px;
  }

  .link-info {
    display: flex;
    overflow: hidden;
  }

  .text {
    display: flex;
    width: 20%;
    flex-direction: column;
  }

  .text p {
    font-size: 18px;
    height: 40px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 25px;
    margin-left: 15px;
    margin-right: 10px;
  }

  .matrix {
    display: flex;
    width: 40%;
    margin-right: 18px;
    flex-wrap: wrap;
    /* 允许换行 */
    justify-content: flex-start;
  }

  .row {
    display: flex;
    width: 100%;
    margin-bottom: 35px;
  }

  .out-area {
    width: 100%;
    height: 100%;
    background-color: gray;
    position: relative;
  }

  .inner-area {
    width: 100%;
    background-color: white;
    height: 0;
    transition: height 1s;
  }

  .rectangle {
    width: 35px;
    height: 35px;
    border: 1px solid #000;
    position: relative;
  }

  #main {
    justify-content: center;
    align-items: center;
  }


  .bottomBox {
    display: flex;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;

    .tsn-table {
      display: flex;
      width: 50%;
      flex-direction: column;

      .el-table {
        font-family: Arial, sans-serif;
        font-size: 18px;
      }

      .el-table tbody td {
        color: #333;
      }
    }
  }
}

h2 {
  margin-bottom: 15px;
}
</style>