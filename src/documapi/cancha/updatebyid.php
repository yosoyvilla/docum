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
$name = isset($_GET['name']) ? $_GET['name'] : die();
$description = isset($_GET['description']) ? $_GET['description'] : die();
$capacity = isset($_GET['capacity']) ? $_GET['capacity'] : die();
$value = isset($_GET['value']) ? $_GET['value'] : die();

$exct = $cancha->update($id, $name, $description, $capacity, $value);

print_r(json_encode($exct));

