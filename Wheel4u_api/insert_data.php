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

// Check if table name and data are provided
if (!isset($_GET['table']) || $_GET['table'] !== 'users') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Only user registration is supported by this endpoint']);
    $conn->close();
    exit;
}

if (empty($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Request body is missing']);
    $conn->close();
    exit;
}

$requiredFields = ['name', 'phone', 'cnic', 'address', 'email', 'password'];

foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is required']);
        $conn->close();
        exit;
    }
}

$name = trim($data['name']);
$phone = trim($data['phone']);
$cnic = trim($data['cnic']);
$address = trim($data['address']);
$email = trim($data['email']);
$password = $data['password'];
$role = isset($data['role']) && in_array($data['role'], ['buyer', 'seller'], true)
    ? $data['role']
    : 'buyer';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    $conn->close();
    exit;
}

$checkSql = "SELECT email FROM users WHERE email = ?";
$checkStmt = $conn->prepare($checkSql);

if (!$checkStmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to prepare duplicate email check: ' . $conn->error]);
    $conn->close();
    exit;
}

$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$existingUser = $checkStmt->get_result();

if ($existingUser->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['success' => false, 'message' => 'A user with this email already exists']);
    $checkStmt->close();
    $conn->close();
    exit;
}

$checkStmt->close();

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$insertSql = "INSERT INTO users (name, phone, cnic, address, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
$insertStmt = $conn->prepare($insertSql);

if (!$insertStmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to prepare registration query: ' . $conn->error]);
    $conn->close();
    exit;
}

$insertStmt->bind_param("sssssss", $name, $phone, $cnic, $address, $email, $passwordHash, $role);

if ($insertStmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'User registered successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error inserting user: ' . $insertStmt->error]);
}

$insertStmt->close();
$conn->close();
?>
