<template>
  <div class="wrapper" id="wrapper">
    <div id="search">
      <div id="input">
        分片数量：
        <el-input
          placeholder="请输入分片数量"
          v-model="input1"
          style="width: 10vw"
        >
        </el-input>
        <el-button type="success" @click="goOverlapSharding"
          >执行分片</el-button
        >
      </div>
    </div>
    <div id="info">
      <div id="description">
        <el-descriptions
          title="拓扑信息"
          direction="vertical"
          :column="1"
          border
        >
          <el-descriptions-item label="配置名">test</el-descriptions-item>
          <el-descriptions-item label="种类">无标度网络</el-descriptions-item>
          <el-descriptions-item label="节点数量">61</el-descriptions-item>
          <el-descriptions-item label="区块大小">1024</el-descriptions-item>
          <el-descriptions-item label="确认速度">6</el-descriptions-item>
          <el-descriptions-item label="仿真步长">1</el-descriptions-item>
          <el-descriptions-item label="区块同步率">0.85</el-descriptions-item>
          <el-descriptions-item label="单位区块交易数"
            >2048</el-descriptions-item
          >
        </el-descriptions>
      </div>
    </div>
    <div id="pic">
      <div id="fullpic"></div>
    </div>
  </div>
</template>
  
  <script>
import G6 from "@antv/g6";

