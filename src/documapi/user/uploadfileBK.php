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
$doctorname = isset($_GET['doctorname']) ? $_GET['doctorname'] : die();
$filetoupload = isset($_GET['filetoupload']) ? $_GET['filetoupload'] : die();
$filetype = isset($_GET['filetype']) ? $_GET['filetype'] : die();
$filename = isset($_GET['filename']) ? $_GET['filename'] : die();
$rut = isset($_GET['rut']) ? $_GET['rut'] : die();

$exct = $user->uploadfile($rut, $filename, $filetype, $filetoupload, $doctorname);

print_r(json_encode($exct));

$mail = new PHPMailer();                              // Passing `true` enables exceptions

if($exct === "true" || $exct === true){
    try {
        //Server settings
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = '	smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'no.responder.preomedsalud@gmail.com';                 // SMTP username
        $mail->Password = 'Preomed2018*';                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 25;                                    // TCP port to connect to

        //Recipients
        $mail->setFrom('no.responder.preomedsalud@gmail.com', 'PREOMED SALUD');
        $mail->addAddress($email, $name);     // Add a recipient
        // Retrieve the email template required
        $message = file_get_contents('register.html');

        // Replace the % with the actual information
        $message = str_replace('%filetoupload%', $filename, $message);
        $message = str_replace('%doctorname%', $doctorname, $message);

        //Content
        $mail->Subject = 'Se ha subido un nuevo documento al sistema PREOMED SALUD';
        $mail->MsgHTML($message);
        $mail->send();
    } catch (Exception $e) {
        $output = $mail->ErrorInfo;
        if ( is_array( $output ) )
            $output = implode( ',', $output);

        echo "<script>console.log( 'Message could not be sent. Mailer Error: " . $output . "' );</script>";
    }
}
