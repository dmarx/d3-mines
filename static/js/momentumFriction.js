function winAnimation(){

    var anim = d3.layout.force()
            .gravity(0)
            .charge(0)
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
                py: previousPoint?previousPoint[1]:point[1]
            };

        previousPoint = point;

        svg2.append("svg:circle")
                    .data([node])
                .attr("class", "node")
                .attr("cx", function (d) {return d.x;})
                .attr("cy", function (d) {return d.y;})
                .attr("r", 1e-6)
            .transition()
                .attr("r", 4.5)
            .transition()
            .delay(5000)
                .attr("r", 1e-6)
                .each("end", function () {
                    anim.nodes().shift();
                })
                .remove();

        anim.nodes().push(node);
        anim.start();
    });
}