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

$stmt = $user->readAll();

$user_arr = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $user_data = array(
        "id" => $id,
        "email" => $email,
        "usertype" => $usertype,
        "name" => $name,
        "phone" => $phone,
        "created" => $created,
        "modified" => $modified,
    );
    array_push($user_arr, $user_data);
}

print_r(json_encode($user_arr));
