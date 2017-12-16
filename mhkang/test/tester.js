var test_data = [
  {a:1e6 , b: 2e6, c:'alpha', d:'가', e: 10.0},
  {a:3e6 , b: 7e6, c:'beta', d:'나', e: 5.0},
  {a:5e6 , b: 11e6, c:'gamma', d:'다', e: 7.0}
];

$(function(){

  var params = {};
  params['x'] = 'a';
  params['y'] = 'b';
  params['color'] = 'c';
  params['shape'] = 'd';
  params['size'] = 'e';
  
  var scatterPlot = ScatterPlot();
  
  QUnit.test('Getter-Setter Tests', function(assert){
    var test_width = 700;
    assert.equal(
      scatterPlot.width(test_width).width(),
      test_width,
      'width - getter and setter'
    );
    
    var test_height = 700;
    assert.equal(
      scatterPlot.height(test_height).height(),
      test_height,
      'height - getter and setter'
    );
    
    var test_margin = { left:50, right:50, top:50, bottom:50 };
    assert.deepEqual(
      scatterPlot.margin(test_margin).margin(),
      test_margin,
      'margin - getter and setter'
    );

    assert.deepEqual(
      scatterPlot.visualVariables(params).visualVariables(),
      params,
      'visualVariables - getter and setter'
    );

    var test_x = function(d){return d[params.x]};
    assert.deepEqual(
      scatterPlot.x(test_x).x(),
      test_x,
      'x - getter and setter'
    );

    var test_y = function(d){return d[params.y]};
    assert.deepEqual(
      scatterPlot.y(test_y).y(),
      test_y,
      'y - getter and setter'
    );

    var test_color = function(d){return d[params.color]};
    assert.deepEqual(
      scatterPlot.color(test_color).color(),
      test_color,
      'color - getter and setter'
    );

    var test_shape = function(d){return d[params.shape]};
    assert.deepEqual(
      scatterPlot.shape(test_shape).shape(),
      test_shape,
      'shape - getter and setter'
    );

    var test_size = function(d){return d[params.size]};
    assert.deepEqual(
      scatterPlot.size(test_size).size(),
      test_size,
      'size - getter and setter'
    );
  });
  
  scatterPlot = ScatterPlot()
  .visualVariables(params)
  .x(function(d) { return d[params.x]; })
  .y(function(d) { return d[params.y]; })
  .color(function(d) { return d[params.color]; })
  .shape(function(d) { return d[params.shape]; })
  .size(function(d) { return d[params.size]; })
  .width(800)
  .height(500)
  .margin({left:50, right:25, top:25, bottom:50 });

  var svg = d3.select('#scatterplot').datum(test_data).call(scatterPlot);
  QUnit.test('Rendering test', function(assert){
    assert.equal(
      d3.selectAll('.point').size(),
      test_data.length,
      'check if the number of points is correct'
    );

    assert.equal(
      d3.selectAll('.y-axis').size(),
      1,
      'check the existence of y-axis'
    );

    assert.equal(
      d3.selectAll('.x-axis').size(),
      1,
      'check the existence of x-axis'
    );
  });
});