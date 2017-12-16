function TimeSeries(){
  var width, height;
  var my_name, user_name;
  var margin1 = {top: 20, right: 20, bottom: 100, left: 40},
      margin2 = {top: 170, right: 20, bottom: 30, left: 40};
  
  function my(selection){
        selection.each(function(data){
          console.log(data);

          var w = 550, h = 250
          var svg = d3.select("#time_series").append("svg").attr("id", "svg_time_series").attr("width", w).attr("height", h),
              margin = {top: 20, right: 20, bottom: 110, left: 40},
              margin2 = {top: 170, right: 20, bottom: 30, left: 40},
              width = +svg.attr("width") - margin.left - margin.right,
              height = +svg.attr("height") - margin.top - margin.bottom,
              height2 = +svg.attr("height") - margin2.top - margin2.bottom;

          var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

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
              .curve(d3.curveMonotoneX)
              .x(function(d) { return x(d.date); })
              .y0(height)
              .y1(function(d) { return y(d.star); });

          var area2 = d3.area()
              .curve(d3.curveMonotoneX)
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

          var context = svg.append("g")
              .attr("class", "context")
              .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

          var user_reviews = data['reviews'];

          var reviews = [];

          for (var i = 0; i < user_reviews.length; i++) {
            reviews.push({date: parseDate(user_reviews[i].date), star: +(user_reviews[i].review_star) });
          }
          
          reviews.sort(function(a, b) {
            return a.date.getTime() - b.date.getTime();
          });

          console.log(reviews);

          x.domain(d3.extent(reviews, function(d) { return d.date; }));
          y.domain([0, d3.max(reviews, function(d) { return d.star; })]);
          x2.domain(x.domain());
          y2.domain(y.domain());

          focus.append("path")
              .datum(reviews)
              .attr("class", "area")
              .attr("d", area);

          focus.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          focus.append("g")
              .attr("class", "axis axis--y")
              .call(yAxis);

          context.append("path")
              .datum(reviews)
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

  my.margin1 = function(value) {
      if(!arguments.length) return margin1;
      margin1.left = value['left'];
      margin1.top = value['right'];
      margin1.top = value['top'];
      margin1.bottom = value['bottom'];
      return my;
  }

  my.margin2 = function(value) {
      if(!arguments.length) return margin2;
      margin2.left = value['left'];
      margin2.top = value['right'];
      margin2.top = value['top'];
      margin2.bottom = value['bottom'];
      return my;
  }

    return my;
}

