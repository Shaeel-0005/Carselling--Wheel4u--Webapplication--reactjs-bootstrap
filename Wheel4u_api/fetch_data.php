<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Wheel4u_db"; // Your database name

// Check if the 'table' parameter is provided in the URL
if (isset($_GET['table'])) {
    $table_name = $_GET['table'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Query to fetch data from the specified table
    $sql = "SELECT * FROM $table_name";
    $result = $conn->query($sql);

    


   if($table_name=='users'){
    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    } else {
        echo json_encode([]);
    }
    $conn->close();

    echo json_encode($data);

   }else if($table_name=='products'){
    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $row['image_path'] = "http://localhost/Wheel4u_api/uploads/" . $row['image_path'];
            $data[] = $row;
        }
    } else {
        echo json_encode([]);
    }
    $conn->close();

    echo json_encode($data);
   }


} else {
    echo json_encode(['error' => 'Table parameter is required']);
}
?>
