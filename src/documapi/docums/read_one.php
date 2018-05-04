<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/document.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$document = new Documfiles($db);

$rut = isset($_GET['rut']) ? $_GET['rut'] : die();

$stmt = $document->readOne($rut);

$row = $stmt->fetch(PDO::FETCH_ASSOC);

print_r(json_encode($row));
