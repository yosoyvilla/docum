<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/user.php';

// Include the PHPMailer class
include_once '../PHPMailer/class.phpmailer.php';
include_once '../PHPMailer/class.smtp.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

// get posted data
$email = isset($_GET['email']) ? $_GET['email'] : die();

$exct = $user->lostaccount($email);

$mail = new PHPMailer();                              // Passing `true` enables exceptions

if($user->exists === "true" || $user->exists === true){
    try {
        //Server settings
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = '	smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'complejo.lautaro.no.responder@gmail.com';                 // SMTP username
        $mail->Password = 'Complejo2018';                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 25;                                    // TCP port to connect to
    
        //Recipients
        $mail->setFrom('complejo.lautaro.no.responder@gmail.com', 'Complejo Lautaro');
        $mail->addAddress($email, $user->name);     // Add a recipient
        // Retrieve the email template required
        $message = file_get_contents('lost.html');
        
        // Replace the % with the actual information
        $message = str_replace('%username%', $email, $message);
        $message = str_replace('%password%', $user->pwd, $message);
    
        //Content
        $mail->Subject = 'Detalles de su cuenta COMPLEJO LAUTARO';
        $mail->MsgHTML($message);
        $mail->send();
        print_r(json_encode(true));
    } catch (Exception $e) {
        print_r(json_encode(false));
    }
}else{
    print_r(json_encode(false));
}