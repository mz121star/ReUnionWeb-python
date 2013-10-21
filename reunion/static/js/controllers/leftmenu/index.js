'use strict';

define(['../../app', 'i18n!resources/nls/res'], function (app, res) {
    /* var bgimages=require("../../background/images").imageurls;*/

    return app.controller('LeftMenuCtrl', function ($scope, $rootScope, $http, $location, $window) {
        $rootScope.analysisDetailUrl = "partials/charts/default-analysis.html";

        $scope.Analysis = {
            toCustomerAnalysis: function () {
                      $rootScope.analysisDetailUrl = "partials/charts/customer-analysis.html";
            } ,
            toBasicAnalysis:function(){
                $rootScope.analysisDetailUrl = "partials/charts/default-analysis.html";
            } ,
            toReoresentaticeArticles:function(){
                $rootScope.analysisDetailUrl = "partials/charts/representativeArticles-analysis.html";
            }
        }

    });
});
