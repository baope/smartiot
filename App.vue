<template>
  <div id="app">
    <Menu />
    <div class="router-view">
      <ViewHead />
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import ViewHead from "@/components/ViewHead.vue";

export default {
  name: "App",
  components: { Menu, ViewHead },
  mounted() {
    const wsurl = "ws://" + (process.env.API_ROOT || document.domain) + ":3001";
    this.ws = new WebSocket(wsurl);
    // 客户端接收消息
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const child = this.$children[2];
      if (data.type && data.type == "mcs") {
        if (child.onAddNewRecord) {
          child.onAddNewRecord(data.data || {});
        }
      } else if (data.type && data.type == "protocol") {
        if (child.addNewPotocol) {
          child.addNewPotocol(data.data || {});
        }
      } else if (data.type && data.type == "topology") {
        if (child.handleNewData) {
          child.handleNewData(data.data);
        }
      }
    };
    this.ws.onopen = () => {
      console.log("connect the server successfully!");
    };
    // 出错
    this.ws.onerror = (error) => {
      console.log(error);
    };
    // 关闭
    this.ws.onclose = () => {
      console.log("webSocket断开连接");
    };
  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .menu-wrapper {
    width: 180px;
    height: 100vh;
    box-sizing: border-box;
  }
  .router-view {
    padding-left: 180px;
  }
  .view-wrapper {
    width: 100%;
    height: calc(~"100vh - 60px");
  }
}
* {
  padding: 0;
  margin: 0;
}
body {
  background: #f1f5fd;
  overflow-y: scroll;
  overflow-x: hidden;
  font-size: 16px !important;
}

.slide-enter,
.slide-leave-to {
}
.slide-leave,
.slide-enter-to {
}
.slide-enter-active {
  animation: slide-in 300ms ease-out;
}
.slide-leave-active {
  animation: slide-out 300ms ease-out;
  /* 这里在离开的时候，需要让这个元素脱离标准流，不然后面的元素动不了 */
  position: absolute;
}
/* 想要让动画平滑一点，需要加v-move的类名，v-可以别name的值 */
.slide-move {
  transition: all 300ms ease-in-out;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slide-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(80px);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fas {
  &.lg {
    font-size: 20px;
  }
  &.xx {
    font-size: 32px;
  }
}
</style>
