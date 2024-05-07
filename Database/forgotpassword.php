<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
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

    // Set the password to cvword.cvwd
    $password = "cvupload.cvwd";

    try {
        // Send email with the password
        $to = $userEmail;
        $subject = "Forgot Password";
        $message = "Please login with this password: " . $password;
        $headers = "";

        // Send the email
        mail($to, $subject, $message, $headers);
        error_reporting(E_ALL);

        // Update the password in the database where email matches
        $updateSql = "UPDATE users SET password_hash = ? WHERE email = ?";
        $updateStmt = $conn->prepare($updateSql);
        $updateStmt->bind_param("ss", $password, $userEmail);
        $updateStmt->execute();

        if ($updateStmt->affected_rows > 0) {
            // Password updated successfully
            echo json_encode(["message" => "Email sent successfully"]);
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
