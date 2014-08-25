// input form guidance: http://bl.ocks.org/d3noob/10633704
// simple d3 force layout: http://bl.ocks.org/mbostock/4062045
// possibly better demo: http://jsfiddle.net/blt909/aVhd8/20/

var n_nodes = 10; // should read these defaults from index.html
var n_edges = 10;
var n_bombs = 10;
var graph = {'nodes':[], 'links':[], 'adjacency':{}};

var width = $(window).width(), //960,
    height = $(window).height(); //500;
    
/* Colors are chosen to resemble minesweeper selections, but specific colors
 * are from Colorbrewer (qualitative, 7 colors)
 */ 
 var colormap = ['white','#377eb8','#4daf4a', '#f781bf', '#ff7f00','#a65628','#984ea3'];
    
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
    layMines();
    setBombsSVG(network);
    network.setLabels();
    setNodeStyle(network);
});

var refreshGraph = function(){
    console.log("refreshing...");
    d3.selectAll("svg").remove();   
    graph = randGraph(n_nodes, n_edges);
    layMines(n_bombs);    
    var network = buildGraph();
    setBombsSVG(network);
    setNodeStyle(network);
}

var countBombs = function(id){
    var neighbors = graph.adjacency[id];
    var neighbor_bombs = 0;
    for(i=0; i<neighbors.length; ++i){
        n_id = neighbors[i];
        if(graph.nodes[n_id].bomb){ 
            ++neighbor_bombs;
        };
    }
    return neighbor_bombs;
};

var layMines = function(){
    //flush old bombs
    if(+n_bombs>+n_nodes) {n_bombs = n_nodes;};
    for(i=0; i<graph.nodes.length; ++i){
        graph.nodes[i].bomb=false;    
        }

    //place new bombs
    var placed = [];
    n = -1;
    while(placed.length<n_bombs){
        while(n==-1 | placed.indexOf(n)>-1){ 
            n = randInt(n_nodes);
            }
        graph.nodes[n].bomb = true;
        placed[placed.length] = n;
    }
    
    //Calculate bombDegree
    for(id=0; id<graph.nodes.length; ++id){
        graph.nodes[id].bombDegree = countBombs(id);   
        var label = "X";
        if(!graph.nodes[id].bomb){
            label = Math.min(graph.nodes[id].bombDegree, 9)}; //make sure colors are thresholded
        graph.nodes[id].label = label;
    }
}

function setNodeStyle(network){
    network.node.each(function(d){
        var c = "#ffff33";
        if(d.bomb){
            c="#e41a1c";
            $("text#x"+d.id)[0].innerHTML="X";
        }else{
            var deg = this.getAttribute('bombDegree')
            if(deg<=colormap.length){
                c = colormap[deg]};
        };
        this.setAttribute('fill', c);
    });
};
