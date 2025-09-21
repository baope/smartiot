
<template>
  <div class="Date">
    <span class="day">{{d}}</span>
    <b>天</b>
    <span class="hour">{{h > 9 ? h : "0" + h}}</span>
    <b>小时</b>
    <span class="minute">{{m > 9 ? m : "0" + m}}</span>
    <b>分钟</b>
    <span class="second">{{s > 9 ? s : "0" + s}}</span>
    <b>秒</b>
  </div>
</template>

<script>
export default {
  name: "Date",
  data() {
    return {
      d: "",
      h: "",
      m: "",
      s: "",
    };
  },
  created() {
    this.countTime();
  },
  methods: {
    countTime: function () {
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var endDate = new Date("2020-8-9 23:23:23");
      var end = endDate.getTime();
      //时间差
      var leftTime = now - end;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
      }
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.Date {
    span {
        font-size: 36px;
        color: #adb6c0;
    }
    b {
        margin-right: 15px;
        color: #adb6c0;
    }
    margin-bottom: 10px;
}
</style>