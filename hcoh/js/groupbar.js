function GroupBar() {
    var width, height;
    var my_name, user_name;
    var margin = {top: 20, right: 70, bottom: 30, left: 40};
    function my(selection){
        selection.each(function(data){
            console.log(data);
            var svg = d3.select("#bar").append("svg").attr("id", "svg_bar").attr("width", width).attr("height", height),
                g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            width = width - margin.left - margin.right;
            height = height - margin.top - margin.bottom;

            var x0 = d3.scaleBand()
                .rangeRound([0, width])
                .paddingInner(0.1);

            var x1 = d3.scaleBand()
                .padding(0.05);

            var y = d3.scaleLinear()
                .rangeRound([height, 0]);

            var z = d3.scaleOrdinal()
                .range(["#98abc5", "#ff8c00"]);

            columns =  ["business", my_name, user_name];
            var keys = columns.slice(1);
            x0.domain(data.map(function(d) { return d.business; }));
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, 5]).nice();

            var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                .offset([-8, 0])
                .html(function(d) {
                    return  "Name : " + d.name +"</br>Star : " + d.star;
                     });
            svg.call(tool_tip);

            g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + x0(d.business) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return keys.map(function(key) {
                    return {key: key, value: d[key], "latitude":d.latitude, "longitude":d.longitude, "star":d.star, "name":d.business}; });
                })
                .enter().append("rect")
                .attr("x", function(d) { return x1(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x1.bandwidth())
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", function(d) { return z(d.key); })
                .on('mouseover', tool_tip.show)
                .on('mouseout', tool_tip.hide)
                .on("click", function(d) {
                   onCkick(d);
                });

            var xAxis = d3.axisBottom(x0).tickFormat("");
            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            g.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("Star");

            var legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width + 29)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width + 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });

            function onCkick(d) {
                console.log("onClick " + d.key);
                console.log("onClick " + d.value);
                console.log("onClick " + d.latitude);
                console.log("onClick " + d.longitude);
                console.log("onClick " + d.star);
                console.log("onClick " + d.name);

                var tool_tip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([-8, 0])
                    .html(function(d) { return "TEST TIP"; });
                g.call(tool_tip);

            }
        });
    };
    my.width = function(value){
        if(!arguments.length) return width;
        width = value;
        return my;
    }

    my.height = function(value){
        if(!arguments.length) return height;
        height = value;
        return my;
    }

    my.my_name = function(value) {
        if(!arguments.length) return height;
        my_name = value;
        return my;
    }

    my.user_name = function(value) {
        if(!arguments.length) return height;
        user_name = value;
        return my;
    }

    my.margin = function(value) {
        if(!arguments.length) return margin;
        margin.left = value['left'];
        margin.top = value['right'];
        margin.top = value['top'];
        margin.bottom = value['bottom'];
        return my;
    }

    return my;
}