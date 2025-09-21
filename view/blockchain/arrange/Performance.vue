<template>
  <div class="index-wrapper">
    <div class="left-container">
      <!-- blockchain overview -->
      <div class="overview-container row-1" v-if="overview.length > 0">
        <div
          class="data-block overview"
          v-for="(item, _) in overview"
          :key="item.name"
        >
          <div class="title">{{ names[_] }}</div>
          <div class="value">{{ item.value }}</div>
          <div
            class="background-animation"
            :style="{ backgroundImage: bgAnimUrl[_] }"
          />
        </div>
      </div>
      <!-- 共识算法配置 TODO_RLJ-->
      <div class="row-2 collapse-container">
        <div class="collapse-title">共识算法配置</div>
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
            <div class="collapse-desc">{{ item.desc }}</div>
            <div class="collapse-inputs">
              <div class="collapse-input-container input-item">
                <span>挖矿难度:</span>
                <el-input
                  class="input1"
                  v-model="input1[i]"
                  placeholder="请输入整数"
                  type="number"
                >
                </el-input>
              </div>
              <div class="collapse-input-container input-item">
                <p>单个区块体积:</p>
                <el-input
                  class="input2"
                  v-model="input2[i]"
                  placeholder="请输入1~30之间的整数"
                  type="number"
                  :min="1"
                  :max="30"
                ></el-input>
              </div>
              <div class="collapse-input-container input-item">
                <t>单个区块包含的交易数:</t>
                <el-input
                  class="input3"
                  v-model.number="input3[i]"
                  placeholder="请输入整数"
                  type="number"
                ></el-input>
              </div>
              <el-button
                plain
                type="primary"
                class="input-button"
                @click="update(i)"
                >切换</el-button
              >
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 吞吐量变化 -->
      <div class="row-3">
        <div class="data-block mcs-count" id="th-line" />
      </div>
      <!-- TODO_RLJ -->
      <div class="summary-table">
        <table class="worker">
          <thead>
            <tr>
              <th>节点IP</th>
              <th>已用内存(KB)</th>
              <th>空闲CPU</th>
              <th>总存储空间</th>
              <th>已用存储空间</th>
              <th>空闲存储空间</th>
              <th>存储空间使用占比</th>
            </tr>
          </thead>
          <tbody v-if="resourceInfo.length > 0">
            <tr class="tr" v-for="(item, _) in resourceInfo" :key="_">
              <td>10.42.0.11{{ _ + 1 }}</td>
              <td>{{ item.mem }}</td>
              <td>{{ item.cpu }}%</td>
              <td>{{ item.total }}</td>
              <td>{{ item.used }}</td>
              <td>{{ item.free }}</td>
              <td>{{ item.percent }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- TODO_RLJ -->
      <div class="summary-table record-chart">
        <div id="cpu-used-line"></div>
        <div id="mem-used-line"></div>
      </div>
    </div>
    <div class="right-container">
      <GatewayInfo />
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import GatewayInfo from "@/components/GatewayInfo.vue";

import { getDynamicLine, formatTimestamp } from "@/utils/common";
import { getEdgeLineOption } from "@/utils/echartOpt";
import { instance0 } from "@/utils/http";
export default {
  components: { GatewayInfo },
  data() {
    return {
      overview: [],
      bgAnimUrl: [],
      activeNames: ["1"],
      collapseInfos: [
        {
          name: "1",
          title: "工作量证明机制(PoW)",
          desc: "简介：PoW,指比特币协议中的工作量证明机制,即Proof of Work,通过一定的工作量来获得相应的奖励",
        },
        { name: "2", title: "共识算法2", desc: "简介：共识算法2的简介" },
        //{ name: "3", title: "共识算法3", desc: "简介：共识算法3的简介" },
        //{ name: "4", title: "共识算法4", desc: "简介：共识算法4的简介" },
      ],
      input1: ["", ""],
      input2: ["", ""],
      input3: ["", ""],
      lineData: [],
      timer: "",
      names: ["区块高度", "共识算法", "数据总量(MB)"],
      resourceInfo: [],
      cpuchart: undefined,
      memchart: undefined,
      xticks: [],
      intervalId: undefined,

      updateTimestamp: "",

      sendCmd: false,
      msg: undefined,
      autoGap: "10000",
      cpuData: [],
      memData: [],
    };
  },
  components: { countTo, GatewayInfo },
  mounted() {
    Date.prototype.format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    };
    // TODO 加载图片 没必要
    for (let _ = 0; _ <= 2; _++) {
      this.bgAnimUrl.push("url(" + require(`@/assets/bg-anim-${_}.png`) + ")");
    }
    // TODO 生成表格
    this.throughputLine = this.$echarts.init(
      document.getElementById("th-line")
    );
    this.cpuchart = this.$echarts.init(
      document.getElementById("cpu-used-line")
    );
    this.memchart = this.$echarts.init(
      document.getElementById("mem-used-line")
    );
    this.getOverview();
    this.getLineData30();
    this.getByFilter();

    // 每秒请求1次
    this.timer = setInterval(this.getLineData, 1000);
    this.intervalId = setInterval(this.getResourceInfo, 10000);
  },

  methods: {
    handleChange(val) {
      // console.log(val);
    },
    update(num) {
      let blockInfo = {
        Diff: parseInt(this.input1[num]),
        Datasize: parseInt(this.input2[num]),
        NumofTX: parseInt(this.input3[num]),
      };
      if (
        blockInfo.Diff < 0 ||
        blockInfo.Datasize < 1 ||
        blockInfo.Datasize > 30 ||
        blockInfo.NumofTX < 0
      ) {
        alert("请输入正确数据！");
      } else {
        const data = {
          Commond: "setBlockconf",
          CommondInfo: blockInfo,
        };
        instance0.post("/block", data).then((res) => {
          // console.log(res.data);
          if (res.data === "YES") {
            alert("已切换！");
          } else {
            alert("切换失败！");
          }
        });
      }
    },

    getOverview() {
      const data = { Commond: "queryOverview", CommondInfo: ["none"] };
      instance0.post("/block", data).then((res) => {
        this.overview = [];
        for (let key in res.data) {
          this.overview.push({ name: key, value: res.data[key] });
        }
      });
    },

    getLineData30() {
      const data = { Commond: "querytps30", CommondInfo: ["none"] };
      instance0.post("/block", data).then((res) => {
        let begin = new Date(Date.now() - 5000 * res.data.length).getTime();
        for (let item in res.data) {
          let now = new Date(begin + 5000 * item);
          let time = now.format("yyyy-MM-dd hh:mm:ss");
          this.lineData.push({
            name: now.format("yyyy-MM-dd hh:mm:ss"),
            value: [time, res.data[item]],
          });
        }
        this.throughputLine &&
          this.throughputLine.setOption(
            getDynamicLine("吞吐量变化", this.lineData || [])
          );
      });
    },

    getLineData() {
      const data = { Commond: "querytps", CommondInfo: ["none"] };
      instance0.post("/block", data).then((res) => {
        let time = new Date(Date.now()).format("yyyy-MM-dd hh:mm:ss");
        this.lineData.push({
          name: time,
          value: [time, res.data],
        });
        // console.log(this.lineData);
        this.throughputLine &&
          this.throughputLine.setOption({
            series: [
              {
                data: this.lineData,
              },
            ],
          });
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
    getByFilter() {
      //TODO_RLJ
      this.$axios.get("/edge/getByFilter?limit=7").then((res) => {
        const docs = res.data;
        const resource = this.formatData(docs[0].data);
        const nodeCnt = resource.length;
        for (let _ = 0; _ < nodeCnt; _++) {
          this.cpuData.push([]);
          this.memData.push([]);
        }
        docs.reverse();
        docs.map((doc) => {
          let { data, timestamp } = doc;
          let obj = this.formatData(data);
          obj.map((item, _) => {
            this.cpuData[_].push(100 - parseFloat(item.cpu));
            this.memData[_].push(item.mem);
          });
          this.xticks.push(formatTimestamp(timestamp));
        });
        this.resourceInfo = resource;
        this.cpuchart.setOption(
          getEdgeLineOption(this.xticks, this.cpuData, "CPU利用率")
        );
        this.memchart.setOption(
          getEdgeLineOption(this.xticks, this.memData, "内存使用")
        );
      });
    },

    getResourceInfo() {
      if (this.sendCmd) {
        return;
      }

      this.sendCmd = true;
      //TODO_RLJ
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

      this.cpuchart.setOption(
        getEdgeLineOption(this.xticks, cpuData, "CPU利用率"),
        true
      );
      this.memchart.setOption(
        getEdgeLineOption(this.xticks, memData, "内存使用"),
        true
      );
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  destroyed() {
    this.intervalId && window.clearInterval(this.intervalId);
  },
};
</script>
<style lang="less" scoped>
.index-wrapper {
  display: flex;
  padding-bottom: 10px;
  align-items: stretch;
  .left-container {
    width: 71%;
    padding: 10px;

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .overview-container {
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
      margin-top: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
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
      .collapse-desc {
        margin: 2px 0;
        font-size: 16px;
        font-weight: bold;
      }
      /deep/ .el-collapse-item__header {
        font-size: 18px;
        font-weight: bold;
        color: black;
      }
      .collapse-block {
        padding: 5px 0 0 15px;
        display: flex;
        flex-direction: column;
        width: 100%;
        .collapse-inputs {
          display: flex;
          height: 60px;
          line-height: 60px;
          .collapse-input-container {
            display: flex;
            align-content: center;
            flex: 2;
            span {
              width: 120px;
              font-size: 16px;
              margin-left: 5px;
            }
            p {
              width: 220px;
              font-size: 16px;
              margin-left: 20px;
            }
            t {
              width: 350px;
              font-size: 16px;
              margin-left: 20px;
            }
          }

          .input-button {
            width: 80px;
            margin-right: 30px;
            margin-left: 30px;
            height: 40px;
            margin-top: 10px;
          }
        }
      }
    }

    .row-3 {
      margin-top: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    }

    .data-block {
      padding: 10px;
      background: white;
      // border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    }

    #th-line {
      width: 100%;
      height: 380px;
      overflow: hidden;
    }
  }

  .summary-table {
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
      border-collapse: separate;
      width: 100%;
      tbody > tr:nth-child(odd) > td {
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

  .right-container {
    margin-top: 20px;
    // border-radius: 5px;
    padding: 0 10px;
    background: white;
    height: 980px;
    box-sizing: border-box;
  }
}

@keyframes bgAnim {
  0% {
    background-position-y: 0px;
  }
  5% {
    background-position-y: -128px;
  }
  10% {
    background-position-y: -256px;
  }
  15% {
    background-position-y: -384px;
  }
  20% {
    background-position-y: -512px;
  }
  25% {
    background-position-y: -640px;
  }
  30% {
    background-position-y: -768px;
  }
  35% {
    background-position-y: -896px;
  }
  40% {
    background-position-y: -1024px;
  }
  45% {
    background-position-y: -1152px;
  }
  50% {
    background-position-y: -1280px;
  }
  55% {
    background-position-y: -1408px;
  }
  60% {
    background-position-y: -1536px;
  }
  65% {
    background-position-y: -1664px;
  }
  70% {
    background-position-y: -1792px;
  }
  75% {
    background-position-y: -1920px;
  }
  80% {
    background-position-y: -2048px;
  }
  85% {
    background-position-y: -2176px;
  }
  90% {
    background-position-y: -2304px;
  }
  95% {
    background-position-y: -2432px;
  }
  100% {
    background-position-y: -2560px;
  }
}
</style>
