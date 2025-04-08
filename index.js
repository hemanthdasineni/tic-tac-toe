var computerchoice=[];
var userchoice=[];
var filled=[];
 var started=false;
$(document).keypress(function(){
    if(!started)
    { console.log("game started");
      computer();
      started=true;
     
    }
});
function computer()
{ console.log("computer choice");
    var ran = Math.floor(Math.random() * 10);
    $(p).text("hello");
    computerchoice.push(ran);
    filled.push(ran);


      
}