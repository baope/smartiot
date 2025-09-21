<template>
  <div class="wraper">
    <!------------------------- 搜索框Body  -------------------------------->
    <div class="searchBox">
      <div class="searchBoxHeader">
        <p>可重叠分片搜索</p>
        <i class="el-icon-search"></i>
      </div>
      <div class="searchBoxBody-Node">
        <p class="searchBoxBody-Node-p">节点数</p>
        <div class="compareSign">
          <p>比较符:</p>
          <div class="signSeleter">
            <el-select v-model="compare" clearable placeholder="请选择比较符">
              <el-option
                v-for="item in compareSign"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="compareInput">
          <p>操作数:</p>
          <div class="numberInput">
            <el-input
              v-model="nodeNumber"
              placeholder="请输入节点数量"
            ></el-input>
          </div>
        </div>
        <div class="searchBoxBody-Node-button">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchByNodeNumber"
            >搜索</el-button
          >
        </div>
      </div>
      <div class="searchBoxBody-Sharding">
        <p>分片ID</p>
        <div class="searchBoxBody-Sharding-selector">
          <el-select
            v-model="selectSharding"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in sharingNumberArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="searchBoxBody-Sharding-button">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchBySharding"
            >搜索</el-button
          >
        </div>
      </div>
      <!------------------------- 分割符  -------------------------------->
      <div
        style="width: 100%; border-bottom: 1px #eee solid; margin-top: 1vh"
      ></div>
    </div>

    <div class="overlapSharding-title">
      <p>可重叠分片拓扑</p>
      <i class="el-icon-info"></i>
    </div>

    <!------------------------- 分片拓扑图  -------------------------------->
    <div class="sharding-topologys" id="ShardingGraphs"></div>

    <!------------------------- 分页 -------------------------------->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :page-count="pageSize"
        :hide-on-single-page="showPage"
      ></el-pagination>
    </div>
  </div>
</template>
  
  <script>
import ElementUI from "element-ui";
import G6, { G6GraphEvent } from "@antv/g6";
import { compileToFunctions } from "vue-template-compiler";
import { clone } from "@antv/util";

