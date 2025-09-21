<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'] ?? '';
    $organization = $data['organization'] ?? '';
    $email = $data['email'] ?? '';
    $contactNumber = $data['contactNumber'] ?? '';
    $message = $data['message'] ?? '';

    if (empty($name) || empty($organization) || empty($email) || empty($contactNumber) || empty($message)) {
        http_response_code(400);
        echo json_encode(['message' => 'All fields are required.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO contact_submissions (name, organization, email, contact_number, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $organization, $email, $contactNumber, $message);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['message' => 'Submission successful!']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Error processing submission.']);
    }

    $stmt->close();
    $conn->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT id, name, organization, email, contact_number, message, submitted_at FROM contact_submissions ORDER BY submitted_at DESC");

    $submissions = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $submissions[] = $row;
        }
    }

    echo json_encode($submissions);
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
}
?>