var buildGraph = function(){
    d3.select("svg").remove();

    var svg = d3.select("#chart")
          .append("svg")
          .attr("width", width)    
          .attr("height", height); 

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);

    force.nodes(graph.nodes)
         .links(graph.links)
         .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        //.style("stroke-width", function(d) { return Math.sqrt(d.value); });
        
    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)        
        .call(force.drag);
        
    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      });      

    network = {};
    network.node = node;
    network.link = link;
    network.svg = svg;
    return network;
}

var setBombsSVG = function(network){
    network.node.classed("bomb", function(d){return d.bomb})
}