<?php 
require('functions.php');

    // Check if the form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Retrieve the submitted username and password
        $username = $_POST["username"];
        $password = $_POST["password"];

        // Your authentication logic goes here
        // For simplicity, let's just check if the username and password are not empty
        if (!empty($username) && !empty($password) && $username == "usr" && $password == "13gh5") {
            
            echo "Welcome!";
            $items = getImages();
    
            echo "<table>";

            if (!empty($items)) {

                foreach ($items as $row) {
                    echo "<tr>";
                    echo "<td> <img src=\"" . $row['images'] . "\" style=\"width:100px; height:100px;\"></td>";
                    echo "<td>" . $row['image_dis'] . ", </td>";
                    echo "<td>" . $row['email'] . ", </td>";
                    echo "<td>" . $row['subdate'] . "</td>";
                    echo "<td><a href=\"edit.php?id=" . $row['id'] . "\"> edit </a></td>"; 
                    echo "<td><a href=\"delete.php?id=" . $row['id'] . "\" onclick=\"return  confirm('do you want to delete Y/N')\"> delete </a></td>";
                    echo "</tr>";
                }
            }
            echo "</table>";
            
            echo "\n";
            echo "<a href=\"Pictures.php\"> RETURN </a>";


        } else {
            echo "<p>Invalid username or password. Please try again.<a href=\"login.html\">Back</a></p>";
        }
    }

    ?>