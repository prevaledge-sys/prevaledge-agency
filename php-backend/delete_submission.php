<?php
header("Access-Control-Allow-Origin: *");
header("Access-control-allow-methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'] ?? '';

    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['message' => 'Submission ID is required.']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM contact_submissions WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            http_response_code(200);
            echo json_encode(['message' => 'Submission deleted successfully.']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Submission not found.']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Error deleting submission.']);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
}
?>