<template>
  <div class="menu-wrapper">
    <div class="menu-logo">
      <embed :src="require('../assets/wifi.svg')" />
    </div>
    <div class="menu-container menu-boxer">
      <!-- <router-link to="/">
        <div class="menu-item">
          <i class="fas fa-info-circle lg"></i> 系统信息
        </div>
      </router-link> -->
      <router-link to="/overview">
        <div class="menu-item"><i class="fas fa-poll lg"></i> 数据概览</div>
      </router-link>

      <a class="sub-menu-title" :class="{ expand: subMenuExpand.edge }">
        <div
          class="menu-item"
          @click="subMenuExpand.edge = !subMenuExpand.edge"
        >
          <i class="fas fa-share-alt lg"></i>智能感知
          <i class="fas fa-angle-down"></i>
        </div>
        <div
          class="sub-menu"
          :style="{ height: subMenuExpand.edge ? '150px' : 0 }"
        >
          <router-link to="/networktopology">
            <div class="sub-menu-item"><span>1.</span> 教室</div>
          </router-link>
          <router-link to="/networktopology2">
            <div class="sub-menu-item"><span>2.</span> 走廊</div>
          </router-link>
          <router-link to="/topograph">
            <div class="sub-menu-item"><span>3.</span> 鲁棒性计算</div>
          </router-link>
        </div>
      </a>

      <!-- <router-link to="/Adhocnet">
        <div class="menu-item">
          <i class="fas fa-code-branch lg"></i> 自组网
        </div>
      </router-link> -->

      <router-link to="/optimazation">
        <div class="menu-item">
          <i class="fas fa-code-branch lg"></i>智能组网
        </div>
      </router-link>

      <router-link to="/tsn">
        <div class="menu-item">
          <i class="fas fa-map-marked lg"></i> 时间敏感网络
        </div>
      </router-link>

      <router-link to="/protocol">
        <div class="menu-item"><i class="fas fa-code lg"></i> 协议解析</div>
      </router-link>

      <router-link to="/edgecomputing">
        <div class="menu-item">
          <i class="fas fa-network-wired lg"></i> 边缘计算
        </div>
      </router-link>

      <!-- <a class="sub-menu-title" :class="{ expand: subMenuExpand.blockchain }">
        <div
          class="menu-item"
          @click="subMenuExpand.blockchain = !subMenuExpand.blockchain"
        >
          <i class="fas fa-share-alt lg"></i>区块链平台
          <i class="fas fa-angle-down"></i>
        </div>
        <div
          class="sub-menu"
          :style="{ height: subMenuExpand.blockchain ? '550px' : 0 }"
        >
          <router-link to="/blockchain">
            <div class="sub-menu-item">
              <i class="fas fa-coins lg"></i>区块链
            </div>
          </router-link>
          <router-link to="/blockchain/overview">
            <div class="sub-menu-item"><span>1.</span> 区块链数据概览</div>
          </router-link>
          <router-link to="/blockchain/Nodetest">
            <div class="sub-menu-item"><span>2.</span> 节点管理</div>
          </router-link>
          <router-link to="/blockchain/performance">
            <div class="sub-menu-item"><span>3.</span> 区块链性能测试</div>
          </router-link>
          <router-link to="/simulation-setting">
            <div class="sub-menu-item"><span>4.</span> 仿真器设置</div>
          </router-link>
          <router-link to="/simulation-pow">
            <div class="sub-menu-item"><span>5.</span> PoW共识仿真</div>
          </router-link>
          <router-link to="/achievement/model1">
            <div class="sub-menu-item"><span>6.</span> 存储分配算法</div>
          </router-link>
          <router-link to="/achievement/model2">
            <div class="sub-menu-item"><span>7.</span> DBCP</div>
          </router-link>
          <router-link to="/achievement/model3">
            <div class="sub-menu-item"><span>8.</span> DLBN</div>
          </router-link>
          <router-link to="/achievement/model4">
            <div class="sub-menu-item"><span>9.</span> Sharding</div>
          </router-link>
          <router-link to="/sharding/overlap">
            <div class="sub-menu-item"><span>10.</span> Overlap Sharding</div>
          </router-link>
        </div>
      </a> -->

      <router-link to="/positioning">
        <div class="menu-item">
          <i class="fas fa-location-arrow lg"></i> 室内定位
        </div>
      </router-link>
      
      <router-link to="/crowdsensing">
        <div class="menu-item">
          <i class="fas fa-map-marked lg"></i> 群智感知
        </div>
      </router-link>
      
    </div>

    <div class="action-bottom menu-container">
      <div class="router-link">
        <div class="menu-item">
          <i class="fas fa-coins lg"></i>
          <a href="http://127.0.0.1:20000">区块链平台</a>
        </div>
      </div>

      <div class="router-link">
        <div class="menu-item">
          <i class="fas fa-comments lg"></i>
          <a href="http://211.81.55.174">智能问答平台</a>
        </div>
      </div>

      <a class="sub-menu-title">
        <div class="menu-item"><i class="fas fa-cog lg" />Setting</div>
      </a>
      <a class="sub-menu-title">
        <div class="menu-item"><i class="fas fa-sign-in-alt lg" />Log out</div>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      subMenuExpand: {
        mcs: false,
        edge: false,
        blockchain: false,
      },
    };
  },
};
</script>
<style lang="less">
@item_height: 50px;
@pc: #0e5fe2;
@sub_menu_anim: 300ms;
.menu-wrapper {
  background: white;
  padding: 0px 10px 30px 10px;
  box-shadow: 1px 0px 8px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  .menu-logo {
    padding: 10px 0;
    embed {
      width: 100%;
      // height: 70px;
    }
  }
}
#logomark_1_ {
  animation: spin 300ms linear infinite;
}

