<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get posted data
$id = isset($_GET['id']) ? $_GET['id'] : die();
$utype = isset($_GET['utype']) ? $_GET['utype'] : die();

$exct = $user->changeUserType($id, $utype);

print_r(json_encode($exct));

