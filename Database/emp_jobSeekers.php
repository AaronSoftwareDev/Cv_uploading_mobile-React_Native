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
    try {
        // Fetch user data from the user_details and profile tables using JOIN
        $selectUserDataSql = "
            SELECT ud.*, p.*
            FROM user_details ud
            JOIN profile p ON ud.email = p.username
        ";
        $stmtUserData = $conn->prepare($selectUserDataSql);
        $stmtUserData->execute();
        $resultUserData = $stmtUserData->get_result();

        if ($resultUserData->num_rows > 0) {
            $userData = array();

            while ($row = $resultUserData->fetch_assoc()) {
                $userData[] = $row;
            }

            echo json_encode($userData);
        } else {
            echo json_encode(["message" => "No user data found"]);
        }

        $stmtUserData->close();
    } catch (Exception $e) {
        // Log and return an error message
        $response["error"] = "Internal server error";
        $response["debug_info"] = ["message" => $e->getMessage()];
        echo json_encode($response);
    }
} else {
    // Invalid request method
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
