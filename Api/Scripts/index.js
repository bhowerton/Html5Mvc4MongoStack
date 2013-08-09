/// <reference path="d3.v3.js" />
/// <reference path="nv.d3.js" />
/// <reference path="api.js" />

function createGraph(selector) {

    // See api.js           
    var graphData = $trackit.server.getMetricEntries({ metric: "AngiesMood" });

    var data = [{ key: "AngiesMood", values: graphData }];

    nv.addGraph(function () {
        
        var chart = nv.models.discreteBarChart()
            .x(function (d) { return d.DayOfMonth; })
            .y(function (d) { return d.Value; })
            .staggerLabels(true)
            .tooltips(true)
            .showValues(true);

        d3.select(selector)
            .datum(data)
            .transition()
            .duration(500)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

function refreshGraph(selector) {

    $trackit.server.clearMetricEntries({ metric: 'AngiesMood' });

    createGraph(selector);
}

$(function () {

    $("#refresh").on("click", function () {
        
        refreshGraph('#chart svg');
    });
    
    createGraph("#chart svg");
    
});

