<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$user = new User($db);

$rut = isset($_GET['rut']) ? $_GET['rut'] : die();
$pwd = isset($_GET['password']) ? $_GET['password'] : die();

$stmt = $user->readOne($rut, $pwd);

$user_data;

$row = $stmt->fetch(PDO::FETCH_ASSOC);

print_r(json_encode($row));