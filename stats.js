var flag_counter = d3.select("#flag_counter").data(n_flags);
flag_counter.append("p").text(n_flags); //id setter not working properly.

function updateFlagsCount(){
    d3.select("#flag_counter>p:not(#flag-count-label)").remove()
    flag_counter.append("p").text(n_flags);
    };