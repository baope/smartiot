<template>
    <div class="crowdsensing-view view-wrapper">
        <div class="left-wrapper">
            <div class="left-top-wrapper">
                <div class="left-left-wrapper">
                    <div class="area-split card-wrapper">
                        <!-- <div class="card-title">区域划分</div>
                        <div class="area-container">
                            <div class="area-item" v-for="(item, _ ) in areas" :key="item.name">
                                <img src="https://img2.baidu.com/it/u=1255166310,606037136&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500"/>
                                <div>{{item.name}}</div>
                            </div>
                        </div> -->
                        <div class="card-title">区域划分</div>
                        <div class="area-container">
                            <div class="area-item">
                                <img @click="largeImgIdx = 1" src="https://img2.baidu.com/it/u=1255166310,606037136&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500"/>
                                <div>正西区</div>
                            </div>
                            <div class="area-item">
                                <img @click="largeImgIdx = 2" src="https://img2.baidu.com/it/u=1255166310,606037136&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500"/>
                                <div>正北区</div>
                            </div>
                            <div class="area-item">
                                <img @click="largeImgIdx = 3" src="https://img2.baidu.com/it/u=1255166310,606037136&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500"/>
                                <div>东北区</div>
                            </div>
                            <div class="area-item">
                                <img @click="largeImgIdx = 4" src="https://img2.baidu.com/it/u=1255166310,606037136&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500"/>
                                <div>西南区</div>
                            </div>
                            <div class="area-item">
                                <img @click="largeImgIdx = 5" src="https://img2.baidu.com/it/u=1255166310,606037136&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500"/>
                                <div>中心区</div>
                            </div>
                            <div class="area-item">
                                <img @click="largeImgIdx = 6" src="https://img2.baidu.com/it/u=1255166310,606037136&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500"/>
                                <div>正南区</div>
                            </div>
                        </div>
                    </div>
                    <div class="data-distribute card-wrapper">
                        <div class="card-title">数据分布</div>
                        <div id="distribute-pie" class="distribute-pie"></div>
                        <div id="distribute-pie2" class="distribute-pie"></div>
                        <div class="distribute-legend">
                            <div class="legend-item" v-for="item in distributeLegend" :key="item.name">
                                <div class="squa"></div>
                                <div class="item-val">{{item.val}}%</div>
                                <div class="item-name">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="left-right-wrapper">
                    <div class="map-wrapper" id="a-map">

                    </div>
                    <div class="indicators">
                        <div class="block" v-for="item in indicators" :key="item.name">
                            <div class="indicator-title">{{item.name}}
                                <i class="fas fa-circle" :class="item.status"/>
                            </div>
                            <div class="indicator-val">
                                {{item.value}}
                                <span>{{item.unit}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left-bottom-wrapper">
                <div class="card-wrapper">
                    <div class="cart-title">温湿度趋势图</div>
                    <div id="pollute-line"></div>
                </div>
            </div>
        </div>
        <div class="right-wrapper">
            <div class="card-wrapper">
                <div class="card-title">数据详情
                    <div class="float-right">
                        上传时间
                    </div>
                </div>
                <div class="weather-container"></div>
                <div class="mcs-container">
                    <transition-group name="slide">
                    <div class="mcs-item" v-for="item in mcsAirRecord" :key="item.timestamp">
                        <div class="icon">
                            <i class="fas fa-campground xx"/>
                        </div>
                        <div class="content">
                            <div class="area-name">
                                <span>{{item.area || '外部区域'}}</span>
                                <span><b>{{item.timestamp}}</b></span>
                            </div>
                            <div class="data-desc">
                                <span class="normol">正常<b>{{item.okCount}}</b></span>
                                <span class="warn">警告<b>{{item.warnCount}}</b></span>
                                <span class="link" @click="onMscRecordClick(item)">查看数据</span>
                            </div>
                        </div>
                    </div>
                    </transition-group>
                </div>
            </div>
        </div>
        <div class="area-img-show" v-if="largeImgIdx">
            <div class="shadow"  @click="largeImgIdx = undefined"></div>
            <div class="close-btn" @click="largeImgIdx = undefined">
                <i class="fas fa-times lg"/>
            </div>
            <img class="show-img" :src="areas[largeImgIdx - 1].imgUrl"/>
            <div class="show-text">
                {{areas[largeImgIdx - 1].name}}
            </div>
            <div class="left-btn" :class="{disable: largeImgIdx == 1}" @click="largeImgIdx -= 1">
                    <i class="fas fa-angle-left xx"/>
            </div>
            <div class="right-btn" :class="{disable: largeImgIdx == areas.length}" @click="largeImgIdx += 1">
                    <i class="fas fa-angle-right xx"/>
            </div>
        </div>
    </div>
</template>

<script>
import AMap from 'AMap';
import Loca from 'Loca';
import Weather from '@/components/Weather';
import { formatUnixtimestamp, lnglatToG20, add3dPoints, getPolluteOption, getDistributePieOption, convertWeatherIcon } from "../common";

export default {
    components: {Weather},
    data() {
        return {
            indicators:  [
                {name: 'Air pressure', value: '71.000', unit: 'Kpa', status: 'ok'},
                {name: 'Noise', value: '36.000', unit: 'dB', status: 'ok'},
                {name: 'Light', value: '820.000', unit: 'lx', status: 'ok'},
                {name: 'Temperature', value: '12.000', unit: 'C', status: 'ok'},
                {name: 'Humidity', value: '33.000', unit: 'RH', status: 'ok'},
            ],
            areas: [
                {name:'正西区', imgUrl: require('../assets/map.png')},
                {name:'正北区', imgUrl: require('../assets/map.png')},
                {name:'东北区', imgUrl: require('../assets/map.png')},
                {name:'西南区', imgUrl: require('../assets/map.png')},
                {name:'中心区', imgUrl: require('../assets/map.png')},
                {name:'正南区', imgUrl: require('../assets/map.png')},
            ],
            distributePie: undefined,
            distributePie2: undefined,
            polluteLine: undefined,
            distributeLegend: [],
            map: undefined,
            object3DLayer: undefined,
            lineGeo: undefined,
            pointsGeo: undefined,
            largeImgIdx: undefined,
            mcsAirRecord: [],
            todayWeather: {},
            tomorrowWeather: {}
        }
    },
    mounted() {
        this.distributePie = this.$echarts.init(document.getElementById('distribute-pie'));
        this.distributePie2 = this.$echarts.init(document.getElementById('distribute-pie2'));
        this.polluteLine = this.$echarts.init(document.getElementById('pollute-line'));
        this.initMap();

        this.getPolluteLine();
        this.getDistributePie();
        this.getMcsRecord();
        this.getWeatherInfo();
    },
    methods: {
        initMap() {
            var map = new AMap.Map('a-map', {
                zoom: 18,
                center: [123.424257, 41.653109],
                viewMode: '3D',
                pitch: '60',
                mapStyle: 'amap://styles/6aac1eba10e27f90a28e6ea1486fabbd'
            })

            const object3DLayer = new AMap.Object3DLayer({zIndex: 100, opacity: 1});
            map.add(object3DLayer);

            const _this = this;
            map.on('click', function(ev) {
                const pixel = ev.pixel;
                const px = new AMap.Pixel(pixel.x, pixel.y);
                const obj = map.getObject3DByContainerPos(px, [object3DLayer], false) || {};
                if (obj.index) {
                    console.log(obj.index);
                    _this.onMscRecordClick(_this.mcsAirRecord[Math.floor(obj.index / 2)])
                }
            });
            this.map = map;
            this.object3DLayer = object3DLayer;
        },
        getPolluteLine() {
            const currHour = (new Date().getHours() + 1) % 24;

            this.$axios('/mcs/getMcsLine').then(res => {
                const data = res.data || [];
                this.setPolluteLine(data);
            });
        },
        getDistributePie() {
            // mock数据
            // const mockPie = [{name: '正西区', val: 123},{name: '正北区', val: 123},{name: '东北区', val: 123},{name: '东南区', val: 123},{name: '中心区', val: 123},{name: '正南区', val: 123}]
            const _this = this;
            this.$axios.get('/mcs/getMcsDistribute').then(res => {
                _this.setDistributePie(res.data || []);
            })
        },
        getMcsRecord() {
            this.$axios.get("/mcs/getByFilter").then(res => {
                const data = (res.data || []).map(item => {
                    return this.handleMcsRecord(item);
                })
                this.mcsAirRecord = data;
                this.setMapPoint();
                // if ((data || []).length > 0) {
                //     this.onMscRecordClick(data[0]);
                // }
            })
        },
        getWeatherInfo() {
            this.$axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=120112&key=d93d11ca3a4943f54ad1000471bffc10&extensions=all').then(res => {
                const data = res.data;
                const forecasts = data.forecasts || [];
                if (forecasts.length > 0) {
                    const casts = forecasts[0].casts;
                    this.todayWeather = casts[0];
                    this.tomorrowWeather = casts[1];
                    this.todayWeather.type = convertWeatherIcon(casts[0].dayweather);
                    this.tomorrowWeather.type = convertWeatherIcon(casts[1].dayweather);
                }
            })
        },
        handleMcsRecord(item) {
            item.timestamp = formatUnixtimestamp(item.timestamp);
            item.status = []
            item.status.push(item.pm25 <= 110 ? 'ok' : item.pm25 <= 150 ? 'warn' : 'err');
            item.status.push(item.pm10 <= 30 ? 'ok' : item.pm10 <= 75 ? 'warn' : 'err');
            item.status.push(item.co2 <= 500 ? 'ok' : item.co2 <= 1200 ? 'warn' : 'err');
            if(12 <= item.Temperature && item.Temperature <= 25) {
                item.status.push('ok')
            } else {
                item.status.push('warn')
            }
            item.status.push(item.Humidity >= 80 ? 'err' : item.Humidity >= 70 ? 'warn' : 'ok');
            item.okCount = 0
            item.warnCount = 0
            console.log(item)
            for(let _ = 0; _ < item.status.length; _ ++) {
                if (item.status[_] == 'ok') {
                    item.okCount += 1;
                } else {
                    item.warnCount += 1;
                }
            }
            return item
        },
        setDistributePie(collect) {
            const data = []
            collect.map(item => {
                if(item._id != '外部区域') {
                    data.push(item)
                }
            })
            const options = getDistributePieOption(data);
            const allData = options[0]

            this.distributeLegend = data.map(item => {
                return {
                    name: item._id,
                    val: (item.val * 100 / allData).toFixed(2) 
                };
            })
            this.distributePie.setOption(options[1]);
            this.distributePie2.setOption(options[2]);
        },
        setPolluteLine(collect) {
           const option = getPolluteOption(collect);
            this.polluteLine.setOption(option);
        },
        setMapPoint() {
            const points = this.mcsAirRecord.map(item => {
                return [101.827687, 36.588897]
                // return [item.longitude, item.latitude]
            });
            
            const object3DLayer = this.object3DLayer;
            object3DLayer.clear();
            const lines = new AMap.Object3D.Line();
            const lineGeo = lines.geometry;

            const points3D = new AMap.Object3D.RoundPoints();
            points3D.transparent = true;
            const pointsGeo = points3D.geometry;

            for(let _ = 0; _ < points.length; _++) {
                const center = lnglatToG20(this.map, points[_]);
                add3dPoints(center, lineGeo, pointsGeo);
            }

            points3D.borderColor = [218/255,165/255,9/255, 0.75];
            points3D.borderWeight = 3;
            object3DLayer.add(lines);
            object3DLayer.add(points3D);
        },
        onMscRecordClick(item) {
            this.indicators[0].value = item.pm25.toFixed(3);
            this.indicators[1].value = item.pm10.toFixed(3);
            this.indicators[2].value = item.co2.toFixed(3);
            this.indicators[3].value = item.Temperature.toFixed(3);
            this.indicators[4].value = item.Humidity.toFixed(3);
            for(let _ = 0; _ <= 4; _ ++) {
                this.indicators[_].status = item.status[_];
            }
            console.log(this.indicators)
            this.map.panTo([item.longitude, item.latitude]);
        },
        onAddNewRecord(item) {
            this.mcsAirRecord.unshift(this.handleMcsRecord(item));
            this.setMapPoint();
            this.onMscRecordClick(item);
        }
    }
}
</script>
<style lang="less" scoped>
.crowdsensing-view {
    background: #E9E9E9;
    display:  flex;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    .card-wrapper {
        background: white;
        padding: 15px;
    }
    .card-title{
        font-weight: bold;
        .float-right {
            float: right;
        }
    }
}
.left-wrapper {
    width: 75%;
    height: 100%;
}
#pollute-line {
    width: 100%;
    height: 100%;
}
.right-wrapper {
    margin-left: 15px;
    flex-grow: 1;

    .card-wrapper {
        height: 100%;
        overflow: auto scroll;
    }
}
.left-top-wrapper {
    display: flex;
    height: 70%;

    .left-left-wrapper {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .left-right-wrapper {
        flex-grow: 1;
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        position: relative;
        .map-info {
            position: absolute;
            background: rgba(255,255,255,0.9);
            left: 10px;
            top: 10px;
            z-index: 100;
            padding: 10px;
            box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
            .info-item {
                span {
                    display: inline-block;
                    line-height: 22px;
                    &:first-child {
                        width: 80px;
                    }
                }
            }
        }
    }
    .data-distribute {
        margin-top: 15px;
        flex-grow: 1;
        position: relative;
        z-index: 0;
        .distribute-pie{
            position: absolute;
            top: 15px;
            left: 0;
            width: calc(~'100% - 110px');
            height: 100%;
        }
    }
    .area-split {
        height: 40%;
    }
    .map-wrapper {
        flex-grow: 1;
        background: gainsboro;
        margin-bottom: 10px;
    }
    .indicators {
        display: flex;
        justify-content: space-between;
        .block {
            padding: 10px;
            background: #F2F2F2;
            flex-grow: 1;
            margin-right: 15px;
            &:last-child {
                margin-right: 0;
            }
        }
        .indicator-title {
            font-size: 15px;
            font-weight: bold;
            line-height: 16px;
            .fas {
                font-size: 10px;
                float: right;
                &.ok {
                    color: #409EFF;
                }
                &.warn {
                    color: #E6A23C;
                }
                &.err {
                    color: #F56C6C;
                }
            }
        }
        .indicator-val {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            span{
                font-size: 15px;
                font-weight: normal;
            }
        }
    }
}
.distribute-legend {
    padding-left: calc(~'100% - 110px');
    padding-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: calc(~'100% - 15px');
    .legend-item {
        position: relative;
        height: 33%;
        &:nth-child(1) .squa { background: #33C2F0;}
        &:nth-child(2) .squa { background: #249EFF;}
        &:nth-child(3) .squa { background: #6EBDFE;}
        &:nth-child(4) .squa { background: #9DD3FF;}
        &:nth-child(5) .squa { background: #0181CE;}
        &:nth-child(6) .squa { background: #022866;}

    }
    .squa {
        position: absolute;
        top: 7px;
        left: -10px;
        width: 6px;
        height: 3px;
    }
    .item-val {
        font-weight: bold;
        font-size: 14px;
    }
    .item-name {
        color: rgb(185, 184, 184) ;
        font-size: 14px;
    }
}
.area-container {
    display: flex;
    flex-wrap: wrap;
    height: calc(~'100% - 15px');
    justify-content: space-between;
    .area-item {
        width: 32%;
        height: 43%;
        margin-top: 2%;
        text-align: center;
        font-size: 14px;
        color: gray;
        img {
            width: 100%;
            height: calc(~'100% - 20px');
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
.area-img-show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    .shadow {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 105;
    }
    .show-text, .show-img, .close-btn, .left-btn, .right-btn {
        position: fixed;
        z-index: 106;
    }
    .left-btn, .right-btn {
        width: 50px;
        height: 50px;
        text-align: center;
        top: calc(~'50vh - 25px');
        background: white;
        border-radius: 50%;
        padding-top: 9px;
        box-sizing: border-box;
        &:hover {
            cursor: pointer;
            background: ghostwhite;
        }
        &.disable {
            pointer-events: none;
            background: gray;
        }
    }
    .show-img {
        max-width: calc(~'100vw - 200px');
        max-height: calc(~'100vh - 100px');
        top: 49vh;
        left: 50vw;
        transform: translateX(-50%) translateY(-50%);
        z-index: 100000000000;
    }
    .show-text {
        width: 100%;
        left: 0;
        text-align: center;
        bottom: 25px;
        color: white;
    }
    .left-btn {
        left: 25px;
    }
    .right-btn {
        right: 25px;
    }
    .close-btn {
        width: 100px;
        height: 100px;
        background: white;
        right: -50px;
        top: -50px;
        border-radius: 50%;
        cursor: pointer;
        .fas {
            position: relative;
            top: 57.5px;
            left: 25px;
        }
    }
}
.left-bottom-wrapper{
    height: calc(~'30% - 10px');;
    .card-wrapper {
    margin-top: 10px;
    height: 100%;
}
} 

.mcs-container {
    .mcs-item {
        display: flex;
        align-items: center;
        margin: 15px 0;
        .icon {
            color: #17A1E3;
            margin-right: 15px;
        }
        .content {
            flex-grow: 1;
            .area-name {
                display: flex;
                align-items: center;
                justify-content: space-between;
                span {
                    &:last-child {
                        font-size: 14px;
                    }
                }
            }
            .data-desc {
                .normol b{
                    color: #17A1E3;
                    margin: 0 5px;
                }
                .warn b {
                    color: orangered;
                    margin: 0 5px;
                }
                .link {
                    cursor: pointer;
                    color: #17A1E3;
                    float: right;
                }
            }
        }
    }
}
.weather-wrapper {
    display: flex;
    margin: 15px 0;
    justify-content: space-around;
    .weather-item {
        text-align: center;
    }
}
</style>
