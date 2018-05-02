<?php
require_once '../lib/PayU.php';
PayU::$apiKey = "WGKBehIQ4S6gt3I6DG5pLfvm5r"; //Ingrese aquí su propio apiKey.
PayU::$apiLogin = "8cR6iaD8cw9f910"; //Ingrese aquí su propio apiLogin.
PayU::$merchantId = "707084"; //Ingrese aquí su Id de Comercio.
PayU::$language = SupportedLanguages::ES; //Seleccione el idioma.
PayU::$isTest = true; //Dejarlo True cuando sean pruebas.

// URL de Pagos
Environment::setPaymentsCustomUrl("https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi");
// URL de Consultas
Environment::setReportsCustomUrl("https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi");
// URL de Suscripciones para Pagos Recurrentes
Environment::setSubscriptionsCustomUrl("https://sandbox.api.payulatam.com/payments-api/rest/v4.3/");

$response = PayUPayments::doPing();
echo $response->code;

$array=PayUPayments::getPaymentMethods();
$payment_methods=$array->paymentMethods;
foreach ($payment_methods as $payment_method){
	$payment_method->country;
	$payment_method->description;
	$payment_method->id;
}

print_r($payment_methods);

?>