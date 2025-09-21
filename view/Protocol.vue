<template>
  <div class="protocol-view view-wrapper">
    <div class="protocol-container">
      <div class="protocol-item table-title">
        <div class="arrow"></div>
        <div class="id">ID</div>
        <div class="protocol-name">协议名称</div>
        <div class="protocol-value">解析数据</div>
        <div class="parse-time">耗时(s)</div>
        <div class="timestamp">时间戳</div>
      </div>
      <transition-group name="slide">
        <div
          class="protocol-item"
          v-for="item in protocolArr"
          :key="item._id"
          :class="{expand: item.expand}"
        >
          <div class="arrow" @click="handleExpandProtocol(item)">
            <i class="fas fa-angle-right" />
          </div>
          <div class="id">{{item._id.substr(21, 11)}}</div>
          <div class="protocol-name">{{item.protocol_name}}</div>
          <div class="protocol-value">{{item.protocol_value}}</div>
          <div class="parse-time">{{item.parse_time}}</div>
          <div class="timestamp">{{item.timestamp}}</div>
          <div class="message">
            <div class="message-item" v-for="message in item.message || []" :key="message.name">
              <div class="message-title">{{message.name}}</div>
              <div class="message-value">{{message.value}}</div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="protocol-group">
      <div class="protocol-gif" :class="{'full-screen': fullScreen}">
      <div class="title">
        解析流程
        <div class="right">
          <i class="fas fa-compress lg" v-if="fullScreen" @click="fullScreen = false"></i>
          <i class="fas fa-expand lg" v-else @click="fullScreen = true"></i>
        </div>
        </div>
        <img :src="require('../assets/protocol.gif')"/>
      </div>
      <div class="protocol-type">
        <div class="title">协议类型</div>
        <div
          class="protocol-name"
          v-for="item in allProtocol"
          :key="item.name"
          :class="{active: activeType == item.name}"
          @click="activeType = item.name"
        >{{item.name}}</div>
      </div>

      <div class="protocol-desc">
        <div class="title">协议内容</div>
        <div class="content">
          <div v-for="item in allProtocol" :key="item.name">
            <div class="content" v-if="item.name == activeType">
              <p>{{item.desc}}
                <img v-if="item.img" :src="item.img"/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatUnixtimestamp, AllProtocol } from "../common";
export default {
  data() {
    return {
      protocolArr: [],
      activeType: "Modbus_TCP",
      allProtocol: AllProtocol,
      fullScreen: false,
      typesArr: [],
    };
  },
  mounted() {
    this.getProtocolWithOffset();
    this.typesArr = this.allProtocol.map(item => {
      return item.name
    })
  },
  methods: {
    getProtocolWithOffset() {
      const skip = this.protocolArr.length;
      const _this = this;
      this.$axios
        .get(`/protocol/getProtocol?skip=${skip}`)
        .then((res) => {
          res.data.map((item) => {
            item.timestamp = formatUnixtimestamp(item.timestamp);
            item.expand = false;
          });
          _this.protocolArr = _this.protocolArr.concat(res.data);
          _this.activeType = res.data[0].protocol_name || "Modbus_TCP";
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addNewPotocol(pro) {
      console.log(pro)
      pro.timestamp = formatUnixtimestamp(pro.timestamp);
      if (this.typesArr.indexOf(pro.protocol_name) > -1) {
        this.activeType = pro.protocol_name;
      }
      pro.expand = false;
      this.protocolArr.unshift(pro);
    },

    handleExpandProtocol(item) {
      item.expand = !item.expand;
      if (item.expand) {
        this.activeType = item.protocol_name;
      }
    }
  },
};
</script>

<style lang="less">
.protocol-view {
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .protocol-container {
    display: block;
    padding: 10px;
    box-sizing: border-box;
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    width: 70%;
  }

  .protocol-item {
    display: flex;
    padding: 0px 15px;
    flex-wrap: wrap;
    border-bottom: 1px solid #f2f4f8;
    line-height: 40px;
    &.table-title {
      font-weight: bold;
    }
    .arrow {
      width: 40px;
      cursor: pointer;
    }
    svg {
      transition: transform 300ms ease-in-out;
    }
    .id {
      width: 150px;
    }
    .protocol-name {
      width: 150px;
    }
    .protocol-value {
      width: calc(~"100% - 640px");
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .parse-time {
      width: 80px;
      text-align: center;
    }
    .timestamp {
      text-align: center;
      width: 220px;
    }
    .message {
      width: 100%;
      height: 0;
      opacity: 0;
      transition-delay: 0ms;
    }
    .message {
      padding-left: 40px;
      line-height: 40px;
    }
    .message-title,
    .message-value {
      display: inline-block;
      vertical-align: top;
    }
    .message-title {
      width: 150px;
      color: #a3bcdc;
    }
    .message-value {
      width: calc(~"100% - 180px");
      word-break: break-all;
    }
    &.expand {
      svg {
        transform: rotateZ(90deg);
      }
      .message {
        height: auto;
        transition-delay: 300ms;
        opacity: 1;
      }
    }
  }

  .protocol-group {
    width: 29%;
  }
  .protocol-gif {
    margin-bottom: 10px;
    &.full-screen {
      position: fixed;
      left: 190px;
      top: 70px;
      right: 10px;
      bottom: 10px;
      z-index: 1001
    }
    img {
      max-width: 100%;
    }
  }

  .protocol-gif,
  .protocol-type,
  .protocol-desc {
    background: white;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    .title {
      font-weight: 800;
      margin-bottom: 10px;
      font-size: 18px;
      width: 100%;
      .right {
        float: right;
        cursor: pointer;
        &:hover {
          color: #0e5fe2;
        }
      }
    }
    .protocol-name {
      display: inline-block;
      padding: 0px 10px;
      border: 2px solid #0e5fe2;
      margin-bottom: 10px;
      margin-right: 5px;
      border-radius: 15px;
      line-height: 30px;
      cursor: pointer;
      &.active {
        background: #0e5fe2;
        color: white;
      }
    }
  }

  .protocol-desc {
    margin-top: 10px;
    clear: both;
    p {
      text-indent: 2em;
    }
    img {
      width: 100%;
    }
  }
}
</style>