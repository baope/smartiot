<template>
  <div class="data-detail-wrapper">
     <div class="message-list">
       <div class="master-status">
         <h3>汇聚节点状态</h3>
         <Badge status="processing" :text="'正常 : ' + master[0]" />
  
         <Badge style="margin-left:15px" status="error" :text="'异常 : ' + (master[1])" />
       </div>
       <div class="slave-status">
         <h3>监测节点状态</h3>
        <Badge status="processing" :text="'正常 : ' + (slave[0])" />
  
         <Badge style="margin-left:15px" status="error" :text="'异常 : ' + slave[1]" />
       </div>
       <div class="format-message">
         <h3>传输数据</h3>
          <List border>
            <ListItem style="display: block" class="format-message-item" v-for="(item,_) in formatMessages" :key="_" >
              <Steps :current="2" size="small">
                <Step :title="'监测节点' + item.source"></Step>
                <Step :title="'汇聚节点' + item.target"></Step>
                <Step title="边缘计算中心"></Step>
              </Steps>
               <div>
                  <span style="display: inline-block; width: 50%">
                      <Icon type="ios-keypad" /> {{item.type}}
                  </span>
                  <span>
                      <Icon type="ios-podium" /> {{item.value}} <span v-if="item.type == '温度数据'">&#8451;</span>
                  </span>
               </div>
            </ListItem>
        </List>
       </div>
     </div>
  </div>
</template>
<script>
export default {
    props: ['messages'],
    watch: {
      messages(oVal, nVal) {
        this.handleNewMessages()
      }
    },
    data() {
      return {
        master: [0, 0],
        slave: [0, 0],
        formatMessages: []
      }
    },
    methods: {
      sum(arr) {
        var s = 0;
        for (var i=arr.length-1; i>=0; i--) {
          s += arr[i];
        }
        return [s, arr.length - s];
      },
      handleNewMessages() {
        const messages = this.messages;
        let breakMaster = []
        let breakSlave = []
        let formatMessages = []
        const dataTypeMap = {
          'fogy': ['烟雾数据', ''],
          'pres': ['压力数据', 'Pa'],
          'dist': ['距离数据', 'cm'],
          'hunidity': ['湿度数据', 'RH'],
          'Temperature': ['温度数据', ''],
          'voice': ['声音数据', '']
        }
        messages.map(item => {
          let {breakmain, breakson, edge, message} = item;
          if(breakMaster.length == 0) {
            breakMaster = breakmain;
            breakSlave = breakson;
          } else {
            for(let _ = 0; _ < breakMaster.length; _ ++) {
              breakMaster[_] &= breakmain[_]
            }
            for(let _ = 0; _ < breakSlave.length; _ ++) {
              breakSlave[_] &= breakson[_]
            }
          }
          message.map(msg => {
            formatMessages.push({
              source: edge[0],
              target: edge[1],
              type: dataTypeMap[msg.name][0],
              value: msg.value + dataTypeMap[msg.name][1]
            })
          })
        });
        this.master = this.sum(breakMaster)
        this.slave = this.sum(breakSlave)
        let limit = 15
        this.formatMessages = formatMessages.concat(this.formatMessages).slice(0, limit)
      }
    }
}
</script>
<style lang="less" scoped>
.fas {
    color: #22A0DC;
    font-size: 50px;
}
</style>