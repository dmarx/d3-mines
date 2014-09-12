idleTimer = null;
idleState = true;
idleWait = 10000;

$("#instructions").hide();

(function ($) {
    $(document).ready(function () {
        $('*').bind('mousemove keydown scroll', function () {
            clearTimeout(idleTimer);
            if (idleState == false) { 
                // Reactivated event
                //$("body").append("<p>Welcome Back.</p>");            
                $("#instructions").hide();
            }
            
            idleState = true;
            idleTimer = setTimeout(function () { 
                
                // Idle Event
                if(idleState == true && !timerOn){
                    $("#instructions").show();
                    idleState = false; 
                }
                }, idleWait);
        });
        $("body").trigger("mousemove");
    });
}) (jQuery)