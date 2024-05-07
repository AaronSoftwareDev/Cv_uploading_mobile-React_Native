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
        echo "<pre>";
print_r($postData);
echo "</pre>";

        if (!empty($postData)) {
            $jobCategory = $postData['jobCategory'];
            $jobTitle = $postData['jobTitle'];
            $jobDescription = $postData['jobDescription'];
            $qualificationLevel = $postData['qualificationsLevel'];
            $experiencedYears = intval($postData['yearsOfExperience']);
            $submitedDate = date('Y-m-d');
            $expiryDate = date('Y-m-d', strtotime($postData['expiryDate']));
            $location = $postData['jobLocation'];
            $companyEmail = $postData['submissionEmail'];
            $salary = floatval($postData['salaryExpectations']);
            $useremail = $postData['user_data'];

            // Insert into jobs table
            $jobsSql = "INSERT INTO jobs (job_category, job_title, job_description, qualification_level, experienced_years, submited_date, expiry_date, location, company_email, salary, submission_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $jobsStmt = $conn->prepare($jobsSql);
            $jobsStmt->bind_param("ssssissssds", $jobCategory, $jobTitle, $jobDescription, $qualificationLevel, $experiencedYears, $submitedDate, $expiryDate, $location, $useremail, $salary, $companyEmail);

            $jobsInserted = $jobsStmt->execute();

            if (!$jobsInserted) {
                echo json_encode(array("message" => "Error executing jobs query. MySQL Error: " . $jobsStmt->error));
                http_response_code(500);
                exit();
            }

            echo json_encode(array("message" => "Job data inserted successfully."));
            exit();

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
