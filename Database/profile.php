<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

header("Expires: 0");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {

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
            $uploadDate = date('Y-m-d');

            // Insert or update data in the database based on email existence
            $imageText = isset($_POST['image_text']) ? $_POST['image_text'] : '';
            $email = isset($_POST['email']) ? $_POST['email'] : '';
            $category = isset($_POST['selectedCategory']) ? $_POST['selectedCategory'] : '';

            // Check if email exists in the database
            $checkSql = "SELECT * FROM profile WHERE username = ?";
            $checkStmt = $conn->prepare($checkSql);
            $checkStmt->bind_param("s", $email);
            $checkStmt->execute();
            $result = $checkStmt->get_result();

            if ($result->num_rows > 0) {
                // Email exists, update the record
                $updateSql = "UPDATE profile SET file_name=?, file_type=?, file_size=?, image_name=?, image_type=?, image_size=?, image_text=?, category=?, upload_date=? WHERE username=?";
                $updateStmt = $conn->prepare($updateSql);
                $updateStmt->bind_param("ssisssisss", $fileName, $fileType, $fileSize, $imageName, $imageType, $imageSize, $imageText, $category, $uploadDate, $email);
                $updateStmt->execute();
            } else {
                // Email does not exist, insert a new record
                $insertSql = "INSERT INTO profile (file_name, file_type, file_size, image_name, image_type, image_size, image_text, username, category, upload_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $insertStmt = $conn->prepare($insertSql);
                $insertStmt->bind_param("ssisssisss", $fileName, $fileType, $fileSize, $imageName, $imageType, $imageSize, $imageText, $email, $category, $uploadDate);
                $insertStmt->execute();
            }

            echo json_encode(["success" => "Files uploaded successfully.", "uploaded_files" => [$fileName, $imageName]]);
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
