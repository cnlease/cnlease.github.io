<!--pictures page-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pictures</title>
    <link rel="stylesheet" href="css/foundation.css">
    <link rel="stylesheet" href="css/app.css">
    <link rel="icon" href="Images/rubber-duck.png">
    <link rel="stylesheet" href="css/NavStyles.css">
    <link rel="stylesheet" href="css/pictureStyles.css">
</head>
<body>
    <!-- Navigation bar -->
    <div class="top-bar">
        <div class="top-bar-left">
          <ul class="menu">
            <li class="menu-text"><h6>Rubber Ducking</h6></li>
            <li><a href="Index.html">Home</a></li>
            <li><a href="Shop.html">Shop</a></li>
            <li><a href="Calendar.html">Calendar</a></li>
            <li><a href="Information.html" >Duck uses</a></li>
            <li><a href="Pictures.php" class="act">Pictures</a></li>
          </ul>
        </div>
        <div class="top-bar-right">
            <ul class="menu">
                <li><img src="Images/rubber-duck.png"></li>
            </ul>
        </div>
      </div>


      <div class="pictures">
        <div class="row">
            <div class="column">
                <img src="Images/ArmyOfDucks.jpg" alt="Army of ducks" style="width:100%">
            </div>
            <div class="column">
                <img src="Images/BoatDuckCity.jpg" alt="Duck Boat in City Harbor" style="width:100%">
            </div>
            <div class="column">
                <img src="Images/DucksandBubbles.jpg" alt="Ducks with bubbles" style="width:100%">
            </div>
            <div class="column">
                <img src="Images/ducksinriver.jpg" alt="Ducks in gutter" style="width:100%">
            </div>


            <?php
                require('functions.php');
                $items = getImages();
            
                if (!empty($items)) {
            
                    foreach ($items as $row) {
                        echo "<div class=\"column\"> <img src=\"" . $row['images'] . "\" style=\"width:100%;\"></div>";
                    }
                }
            ?>
        </div>
      </div>

      <a class="link" href="form.html">Add picture</a> <a class="link" href="login.html">Admin Controls</a>

    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.js"></script>
    <script src="js/app.js"></script>
</body>
</html>