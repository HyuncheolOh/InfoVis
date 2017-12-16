function TimeSeries(){
  var width, height;
  var my_name, user_name;
  
  function my(selection){
        selection.each(function(data){
          var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S"),
              formatCount = d3.format(",.0f");


          var user_reviews = data['reviews'];

          var reviews = [];

          for (var i = 0; i < user_reviews.length; i++) {
            reviews.push({date: parseDate(user_reviews[i].date), star: +(user_reviews[i].review_star) });
          }
          
          reviews.sort(function(a, b) {
            return a.date.getTime() - b.date.getTime();
          });

          var margin = {top: 10, right: 30, bottom: 30, left: 30},
              width = 550 - margin.left - margin.right,
              height = 250 - margin.top - margin.bottom;

          var x = d3.scaleTime()
              .domain(d3.extent(reviews, function(d) { return d.date; }))
              .rangeRound([0, width]);

          var y = d3.scaleLinear()
              .domain([0, d3.max(reviews, function(d) { return d.star; })])
              .range([height, 0]);

          var histogram = d3.histogram()
              .value(function(d) { return d.date; })
              .domain(x.domain())
              .thresholds(x.ticks(d3.timeWeek));

          var svg = d3.select("#time_series").append("svg").attr("id", "svg_time_series")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          svg.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

          var bins = histogram(data);

          y.domain([0, d3.max(bins, function(d) { return d.length; })]);

          var bar = svg.selectAll(".bar")
              .data(bins)
              .enter().append("g")
                .attr("class", "bar")
                .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

          bar.append("rect")
              .attr("x", 1)
              .attr("width", function(d) { return 1; }) //x(d.x1) - x(d.x0) - 1; })
              .attr("height", function(d) { console.log(d); return height - y(d.length); });

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





