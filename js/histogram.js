function Histogram(){
    var width = 500, 
        height = 500, 
        margin = { left:50, right:50, top:50, bottom:50 };

    // TODO: Complete Initialization Below ////////////////////////////////////////////
    var xVal = function(d){return d[0];}
    var yVal = function(d){return d[1];}

    var xScale = d3.scaleLinear();
    var xAxis = d3.axisBottom();
    var yScale = d3.scaleLinear();
    var yAxis = d3.axisLeft();
    var visualVariables = {};


    function translate(xDelta, yDelta){
        return "translate(" + xDelta + "," + yDelta + ")"
    }


    //////////////////////////////////////////////////////////////////////////////////
    function my(selection){
        selection.each(function(data){

            // TODO: Complete Scaling Below //////////////////////////////////////////
            xScale = xScale
                .domain(d3.extent(data, xVal)).nice()
                .range([0, width - margin.right - margin.left]);

            yScale = yScale
                .domain([0, 5])
                .range([height - margin.bottom - margin.top,0]);

            var svg = d3.select(this)
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", translate(margin.left, margin.top));
            
            // TODO: Render X-Axis Below /////////////////////////////////////////////

            hh = height - margin.top-margin.bottom;
            ww = width - margin.right - margin.left;
            num_of_data = 10;
            ///////////////////////////////////////////////////////////////////////////

            // TODO: Render Points Below //////////////////////////////////////////////
            svg.selectAll(".bar")
               .data(data)
               .enter()
               .append('rect')
                .attr('x', function(d, i) {
                    return (ww / data.length )* i;

                })
                .attr('y', function(d) { return yScale(y(d));})
                .attr('width', function(d) {
                    return ww/data.length - 1;
                })
                .attr('height', function(d) {
                    return hh - yScale(y(d));})
                .on("click", function() {
                    d3.select(this).style("fill", "orange");
                })
                .style("fill", "steelblue");


            xAxis.scale(xScale).tickFormat(d3.timeFormat('%Y-%m-%d'));
            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0,"+hh+')')
                .call(xAxis)
                .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("transform", "rotate(-65)")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em");

            ///////////////////////////////////////////////////////////////////////////
            // TODO: Render Y-Axis Below //////////////////////////////////////////////
            yAxis.scale(yScale).ticks(5);
            svg.append("g")
                .attr("class", "y-axis")
                .call(yAxis);



            function update() {
                svg
                    .selectAll('.bar')
                    .style('opacity', 0.3)
                    .filter(function(d) {

                    })
                    .style('opacity', 1)

            }
        });
    }

    // TODO: Complete Getters and Setters /////////////////////////////////////////////
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

    my.margin = function(value) {
        if(!arguments.length) return margin;
        margin.left = value['left'];
        margin.top = value['right'];
        margin.top = value['top'];
        margin.bottom = value['bottom'];
        return my;
    }

    my.x = function(value)
    {
        if(!arguments.length) return xVal;
        xVal = value;
        return my;
    }

    my.y = function(value)
    {
        if(!arguments.length) return yVal;
        yVal = value;
        return my;
    }

    my.visualVariables = function(value)
    {
        if(!arguments.length) return visualVariables;
        visualVariables = value;
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

    function visualVariables(d)
    {
        return d;
    }
    ///////////////////////////////////////////////////////////////////////////////////


    return my;
}