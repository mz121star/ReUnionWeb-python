define(['app',
    'controllers/index',
    'controllers/login',
    'controllers/logout',
    'controllers/signup',
    'controllers/monitor',
    'controllers/alerts',
    'controllers/analysis',
    'controllers/dashboard',
    'controllers/feeds',
    'controllers/help',
    'controllers/reports' ,
    'controllers/feeddetail'

],
    function (app, index, login, logout, singnup, monitor, alerts, analysis, dashboard, feeds, help, reports,feeddetail) {
        return app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/', {templateUrl: '../static/partials/index.html', controller: index}).
                when('/login', {templateUrl: 'partials/login.html', controller: login}).
                when('/logout', {templateUrl: 'partials/logout.html', controller: logout}).
                when('/signup', {templateUrl: 'partials/signup.html', controller: singnup}).
                when('/dashboard', {templateUrl: '../static/partials/dashboard.html', controller: dashboard}).
                when('/feeds/', {templateUrl: '../static/partials/feeds.html', controller: feeds}).
                when('/feeds/:feedId', {templateUrl: 'partials/feeds-detial.html', controller: feeddetail}).
                when('/analysis', {templateUrl: 'partials/analysis.html', controller: analysis}).
                when('/reports', {templateUrl: 'partials/reports.html', controller: reports}).
                when('/alerts', {templateUrl: 'partials/alerts.html', controller: alerts}).
                when('/monitor', {templateUrl: 'partials/monitor.html', controller: monitor}).
                when('/help', {templateUrl: 'partials/help.html', controller: help}).


                otherwise({redirectTo: '/'});
            /*  $locationProvider.html5Mode(true);*/
        }]);
    });