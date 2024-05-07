<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Validate and sanitize inputs
    $userEmail = $_GET["email"];
    $password = $_GET["password"];

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    echo "Hashed Password: " . $hashedPassword;

    try {
        // Update the password in the database where email matches
        $updateSql = "UPDATE users SET password_hash = ? WHERE email = ?";
        $updateStmt = $conn->prepare($updateSql);
        $updateStmt->bind_param("ss", $hashedPassword, $userEmail);
        $updateStmt->execute();

        if ($updateStmt->affected_rows > 0) {
            // Password updated successfully
            echo json_encode(["message" => "Password updated successfully"]);
        } else {
            // No rows affected, possibly the email doesn't exist
            http_response_code(404);
            echo json_encode(["error" => "User not found"]);
        }
    } catch (Exception $e) {
        // Log and return an error message
        http_response_code(500);
        echo json_encode(["error" => "Internal server error", "debug_info" => ["message" => $e->getMessage()]]);
    }
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}

$conn->close();
?>
