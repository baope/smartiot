<template>
  <div
    style="
      height: 100%;
      width: 100%;
      margin: 2vh 0.6vw;
      background-color: white;
      border-radius: 20px;
    "
  >
    <!---------------- 用户路由转换提示信息 -------------->
    <div class="con" id="msgToolTip">
      <div id="msg">
        <div class="info_message">
          <div class="alertTitle"></div>
          <span class="detail_message"> 您有对图的操作没有保存,是否保存? </span>
        </div>
        <div id="alertSure">保存</div>
        <div id="alertCancel">取消</div>
      </div>
    </div>

    <div style="display: flex; align-items: center; margin-left: 5px">
      <div
        class="fa el-icon-back"
        style="font-size: 2vw; user-select: none; cursor: pointer"
        @click="back_to_homepage()"
      ></div>
      <h2 style="margin-left: 1vw">分片拓扑图</h2>
    </div>
    <div class="user-tools-list">
      <div id="addNodeAndEdge">
        <p style="font-weight: 800">选择使用模式:</p>
        <select id="selector">
          <option value="default">默认</option>
          <option value="addNode">添加节点</option>
          <option value="addEdge">添加边</option>
          <option value="deleteNode">删除节点</option>
          <option value="deleteEdge">删除边</option>
        </select>
      </div>
      <div class="undo-redo">
        <div class="uricon" @click="undo()">
          <!-- <p>撤销:</p> -->
          <el-button type="warning" style="color: black"
            >撤销<i
              class="fa fa-undo"
              style="margin-left: 2px; color: black"
            ></i
          ></el-button>
          <el-tooltip
            class="item"
            effect="light"
            content="撤销当前操作"
            placement="top"
          >
            <!-- <i class="fa fa-undo"></i> -->
          </el-tooltip>
        </div>
        <div class="uricon" @click="redo()">
          <el-button style="background-color: #7dccaf; color: black"
            >重做<i
              class="fa fa-undo fa-flip-horizontal"
              style="margin-left: 2px; color: black"
            ></i
          ></el-button>
          <el-tooltip
            class="item"
            effect="light"
            content="重做之前操作"
            placement="top"
          >
          </el-tooltip>
        </div>
      </div>
      <div class="save-graph">
        <el-button
          type="info"
          @click="dialogVisible3 = true"
          v-if="this.signal == true"
          >查看完整拓扑图</el-button
        >
        <el-button type="success" @click="dialogVisible2 = true"
          >保存当前拓扑信息</el-button
        >

        <!--保存拓扑信息确认弹窗-->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible2"
          width="30%"
          :before-close="handleClose2"
        >
          <span>确认保存当前拓扑信息？</span>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="saveUserGraph(), (dialogVisible2 = false)"
              >确 定</el-button
            >
            <el-button @click="dialogVisible2 = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>

    <div id="node" @contextmenu.prevent="" ref="graphContent"></div>
  </div>
</template>
  
  <script>

import G6, { G6GraphEvent } from "@antv/g6";
import { clone } from "@antv/util";

