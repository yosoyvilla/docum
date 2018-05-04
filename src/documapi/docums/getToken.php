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

$user->rut = isset($_GET['rut']) ? $_GET['rut'] : die();

$user->getToken();

// create array
$user_arr = array(
    "token" => $user->token
);

print_r(json_encode($user_arr));
