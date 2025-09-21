<template>
  <div class="simulation-setting">
    <div class="simulation-box">
      <div class="setting-info">
        <div class="setting-item">
          <div class="item-title">配置文件数量</div>
          <div class="item-content">
            <span class="iconfont">&#xe61d;</span>{{ 10 }}
          </div>
        </div>
        <div class="setting-item">
          <div class="item-title">当前加载的配置文件</div>
          <div class="item-content">
            <span class="iconfont">&#xe623;</span>{{ 15 }}
          </div>
        </div>
        <div class="setting-item">
          <div class="item-title">上次执行的算法</div>
          <div class="item-content">
            <span class="iconfont">&#xe6c8;</span>{{ "PoW" }}
          </div>
        </div>
      </div>
      <div class="node-config">
        <div class="config-header">
          <div id="title">
            <h2>区块链网络配置</h2>
          </div>
          <div id="button">
            <el-button type="primary" @click="toAdd()"
              >新增<i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </div>
        </div>

        <el-table
          ref="multipleTable"
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            ).length == 0
              ? tableData.slice(
                  (currentPage - 2) * pageSize,
                  (currentPage - 1) * pageSize
                )
              : tableData.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
          "
          highlight-current-row
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          :max-height="tableHeight"
          @current-change="handleCurrentChange"
          style="width: 100%"
          class="order"
        >
          <el-table-column
            prop="ConfigName"
            label="配置名"
            align="center"
            :show-overflow-tooltip="true"
          >
            <!-- <template slot-scope="scope">
							<el-radio v-model="radio" :label="scope.row.ConfigName"  :show-overflow-tooltip="true"
							@click="ChangeGraph(scope.$index, scope.row.networkId)"></el-radio>
						</template> -->
          </el-table-column>
          <el-table-column
            prop="Ctype"
            :show-overflow-tooltip="true"
            label="种类"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="NodeNum" label="节点数量" align="center">
          </el-table-column>
          <el-table-column prop="Blocksize" label="区块大小(KB)" align="center">
          </el-table-column>
          <el-table-column
            prop="ConfirmSpeed"
            label="确认速度(区块数)"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="Step" label="仿真步长" align="center">
          </el-table-column>
          <el-table-column prop="SyncRate" label="区块同步率" align="center">
          </el-table-column>
          <el-table-column
            prop="TransactionPerBlock"
            label="单位区块交易数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="operate"
            width="350"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                round
                icon="el-icon-view"
                @click="ShowNodeTopology(scope.$index, scope.row.networkId)"
                >查看网络拓扑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                round
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row.networkId)"
              ></el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-download"
                round
                style="margin-top: 0.5vw"
                @click="exportData(scope.$index)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-box flex-center">
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="ChangePage"
            :current-page="currentPage"
            :page-sizes="[9]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </div>

      <!-- 抽屉 -->
      <el-drawer
        title="当前节点信息"
        :visible.sync="drawer"
        :with-header="false"
      >
        <span>
          <h3
            style="display: flex; justify-content: center; align-items: center"
          >
            当前节点信息
          </h3>
          <div style="margin-left: 0.5vw">节点名称：{{ this.nodeId }}</div>
          <div style="margin-left: 0.5vw">邻居节点信息：</div>
        </span>
        <el-table :data="gridData">
          <el-table-column
            property="name"
            label="节点名称"
            width="180"
          ></el-table-column>
          <el-table-column
            property="source"
            label="起点"
            width="180"
          ></el-table-column>
          <el-table-column property="target" label="终点"></el-table-column>
        </el-table>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import FileSaver from "file-saver";

