'use strict';

define(['../app', 'i18n!resources/nls/res'], function (app, res) {
    /* var bgimages=require("../../background/images").imageurls;*/

    return app.controller('LayoutController', function ($scope, $http, $location, $window) {
        /*      var i = 0,
         imgs = images.imageurls,
         randombg = function () {
         return Math.round(Math.random() * (imgs.length - 1));
         };

         m$.Image.preLoadImages(imgs.slice(0, 4));*/


        $scope.info = {
            TodayFeedsTotal: "",
            TotalFeeds: "",
            TotalSite: ""
        };

        $http.post("/api/feeds").success(function (d) {
            $scope.info.TodayFeedsTotal = d.todaycount;
            $scope.info.TotalFeeds = d.totalcount;
            $scope.info.TotalSite = d.countsites;
        });
        $scope.LoginInfo = function (user) {
            $scope.UserName = user["name"];
        };
        $http.get('api/checklogin').success(function (user) {
            $scope.LoginInfo(user);
        });
        $scope.logout = function () {
            if ($window.confirm("Are you sure?")) {
                $http.get('/logout').success(function (d) {
                    $window.location = "/login";
                });
            }
        }
        $scope.txt = {
            home: res.welcome,
            dashboard: "Dashboard",
            feeds: "Feeds",
            analysis: "Analysis",
            reports: "Reports",
            alerts: "Alerts",
            monitor: "Monitor",
            help: "Help"
        };
        $scope.navBars = [
            {name: $scope.txt.dashboard, url: "#/dashboard", index: 1},
            {name: $scope.txt.feeds, url: "#/feeds", index: 2},
            {name: $scope.txt.analysis, url: "#/analysis", index: 3},
            {name: $scope.txt.reports, url: "#/reports", index: 4},
            {name: $scope.txt.alerts, url: "#/alerts", index: 5},
            {name: $scope.txt.monitor, url: "#/monitor", index: 6},
            {name: $scope.txt.help, url: "#/help", index: 7}
        ];
        $scope.selectNav = function (row) {
            $scope.selectedRow = row;
        };
        $scope.navHash = function () {

            console.log($location)
            return $location
        };

        $scope.global = {
            error: ""
        };
        /* $scope.resources = {
         theme: " <link href='themes/glow/default.css' rel='stylesheet' type='text/css'>",
         bg: imgs[randombg()] //Random generate background image
         };*/
        $scope.setActive = function (e) {
            // console.log($location.$$path)
            var parent = e.target.parentElement.parentElement;
            if (parent) {
                var cancelActives = parent.getElementsByClassName("active");
                for (var i = 0, l = cancelActives.length; i < l; i++) {
                    cancelActives[i].setAttribute("class", "");
                }

                e.target.parentElement.setAttribute("class", "active");
            }
            //console.log($location.$$path)
        };


        /***
         * 设置当前选项卡的颜色
         * @type {string}
         */
        var hash = $location.$$url.replace(/\//gmi, '');
        $.each($scope.navBars, function (i, item) {
            if (item.url.match(hash)) {
                if (!!!hash)
                    $scope.selectedRow = 0
                else
                    $scope.selectedRow = item.index - 1;
            }
        })

        $scope.hiddenMenu = function () {
            $scope.show = !$scope.show;
        }
        //message
        var inter = window.setInterval(function () {
            $(".message").toggleClass("font20", "font20")
        }, 1000)      ;
        $scope.ntime=new Date();
         window.setInterval(function () {
           $http.post('/api/getNewFeeds',{time:$scope.ntime}).success(function(d){
               $scope.newFeeds= d.data;
               $scope.ntime= d.time;
           })
        }, 10000)
        $(".message").on("click", function () {
            clearInterval(inter);
            $(".message").html("");
        })

        /*        $scope.nextimg = function () {
         i = i === imgs.length ? 0 : i;
         $("#bg").attr("src", imgs[i++]);
         */
        /* var a =$(".page section:nth-child(1)").css("margin-top","-800px")*/
        /*
         };
         $scope.preimg = function () {
         i = i < 0 ? imgs.length - 1 : i;
         $("#bg").attr("src", imgs[i--]);
         */
        /*   var a =$(".page section:nth-child(1)").css("margin-top","10px")*/
        /*
         */
        /*  $("body").attr("style","background:url('themes/glowsimple/img/dots.png') center center fixed, url('"+imgs[i--]+"') center center no-repeat fixed;");*/
        /*
         };*/
        /*    $scope.fullscreen = function () {
         if (window.fullScreenApi.supportsFullScreen) {
         setInterval(function () {
         if (!document.webkitIsFullScreen) {
         clearInterval();
         return;
         }
         var img = imgs[i++];
         $("#bg").attr("src", img);
         console.log("fullscreen picture" + img);
         }, 2000);
         window.fullScreenApi.requestFullScreen(document.getElementById('njblogbg'));
         } else {
         alert('就你这浏览器，基本就告别全屏功能了,赶紧卸载了吧！！！');
         }
         };*/
    });
});
/*
 define([ 'i18n!resources/nls/res'], function (res) {
 var LayoutController=['$scope','$http','$window', function ($scope, $http, $window) {
 $http.get('/checklogin').success(function (user) {
 $scope.resetLogin(user);
 });
 $scope.txt={
 home:res.welcome
 }
 $scope.resetLogin = function (user) {
 if (user.name) {
 $scope.login = {
 url:'logout',
 name:res.logout
 };

 $scope.signup = {
 url:'',
 name:'welcome:' + user.name
 };
 } else {
 $scope.login = {
 url:'login',
 name:res.login
 };
 $scope.signup = {
 url:'signup',
 name:'SignUp'
 };
 }
 };
 } ];
 return LayoutController;
 });*/
