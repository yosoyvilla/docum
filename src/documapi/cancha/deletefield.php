<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/cancha.php';
include_once '../objects/user.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$cancha = new Cancha($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get posted data
$id = isset($_GET['id']) ? $_GET['id'] : die();

$exct = $cancha->deleteIDField($id);

print_r(json_encode($exct));

