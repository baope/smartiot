<template>
  <div>
    <div id="test-chart" style="height: 600px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: undefined,
      
    };
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("test-chart"));
    this.setChartOption()
  },

  methods: {
    setChartOption() {
    const option = {
    title: {
        text: 'Graph 简单示例'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',

        xAxis: {
            show: false,
            type: 'value',
            min: 0,
            max: 1000,
        },
        yAxis: {
            show: false,
            type: 'value',
            min: 0,
            max: 1000
        },      
    series: [
        {
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            
            label: {
                show: true,
                position: 'bottom'
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 13],
            edgeLabel: {
                fontSize: 20
            },
            data: [{
                name: 'sensor',
                symbolSize: [113.5,150],
                symbol: 'image://' + require('../assets/sensor.png'),
                // x: 300,
                // y: 300 
                value: [0, 500]
            }, {
                name: 'orderer',
                symbolSize: [172.9,95.2],
                symbol: 'image://' + require('../assets/orderer.png'),
                // x: 955,
                // y: 400
                value: [380, 280]
            },
            {
                name: 'peer-comitter',
                symbolSize: [172.9,95.2],
                symbol: 'image://' + require('../assets/peer-comit.png'),
                // x: 1150,
                // y: 100
                value: [450, 750]
            },
            {
                name: 'block1',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/block.png'),
                // x: 1150,
                // y: 100
                label:{
                    show:false
                },               
                value: [550, 750]
            },
            {
                name: 'block2',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/block.png'),
                // x: 1150,
                // y: 100
                label:{
                    show:false
                },                 
                value: [650, 750]
            },
            {
                name: 'block3',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/block.png'),
                label:{
                    show:false
                },                 
                // x: 1150,
                // y: 100
                value: [750, 750]
            },                                    
            {
                name: 'block6',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/block.png'),
                label:{
                    show:false
                },                 
                // x: 1150,
                // y: 100
                value: [550, 500]
            },
            {
                name: 'block5',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/block.png'),
                label:{
                    show:false
                },                 
                // x: 1150,
                // y: 100
                value: [650, 500]
            },
            {
                name: 'block4',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/block.png'),
                label:{
                    show:false
                },                 
                // x: 1150,
                // y: 100
                value: [750, 500]
            },                                    
            {
                name: 'block7',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/block.png'),
                label:{
                    show:false
                },                 
                // x: 1150,
                // y: 100
                value: [550, 250]
            },
            {
                name: 'block8',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/block.png'),
                label:{
                    show:false
                },                 
                // x: 1150,
                // y: 100
                value: [650, 250]
            },
            {
                name: 'block9',
                symbolSize: [34.8,34.8],
                symbol: 'image://' + require('../assets/shengluehao.png'),
                label:{
                    show:false
                },                 
                // x: 1150,
                // y: 100
                value: [750, 250]
            },                                                            
            {
                name: 'peer-end',
                symbolSize: [172.9,95.2],
                symbol: 'image://' + require('../assets/peer-end.png'),
                label:{
                    show:false
                },                 
                // x: 750,
                // y: 100
                value: [300, 750]
            },
            {
                name: 'sdk',
                symbolSize: [100.1,126],
                symbol: 'image://' + require('../assets/SDK.png'),
                label:{
                    show:false
                },                 
                // x: 550,
                // y: 300
                value : [150, 500]
            },
            ],    
            
                    
        },
        {
        name: 'A',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: 'image://' + require('../assets/tx.png'),
            color: 'rgba(55,155,255,0.5)',
            symbolSize: [34.4,29.2],         
        },
        lineStyle: {
            normal: {
                curveness: 0,
                width: 3                
            },            
        },
        data: [
            [{coord: [50, 480]},{coord: [110, 480]}], [{coord: [170, 580]},{coord: [225, 750]}]
        ]
        },              
        {
        name: 'B',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: 'image://' + require('../assets/correct.png'),
            color: 'rgba(55,155,255,0.5)',
            symbolSize: [34.8,34.8],         
        },
        lineStyle: {
            normal: {
                curveness: 0,
                width: 3                
            },            
        },
        data: [
            [{coord: [245, 635]},{coord: [190, 465]}], 
            [{coord: [190, 435]},{coord: [315, 305]}]
        ]
        },  
        {
        name: 'C',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: 'image://' + require('../assets/block.png'),
            color: 'rgba(55,155,255,0.5)',
            symbolSize: [34.8,34.8],         
        },
        lineStyle: {
            normal: {
                curveness: 0,
                width: 3                
            },            
        },
        data: [
            [{coord: [395, 400]},{coord: [435, 585]}], 
            [{coord: [365, 400]},{coord: [325, 590]}]
        ]
        },
        {
        name: 'D',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: 'image://' + require('../assets/block.png'),
            color: 'rgba(55,155,255,0.5)',
            symbolSize: [34.8,34.8],         
        },
        lineStyle: {
            normal: {
                curveness: 0,
                width: 3                
            },            
        },
        data: [
            [{coord: [550, 750]},{coord: [650, 750]}], 
            [{coord: [365, 400]},{coord: [325, 590]}]
        ]
        },                
    ]
};
      this.chart.setOption(option, true);
    },
  },
};
</script>