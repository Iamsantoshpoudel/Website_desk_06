<?php

/* Generate a random token for each form submission */
$token = bin2hex(random_bytes(16));

// Store the token in a hidden form field
echo '<input type="hidden" name="token" value="' . $token . '">';

if (empty($_POST['token']) || $_POST['token'] !== $token) {
    echo '<span class="notice">Error!</span>';
    exit;
}

$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$from = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
$subject = 'Contact Form Submission'; // Set the subject of the email
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

$headers = [
    'From' => "Form Contact <$from>",
    'MIME-Version' => '1.0',
    'Content-type' => 'text/html; charset=utf-8'
];

$body =<<<EOT
Hi I am santosh poudel<br /><br />
{$name} has sent you a message via contact form on your website!
<br /><br />
Name: {$name}<br />
Email: {$from}<br />
Phone: {$phone}<br />
Subject: {$subject}<br />
Message: <br /><br />
{$message}
<br />
<br />
============================================================
EOT;

$to = 'iamsantoshpoudel@gmail.com';

if (mail($to, $subject, $body, implode("\r\n", $headers))) {
    echo '<div class="success"><i class="fas fa-check-circle"></i><h3>Thank You!</h3>Your message has been sent successfully.</div>';
} else {
    echo '<div>Your message sending failed!</div>';
}
?>