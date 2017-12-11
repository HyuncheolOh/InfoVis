function Category() {
    var width = 500,
        height = 500,
        margin = {left: 50, right: 50, top: 50, bottom: 50};

    // TODO: Complete Initialization Below ////////////////////////////////////////////
    var xVal = function (d) {
        return d[0];
    }
    var yVal = function (d) {
        return d[1];
    }

    var cCategory = [];
    var xScale = d3.scaleLinear();
    var xAxis = d3.axisBottom();
    var yScale = d3.scaleLinear();
    var yAxis = d3.axisLeft();
    var visualVariables = {};
    var dictionary = {};

    function translate(xDelta, yDelta) {
        return "translate(" + xDelta + "," + yDelta + ")"
    }

    //////////////////////////////////////////////////////////////////////////////////
    function my(selection) {
        selection.each(function (data) {

            d = {};
            data.forEach(function (d) {
                insertIntoDic(x(d), y(d));
            });

            //average conversion
            dataset = new Array();
            for (var key in dictionary) {
                nums = dictionary[key];
                var sum = nums.reduce(function (a, b) {
                    return a + b;
                });
                dictionary[key] = sum / nums.length;
                dataset.push([key, sum / nums.length]);
            }

            // TODO: Complete Scaling Below //////////////////////////////////////////
            xScale = xScale
                .domain(d3.extent(data, xVal)).nice()
                .range([0, width - margin.right - margin.left]);

            yScale = yScale
                .domain([0, 5])
                .range([height - margin.bottom - margin.top, 0]);

            var svg = d3.select(this)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", translate(margin.left, margin.top));

            // TODO: Render X-Axis Below /////////////////////////////////////////////

            hh = height - margin.top - margin.bottom;
            ww = width - margin.right - margin.left;
            num_of_data = 10;
            ///////////////////////////////////////////////////////////////////////////

            var color = d3.scaleOrdinal()
                .range(d3.schemeCategory20);

            svg.selectAll("circle")
                .data(dataset)
                .enter().append("circle")
                .attr("cx", function (d, i) {
                    return Math.round(Math.random() * (width - star(d) * 2) + star(d));
                })
                .attr("cy", function (d, i) {
                    return Math.round(Math.random() * (height - star(d) * 2) + star(d));
                })
                .attr("r", function (d) {
                    return star(d);
                })
                .style("fill", function (d, i) {
                    return color(i);
                })
                .on("click", function (d, i) {
                    d3.select("#aaaa").remove();
                    svg
                        .append("text")
                        .attr("id", "aaaa")
                        .attr("x", function (d) {
                            return d3.mouse(this)[0];
                        })
                        .attr("y", function (d) {
                            return d3.mouse(this)[1];
                        })
                        .text(function () {
                            return category(d);
                        });
                });


            function dragstarted(d) {
                d3.select(this).raise().classed("active", true);
            }

            function dragged(d) {
                d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
            }

            function dragended(d) {
                d3.select(this).classed("active", false);
            }
        });
    }

    // TODO: Complete Getters and Setters /////////////////////////////////////////////
    my.width = function (value) {
        if (!arguments.length) return width;
        width = value;
        return my;
    }

    my.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return my;
    }

    my.margin = function (value) {
        if (!arguments.length) return margin;
        margin.left = value['left'];
        margin.top = value['right'];
        margin.top = value['top'];
        margin.bottom = value['bottom'];
        return my;
    }

    my.x = function (value) {
        if (!arguments.length) return xVal;
        xVal = value;
        return my;
    }

    my.y = function (value) {
        if (!arguments.length) return yVal;
        yVal = value;
        return my;
    }

    my.z = function (value) {
        return my;
    }

    my.visualVariables = function (value) {
        if (!arguments.length) return visualVariables;
        visualVariables = value;
        return my;
    }

    my.categories = function (value)
    {
        if (!arguments.length) return cCategory;
        cCategory = value;
        return my;
    }

    function x(d)
    {
        return d[visualVariables["x"]];
    }

    function y(d)
    {
        return d[visualVariables["y"]];
    }

    function z(d) {
        return d[visualVariables["z"]];
    }

    function visualVariables(d)
    {
        return d;
    }

    function categories(d) {
        return d;
    }

    function category(d){
        return d[0];
    }

    function star(d) {
        return d[1] * 5;
    }
    ///////////////////////////////////////////////////////////////////////////////////

    function insertIntoDic(key, value) {
        // If key is not initialized or some bad structure
        if (!dictionary[key] || !(dictionary[key] instanceof Array)) {
            dictionary[key] = [];
        }
        // All arguments, exept first push as valuses to the dictonary
        dictionary[key] = dictionary[key].concat(Array.prototype.slice.call(arguments, 1));
        return dictionary;
    }
    return my;

    function categorization() {
        //primary categories

        //secondary categories

        //tertiary categories
    }
}