export default {
  name: "FullPic",
  mounted() {
    this.Generate();
  },
  data() {
    return {
      input1: "",
      data: {
        nodes: [
          {
            id: "0",
            label: "0",
            cluster: "1,2",
          },
          {
            id: "1",
            label: "1",
            cluster: "1,2",
          },
          {
            id: "2",
            label: "2",
            cluster: "1,4",
          },
          {
            id: "3",
            label: "3",
            cluster: "1",
          },
          {
            id: "4",
            label: "4",
            cluster: "1",
          },
          {
            id: "5",
            label: "5",
            cluster: "1",
          },
          {
            id: "6",
            label: "6",
            cluster: "1",
          },
          {
            id: "7",
            label: "7",
            cluster: "1",
          },
          {
            id: "8",
            label: "8",
            cluster: "1",
          },
          {
            id: "9",
            label: "9",
            cluster: "1",
          },
          {
            id: "10",
            label: "10",
            cluster: "1",
          },
          {
            id: "11",
            label: "11",
            cluster: "1",
          },
          {
            id: "12",
            label: "12",
            cluster: "1,3",
          },
          {
            id: "13",
            label: "13",
            cluster: "2",
          },
          {
            id: "14",
            label: "14",
            cluster: "2",
          },
          {
            id: "15",
            label: "15",
            cluster: "2",
          },
          {
            id: "16",
            label: "16",
            cluster: "2",
          },
          {
            id: "17",
            label: "17",
            cluster: "2",
          },
          {
            id: "18",
            label: "18",
            cluster: "3",
          },
          {
            id: "19",
            label: "19",
            cluster: "3",
          },
          {
            id: "20",
            label: "20",
            cluster: "2,3",
          },
          {
            id: "21",
            label: "21",
            cluster: "3",
          },
          {
            id: "22",
            label: "22",
            cluster: "1,3",
          },
          {
            id: "23",
            label: "23",
            cluster: "3",
          },
          {
            id: "24",
            label: "24",
            cluster: "2,3",
          },
          {
            id: "25",
            label: "25",
            cluster: "3",
          },
          {
            id: "26",
            label: "26",
            cluster: "3",
          },
          {
            id: "27",
            label: "27",
            cluster: "3",
          },
          {
            id: "28",
            label: "28",
            cluster: "3",
          },
          {
            id: "29",
            label: "29",
            cluster: "3",
          },
          {
            id: "30",
            label: "30",
            cluster: "1,3",
          },
          {
            id: "31",
            label: "31",
            cluster: "4",
          },
          {
            id: "32",
            label: "32",
            cluster: "4",
          },
          {
            id: "33",
            label: "33",
            cluster: "2,4",
          },
          {
            id: "34",
            label: "34",
            cluster: "2",
          },
          {
            id: "35",
            label: "35",
            cluster: "1,2",
          },
          {
            id: "36",
            label: "36",
            cluster: "3",
          },
          {
            id: "37",
            label: "37",
            cluster: "2,3",
          },
          {
            id: "38",
            label: "38",
            cluster: "2",
          },
          {
            id: "39",
            label: "39",
            cluster: "1",
          },
          {
            id: "40",
            label: "40",
            cluster: "1,4",
          },
          {
            id: "41",
            label: "41",
            cluster: "2,3",
          },
          {
            id: "42",
            label: "42",
            cluster: "3",
          },
          {
            id: "43",
            label: "43",
            cluster: "3",
          },
          {
            id: "44",
            label: "44",
            cluster: "1",
          },
          {
            id: "45",
            label: "45",
            cluster: "2,4",
          },
          {
            id: "46",
            label: "46",
            cluster: "3",
          },
          {
            id: "47",
            label: "47",
            cluster: "1,4",
          },
          {
            id: "48",
            label: "48",
            cluster: "2",
          },
          {
            id: "49",
            label: "49",
            cluster: "2,3",
          },
          {
            id: "50",
            label: "50",
            cluster: "1",
          },
          {
            id: "51",
            label: "51",
            cluster: "1,2",
          },
          {
            id: "52",
            label: "52",
            cluster: "3",
          },
          {
            id: "53",
            label: "53",
            cluster: "2,4",
          },
          {
            id: "54",
            label: "54",
            cluster: "2",
          },
          {
            id: "55",
            label: "55",
            cluster: "4",
          },
          {
            id: "56",
            label: "56",
            cluster: "1,2",
          },
          {
            id: "57",
            label: "57",
            cluster: "1",
          },
          {
            id: "58",
            label: "58",
            cluster: "1",
          },
          {
            id: "59",
            label: "59",
            cluster: "1,2",
          },
          {
            id: "60",
            label: "60",
            cluster: "3",
          },
          {
            id: "61",
            label: "61",
            cluster: "1,4",
          },
        ],
        edges: [
          {
            source: "0",
            target: "1",
          },
          {
            source: "0",
            target: "2",
          },
          {
            source: "0",
            target: "3",
          },
          {
            source: "0",
            target: "4",
          },
          {
            source: "0",
            target: "5",
          },
          {
            source: "0",
            target: "7",
          },
          {
            source: "0",
            target: "8",
          },
          {
            source: "0",
            target: "9",
          },
          {
            source: "0",
            target: "10",
          },
          {
            source: "0",
            target: "11",
          },
          {
            source: "0",
            target: "13",
          },
          {
            source: "0",
            target: "14",
          },
          {
            source: "0",
            target: "15",
          },
          {
            source: "0",
            target: "16",
          },
          {
            source: "2",
            target: "3",
          },
          {
            source: "4",
            target: "5",
          },
          {
            source: "4",
            target: "6",
          },
          {
            source: "5",
            target: "6",
          },
          {
            source: "7",
            target: "13",
          },
          {
            source: "8",
            target: "14",
          },
          {
            source: "9",
            target: "10",
          },
          {
            source: "10",
            target: "22",
          },
          {
            source: "10",
            target: "14",
          },
          {
            source: "10",
            target: "12",
          },
          {
            source: "10",
            target: "24",
          },
          {
            source: "10",
            target: "21",
          },
          {
            source: "10",
            target: "20",
          },
          {
            source: "11",
            target: "24",
          },
          {
            source: "11",
            target: "22",
          },
          {
            source: "11",
            target: "14",
          },
          {
            source: "12",
            target: "13",
          },
          {
            source: "16",
            target: "17",
          },
          {
            source: "16",
            target: "18",
          },
          {
            source: "16",
            target: "21",
          },
          {
            source: "16",
            target: "22",
          },
          {
            source: "17",
            target: "18",
          },
          {
            source: "17",
            target: "20",
          },
          {
            source: "18",
            target: "19",
          },
          {
            source: "19",
            target: "20",
          },
          {
            source: "19",
            target: "33",
          },
          {
            source: "19",
            target: "22",
          },
          {
            source: "19",
            target: "23",
          },
          {
            source: "20",
            target: "21",
          },
          {
            source: "21",
            target: "22",
          },
          {
            source: "22",
            target: "24",
          },
          {
            source: "22",
            target: "25",
          },
          {
            source: "22",
            target: "26",
          },
          {
            source: "22",
            target: "23",
          },
          {
            source: "22",
            target: "28",
          },
          {
            source: "22",
            target: "30",
          },
          {
            source: "22",
            target: "31",
          },
          {
            source: "22",
            target: "32",
          },
          {
            source: "22",
            target: "33",
          },
          {
            source: "23",
            target: "28",
          },
          {
            source: "23",
            target: "27",
          },
          {
            source: "23",
            target: "29",
          },
          {
            source: "23",
            target: "30",
          },
          {
            source: "23",
            target: "31",
          },
          {
            source: "23",
            target: "33",
          },
          {
            source: "32",
            target: "33",
          },
          {
            source: "22",
            target: "35",
          },
          {
            source: "30",
            target: "39",
          },
          {
            source: "39",
            target: "44",
          },
          {
            source: "39",
            target: "40",
          },
          {
            source: "22",
            target: "44",
          },
          {
            source: "40",
            target: "44",
          },
          {
            source: "39",
            target: "47",
          },
          {
            source: "44",
            target: "50",
          },
          {
            source: "39",
            target: "50",
          },
          {
            source: "47",
            target: "51",
          },
          {
            source: "44",
            target: "56",
          },
          {
            source: "56",
            target: "57",
          },
          {
            source: "57",
            target: "58",
          },
          {
            source: "47",
            target: "59",
          },
          {
            source: "56",
            target: "61",
          },
          {
            source: "31",
            target: "32",
          },
          {
            source: "31",
            target: "40",
          },
          {
            source: "32",
            target: "45",
          },
          {
            source: "31",
            target: "45",
          },
          {
            source: "40",
            target: "47",
          },
          {
            source: "47",
            target: "53",
          },
          {
            source: "53",
            target: "55",
          },
          {
            source: "53",
            target: "66",
          },
          {
            source: "30",
            target: "36",
          },
          {
            source: "30",
            target: "37",
          },
          {
            source: "36",
            target: "41",
          },
          {
            source: "41",
            target: "42",
          },
          {
            source: "41",
            target: "43",
          },
          {
            source: "37",
            target: "46",
          },
          {
            source: "43",
            target: "49",
          },
          {
            source: "46",
            target: "52",
          },
          {
            source: "41",
            target: "60",
          },
          {
            source: "33",
            target: "34",
          },
          {
            source: "33",
            target: "35",
          },
          {
            source: "33",
            target: "37",
          },
          {
            source: "35",
            target: "38",
          },
          {
            source: "24",
            target: "41",
          },
          {
            source: "38",
            target: "45",
          },
          {
            source: "41",
            target: "48",
          },
          {
            source: "48",
            target: "49",
          },
          {
            source: "48",
            target: "51",
          },
          {
            source: "51",
            target: "53",
          },
          {
            source: "53",
            target: "54",
          },
          {
            source: "49",
            target: "56",
          },
          {
            source: "53",
            target: "59",
          },
          {
            source: "35",
            target: "51",
          },
          {
            source: "35",
            target: "56",
          },
          {
            source: "51",
            target: "56",
          },
          {
            source: "2",
            target: "40",
          },
          {
            source: "2",
            target: "47",
          },
          {
            source: "40",
            target: "61",
          },
          {
            source: "20",
            target: "24",
          },
          {
            source: "20",
            target: "37",
          },
          {
            source: "24",
            target: "41",
          },
          {
            source: "37",
            target: "49",
          },
          {
            source: "22",
            target: "30",
          },
          {
            source: "22",
            target: "12",
          },
          {
            source: "33",
            target: "45",
          },
          {
            source: "33",
            target: "53",
          },
        ],
      },
    };
  },
  methods: {
    Generate() {
      var DivWidth = document.getElementById("pic").clientWidth;
      var DivHeight = document.getElementById("pic").clientHeight - 36;
      const graph = new G6.Graph({
        container: "fullpic",
        width: DivWidth,
        height: DivHeight,
        fitView: true,
        fitCenter: true,
        layout: {
          type: "force2",
          // animate: true,
          maxSpeed: 100,
          linkDistance: 50,
          clustering: true,
          // nodeClusterBy: 'cluster',
          clusterNodeStrength: 300,
        },
        defaultEdge: {
          type: "line",
          style: {
            stroke: "#A3B1BF",
            endArrow: {
              // 设置终点箭头
              path: G6.Arrow.vee(8, 6, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
              d: 0,
              fill: "#000",
            },
          },
        },
        defaultNode: {
          size: 30,
          style: {
            fill: "#81D8D0",
            stroke: "#81D8D0",
          },
        },
        modes: {
          default: ["zoom-canvas", "drag-canvas"],
        },
      });

      graph.data(this.data);
      graph.render();
    },
    goOverlapSharding() {
      this.$router.push({
        path: "/sharding/overlap",
      });
    },
  },
};
</script>
  
  <style>
#wrapper {
  display: grid;
  grid-template-columns: 30% 67%;
  height: 100vh;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-top: 2vh;
  margin-left: 1.5vw;
}

#pic {
  background-color: white;
}

#info {
  background-color: white;
}

#description {
  margin-left: 2vw;
  margin-right: 2vw;
  text-align: center;
}

#search {
  grid-column-start: 1;
  grid-column-end: 3;
  height: 8vh;
  background-color: white;
}

#input {
  margin-top: 1.5vh;
  text-align: center;
}
</style>
  