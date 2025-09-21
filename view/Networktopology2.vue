<template>
  <div class="view-wrapper topology-view">
    <div class="resource-info info-wrapper">
        <h3>实时节点数据流：</h3>
        <div class="info-chart" id="topology-chart"></div>
    </div>
    <div class="data-detail">
      <DataDetail :messages="messages"/>
    </div>
  </div>
</template>

<script>
import { getNetworkOption, topoVertex, initopoVertex2 } from "../echartOpt";
import DataDetail from '../components/Datadetail'
import echarts from 'echarts';
export default {
  data() {
    return {
      charts: {},
      edges: {}, // 节点连接关系
      mainVertexStatus: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 主节点状态
      activeEdges: {}, // 传输中的连接边
      topoVertex: {},
      unHandelQuery: [],
      messages: [],
    };
  },
  components: {DataDetail},
  mounted() {
    this.initChart();
    this.topoVertex = initopoVertex2();
    // this.setChartNewVal();

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

    setChartNewVal() {
      const links = [];
      const linesData = [];
      const topoVertex = this.topoVertex;
      
      // 首先处理一下主节点和网关的关系
      for (let i = 0; i < this.mainVertexStatus.length; i++) {
        this.mainVertexStatus[i] = topoVertex.masterVertex[i].category > 0 ? 1 : 0;
      }
      
      for (let i = 0; i < this.mainVertexStatus.length; i++) {
        if (this.mainVertexStatus[i] != 0) {
          links.push({
            source: topoVertex.gateway.name,
            target: topoVertex.masterVertex[i].name,
             lineStyle: {
              normal: {
                color: "#000000",
                curveness: 0.25,
                width: 3,
              },
            },
          });
        }
      }

      for (let s of Object.keys(this.edges)) {
        let v = this.edges[s];
        if (v != undefined && this.mainVertexStatus[v] != 0) {
          links.push({
            source: topoVertex.slaveVertex[s].name,
            target: topoVertex.masterVertex[v].name,
            lineStyle: {
              normal: {
                color: "#000000",
                curveness: -0.25,
                width: 3,
              },
            },
          });
        }
      }

      for (let s of Object.keys(this.activeEdges)) {
        let v = this.activeEdges[s];
        if (this.mainVertexStatus[v] != 0) {
          linesData.push([
            topoVertex.slaveVertex[s].value,
            topoVertex.masterVertex[v].value
          ],
          )} else {
            console.log(v, this.mainVertexStatus);
        }
      }
      this.charts.setOption(getNetworkOption(this.topoVertex, links, linesData), true);
    },

    addSlaveToMasterEdge(s, v) {
      // 默认 s是子节点，v是主节点
      this.edges[s] = v;
    },
    addActiveedge(s, v) {
      //添加active边
      this.activeEdges[s] = v;
    },
    switchSlavestatus(p,s) //切换子节点形态
    {
      this.topoVertex.slaveVertex[p].category = s;
    },
    switchMasterstatus(p,s) //切换主节点形态
    {
      this.topoVertex.masterVertex[p].category = s;
      this.mainVertexStatus[p] = s;
    },

    handleNewData(data) {
      if (data instanceof Array) {
        this.unHandelQuery = this.unHandelQuery.concat(data)
      } else if(data instanceof Object) {
        this.unHandelQuery.push(data)
      }
      if(this.unHandelQuery.length >= 10) {
        const items = this.unHandelQuery
        items.map(item => {
          let {breakmain, breakson, edge, message} = item
          for(let _ = 0; _ < (breakmain || []).length; _ ++) {
            if(this.topoVertex.masterVertex[_].category + breakmain[_] == 1) {
              this.switchMasterstatus(_, breakmain[_] == 0 ? 0 : 1)
            }
          }
          for(let _ = 0; _ < (breakson || []).length; _ ++) {
            if((this.topoVertex.slaveVertex[_].category + breakson[_]) == 1){
              this.switchSlavestatus(_, breakson[_] == 0? 0 : 1)
            }
          }

          this.addSlaveToMasterEdge(edge[0] - 1, edge[1] - 1)
          this.addActiveedge(edge[0] - 1, edge[1] - 1)
          this.switchSlavestatus(edge[0] - 1, 2)
          this.switchMasterstatus(edge[1] - 1, 2)
        })
        this.messages = items;
        this.unHandelQuery = []
        this.setChartNewVal()

        setTimeout(this.handleResetActiveStatus, 4000)
      }
    },

    handleResetActiveStatus() {
      const topoVertex = this.topoVertex
      for(let _ = 0; _ < topoVertex.slaveVertex.length; _ ++) {
        if(topoVertex.slaveVertex[_].category == 2){
          topoVertex.slaveVertex[_].category = 1
        }
      }
      for(let _ = 0; _ < topoVertex.masterVertex.length; _ ++) {
        if(topoVertex.masterVertex[_].category == 2){
          topoVertex.masterVertex[_].category = 1
        }
      }
      this.activeEdges = {}
      this.setChartNewVal()
    }
  },
};
</script>

<style lang="less" scoped>
.topology-view {
  display: flex;
  padding-top: 10px;
  height: calc(~'100vh - 60px');
  .info-wrapper {
    padding: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
   // background: #40444F;
    background-image:url('../assets/zoulang.png');
   
    background-size:100% 100%;
  }
  .resource-info {
    height: 100%;
    flex-grow: 1;
    margin: 0 10px;
    width:80%;
    h3 {
      margin-bottom: 10px;
      color: black;
    }
    .info-chart {
      padding: 10px;
      height: calc(~'100% - 40px');
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