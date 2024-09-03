//Function to create an array with random numbers and do math
function ArrayWork(){
    var array =[];
    for(var i =0; i<5; i++){
        array.push(Math.floor(Math.random() * 100));
    }
    document.getElementById("ArrayOut").innerHTML = array;
}