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
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Get the raw POST data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload']);
    $conn->close();
    exit;
}

if (!empty($data['email']) && !empty($data['password'])) {
    $email = trim($data['email']);
    $password = $data['password'];

    // Query to check if user exists with given email
    $sql = "SELECT name, email, password, role FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to prepare login query: ' . $conn->error]);
        $conn->close();
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, verify password
        $user = $result->fetch_assoc();

        $passwordMatches = password_verify($password, $user['password']) || hash_equals($user['password'], $password);

        if ($passwordMatches) {
            // Password verified, login successful
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'username' => $user['name'],
                'role' => $user['role']
            ]);
        } else {
            // Password incorrect, login failed
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        // No user found with the given email
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid email']);
    }
    $stmt->close();
} else {
    // Invalid request, missing email or password
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
}

$conn->close();
?>
