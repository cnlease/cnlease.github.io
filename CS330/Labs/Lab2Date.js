//lab 2 javascript file

    

function DatePage(){
    const date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var year = date.getFullYear();

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var print = "The date is: " + months[month] + " " + day + ", " + year;
    var e = document.getElementById("timeformat");
    var value = e.value;
    console.log(value);

    if(value == 24){
        print += "<br /> Time: " + hours + ":" + minutes;
    }else{
        if(hours > 12){
            hours -= 12;
        }
        print += "<br /> Time: " + hours +":" + minutes;
    }
    document.getElementById("TimeOutput").innerHTML = print;

}

function DateAlert(){
    const date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var year = date.getFullYear();

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var print = "The date is: " + months[month] + " " + day + ", " + year;
    var e = document.getElementById("timeformat");
    var value = e.value;
    console.log(value);

    if(value == 24){
        print += "     Time: " + hours + ":" + minutes;
    }else{
        if(hours > 12){
            hours -= 12;
        }
        print += "     Time: " + hours +":" + minutes;
}
    window.alert(print);
}