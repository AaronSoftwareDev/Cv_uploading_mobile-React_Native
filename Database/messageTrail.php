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
        // Fetch data from the contact_agent table based on the user_email
        $selectSql = "SELECT * FROM contact_agent WHERE company_email = ?";
        $stmt = $conn->prepare($selectSql);

        $stmt->bind_param("s", $userEmail);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $contactData = array();

            while ($row = $result->fetch_assoc()) {
                $contactData[] = $row;
            }

            echo json_encode($contactData);
        } else {
            echo json_encode(["message" => "No data found in the contact_agent table"]);
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