.menu-container {
  a {
    .fas {
      margin-right: 10px;
    }
    .menu-item {
      padding-left: 15px;
      box-sizing: border-box;
      text-decoration: none;
      color: #b1afc9;
      display: inline-block;
      width: 100%;
      height: @item_height;
      line-height: @item_height;
      position: relative;
      &::before {
        content: "";
        display: block;
        position: absolute;
      }
    }

    &.router-link-exact-active,
    &:hover {
      .menu-item {
        color: @pc;
      }
    }
  }
  .sub-menu-title {
    position: relative;
    display: block;
    border-radius: 15px;
    transition: background @sub_menu_anim ease-in-out;

    .menu-item {
      cursor: pointer;

      .fa-angle-up {
        position: absolute;
        right: 10px;
        top: @item_height / 2 - 8;
        transition: transform @sub_menu_anim ease-in-out;
      }
    }
    .sub-menu {
      overflow: hidden;
      transition: height @sub_menu_anim ease-in-out;
      padding-left: 25px;
      a {
        text-decoration: none;
        color: #b1afc9;
        font-weight: bold;
        line-height: @item_height;
        height: @item_height;

        // &.router-link-exact-active,
        &:hover {
          color: @pc;
        }
      }
    }
    &.expand {
      .menu-item {
        .fa-angle-up {
          transform: rotateZ(180deg) translateY(-2px);
        }
      }
    }
  }
}
.action-bottom {
  position: absolute;
  bottom: 10px;
}
.router-link {
  -webkit-text-size-adjust: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 15px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
  padding: 0;
  padding-left: 15px;
  box-sizing: border-box;
  text-decoration: none;
  color: #b1afc9;
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: relative;
  .fas {
    margin-right: 10px;
  }
  .menu-item {
    box-sizing: border-box;
    text-decoration: none;
    color: #b1afc9;
    display: inline-block;
    width: 100%;
    height: @item_height;
    line-height: @item_height;
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
    }
  }

  &.router-link-exact-active,
  &:hover {
    .menu-item {
      color: @pc;
    }
  }
}
</style>
