<template>
  <div class="index-wrapper">
    <div class="left-container">
      <div class="left-row row-1" v-if="overview.length > 0">
        <div
          class="data-block overview"
          v-for="(item,_) in overview"
          :key="item.name"
        >
          <div class="title">{{ item.name }}</div>
          <div class="value">
            <countTo
              :start-val="0"
              :end-val="item.value"
              :duration="2000"
            ></countTo>
          </div>
          <div class="background-animation" :style="{backgroundImage: bgAnimUrl[_]}"/>
        </div>
      </div>
      <div class="left-row row-2">
        <div class="data-block" id="overview-bar"></div>
      </div>
      <div class="left-row row-3">
        <div class="data-block on-off-line" id="node-pie" />
        <div class="data-block mcs-count" id="mcs-line" />
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

import {
  getMultiBarOption,
  getMultiPieOption,
  getMcsPinaoLine,
  formatUnixtimestamp,
} from "../common";
export default {
  data() {
    return {
      overview: [],
      overBar: undefined,
      nodePie: undefined,
      mcsCount: undefined,
      calendarLevel: {},
      bgAnimUrl: [],
    };
  },
  components: { countTo, GatewayInfo },
  mounted() {
    for(let _ = 0; _ <= 2; _ ++) {
      this.bgAnimUrl.push('url(' + require(`../assets/bg-anim-${_}.png`) + ')')
    }
    this.overBar = this.$echarts.init(document.getElementById("overview-bar"));
    this.nodePie = this.$echarts.init(document.getElementById("node-pie"));
    this.mcsCount = this.$echarts.init(document.getElementById("mcs-line"));
    this.getOverview();
    this.getOverViewBar();
    this.getEdgePie();
    this.getMcsPinaoLine();
  },

  methods: {
    getOverview() {
      this.$axios.get("/overview").then((res) => {
        this.overview = res.data || [];
      });
    },
    getOverViewBar() {
      const weeks = ["一", "二", "三", "四", "五", "六", "日"];
      const day = new Date().getDay();
      const axixs = [];
      for (let _ = 6; _ >= 0; _--) {
        axixs.push("周" + weeks[(day + 6 - _) % 7]);
      }

      this.$axios.get("/overBar").then((res) => {
        const data = res.data;
        const legend = data.map((item) => {
          return item.name;
        });
        const barData = data.map((item) => {
          return item.value;
        });
        this.overBar &&
          this.overBar.setOption(getMultiBarOption(legend, axixs, barData));
      });
    },
    getEdgePie() {
      const data = [
        { name: "在线Worker", value: 100 },
        { name: "作业负载率", value: 25 },
        { name: "CPU使用率", value: 20 },
        { name: "内存使用率", value: 87 },
      ];

      this.nodePie && this.nodePie.setOption(getMultiPieOption(data));
    },

    getMcsPinaoLine() {
      const data = [];
      this.mcsCount && this.mcsCount.setOption(getMcsPinaoLine(data));
    },
  },
};
</script>
<style lang="less">
.index-wrapper {
  display: flex;
  padding-bottom: 10px;
  align-items: stretch;
  .left-container {
    width: calc(~"100% - 348px");
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .left-row {
      display: flex;
      justify-content: space-between;
    }    .row-1 .overview {
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
      &:hover .background-animation{
        transition: all 0.5s steps(20, end);
        background-position-y: -2560px;
      }
    }

    .row-3 {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
    }

    .data-block {
      padding: 10px;
      background: white;
      // border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    }

    #overview-bar {
      width: 100%;
      height: 440px;
    }

    #node-pie {
      width: 33%;
      height: 380px;
    }

    #mcs-line {
      width: 65%;
      height: 380px;
      overflow: hidden;
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

@keyframes bgAnim {
  0% {background-position-y: 0px;}
  5% {background-position-y: -128px;}
  10% {background-position-y: -256px;}
  15% {background-position-y: -384px;}
  20% {background-position-y: -512px;}
  25% {background-position-y: -640px;}
  30% {background-position-y: -768px;}
  35% {background-position-y: -896px;}
  40% {background-position-y: -1024px;}
  45% {background-position-y: -1152px;}
  50% {background-position-y: -1280px;}
  55% {background-position-y: -1408px;}
  60% {background-position-y: -1536px;}
  65% {background-position-y: -1664px;}
  70% {background-position-y: -1792px;}
  75% {background-position-y: -1920px;}
  80% {background-position-y: -2048px;}
  85% {background-position-y: -2176px;}
  90% {background-position-y: -2304px;}
  95% {background-position-y: -2432px;}
  100% {background-position-y: -2560px;}
}
</style>