export default {
  name: "OverlapSharding",
  mounted() {
    this.initGenerate();
    for (let i = 1; i <= this.shardingCount; i++) {
      // 生成4个盒子
      this.createTopoBox(i, i);
    }
    const myDiv = document.querySelector(".sharding-topology-content");
    for (let i = 1; i <= this.shardingCount; i++) {
      // 生成拓扑图
      this.generateGraph(
        myDiv.clientWidth,
        myDiv.clientHeight,
        this.shardingData[i - 1],
        "shardingGraph" + i
      );
    }
  },
  data() {
    return {
      shardingCount: 4, // 分片数，应该从其他页面传过来
      pageSize: 1, // 页码，初始一页不显示
      currentPage: 1, // 当前页
      pageCount: 2, // 每页显示的拓扑图行数
      showPage: true, // 是否显示分页
      combinations: [], // 组合数数组
      nodeNumber: "", // 比较节点数（动态绑定）
      compare: "", // 比较符（动态绑定）
      selectSharding: [], // 选择的分片（动态绑定）
      sharingNumberArray: [
        {
          value: 1,
          label: "分片1",
        },
        {
          value: 2,
          label: "分片2",
        },
        {
          value: 3,
          label: "分片3",
        },
        {
          value: 4,
          label: "分片4",
        },
      ],
      shardingData: [], // init过后的各个分片的数据数组（nodes，edges）
      compareSign: [
        // 操作符号列表
        {
          value: ">",
          label: ">",
        },
        {
          value: "==",
          label: "=",
        },
        {
          value: "<",
          label: "<",
        },
        {
          value: ">=",
          label: ">=",
        },
        {
          value: "<=",
          label: "<=",
        },
      ],
      // 区块链分片数据
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
      colors: [
        "#FF4136",
        "#2ECC40",
        "#0074D9",
        "#FF851B",
        "#FFDC00",
        "#B10DC9",
        "#39CCCC",
        "#FF6EB4",
        "#FFD700",
        "#3D9970",
        "#FF4136",
        "#FF725C",
        "#7FDBFF",
        "#F012BE",
        "#01FF70",
        "#85144b",
        "#3D9970",
        "#F012BE",
        "#2ECC40",
        "#FF851B",
      ],
      strokes: [
        "#5B8FF9",
        "#5AD8A6",
        "#5D7092",
        "#F6BD16",
        "#E8684A",
        "#6DC8EC",
        "#9270CA",
        "#FF9D4D",
        "#269A99",
        "#FF99C3",
      ],
    };
  },
  methods: {
    // 页面初始化，求出节点分片的数组
    initGenerate() {
      var nodes = this.data.nodes;
      var clusterId = 0;
      var clusterMap = new Map();
      var that = this;
      nodes.forEach(function (node) {
        if (node.cluster && clusterMap.get(node.cluster) === undefined) {
          clusterMap.set(node.cluster, clusterId);
          clusterId++;
        }
        let cid = clusterMap.get(node.cluster);
        if (!node.style) {
          node.style = {};
        }
      });
      console.log(clusterMap);
      for (var i = 1; i <= this.shardingCount; i++) {
        let ShardData = {
          nodes: [],
          edges: [],
        };

        for (var j = 0; j < that.data.nodes.length; j++) {
          //挑选出对应的节点
          let ShardList = that.data.nodes[j].cluster.split(",");
          if (ShardList.indexOf(i.toString()) != -1) {
            ShardData.nodes.push(that.data.nodes[j]);
          }
        }

        function EdgeinShard(x) {
          //判断边的两个端点是否在同一个分区的函数
          for (var k = 0; k < ShardData.nodes.length; k++) {
            if (ShardData.nodes[k].id == x) {
              return true;
            }
          }
          return false;
        }

        for (var j = 0; j < that.data.edges.length; j++) {
          //挑选出对应的边
          if (
            EdgeinShard(that.data.edges[j].source) &&
            EdgeinShard(that.data.edges[j].target)
          ) {
            ShardData.edges.push(that.data.edges[j]);
          }
        }

        for (var k = 0; k < ShardData.nodes.length; k++) {
          //为节点填充颜色
          ShardData.nodes[k].style.fill =
            that.colors[
              clusterMap.get(ShardData.nodes[k].cluster) % that.colors.length
            ];
          ShardData.nodes[k].style.stroke =
            that.strokes[i % that.strokes.length];
        }

        // 存储分片信息
        this.shardingData.push(ShardData);
      }
    },
    // 创建拓扑盒子
    createTopoBox(id, title) {
      var container = document.getElementById("ShardingGraphs");
      var box = document.createElement("div");
      box.className = "sharding-topology";
      box.id = "shardingAsc" + id;
      var h2 = document.createElement("h2");
      h2.className = "sharding-topology-title";
      h2.textContent = `分片${title}拓扑图`;
      var graph = document.createElement("div");
      graph.className = "sharding-topology-content";
      graph.id = "shardingGraph" + id;
      box.appendChild(h2);
      box.appendChild(graph);
      container.appendChild(box);
    },
    // 删除所有的拓扑div盒子
    destoryContainer() {
      const MyDiv = document.getElementById("ShardingGraphs");
      var clientWidth = MyDiv.firstChild.clientWidth;
      var clientHeight = MyDiv.firstChild.clientHeight;
      while (MyDiv.firstChild) {
        MyDiv.removeChild(MyDiv.firstChild);
      }
      return {
        clientWidth,
        clientHeight,
      };
    },
    // 生成拓扑图
    generateGraph(gwidth, gheight, data, container) {
      // 提示框
      // 创建 Tooltip 实例
      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 20,
        // 允许出现 tooltip 的 item 类型
        itemTypes: ["node"],
        showTitle: true, // 显示标题
        // 自定义 tooltip 内容
        getContent(e) {
          const outDiv = document.createElement("tooltipDiv");
          outDiv.style.width = "fit-content";
          outDiv.innerHTML = `
                  <h4>节点${e.item.getModel().id}信息</h4>
                  <ul>
                    <li>分片: ${e.item.getModel().cluster}</li>
                    <li>配色: ${e.item.getModel().style.fill}</li>
                  </ul>`;
          return outDiv;
        },
      });

      let graph = new G6.Graph({
        container: container,
        width: gwidth,
        height: gheight,
        fitCenter: true,
        layout: {
          type: "force2",
          preventOverlap: true,
          maxSpeed: 100,
          linkDistance: 50,
          clustering: true,
          nodeClusterBy: "cluster",
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
        modes: {
          default: ["zoom-canvas", "drag-canvas"],
        },
        plugins: [tooltip], // 提示框
      });
      graph.data(data);
      graph.render();
      graph.zoom(0.6);
      // 获取画布对象
      const canvas = graph.get("canvas");
      // 获取布局结果的边界框
      const nodes = graph.getNodes();
      const nodeBBoxes = nodes.map((node) => node.get("keyShape").getBBox());
      const bbox = {
        minX: Math.min(...nodeBBoxes.map((bbox) => bbox.minX)),
        minY: Math.min(...nodeBBoxes.map((bbox) => bbox.minY)),
        maxX: Math.max(...nodeBBoxes.map((bbox) => bbox.maxX)),
        maxY: Math.max(...nodeBBoxes.map((bbox) => bbox.maxY)),
      };
      // 计算布局结果的中心点
      const cx = (bbox.minX + bbox.maxX) / 2;
      const cy = (bbox.minY + bbox.maxY) / 2;
      // 获取画布中心点的坐标
      const centerX = canvas.get("width") / 2;
      const centerY = canvas.get("height") / 2;
      // 计算需要平移的距离
      const dx = centerX - cx;
      const dy = centerY - cy;
      // 平移画布
      canvas.translate(dx, dy);

      // 点击拓扑跳转详细拓扑页面
      graph.on("canvas:click", (event) => {
        // 获取Graph实例中的所有节点和边
        const nodes = graph.getNodes();
        const edges = graph.getEdges();
        var passNodes = new Array();
        var passEdges = new Array();
        nodes.forEach((node) => {
          const model = node.getModel();
          passNodes.push({
            id: model.id,
            label: model.label,
            cluster: model.cluster,
          });
        });
        edges.forEach((edge) => {
          const model = edge.getModel();
          passEdges.push({
            source: model.source,
            target: model.target,
          });
        });
        //添加点击事件，取下一个页面
        this.$router.push({
          path: "/graphDetail",
          query: {
            nodes: JSON.stringify(passNodes),
            edges: JSON.stringify(passEdges),
          },
        });
      });
    },
    // 表达式检查
    beforeSearch(kind) {
      if (kind == 1) {
        if (this.compare == "") {
          alert("请选择比较符");
          return false;
        }
        if (
          isNaN(Number(this.nodeNumber, 10)) ||
          Number(this.nodeNumber, 10) < 0
        ) {
          alert("请填入大于0的数字");
          return false;
        }
      } else if (kind == 2) {
        if (this.selectSharding.length == 0) {
          alert("请选择查询分片");
          return false;
        }
      }
      return true;
    },
    // 根据节点数量的搜索的函数
    searchByNodeNumber() {
      if (!this.beforeSearch(1)) return;
      var { clientWidth, clientHeight } = this.destoryContainer();
      var number = Number(this.nodeNumber, 10);
      for (let i = 0; i < this.shardingData.length; i++) {
        let exp =
          "" + this.shardingData[i].nodes.length + this.compare + number;
        if (eval(exp)) {
          this.createTopoBox(i, i + 1);
          this.generateGraph(
            clientWidth,
            clientHeight,
            this.shardingData[i],
            "shardingGraph" + i
          );
        }
      }
    },
    // 计算两个分片的公共节点
    computeIntersection(sharding1, sharding2) {
      // 由于nodes和edges的地址是初始化时就分配好了的，
      //G6仅仅是将nodes和edges扩展了一些属性和方法，未改变nodes和edges集合元素的地址，
      // 而sharding1，sharding数组仅仅是将节点push进去
      // 因此可用Set直接比较对象(实际只比较地址)寻找交集，非常方便
      const set1 = new Set(sharding1.nodes);
      const nodesIntersection = sharding2.nodes.filter((value) =>
        set1.has(value)
      );
      const set2 = new Set(sharding1.edges);
      const edgesIntersection = sharding2.edges.filter((value) =>
        set2.has(value)
      );
      return {
        nodes: nodesIntersection,
        edges: edgesIntersection,
      };
    },
    // 计算组合数，使用组合数数组
    generateCombination(datas) {
      for (let i = 0; i < datas.length; i++) {
        for (let j = i + 1; j < datas.length; j++) {
          this.combinations.push({
            left: i,
            right: j,
          });
        }
      }
    },
    // 改变当前页
    handleCurrentChange(val) {
      // 销毁div盒子
      var { clientWidth, clientHeight } = this.destoryContainer();
      this.currentPage = val;
      // 取得组合数数组索引
      var index = (this.currentPage - 1) * this.pageCount;
      // 渲染一页的拓扑图
      for (
        let i = 0;
        i < this.pageCount && index < this.combinations.length;
        i++
      ) {
        var selectData1 = this.shardingData[this.combinations[index + i].left];
        var selectData2 = this.shardingData[this.combinations[index + i].right];
        var intersectionData = this.computeIntersection(
          selectData1,
          selectData2
        );

        this.createTopoBox(
          "_left_" + (index + i),
          this.selectSharding[this.combinations[index + i].left]
        );
        this.generateGraph(
          clientWidth,
          clientHeight,
          selectData1,
          "shardingGraph" + "_left_" + (index + i)
        );

        this.createTopoBox(
          "_" +
            this.combinations[index + i].left +
            "_" +
            this.combinations[index + i].right,
          "" +
            this.selectSharding[this.combinations[index + i].left] +
            "和" +
            this.selectSharding[this.combinations[index + i].right]
        );
        this.generateGraph(
          clientWidth,
          clientHeight,
          intersectionData,
          "shardingGraph" +
            "_" +
            this.combinations[index + i].left +
            "_" +
            this.combinations[index + i].right
        );

        this.createTopoBox(
          "_right_" + (index + i),
          this.selectSharding[this.combinations[index + i].right]
        );
        this.generateGraph(
          clientWidth,
          clientHeight,
          selectData2,
          "shardingGraph" + "_right_" + (index + i)
        );
      }
    },
    // 根据节点分片搜索的函数
    searchBySharding() {
      // 检查表达式
      if (!this.beforeSearch(2)) return;
      // 对数组排序
      this.selectSharding.sort(function (a, b) {
        return a - b;
      });
      // 使用前置空
      this.combinations = [];
      // 取得组合数数组
      this.generateCombination(this.selectSharding);
      // 改变页码，一页放6个
      this.pageSize = Math.ceil(this.combinations.length / this.pageCount);
      // 调用handleCurrentChange()函数
      this.handleCurrentChange(1);
    },
  },
};
</script>
  
  <style >
