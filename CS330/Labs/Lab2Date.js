//lab 2 javascript file
function DatePage(){
    var month = getMonth();
    var date = getDate();
    var hours = getHours();
    var minutes = getMinutes();
    var year = getYear();

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var print = "The date is: " + months[month] + " " + date + ", " + year;
    
    var e = document.getElementById("timeformat");
    var value = e.value;

    if(value == "24"){
        print += "<br /> Time: " + hours + ":" + minutes;
    }else{
        print += "<br /> Ha failed";
    }

    document.getElementById("TimeOutput").innerHTML = print;

}

function DateAlert(){

}