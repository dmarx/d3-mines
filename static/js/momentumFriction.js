function winAnimation(){

    var anim = d3.layout.force()
            .gravity(0)
            //.charge(0)
            .charge(-40)
            .friction(0.95);

    var svg2 = d3.select("#animation").append("svg:svg");

    anim.on("tick", function () {
        svg2.selectAll("circle")
                .attr("cx", function (d) {return d.x;})
                .attr("cy", function (d) {return d.y;});
    });

    var previousPoint;

    svg2.on("mousemove", function () {
        var point = d3.mouse(this),
            node = {
                x: point[0],
                y: point[1],
                px: previousPoint?previousPoint[0]:point[0],
                py: previousPoint?previousPoint[1]:point[1],
                col: randInt(10)
            };

        previousPoint = point;
        
        var color = d3.scale.category10().domain([0,1,2,3,4,5,6,7,8,9]);
        
        var sustain = 1000;
        svg2.append("svg:circle")
                    .data([node])
                .attr("class", "node")
                .attr("cx", function (d) {return d.x;})
                .attr("cy", function (d) {return d.y;})
                .style("fill", function(d) { return color(d.col); })
                .style("stroke", function(d) { return color(d.col); })
                .attr("r", 1e-5)
                //.attr("opacity",1)
            .transition()
                //.attr("r", 4.5)
                .attr("r", randInt(12))
                .attr("opacity",.6)
                .duration(sustain/2)
            //.transition()
                //.duration(2*sustain)
                //.ease()
                //.delay(sustain)
            .transition()
                //.delay(sustain)
                .attr("opacity",.1)
                .attr("r", 1e-6)
                .each("end", function () {
                    anim.nodes().shift();
                })
                .remove();

        anim.nodes().push(node);
        anim.start();
    });
}