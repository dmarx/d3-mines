// input form guidance: http://bl.ocks.org/d3noob/10633704
// simple d3 force layout: http://bl.ocks.org/mbostock/4062045
// possibly better demo: http://jsfiddle.net/blt909/aVhd8/20/

var n_nodes = 10; // should read these defaults from index.html
var n_edges = 10;
var n_bombs = 10;
var graph = {'nodes':[], 'links':[]};

var width = $(window).width(); //960,
    height = $(window).height(); //500;
    
d3.select("#n_nodes").on("input", function() {
  n_nodes = this.value;
  refreshGraph();
});

d3.select("#n_edges").on("input", function() {
    n_edges = this.value;
    refreshGraph();
});

d3.select("#n_bombs").on("input", function() {
    n_bombs = this.value;
    layMines(n_bombs);
    setBombsSVG(network);
});

var refreshGraph = function(){
    console.log("refreshing...");
d3.selectAll("svg").remove();
    //console.log(n_nodes, n_edges);    
    graph = randGraph(n_nodes, n_edges);
    layMines(n_bombs);    
    var network = buildGraph();
    setBombsSVG(network);
}

var layMines = function(n_mines){
     //graph.nodes.forEach(function(d){d.bomb = false}); 
    console.log(graph.nodes);
    for(i=0; i<graph.nodes.length; ++i){
        graph.nodes[i].bomb=false;    
        }

    var placed = [];
    n = -1;
    while(placed.length<n_mines){
        while(n==-1 | placed.indexOf(n)>-1){ 
            n = randInt(n_nodes);
            }
        graph.nodes[n].bomb = true;
        placed[placed.length] = n;
    }
}