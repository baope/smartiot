<template>
  <div class="index-wrapper">
    <div class="left-container">
      <div class="left row-1">
        <div class="title">节点管理</div>
      </div>
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
      <!--
    <div class="left row-2">
         <div>
           <el-tooltip placement="right" effect="light">
         <div slot="content">CPU使用率:<div data=cpudata[1]></div><br/>内存占有率:<div data=memdata[1]></div><br/><el-button
                                          plain
                                          type="primary"
                                          class="restart"
                                          @click="handleSubmit(1)">重启</el-button></div>
           <img :src="imgurl" class="image">
         </el-tooltip>
         <el-tooltip placement="right" effect="light">
         <div slot="content">CPU使用率:<br/>内存占有率:<br/><el-button
                                          plain
                                          type="primary"
                                          class="restart"
                                          @click="handleSubmit(2)">重启</el-button></div>
           <img :src="imgurl" class="image">
         </el-tooltip>
         <el-tooltip placement="right" effect="light">
         <div slot="content">CPU使用率:<br/>内存占有率:<br/><el-button
                                          plain
                                          type="primary"
                                          class="restart"
                                          @click="handleSubmit(3)">重启</el-button></div>
           <img :src="imgurl" class="image">
         </el-tooltip>
         </div>
         <div>
         <span class="message">节点1</span>
         <span class="message">节点2</span>
         <span class="message">节点3</span>
         </div>
         <div>
         <el-tooltip placement="right" effect="light">
         <div slot="content">CPU使用率:<br/>内存占有率:<br/><el-button
                                          plain
                                          type="primary"
                                          class="restart"
                                          @click="handleSubmit(4)">重启</el-button></div>
           <img :src="imgurl" class="image">
         </el-tooltip>
         <el-tooltip placement="right" effect="light">
         <div slot="content">CPU使用率:<br/>内存占有率:<br/><el-button
                                          plain
                                          type="primary"
                                          class="restart"
                                          @click="handleSubmit(5)">重启</el-button></div>
           <img :src="imgurl" class="image">
         </el-tooltip>
         <el-tooltip placement="right" effect="light">
         <div slot="content">CPU使用率:<br/>内存占有率:<br/><el-button
                                          plain
                                          type="primary"
                                          class="restart"
                                          @click="handleSubmit(6)">重启</el-button></div>
           <img :src="imgurl" class="image">
         </el-tooltip>
         </div>
          <div>
         <span class="message">节点4</span>
         <span class="message">节点5</span>
         <span class="message">节点6</span>
         </div>
    </div>-->
      <div class="left row-3">
        <el-checkbox-group
          v-model="checknode"
          class="checkbox"
          :min="0"
          :max="6"
        >
          <el-checkbox v-for="node in nodes" :label="node" :key="node">{{
            node
          }}</el-checkbox>
          <el-button plain type="primary" class="start" @click="handleclick()"
            >重启</el-button
          >
          <el-button
            plain
            type="primary"
            class="shutdown"
            @click="handleSubmit1()"
            >关机</el-button
          >
        </el-checkbox-group>
      </div>
      <div class="left row-4">
        <el-upload
          class="uploadbox"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :show-file-list="false"
        >
          <div>
            <input
              size="small"
              type="text"
              id="file"
              accept=".bat,.go,.sh"
              class="uploadinput"
              value="p2p-client.go"
            />
            <el-button slot="trigger" size="small" type="primary"
              >上传文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >部署</el-button
            >
          </div>
        </el-upload>
      </div>
    </div>
    <div class="right-container">
      <GatewayInfo />
    </div>
  </div>
</template>

<script>
import GatewayInfo from "@/components/GatewayInfo.vue";
import { instance } from "@/utils/http";
import countTo from "vue-count-to";
import { formatTimestamp } from "@/utils/common";
import { getEdgeLineOption } from "@/utils/echartOpt";

const nodeOptions = ["节点1", "节点2", "节点3", "节点4", "节点5", "节点6"];
export default {
  name: "Nodetest",
  components: { countTo, GatewayInfo },
  data() {
    return {
      fileList: [],
      bgAnimUrl: [],
      nodes: nodeOptions,
      checknode: ["节点1"],
      imgurl: require("@/assets/111.png"),
      cpuData: [],
      memData: [],
      xticks: [],
      resourceInfo: [],
      cpuchart: undefined,
      memchart: undefined,
      intervalId: undefined,
      updateTimestamp: "",
      autoGap: "10000",
      sendCmd: false,
      msg: undefined,
    };
  },
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
    this.cpuchart = this.$echarts.init(
      document.getElementById("cpu-used-line")
    );
    this.memchart = this.$echarts.init(
      document.getElementById("mem-used-line")
    );
    this.getByFilter();

    // 每秒请求1次
    this.intervalId = setInterval(this.getResourceInfo, 10000);
  },
  methods: {
    handleSubmit(i) {
      let nodetestinfo = {
        t: i,
      };
      const data = {
        Command: "nodetest",
        CommandInfo: nodetestinfo,
      };
      instance.post("/block", data).then((res) => {
        (this.cpudata[i] = res.data.nodemessage.Cpu),
          (this.memdata[i] = res.data.nodemessage.Mem);
      });
    },
    handleclick() {
      this.$message({
        message: "重启成功",
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.$message({
        message: "部署成功",
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
        console.log(res.data);
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
  .left-container {
    width: calc(~"100% - 348px");
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .left-row {
      display: flex;
      justify-content: space-between;
    }
    .row-1 {
      width: 100%;
      padding-left: 15px;
      padding-bottom: 13px;
      margin-top: 10px;
      margin-bottom: 3px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background: white;
      position: relative;
      .title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin: 5px 10px -10px 10px;
      }
    }
    .row-2 {
      margin-top: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background-size: 100%;
      background-color: white;
      width: 100%;
      padding: 10px;
      .image {
        width: 28%;
        margin-left: 30px;
        margin-right: 30px;
        height: 300px;
      }
      .message {
        font-size: 20px;
        margin-left: 180px;
        margin-right: 180px;
      }
      .restart {
        font-size: 16px;
        size: "small";
      }
    }
    .row-3 {
      width: 100%;
      height: 80px;
      padding-left: 15px;
      padding-bottom: 13px;
      margin-top: 10px;
      margin-bottom: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background: white;
      position: relative;
      .start {
        margin-left: 100px;
      }
      .shutdown {
        margin-left: 20px;
      }
      .checkbox {
        padding-top: 20px;
      }
    }
    .row-4 {
      width: 100%;
      height: 80px;
      padding-left: 15px;
      padding-bottom: 3px;
      margin-top: 5px;

      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      background: white;
      position: relative;
    }
    .uploadbox {
      padding-top: 10px;
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
}
</style>
