<template>
  <div class="view-wrapper positioning-view">
    <div class="map-img-wrapper">
      <img id="positioning-img" :src="require('../assets/Meeting.png')" />
      <div
        class="circle-absolute"
        v-for="(item, idx) in circles"
        @click="handleCircleClick(item, idx)"
        :class="{ active: item.selected }"
        :key="idx"
        :style="{
          width: circleWidth + 'px',
          height: circleWidth + 'px',
          top: item.top,
          left: item.left,
        }"
      ></div>
    </div>
    <div class="action-wrapper">
      <Card style="width: 100%; margin: 10px 0px">
        <p slot="title">
          <Icon type="md-options" size="20"></Icon>
          选择算法
        </p>
        <RadioGroup v-model="positionAlg">
          <Radio label="快速指纹定位" border></Radio>
          <br />
          <Radio style="margin-top: 10px" label="高精度指纹定位" border></Radio>
        </RadioGroup>
      </Card>

      <Card style="width: 100%; margin: 10px 0px">
        <p slot="title">
          <Icon type="ios-navigate" size="20"></Icon>
          选取真实位置
        </p>
        <span v-for="(item, _) in circles" :key="_">
          <Tag
            type="dot"
            v-if="item.selected"
            closable
            color="primary"
            @on-close="item.selected = false"
          >
            点{{ _ + 1 + " (" + item.x + "," + item.y + ")" }}
          </Tag>
        </span>
        <div style="margin-top: 10px; text-align: center">
          <Button shape="circle" @click="handleClearSelected">重置</Button>
          <Button
            shape="circle"
            icon="ios-search"
            type="primary"
            @click="handlePredict"
            :loading="loading"
            >执行预测</Button
          >
        </div>
      </Card>

      <Card style="width: 100%; margin: 10px 0px">
        <p slot="title">
          <Icon type="ios-navigate-outline" size="20"></Icon>
          预测误差
        </p>
        <div class="predict-result title">
          <span>真实坐标</span>
          <span>预测坐标</span>
          <span>RMSE</span>
        </div>
        <div v-for="(item, _) in predictNodes" :key="_" class="predict-result">
          <span>({{ item.rx + "," + item.ry }})</span>
          <span>({{ item.x + "," + item.y }})</span>
          <span>{{ item.rmse }}</span>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const img = document.querySelector("#positioning-img");
    const that = this;

    img.onload = function () {
      that.imgWidth = img.width;
      that.imgHeight = img.height;
      that.circleWidth = that.imgWidth / 74;
      that.createcir();
    };
  },
  data() {
    return {
      imgWidth: undefined,
      imgHeight: undefined,
      circleWidth: undefined,
      circles: [],
      positionAlg: "高精度指纹定位",
      loading: false,
      selectedNodes: [],
      predictNodes: [],
    };
  },

  methods: {
    handleCircleClick(item, index) {
      if (this.loading) {
        return;
      }
      item.selected = !item.selected;
    },
    createcir() {
      var circles = new Array();
      function createcircle(top, left, i) {
        this.top = top;
        this.left = left;
        this.selected = false;
        this.x = Math.floor(i / 11) + 1;
        this.y = Math.floor(i % 11) + 1;
      }
      for (let i = 0; i < 176; i++) {
        circles[i] = new createcircle(
          10 +
            0.1969 * this.imgHeight +
            ((i - (i % 11)) / 11) * 0.0426 * this.imgHeight +
            "px",
          10 +
            0.1495 * this.imgWidth +
            (i % 11) * 0.0427 * this.imgWidth +
            "px",
          i
        );
      }
      this.circles = circles;
    },
    handleClearSelected() {
      this.circles.map((item, _) => {
        item.selected = false;
      });
    },
    handlePredict() {
      const selectedNodes = [];
      this.circles.map((item, _) => {
        if (item.selected) {
          selectedNodes.push([_, item.x, item.y]);
        }
      });

      if (selectedNodes.length == 0) {
        this.$Message.warning({
          background: true,
          content: "选择预测位置不能为空",
        });
        return;
      }
      this.selectedNodes = selectedNodes;
      this.loading = true;
      this.$Message.info({
        background: true,
        content: "正在预测中，请稍后",
      });
      this.$axios
        .post("/edge/predict", {
          nodes: selectedNodes.map((item) => {
            return item[0];
          }),
          method: this.positionAlg == "高精度指纹定位" ? "wu" : "zhu",
        })
        .then((res) => {
          const { execute_nodes, result } = res.data;
          this.loading = false;
          this.predictNodes = (result || []).map((item, _) => {
            let rx = selectedNodes[_][1];
            let ry = selectedNodes[_][2];
            let x = parseFloat(item.x);
            let y = parseFloat(item.y);

            let rmse = Math.pow(x - rx, 2) + Math.pow(y - ry, 2);
            rmse = Math.sqrt(rmse) * 0.6;
            return { x: x.toFixed(3), y: y.toFixed(3), rx, ry, rmse };
          });
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$Message.error({
            background: true,
            content: "网络异常，请联系管理员",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.positioning-view {
  padding: 10px;
  display: flex;
  align-items: stretch;
  .map-img-wrapper {
    padding: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    background: white;
    position: relative;
    height: calc(~"100vh - 70px");
    margin-right: 10px;
    img {
      height: 100%;
    }
  }
  .circle-absolute {
    position: absolute;
    background: #00b0f0;
    border: 1px solid #696969;
    border-radius: 50%;
    &.active,
    &:hover {
      background: #ffbb00;
      cursor: pointer;
    }
  }
  .action-wrapper {
    flex-grow: 1;
    background: white;
    padding: 10px;
    .predict-result {
      display: flex;
      justify-content: space-between;
      span {
        text-align: center;
        display: inline-block;
        width: 28%;
        padding: 5px 0;
      }
      &.title {
        font-weight: bold;
        border-bottom: gainsboro 1px solid;
      }
    }
  }
}
</style>