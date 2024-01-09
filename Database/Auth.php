<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db_connection.php';
// var_dump($_POST);

$data = json_decode(file_get_contents("php://input"), true);


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $data["email"];
    $receivedPassword = trim($data["password"]);

    $response = array(); // Initialize an associative array for the response

    try {
        // Query to retrieve user information
        $sql = "SELECT email, password_hash FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($dbEmail, $dbPassword);

        if ($stmt->fetch()) {
            // Check if received password matches stored password
            if ($receivedPassword === $dbPassword) {
                // Authentication successful
                $response["message"] = "Login successful";
                $response["dbEmail"] = $dbEmail;
            } else {
                // Authentication failed
                $response["error"] = "Invalid password";
            }
        } else {
            // Authentication failed
            $response["error"] = "Invalid email";
            $response["debug_info"] = ["email" => $email];
        }

        $stmt->close();
    } catch (Exception $e) {
        // Log and return an error message
        $response["error"] = "Internal server error";
        $response["debug_info"] = ["message" => $e->getMessage()];
        echo json_encode($response);
        exit; // Ensure script stops execution after sending the error response
    }

    // Encode the entire response array as a JSON string
    echo json_encode($response);

} else {
    // Invalid request method
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
