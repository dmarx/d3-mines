Counter = {'hash':[]};
Counter.update = function(v){
    if(!(v in this.hash)){
        this.hash[v] = 1;
    } else {
        this.hash[v] += 1;
        }
};

Counter.values = function(){
    for(i=0; i<this.hash.length; ++i){
        if(!(i in this.hash)){
            this.hash[i]=0;
        } 
    }
    return this.hash;
};

Counter.reset = function(){
    Counter.hash = [];
}

/////////////////////

function getBombDegreeDistribution(){
    Counter.reset()
    for(j=0; j<graph.nodes.length; ++j){
        Counter.update(graph.nodes[j].bombDegree);
    };
    return Counter.values();
}