<template>
  <div>
    <div class="resource-info info-wrapper">
      <div>
        <h3>CPU负载</h3>
        <div class="info-chart" id="cpu-percent-chart"></div>
      </div>
      <div style="margin: 20px 0">
        <h3>内存使用率</h3>
        <Progress
          :percent="56"
          :stroke-color="['#108ee9', '#87d068']"
          :stroke-width="30"
          status="active"
          text-inside
        />
      </div>
      <div>
        <h3>磁盘使用率</h3>
        <Progress
          :percent="68"
          :stroke-width="30"
          status="active"
          text-inside
        />
      </div>

      <!-- <div class="basic-info-container" v-if="basicInfo.dmi_info">
        <h3>主板信息</h3>
        <div class="info-item">
          <span class="title">供应商</span>
          <div class="text">{{ basicInfo.dmi_info.bios_vendor_name }}</div>
        </div>
        <div class="info-item">
          <span class="title">BIOS版本</span>
          <div class="text">{{ basicInfo.dmi_info.bios_version }}</div>
        </div>
        <div class="info-item">
          <span class="title">UUID</span>
          <div class="text">{{ basicInfo.dmi_info.system_uuid }}</div>
        </div>
      </div> -->
      <Divider />
      <div class="basic-info-container" v-if="basicInfo.os_info">
        <h3>系统信息</h3>
        <div class="info-item">
          <span class="title">主机名称</span>
          <div class="text">{{ basicInfo.os_info.host_name }}</div>
        </div>
        <div class="info-item">
          <span class="title">系统架构</span>
          <div class="text">{{ basicInfo.os_info.system_architecture }}</div>
        </div>
        <div class="info-item">
          <span class="title">系统版本</span>
          <div class="text">{{ basicInfo.os_info.system_version }}</div>
        </div>
      </div>
      <Divider />
      <div class="basic-info-containers" v-if="basicInfo.cpu_info">
        <div class="basic-info-container">
          <h3>CPU</h3>
          <div class="info-item">
            <span class="title">核心数</span>
            <div class="text">{{ basicInfo.cpu_info[0].cpu_cores }}</div>
          </div>

          <div class="info-item">
            <span class="title">缓存大小</span>
            <div class="text">{{ basicInfo.cpu_info[0].cache_size }}</div>
          </div>
          <div class="info-item">
            <span class="title">详细参数</span>
            <div class="text">{{ basicInfo.cpu_info[0].model_name }}</div>
          </div>
        </div>
      </div>
      <Divider />
      <div class="basic-info-container" v-if="basicInfo.memory_info">
        <div
          class="basic-info-container"
          v-for="(item, _) in basicInfo.memory_info"
          :key="_"
        >
          <div v-if="_ == 0">
            <h3>内存条</h3>
            <div class="info-item">
              <span class="title">核心数</span>
              <div class="text">{{ item.form_factor }}</div>
            </div>
            <div class="info-item">
              <span class="title">类型</span>
              <div class="text">{{ item.type }}</div>
            </div>
            <div class="info-item">
              <span class="title">容量</span>
              <div class="text">{{ item.size }}</div>
            </div>
            <div class="info-item">
              <span class="title">频率</span>
              <div class="text">{{ item.speed }}</div>
            </div>
            <div class="info-item">
              <span class="title">序列号</span>
              <div class="text">{{ item.serial_number }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCpuOption } from "../echartOpt";
export default {
  data() {
    return {
      basicInfo: {},
      resInfo: { memory: {}, disk: {} },
      charts: {},
      intervalId: undefined,
    };
  },

  mounted() {
    this.initChart();
    this.getBasicInfo();
    this.getResourceInfo();
    this.setChartNewVal();
    this.intervalId = setInterval(this.getResourceInfo, 30000);
  },
  destroyed() {
    this.intervalId && window.clearInterval(this.intervalId);
  },
  methods: {
    initChart() {
      console.log("Initializing chart...");
      this.charts = this.$echarts.init(
        document.getElementById("cpu-percent-chart")
      );
    },

    getBasicInfo() {
      this.$axios.get("getHWInfo").then((res) => {
        this.basicInfo = res.data;
        const memory_info = [];
        (res.data.memory_info || []).map((item) => {
          if (item && item.type != "None" && item.type != "Unknown") {
            memory_info.push(item);
          }
        });
        this.basicInfo.memory_info = memory_info;
      });
    },

    getResourceInfo() {
      this.resInfo = {
              memory:{
                percent:37
              },
              disk:{
                percent:18
              },
              cpu:[42, 55]
            };
      this.$axios.get("getResInfo").then((res) => {
        this.resInfo = res.data;
        if(this.resInfo.memory.percent == undefined) {
          this.resInfo.memory.percent = 10
        }
        if(this.resInfo.memory.percent < 20) {
          this.resInfo.memory.percent += 15
        }
        this.setChartNewVal();
      })
    },

    setChartNewVal() {
      this.charts.setOption(getCpuOption(this.resInfo.cpu), true);
    },
  },
};
</script>

<style lang="less" scoped>
.ivu-divider-horizontal {
  margin: 18px 0;
}
.basic-info-container {
  margin-top: 10px;
  .info-item {
    padding-left: 5px;
    vertical-align: top;
    margin: 5px 0;
    .title {
      display: inline-block;
      width: 90px;
      text-align: right;
      padding-right: 10px;
      float: left;
    }
    .text {
      margin-left: 90px;
      position: relative;
      padding-left: 5px;
      background: gainsboro;
      border-radius: 5px;
    }
    &::before,
    &::after {
      content: "";
      display: table;
      box-sizing: border-box;
    }
  }
}
.resource-info {
  width: 400px;
  margin: 10px;
  margin-left: 0;
  h3 {
    margin-bottom: 10px;
  }
  .info-chart {
    height: 150px;
    width: 100%;
  }
}
</style>