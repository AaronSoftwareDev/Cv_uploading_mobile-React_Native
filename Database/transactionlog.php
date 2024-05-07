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
            $transactionid = $postData['requestGuid'];

            // Check if the transaction ID already exists
            $checkSql = "SELECT * FROM transaction WHERE transactionid = ?";
            $checkStmt = $conn->prepare($checkSql);
            $checkStmt->bind_param("s", $transactionid);
            $checkStmt->execute();
            $result = $checkStmt->get_result();

            if ($result->num_rows > 0) {
                echo json_encode(array("message" => "Transaction ID already exists."));
            } else {
                // Insert into transaction table if the transaction ID doesn't exist
                $username = $postData['username'];
                $amount = $postData['amount'];
                $phone = $postData['phoneNumber'];
                $externalReference = $postData['externalReference'];
                $timestampCreated = $postData['timestampCreated'];
                $transactionStatus = $postData['requestStatus'];

                $transactionSql = "INSERT INTO transaction (username, amount, phone, transactionid, transactionstatus) VALUES (?, ?, ?, ?, ?)";
                $transactionStmt = $conn->prepare($transactionSql);
                $transactionStmt->bind_param("sdsss", $username, $amount, $phone, $transactionid, $transactionStatus);
                $transactionInserted = $transactionStmt->execute();

                if ($transactionInserted) {
                    echo json_encode(array("message" => "Transaction inserted successfully."));
                } else {
                    echo json_encode(array("message" => "Error inserting transaction."));
                }

                $transactionStmt->close();
            }
            $checkStmt->close();
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
