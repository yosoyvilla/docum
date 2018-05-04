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

$email = isset($_GET['email']) ? $_GET['email'] : die();
$tkn = isset($_GET['tkn']) ? $_GET['tkn'] : die();

$user->readLogged($email, $tkn);

// create array
$user_arr = array(
    "id" => $user->id,
    "email" => $user->email,
    "usertype" => $user->usertype,
    "name" => $user->name,
    "phone" => $user->phone,
    "created" => $user->created,
    "modified" => $user->modified,
    "exists" => $user->exists,
);

print_r(json_encode($user_arr));
