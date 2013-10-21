define(['app'], function (app) {
    app.filter('highlightWords', function () {
        return function (input, text) {
            var r = new RegExp(text, 'gmi');
            if (r.exec(input)) {
                return input;
            }
            else
                return "";
        };
    });
    app.filter('kimissList', function () {
        return function (input, text) {
            var childs = input[0].childs;
            for (var i = 0, l = childs.length; i < l; i++) {
                if (childs[i].name === text) {
                    return childs[i].content.trim();
                }
            }

        };
    });
    app.filter('maxlen', function () {
        return function (input, text) {
            var len = text || 40;
            if (input.length <= len)
                return input;
            return input.substring(0, len) + "...";

        };
    });
    /***
     * AngularJS For Loop with Numbers & Ranges
     */
    app.filter('range', function () {
        return function (input, total) {
            total = parseInt(total);
            for (var i = 0; i < total; i++)
                input.push(i);
            return input;
        };
    });
    app.filter('PagerRange', function () {
        return function (input, total) {
            total = parseInt(total);
            if (total > 20) total = 20
            for (var i = 0; i < total; i++)
                input.push(i);
            return input;
        };
    });
    app.filter("numToTxt", function () {
        return function (input, text) {
            if (input === 1)
                return "Start";
            if (input === 0)
                return "Stop";
        };
    }) ;
    app.filter("numToEnableTxt", function () {
        return function (input, text) {
            if (input === 1)
                return "Disable";
            if (input === 0)
                return "Enable";
        };
    }) ;

    app.filter("statusChange", function () {
        return function (input, text) {
            if (input === 1)
                return "Included";
            if (input === 0)
                return "Waiting for audit";
        };
    })

});