let graph;
export default {
  name: "Home",
  created() {
    axios
      .get("http://r1895.cn:8080/api/config/list", qs.stringify({}))
      .then((response) => {
        this.form = response.data;
        for (var i = 0; i < this.form.length; i++) {
          let Form = {
            networkId: "",
            ConfigName: "",
            Ctype: "",
            NodeNum: "",
            Blocksize: "",
            ConfirmSpeed: "",
            Step: "",
            SyncRate: "",
            TransactionPerBlock: "",
          };
          Form.networkId = this.form[i].networkId;
          Form.ConfigName = this.form[i].name;
          switch (this.form[i].kind) {
            case 1:
              Form.Ctype = "无标度网络";
              break;
            case 2:
              Form.Ctype = "随机生成网络";
              break;
            case 3:
              Form.Ctype = "小世界网络";
              break;
            case 10:
              Form.Ctype = "自定义网络";
              break;
          }

          Form.NodeNum = this.form[i].number;
          Form.Blocksize = this.form[i].size;
          Form.ConfirmSpeed = this.form[i].speed;
          Form.Step = this.form[i].step;
          Form.SyncRate = this.form[i].rate;
          Form.TransactionPerBlock = this.form[i].number_of_trade;
          this.tableData.push(Form);
        }
        console.log(this.tableData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      tableHeight: 600,
      image: "",
      selectId: "",
      activeNames: ["1", "2"],
      nodeInfoDetail: {
        base: {},
        neighbors: {},
      },
      radio: "",
      inputConifg: "ConfigName",
      currentPage: 1,
      split: 0.3,
      isGraph: true,
      tableData: [],
      totalData: [],
      total: 100,
      pageSize: 4,
      nodes: [],
      edges: [],
      container: null,
      nodesArray: [],
      //   关系线数组
      edgesArray: [],
      options: {},
      data2: {},
      configNum: 0,
      configName: "",
      AlgConduct: "",
      PresentConfigName: "",
      configData: {},

      // 分页器所需内容
      currentPage: 1,
      total: 100,
      pageSize: 9,
      nodesData: [],
      edgesData: [],
      target_id: [],
      configId: 0,
      drawer: false,
      nodeId: {},
      gridData: [],
      form: {
        networkId: "",
        ConfigName: "",
        Ctype: "",
        NodeNum: "",
        Blocksize: "",
        ConfirmSpeed: "",
        step: "",
        SyncRate: "",
        TransactionPerBlock: "",
      },
      formLabelWidth: "120px",
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 9, // 每页的数据条数
      nodeInfoIsshow: false,
      egdeInfoIsshow: false,
      baseInfo: "",
      nameInfoIsShow: false,

      graph: undefined,
      radio: null,
      signal: false, //标记是否大于50
      nodeevt: null,
    };
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        let box = document.querySelector(".content").attributes;
        let box_clientHeight = box[0].ownerElement.clientHeight;
        this.tableHeight = box_clientHeight - 100;
      });
    },
    handleChange(val) {
      console.log(val);
    },
    tableRowStyle() {
      return "background-color: white; color: black;";
    },
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color: #323546;color: white;font-weight: 500;";
      }
    },

    handleCurrentChangeTable(val) {
      this.radio = val.ConfigName;
    },
    handleClose() {
      this.dialogVisible1 = false;
    },

    getNodeInfo(id) {
      for (let i = 0; i < this.nodesArray.length; i++) {
        if (this.nodesArray[i].id == id) {
          this.nodeInfoDetail.base = JSON.parse(
            JSON.stringify(this.nodesArray[i])
          );
          this.nodeInfoDetail.neighbors = this.nodesArray[i].neighbors;
          this.selectId = id;
          delete this.nodeInfoDetail.base.neighbors;
          break;
        }
      }
      console.log(this.nodeInfoDetail);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    beforeUpload(file) {
      let reader = new FileReader();
      var uploadData = {};
      reader.readAsText(file);
      let that = this;
      reader.onload = () => {
        uploadData = eval("(" + reader.result + ")");

        that.configData = uploadData;
      };
      setTimeout(function () {
        console.log("config3:", that.configData);
      }, 5);
    },
    imgUpload(info) {
      console.log("imgUpload", info);
    },
    beforeRemove(file) {
      console.log("remover", file);
    },
    handleExceed(file) {
      console.log("exceed", file);
    },
    handleSuccess(response, file, fileList) {
      console.log("success", response, file, fileList);
    },
    handleError(file) {
      console.log("Error", file);
    },
    exportData(index) {
      //下载配置文件所需函数
      index = (this.currentPage - 1) * this.pageSize + index;
      let data = JSON.stringify(this.tableData[index]);
      let blob = new Blob([data], {
        type: "application/json",
      });
      var str = this.tableData[index].ConfigName + ".json";
      FileSaver.saveAs(blob, str);
    },

    handleCancel() {
      this.dialogFormVisible = false;
      this.form = {};
    },

    /* 分页器所需函数 */
    handleSizeChange(val) {
      //改变分页器一页显示数量
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    ChangePage(val) {
      //分页器改变页数
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    toAdd() {
      this.$router.push({
        path: "/add",
        query: {
          currentRow: this.currentRow,
        },
      });
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

    /* 配置表格所需函数 */
    handleCurrentChange(val) {
      //当当前行发生改变后调用该函数

      this.currentRow = val;
      this.radio = val;
      console.log(this.currentRow);
      // this.tableData = this.totalData.slice(
      //   this.pageSize * (val - 1),
      //   this.pageSize * val
      // );
      console.log(val);
    },

    handleDelete(index, id) {
      //删除配置项
      var str = "?configId=" + id;
      if (index == null) {
        return;
      }
      index = (this.currentPage - 1) * this.pageSize + index;
      this.tableData.splice(index, 1);
      axios
        .get("http://r1895.cn:8080/api/config/delete" + str, qs.stringify())
        .then((response) => {
          this.$message.success("删除成功！");
        })
        .catch((error) => {
          this.$message.error("删除失败！");
          console.error(error);
        });
    },

    openNodeDrawer() {
      this.gridData = [];
      this.drawer = true;
    },

    ShowInfo() {
      this.nodeInfoIsshow = true;
    },

    edgeInfo() {
      this.egdeInfoIsshow = !this.egdeInfoIsshow;
    },

    nameInfo() {
      this.nameInfoIsShow = !this.nameInfoIsShow;
    },

    clickTr(row, event, column) {
      //console.log(row["id"]) 跟下面效果一样
      console.log(row.id); //获取各行id的值
      this.baseInfo = row.id;
      this.target_id = [];
      for (let i = 0; i < this.edgesData.length; i++) {
        if (this.edgesData[i].source == row.id) {
          this.target_id.push(this.edgesData[i].target);
        }
      }
    },

    refreshDragedNodePosition(e) {
      const model = e.item.get("model");
      model.fx = e.x;
      model.fy = e.y;
    },

    setcurrentrow(row) {
      this.$refs.multipleTable.setCurrentRow(row);
    },

    // 节点对象是同步获取，设置延迟使之能得到数据
    saveUserGraph() {
      setTimeout(() => {
        this.updateGraph();
      }, 0);
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

    ShowNodeTopology(index, networkId) {
      let index_total = (this.currentPage - 1) * this.pageSize + index;
      let num = this.form[index_total].number;
      this.$router.push({
        path: "/NodesTopology",
        query: {
          NumofNodes: num,
          networkId: networkId,
        },
      });
    },

    flexWidth(prop, tableData, title, num = 0) {
      //自动分配表格列宽度
      if (tableData.length === 0) {
        //表格没数据不做处理
        return;
      }
      let flexWidth = 0; //初始化表格列宽
      let columnContent = ""; //占位最宽的内容
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      context.font = "14px Microsoft YaHei";
      if (prop === "" && title) {
        //标题长内容少的，取标题的值,
        columnContent = title;
      } else {
        // 获取该列中占位最宽的内容
        let index = 0;
        for (let i = 0; i < tableData.length; i++) {
          const now_temp = tableData[i][prop] + "";
          const max_temp = tableData[index][prop] + "";
          const now_temp_w = context.measureText(now_temp).width;
          const max_temp_w = context.measureText(max_temp).width;
          if (now_temp_w > max_temp_w) {
            index = i;
          }
        }
        columnContent = tableData[index][prop];
        //比较占位最宽的值跟标题、标题为空的留出四个位置
        const column_w = context.measureText(columnContent).width;
        const title_w = context.measureText(title).width;
        if (column_w < title_w) {
          columnContent = title || "留四个字";
        }
      }
      // 计算最宽内容的列宽
      let width = context.measureText(columnContent);
      flexWidth = width.width + 40 + num;
      return flexWidth + "px";
    },
    stateFormat(row, column, cellValue) {
      //表格中内容省略
      // console.log(row , column , cellValue)
      if (!cellValue) return "";
      if (cellValue.length > 3) {
        //最长固定显示3个字符
        return cellValue.slice(0, 3) + "...";
      }
      return cellValue;
    },
  },
};
</script>

<style lang="less" scoped>
.pointer {
  cursor: pointer;
}

.simulation-setting {
  display: flex;

  .simulation-box {
    width: 100%;
    padding: 0 10px;
    display: flex;
    // flex: 1;
    flex-direction: column;
  }

  .setting-info {
    display: flex;
    margin: 10px -10px -5px -10px;

    .setting-item {
      flex: 1;
      height: 120px;
      position: relative;
      padding: 10px;
      background-color: #fff;
      margin: 10px;

      .item-title {
        position: absolute;
        top: 10px;
        left: 30px;
        font-size: 22px;
        font-weight: 600;
      }

      .item-content {
        position: absolute;
        bottom: 10px;
        right: 30px;
        font-size: 32px;
        color: cornflowerblue;

        span {
          margin-right: 4px;
          font-size: 36px;
        }
      }
    }
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    // border-bottom: 1px solid #c0c0c0;
  }

  .node-config {
    margin: 10px 0;
    background-color: #fff;
    padding: 10px;
    height: calc(100% - 3rem);

    .config-header {
      // display: flex;
      margin: 10px 0;

      #title {
        float: left;
      }

      #button {
        float: right;
        margin-bottom: 0.5vh;
      }
    }
  }

  .pagination-box {
    margin-top: 10px;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .node-topology {
    margin: 10px 0;
    background-color: #fff;
    padding: 10px;

    .network {
    }

    .network-02 {
    }
  }

  .node-info-box {
    background-color: #fff;
    padding: 10px;
    margin: 10px;
  }

  .node-info {
    height: 360px;
    margin-top: 10px;

    .split-pane {
      padding: 10px;
      background-color: #fff;
    }

    .node-list {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      height: 340px;
      padding: 10px;

      .node-item {
        border-bottom: 1px solid #c0c0c0;
        display: flex;
        justify-content: center;
        height: 42px;
        line-height: 42px;
        font-size: 24px;
      }

      .node-item:hover {
        border: 1px solid #303030;
        background-color: #e0e0e0;
      }
    }

    .base-info {
      font-size: 18px;
    }

    .node-detail {
      display: flex;
      overflow-y: auto;
      height: 360px;
    }

    .neighbors-title {
      font-size: 16px;
      font-weight: 550;
    }

    .neighbors-01 {
      margin: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 18px;
    }

    .neighbors-01:hover {
      border: 1px solid #303030;
      background-color: #e0e0e0;
    }

    .neighbors-02 {
      margin-left: 10px;
    }
  }

  .gatewayInfo2 {
    margin-top: 20px;
    // border-radius: 5px;
    padding: 0 10px;
    background: white;
    box-sizing: border-box;
    height: 830px;
  }
}

.upload-demo {
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  //box-shadow:1px 1px 5px rgb(255, 67, 67);
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
</style>
