var setBombsSVG = function(network){
    network.node.classed("bomb", function(d){return d.bomb})
}

var countBombs = function(d){
    var neighbors = graph.adjacency[d.id];
        var neighbor_bombs = 0;
        for( id in neighbors ){
            if($('.node.bomb#x' + id).length > 0) ++neighbor_bombs;
        }
    return neighbor_bombs;
};

var calcBombDegree = function(network){
    network.node.each(function(d) {
        this.setAttribute("bombDegree", countBombs(d));
    });
}

var updateLabelValues = function(network){

    network.label.each(function(d) {        
        bd = $(".node#x"+d.id)[0].getAttribute("bombDegree");
        this.setAttribute("bombDegree", bd);
        this.innerHTML= bd;
        
    });
};