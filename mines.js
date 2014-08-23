// input form guidance: http://bl.ocks.org/d3noob/10633704
// simple d3 force layout: http://bl.ocks.org/mbostock/4062045
// possibly better demo: http://jsfiddle.net/blt909/aVhd8/20/

var n_nodes = 10; // should read these defaults from index.html
var n_edges = 10;
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

var refreshGraph = function(){
    console.log("refreshing...");
d3.selectAll("svg").remove();
    //console.log(n_nodes, n_edges);    
    graph = randGraph(n_nodes, n_edges);
    layMines();    
    buildGraph();
}

var layMines = function(n_mines){
    return 0; // get back to this
}