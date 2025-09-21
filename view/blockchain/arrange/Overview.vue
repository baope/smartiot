<template>
  <div class="index-wrapper">
    <div class="left-container">
      <div class="left-row row-1" v-if="overview.length > 0">
        <div
          class="data-block overview"
          v-for="(item, _) in overview"
          :key="item.name"
        >
          <div class="title">{{ names[_] }}</div>
          <div class="value">{{ item.value }}</div>
          <div
            class="background-animation"
            :style="{ backgroundImage: bgAnimUrl[_] }"
          />
        </div>
      </div>
      <div class="left-row row-2">
        <div class="data-block mcs-count" id="nc-line" />
        <div class="data-block mcs-count" id="dc-line" />
      </div>
      <div
        class="left-row row-3 center-container"
        style="overflow: auto; width: 100%"
      >
        <el-table
          :cell-style="{ padding: '6px 0' }"
          :data="getPageData()"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          style="width: 100%; background-color: white"
          ref="multipleTable"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            prop="Height"
            label="区块高度"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="Timestamp"
            width="300px"
            label="出块时间"
          ></el-table-column>
          <el-table-column
            prop="Workersign"
            width="110px"
            label="打包节点"
          ></el-table-column>
          <el-table-column
            prop="Significance"
            width="85px"
            align="center"
            label="交易数"
          ></el-table-column>
          <el-table-column prop="Hash" label="区块哈希"></el-table-column>
          <!--          <el-table-column>-->
          <!--            <template slot="header" align="right">-->
          <!--              <el-input v-model="search" size="mini" @input="change($event)" placeholder="输入区块高度进行搜索"/>-->
          <!--            </template>-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-popover-->
          <!--                trigger="click"-->
          <!--                placement="top"-->
          <!--                :ref ="scope.row.id">-->
          <!--                <el-button-->
          <!--                  icon = "el-icon-close" circle-->
          <!--                  style="float:right" size="mini"-->
          <!--                  @click="closeFloatWin(scope.row.id)"-->
          <!--                ></el-button>-->
          <!--                <br>-->
          <!--                <p>上一区块哈希：{{scope.row.phash}}</p>-->
          <!--                <p>打包节点：{{scope.row.node}}</p>-->
          <!--                <p>出块时间：{{scope.row.timestamp2}}</p>-->
          <!--                <p>区块具体内容：{{scope.row.info}}</p>-->
          <!--                <el-button>校验真实性</el-button>-->
          <!--                <p slot="reference" align = "center" style="line-height:6px;cursor: pointer">查看区块详细信息</p>-->
          <!--              </el-popover>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
      </div>
      <div>
        <el-pagination
          @current-change="current_change"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="pageSize"
          :total="tableData.length"
          layout="total, sizes, prev, pager, next, jumper"
          background
        >
        </el-pagination>
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
import { instance0 } from "@/utils/http";
import {
  getPianoLine,
  getPianoLine1,
  formatUnixtimestamp,
} from "@/utils/common";
export default {
  data() {
    return {
      overview: [],
      nodeCount: undefined,
      dataCount: undefined,
      // tableData: [],echart
      tableData: [],
      names: ["区块高度", "共识算法", "数据总量(MB)"],
      search: "",
      pageSize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      calendarLevel: {},
      bgAnimUrl: [],
    };
  },
  components: { countTo, GatewayInfo },
  mounted() {
    for (let _ = 0; _ <= 2; _++) {
      this.bgAnimUrl.push("url(" + require(`@/assets/bg-anim-${_}.png`) + ")");
    }
    this.nodeCount = this.$echarts.init(document.getElementById("nc-line"));
    this.dataCount = this.$echarts.init(document.getElementById("dc-line"));
    this.getOverview();
    this.getNcPianoLine();
    this.getDcPianoLine();
    this.getTableData(20);
  },

  methods: {
    getOverview() {
      const data = { Commond: "queryOverview", CommondInfo: ["none"] };
      instance0.post("/block", data).then((res) => {
        this.overview = [];
        for (let key in res.data) {
          this.overview.push({ name: key, value: res.data[key] });
        }
      });
    },

    getNcPianoLine() {
      const data = { Commond: "queryNodeChanges", CommondInfo: ["none"] };
      instance0.post("/block", data).then((res) => {
        let input = [];
        for (let key in res.data) {
          input.push(res.data[key]);
        }
        this.nodeCount &&
          this.nodeCount.setOption(
            getPianoLine1("节点数量变化情况", input || [])
          );
      });
    },

    getDcPianoLine() {
      const data = { Commond: "queryStorgeChanges", CommondInfo: ["none"] };
      instance0.post("/block", data).then((res) => {
        let input = [];
        for (let key in res.data) {
          input.push(res.data[key]);
        }
        this.dataCount &&
          this.dataCount.setOption(getPianoLine("上传数据量", input || []));
      });
    },

    getTableData(num) {
      const data = { Commond: "queryBlockInfo", CommondInfo: num };
      console.log();
      instance0.post("/block", data).then((res) => {
        console.log(res.data);
        this.tableData = [];
        for (let item in res.data) {
          this.tableData.push(res.data[item].Head);
        }
        console.log(this.tableData);
      });
    },

    getPageData() {
      if (this.search) {
        return this.tableData.filter(
          (data) =>
            !this.search ||
            data.Height.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.tableData.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
      }
    },
    tableRowStyle() {
      return "background-color: white; color: black;";
    },
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color: #323546;color: white;font-weight: 500;";
      }
    },
    change() {
      this.$forceUpdate();
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
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
    width: calc(~"100% - 348px");
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .left-row {
      display: flex;
      justify-content: space-between;
    }
    .row-1 .overview {
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
      &:hover .background-animation {
        transition: all 0.5s steps(20, end);
        background-position-y: -2560px;
      }
    }

    .row-2 {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
    }

    .row-3 {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
    }

    .center-container {
      display: inline-block;
      padding-top: 20px;
      width: 95%;
      height: 51%;
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      background-repeat: no-repeat;
      background-size: auto 40vh;
      background-position: 43% 14vh;

      .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 40px;
      }
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

    #nc-line {
      width: 49.5%;
      height: 380px;
      overflow: hidden;
    }

    #dc-line {
      width: 49.5%;
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
  0% {
    background-position-y: 0px;
  }
  5% {
    background-position-y: -128px;
  }
  10% {
    background-position-y: -256px;
  }
  15% {
    background-position-y: -384px;
  }
  20% {
    background-position-y: -512px;
  }
  25% {
    background-position-y: -640px;
  }
  30% {
    background-position-y: -768px;
  }
  35% {
    background-position-y: -896px;
  }
  40% {
    background-position-y: -1024px;
  }
  45% {
    background-position-y: -1152px;
  }
  50% {
    background-position-y: -1280px;
  }
  55% {
    background-position-y: -1408px;
  }
  60% {
    background-position-y: -1536px;
  }
  65% {
    background-position-y: -1664px;
  }
  70% {
    background-position-y: -1792px;
  }
  75% {
    background-position-y: -1920px;
  }
  80% {
    background-position-y: -2048px;
  }
  85% {
    background-position-y: -2176px;
  }
  90% {
    background-position-y: -2304px;
  }
  95% {
    background-position-y: -2432px;
  }
  100% {
    background-position-y: -2560px;
  }
}
</style>
