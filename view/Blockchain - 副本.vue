

<template>
  <div class="blockchainview">
    <div class="block">
      <div class="summary-table0">
        <h3>当前区块链节点架构</h3>
        <img id="blockchain-img" :src="require('../assets/21283.jpg')" />
      </div>
      <div class="summary-table2">
        <h3>当前区块链节点状态</h3>
        <table class="runapps">
          <thead>
            <tr class="tr">
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tr">
            <td>2</td><td>2</td>
            </tr>
            <tr class="tr">
            <td>2</td><td>2</td>
            </tr>
            <tr class="tr">
            <td>2</td><td>2</td>
            </tr>
            <tr class="tr">
            <td>2</td><td>2</td>
            </tr>
            <tr class="tr">
            <td>2</td><td>2</td>
            </tr>
                                                        
          </tbody>
        </table>
      </div>
    </div>
    <div class="view-head1">
      <div class="search-input">
        <i class="fas fa-search" />
        <input placeholder="请输入传感器ID" type="text" />
      </div>
                <el-button type="primary" id="search_button"
            >确 定</el-button
          >
    </div>

    <div class="summary-table1">
      <h3>链上传感器节点</h3>
      <table class="runapps">
        <thead>
          <tr class="tr">
            <th>SensorID</th>
            <th>SensorArea</th>
            <th>SensorStatus</th>
            <th>DataTimestamp</th>
            <th>DataType</th>
            <th>DataInfo</th>
          
            <th>history</th>
          </tr>
        </thead>
        <tbody>
          
          <tr class="tr">
            <td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td>
            <td>
              <el-button type="text" @click="handleClick(),SensorID='1' "
                >点击打开 Dialog</el-button
              >
            </td>
          </tr>
          <tr class="tr">
            <td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td>
            <td>
              <el-button type="text" @click="handleClick(),SensorID='2' "
                >点击打开 Dialog</el-button
              >
            </td>
          </tr>

        </tbody>
      </table>
      

      <el-dialog
        title="节点历史记录" :visible.sync="dialogVisible" width="70%">
           <div class="summary-table1">
      <table class="runapps">
        <thead>
          <tr class="tr">
            <th>SensorID</th>
            <th>SensorArea</th>
            <th>SensorStatus</th>
            <th>DataTimestamp</th>
            <th>DataType</th>
            <th>DataInfo</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tr">
            <td>{{SensorID}}</td><td>{{SensorArea}}</td><td>{{SensorStatus}}</td><td>{{DataTimestamp}}</td><td>{{DataType}}</td><td>{{DataInfo}}</td>
          </tr>
        </tbody>
      </table>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog> 


    </div>
  </div>
</template>




<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialogVisible: false,
      SensorID: 'hahaha',
      SensorArea: 'hahaha',
      SensorStatus: 'hahaha',
      DataTimestamp: 'hahaha',
      DataType: 'hahaha',
      DataInfo: 'hahaha',
    };
  },
  methods: {
    handleClick() {
       /* axios.post('url').then(res => {
            const data = res.data;
            this.dialogVisible = true;
            this.dialogText = 'wuwuwu'
        })  */
        this.dialogVisible = true;            
    }
  },
};
</script>
<style lang="less">
.blockchainview {
  margin-left: 1%;
  margin-top: 0.5%;
  width: 80%;
  display: flex;
  flex-direction: column;
}
.block {
  height:30%;
  display: flex;
  flex-direction: row;
}
.view-head1 {
  margin-top: 10px;
  line-height: 40px;
  padding: 0 30px;
  box-sizing: border-box;
  line-height: 60px;
  height: 60px;
  width: 100%;
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
}
.summary-table0 {
  width: 69%;

  padding: 15px;
  background: white;
  // border-radius: 15px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  h3 {
    margin-bottom: 10px;
  }
  table {
    border: 1px solid #ebeef5;
    border-left: 0;
    border-collapse: separate;
    width: 100%;
    tbody > tr:nth-child(odd) > td {
      background-color: #fafafa;
    }
  }
}
.summary-table1 {
  padding: 20px 50px;
  background: white;
  // border-radius: 15px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  h3 {
    margin-bottom: 10px;
  }
  table {
    border: 1px solid #ebeef5;
    border-left: 0;
    border-collapse: separate;
    width: 100%;
    tbody > tr:nth-child(odd) > td {
      background-color: #fafafa;
    }
  }
}
.summary-table2 {
  margin-left: 1%;
  width: 30%;
  padding: 15px;
  background: white;
  // border-radius: 15px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  h3 {
    margin-bottom: 10px;
  }
  table {
    font-size: 25px;
    border: 1px solid #ebeef5;
    border-left: 0;
    border-collapse: separate;
    width: 100%;
    tbody > tr:nth-child(odd) > td {
      background-color: #fafafa;
    }
  }
}
</style>


<style lang="less">
#blockchain-img {
  margin-left: 4.5%;
  width: 50%;
  height: 50%;
}
#bt {
  position: relative;
  color: white;
  font-size: 30px;
  width: 40%;
  top: 4px;
  margin: 0 auto;
  text-align: center;
}
#sideBar1 {
  width: 50%;
  height: 5 0%;
  margin-top: 15px;
}
.searchUl .list01 select {
  width: 100px;
}
.searchUl .list02 input {
  width: 300px;
}
.searchUl .list03 input {
  width: 100px;
  padding: 2px 15px;
  display: inline-block;
  color: #fff;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #0d6d9b;
}

ul {
  list-style: none;
}
:focus {
  outline: 0;
}
a:link {
  color: #696c73;
  text-decoration: none;
}

a:visited {
  color: #696c73;
  text-decoration: none;
}

a:hover {
  color: #696c73;
  text-decoration: underline;
}

a:active {
  color: #696c73;
  text-decoration: underline;
}

iframe#car {
  min-height: 685px;
  height: 100%;
}
#conts {
  width: 100%;
}
#f2 {
  margin: 0 auto;
  width: 453px;
  font-size: 17px;
  color: white;
  top: 30px;
  position: relative;
}
#search_button {
  float:right;
  margin-top:10px ;
}
#bt1 {
  padding: 2px 0px;
  font-size: 20px;
}
</style>