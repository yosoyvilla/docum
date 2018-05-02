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

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$cancha = new Cancha($db);

$idCancha = isset($_GET['idCancha']) ? $_GET['idCancha'] : die();

$idUser = isset($_GET['idUser']) ? $_GET['idUser'] : die();

$rentedTime = isset($_GET['rentedTime']) ? $_GET['rentedTime'] : die();

$horario = isset($_GET['horario']) ? $_GET['horario'] : die();

$isAvailable = $cancha->getIfFieldRented($idCancha, $rentedTime);

$field_arr = array();
$field_arr["records"] = array();

while ($rowA = $isAvailable->fetch(PDO::FETCH_ASSOC)) {
    extract($rowA);
    if ($qtn === "0") {
        $rtm = $cancha->rentField($idCancha, $idUser, $rentedTime, $horario);

        print_r(json_encode($rtm));
    } else {
      print_r(json_encode(false));
    }
}
