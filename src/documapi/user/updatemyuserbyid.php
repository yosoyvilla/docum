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
$email = isset($_GET['email']) ? $_GET['email'] : die();
$name = isset($_GET['uname']) ? $_GET['uname'] : die();
$phone = isset($_GET['uphone']) ? $_GET['uphone'] : die();
$id = isset($_GET['id']) ? $_GET['id'] : die();
$pwd = isset($_GET['pwd']) ? $_GET['pwd'] : die();

$exct = $user->updateMyUserById($id, $pwd, $email, $name, $phone);

print_r(json_encode($exct));

