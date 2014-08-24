var setBombsSVG = function(network){
    network.node.classed("bomb", function(d){return d.bomb})
}

var countBombs = function(d){
    var neighbors = graph.adjacency[d.id];
        var neighbor_bombs = 0;
        for( id in neighbors ){
            if($('.node.bomb#' + id).length > 0) ++neighbor_bombs;
        }
        console.log(d.id);
    console.log(neighbors);
    console.log(neighbor_bombs);
    return neighbor_bombs;
};

var calcBombDegree = function(network){
    network.node.each(function(d) {
        this.setAttribute("bombDegree", countBombs(d));
    });
}