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
            $requestGuid = $postData['requestGuid'];
            $transactionStatus = $postData['requestStatus'];

            // Update transaction status where username matches
            $updateSql = "UPDATE transaction SET transactionstatus = ? WHERE transactionid = ?";
            $updateStmt = $conn->prepare($updateSql);
            $updateStmt->bind_param("ss", $transactionStatus, $requestGuid);
            $updateResult = $updateStmt->execute();

            if ($updateResult) {
                echo json_encode(array("message" => "Transaction status updated successfully."));
            } else {
                echo json_encode(array("message" => "Error updating transaction status."));
            }

            $updateStmt->close();
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
