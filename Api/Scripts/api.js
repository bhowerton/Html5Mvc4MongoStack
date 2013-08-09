var $trackit = {

};

$trackit.Server = function () {

};

$trackit.Server.prototype = function () {

    var init = function (data) {

        $.extend(this, data);

        return this;

    };

    var getMetricEntries = function (params, onsuccess) {

        var entries = null;

        var entry = new $trackit.MetricEntry();

        $trackit.ajaxPost($.isFunction(onsuccess), "/metrics/getmetricentries",
            params,
            function (data) {

                $.each(data, function () {
                    $.extend(this, entry);
                });

                entries = data;

                if ($.isFunction(onsuccess))
                    onsuccess(entries);
            },
            function (data) {
                console.log('fail');
            });

        return entries;
    };

    var clearMetricEntries = function(params, onsuccess) {

        $trackit.ajaxPost($.isFunction(onsuccess), "/metrics/clearmetricentries",
            params,
            function (data) {
                
                if ($.isFunction(onsuccess))
                    onsuccess(entries);
            },
            function (data) {
                console.log('fail');
            });
        
    };

    return {
        init: init,
        getMetricEntries: getMetricEntries,
        clearMetricEntries: clearMetricEntries
    };

}();

$trackit.MetricEntry = function () {

};

$trackit.MetricEntry.prototype = function () {

    var init = function (data) {

        $.extend(this, data);

        return this;

    };

    var showValue = function() {

        alert(this.Value);
    };

    return {
        init: init,
        showValue: showValue
    };

}();

$trackit.ajaxPost = function (async, url, params, onsuccess, onerror) {

    $.ajax({
        dataType: 'json',
        async: async,
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        url: url,
        success: function (data) {
            if ($.isFunction(onsuccess))
                onsuccess(data);
        },
        error: function (data) {
            if ($.isFunction(onerror))
                onerror(data);
        },
        data: JSON.stringify(params)
    });

};

// The server instance
$trackit.server = new $trackit.Server();