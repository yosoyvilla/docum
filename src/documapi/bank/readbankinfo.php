<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/maindata.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$maindata = new MainData($db);

$maindata->readBankInfo();

// create array
$bank_arr = array(
    "idbank" => $maindata->idbank,
    "accountnumber" => $maindata->accountnumber,
    "ownername" => $maindata->ownername,
    "bankdocument" => $maindata->bankdocument,
    "bankname" => $maindata->bankname
);

print_r(json_encode($bank_arr));
