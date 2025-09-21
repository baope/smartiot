<template>
  <div class="view-wrapper topology-view">
    <div class="resource-info info-wrapper">
      <h3>实时节点数据：</h3>
      <div class="info-chart" id="topology-chart"></div>
    </div>
    <div class="data-detail">
      <DataDetail :messages="messages" :edge="edge" />
    </div>
  </div>
</template>

<script>
import {
  getNetworkOption,
  topoVertex,
  initopoVertex,
  iniadhocnet,
  getAdhocnet,
} from "../echartOpt";
import DataDetail from "../components/Datadetail2.vue";

import echarts from "echarts";
export default {
  data() {
    return {
      charts: {},
      // edges: {}, // 节点连接关系
      //  mainVertexStatus: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 主节点状态
      // activeEdges: {}, // 传输中的连接边
      //topoVertex: {},
      unHandelQuery: [],
      messages: [],
      edge: undefined,
    };
  },
  components: { DataDetail },
  mounted() {
    this.initChart();
    this.topoVertex = initopoVertex();
    this.setChartNewVal();

    this.$axios.get("/topology/getByFilter").then(res => {
     this.handleNewData(res.data);
    })
  },
  destroyed() {},
  methods: {
    initChart() {
      this.charts = this.$echarts.init(
        document.getElementById("topology-chart")
      );
    },

    handleNewData(data) {
      if (data instanceof Array) {
        this.unHandelQuery = this.unHandelQuery.concat(data)
      } else if(data instanceof Object) {
        this.unHandelQuery.push(data)
      }
      if(this.unHandelQuery.length >= 10) {
        const items = this.unHandelQuery;
        const messages = []
        items.map(item => {
          let { edge, message} = item;
          (message || []).map(msg => {
            console.log(msg)
            messages.push({
              source: edge[0],
              target: edge[1],
              name: msg.name,
              value: msg.value
            })
          })
        })
        this.messages = messages;
        this.unHandelQuery = []
      }
    },

    setChartNewVal() {
      this.charts.setOption(getAdhocnet());
    },

  },
};
</script>

<style lang="less" scoped>
.topology-view {
  display: flex;
  padding-top: 10px;
  height: calc(~"100vh - 60px");
  .info-wrapper {
    padding: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    // background: #40444F;
    // background-image:url('../assets/tpbg9.png');

    //background-size:100% 100%;
    background-color: white;
  }
  .resource-info {
    height: 100%;
    flex-grow: 1;
    margin: 0 10px;
    width: 80%;
    h3 {
      margin-bottom: 10px;
      color: black;
    }
    .info-chart {
      padding: 10px;
      height: calc(~"100% - 40px");
      width: 100%;
    }
  }
  .data-detail {
    padding: 10px;
    height: 100%;
    overflow-y: auto;
    width: 450px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    background: white;
  }
}
</style>