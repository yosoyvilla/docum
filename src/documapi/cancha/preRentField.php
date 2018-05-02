<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include the PHPMailer class
include_once '../PHPMailer/class.phpmailer.php';
include_once '../PHPMailer/class.smtp.php';

$data = json_decode(file_get_contents("php://input"));

// get posted data

$idCancha = isset($_GET['idCancha']) ? $_GET['idCancha'] : die();

$idUser = isset($_GET['idUser']) ? $_GET['idUser'] : die();

$rentedTime = isset($_GET['rentedTime']) ? $_GET['rentedTime'] : die();

$horario = isset($_GET['horario']) ? $_GET['horario'] : die();

$email = isset($_GET['email']) ? $_GET['email'] : die();

$mail = new PHPMailer();

try {
    //Server settings
    $mail->isSMTP(); // Set mailer to use SMTP
    $mail->Host = '	smtp.gmail.com'; // Specify main and backup SMTP servers
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'complejo.lautaro.no.responder@gmail.com'; // SMTP username
    $mail->Password = 'Complejo2018'; // SMTP password
    $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 25; // TCP port to connect to

    //Recipients
    $mail->setFrom('complejo.lautaro.no.responder@gmail.com', 'Complejo Lautaro');
    $mail->addAddress($email); // Add a recipient
    // Retrieve the email template required
    $message = file_get_contents('rent.html');

    // Replace the % with the actual information

    $message = str_replace('%urirent%', "http://bigbossduck.com/api/cancha/rentField.php?idCancha=" . $idCancha . "&idUser=" . $idUser . "&rentedTime=" . $rentedTime . "&horario=" . $horario . "", $message);

    //Content
    $mail->Subject = 'Proceso de Alquiler COMPLEJO LAUTARO';
    $mail->MsgHTML($message);
    $mail->send();
    $field_arr = array();
    $field_arr["records"] = array();

    $field_item = array(
        "rented" => true,
    );

    array_push($field_arr["records"], $field_item);

    echo json_encode($field_arr);
} catch (Exception $e) {
    $field_arr = array();
    $field_arr["records"] = array();

    $field_item = array(
        "rented" => false,
    );

    array_push($field_arr["records"], $field_item);

    echo json_encode($field_arr);
    echo json_encode($e);
}
