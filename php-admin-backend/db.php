<?php

$servername = "145.79.211.215";
$username = "u967181989";
$password = "Kori@161098";
$dbname = "u967181989_Prevaledge";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>