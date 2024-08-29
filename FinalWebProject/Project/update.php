<?php
  require('functions.php');

  $image_dis = $_POST['image_dis'];
  $email = $_POST['email'];
  $id = $_GET['id'];

  
  $targetDir = "uploads/";
  $targetFile = $targetDir . basename($_FILES["images"]["name"]);


  // Load the original image
  $originalImage = imagecreatefromstring(file_get_contents($_FILES["images"]["tmp_name"]));

  // Create a new image with the desired dimensions
  $resizedImage = imagescale($originalImage, 1024, 578);

  // Save the resized image
  imagejpeg($resizedImage, $targetFile);

  $sql = "UPDATE RubberDuckPictures 
          SET image_dis = '$image_dis', email = '$email', images = '$targetFile'
          WHERE id = '$id'";

if ($conn->query($sql) === TRUE) {
    header('Location: login.html');
} else {
    echo "<p>Error executing query: " . $conn->error . "</p>";
}


?>