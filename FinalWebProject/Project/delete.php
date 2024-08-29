<?php
  require('functions.php');

  $id = $_GET['id'];

$sql = "DELETE FROM RubberDuckPictures WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "<p>Query executed successfully</p>";
} else {
    echo "<p>Error executing query: " . $conn->error . "</p>";
}

header('Location: login.html');


?>