let graph;
export default {
  name: "graphDetail",
  created() {
    let networkId = this.networkId;
    var str = "?configId=" + networkId;
  },
  mounted() {
    this.G6AddEdgeAddNode();
    this.handleKeyBoardListen();
    this.GeneraateGraph();
  },
  data() {
    return {
      verificationImg: "",
      nodes: this.$route.query.nodes,
      edges: this.$route.query.edges,
      ruleForm: {
        verification: "",
      },
      NumofNodes: 30,
      networkId: 77,
      nodesData: [],
      edgesData: [],
      graph: undefined,
      addedNodeCount: 0, //节点编号，默认是0，用于添加节点
      addNodesStack: [], //添加节点栈
      addEdgesStack: [], //添加节点栈
      deleteNodesStack: [], //删除节点栈
      deleteEdgesStack: [], //删除边栈
      dialogVisible1: false, //关闭删除配置信息弹窗
      dialogVisible2: false, //关闭保存拓扑信息弹窗
      dialogVisible3: false,
      nodeevt: "", // 用于记录节点事件
      gridData: [], //用于存储邻居节点信息
      DialogNeighbours: false, //邻居节点信息对话框是否可见
      //分页器
      currentPage: 1,
      total: 100,
      pageSize: 5,
      signal: false,

      AddNodeDialog: false,
      AddNode: {
        DeviceName: "",
        StorageCapacity: "",
        ComputingPower: "",
      },
      inputValue: "",
      AddNodeValue: "",
    };
  },
  methods: {
    back_to_homepage() {
      this.$router.go(-1);
    },

    GeneraateGraph() {
      var nodes = JSON.parse(this.nodes);
      var edges = JSON.parse(this.edges);
      var data = {
        nodes: nodes,
        edges: edges,
      };
      var array = new Array();
      for (let i = 0; i < nodes.length; i++) {
        array.push(Number(nodes[i].id, 10));
      }
      this.addedNodeCount = Math.max(...array) + 1;

      let graph = new G6.Graph({
        container: "node",
        width: 1200,
        height: 600,
        enabledStack: true, // G6的操作栈
        maxStep: 1000, // 栈的大小设置为1000
        layout: {
          type: "force",
          preventOverlap: true,
          nodeSize: 100,
          linkDistance: 150,
        },
        defaultNode: {
          size: 40,
          style: {
            stroke: "#6272E3",
            lineWidth: 2,
            fill: "#F1F0F2",
          },
        },
        defaultEdge: {
          type: "quadratic",
          style: {
            stroke: "#A3B1BF",
            // endArrow: {
            //   // 设置终点箭头
            //   path: G6.Arrow.vee(8, 15, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
            //   d: 0,
            //   fill: "#000",
            // },
          },
        },
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "click-select",
            "activate-relations",
          ],
          // 增加节点交互模式
          addNode: ["click-add-node", "click-select", "zoom-canvas"],
          // 增加边交互模式
          addEdge: ["click-add-edge", "click-select", "zoom-canvas"],
          // 删除边节点交互模式
          deleteNode: ["click-delete-node", "click-select", "zoom-canvas"],
          // 删除边交互模式
          deleteEdge: ["click-delete-edge", "click-select", "zoom-canvas"],
        },
        // The node styles in different states
        nodeStateStyles: {
          // The node styles in selected state, corresponds to the built-in click-select behavior
          selected: {
            stroke: "#666",
            lineWidth: 2,
            fill: "#97ABF2",
          },
        },
      });
      var Gengraph = data;
      Gengraph.nodes = nodes;
      Gengraph.edges = edges;
      graph.read(Gengraph);
      graph.render();
      document.getElementById("selector").addEventListener("change", (e) => {
        const value = e.target.value;
        graph.setMode(value);
      });
      console.log(graph);
      this.graph = graph;
      this.G6Fun();
      var that = this;
      /******** 菜单框部分 ********/
      let conextMenuContainer = document.createElement("ul");
      conextMenuContainer.id = "contextMenu";

      // 创建拓展节点的按钮

      //创建显示节点信息的按钮
      let button_2 = document.createElement("button");
      button_2.innerHTML = "显示节点信息";
      button_2.onclick = function () {
        let ev = that.nodeevt;
        var nodeItem = ev.item; // 获取被点击的节点元素对象
        that.nodeId = nodeItem._cfg.id;
        for (var i = 0; i < nodeItem._cfg.edges.length; i++) {
          var edges = {
            name: "0",
            source: "0",
            target: "0",
          };
          if (nodeItem._cfg.id == nodeItem._cfg.edges[i]._cfg.source._cfg.id) {
            edges.name = nodeItem._cfg.edges[i]._cfg.target._cfg.id;
          } else {
            edges.name = nodeItem._cfg.edges[i]._cfg.source._cfg.id;
          }
          edges.source = nodeItem._cfg.edges[i]._cfg.source._cfg.id;
          edges.target = nodeItem._cfg.edges[i]._cfg.target._cfg.id;
          that.gridData.push(edges);
        }
        that.DialogNeighbours = true;
      };
      conextMenuContainer.appendChild(button_2);

      this.$refs.graphContent.appendChild(conextMenuContainer); //将创建好的内容放入右键菜单
      let menu = document.getElementById("contextMenu");

      graph.on("node:contextmenu", function (evt) {
        //在节点上点击右键出现右键菜单
        let ScrollLength = document.documentElement.scrollTop; //滚动条长度
        menu.style.left = evt.clientX + "px";
        menu.style.top = evt.clientY + ScrollLength + "px";
        that.nodeevt = evt; //传递nodemodel
      });
      graph.on("canvas:click", function (evt) {
        //点击画布空白位置隐藏右键菜单
        menu.style.left = "-1000px";
      });
      /******** 菜单框部分结束 ********/
    },
    processEdgeData(edges) {
      var map = new Map(); // 使用map加速边到节点的映射
      for (let i = 0; i < edges.length; i++) {
        if (
          map.get(edges[i].source) == undefined ||
          map.get(edges[i].source) == null
        ) {
          map.set(edges[i].source, 1);
        }
        // 边集应排除id--->0的孤立节点
        if (edges[i].target == 0) {
          edges.splice(i, 1);
          i--;
          continue;
        } else if (
          map.get(edges[i].target) == undefined ||
          map.get(edges[i].target) == null
        ) {
          map.set(edges[i].target, 1);
        }
      }
      var integerNode = Array.from(map.keys());
      return {
        integerNode,
        edges,
      };
    },
    G6Fun() {
      this.graph.on("node:dragstart", (e) => {
        this.graph.layout();
        this.refreshDragedNodePosition(e);
      });
      this.graph.on("node:drag", (e) => {
        this.refreshDragedNodePosition(e);
      });
      this.graph.on("node:dragend", (e) => {
        e.item.get("model").fx = null;
        e.item.get("model").fy = null;
      });
    },
    // 键盘监听事件
    handleKeyBoardListen() {
      let code = 0;
      let code2 = 0;
      var that = this;
      document.onkeydown = function (e) {
        let evn = e || event;
        let key = evn.keyCode || evn.which || evn.charCode;
        if (key === 17) {
          code = 1;
        }
        if (key === 90) {
          code2 = 1;
        } else if (key === 89) {
          code2 = 2;
        } else {
          // enpty block
        }
        if (code === 1 && code2 === 1) {
          // alert('Ctrl+Z使用键盘撤销');
          that.undo();
          code = 0;
          code2 = 0;
        } else if (code === 1 && code2 === 2) {
          // alert('Ctrl+Y使用键盘重做');
          that.redo();
          code = 0;
          code2 = 0;
        } else {
          // enpty block
        }
      };
      document.onkeyup = function (e) {
        if (e.keyCode === 17) {
          code = 0;
        }
        if (e.keyCode === 90 || e.keyCode === 89) {
          code2 = 0;
        }
      };
    },
    refreshDragedNodePosition(e) {
      const model = e.item.get("model");
      model.fx = e.x;
      model.fy = e.y;
    },
    undo() {
      const graph = this.graph;
      const undoStack = graph.getUndoStack(); // undo栈
      if (!undoStack || undoStack.length === 0) {
        return;
      }
      const currentData = undoStack.pop(); // 栈顶元素
      if (currentData) {
        const { action } = currentData; // 取得data的action，之后根据action的种类进行操作
        graph.pushStack(action, clone(currentData.data), "redo"); // 元素进入redo栈
        let data = currentData.data.before; // 操作前数据
        if (action === "add") {
          // 种类为添加则为操作后数据
          data = currentData.data.after;
        }

        if (!data) return;
        var that = this;
        switch (action) {
          case "render": // 必须有渲染种类
          case "update": // 更新种类
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                var edgeId = graph.findById(model.id);
                that.deleteEdgesStack.push({
                  source: edgeId._cfg.source._cfg.id,
                  target: edgeId._cfg.target._cfg.id,
                });
                const item = graph.findById(model.id);
                delete model.id;
                graph.updateItem(item, model, false);
                this.undo(); // 更新再调用一次完成两次操作,因为更新事件只发生在边
              });
            });
            break;
          case "delete": {
            // 删除种类
            Object.keys(data).forEach((key) => {
              // 取得data属性数组后，遍历各个属性
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                const itemType = model.itemType;
                delete model.itemType;
                graph.addItem(itemType, model, false);
                if (key == "nodes") {
                  that.addNodesStack.push(model.id);
                } else {
                  that.addEdgesStack.push({
                    source: model.source,
                    target: model.target,
                  });
                }
              });
            });
            break;
          }
          case "add": // 添加种类
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                if (key === "nodes") {
                  that.deleteNodesStack.push(model.id);
                }
                graph.removeItem(model.id, false);
              });
            });
            break;
          default: // 其他种类不用管
        }
      }
    },
    redo() {
      const graph = this.graph;
      const redoStack = graph.getRedoStack();
      if (!redoStack || redoStack.length === 0) {
        return;
      }
      const currentData = redoStack.pop();
      if (currentData) {
        const { action } = currentData;
        let data = currentData.data.after;
        graph.pushStack(action, clone(currentData.data));
        if (action === "delete") {
          data = currentData.data.before;
        }
        if (!data) return;
        var that = this;
        switch (action) {
          case "render":
          case "update":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                // 同时更新添加边栈的target
                if (that.addEdgesStack.length > 0) {
                  that.addEdgesStack[that.addEdgesStack.length - 1].target =
                    model.target;
                }
                const item = graph.findById(model.id);
                delete model.id;
                graph.updateItem(item, model, false);
              });
            });
            break;
          case "delete":
            if (data.edges) {
              data.edges.forEach((model) => {
                that.deleteEdgesStack.push({
                  source: model.source,
                  target: model.target,
                });
                graph.removeItem(model.id, false);
              });
            }
            if (data.nodes) {
              data.nodes.forEach((model) => {
                that.deleteNodesStack.push(model.id);
                graph.removeItem(model.id, false);
              });
            }
            break;
          case "add": {
            var that = this;
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                const itemType = model.itemType;
                delete model.itemType;
                graph.addItem(itemType, model, false);
                if (key === "nodes") {
                  that.addNodesStack.push(model.id);
                } else {
                  that.addEdgesStack.push({
                    source: model.source,
                    target: null,
                  });
                  that.redo(); // 如果类型是edges则再做一次redo
                }
              });
            });
            break;
          }
          default:
        }
      }
    },
    // 添加节点添加边,删除节点删除边
    // 添加节点添加边,删除节点删除边
    G6AddEdgeAddNode() {
      var that = this;
      G6.registerBehavior("click-add-edge", {
        getEvents() {
          return {
            "node:click": "onClick",
            mousemove: "onMousemove",
            "edge:click": "onEdgeClick", // 点击空白处，取消边
          };
        },
        onClick(ev) {
          const node = ev.item;
          const graph = this.graph;
          const point = {
            x: ev.x,
            y: ev.y,
          };
          const model = node.getModel();
          // 此处代码嵌套过深，待功能正常后需要重构
          if (this.addingEdge && this.edge) {
            // 排除重复的情况，因为图中只能显示1条边
            var edgeNow = this.edge;
            var isRepeat = false;
            if (
              graph.find("edge", (edge) => {
                return (
                  edge.get("model").source == edgeNow._cfg.source._cfg.id &&
                  edge.get("model").target == model.id
                );
              }) != undefined
            ) {
              isRepeat = true;
            }
            if (this.edge._cfg.source._cfg.id == model.id) {
              // 排除自己指向自己的情况
              isRepeat = true;
            }
            if (isRepeat) {
              graph.removeItem(this.edge, false);
              // 排除第一次添加的edge
              graph.getUndoStack().pop();
            } else {
              // 添加边栈
              that.addEdgesStack.push({
                source: this.edge._cfg.source._cfg.id,
                target: model.id,
              });
              graph.updateItem(this.edge, {
                target: model.id,
              });
            }
            this.edge = null;
            this.addingEdge = false;
          } else {
            this.edge = graph.addItem("edge", {
              source: model.id,
              target: point,
            });
            this.addingEdge = true;
          }
        },
        onMousemove(ev) {
          const point = {
            x: ev.x,
            y: ev.y,
          };
          if (this.addingEdge && this.edge) {
            this.graph.updateItem(
              this.edge,
              {
                target: point,
              },
              false
            );
          }
        },
        onEdgeClick(ev) {
          const currentEdge = ev.item;
          // 拖拽过程中，点击会点击到新增的边上
          if (this.addingEdge && this.edge == currentEdge) {
            graph.removeItem(this.edge, false);
            // 排除添加边时添加点击空白处的情况
            graph.getUndoStack().pop();
            this.edge = null;
            this.addingEdge = false;
          }
        },
      });

      // Register a custom behavior to add node
      G6.registerBehavior("click-add-node", {
        getEvents() {
          return {
            "canvas:click": "onClick",
          };
        },
        onClick(ev) {
          // that.AddNodeDialog = true;
          const graph = this.graph;
          const node = this.graph.addItem("node", {
            x: ev.x,
            y: ev.y,
            id: `node${that.addedNodeCount}`, // 生成唯一的 id
            label: `${that.addedNodeCount}`,
          });
          // undo栈
          // graph.pushStack('AddNode',node,'undo')
          // 添加节点栈
          that.addNodesStack.push(`node${that.addedNodeCount}`);
          that.addedNodeCount++;
        },
      });

      G6.registerBehavior("click-delete-node", {
        getEvents() {
          return {
            "node:click": "onClick",
          };
        },
        onClick(ev) {
          const graph = this.graph;
          const item = graph.findById(ev.item._cfg.id);
          // 和该点相关联的边的集合
          let deleteEdges = ev.item._cfg.edges;
          for (let i = 0; i < deleteEdges.length; i++) {
            let deletesource = deleteEdges[i]._cfg.sourceNode._cfg.id;
            let deletetarget = deleteEdges[i]._cfg.targetNode._cfg.id;
            // 删除该节点关联边栈
            that.deleteEdgesStack.push({
              source: deletesource,
              target: deletetarget,
            });
          }
          // undo栈
          // graph.pushStack('deleteNode',item,'undo');
          // 删除节点栈
          that.deleteNodesStack.push(ev.item._cfg.id);
          this.graph.removeItem(item);
        },
      });

      G6.registerBehavior("click-delete-edge", {
        getEvents() {
          return {
            "edge:click": "onClick",
          };
        },
        onClick(ev) {
          // 删除边栈
          that.deleteEdgesStack.push({
            source: ev.item._cfg.source._cfg.id,
            target: ev.item._cfg.target._cfg.id,
          });
          const graph = this.graph;
          const item = graph.findById(ev.item._cfg.id);
          // undo栈
          // graph.pushStack('deleteEdge',item,'undo');
          this.graph.removeItem(item);
        },
      });
    },
    // 节点对象是同步获取，设置延迟使之能得到数据
    saveUserGraph() {
      setTimeout(() => {
        this.updateGraph();
      }, 0);
    },
    // 更新节点拓扑
    updateGraph() {
      // 操作添加节点栈和删除节点栈
      // 遍历添加节点栈，找到是否有和删除节点栈中相同的元素
      // 使用map查找相同元素，复杂度降低O(m+n),使用for循环复杂度为o(m*n)
      // 除此之外，使用map有效应对反复添加和删除的情况。
      // 先对节点进行更新
      var nodeMap = new Map();
      // 遍历添加节点栈
      for (let i = 0; i < this.addNodesStack.length; i++) {
        if (
          nodeMap.get(this.addNodesStack[i]) != undefined &&
          nodeMap.get(this.addNodesStack[i]) != null
        ) {
          // 节点出现次数加1
          nodeMap.set(
            this.addNodesStack[i],
            nodeMap.get(this.addNodesStack[i]) + 1
          );
        } else {
          nodeMap.set(this.addNodesStack[i], 1);
        }
      }
      // 遍历删除节点栈
      for (let i = 0; i < this.deleteNodesStack.length; i++) {
        if (
          nodeMap.get(this.deleteNodesStack[i]) != undefined &&
          nodeMap.get(this.deleteNodesStack[i]) != null
        ) {
          // 节点出现次数减1
          nodeMap.set(
            this.deleteNodesStack[i],
            nodeMap.get(this.deleteNodesStack[i]) - 1
          );
        } else {
          nodeMap.set(this.deleteNodesStack[i], -1);
        }
      }
      // 统计节点更新数量
      // 得到节点最终添加数组，这个数组用于对孤立节点的判断
      var updateAddNodes = [];
      // 得到节点最终删除数组，这个数组用于对孤立节点的判断
      var updateDeleteNodes = [];
      // 得到配置节点数量的变化
      var updateNodeNumber = 0;
      nodeMap.forEach((value, key) => {
        if (value > 0) {
          updateNodeNumber++;
          updateAddNodes.push(key);
        } else if (value < 0) {
          updateNodeNumber--;
          updateDeleteNodes.push(key);
        } else {
          // nothing to do
        }
      });

      var isSentRequest = updateNodeNumber;
      updateNodeNumber = parseInt(this.NumofNodes) + updateNodeNumber;
      var configId = this.networkId;

      // 对边数据进行更新
      var edgeMap = new Map();
      // 遍历添加边栈
      for (let i = 0; i < this.addEdgesStack.length; i++) {
        let edgeJson = JSON.stringify(this.addEdgesStack[i]);
        if (
          edgeMap.get(edgeJson) != undefined &&
          edgeMap.get(edgeJson) != null
        ) {
          edgeMap.set(edgeJson, edgeMap.get(edgeJson) + 1);
        } else {
          edgeMap.set(edgeJson, 1);
        }
      }
      // 遍历删除节点栈
      for (let i = 0; i < this.deleteEdgesStack.length; i++) {
        let edgeJson = JSON.stringify(this.deleteEdgesStack[i]);
        if (
          edgeMap.get(edgeJson) != undefined &&
          edgeMap.get(edgeJson) != null
        ) {
          edgeMap.set(edgeJson, edgeMap.get(edgeJson) - 1);
        } else {
          edgeMap.set(edgeJson, -1);
        }
      }
      var updateAddEdges = [];
      var updateDeleteEdges = [];
      edgeMap.forEach((value, key) => {
        if (value > 0) {
          updateAddEdges.push(key);
        } else if (value < 0) {
          updateDeleteEdges.push(key);
        } else {
          // nothing to do
        }
      });

      // 需要对孤立节点进行判断,结合最终节点信息和最终边的信息
      // 添加边时孤立节点的情况(添加孤立节点)
      var addEdgeMap = new Map();
      for (let i = 0; i < updateAddEdges.length; i++) {
        var addedge = JSON.parse(updateAddEdges[i]);
        if (
          addEdgeMap.get(addedge.source) == undefined ||
          addEdgeMap.get(addedge.source) == null
        ) {
          addEdgeMap.set(addedge.source, 1);
        }
        if (
          addEdgeMap.get(addedge.target) == undefined ||
          addEdgeMap.get(addedge.target) == null
        ) {
          addEdgeMap.set(addedge.target, 1);
        }
      }
      for (let i = 0; i < updateAddNodes.length; i++) {
        if (
          addEdgeMap.get(updateAddNodes[i]) != undefined &&
          addEdgeMap.get(updateAddNodes[i]) != null
        ) {
          continue;
        }
        // 将孤立节点以id--->0的边存入数据库
        updateAddEdges.push(
          JSON.stringify({
            source: updateAddNodes[i],
            target: "0",
          })
        );
      }
      // 删除边时孤立节点的情况(删除孤立节点)
      var deleteEdgeMap = new Map();
      for (let i = 0; i < updateDeleteEdges.length; i++) {
        var deleteedge = JSON.parse(updateDeleteEdges[i]);
        if (
          deleteEdgeMap.get(deleteedge.source) == undefined ||
          deleteEdgeMap.get(deleteedge.source) == null
        ) {
          deleteEdgeMap.set(deleteedge.source, 1);
        }
        if (
          deleteEdgeMap.get(deleteedge.target) == undefined ||
          deleteEdgeMap.get(deleteedge.target) == null
        ) {
          deleteEdgeMap.set(deleteedge.target, 1);
        }
        // 因为删除边导致的孤立节点
        // 首先判断节点是否存在
        if (this.graph.findById(deleteedge.source) != undefined) {
          // 计算度数
          if (this.graph.getNodeDegree(deleteedge.source, "total", true) == 0) {
            updateAddEdges.push(
              JSON.stringify({
                source: deleteedge.source,
                target: "0",
              })
            );
          }
        }

        if (this.graph.findById(deleteedge.target) != undefined) {
          if (this.graph.getNodeDegree(deleteedge.target, "total", true) == 0) {
            updateAddEdges.push(
              JSON.stringify({
                source: deleteedge.target,
                target: "0",
              })
            );
          }
        }
      }
      for (let i = 0; i < updateDeleteNodes.length; i++) {
        if (
          deleteEdgeMap.get(updateDeleteNodes[i]) != undefined &&
          deleteEdgeMap.get(updateDeleteNodes[i]) != null
        ) {
          continue;
        }
        // 将孤立节点以id--->0的边存入数据库
        updateDeleteEdges.push(
          JSON.stringify({
            source: updateDeleteNodes[i],
            target: "0",
          })
        );
      }

      // 更新完成后将所有栈清空
      this.addNodesStack = [];
      this.addEdgesStack = [];
      this.deleteNodesStack = [];
      this.deleteEdgesStack = [];
      this.graph.clearStack();
    },
    // 关闭删除配置信息弹窗
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //关闭保存拓扑信息弹窗
    handleClose2(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    CloseDialogNeighbours() {
      this.DialogNeighbours = false;
      this.gridData = [];
    },
    handleSizeChange(val) {
      //改变分页器一页显示数量
      this.currentPage = 1;
      this.pageSize = val;
    },
    ChangePage(val) {
      //分页器改变页数
      this.currentPage = val;
    },
    JustSubmit() {
      this.AddNode.DeviceName = "";
      this.AddNode.StorageCapacity = "";
      this.AddNode.ComputingPower = "";
      this.AddNodeDialog = false;
      this.AddNodeValue = "";
    },
    RemoveNode() {
      const item = graph.findById("node" + (this.addedNodeCount - 1));
      this.addedNodeCount--;
      this.graph.removeItem(item);
      this.AddNodeDialog = false;
    },
  },
};
</script>
  
  <style lang="less" scoped>
