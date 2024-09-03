//Function to create an array with random numbers and do math
//Need to calculate the mean of the array, and which elements are larger than the mean.
function ArrayWork(){
    var array =[];
    var mean = 0;
    for(var i =0; i<5; i++){
        array.push(Math.floor(Math.random() * 100));
        mean += array[i];
    }
    document.getElementById("ArrayOut").innerHTML = "The random array: " + array;
    mean /= array.length;
    document.getElementById("ArrayOut").innerHTML = "The Mean: " + mean;
    var biggerthan =[];
    for(var i =0; i<5; i++){
        if(array[i] > mean){
            biggerthan.push(array[i]);
        }
    }
    document.getElementById("ArrayOut").innerHTML = "The elements that are larger: " + biggerthan;

}