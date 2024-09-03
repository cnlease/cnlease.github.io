//Function to create an array with random numbers and do math
//Need to calculate the mean of the array, and which elements are larger than the mean.
function ArrayWork(){
    var array =[]; //Array to hold the 5 random numbers
    var mean = 0; //variable to hold the mean
    for(var i =0; i<5; i++){ //fills the array with random & starts to calculate the mean
        array.push(Math.floor(Math.random() * 100));
        mean += array[i];
    }
    var output = "The random array: " + array; //variable to output a string
    
    mean /= array.length; //divides by length

    output += "<br />The mean: " + mean + "<br />The larger numbers: "; //adds mean to the output
    
    
    for(var i =0; i<5; i++){ //adds the larger than the mean numbers
        if(array[i] > mean){
            output += array[i] + " ";
        }
    }
    document.getElementById("ArrayOut").innerHTML = output; //changes the website to output


}