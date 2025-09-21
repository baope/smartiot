<template>
  <div class="data-detail-wrapper">
     <div class="message-list">
       <div class="format-message">
         <h3>传输数据</h3>
          <List border>
            <ListItem style="display: block" class="format-message-item" v-for="(item,_) in formatMessages" :key="_" >
              <Steps :current="2" size="small">
                <Step :title="'自组网节点' + item.source"></Step>
                <Step :title="'汇聚节点' + item.target"></Step>
               
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
    props: ['messages', 'edge'],
    watch: {
      messages(oVal, nVal) {
        this.handleNewMessages()
      }
    },
    data() {
      return {
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
        let formatMessages = []
        
        const dataTypeMap = {
          'fogy': ['烟雾数据', ''],
          'pres': ['压力数据', 'Pa'],
          'dist': ['距离数据', 'cm'],
          'hunidity': ['湿度数据', 'RH'],
          'Temperature': ['温度数据', ''],
          'voice': ['声音数据', ''],
          'unkonw': ['未知数据', ''],
        }
        messages.map(msg => {
          console.log(msg)
            formatMessages.push({
              source: msg.source,
              target: msg.target,
              type: dataTypeMap[msg.name][0],
              value: msg.value + dataTypeMap[msg.name][1]
            })
        });
        console.log("formatMessages:",formatMessages);
        this.formatMessages = formatMessages.concat(this.formatMessages).slice(0, 15)
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