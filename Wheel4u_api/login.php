<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Wheel4u_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the raw POST data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!empty($data['email']) && !empty($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    // Query to check if user exists with given email
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, verify password
        $user = $result->fetch_assoc();

        // Directly compare the plain text password
        if ($password === $user['password']) {
            // Password verified, login successful
            echo json_encode(['success' => true, 'message' => 'Login successful', 'role' => $user['role']]);
        } else {
            // Password incorrect, login failed
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        // No user found with the given email
        echo json_encode(['success' => false, 'message' => 'Invalid email']);
    }
    $stmt->close();
} else {
    // Invalid request, missing email or password
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
}

$conn->close();
?>
