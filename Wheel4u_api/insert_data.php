<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Wheel4u_db"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the raw POST data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Check if table name and data are provided
if (isset($_GET['table']) && !empty($data)) {
    $table_name = $_GET['table'];

    // Ensure 'role' field is added to data if not provided
    if (!isset($data['role'])) {
        $data['role'] = 'buyer'; // Default role
    }

    // Prepare column names and values
    $columns = implode(", ", array_map(function($item) {
        return "`$item`";
    }, array_keys($data)));
    $values = implode(", ", array_map(function($item) use ($conn) {
        return "'" . $conn->real_escape_string($item) . "'";
    }, array_values($data)));

    // Insert query
    $sql = "INSERT INTO $table_name ($columns) VALUES ($values)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Record inserted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error inserting record: ' . $conn->error]);
    }
} else {
    echo json_encode(['error' => 'Table parameter is required or data is missing']);
}

$conn->close();
?>
