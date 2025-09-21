<template>
  <div class="calendar-wrapper">
    <div class="title">
      <div class="left">
        协议解析量分布(月)
      </div>
      {{year}}-
      <span>{{month}}</span>
    </div>
    <div class="one-week">
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
      <span>日</span>
    </div>
    <div class="calendar-ins">
      <div class="calendar-item" v-for="_ in Array.from(Array(begin), (v,k) =>k)" :key="_ + 100"></div>
      <div
        class="calendar-item normal"
        :style="{'background-color': levels[_] == 0 ? 'transparent' : `rgba(${color}, ${levels[_]})`,
                      'color':  levels[_] > 0.6 ? 'white' : 'unset'}"
        v-for="_ in Array.from(Array(days), (v,k) =>k)"
        :key="_"
      >{{_ + 1}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: "",
      month: "",
      days: "",
      begin: 0,
    };
  },
  props: ["color", "levels"],
  mounted() {
    const now = new Date();
    this.year = now.getFullYear();
    const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    this.month = now.getMonth() + 1;

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (this.year % 4 == 0) {
      monthDays[1] += 1;
    }

    this.days = monthDays[this.month - 1];
    const monthHead = new Date(`${this.year}-${this.month}-1`);
    this.begin = monthHead.getDay() - 1;
    this.month = monthMap[now.getMonth()];
  },

  methods: {},
};
</script>
<style lang="less">
@item_width: 40px;

.calendar-wrapper {
  font-size: 18px;
  text-align: center;
  // width: (@item_width + 4) * 7;
  padding: 0 15px;
  .title {
    .left {
      float: left;
      text-align:left;
    }
    text-align: right;
    font-size: 18px;
    line-height: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .one-week {
    clear: both;
    display: flex;
    margin-bottom: 5px;
    span {
      display: inline-block;
      width: @item_width;
      color: #2958f5;
      margin: 2px;
    }
  }
  .calendar-ins {
    display: flex;
    flex-wrap: wrap;
    .calendar-item {
      line-height: @item_width;
      width: @item_width;
      height: @item_width;
      margin: 2px;
      font-weight: bold;
      border-radius: @item_width / 2;

      &.normal {
        background: #d4d4d4;
      }
    }
  }
}
</style>