<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

include 'db_connection.php';
error_log("Received request method: " . $_SERVER['REQUEST_METHOD']);

// Check if data is sent using POST method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Access the posted data
  $postData = json_decode(file_get_contents("php://input"), true); // Use json_decode for raw JSON data

  // Do something with the received data
  if (!empty($postData)) {
    foreach ($postData as $order) {
      // Access object's properties
      $order_id = $order['order_id'];

      // Update the is_processed column to 'Yes' for each record with the given order_id
      $sql = "UPDATE neworders SET is_processed = 'Confirmed' WHERE order_id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("i", $order_id);

      // Execute the statement
      if ($stmt->execute()) {
        echo json_encode(array("message" => "Order processed successfully.", "data" => $postData));
      } else {
        echo json_encode(array("message" => "Error processing order."));
      }

      // Close the statement
      $stmt->close();
    }
  } else {
    echo json_encode(array("message" => "No data received."));
  }
} else {
  echo json_encode(array("message" => "Invalid request method."));
}
?>
