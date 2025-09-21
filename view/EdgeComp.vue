<!-- 注：修改了该文件和echaartOpt.js -->

<template>
  <div class="view-wrapper edge-comp-view">
    <div class="basic-info">
      <div class="content">
        <div class="title">Edge Computing 类型</div>
        <div class="text">Spark Admin</div>
        <div class="title">
          手动刷新
          <i class="fas fa-sync-alt" @click="getResourceInfo" :class="{ spin: sendCmd }" />
        </div>
        <div class="title">
          自动刷新设置
          <Select v-model="autoGap" style="width: 100px" size="small">
            <Option value="10000">10秒</Option>
            <Option value="30000">30秒</Option>
            <Option value="60000">1分钟</Option>
          </Select>
        </div>
        <div class="text">更新时间: {{ updateTimestamp }}</div>
      </div>
      <div class="timer">
        <Timer />
        <div class="desc" style="text-align: center; color: #adb6c0">
          运行时间
        </div>
      </div>
    </div>

    <div class="summary">
      <div class="schedule-button">
        <el-button type="primary" @click="openInputDialog" class="custom-button">
          任务调度<i class="el-icon-upload el-icon--right"></i>
        </el-button>

        <el-dialog :visible.sync="inputDialogVisible" title="输入边缘设备数量" width="30%">
          <el-input v-model="deviceNum" placeholder="边缘设备数量"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="runScript(deviceNum)">确定</el-button>
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
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </span>
        </el-dialog>
      </div>

      <div class="summary-table">

        <table class="worker">
          <thead>
            <tr>
              <th>边缘服务器IP</th>
              <th>总算力(gHz)</th>
              <th>已用内存(KB)</th>
              <th>CPU使用率</th>
              <th>运行任务数量</th>
              <!-- <th>空闲存储空间</th>
              <th>存储空间使用占比</th> -->
            </tr>
          </thead>
          <tbody v-if="tableData1.length > 0">
            <tr class="tr" v-for="(item, _) in tableData1" :key="_">
              <td>10.42.0.11{{ _ + 1 }}</td>
              <td>{{ item.cpu }}</td>
              <td>{{ item.mem }}</td>
              <td>{{ item.percent }}%</td>
              <td>{{ item.num }}</td>
              <!-- <td>{{ item.free }}</td>
              <td>{{ item.percent }}</td> -->
            </tr>
          </tbody>
        </table>

        <table class="worker">
          <thead>
            <tr>
              <th>边缘设备</th>
              <th>任务数据量(KB)</th>
              <th>算力要求</th>
              <th>截止时间(ms)</th>
              <th>决策</th>
            </tr>
          </thead>
          <tbody v-if="tableData2.length > 0">
            <tr class="tr" v-for="(item, _) in tableData2" :key="_">
              <td>设备{{ item.index }}</td>
              <td>{{ item.data }}</td>
              <td>{{ item.cpu }}</td>
              <td>{{ item.ddl }}</td>
              <td>边缘服务器{{ item.dec }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="summary-table record-chart">
      <div id="cpu-used-line"></div>
      <div id="mem-used-line"></div>
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import { formatTimestamp } from "../common";
import { getEdgeLineOption } from "../echartOpt";
export default {
  data() {
    return {
      updateTimestamp: "",
      resourceInfo: [],
      sendCmd: false,
      msg: undefined,
      autoGap: "10000",
      cpuchart: undefined,
      memchart: undefined,
      cpuData: [],
      memData: [],
      xticks: [],
      intervalId: undefined,

      dialogVisible: false,
      inputDialogVisible: false,
      deviceNum: 300,
      loading: false,

      tableData1: [
        {
          mem: 319840,
          cpu: 1.5,
          percent: 45,
          num: 10,
        },
        {
          mem: 336820,
          cpu: 2.2,
          percent: 42,
          num: 18,
        },
        {
          mem: 329600,
          cpu: 2.5,
          percent: 45,
          num: 18,
        },
        {
          mem: 322900,
          cpu: 1.8,
          percent: 64,
          num: 24,
        },
        {
          mem: 335268,
          cpu: 1.6,
          percent: 48,
          num: 15,
        },
        {
          mem: 316484,
          cpu: 1.8,
          percent: 46,
          num: 22,
        },
      ],

      tableData2: [
        {
          index: 6,
          data: 1640,
          cpu: 0.09,
          ddl: 200,
          dec: 1,
        },
        {
          index: 5,
          data: 2360,
          cpu: 0.15,
          ddl: 180,
          dec: 3,
        },
        {
          index: 4,
          data: 1400,
          cpu: 0.08,
          ddl: 540,
          dec: 2,
        },
        {
          index: 3,
          data: 1200,
          cpu: 0.12,
          ddl: 360,
          dec: 6,
        },
        {
          index: 2,
          data: 1580,
          cpu: 0.08,
          ddl: 150,
          dec: 5,
        },
        {
          index: 1,
          data: 1570,
          cpu: 1.11,
          ddl: 240,
          dec: 4,
        },
      ],
    };
  },
  components: { Timer },
  mounted() {
    this.getByFilter();
    this.cpuchart = this.$echarts.init(
      document.getElementById("cpu-used-line")
    );
    this.memchart = this.$echarts.init(
      document.getElementById("mem-used-line")
    );
    setInterval(() => {
      this.updateRandomRows();
    }, 1000);
    this.intervalId = setInterval(this.getResourceInfo, 10000)

  },

  destroyed() {
    this.intervalId && window.clearInterval(this.intervalId)
  },

  methods: {
    openInputDialog() {
      this.inputDialogVisible = true;
    },
    async runScript(deviceNum) {
      this.dialogVisible = true;
      this.loading = true;
      this.deviceNum = deviceNum;

      setTimeout(() => {
        this.loading = false; // 10秒后停止加载
        console.log("Loading finished"); // 输出提示
      }, 10000);
    },

    updateRandomRows() {
      //在第一行添加一行，并删除最后一行数据
      let currentIndex = this.tableData2[0].index;
      let incrementedIndex = (parseInt(currentIndex) + 1).toString();
      if (currentIndex >= this.deviceNum) {
        incrementedIndex = 0;
      }
      this.tableData2.unshift({
        index: incrementedIndex,
        data: Math.floor(Math.random() * 150) * 10 + 1000,
        cpu: parseFloat(((Math.random() * 0.15) + 0.05).toFixed(2))  ,
        ddl: Math.floor(Math.random() * 30) * 10 + 100,
        dec: Math.floor(Math.random() * 6) + 1,
      });
      this.tableData2.pop();

      //随机更新表1数据
      const rowsToUpdate1 = [];
      for (let i = 0; i < 4; i++) {
        const rowIndex1 = Math.floor(Math.random() * this.tableData1.length);
        rowsToUpdate1.push(rowIndex1);
      }
      rowsToUpdate1.forEach((rowIndex1) => {
        const regex = /(\d+)%/g;
        const originalRow1 = { ...this.tableData1[rowIndex1] };
        const randomDelta = Math.floor(Math.random() * 5) - 2;

        const updatedRow1 = {
          cpu: originalRow1.cpu,
          mem: originalRow1.mem <= 305000
            ? originalRow1.mem + (Math.floor(Math.random() * 1500) + 1000)
            : originalRow1.mem >= 345000
              ? originalRow1.mem - (Math.floor(Math.random() * 1500) + 1000)
              : originalRow1.mem + randomDelta * (Math.floor(Math.random() * 1500) + 500),

          percent: originalRow1.percent <= 40
            ? originalRow1.percent + (Math.floor(Math.random() * 3) + 1)
            : originalRow1.percent >= 80
              ? originalRow1.percent - (Math.floor(Math.random() * 3) + 1)
              : originalRow1.percent + randomDelta * (Math.floor(Math.random() * 2) + 2),

          num: originalRow1.num <= 10
            ? originalRow1.num + (Math.floor(Math.random() * 2) + 1)
            : originalRow1.num >= 30
              ? originalRow1.num - (Math.floor(Math.random() * 2) + 1)
              : originalRow1.num + randomDelta,
        };
        this.$set(this.tableData1, rowIndex1, updatedRow1);
      });

    },

    formatData(data) {
      const arr = (data || "").split(/[(\r\n)\r\n]+/);
      const resourceInfo = [];
      for (let _ = 5; _ < arr.length; _ += 6) {
        resourceInfo.push({
          mem: arr[_ - 5],
          cpu: arr[_ - 4],
          total: arr[_ - 3],
          used: arr[_ - 2],
          free: arr[_ - 1],
          percent: arr[_],
        });
      }
      return resourceInfo;
    },
    // getByFilter() {
    //   this.$axios.get("/edge/getByFilter?limit=7").then((res) => {
    //     var docs = res.data;

    //     const resource = this.formatData(docs[0].data)
    //     const nodeCnt = resource.length;
    //     for (let _ = 0; _ < nodeCnt; _++) {
    //       this.cpuData.push([]);
    //       this.memData.push([]);
    //     }
    //     docs.reverse()

    //     docs.map((doc) => {

    //       let { data, timestamp } = doc;
    //       let obj = this.formatData(data);
    //       obj.map((item, _) => {
    //         this.cpuData[_].push(100 - parseFloat(item.cpu));
    //         console.log(item.cpu);
    //         this.memData[_].push(item.mem);
    //       });
    //       this.xticks.push(formatTimestamp(timestamp));
    //     });

    //     this.resourceInfo = resource;
    //     this.cpuchart.setOption(getEdgeLineOption(this.xticks, this.cpuData, 'CPU利用率'));
    //     this.memchart.setOption(getEdgeLineOption(this.xticks, this.memData, '内存使用'));
    //   });
    // },
    getByFilter() { 
    this.$axios.get("/edge/getByFilter?limit=7").then((res) => {
        var docs = res.data;

        const resource = this.formatData(docs[0].data)
        const nodeCnt = resource.length;
        for (let _ = 0; _ < nodeCnt; _++) {
            this.cpuData.push([]);
            this.memData.push([]);
        }
        docs.reverse()

        // 生成当前时间和前六分钟的时间戳
        const now = new Date(); // 当前时间
        let xticks = [];
        for (let i = 0; i < 7; i++) {
            let timestamp = new Date(now.getTime() - (i * 60000)); // 当前时间减去i分钟
            xticks.unshift(formatTimestamp(timestamp)); // 把格式化后的时间加入 xticks（顺序逆序插入）
        }

        docs.map((doc) => {
            let { data, timestamp } = doc;
            let obj = this.formatData(data);
            obj.map((item, _) => {
                this.cpuData[_].push(100 - parseFloat(item.cpu));
                this.memData[_].push(item.mem);
            });
        });

        this.resourceInfo = resource;
        this.cpuchart.setOption(getEdgeLineOption(xticks, this.cpuData, 'CPU利用率'));
        this.memchart.setOption(getEdgeLineOption(xticks, this.memData, '内存使用'));
    });
},


    getResourceInfo() {
      if (this.sendCmd) {
        return;
      }

      this.sendCmd = true;
      this.$axios
        .get("/edge/getResource")
        .then((res) => {
          this.sendCmd = false;
          this.resourceInfo = this.formatData(res.data);
          this.setChartNewVal();
        })
        .catch((err) => {
          this.sendCmd = false;
        });
    },

    setChartNewVal() {
      const cpuData = this.cpuData;
      const memData = this.memData;

      this.resourceInfo.map((item, _) => {
        cpuData[_].shift();
        memData[_].shift();
        cpuData[_].push(100 - parseFloat(item.cpu));
        memData[_].push(item.mem);
      });

      const timestamp = formatTimestamp();
      this.updateTimestamp = timestamp;
      this.cpuData = cpuData;
      this.memData = memData;

      this.xticks.shift();
      this.xticks.push(timestamp);

      this.cpuchart.setOption(getEdgeLineOption(this.xticks, cpuData, 'CPU利用率'), true);
      this.memchart.setOption(getEdgeLineOption(this.xticks, memData, '内存使用'), true);
    },
  },
};
</script>

<style lang="less" scoped>
.edge-comp-view {
  padding: 10px;
  box-sizing: border-box;

  .basic-info {
    display: flex;
    padding: 20px 50px;
    box-sizing: border-box;
    background: rgb(31, 49, 74);
    justify-content: space-between;
    align-items: center;
    // border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    background: linear-gradient(180deg,
        rgba(31, 49, 74, 1) 0%,
        rgba(36, 56, 82, 1) 50%,
        rgba(47, 76, 108, 1) 100%);

    .title {
      line-height: 30px;
      color: #d0c287;

      .fas {
        cursor: pointer;
      }
    }

    .content {
      line-height: 30px;
      color: #adb6c0;
    }
  }

  .spin {
    animation: spin 3s linear infinite;
  }
}

.summary-table {
  padding: 20px 50px;
  background: white;
  // border-radius: 15px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  display: flex;

  h3 {
    margin-bottom: 10px;
  }

  table {
    border: 1px solid #ebeef5;
    margin-left: 0;
    margin-right: 50px;
    border-collapse: separate;
    width: 100%;

    tbody>tr:nth-child(odd)>td {
      background-color: #fafafa;
    }
  }

  th,
  td {
    max-width: 600px;
    padding: 12px 10px;
    line-height: 23px;
    text-align: left;
    border-left: 1px solid #ebeef5;
  }

  td {
    border-top: 1px solid #ebeef5;
    white-space: nowrap;
  }
}

.record-chart {
  display: flex;
  justify-content: space-between;

  #cpu-used-line,
  #mem-used-line {
    height: 400px;
    width: 46%;
  }
}

.custom-button {
  width: 180px;
  height: 50px;
  display: flex;
  margin-top: 10px;
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
</style>