<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");


include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $data["email"];
    $receivedPassword = trim($data["password"]);

    $response = array(); // Initialize an associative array for the response

    try {
        // Query to retrieve user information
        $sql = "SELECT email, password_hash, role FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($dbEmail, $dbPassword, $userRole);

        if ($stmt->fetch()) {
            // Check if received password matches stored password using password_verify()
            if (
                password_verify($receivedPassword, $dbPassword) &&
                ($dbPassword !== 'cvupload_agent' && $dbPassword !== 'cvupload_employer' && $dbPassword !== 'cvupload.cvwd')
            ) {
                // Authentication successful
                $response["message"] = "Login successful";
                $response["dbEmail"] = $dbEmail;

                // Check the user's role
                if ($userRole === "agent") {
                    $response["redirect"] = "cv_agent"; // Redirect to cv_agent if the user is an agent
                } else if ($userRole === "jobseeker") {
                    $response["redirect"] = "cv"; // Redirect to cv if the user is a jobseeker
                } else if ($userRole === "employer") {
                    $response["redirect"] = "employer"; // Redirect to cv if the user is a jobseeker
                } else {
                    // Unknown role, handle accordingly (you can modify this part based on your requirements)
                    $response["error"] = "Unknown role";
                }
            } else if ($receivedPassword === 'cvupload_agent' || $receivedPassword === 'cvupload_employer' || $recievedPassword === 'cvupload.cvwd') {
                $response["redirect"] = "change_password";
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
        exit; // Ensure the script stops execution after sending the error response
    }

    // Encode the entire response array as a JSON string
    echo json_encode($response);
} else {
    // Invalid request method
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
