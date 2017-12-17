function Distribution(){
  var w, h;
  var my_name, user_name;
  var margin = {top: 20, right: 100, bottom: 70, left: 40};
  
  function my(selection){
    selection.each(function(data){

      var width = w - margin.left - margin.right,
          height = h - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
      var y = d3.scaleLinear()
                .range([height, 0]);
                
      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("#ts_d")
          .append("svg")
          .attr("id", "svg_ts_d")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data in the domains
      x.domain(data.map(function(d) { return d.star; }));
      y.domain([0, d3.max(data, function(d) { return d.cnt; })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.star); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.cnt); })
          .attr("height", function(d) { return height - y(d.cnt); });

      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // add the y Axis
      svg.append("g")
          .call(d3.axisLeft(y));

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

