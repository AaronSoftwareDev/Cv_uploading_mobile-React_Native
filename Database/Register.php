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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $postData = json_decode(file_get_contents("php://input"), true);

        if (!empty($postData)) {
            $firstName = $postData['firstName'];
            $lastName = $postData['lastName'];
            $address = $postData['address'];
            $phoneNumber = $postData['phoneNumber'];
            $emailAddress = $postData['emailAddress'];
            $agentCode = $postData['agentcode'];
            $password = $postData['password'];
            $registrationDate = date('d-M-Y'); // Current date in the format 19-APRIL-2024

           
            $checkEmailSql = "SELECT * FROM users WHERE email = ?";
            $checkEmailStmt = $conn->prepare($checkEmailSql);
            $checkEmailStmt->bind_param("s", $emailAddress);
            $checkEmailStmt->execute();
            $result = $checkEmailStmt->get_result();

            if ($result->num_rows > 0) {
                // Email already exists, return an error response
                echo json_encode(array("message" => "Email already registered. Please choose a different email."));
                http_response_code(400);
                exit();
            }

            // Hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            // Insert into users table
            $usersSql = "INSERT INTO users (email, password_hash, Role) VALUES (?, ?, ?)";
            $rolesValue = "jobseeker";
            $usersStmt = $conn->prepare($usersSql);
            $usersStmt->bind_param("sss", $emailAddress, $hashedPassword, $rolesValue);
            $usersInserted = $usersStmt->execute();

            if (!$usersInserted) {
                echo json_encode(array("message" => "Error executing users query. MySQL Error: " . $usersStmt->error));
                http_response_code(500);
                exit();
            }

            if ($usersInserted) {
              
                $lastInsertedUserId = $conn->insert_id;

                // Insert into user_details table using the existing email from users table
                $userDetailsSql = "INSERT INTO user_details (first_name, last_name, address, phonenumber, email, agent_code, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $userDetailsStmt = $conn->prepare($userDetailsSql);
                $userDetailsStmt->bind_param("sssssss", $firstName, $lastName, $address, $phoneNumber, $emailAddress, $agentCode, $registrationDate);
                $userDetailsInserted = $userDetailsStmt->execute();

                if ($userDetailsInserted) {
                    // Select the newly inserted record using the email address
                    $selectedRecordSql = "SELECT * FROM user_details WHERE email = ?";
                    $selectedRecordStmt = $conn->prepare($selectedRecordSql);
                    $selectedRecordStmt->bind_param("s", $emailAddress);
                    $selectedRecordStmt->execute();
                    $result = $selectedRecordStmt->get_result();
                    $selectedRecord = $result->fetch_assoc();

                    echo json_encode(array("message" => "Registration Successful.", "selectedRecord" => $selectedRecord));
                } else {
                    throw new Exception("Error inserting data into user_details table.");
                }
            } else {
                throw new Exception("Error inserting data into users table.");
            }

            $checkEmailStmt->close();
            $usersStmt->close();
            $userDetailsStmt->close();
            $selectedRecordStmt->close();
        } else {
            echo json_encode(array("message" => "No data received."));
        }
    } catch (Exception $e) {
        echo json_encode(array("message" => "Error: " . $e->getMessage()));
    }
} else {
    echo json_encode(array("message" => "Invalid request method."));
}
?>
