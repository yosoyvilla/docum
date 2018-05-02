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

// initialize object
$user = new User($db);

$stmt = $cancha->allRents();

$num = $stmt->rowCount();

if($num>0){

    // products array
    $field_arr=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $stmtTwo = $cancha->fields($row['idCancha']);

        $user->readOneByID($row['idUser']);

        $rowTwo = $stmtTwo->fetch(PDO::FETCH_OBJ);

        $field_item=array(
            "idRent" => $row['id'],
            "idField" => $row['idCancha'],
            "rentedTime" => $row['rentedTime'],
            "fieldName" => $rowTwo->name,
            "rentedBy" => $user->name
        );

        array_push($field_arr, $field_item);
    }

    echo json_encode($field_arr);
}

else{
    echo json_encode(
        array("message" => "No se encontraron alquileres para el usuario")
    );
}
