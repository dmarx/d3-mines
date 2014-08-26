var color = d3.scale.category10().domain([0, 1, 2, 'X', 3, 4, 5, 6, 7, 8]);
var default_color = "black";


function wasRightClick() { 
    var isRight = false;
        //if (d3.event.sourceEvent.which == 3 || d3.event.sourceEvent.button == 2) { //3==firefox, 2==ie 
        if (d3.event.button == 2) { //3==firefox, 2==ie 
            isRight = true;};
    return isRight;
    }
    
function buildGraph(){
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
          
    var force = d3.layout.force()
        .charge(-320)
        .linkDistance(80)
        .size([width, height]);

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
        
    force.nodes(graph.nodes)
         .links(graph.links)
         .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link");
   
    function mouseDown(d){
        d.fixed=true;
        if(wasRightClick()){ 
            return 0; //Break out. Handling right click events separately
            }
        if(d.bomb && !d.visible && !d.flagged) {
            graph.showAll();
        }else if(!d.flagged){
            graph.nodes[d.id].visible = true;
        }
        setLabels();
    };
    
    function rightClick(d){
        if(!d.visible){d.flagged = !d.flagged;};
        d3.event.preventDefault();
        setLabels();
    }
   
    var node = svg.selectAll("g.node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("id",function(d) { return 'x' + d.id;})
        .on("mousedown", function(d){mouseDown(d)})
        .on("contextmenu", function(d) {rightClick(d)} )
        .call(drag);       
    
    node.append("circle")
        .attr("class", "node")
        .attr("id",function(d) { return 'x' + d.id;})
        .attr("r", 12);
    
        node.append("circle")
        .attr("class", "halo")
        .attr("id",function(d) { return 'x' + d.id;})
        .attr("r", 16)
        .attr("stroke-opacity",0)
        ;
    
    function setLabels(){
        node.select("text").remove();
        node.select("circle").attr("fill", default_color);
        
        node.classed("visible", function(d){return d.visible});
        node.classed("flagged", function(d){return d.flagged});
        node.filter(".visible")
            .append("text")
            .attr("dx", -4)
            .attr("dy", ".35em")
            .attr("id", function(d) { return 'x' + d.id; })
            .text(function(d) { return d.label; });
        node.select(".visible>circle.node").attr("fill", function(d){return color(d.label)});
        node.select("circle.halo").attr("stroke-opacity", 0);
        node.select(".flagged>circle.halo").attr("stroke-opacity", 1);
        node.classed("bomb", function(d){return d.bomb})
    };
    setLabels()
        
    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
            
        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      });      

    network = {};
    network.node = node;
    network.link = link;
    network.svg = svg;
    //network.label = label
    network.setLabels = setLabels;
    return network;
}