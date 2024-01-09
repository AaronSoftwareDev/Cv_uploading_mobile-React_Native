<?php
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $userEmail = $_GET["email"];
    try {
        // Fetch all data from the profile table
        $selectSql = "SELECT * FROM profile WHERE username = ?";
        $stmt = $conn->prepare($selectSql);
        // if (!$stmt) {
        //     die('Prepare failed: ' . $conn->error);
        // }
        
        $stmt->bind_param("s", $userEmail);
        $stmt->execute();
        $result = $stmt->get_result();

        // $result = $conn->query($selectSql);

        if ($result->num_rows > 0) {
            $userData = array();

            while ($row = $result->fetch_assoc()) {
                $userData[] = $row;
            }

            echo json_encode($userData);
        } else {
            echo json_encode(["message" => "No data found in the profile table"]);
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
