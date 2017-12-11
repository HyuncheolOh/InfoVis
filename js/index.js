var data = d3.csv("./data/one_user_review.csv", function(error, data) {
    data.forEach( function(d){
        d.stars = parseInt(d.stars);
        d.date = new Date(d.date);
        d.useful = parseInt(d.useful);
        d.funny = parseInt(d.funny);
        d.cool = parseInt(d.cool);
        d.username = d.user_name;
        d.id = d.user_id;
        d.reviewCount = parseInt(d.review_count);
        // d.category = d.category;
    });

    var config = {width: 500, height: 500, margin:{left: 50, top: 50}};
    var idVars = ["Title", "Release_Date", "Director"];
    var numericVars = ["US_Gross", "Worldwide_Gross", "Production_Budget", "Rotten_Tomatoes_Rating", "IMDB_Rating", "IMDB_Votes"];
    var categoricalVars = ["MPAA_Rating", "Source", "Major_Genre", "Creative_Type"];
    var scales = ["Linear", "Ordinal", "Point", "Band", "Log", "Pow"];

    var params = {}
        params["x"] = "date";
        params["y"] = "stars";

    var histogram = Histogram()
        .visualVariables(params)
        .x(function(d) { return d[params.x]; })
        .y(function(d) { return d[params.y]; })
        .width(400)
        .height(300)
        .margin({left:50, right:25, top:25, bottom:80 });

    var svg = d3.select("#histogram");

    svg
        .datum(data)
        .call(histogram);
});

var svg = d3.select("#category"),
    diameter = +800
    g = svg.append("g").attr("transform", "translate(2,2)"),
    format = d3.format(",d");


var pack = d3.pack()
    .size([diameter - 4, diameter - 4]);

d3.json("./data/flare.json", function(error, root) {
    if (error) throw error;

    root = d3.hierarchy(root)
        .sum(function(d) { return d.size; })
        .sort(function(a, b) { return b.value - a.value; });

    var node = g.selectAll(".node")
        .data(pack(root).descendants())
        .enter().append("g")
        .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.data.name + "\n" + format(d.value); });

    node.append("circle")
        .attr("r", function(d) { return d.r; });

    node.filter(function(d) { return !d.children; }).append("text")
        .attr("dy", "0.3em")
        .text(function(d) { return d.data.name.substring(0, d.r / 3); });
});



