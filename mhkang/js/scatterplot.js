function ScatterPlot(){
    var width = 500, 
        height = 500, 
        margin = { left:50, right:50, top:50, bottom:50 };

    // TODO: Complete Initialization Below ////////////////////////////////////////////
    var xVal = function(d){return d[0];},
        xScale = d3.scaleLinear(),
        xAxis = d3.axisBottom();

    var yVal = function(d){return d[1];}, 
        yScale = d3.scaleLinear(),
        yAxis = d3.axisLeft();

    var colorVal = function(d) {return d[2];}, 
        colorScale = d3.scaleOrdinal(),
        colorScheme = d3.schemeAccent;

    var shapeVal = function(d) {return d[3];}, 
        shapeScale = d3.scaleOrdinal(),
        shapeScheme = d3.symbols;

    var sizeVal = function(d) {return d[4];}, 
        sizeScale = d3.scaleLinear(),
        sizeScheme = [8., 15.];

    var visualVars = function(d) {return {};};

    //////////////////////////////////////////////////////////////////////////////////
    function translate(xDelta, yDelta){
        return "translate(" + xDelta + "," + yDelta + ")"
    }

    function axisFormat(value){
        var one_M = 1000000.0;
        return (value/one_M).toFixed(1) + "M";
    }

    function dicToStr(dic){
        var dicStr = "{ ";
        for (var key in dic){
            dicStr += key + " : " + dic[key] + ", ";
        }
        return dicStr.substring(0, dicStr.length-2) + " }";
    }

    function my(selection){
        selection.each(function(data){

            // TODO: Complete Scaling Below //////////////////////////////////////////
            xScale
                .domain(d3.extent(data, xVal)).nice()
                .range([0, width - margin.right- margin.left]);

            /*yScale;
            sizeScale;
            colorScale;
            shapeScale;*/

            yScale
                .domain(d3.extent(data, yVal)).nice()
                .range([height - margin.top - margin.bottom, 0]);

            sizeScale
                .domain(d3.extent(data, sizeVal)).nice()
                .range(sizeScheme);

            // distinct value??
            colorScale
                .domain(d3.extent(data, colorVal))
                .range(colorScheme);

            shapeScale
                .domain(d3.extent(data, shapeVal))
                .range(shapeScheme);

            //////////////////////////////////////////////////////////////////////////
            
            var svg = d3.select(this)
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", translate(margin.left, margin.top));
           
            // 뭘 하란겨
            // TODO: Render X-Axis Below /////////////////////////////////////////////
            xAxis.scale(xScale)
                .ticks(10)
                .tickFormat(axisFormat);

            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", translate(0, height - margin.bottom - margin.top))
                .call(xAxis);

            ///////////////////////////////////////////////////////////////////////////
            
            // TODO: Render Y-Axis Below //////////////////////////////////////////////
            yAxis.scale(yScale)
                .ticks(10)
                .tickFormat(axisFormat);

           svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", translate(0, 0))
                .call(yAxis);

            ///////////////////////////////////////////////////////////////////////////

            // TODO: Render Points Below //////////////////////////////////////////////
            var symbol = d3.symbol()
                .size(function(d) { return sizeScale(sizeVal(d));})
                .type(function(d) { return shapeScale(shapeVal(d)); });

            svg.selectAll(".point")
                .data(data)
                .enter()
                    .append("path")
                    .attr("class", "point")
                    .attr("transform", 
                        function(d){
                            var xPos = xVal(d);
                            var yPos = yVal(d);
                            
                            return translate(xScale(xPos), yScale(yPos));
                        })
                    .attr("d", symbol)
                    .style("fill", function(d) { return colorScale(colorVal(d)); } )

            ///////////////////////////////////////////////////////////////////////////


            var brush = d3.brush()
                .extent([[0, 0]
                    , [width - margin.right- margin.left, height - margin.bottom - margin.top]])
                .on('brush', update)
                .on('end', update)

            svg
                .append('g')
                .attr('class', 'brush')
                .call(brush)

            function update(){
                var extent = d3.event.selection;
                if (!extent)
                    return;
                var widthRange = [extent[0][0], extent[1][0]];
                var lengthRange = [extent[0][1], extent[1][1]];
                var n = 0, xValSum = 0, yValSum = 0;
                var colorFreq = {}, shapeFreq = {};
            
                svg
                .selectAll('.point')
                .style('opacity', 0.3)
                .filter(function(d){
                    //if (!d) return;
                    return widthRange[0] <=  xScale(xVal(d)) && xScale(xVal(d))<= widthRange[1] &&
                    lengthRange[0] <= yScale(yVal(d)) && yScale(yVal(d)) <= lengthRange[1];
                })
                .style('opacity', 1)
                .each(function(d){
                    n++;
                    xValSum += xVal(d);
                    yValSum += yVal(d);
                    var color = colorVal(d);
                    var shape = shapeVal(d);
                    if(color in colorFreq)
                        colorFreq[color] += 1;
                    else
                        colorFreq[color] = 1;
                    if(shape in shapeFreq)
                        shapeFreq[shape] += 1;
                    else
                        shapeFreq[shape] = 1;
                })
            
                if(n > 0){
                    d3.select('#num-of-points').text("The number of points: " + n);  
                    d3.select('#mean-x').text("The mean value of x: " + (xValSum / n).toString() );    
                    d3.select('#mean-y').text("The mean value of y: " + (yValSum / n).toString() );
                    d3.select('#freq-color').text("The frequency of colors: " + dicToStr(colorFreq));
                    d3.select('#freq-shape').text("The frequency of colors: " + dicToStr(shapeFreq));
                }
            }
        });
    }

    // TODO: Complete Getters and Setters /////////////////////////////////////////////
    my.width = function(value){
        if(!arguments.length) return width;
        width = value;
        return my;
    }


    // 맞나여?
    // default는 어찌 설정하는...?

    my.height = function(value){
        if(!arguments.length) return height;
        height = value;
        return my;
    }

    my.margin = function(value){
        if(!arguments.length) return margin;
        margin = value;
        return my;
    }

    my.x = function(value){
        if(!arguments.length) return xVal;
        xVal = value;
        return my;
    }

    my.y = function(value){
        if(!arguments.length) return yVal;
        yVal = value;
        return my;
    }

    my.color = function(value){
        if(!arguments.length) return colorVal;
        colorVal = value;
        return my;
    }

    my.shape = function(value){
        if(!arguments.length) return shapeVal;
        shapeVal = value;
        return my;
    }

    my.size = function(value){
        if(!arguments.length) return sizeVal;
        sizeVal = value;
        return my;
    }

    my.visualVariables = function(value){
        if(!arguments.length) return visualVars;
        visualVars = value;
        return my;
    }

    ///////////////////////////////////////////////////////////////////////////////////

    return my;
}