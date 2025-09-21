<template>
  <div class="view-wrapper" id="overload-view">
      <div class="overview-block block-item summary-table">
          <h3>分布式存储概览</h3>
          <table >
              <tbody>
              <tr>
                  <td>配置容量(Configured Capacity)</td>
                  <td>{{hdfs.total.ConfigCapacity}}</td>
              </tr>
                            <tr>
                  <td>当前容量(Present Capacity)</td>
                  <td>{{hdfs.total.PresentCapacity}}</td>
              </tr>
            
            <tr>
                  <td>DFS剩余(DFS Remaining)</td>
                  <td>{{hdfs.total.DFSRemaining}}</td>
              </tr>

              <tr>
                  <td>DFS使用情况(DFS Used)</td>
                  <td>{{hdfs.total.DFSUsed}}</td>
              </tr>
              <tr>
                  <td>DFS使用占比(DFS Used % )</td>
                  <td>{{hdfs.total.DFSUsedP}}</td>
              </tr>
              <tr>
                  <td>活跃节点(Live Nodes)</td>
                  <td>{{hdfs.total.LiveNodes}}</td>
              </tr>
              </tbody>
          </table>
      </div>

      <div class="summary-table">
          <h3>数据节点信息</h3>
          <table style="border-top-width: 1px">
              <thead>
                  <tr>
                      <th>节点IP(NodeIP)</th>
                      <th>节点(Node)</th>
                      <th>状态(Status)</th>
                      <th>容量(Capacity)</th>
                      <th>已用</th>
                      <th>非DFS</th>
                      <th>剩余</th>
                      <th>内存使用</th>
                      <th>CPU使用</th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="td" v-for="(item, _) in hdfs.nodes" :key="_">
                    <td>{{item.nodeIP}}</td>
                    <td>{{item.nodeName}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.capacity}}</td>
                    <td>{{item.used}}({{item.usedP}})</td>
                    <td>{{item.nonUsed}}</td>
                    <td>{{item.remaining}}({{item.remainingP}})</td>
                    <td>{{memcpu[_] && memcpu[_].mem || "加载中"}}</td>
                    <td>{{memcpu[_] && memcpu[_].cpu || "加载中"}}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        hdfs: {
            total: {},
            nodes: [],
        },
        memcpu: []
    };
  },
  mounted() {
    // this.getDfsBalance();
    this.getHdfsStatus();
    this.getMemCpu();
  },
  methods: {
    handleSendSucc(res) {
      if (res.data && res.data == "fail") {
        this.$Message["error"]({
          background: true,
          content: "Connection Lost",
        });
      }
    },
    handleSendFail(err) {
      console.log(err);
      this.$Message["error"]({
        background: true,
        content: "网络异常",
      });
    },
    getDfsBalance() {
      this.$axios
        .get("/cmdEC?cmd=DFS_BALANCE")
        .then(this.handleSendSucc)
        .catch(this.handleSendFail);
    },
    getHdfsStatus() {
      this.$axios
        .get("/cmdEC?cmd=HDFS_STATUS")
        .then(this.handleSendSucc)
        .catch(this.handleSendFail);
    },
    getMemCpu() {
      this.$axios
        .get("/cmdEC?cmd=GET_MEMCPU")
        .then(this.handleSendSucc)
        .catch(this.handleSendFail);
    },
    handleDfsBalance(data) {},
    handleHdsfStatus(data) {
        this.hdfs = JSON.parse(data);
    },
    handleMemCpu(data) {
        this.memcpu = JSON.parse(data);
    },
    handleSocket(msg) {
      msg = JSON.parse(msg);
      const cb_map = {
            DFS_BALANCE: this.handleDfsBalance, //存储负载均衡，后面加一个数代表百分比
            HDFS_STATUS: this.handleHdsfStatus, //获得节点存储信息
            GET_MEMCPU: this.handleMemCpu,
      }
      if (msg.status == "success") {
          const func = cb_map[msg.type]
          func && func(msg.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>

#overload-view {
    padding: 0 10px;
}
  .summary-table {
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
      border-top-width: 0px;
      border-left: 0;
      border-collapse: separate;
      width: 100%;
      tbody > tr:nth-child(odd) > td {
        background-color: #fafafa;
      }
    }

    th,
    td {
      max-width: 600px;
      padding: 12px 10px;
      line-height: 23px;
      text-align: left;
      border-left: 1px solid #ebeef5;
    }

    td {
      border-top: 1px solid #ebeef5;
      white-space: nowrap;
    }
  }
</style>