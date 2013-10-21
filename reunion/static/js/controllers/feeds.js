'use strict';

define([ 'i18n!resources/nls/res', '../utils/excel', 'bootstrapModal', 'linqjs'], function (res, excel) {

    var FeedsController = ['$scope', '$rootScope', '$http', 'FeedService' , function ($scope, $rootScope, $http, FeedService) {

        $rootScope.menuUrl="partials/leftmenu/feedsMenu.html";
        $rootScope.title = "Feeds - " + res.title;
        $rootScope.show=true;
        $scope.show=true;
        $scope.source = {
            keywordExpression: "兰蔻品牌"
        };

        $scope.sourceType = ['News', 'Forum', 'eCommerce', 'Weibo', 'sohu'];

        $scope.selectkimiss = function (row) {
            $scope.selectedRow = row;
        };
        $scope.searchFeed = function () {
            var sts = Enumerable.From($scope.sourcetype)
                .Where(function (x) {
                    return x.checked === true
                })
                .Select("$.type")
                .ToArray();
            sts = sts.join('|')
            console.log(sts);
            var searchData = {keyword: $scope.keyword,st: sts, starttime: $scope.feeds.startTime, endtime: $scope.feeds.endTime,pageindex:$scope.feeds.pageIndex};
            console.log(searchData);
            $http.post("api/feeds", searchData).success(function (d) {
                console.log($scope.feeds.startTime);
                $scope.pages= d.count;
                $scope.feedContent = Enumerable.From(d.feeds)
                    /* .Where(function (x) {
                     return x.CrawlerTime > $scope.feeds.startTime && x.CrawlerTime < $scope.feeds.endTime && sts.indexOf(x.FromType) >= 0;
                     })*/
                    .ToArray();
            })

        };
//        $http.get('/kimiss').success(function (data) {
//            $scope.kimiss = data;
//        });
        FeedService.querySourceType().then(function (d) {
            // $scope.sourcetype = Enumerable.From(d).Distinct("$.FromType").Select("$.FromType").ToJSON();
            $scope.sourcetype = Enumerable.From(d).Select("{type:$,checked:false}").ToArray();
        });

        $scope.feeds = {
            startTime: new Date("2010-01-01"),
            endTime:  new Date(),
            sourceTypeName: '',
            description: '' ,
            pageIndex:1
        };

        $scope.showDetail = function (feed) {
            $scope.modal.title = feed.Title;
            $scope.modal.source = feed.FromSite;
            $scope.modal.url = feed.FromUrl;
            $scope.modal.author = feed.Author;
            $scope.modal.publishtime = feed.PublishTime
            $scope.modal.content = feed.content || feed.Content;

        };
        $scope.modal = {
            title: "Title",
            source: "",
            url: ""
        };
        $http.post("api/feeds").success(function (d) {
            $scope.feedContent = d.feeds;
            $scope.pages= d.count;
        });
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

        $scope.exportExcel = function (tname, excelname) {
            excel(tname, excelname);
        };
        $rootScope.Topics = [
            {name: "topic1"},
            {name: "topic2"}
        ]
        var gettopicSelected = function (callback) {
            $http.get('api/topic').success(function (d) {
                $rootScope.Topics = d;
                /*  Enumerable.From(d);*/
                /* .Select("{name:$.Name}").ToArray();*/
                if (callback) callback();
            });
        }
        var getTopics = function (callback) {
            $http.get('api/topic').success(function (d) {
                $rootScope.Topics = d;
                /*  Enumerable.From(d);*/
                /* .Select("{name:$.Name}").ToArray();*/
                if (callback) callback();
            });
        }
        getTopics();
        $scope.saveTopic = function () {
            //load sourcetype
            var sts = Enumerable.From($scope.sourcetype)
                .Where(function (x) {
                    return x.checked === true
                })
                .Select("$.type")
                .ToArray();
            $http.post('api/topic', {
                Name: $scope.topicName,
                Keyword:$scope.keyword,
                SearchCondition: {
                    SourceType: sts,
                    StartDate: new Date($scope.feeds.startTime),
                    EndDate: new Date($scope.feeds.endTime)
                },
                OwnerId: "admin",
                CreateDate: Date.now(),
                UpdateDate: Date.now()

            }).success(function (d) {
                    getTopics(function () {
                        $scope.topicName = '';
                        $scope.saveTopicWarning = "Save Topic Successfully"
                    })

                });
        }

        $rootScope.topicSelected = function (topic) {
            $scope.keyword = topic.Keyword;
            $scope.feeds.startTime = topic.SearchCondition.StartDate;
            $scope.feeds.endTime = topic.SearchCondition.EndDate;
            $scope.source.keywordExpression =topic.Keyword;
            var sourceType = topic.SearchCondition.SourceType;

            console.log($scope.sourcetype);
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
            console.log($scope.sourcetype);
            console.log(topic);
        }


        $scope.PagerData=function(pageindex){
            $scope.feeds.pageIndex=pageindex;
            $scope.searchFeed();
        }
    }];

    return FeedsController;
});