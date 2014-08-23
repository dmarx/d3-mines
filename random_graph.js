var randInt = function(bound){return Math.floor((Math.random() * bound))}

var randArray = function(m, bound){
    var array = []; 
    for (i=0; i<m; ++i){
        array[i] = randInt(bound);
    };
    return array;
}

var randMatrix = function(n,m,bound){
    var matrix = [];
    for (j=0; j<n; ++j){
        matrix[j] = randArray(m, bound);
    };
    return matrix;
}

var randEdgelist = function(n_nodes, n_edges){
    edges_matrix = randMatrix(n_edges,2,n_nodes);
    edges_list = [];
    for(i=0; i<n_edges; ++i){
        edges_list[i] = {'source':edges_matrix[i][0],
                         'target':edges_matrix[i][1]};
    }
    return edges_list;
}

var randGraph = function(n_nodes, n_edges){
    var nodes = [];
    for(i=0; i<n_nodes; ++i){
        nodes[i] = {'id':i};
    }
    return {'nodes':nodes, 'links':randEdgelist(n_nodes, n_edges)}
}