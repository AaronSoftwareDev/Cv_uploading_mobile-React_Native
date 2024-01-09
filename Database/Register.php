<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

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
            $password = $postData['password'];

            // Insert into users table
            $usersSql = "INSERT INTO users (email, password_hash) VALUES (?, ?)";
            $usersStmt = $conn->prepare($usersSql);
            $usersStmt->bind_param("ss", $emailAddress, $password);
            $usersInserted = $usersStmt->execute();
            if (!$usersInserted) {
                echo json_encode(array("message" => "Error executing users query. MySQL Error: " . $usersStmt->error));
                http_response_code(500);
            }
            
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
     
            if ($usersInserted) {
                // Get the last inserted ID from the users table
                $lastInsertedUserId = $conn->insert_id;

                // Insert into user_details table using the existing email from users table
                $userDetailsSql = "INSERT INTO user_details ( first_name, last_name, address, phonenumber, email) VALUES ( ?, ?, ?, ?, ?)";
                $userDetailsStmt = $conn->prepare($userDetailsSql);
                $userDetailsStmt->bind_param("sssss", $firstName, $lastName, $address, $phoneNumber, $emailAddress);
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
