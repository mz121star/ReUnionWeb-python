require.config({

    paths: {
        jquery: '../lib/jquery/jquery-1.8.2.min',
      /*  bootstrap: '../lib/bootstrap/js/bootstrap',*/
        underscore: '../lib/underscore/underscore',
        angular: '../lib/angular/angular',
        angularResource: '../lib/angular/angular-resource',
        text: '../lib/require/text',
        i18n: '../lib/require/i18n',
      /*  modernizr: '../lib/modernizr',
        html5shiv: '../lib/html5shiv',*/
       /* mcore: '../lib/mcore.min',*/
     /*   fullscreen: '../lib/fullscreen',*/
  /*      mcustomscrollbar: '../lib/jquery.mCustomScrollbar.concat.min',*/
       /* detectbrowser: '../lib/detectbrowser',*/
        //res:'../resources/nls/res'
        ichart: '../lib/ichart.1.2.src'  ,
    /*    jqueryui:'../lib/jquery-ui-1.10.3.custom' ,*/
        bootstrapModal:'../lib/bootstrap/js/modal',
        bootstrapAlert:'../lib/bootstrap/js/alert',
        bootstrapButton:'../lib/bootstrap/js/button',
        bootstrapTab:'../lib/bootstrap/js/tab',
        bootstrapTooltip:'../lib/bootstrap/js/tooltip',
      /*  jqueryuniform: '../lib/uniform/jquery.uniform.min',*/
        linqjs:'../lib/linq',
        'angular-strap':'../lib/angular-strap/angular-strap',
        'bootstrap-datepicker':'../lib/angular-strap/bootstrap-datepicker' ,
        "async":'../lib/async',
        "moment": "../lib/moment.min",
        "handlebars":"../lib/handlebars"

    },
    shim: {
        'angular': {deps: ['jquery'],'exports': 'angular'},
        'angular-resource': {deps: ['angular']},
        'bootstrap-datepicker':  {deps: ['jquery']},
        'angular-strap':   {deps: ['angular','bootstrap-datepicker']},
        'bootstrap': {deps: ['jquery']},
        /*'mcustomscrollbar': {deps: ['jquery']},*/
        'jqueryui':{deps: ['jquery']},


        'underscore': {exports: '_'},
     /*   'detectbrowser': {deps: ['modernizr']} ,*/
        'bootstrapModal': {deps: ['jquery']},
        'bootstrapAlert': {deps: ['jquery']},
        'bootstrapButton': {deps: ['jquery']},
        'bootstrapTab': {deps: ['jquery']}
        /*,
         'res':{exports:'res'}*/

    },
    priority: [
        "angular"
    ],
    i18n: {
        locale: 'en-us'
    },
    urlArgs: 'v=1.0.0.1'
});

require(['angular',
    'app',
    'jquery',
    'controllers/layout',
/*    'controllers/leftmenu',*/
    'controllers/index',
    'directives/compare',
    'filter/filters' ,
    'services/services',
     'controllers/include/analysisInclude',
    'controllers/leftmenu/index',
    'routes'/*,
    'detectbrowser'*/
], function (angular) {
    angular.bootstrap(document, ['app']);
    console.log("Welcome visit Reunion System! ")
});
