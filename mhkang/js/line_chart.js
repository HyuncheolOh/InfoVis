function TimeSeries(){
  var width, height;
  var my_name, user_name;
  var margin1 = {top: 20, right: 20, bottom: 100, left: 40},
      margin2 = {top: 170, right: 20, bottom: 30, left: 40};
  
  function my(selection){
        selection.each(function(data){
          
        var w = 550, h = 250
        var svg = d3.select("#time_series").append("svg").attr("id", "svg_time_series").attr("width", w).attr("height", h),
            margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

        var x = d3.scaleTime()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var user_reviews = data['reviews'];

        var reviews = [];

        for (var i = 0; i < user_reviews.length; i++) {
          reviews.push({date: parseDate(user_reviews[i].date), star: +(user_reviews[i].review_star) });
        }
        
        reviews.sort(function(a, b) {
          return a.date.getTime() - b.date.getTime();
        });

        var line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.star); });

        x.domain(d3.extent(reviews, function(d) { return d.date; }));
        y.domain(d3.extent(reviews, function(d) { return d.star; }));

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
          .select(".domain")
            .remove();

        g.append("g")
            .call(d3.axisLeft(y))
          .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("star");

        g.append("path")
            .datum(reviews)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);

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

  return my;
}