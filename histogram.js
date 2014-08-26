Counter = {'hash':[]};
Counter.update = function(v){
    if(!(v in this.hash)){
        this.hash[v] = 1;
    } else {
        this.hash[v] += 1;
        }
};

Counter.values = function(){
    for(i=0; i<this.hash.length; ++i){
        if(!(i in this.hash)){
            this.hash[i]=0;
        } 
    }
    return this.hash;
};

Counter.reset = function(){
    Counter.hash = [];
}

/////////////////////

function getBombDegreeDistribution(){
    Counter.reset()
    for(j=0; j<graph.nodes.length; ++j){
        Counter.update(graph.nodes[j].bombDegree);
    };
    return Counter.values();
}

function buildHistogram(){

    freq = getBombDegreeDistribution();

    data = [];
    for(i=0; i<freq.length; ++i){
        data.push({'x':i, 'y':freq[i]});
    }

    console.log(data);

    /////////////////////////////////////////////////

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        h_width = 960 - margin.left - margin.right,
        h_height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .domain([0,freq.length])
        .range([0, h_width], .7);

    for(i=0; i<freq.length; ++i){
    console.log("test");
    console.log(x(i));
    }
        
    var y = d3.scale.linear()
        .domain([0, d3.max(freq)])
        .range([h_height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var hist_svg = d3.select("#histogram").append("svg")
        .attr("width", h_width + margin.left + margin.right)
        .attr("height", h_height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /*
    d3.tsv("data.tsv", type, function(error, data) {
      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
    */

      hist_svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h_height + ")")
          .call(xAxis);

      hist_svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");

      hist_svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { 
            console.log(d.x);
             console.log(x(d.x));
            return x(d.x); 
            })
          .attr("width", x(1))
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return h_height - y(d.y); });

    }