var setBombsSVG = function(network){
    network.node.classed("bomb", function(d){return d.bomb})
}

/*
var calcBombDegree = function(network){
    network.node.each(function(d) {
        this.setAttribute("bombDegree", countBombs(d));
    });
}
*/

var updateLabelValues = function(network){
    return 0;
    network.label.each(function(d) {        
        var bd = $(".node#x"+d.id)[0].getAttribute("bombDegree");
        this.setAttribute("bombDegree", bd);
        this.innerHTML= bd;
    });
};