/********右键菜单样式 *******************/
/deep/ #contextMenu {
  position: absolute;
  list-style: none;
  padding: 10px 5px;
  left: -100px;
  background: #ccc;

  li {
    cursor: pointer;
  }
}

/********************************* 用户配置列表 ************************************/
.user-tools-list {
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/*************************** 选择框模式 **************************/
.user-tools-list #addNodeAndEdge {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 6px;
}

.user-tools-list #addNodeAndEdge p {
  font-size: 16px;
  margin-right: 1vw;
}

.user-tools-list #addNodeAndEdge #selector {
  position: relative;
  width: 100px;
  height: 25px;
  background: #eafedb;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgb(255, 67, 67);
  display: inline-block;
  text-decoration: none;
}

.user-tools-list #addNodeAndEdge #selector:hover {
  background: #f2f681;
}

/***************************** undo redo操作 ***************************/
.user-tools-list .undo-redo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.user-tools-list .undo-redo .uricon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  user-select: none;
  cursor: pointer;
}

.user-tools-list .undo-redo .uricon p {
  margin-right: 2vw;
  font-size: 16px;
}

/***************************** 保存拓扑信息 ***************************/
.user-tools-list .save-graph {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  box-sizing: border-box;
}

.user-tools-list .save-graph p {
  margin-right: 1vw;
}

/***************************** 跳转页面用户提示框 ***************************/
.con {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
  left: 50vw;
  top: 12vh;
  display: none;
}

#msg {
  position: absolute;
  top: 50%;
  left: 50%;
}

.info_message {
  color: #000;
  background: #eee;
  height: 200px;
  display: inline-block;
  width: 400px;
  border-radius: 5px;
}

#alertSure,
#alertCancel {
  position: absolute;
  top: 75%;
  left: 46%;
  width: 90px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #2e9cce;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

#alertSure {
  top: 75%;
  left: 46%;
}

#alertCancel {
  top: 75%;
  left: 74%;
}

.detail_message {
  width: 350px;
  height: 115px;
  text-align: center;
  overflow: hidden;
  display: inline-block;
  padding: 10px;
  margin-left: 15px;
  color: #2b9bc5;
}

#alertSure:hover,
#alertCancel:hover {
  background: rgba(118, 206, 247, 0.88);
}

.alertTitle {
  height: 30px;
  background: rgb(114, 209, 255);
}
</style>
  