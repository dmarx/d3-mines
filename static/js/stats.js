var flag_counter = d3.select("#flag-counter-value").data(n_flags);
flag_counter.append("p").text(n_flags); //id setter not working properly.

function updateFlagsCount(){
    console.log("updating flags to",n_flags);
    d3.select("#flag-counter-value>p").remove();
    flag_counter.append("p").text(n_flags);
    };