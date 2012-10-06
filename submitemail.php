<?php

$to = "dgn.dev@gmail.com"; // Replace with your email address


//Validating email addres
$email = $_POST['email'];

function validateEmail($email)
{
   if(eregi('^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$', $email))
	  return true;
   else
	  return false;
}


//Validates the required fields
if((strlen($_POST['name']) < 1 ) || (strlen($email) < 1 ) || (strlen($_POST['message']) < 1 ) || (($_POST['message']) == "Message (required)") || validateEmail($email) == FALSE){
	$emailerror .= true;


} else {

	$emailerror .= false;

	
//Composing the email
	$email_message =
		"Name: " . ucwords($_POST['name']) . "\n" .
		"Email: " . $email . "\n" .
		"Subject: " . $_POST['subject'] . "\n" .
		"Message: " . "\n" . $_POST['message'] . "\n";
	
//Sending the email
	mail($to, $subject, $email_message);
}

?>

<?php 

if($emailerror == true) {
	echo '<span>Please fill the requested fields.</span>';
}
else
{
	echo "<span>Message has been sent. Thank you!</span>";
}	


?>
