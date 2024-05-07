<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

include 'db_connection.php';

// Get the data from the request
$data = json_decode(file_get_contents("php://input"));

// Extract subject and message from the data
$subject = $data->subject;
$message = $data->message;
$useremail = $data->user_data;
$status = "open";

// Prepare and bind the statement
$stmt = $conn->prepare("INSERT INTO contact_agent (subject, message,status, company_email) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $subject, $message,$status,  $useremail);

// Execute the statement
if ($stmt->execute()) {
    // Send a success response
    echo json_encode(array("status" => "success", "message" => "Message inserted successfully"));
} else {
    // Send an error response
    echo json_encode(array("status" => "error", "message" => "Error inserting message: " . $stmt->error));
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

?>
