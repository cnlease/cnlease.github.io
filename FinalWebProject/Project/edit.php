<!DOCTYPE html>
<html>

<head>
    <title>Update Form</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        .label,
        label {
            float: left;
            display: block;
            width: 200px;
        }
        
        form>div {
            margin-bottom: 10px; 
        }
        
        div.errormsg {
            color: red;
        }
    </style>
</head>
<script>
    function empty(fieldName) {
        if (!document.getElementById(fieldName).value) {
            document.getElementById("errormsg").innerHTML = "This field needs to be completed";
            document.getElementById(fieldName).focus();
        }
    }
</script>

<body>
    <article>
        <h1>update form</h1>
        <p>Orginal:</p>
        <?php
            require('functions.php');

            $sale = getImagesID($_GET['id']);


            if (!empty($sale)) {
                foreach ($sale as $row){
                    echo "<td> <img src=\"" . $row['images'] . "\" style=\"width:100px; height:100px;\"></td>";
                    echo "<tr><td> Image Discription : " . $row['image_dis'] . "<td></tr>";
                    echo "<tr><td> email : " . $row['email'] . "<td></tr>";
                }
            }
        ?>
        <form action="update.php?id=<?php echo $_GET['id']; ?>" method="POST" enctype="multipart/form-data">
            
            <div>
                <label for="image_dis">Discripition of the image:</div>
                <input type="text" id="image_dis" name="image_dis" required onblur="empty('image_dis')">
            </div>
            <div>
                <label for="email">Email</div>
                <input type="email" id="email" name="email" required onblur="empty('email')">
            </div>
            <div>
                <label for="images">Image:</div>
                <input type="file" id="photos" name="images" accept="image/*" required onblur="empty('images')">
            </div>
            
            <input type="submit" name="submitForm" value="Submit Registration">
        </form>

        <a href="login.html">back</a>
    </article>
</body>

</html>