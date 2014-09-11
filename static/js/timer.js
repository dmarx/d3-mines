var timerOn=false;
var time=0;
var displayTime=0;

function incrementTimer(){    
    if(timerOn){
        ++time;        
        //displayTime = (time/10) % 100;
        if(time % 10 == 0){
            ++displayTime;
            //$('#timer-value').text((displayTime));
            $('#timer-value').text((Math.floor(displayTime)));
        }
    }
}

//setInterval(incrementTimer, 1000);
setInterval(incrementTimer, 100); // tenth-of-second granularity