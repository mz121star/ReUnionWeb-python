define(['app', 'handlebars' ], function (app, handlebars) {
    app.directive('compare', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    console.log("viewValue:%s", viewValue);
                    console.log("attrs.compare:%s", attrs.compare);
                    if (viewValue == "" || attrs.compare == "" || viewValue == attrs.compare) {
                        ctrl.$setValidity('compare', true);
                    } else {
                        ctrl.$setValidity('compare', false);
                    }
                    return viewValue;
                });
            }
        };
    });
    app.directive('ngScroll', function () {
        return {
            link: function (scope, elm, attrs, ctrl) {
                $(elm).mCustomScrollbar({
                    scrollButtons: {
                        enable: true
                    }
                });
            }
        };
    });
    app.directive('modalbox', function () {
        return {
            link: function (scope, elm, attrs, ctrl) {
                $(elm).on("click", function () {
                    alert('ok')
                })
            }
        };
    });
    app.directive('sortable', function () {
        return {
            link: function (scope, elm, attrs, ctrl) {
                $(elm).css('cursor', 'pointer')

                $(elm).on("click", function () {
                    alert('准备排序')
                    console.log(attrs);
                    console.log(scope);
                })
            }
        };
    });
    app.directive('showdetail', function () {

        return {
            link: function (scope, elm, attrs, ctrl) {
                $(elm).css('cursor', 'pointer')


                /* $(elm).on("click", function () {
                 alert('popup')
                 console.log(elm);
                 console.log(scope)              ;
                 })*/
            }
        };
    });

    app.directive('toggletable', ['$http', function ($http) {

        return {

            link: function (scope, elm, attrs, ctrl) {

                var temp =
                    "  <td colspan='8' class='subrowtd'>" +
                    "<table class='subtable'>" +

                    "<tr class='thead'>    " +
                    "<th>N0.</th>    " +
                    "<th sortable>Title</th>         " +
                    "<th>Description</th>       " +
                    "<th>Source</th>            " +
                    "<th>Url</th>                      " +

                    " </tr>    " +


                    "{{#each feeds}} " +
                    " <tr class='tbody {{rate}}'>" +
                    "<td> </td>         " +
                    "<td>{{Title}} </td>    " +
                    " <td class='w200' >{{ maxContent}} </td>   " +
                    "<td>{{ FromSite }}</td>                              " +
                    "<td class='last'><a  >{{url}}</a></td>  " +

                    "</tr>                    " +
                    "{{/each}}" +

                    " </table></td>";

                $(elm).toggle(
                    function () {
                        $(elm).attr("class","closelist");
                    },
                    function () {
                        $(elm).attr("class","openlist");
                    }

                );
                $(elm).on("click", function () {

                    console.log(attrs)
                    if (attrs.queryover === "0") {
                        $(elm).parent().next().html("<img src='images/icon/waiting.gif' />Loading...");
                        $http.get('/api/alert/' + attrs.id).success(function (d) {

                            $http.post("/api/feeds", {keyword: d[0].Keyword}).success(function (data) {


                                var template = Handlebars.compile(temp);
                                Handlebars.registerHelper('maxContent', function () {

                                    var len = this.Content.length > 50 ? 50 : this.Content.length
                                    return this.Content.substring(0, len - 1) + "...";
                                });
                                Handlebars.registerHelper('rate', function () {
                                    if(this.Semantic===0) return "";
                                    var cls = this.Semantic >0 ? "positive" : "negative"

                                    return cls
                                });
                                Handlebars.registerHelper('url', function () {

                                    var cls = this.FromUrl.length>40 ? this.FromUrl.substring(0,39)+"..." : this.FromUrl

                                    return cls
                                });
                                attrs.queryover = "1"
                                console.log($(elm).parent().next().children('.subrowtd')) ;
                                $(elm).parent().next().html(template(data))

                            })
                        });
                    }
                    $(elm).parent().next().toggle();

                })
            }
        };
    }])

    /*  app.directive('uniform', function () {
     require('jqueryuniform');
     return {

     link: function (scope, elm, attrs, ctrl) {
     $("select, input").uniform();
     }
     };
     });*/

});
