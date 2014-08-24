var randInt = function(bound){return Math.floor((Math.random() * bound))};

var randArray = function(m, bound){
    var array = []; 
    for (i=0; i<m; ++i){
        array[i] = randInt(bound);
    };
    return array;
};

var randMatrix = function(n,m,bound){
    var matrix = [];
    for (j=0; j<n; ++j){
        matrix[j] = randArray(m, bound);
    };
    return matrix;
};

var randEdgelist = function(n_nodes, n_edges){
    edges_matrix = randMatrix(n_edges,2,n_nodes);
    edges_list = [];
    for(i=0; i<n_edges; ++i){
        edges_list[i] = {'source':edges_matrix[i][0],
                         'target':edges_matrix[i][1]};
    };
    return edges_list;
};

var arrayUnique = function(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};

//var enforceSingleConnectedComponent = function(edge_list){ // this would be a bit more involved.
var enforceNoSingletons = function(edge_list){
    connected_nodes = [];
    edge_list.forEach(function(e){
        connected_nodes.push(e.source);
        connected_nodes.push(e.target);
    });
    connected_nodes = arrayUnique(connected_nodes);
    
    for(n=0; n<n_nodes; ++n){
        if(connected_nodes.indexOf(n) < 0){
            var j = randInt(connected_nodes.length);
            var n2 = connected_nodes[j];
            edge_list.push({'source':n, 'target':n2});
            //connected_nodes.push(n);
        }
    };
    
    return edge_list;
};

var randGraph = function(n_nodes, n_edges){
    var nodes = [];
    for(i=0; i<n_nodes; ++i){
        nodes[i] = {'id':i};
    };
    var links = randEdgelist(n_nodes, n_edges);
    //links = enforceSingleConnectedComponent(links);
    links = enforceNoSingletons(links);   
    adj = edgelistToAdjacencylist(links);
    return {'nodes':nodes, 'links':links, 'adjacency':adj}
};

var edgelistToAdjacencylist = function(edge_list){
    var edgeHash = {};
    for (i=0; i<edge_list.length; ++i) {
        var n1 = edge_list[i].source,
            n2 = edge_list[i].target;
        if(!(n1 in edgeHash)) edgeHash[n1]=[];
        if(!(n2 in edgeHash)) edgeHash[n2]=[];
        edgeHash[n1].push(n2);
        edgeHash[n2].push(n1);
      }
      
    for (i=0; i<n_nodes; ++i) {
        edgeHash[i] = arrayUnique(edgeHash[i]);
    }
    return edgeHash;
};

