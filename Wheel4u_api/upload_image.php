<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Add database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Wheel4u_db";

// Initialize connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// File upload handling
$target_dir = "uploads/";

$target_file = $target_dir . basename($_FILES["file"]["name"]);

$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($_FILES["file"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
$allowed_formats = array("jpg", "jpeg", "png", "gif");
if (!in_array($imageFileType, $allowed_formats)) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file and insert into database
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        // File uploaded successfully, prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO products (name, description, price, year, brand, image_path) VALUES (?, ?, ?, ?, ?, ?)");
        
        $target_file=basename($_FILES["file"]["name"]);
        // Bind parameters and execute statement
        $stmt->bind_param("ssdiss", $_POST['name'], $_POST['description'], $_POST['price'], $_POST['year'], $_POST['brand'], $target_file);

        if ($stmt->execute()) {
            echo "The file " . htmlspecialchars(basename($_FILES["file"]["name"])) . " has been uploaded and product information saved.";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

$conn->close();
?>
