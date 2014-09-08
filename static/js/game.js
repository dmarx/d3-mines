// input form guidance: http://bl.ocks.org/d3noob/10633704
// simple d3 force layout: http://bl.ocks.org/mbostock/4062045

var n_nodes = d3.select("input#n_nodes").attr("value"),    
    n_edges = d3.select("input#n_edges").attr("value"),
    n_bombs = d3.select("input#n_bombs").attr("value"),
    n_flags = n_bombs,
    remaining_bombs = n_bombs,
    you_win = false,
    graph = {'nodes':[], 'links':[], 'adjacency':{}},
    width = $(window).width(),
    height = $(window).height(),
    timerOn=false,
    time=0,
    displayTime=0;

    
d3.select("#app-reset-button").on("mouseup", function(){
        refreshGraph();
    });
    
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
    n_flags = n_bombs;
    remaining_bombs = n_bombs;
    layMines();
    graph.hideAll();
    network.setLabels();
    updateFlagsCount();
});

function refreshGraph(){
    /* reset timer */
    timerOn=false;
    time=0;
    displayTime=0;
    $('#timer-value').text((displayTime));
    
    you_win=false;
    d3.select('#win-text').text('lose');
    n_flags = n_bombs;
    remaining_bombs = n_bombs;
    console.log("refreshing...");
    d3.selectAll("svg").remove();  
    d3.select('#contact_info_form').classed('hidden',true);
    d3.select('#shade').classed('hidden',true)
    graph = randGraph(n_nodes, n_edges);
    layMines(n_bombs);    
    var network = buildGraph();
    updateFlagsCount();
}

function countBombs(id){
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

function layMines(){
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

/* Timer */
function incrementTimer(){    
    if(timerOn){
        ++time;        
        displayTime = (time/10) % 100;
        if(time % 10 == 0){
            $('#timer-value').text((displayTime));
        }
    }
}

setInterval(incrementTimer, 1000); // tenth-of-second granularity

/* contact/score submission */
$(function() {
      $('#contact-submit-button').bind('click', function() {        
        $.getJSON($SCRIPT_ROOT + '/_submit_contact_info', {
          name: $('input[name="name"]').val(),          
          company: $('input[name="company"]').val(),
          email: $('input[name="email"]').val(),
          elapsed: time,
          win: you_win //just for fun, let's collect scores for every game and just add a flag for whether or not the person won.
      }, function(data) { return false;
      });
        refreshGraph()
        return false;
      });
    });