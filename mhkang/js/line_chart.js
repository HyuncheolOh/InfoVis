function TimeSeries(){
  var w, h;
  var my_name, user_name;
  
  function my(selection){
        selection.each(function(data){
          console.log(w, h);
          console.log(data);
          console.log(w, h);

          //var svg = d3.select("#svg_time_series");

          var svg = d3.select("#ts_d")
                      .append("svg")
                      .attr("id", "svg_ts_d")
                      .attr("width", w)
                      .attr("height", h);

          var margin = {top: 20, right: 20, bottom: 110, left: 40},
              margin2 = {top: 230, right: 20, bottom: 30, left: 40},
              width = +svg.attr("width") - margin.left - margin.right,
              height = +svg.attr("height") - margin.top - margin.bottom,
              height2 = +svg.attr("height") - margin2.top - margin2.bottom;

          var x = d3.scaleTime().range([0, width]),
              x2 = d3.scaleTime().range([0, width]),
              y = d3.scaleLinear().range([height, 0]),
              y2 = d3.scaleLinear().range([height2, 0]);

          var xAxis = d3.axisBottom(x),
              xAxis2 = d3.axisBottom(x2),
              yAxis = d3.axisLeft(y);

          var brush = d3.brushX()
              .extent([[0, 0], [width, height2]])
              .on("brush end", brushed);

          var zoom = d3.zoom()
              .scaleExtent([1, Infinity])
              .translateExtent([[0, 0], [width, height]])
              .extent([[0, 0], [width, height]])
              .on("zoom", zoomed);

          svg.append("defs").append("clipPath")
              .attr("id", "clip")
            .append("rect")
              .attr("width", width)
              .attr("height", height);

          var focus = svg.append("g")
              .attr("class", "focus")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var context = svg.append("g")
              .attr("class", "context")
              .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

               // 7. d3's line generator
          var line = d3.line()
              .x(function(d, i) { return x(d.date); }) // set the x values for the line generator
              .y(function(d) { return y(d.star); }); // set the y values for the line generator 
              //.curve(d3.curveMonotoneX) // apply smoothing to the line

          var line2 = d3.line()
              .x(function(d, i) { return x2(d.date); }) // set the x values for the line generator
              .y(function(d) { return y2(d.star); }); // set the y values for the line generator 
              //.curve(d3.curveMonotoneX) // apply smoothing to the line
          
          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain([0, d3.max(data, function(d) { return d.star; })]);
          x2.domain(x.domain());
          y2.domain(y.domain());

          // 9. Append the path, bind the data, and call the line generator 
          focus.append("path")
              .datum(data) // 10. Binds data to the line 
              .attr("class", "line") // Assign a class for styling 
              .attr("d", line); // 11. Calls the line generator 

          // 12. Appends a circle for each datapoint 
          focus.selectAll(".dot")
              .data(data)
            .enter().append("circle") // Uses the enter().append() method
              .attr("class", "dot") // Assign a class for styling
              .attr("cx", function(d, i) { return x(d.date) })
              .attr("cy", function(d) { return y(d.star) })
              .attr("r", 5);

          focus.append("rect")
              .attr("style", "fill:white;")
              .attr("width", 40)
              .attr("height", height + 10)
              .attr("transform", "translate(-40, -10)");

          focus.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          focus.append("g")
              .attr("class", "axis axis--y")
              .call(yAxis);

          // 9. Append the path, bind the data, and call the line generator 
          context.append("path")
              .datum(data) // 10. Binds data to the line 
              .attr("class", "line") // Assign a class for styling 
              .attr("d", line2); // 11. Calls the line generator 

          // 12. Appends a circle for each datapoint 
          context.selectAll(".dot")
              .data(data)
            .enter().append("circle") // Uses the enter().append() method
              .attr("class", "dot") // Assign a class for styling
              .attr("cx", function(d, i) { return x2(d.date) })
              .attr("cy", function(d) { return y2(d.star) })
              .attr("r", 5);

          context.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height2 + ")")
              .call(xAxis2);

          context.append("g")
              .attr("class", "brush")
              .call(brush)
              .call(brush.move, x.range());

          svg.append("rect")
              .attr("class", "zoom")
              .attr("width", width)
              .attr("height", height)
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .call(zoom);



          function brushed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            var s = d3.event.selection || x2.range();
            x.domain(s.map(x2.invert, x2));
            focus.select(".line").attr("d", line);
            focus.selectAll(".dot")
              .attr("cx", function(d, i) { return x(d.date) })
              .attr("cy", function(d) { return y(d.star) })
              .attr("r", 5);
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));
          }


          function zoomed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            var t = d3.event.transform;
            x.domain(t.rescaleX(x2).domain());
            focus.select(".line").attr("d", line);
            focus.selectAll(".dot")
              .attr("cx", function(d, i) { return x(d.date) })
              .attr("cy", function(d) { return y(d.star) })
              .attr("r", 5);
            focus.select(".axis--x").call(xAxis);
            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
          }

  });
}

  my.width = function(value){
      if(!arguments.length) return w;
      w = value;
      return my;
  }

  my.height = function(value){
      if(!arguments.length) return h;
      h = value;
      return my;
  }

  my.my_name = function(value) {
      if(!arguments.length) return my_name;
      my_name = value;
      return my;
  }

  my.user_name = function(value) {
      if(!arguments.length) return user_name;
      user_name = value;
      return my;
  }

    return my;
}

