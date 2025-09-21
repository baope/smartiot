<template>
  <div class="view-wrapper crowd-path">
    <div class="map-container">
      <div id="map-instance" style="height: 100%"></div>
    </div>
    <div class="action-container">
        <h3>轨迹回放</h3>
        <div class="btn-group">
            <Button @click="startAnimation">开始回放</Button><Button>停止回放</Button>
        </div>
        <div class="btn-group">
            <Button>暂停回放</Button><Button>继续回放</Button>
        </div>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
import Loca from "Loca";

export default {
  data() {
    return {
      map: undefined,
      marker: undefined,
      lineArr: [],
    };
  },
  mounted() {
    console.log("hhahha");
    this.initMap();
  },
  methods: {
    initMap() {
      const map = new AMap.Map("map-instance", {
        zoom: 18,
        // center: [117.313493, 38.997846],
        center: [101.827687, 36.588897],
        mapStyle: "amap://styles/6aac1eba10e27f90a28e6ea1486fabbd",
      });
      this.map = map;

      const paths = [
        117.315095,
        38.998177,
        117.31507,
        38.99733,
        117.314067,
        38.997326,
        117.314067,
        38.997326,
        117.313112,
        38.997326,
        117.313108,
        38.997326,
      ];
      const lineArr = [];
      for (let _ = 0; _ < paths.length; _ += 2) {
        lineArr.push([paths[_], paths[_ + 1]]);
      }
      var marker = new AMap.Marker({
        map: map,
        position: [117.315095, 38.998177],
        icon: require("../assets/nav.png"),
        offset: new AMap.Pixel(-14, -13),
        autoRotation: true,
        angle: 90,
      });

      this.lineArr = lineArr;
      this.marker = marker;

      var polyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        showDir: true,
        strokeColor: "#28F", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6, //线宽
        // strokeStyle: "solid"  //线样式
      });

      var passedPolyline = new AMap.Polyline({
        map: map,
        showDir: true,
        strokeColor: "#AF5", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6, //线宽
        // strokeStyle: "solid"  //线样式
      });

      marker.on("moving", function (e) {
        passedPolyline.setPath(e.passedPath);
      });
    },

    startAnimation() {
        const marker = this.marker
        marker.moveAlong(this.lineArr, 200);
    },
    searchPath() {
      var riding = new AMap.Riding({
        map: map,
        panel: "panel",
      });
      const path = [];
      riding.search(
        new AMap.LngLat(117.315097, 38.998169),
        new AMap.LngLat(117.313112, 38.997323),
        function (status, result) {
          if (status === "complete") {
            const routes = result.routes[0];
            const rides = routes.rides;
            rides.map((item) => {
              item.path.map((pos) => {
                path.push([pos.lng, pos.lat]);
                console.log("[" + pos.lng, +"," + pos.lat + "],");
              });
            });
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.crowd-path {
    display: flex;
    padding-top: 10px;
    height: calc(100vh - 60px);
}
.map-container{
    flex-grow: 1;
    height: 100%;
}
.action-container {
    width: 300px;
    background: white;
    padding: 20px;
    margin-left: 10px;
    height: 100%;
    .btn-group {
        margin: 10px 0px;
    }
    .ivu-btn{
        margin-right: 10px;
    }
}
</style>