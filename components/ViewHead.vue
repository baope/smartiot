<template>
    <div class="view-head">
        <div class="search-input">
            <i class="fas fa-search"/>
            <input placeholder="Search here..." type="text"/>
        </div>
        <div class="right-container">
            <i class="fas fa-bell lg" />
            <div class="avatar" >
                <img :src="require('../assets/avatar.png')"/>
                <div>NEU Admin</div>
            </div>
                <i class="fas fa-ellipsis-v lg"  />
        </div>
    </div>
</template>

<style lang="less">
.view-head {
    line-height: 40px;
    padding: 0 30px;
    box-sizing: border-box;
    line-height: 60px;
    height: 60px;
    position: relative;
    background: white;
    // box-shadow: 5px 1px 5px rgba(0,0,0,0.1);

    .search-input {
        background: white;
        padding: 0px 20px;
        box-sizing: border-box;
        display: inline-block;
        border-radius: 30px;
        input {
            margin-left: 10px;
            border: none;
            background: transparent;
            outline: none;
            font-size: 18px;
        }
    }
    .right-container {
        position: absolute;
        right: 20px;
        top: 10px;
        display: flex;
        align-items: center;
        color: #8F9AA7;
        .fas {
            margin: -2px 30px;
        }
        .avatar {
            height: 40px;
            display: flex;
            align-items: center;
            img {
                margin-right: 15px;
                width: 40px;
                height: 40px;
                border-radius: 15px;
                object-fit: cover;
            }
        }
    }
}
</style>
