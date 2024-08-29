<?php
    define("SERVER", "localhost");
    define("USER", "root");
    define("DBPW", "");
    define("DBNAME", "newdatabase");

    //create a connenction to a server
    $conn = new mysqli(SERVER, USER, DBPW, DBNAME);
    
    //check connection
    if($conn->connect_error){
        die("connection failed: " . $conn->connect_error);
    }

    $sql = "CREATE TABLE IF NOT EXISTS RubberDuckPictures(
        id BIGINT PRIMARY KEY AUTO_INCREMENT, 
        image_dis VARCHAR(50) NOT NULL,  
        images longblob NOT NULL,
        email VARCHAR(50) NOT NULL,
        subdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)";


    if($conn->query($sql) === TRUE){
        //echo "<p>Query executed successfully</p>";
    }else {
        echo "<p>Error executing query: " . $conn->error . "</p>";
    }

    if($conn->query($sql) === TRUE){
        //echo "<p>Query executed successfully</p>";
    }else {
        echo "<p>Error executing query: " . $conn->error . "</p>";
    }


    // //loop through an array and echo it
    // $ducks = array("Eagle Duck", "Purple Duck", "Pink Cupcake Duck", "Cheetah Duck");
    // echo "Duck Options: ";
    // for($i = 0; $i < sizeof($ducks); $i += 1){
    //     echo "$ducks[$i], ";
    // }

    
?>