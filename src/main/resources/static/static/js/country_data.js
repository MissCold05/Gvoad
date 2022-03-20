/**
 * Created by zhangyipeng on 2021/12/23.
 */

var countryHeatMap = null;
var countryMapArea = null;

var country_data = new Vue({
    el: '#country_data',

    data: {
        countryEchartsData: {
            mostCountryOf20Affiliation: {
                countryNameList: [],
                countryCountList: []
            },
            country_list: [
                { value: "1", label: "测试" }
            ],
            country_chosen: "",

            heatMapIsInitialized: false,
            countryHeatMapIsLoading: false,
            heatMapData: {
                data: [
                    { lat: 24.6408, lng: 46.7728 },
                    { lat: 50.75, lng: -1.55 },
                    { lat: 31.22, lng: 121.48 }
                ],
                capitalData: {
                    'China': {lat: 39.55, lng: 116.20},
                    'United States': { lat: 39.91, lng: -77.02 },
                    'United Kingdom' : { lat:51.36, lng: -0.05 },
                    'India' : { lat: 28.37, lng: 77.13 },
                    'Japan': { lat: 35, lng: 139 },
                    'Iran' : { lat: 35.44, lng: 51.30 },
                    'Canada' : { lat: 45.27, lng: -75.42 },
                    'South Korea' : { lat: 37.31, lng: 126.58 },
                    'Germany' : { lat: 52.30, lng: 13.25 },
                    'Taiwan' : { lat: 25.0307, lng: 121.5200 },
                    'Netherlands' : {  lat: 4.54, lng: 52.23 },
                    'Australia' : { lat: -35.15, lng: 149.08 },
                    'Italy' : { lat: 41.54, lng: 12.29 },
                    'Spain' : { lat: -3.45, lng: 40.25 },
                    'Singapore' : { lat: 1, lng: 103 },
                    'Norway' : { lat: 59.55, lng: 10.45 },
                    'Czech Republic' : { lat: 14.22, lng: 50.05 },
                    'Greece' : { lat: 23.46, lng: 37.58 },
                    'Hong Kong' : { lat: 22.3193, lng: 114.1694 },
                    'Vietnam' : { lat: 21.05, lng: 105.55 },
                    '': {lat: 30, lng: 0},
                },
            },

            countryAnimation: {

            }
        }
    },

    methods: {
        tip(info, style, pos = 200) {
            this.$message({
                message: info,
                type: style,
                offset: pos
            });
        },

        httpGet(urlStr, paramMap, successFunc, failFunc) {
            axios.get(urlStr, { params: paramMap }).then(successFunc).catch(failFunc);
        },

        // 更新柱状图
        freshCountryBarChart(htmlId, itemNameList, itemValueList) {
            echarts.init(document.getElementById(htmlId)).setOption({
                tooltip: {
                    trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                    axisPointer: {// 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: itemNameList,
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: itemValueList,
                    type: 'bar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                        ])
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ])
                        }
                    },
                }]
            });
        },

        // 更新热力图
        freshCountryHeatMap(htmlId, positionList) {
            if (!this.countryEchartsData.heatMapIsInitialized) {
                this.countryEchartsData.heatMapIsInitialized = true;
                let baseLayer = L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '...',
                        maxZoom: 18
                    }
                );
                let cfg = {
                    "radius": 2,
                    "maxOpacity": .8,
                    "scaleRadius": true,
                    "useLocalExtrema": true,
                    "scrollWheelZoom":false,
                    latField: 'lat',
                    lngField: 'lng',
                    valueField: 'count'
                };
                countryHeatMap = new HeatmapOverlay(cfg);
                countryMapArea = new L.Map(htmlId, {
                    center: new L.LatLng(30, 0),
                    zoom: 3,
                    layers: [baseLayer, countryHeatMap],
                    accessToken: 'pk.eyJ1IjoibWlzc2NvbGQwNSIsImEiOiJjbDAxdTNldGwweG53M2twNjJlcGFjN2trIn0.Rrj1JGc1gWkS30G6rJwxuw'
                });
            }
            this.countryEchartsData.heatMapData.data = positionList;
            countryHeatMap.setData(this.countryEchartsData.heatMapData);
            if (countryMapArea == null) {
                this.tip("热力图未初始化，无法移动", "error");
                return;
            }
            countryMapArea.panTo([this.countryEchartsData.heatMapData.capitalData[this.countryEchartsData.country_chosen]["lat"], this.countryEchartsData.heatMapData.capitalData[this.countryEchartsData.country_chosen]["lng"]]);
            this.countryEchartsData.countryHeatMapIsLoading = false;
            },

        showMost20CountryDataHook(result) {
            if (result.error) {
                this.tip(result.message, "warning");
            } else {
                let resultData = result;
                let countryNameList = [];
                let countryCountList = [];
                let countryList = [];
                for (let i = 0; i < resultData.length; i++) {
                    countryNameList.push(resultData[i]["name"]);
                    countryCountList.push(resultData[i]["count"]);
                    countryList.push({ value: i, label: resultData[i]["name"] });
                }
                this.countryEchartsData.mostCountryOf20Affiliation.countryNameList = countryNameList;
                this.countryEchartsData.mostCountryOf20Affiliation.countryCountList = countryCountList;
                this.countryEchartsData.country_list = countryList;
                this.freshCountryBarChart(
                    "country_bar",
                    this.countryEchartsData.mostCountryOf20Affiliation.countryNameList,
                    this.countryEchartsData.mostCountryOf20Affiliation.countryCountList
                );
            }
        },

        showMost20CountryData() {
            this.httpGet(
                "https://raw.githubusercontent.com/MissCold05/GvoadData/main/country/count.json", {},
                (x) => this.showMost20CountryDataHook(x.data),
                () => this.tip("系统异常", "warning")
            );
        },

        freshCountryHeatMapByChosenCountryHook(result) {
            this.freshCountryHeatMap("country_heatmap", result);
        },

        freshCountryHeatMapByChosenCountry() {
            let countryChosen = this.countryEchartsData.country_chosen;
            if (countryChosen === "") {
                this.freshCountryHeatMapByChosenCountryHook([]);
                return;
            }

            let ROOT_PATH = "https://raw.githubusercontent.com/MissCold05/GvoadData/main/country/pos/";
            $.when(
                $.getJSON(ROOT_PATH + this.countryEchartsData.country_chosen +'.json')
            ).done((x) => {
                this.freshCountryHeatMapByChosenCountryHook(x);
            });
        },

        initCountryAnimation() {
            let chartDom = document.getElementById('country_animation');
            let myChart = echarts.init(chartDom);

            let updateFrequency = 2000;
            let dimension = 0;
            let option;
            let countryColors = {
                "Canada":"#a0d2da",
                "China":"#de2910",
                "Netherlands":"#775b8d",
                "Germany":"#3c70ac",
                "India":"#f3d54c",
                "Japan":"#bac970",
                "South Korea":"#58b1c4",
                "Iran":"#60a84b",
                "United Kingdom":"#ecd378",
                "United States":"#FF8C4C"
            };

            $.when(
                $.getJSON('https://cdn.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
                $.getJSON('https://raw.githubusercontent.com/MissCold05/GvoadData/main/country/count_by_year.json')
            ).done(function (res0, res1) {
                let flags = res0[0];
                let data = res1[0];
                let years = [];

                for (let i = 0; i < data.length; ++i) {
                    if (years.length === 0 || years[years.length - 1] !== data[i][2]) {
                        years.push(data[i][2]);
                    }
                }

                let startIndex = 10;
                let startYear = years[startIndex];
                let that = this;
                option = {
                    grid: {
                        top: 10,
                        bottom: 30,
                        left: 150,
                        right: 80
                    },
                    xAxis: {
                        max: 'dataMax',
                        label: {
                            formatter: function (n) {
                                return Math.round(n);
                            },
                            precision:0,
                        }
                    },
                    dataset: {
                        source: data.slice(1).filter(function (d) {
                            return d[2] === startYear;
                        })
                    },
                    yAxis: {
                        type: 'category',
                        inverse: true,
                        max: 9,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize: 14
                            },
                            // 加载国旗logo
                            formatter: function (value) {
                                let flagEmoji;
                                if(!value){
                                    flagEmoji = '';
                                }
                                else{
                                    flagEmoji = (flags.find(function (item) {
                                        return item.name === value;
                                    }) || {}).emoji;
                                }
                                return value + '{flag|' + flagEmoji + '}';
                            },
                            rich: {
                                flag: {
                                    fontSize: 25,
                                    padding: 5
                                }
                            }
                        },
                        animationDuration: 300,
                        animationDurationUpdate: 300
                    },
                    series: [{
                        realtimeSort: true,
                        seriesLayoutBy: 'column',
                        type: 'bar',
                        itemStyle: {
                            color: function (param) {
                                return countryColors[param.value[1]] || '#5470c6';
                            }
                        },
                        encode: {
                            x: dimension,
                            y: 3
                        },
                        label: {
                            show: true,
                            precision: 0,
                            position: 'right',
                            valueAnimation: true,
                            fontFamily: 'monospace'
                        }
                    }],
                    animationDuration: 0,
                    animationDurationUpdate: updateFrequency,
                    animationEasing: 'linear',
                    animationEasingUpdate: 'linear',
                    graphic: {
                        elements: [{
                            type: 'text',
                            right: 160,
                            bottom: 60,
                            style: {
                                text: startYear,
                                font: 'bolder 80px monospace',
                                fill: 'rgba(100, 100, 100, 0.25)'
                            },
                            z: 100
                        }]
                    }
                };

                myChart.setOption(option);

                for (let i = startIndex; i < years.length - 1; ++i) {
                    (function (i) {
                        setTimeout(function () {
                            let source = data.slice(1).filter(function (d) {
                                return d[2] === years[i+1];
                            });
                            option.series[0].data = source;
                            option.graphic.elements[0].style.text = years[i+1];
                            myChart.setOption(option);
                        }, (i - startIndex) * updateFrequency);
                    })(i);
                }
            })
            option && myChart.setOption(option);
        },

        playCountryAnimation() {
            let chartDom = document.getElementById('country_animation');
            let myChart = echarts.init(chartDom);

            let updateFrequency = 2000;
            let dimension = 0;
            let option;
            let countryColors = {
                "Canada":"#a0d2da",
                "China":"#de2910",
                "Netherlands":"#775b8d",
                "Germany":"#3c70ac",
                "India":"#f3d54c",
                "Japan":"#bac970",
                "South Korea":"#58b1c4",
                "Iran":"#60a84b",
                "United Kingdom":"#ecd378",
                "United States":"#FF8C4C"
            };

            $.when(
                $.getJSON('https://cdn.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
                $.getJSON('https://raw.githubusercontent.com/MissCold05/GvoadData/main/country/count_by_year.json')
            ).done(function (res0, res1) {
                let flags = res0[0];
                let data = res1[0];
                let years = [];

                for (let i = 0; i < data.length; ++i) {
                    if (years.length === 0 || years[years.length - 1] !== data[i][2]) {
                        years.push(data[i][2]);
                    }
                }

                let startIndex = 0;
                let startYear = years[startIndex];
                let that = this;
                option = {
                    grid: {
                        top: 10,
                        bottom: 30,
                        left: 150,
                        right: 80
                    },
                    xAxis: {
                        max: 'dataMax',
                        label: {
                            formatter: function (n) {
                                return Math.round(n);
                            },
                            precision:0,
                        }
                    },
                    dataset: {
                        source: data.slice(1).filter(function (d) {
                            return d[2] === startYear;
                        })
                    },
                    yAxis: {
                        type: 'category',
                        inverse: true,
                        max: 9,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize: 14
                            },
                            // 加载国旗logo
                            formatter: function (value) {
                                let flagEmoji;
                                if(!value){
                                    flagEmoji = '';
                                }
                                else{
                                    flagEmoji = (flags.find(function (item) {
                                        return item.name === value;
                                    }) || {}).emoji;
                                }
                                return value + '{flag|' + flagEmoji + '}';
                            },
                            rich: {
                                flag: {
                                    fontSize: 25,
                                    padding: 5
                                }
                            }
                        },
                        animationDuration: 300,
                        animationDurationUpdate: 300
                    },
                    series: [{
                        realtimeSort: true,
                        seriesLayoutBy: 'column',
                        type: 'bar',
                        itemStyle: {
                            color: function (param) {
                                return countryColors[param.value[1]] || '#5470c6';
                            }
                        },
                        encode: {
                            x: dimension,
                            y: 3
                        },
                        label: {
                            show: true,
                            precision: 0,
                            position: 'right',
                            valueAnimation: true,
                            fontFamily: 'monospace'
                        }
                    }],
                    animationDuration: 0,
                    animationDurationUpdate: updateFrequency,
                    animationEasing: 'linear',
                    animationEasingUpdate: 'linear',
                    graphic: {
                        elements: [{
                            type: 'text',
                            right: 160,
                            bottom: 60,
                            style: {
                                text: startYear,
                                font: 'bolder 80px monospace',
                                fill: 'rgba(100, 100, 100, 0.25)'
                            },
                            z: 100
                        }]
                    }
                };

                myChart.setOption(option);

                for (let i = startIndex; i < years.length - 1; ++i) {
                    (function (i) {
                        setTimeout(function () {
                            let source = data.slice(1).filter(function (d) {
                                return d[2] === years[i+1];
                            });
                            option.series[0].data = source;
                            option.graphic.elements[0].style.text = years[i+1];
                            myChart.setOption(option);
                        }, (i - startIndex) * updateFrequency);
                    })(i);
                }
            })
            option && myChart.setOption(option);
        },
    }
});

