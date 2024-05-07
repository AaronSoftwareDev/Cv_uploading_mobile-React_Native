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
    $userEmail = $_GET["email"];
    try {
        // Fetch data from the profile and user_details tables based on the JOIN condition
        $selectSql = "SELECT *
        FROM profile
        INNER JOIN user_details ON profile.username = user_details.email
        WHERE profile.username = ?
        ";
        $stmt = $conn->prepare($selectSql);
        
        $stmt->bind_param("s", $userEmail);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $userData = array();

            while ($row = $result->fetch_assoc()) {
                $userData[] = $row;
            }

            echo json_encode($userData);
        } else {
            echo json_encode(["message" => "No data found in the profile and user_details tables"]);
        }
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
