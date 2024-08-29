<?php
require('db.php');

function getImages(){

// create counter
$x = 0;
$regs = [];

// pull record
$sql = "SELECT id, images, image_dis, email, subdate FROM RubberDuckPictures";

if (!$result = $GLOBALS['conn']->query($sql)){
	echo "<p>Error executing query: " . $GLOBALS['conn']->error . "</p>";
}else{
    while ($row = $result->fetch_assoc()){
	    $regs[$x] = $row; 
	    $x++; 
    }
    return $regs;
}

}

function getImagesID($id){
    $sql = "SELECT id, images, image_dis, email, subdate FROM RubberDuckPictures WHERE id=$id";
    if (!$result = $GLOBALS['conn']->query($sql)){
        echo "<p>Error executing query: " . $GLOBALS['conn']->error . "</p>";
    }else{
        return $result;
    }
}

?>