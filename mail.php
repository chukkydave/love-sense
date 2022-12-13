<?php 
// $from = "no-reply@mylovesense.online";
// $service = $_POST['service'];
// $name = $_POST['name'];
// $phone = $_POST['phone'];
//$email = $_POST['email'];
// $message = $_POST['message'];
$to = "info.mylovesense@gmail.com";

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$appointmentDate = $_POST['appointmentDate'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$service = $_POST['service'];
$price = $_POST['price'];
$time = $_POST['time'];
$message = $_POST['message'];
$address = $_POST['address'];
$subject = 'Message from LoveSense Booking Form';
$from = 'no-reply@mylovesense.online';
// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n"; 
// Create email headers
$headers .= 'From: '.$from."\r\n".'Reply-To: '.$from."\r\n".'X-Mailer: PHP/'.phpversion();
$msg = "First Name: ".$first_name."<br>"."Last Name: ".$last_name."<br>"."Appointment Date: ".$appointmentDate."<br>"."Price: ".$price."<br>"."Time: ".$time."<br>"."Email: ".$email."<br>"."Phone: ".$phone."<br>"."Service: ".$service."<br>"."Message: ".$message;
// Sending email
if(mail($to, $subject, $msg,$headers)){
    $arr['status']= 200;
	$arr['statusText']= "Booking was placed successfully.";
	echo json_encode($arr);

} 
else{
    $arr['status']= "400";
	$arr['statusText']= "An error occurred while trying to place your booking.";
	echo json_encode($arr);
}



?>