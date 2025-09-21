<template>
  <div class="index-wrapper">
    <div class="left-container">
      <div class="left-row row-1">
        <div class="data-block" id="topology-chart"></div>
        <div class="button-group-up">
          <Button
            shape="circle"
            type="primary"
            @click="startSwitching"
            :loading="loading"
            >LITOS</Button
          >
          <Button
            shape="circle"
            type="primary"
            @click="handlePredict"
            :loading="loading"
            >DDLP</Button
          >
          <Button
            shape="circle"
            type="primary"
            @click="handlePredict"
            :loading="loading"
            >3D-TES</Button
          ><Button
            shape="circle"
            type="primary"
            @click="handlePredict"
            :loading="loading"
            >TEAM</Button
          >
        </div>
        <div class="button-group">
          <!-- <button @click="button1Click">ROCKS</button>
          <button @click="button2Click">宽度学习</button>
          <button @click="button3Click">强化学习</button> -->
          <Button
            shape="circle"
            type="primary"
            @click="startSwitching"
            :loading="loading"
            >ROCKS</Button
          >
          <Button
            shape="circle"
            type="primary"
            @click="handlePredict"
            :loading="loading"
            >AREA</Button
          >
          <Button
            shape="circle"
            type="primary"
            @click="handlePredict"
            :loading="loading"
            >BTW-motif</Button
          ><Button
            shape="circle"
            type="primary"
            @click="handlePredict"
            :loading="loading"
            >ROMEM</Button
          >
        </div>
      </div>
      <!-- <div class="left-row row-2"></div> -->
    </div>
    <div class="right-container">
      <div class="right-row-1 right-data-block">
        <h3>网络参数</h3>
        <div class="info-item">
          <span class="title">网络大小</span>
          <div class="text">1200</div>
        </div>

        <div class="info-item">
          <span class="title">连边密度</span>
          <div class="text">2</div>
        </div>
        <div class="button-group2">
          <!-- <i class="ivu-icon ivu-icon-ios-search"></i> -->
          <Button
            shape="circle"
            type="primary"
            @click="handlePredict"
            :loading="loading"
            >确定</Button
          >
          <!-- <button @click="button4Click">确定</button> -->
        </div>
        <!-- <div class="info-item">
          <span class="title">度数分布</span>
          <div class="text">000</div>
        </div> -->
      </div>
      <div class="right-row-2 right-data-block">
        <div id="topology-degree"></div>
      </div>
      <div class="right-row-3 right-data-block">
        <div id="topology-curve"></div>
      </div>
      <!-- <div class="route-detail info-wrapper">
        <h3>路由展示：</h3>
      </div> -->
    </div>
  </div>
</template>

<script>
// import echarts from "echarts";
import { topologyOption } from "./Optimazation/chartOptions.js";
import { topologyDegreeOption } from "./Optimazation/chartDegreeOptions.js";
import { topologyCurveOption } from "./Optimazation/chartCurveOptions.js";
import { optimazationOptions } from "./Optimazation/10chartOptions.js";
import { topologyCurveOptions } from "./Optimazation/10curveOptions.js";
export default {
  data() {
    return {
      chart: null,
      degreeChart: null,
      curveChart: null,
    };
  },
  components: {},
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("topology-chart"));
    this.degreeChart = this.$echarts.init(
      document.getElementById("topology-degree")
    );
    this.curveChart = this.$echarts.init(
      document.getElementById("topology-curve")
    );
    this.setOptions();
    this.setDegreeOptions();
    this.setCurveOptions();
    this.degreeChart.resize();
    this.curveChart.resize();
  },
  destroyed() {},
  methods: {
    setOptions() {
      this.chart && this.chart.setOption(optimazationOptions[0]);
    },
    setDegreeOptions() {
      this.degreeChart && this.degreeChart.setOption(topologyDegreeOption);
    },
    setCurveOptions() {
      this.curveChart && this.curveChart.setOption(topologyCurveOptions[0]);
    },
    startSwitching() {
      let index = 1;
      const interval = setInterval(() => {
        if (index >= optimazationOptions.length) {
          clearInterval(interval);
          return;
        }
        this.chart.setOption(optimazationOptions[index]);
        this.curveChart.setOption(topologyCurveOptions[index]);
        // this.curveChart.appendData({ serialIndex: index * 20, data: [0.2] });
        index++;
      }, 1000);
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
    width: calc(~"100% - 300px");
    padding: 10px 0px 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    .data-block {
      padding: 10px;
      background: white;
      // border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    }

    .left-row {
      display: flex;
      justify-content: space-between;
    }

    #topology-chart {
      width: 100%;
      height: 570px;
    }

    // .row-2 {
    //   display: flex;
    //   margin-top: 10px;
    //   justify-content: space-between;
    // }

    .button-group-up {
      position: absolute;
      bottom: 60px;
      left: 0;
      right: 0;
      justify-content: space-between;
      width: 100%;
      display: flex;
      padding: 0 200px;
      button {
        min-width: 98px;
      }
    }
    .button-group {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      justify-content: space-between;
      width: 100%;
      display: flex;
      padding: 0 200px;
      button {
        min-width: 98px;
      }
      // button {
      //   background-color: #5a61ed; // 深蓝色背景
      //   color: white; // 白色文本
      //   border: 1px solid #4ea5ff; // 轻微的边框
      //   border-radius: 15px; // 轻微的圆角
      //   padding: 10px 20px; // 内边距
      //   font-size: 16px; // 文本大小
      //   cursor: pointer; // 更改鼠标指针的样式
      //   transition: background-color 0.3s; // 添加一个过渡效果

      //   &:hover {
      //     // 鼠标悬停时的样式
      //     background-color: #79bbff; // 浅蓝色
      //   }
      // }
    }
  }

  .right-container {
    margin-top: 10px;
    // border-radius: 5px;
    padding: 0 10px;
    // background: white;
    box-sizing: border-box;
    h3 {
      padding: 0px 5px 5px 5px;
      font-size: 16px;
      color: black;
    }
    .right-data-block {
      padding: 5px;
      background: white;
      // border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    }
    .right-row-1 {
      padding: 10px 10px 0px 10px;
      margin-bottom: 10px;
      // position: relative;
      height: 140px;

      .info-item {
        padding-left: 5px;
        vertical-align: top;
        margin: 5px 0;

        .title {
          display: inline-block;
          width: 90px;
          text-align: left;
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
      .button-group2 {
        // position: absolute;
        bottom: 30px;
        left: 0;
        right: 0;
        justify-content: center;
        width: 100%;
        display: flex;
        // padding: 0 300px;

        // button {
        //   background-color: #5a61ed; // 深蓝色背景
        //   color: white; // 白色文本
        //   border: 1px solid #4ea5ff; // 轻微的边框
        //   border-radius: 15px; // 轻微的圆角
        //   padding: 5px 10px; // 内边距
        //   font-size: 16px; // 文本大小
        //   cursor: pointer; // 更改鼠标指针的样式
        //   transition: background-color 0.3s; // 添加一个过渡效果

        //   &:hover {
        //     // 鼠标悬停时的样式
        //     background-color: #79bbff; // 浅蓝色
        //   }
        // }
      }
    }
    .right-row-2 {
      padding: 10px;
      margin-bottom: 10px;
      #topology-degree {
        width: 280px;
        height: 180px;
      }
    }
    .right-row-3 {
      padding: 10px 10px;
      margin-bottom: 10px;
      // justify-content: center;
      #topology-curve {
        width: 280px;
        height: 190px;
      }
    }
  }
}
</style>
