var buildGraph = function(){
    d3.select("svg").remove();

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);
    
    function zoomed() {
      svg.attr("transform",
          "translate(" + d3.event.translate + ")"
          + " scale(" + d3.event.scale + ")");
    };   
    
    var svg = d3.select("#chart")
          .append("svg")
          .attr("id", "network")
          .attr("width", width)    
          .attr("height", height)
          .attr("viewBox","0 0 "+ width + " " + height)
          .attr("preserveAspectRatio","xMidYMid")
          .call(zoom)
          .on("dblclick.zoom", null)
        .append('g');

    var aspect = width / height,
        chart = $("#network");
    $(window).on("resize", function() {
        var targetWidth = chart.parent().width();
        chart.attr("width", targetWidth);
        chart.attr("height", targetWidth / aspect);
    });
          
    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(80)
        .size([width, height]);

    force.nodes(graph.nodes)
         .links(graph.links)
         .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link");
  
  var drag = force.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged);
    
    function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
    }

    function dragged(d) {
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }
  
    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("id",function(d) { return 'x' + d.id;})
        .attr("r", 12)        
        .call(drag);
        
    var label = svg.selectAll(".label")
        .data(graph.nodes)
        .enter().append("text")
        .attr("dx", -4)
        .attr("dy", ".35em")
        .attr("id", function(d) { return 'x' + d.id; })
        .text(function(d) { return d.id; });
        
    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
            
        label.attr('x', function(d) { return d.x; })
             .attr('y', function(d) { return d.y; });
      });      

    network = {};
    network.node = node;
    network.link = link;
    network.svg = svg;
    network.label = label
    return network;
}