<template>
    <div class="intro-view view-wrapper">
        <div class="intro-wrapper">
            <img :src="require('../assets/neu-logo.png')"/>
            <img :src="require('../assets/whole-logo.png')"/>
            <h3>智慧物联网与大数据研究小组</h3>
            <div class="arrow">
                <Icon type="ios-arrow-dropright" size="64" @click="jumpToOverView"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        jumpToOverView() {
            this.$router.push("/overview")
        }
    }
}
</script>

<style lang="less" scoped>
.intro-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1001;
    margin: 10px 10px 0;
    margin-bottom: 0px;
    padding-top: 200px;
    width: 100%;
    background: white;
    text-align: center;
    h3 {
        font-size: 36px;
        margin-top: 100px;
    }
    .arrow {
        margin-top: 50px;
    }
    .ivu-icon-ios-arrow-dropright {
        cursor: pointer;
        &:hover {
            color: #005187;
        }
    }
}
</style>
