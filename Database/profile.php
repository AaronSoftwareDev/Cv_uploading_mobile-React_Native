<?php
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST'  && isset($_FILES['image'])) {

    $targetDirectory = "uploads/";

    // Ensure the 'uploads' directory exists and is writable
    if (!file_exists($targetDirectory)) {
        mkdir($targetDirectory, 0777, true);
    }

    // Handle the 'file' part of the FormData
    $file = $_FILES['file'];
    $fileName = $file['name'];
    $fileType = $file['type'];
    $fileSize = $file['size'];
    $fileTmpName = $file['tmp_name'];

    $targetPath = $targetDirectory . basename($fileName);

    if (move_uploaded_file($fileTmpName, $targetPath)) {

        // Handle the 'image' part of the FormData
        $image = $_FILES['image'];
        $imageName = $image['name'];
        $imageType = $image['type'];
        $imageSize = $image['size'];
        $imageTmpName = $image['tmp_name'];

        $targetImagePath = $targetDirectory . basename($imageName);

        if (move_uploaded_file($imageTmpName, $targetImagePath)) {

            // Insert data into the database
            $imageText = isset($_POST['image_text']) ? $_POST['image_text'] : '';

            $email = isset($_POST['email']) ? $_POST['email'] : '';

            $sql = "INSERT INTO profile (file_name, file_type, file_size, image_name, image_type, image_size, image_text, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssisssis", $fileName, $fileType, $fileSize, $imageName, $imageType, $imageSize, $imageText, $email);
            
            if ($stmt->execute()) {
                echo json_encode(["success" => "Files uploaded successfully.", "uploaded_files" => [$fileName, $imageName]]);
            } else {
                echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
            }
        } else {
            echo json_encode(["error" => "Error moving image file."]);
        }
    } else {
        echo json_encode(["error" => "Error moving file."]);
    }
} else {
    echo json_encode(["error" => "No files received."]);
}

$conn->close();
?>