.wraper {
  width: 100%;
  background-color: white;
  border-radius: 20px;
  min-height: 100vh;
  height: auto;
  /* 可选，如果需要根据内容自动调整高度 */
  margin: 2vh 0.6vw;
  padding: 1vw;
}

/*----------------------- 可重叠分片搜索 -------------------------------------*/
.wraper .searchBox {
  width: 100%;
  border-bottom: 1px #eee solid;
}

/*-----------------------  搜索文字图标 -----------------------------*/
.wraper .searchBox .searchBoxHeader {
  width: 100%;
  height: 6vh;
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: 700;
}

.wraper .searchBox .searchBoxHeader i {
  margin-left: 1vw;
}

/*-----------------------  节点数搜索 -----------------------------*/
.wraper .searchBox .searchBoxBody-Node {
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
}

/*-----------------------  节点数文字样式 -----------------------------*/
.wraper .searchBox .searchBoxBody-Node .searchBoxBody-Node-p {
  width: 10%;
  height: 6vh;
  line-height: 6vh;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 16px;
  text-align: center;
  border: 1px #eee solid;
  border-radius: 5px;
  margin-right: 2vw;
}

/*-----------------------  比较符样式 -----------------------------*/
.wraper .searchBox .searchBoxBody-Node .compareSign {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
}

