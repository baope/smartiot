<template>
  <div class="trajectory-view view-wrapper">
    <div class="map-wrapper" id="trajectory-map"></div>

    <div class="action-wrapper">
      <div class="item-wrapper">
        <h3 style="margin-top: 0px">选取轨迹</h3>
        <Select
          v-model="selectTra"
          style="width: 200px"
          @on-change="handleSelectTrajectory"
        >
          <Option value="mock">{{ "20201112-155320-QZYBF" }}</Option>
        </Select>
      </div>

      <div class="item-wrapper">
        <h3>轨迹回放</h3>
        <Button>开始回放</Button>
        <Button>暂停回放</Button>
        <div style="margin-bottom: 10px"></div>
        <Button>继续回放</Button>
        <Button>停止回放</Button>
      </div>

      <div class="item-wrapper">
        <h3>陀螺仪记录</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: undefined,
      selectTra: undefined,
      lineArr: [],
    };
  },

  mounted() {
    this.initMap();
    this.handleSelectTrajectory();
  },

  methods: {
    initMap() {
      const map = new AMap.Map("trajectory-map", {
        zoom: 19,
        zooms: [3, 20],
        // center: [117.313493, 38.997846],
        center: [101.827687, 36.588897],
        viewMode: "3D",
        pitch: "60",
        // mapStyle: "amap://styles/6aac1eba10e27f90a28e6ea1486fabbd",
      });
      this.map = map;
    },

    handleSelectTrajectory() {
      const x = 117.31508;
      const y = 38.99866;
      const arr = [];

      for (let i = 0; i < 10; i++) {
        arr.push([x, y + i * 0.0001]);
      }
      console.log(arr.toLocaleString());
      let marker = new AMap.Marker({
        map: this.map,
        position: arr[0],
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90,
      });

      let polyline = new AMap.Polyline({
        map: this.map,
        path: arr,
        isOutline: true,
        outlineColor: "#ffeeff",
        borderWeight: 3,
        strokeColor: "#3366FF",
        strokeOpacity: 1,
        strokeWeight: 6,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: "round",
        lineCap: "round",
        showDir: true,
        zIndex: 50,
      });

      let passedPolyline = new AMap.Polyline({
          map: this.map,
          strokeColor: '#AF5',
          strokeWeight: 6
      })
    },
  },
};
</script>
<style lang="less" scoped>
.trajectory-view {
  padding: 10px 0px 0px 10px;
  height: calc(~"100vh - 70px");
  display: flex;
}
.map-wrapper {
  flex-grow: 1;
  height: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
}

.action-wrapper {
  width: 25%;
  background: white;
  margin-left: 10px;
  height: 100%;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  .item-wrapper {
    h3 {
      margin: 15px 0;
    }
  }
}
</style>