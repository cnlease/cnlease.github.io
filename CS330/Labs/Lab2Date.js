//lab 2 javascript file
function DatePage(){
    const date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var year = date.getYear();

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var print = "The date is: " + months[month] + " " + date + ", " + year;
    
    var e = document.getElementById("timeformat");
    var value = e.value;
    console.log(value);

    if(value == 24){
        print += "<br /> Time: " + hours + ":" + minutes;
    }else{
        print += "<br /> Ha failed";
    }

    document.getElementById("TimeOutput").innerHTML = print;

}

function DateAlert(){

}