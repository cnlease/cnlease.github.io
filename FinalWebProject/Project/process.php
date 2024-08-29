
<?php
    require('db.php');
      
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["images"]["name"]);


    // Load the original image
    $originalImage = imagecreatefromstring(file_get_contents($_FILES["images"]["tmp_name"]));

    // Create a new image with the desired dimensions
    $resizedImage = imagescale($originalImage, 1024, 578);

    // Save the resized image
    imagejpeg($resizedImage, $targetFile);


    //Store file path into the database
    
    $sql = "INSERT INTO RubberDuckPictures (images, image_dis, email) VALUES ('$targetFile', '".$_POST['image_dis']."', '".$_POST['email']."')";

    if($conn->query($sql)==TRUE) {
      header('Location: modal.html');
    }else{
      echo "Error " . $sql . "<br>" . $conn->error;
    }

    
    
?>