.wraper .searchBox .searchBoxBody-Node .compareSign p {
  width: 40%;
}

/*-----------------------  操作数样式 -----------------------------*/
.wraper .searchBox .searchBoxBody-Node .compareInput {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 2vw;
}

.wraper .searchBox .searchBoxBody-Node .compareInput p {
  width: 40%;
}

/*-----------------------  搜索按钮 -----------------------------*/
.wraper .searchBox .searchBoxBody-Node .searchBoxBody-Node-button {
  width: 10%;
  margin-left: 2vw;
}

/*----------------------- 分片ID搜索 -------------------------------------*/
.wraper .searchBox .searchBoxBody-Sharding {
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
  margin-top: 1vw;
}

/*----------------------- 分片ID搜索文字 -------------------------------------*/
.wraper .searchBox .searchBoxBody-Sharding p {
  width: 10%;
  height: 6vh;
  line-height: 6vh;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 16px;
  text-align: center;
  border: 1px #eee solid;
  border-radius: 5px;
  margin-right: 2vw;
}

/*----------------------- 分片ID多选框 -------------------------------------*/
.wraper .searchBox .searchBoxBody-Sharding .searchBoxBody-Sharding-selector {
  width: 42.5%;
  height: 100%;
}

/*----------------------- 分片ID按钮 -------------------------------------*/
.wraper .searchBox .searchBoxBody-Sharding .searchBoxBody-Sharding-button {
  width: 10%;
  margin-left: 2vw;
}

/*----------------------- 分片结果 Title -------------------------------------*/
.wraper .overlapSharding-title {
  width: 100%;
  height: 36px;
  line-height: 36px;
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: 700;
}

.wraper .overlapSharding-title i {
  margin-left: 15px;
}

/*----------------------- 分片结果 gird布局 -------------------------------------*/
.wraper .sharding-topologys {
  display: grid;
  grid-template-columns: repeat(3, 32%);
  grid-gap: 20px 35px;
}

/*----------------------- 分片结果 拓扑图配置 -------------------------------------*/
.wraper .sharding-topologys .sharding-topology {
  width: 100%;
  height: 100%;
  border: 1px #afb0b2 solid;
  background-color: #bee7e9;
  border-radius: 10px;
  padding: 10px 15px;
}

.wraper .sharding-topologys .sharding-topology .sharding-topology-title {
  width: 100%;
  height: 3vh;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wraper .sharding-topologys .sharding-topology .sharding-topology-content {
  width: 495px;
  height: 350px;
  border: 1px #afb0b2 solid;
  background-color: white;
  opacity: 0.95;
 
}

/*----------------------- 分页 -------------------------------------*/
.wraper .pagination {
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  