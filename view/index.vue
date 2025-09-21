<template>
  <div class="info-view view-wrapper ">
    <div class="basic-info info-wrapper">
      <div class="basic-info-container" v-if="basicInfo.dmi_info">
        <h3>主板信息</h3>
        <div class="info-item">
          <span class="title">供应商</span>
          <span class="text">{{ basicInfo.dmi_info.bios_vendor_name }}</span>
        </div>
        <div class="info-item">
          <span class="title">BIOS版本</span>
          <span class="text">{{ basicInfo.dmi_info.bios_version }}</span>
        </div>
        <div class="info-item">
          <span class="title">UUID</span>
          <span class="text">{{ basicInfo.dmi_info.system_uuid }}</span>
        </div>
      </div>
      <div class="basic-info-container" v-if="basicInfo.os_info">
        <h3>系统信息</h3>
        <div class="info-item">
          <span class="title">主机名称</span>
          <span class="text">{{ basicInfo.os_info.host_name }}</span>
        </div>
        <div class="info-item">
          <span class="title">系统架构</span>
          <span class="text">{{ basicInfo.os_info.system_architecture }}</span>
        </div>
        <div class="info-item">
          <span class="title">系统版本</span>
          <span class="text">{{ basicInfo.os_info.system_version }}</span>
        </div>
      </div>
      <div class="basic-info-containers" v-if="basicInfo.cpu_info">
        <div
          class="basic-info-container"
          v-for="(item, _) in basicInfo.cpu_info"
          :key="_"
        >
          <h3>CPU-{{ item.processor }}</h3>
          <div class="info-item">
            <span class="title">核心数</span>
            <span class="text">{{ item.cpu_cores }}</span>
          </div>
          <div class="info-item">
            <span class="title">详细参数</span>
            <span class="text">{{ item.model_name }}</span>
          </div>
          <div class="info-item">
            <span class="title">缓存大小</span>
            <span class="text">{{ item.cache_size }}</span>
          </div>
        </div>
      </div>
      <div class="basic-info-container" v-if="basicInfo.memory_info">
        <div
          class="basic-info-container"
          v-for="(item, _) in basicInfo.memory_info"
          :key="_"
        >
          <h3>内存条-{{ _ }}</h3>
          <div class="info-item">
            <span class="title">核心数</span>
            <span class="text">{{ item.form_factor }}</span>
          </div>
          <div class="info-item">
            <span class="title">类型</span>
            <span class="text">{{ item.type }}</span>
          </div>
          <div class="info-item">
            <span class="title">容量</span>
            <span class="text">{{ item.size }}</span>
          </div>
          <div class="info-item">
            <span class="title">频率</span>
            <span class="text">{{ item.speed }}</span>
          </div>
          <div class="info-item">
            <span class="title">序列号</span>
            <span class="text">{{ item.serial_number }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="resource-info info-wrapper">
        <div>
            <h3>CPU负载</h3>
            <div class="info-chart" id="cpu-percent-chart"></div>
        </div>
        <div style="margin: 20px 0">
            <h3>内存使用率</h3>
             <Progress :percent="resInfo.memory.percent || 30" :stroke-color="['#108ee9', '#87d068']" :stroke-width="30" text-outside />
        </div>
         <div>
            <h3>磁盘使用率</h3>
            <Progress :percent="resInfo.disk.percent || 30" :stroke-width="30" text-outside />
        </div>

    </div>
  </div>
</template>

<script>
import {getCpuOption, getNetworkOption} from '../echartOpt'
export default {
  data() {
    return {
      basicInfo: {},
      resInfo: {memory: {}, disk: {}},
      charts: {},
      intervalId: undefined
    };
  },

  mounted() {
    this.initChart()
    this.getBasicInfo();
    this.getResourceInfo();
    this.intervalId = setInterval(this.getResourceInfo, 30000)
  },
  destroyed() {
    this.intervalId && window.clearInterval(this.intervalId)
  },
  methods: {
      initChart() {
          this.charts = this.$echarts.init(document.getElementById("cpu-percent-chart"));
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
                percent:56
              },
              disk:{
                percent:35
              },
              cpu:{
                percent:43
              }
            };
            console.log("1111",this.resInfo)
            this.setChartNewVal()
        // this.$axios.get('getResInfo').then(res => {
        //     // this.resInfo = {
        //     //   memory:{
        //     //     percent:56
        //     //   },
        //     //   disk:{
        //     //     percent:35
        //     //   },
        //     //   cpu:{
        //     //     percent:43
        //     //   }
        //     // };
        //     // console.log(this.resInfo)
        //     // this.setChartNewVal()
        // })
    },

    setChartNewVal() {
        this.charts.setOption(getCpuOption(this.resInfo['cpu']), true)
        // this.charts.setOption(getNetworkOption(), true)
    }
  },
};
</script>

<style lang="less" scoped>
.info-view {
  display: flex;
}
.info-wrapper {
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  background: white;
}
.basic-info {
    margin: 10px;
    flex-grow: 1;
  .basic-info-container {
      .info-item {
      padding-left: 20px;
      display: flex;
      margin: 5px 0;
        .title {
            width: 90px;
            text-align: right;
            padding-right: 10px;
        }
        .text {
            padding-left: 5px;
            flex-grow: 1;
            background: gainsboro;
        }
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
        height: 200px;
        width: 100%;
    }
}
</style>