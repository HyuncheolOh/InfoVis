function TimeSeries(){
  var w, h;
  var my_name, user_name;
  var mg = {top: 20, right: 20, bottom: 100, left: 40};
  
  function my(selection){
        selection.each(function(data){
          console.log(data);
          console.log(w, h);

          //var svg = d3.select("#svg_time_series");

          var svg = d3.select("#time_series").append("svg").attr("id", "svg_time_series").attr("width", w).attr("height", h);
              //g = svg.append("g").attr("transform", "translate(" + mg.left + "," + mg.top + ")");

          var margin = {top: 20, right: 20, bottom: 100, left: 40},
              margin2 = {top: 200, right: 20, bottom: 30, left: 40},
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

          var area = d3.area()
              //.curve(d3.curveMonotoneX)
              .x(function(d) { return x(d.date); })
              .y0(height)
              .y1(function(d) { return y(d.star); });

          var area2 = d3.area()
              //.curve(d3.curveMonotoneX)
              .x(function(d) { return x2(d.date); })
              .y0(height2)
              .y1(function(d) { return y2(d.star); });


          svg.append("defs").append("clipPath")
              .attr("id", "clip")
            .append("rect")
              .attr("width", width)
              .attr("height", height);

          var focus = svg.append("g")
              .attr("class", "focus")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              console.log(focus);

          var context = svg.append("g")
              .attr("class", "context")
              .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain([0, d3.max(data, function(d) { return d.star; })]);
          x2.domain(x.domain());
          y2.domain(y.domain());

          focus.append("path")
              .datum(data)
              .attr("class", "area")
              .attr("d", area);

              console.log(focus);

          focus.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          focus.append("g")
              .attr("class", "axis axis--y")
              .call(yAxis);

          context.append("path")
              .datum(data)
              .attr("class", "area")
              .attr("d", area2);

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
          
            

          function update(){
            x.domain(d3.extent(reviews, function(d) { return d.date; }));
            y.domain([0, d3.max(reviews, function(d) { return d.star; })]);
            x2.domain(x.domain());
            y2.domain(y.domain());

            var svg = d3.select("#time_series").transition();

            focus.append("path")
                .duration(750)
                .attr("d", area);

            focus.append("g")
                .duration(750)
                .call(xAxis);

            focus.append("g")
                .duration(750)
                .call(yAxis);

            context.append("path")
                .duration(750)
                .attr("d", area2);

            context.append("g")
                .duration(750)
                .call(xAxis2);

            context.append("g")
                .duration(750)
                .call(brush)
                .call(brush.move, x.range());

            svg.append("rect")
                .duration(750)
                .call(zoom);
            }


          function brushed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            var s = d3.event.selection || x2.range();
            x.domain(s.map(x2.invert, x2));
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));
          }


          function zoomed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            var t = d3.event.transform;
            x.domain(t.rescaleX(x2).domain());
            focus.select(".area").attr("d", area);
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

