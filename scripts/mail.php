<?php
    
    $name = $_GET["name"];
    $email = $_GET["email"];
    $subject = $_GET["subject"];
    $message = $_GET["message"];
    $to = "<tobypenk@gmail.com>";
    
    $headers = "From: tobypenk@gmail.com \r\n" .
        "Reply-To: tobypenk@gmail.com \r\n" .
        "CC: " . $email;
    
    if (mail($to,$subject,$message,$headers)) {
        echo "s";
    } else {
        echo "f";
    };
?>