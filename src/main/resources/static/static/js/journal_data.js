/**
 * Created by zhangyipeng on 2021/12/23.
 */

var journalHeatMap = null;

var journal_data = new Vue({
    el: '#journal_data',

    data: {
        journalEchartsData: {
            mostJournalOf20Affiliation: {
                journalNameList: [],
                journalCountList: []
            },
            journal_list: [
                { value: "1", label: "测试" }
            ],
            journal_chosen: "",


            heatMapIsInitialized: false,
            heatMapData: {
                data: [
                    { lat: 24.6408, lng: 46.7728 },
                    { lat: 50.75, lng: -1.55 },
                    { lat: 31.22, lng: 121.48 }
                ],
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

        freshJournalBarChart(htmlId, itemNameList, itemValueList) {
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
                        rotate: 45
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

        freshJournalHeatMap(htmlId, positionList) {
            if (!this.journalEchartsData.heatMapIsInitialized) {
                this.journalEchartsData.heatMapIsInitialized = true;
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
                    latField: 'lat',
                    lngField: 'lng',
                    valueField: 'count'
                };
                journalHeatMap = new HeatmapOverlay(cfg);
                let map = new L.Map(htmlId, {
                    center: new L.LatLng(30, 0),
                    zoom: 2,
                    layers: [baseLayer, journalHeatMap],
                    accessToken: 'pk.eyJ1IjoibWlzc2NvbGQwNSIsImEiOiJjbDAxdTNldGwweG53M2twNjJlcGFjN2trIn0.Rrj1JGc1gWkS30G6rJwxuw'
                });
            }
            this.journalEchartsData.heatMapData.data = positionList;
            journalHeatMap.setData(this.journalEchartsData.heatMapData);
        },

        showMost20JournalDataHook(result) {
            if (result.error) {
                this.tip(result.message, "warning");
            } else {
                let resultData = result;
                let journalNameList = [];
                let journalCountList = [];
                let journalList = [];
                for (let i = 0; i < resultData.length; i++) {
                    journalNameList.push(resultData[i]["name"]);
                    journalCountList.push(resultData[i]["count"]);
                    journalList.push({ value: i, label: resultData[i]["name"] });
                }
                this.journalEchartsData.mostJournalOf20Affiliation.journalNameList = journalNameList;
                this.journalEchartsData.mostJournalOf20Affiliation.journalCountList = journalCountList;
                this.journalEchartsData.journal_list = journalList;
                this.freshJournalBarChart(
                    "journal_bar",
                    this.journalEchartsData.mostJournalOf20Affiliation.journalNameList,
                    this.journalEchartsData.mostJournalOf20Affiliation.journalCountList
                );
            }
        },

        showMost20JournalData() {
            this.httpGet(
                "https://raw.githubusercontent.com/MissCold05/GvoadData/main/journal/count.json", {},
                (x) => this.showMost20JournalDataHook(x.data),
                () => this.tip("系统异常", "warning")
            );
        },

        freshJournalHeatMapByChosenJournalHook(result) {
            this.freshJournalHeatMap("journal_heatmap", result);
        },

        freshJournalHeatMapByChosenJournal() {
            let journalChosen = this.journalEchartsData.journal_chosen;
            if (journalChosen === "") {
                this.freshJournalHeatMapByChosenJournalHook([]);
                return;
            }
            let ROOT_PATH = "https://raw.githubusercontent.com/MissCold05/GvoadData/main/journal/pos/";
            $.when(
                $.getJSON(ROOT_PATH + this.journalEchartsData.journal_chosen +'.json')
            ).done((x) => {
                this.freshJournalHeatMapByChosenJournalHook(x);
            });
        }
    }
});