<?php
header('Content-Type: application/json');

// Simple routing
$request_uri = explode('/', $_SERVER['REQUEST_URI']);
$api_endpoint = $request_uri[count($request_uri) - 1];

switch ($api_endpoint) {
    case 'test':
        echo json_encode(['message' => 'PHP Admin Backend is working!']);
        break;
    default:
        echo json_encode(['message' => 'Endpoint not found.']);
        http_response_code(404);
        break;
    case 'db_test':
        include_once 'db.php';
        if ($conn->connect_error) {
            echo json_encode(['message' => 'Database connection failed', 'error' => $conn->connect_error]);
            http_response_code(500);
        } else {
            echo json_encode(['message' => 'Database connection successful!']);
        }
        $conn->close();
        break;
}
?>