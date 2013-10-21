'use strict';

define([ 'i18n!resources/nls/res', '../utils/excel', 'bootstrapModal', 'linqjs' ], function (res, excel) {

    var AnalysisController=['$scope','$rootScope', '$http', 'FeedService' , function ($scope, $rootScope, $http, FeedService) {
        $rootScope.menuUrl="";
        $rootScope.title ="Analysis - "+ res.title;
        $rootScope.menuUrl="partials/leftmenu/analysisMenu.html";
        // $scope.analysisDetailUrl="partials/charts/default-analysis.html" ;

        $rootScope.show=true;
        $scope.source = {
            brand: "兰蔻品牌"
        };
        $scope.sourceType = ['News', 'Forum', 'eCommerce', 'Weibo', 'sohu'];
        $scope.professionalSites = ['CSDN', 'IDC'];
        $http.get('api/topic').success(function (d) {

            $scope.Topics = Enumerable.From(d).Select("{type:$.Name,checked:false}").ToArray();
        });
        $scope.feeds={
            startTime:new Date("2013-08-01") ,
            endTime:new Date()
        }    ;
        var getTopics = function (callback) {
            $http.get('api/topic').success(function (d) {
                $rootScope.Topics = d;
                /*  Enumerable.From(d);*/
                /* .Select("{name:$.Name}").ToArray();*/
                if (callback) callback();
            });
        }
        getTopics();
        $rootScope.topicSelected = function (topic) {
            $scope.keyword = topic.Keyword;
            $scope.feeds.startTime = topic.SearchCondition.StartDate;
            $scope.feeds.endTime = topic.SearchCondition.EndDate;
            $scope.source.keywordExpression =topic.Keyword;
            var sourceType = topic.SearchCondition.SourceType;

           /* console.log($scope.sourcetype);*/
            /*    for(var i in sourceType){
             for(var k in $scope.sourcetype) {
             $scope.sourcetype[k].checked=false;
             if($scope.sourcetype[k].type===sourceType[i]){
             $scope.sourcetype[k].checked=true;
             }

             }
             }*/

            for (var k in $scope.sourcetype) {
                $scope.sourcetype[k].checked=false;
                for (var i in sourceType) {
                    if ($scope.sourcetype[k].type === sourceType[i]) {
                        $scope.sourcetype[k].checked = true;
                    }

                }
            }

            $scope.sourcetype = $scope.sourcetype;
        /*    console.log($scope.sourcetype);
            console.log(topic);*/
        }
       var localsearchFeed = function () {
            //主业务
            var sts = Enumerable.From($scope.sourcetype)
                .Where(function (x) {
                    return x.checked === true
                })
                .Select("$.type")
                .ToArray();
            sts=sts.join('|')
          /*  console.log(sts);*/
            var searchData={st:sts,starttime:$scope.feeds.startTime,endtime:$scope.feeds.endTime};
           /* console.log(searchData);*/
            $http.post('api/2DBarReprotPost', searchData).success(function (d) {
                new iChart.Bar2D({
                    render: 'canvasDiv7',
                    data: d,
                    width: 750,
                    height: 500,
                    border:false,
                    coordinate: {
                        scale: [
                            {
                                position: 'bottom',
                                listeners: {
                                    parseText: function (t, x, y) {
                                        return {text: t}
                                    }
                                },
                                label: {color: '#254d70', fontsize: 11, fontweight: 600}
                            }
                        ]
                    }
                }).draw();
               // callback(null, '1');
            }).error(function (data, status, headers, config) {

                    $scope.global.error = "内部数据错误";
                    $timeout(function () {
                        $scope.global.error = "";
                    }, 5000)
                    //callback(null, '1');
                });
            $http.post('api/TopicKeywordReportPost', searchData).success(function (d2) {
                new iChart.Bar2D({
                    render: 'canvasDiv8',
                    data: d2,
//                    title: '产品活动关键字',
                    width: 750,
                    height: 500,
                    border:false,
                    coordinate: {
                        scale: [
                            {
                                position: 'bottom',
                                listeners: {
                                    parseText: function (t, x, y) {
                                        return {text: t}
                                    }
                                },
                                label: {color: '#254d70', fontsize: 11, fontweight: 600}
                            }
                        ]
                    }
                }).draw();
                //callback(null, '2');
            }).error(function (data, status, headers, config) {

                    $scope.global.error = "内部数据错误";
                    $timeout(function () {
                        $scope.global.error = "";
                    }, 5000)
                   // callback(null, '2');
                });
            $http.post('/api/SearchSourcePost', searchData).success(function (a) {
                new iChart.Pie2D({
                    render: 'canvasDiv11',
                    data: a,
                    //title: '搜索来源',
                    width: 750,
                    height: 500,
                    border:false,
                    legend: {
                        enable: true
                    },
                    showpercent: true,
                    radius: 140,
                    sub_option: {
                        label: {
                            background_color: null,
                            sign: false,//设置禁用label的小图标
                            padding: '0 4',
                            border: {
                                enable: false,
                                color: '#666666'
                            },
                            fontsize: 12,
                            fontweight: 600,
                            color: '#4572a7'
                        },
                        border: {
                            width: 2,
                            color: '#ffffff'
                        }
                    }
                }).draw();
                //callback(null, '3');
            }).error(function (data, status, headers, config) {

                    $scope.global.error = "内部数据错误";
                    $timeout(function () {
                        $scope.global.error = "";
                    }, 5000)
                  //  callback(null, '3');
                });
            $http.post('/api/SentimentAnalysisColumnPost', searchData).success(function (d) {
                new iChart.ColumnStacked2D({
                    render: 'canvasDiv9',
                    data: d.data,
                    labels: d.labels,
                    sub_option: {
                        label: false
                    },
                    showpercent: true,
                    percent: true,//标志为百分比堆积图
                    width: 750,
                    height: 500,
                    border:false,
                    decimalsnum: 1,
                    tip: {
                        enable: true,
                        shadow: true
                    },
                    legend: {
                        enable: true,
                        background_color: null,
                        border: {
                            enable: false
                        },
                        offsetx: 19,//设置x轴偏移，满足位置需要
                        offsety: -20//设置y轴偏移，满足位置需要
                    },
                    coordinate: {
                        axis: {
                            color: '#c0d0e0',
                            width: 0
                        },
                        scale: [
                            {
                                position: 'left',
                                scale_enable: false,
                                start_scale: 0,
                                scale_space: 50,
                                label: {color: '#254d70', fontsize: 11, fontweight: 600}
                            }
                        ]
                    }
                }).draw();
                //callback(null, '5');
            }).error(function (data, status, headers, config) {

                    $scope.global.error = "内部数据错误";
                    $timeout(function () {
                        $scope.global.error = "";
                    }, 5000)
                    //callback(null, '5');
                });
        /*    $http.get('api/KeyWordCloud').success(function (d2) {
                var canvas = document.getElementById('canvasDiv12');
                var context = canvas.getContext('2d');
                context.fillStyle = "#ff0000";
                context.textBaseline = "top";
                context.font = " 50px  Helvetica,arial";
                for (var i in d2) {
                    var v = d2[i];
                    context.fillText(v.name, Math.round(Math.random() *150), Math.round(Math.random() *200));
                    context.fillStyle = v.color;
                    v.value= Math.log(v.value) / (Math.log(100)-Math.log(1)) * 20 + 1
                    *//* if (v.value > 100)
                     v.value = v.value / 3;
                     else if (v.value < 14)
                     v.value = v.value;
                     else if (v.value > 30)
                     v.value = v.value / 2;
                     if(v.value>40)
                     v.value=40;*//*

                    context.font = v.value + "px  Helvetica,arial";

                }
               // callback(null, '4');

            }).error(function (data, status, headers, config) {

                    $scope.global.error = "内部数据错误";
                    $timeout(function () {
                        $scope.global.error = "";
                    }, 5000)
                   // callback(null, '4');
                });*/
            $http.post('api/SentimentAnalysisPost', searchData).success(function (d) {
                //搜索来源饼图
                new iChart.LineBasic2D({
                    render: 'canvasDiv10',
                    data: d.data,
                    labels: d.labels,
//                    title: '情感分析时间轴曲线图  ',
                    width: 750,
                    height: 500,
                    border:false,
                    tip: {
                        enable: true,
                        shadow: true
                    },
                    legend: {
                        enable: true,
                        sign: 'bar',
                        background_color: null,//设置透明背景
                        offsetx: 19,//设置x轴偏移，满足位置需要
                        offsety: -20,//设置y轴偏移，满足位置需要
                        border: true
                    },
                    sub_option: {
                        hollow_inside: false,//设置一个点的亮色在外环的效果
                        point_size: 10
                    }
                }).draw();
                //callback(null, '6');
            }).error(function (data, status, headers, config) {

                    $scope.global.error = "内部数据错误";
                    $timeout(function () {
                        $scope.global.error = "";
                    }, 5000)
                    //callback(null, '6');
                });
        };
        $scope.searchFeed =   localsearchFeed;
        //localsearchFeed();

        $scope.tagcloud = "partials/charts/tagcloud1.html";
        FeedService.querySourceType().then(function (d) {
            $scope.sourcetype = Enumerable.From(d).Select("{type:$,checked:false}").ToArray();
        });
        $scope.feeds = {
            startTime: new Date("2013-08-01"),
            endTime: new Date(),
            sourceTypeName: ''  ,
            description:''
        };
        $scope.dataRange=7;
        $scope.$watch("dataRange", function (v1, v2) {
            if (v1 ) {
                $scope.feeds.startTime=new Date();
                $scope.feeds.startTime= moment(new Date()).add('days', -v1).calendar();
             /*   loadReport();*/
            }
        }) ;
        $scope.$watch("analysisDetailUrl",function(v1,v2){
            if(v1==="partials/charts/default-analysis.html"){
                localsearchFeed();
            }
        })
        $scope.$watch('feeds.startTime+feeds.endTime', function (v1, v2) {
            if ($scope.feeds.startTime >= $scope.feeds.endTime) {
                $scope.warning = "开始不能大于结束";
                $scope.searchFeedForm.$invalid = true;
            }
            else {
                $scope.warning = ""
                $scope.searchFeedForm.$invalid = false;
            }
        });
        $http.get("/api/chart").success(function(d){
            $scope.charts=d;
        })
    }];
    return AnalysisController;
});