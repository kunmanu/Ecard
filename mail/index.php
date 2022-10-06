<?php

use Symfony\Component\Mime\Email; 
use Symfony\Component\Mailer\Mailer; 
use Symfony\Component\Mailer\Transport;

require 'config.php';

require_once '../vendor/autoload.php';



$transport = Transport::fromDsn(MAILER_DSN) ; 

$mailer = new Mailer($transport); 
$img = $_POST['canvasData'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);
$fileName = '../canvas/canvas.png';
file_put_contents($fileName, $fileData);

$sender = $_POST['sender'];
$recipient = $_POST['recipient'];
$messageText = $_POST['message'];


$email = (new Email()) 

    ->from($sender)

    ->to($recipient)



    ->attachFromPath($fileName)

    ->embedFromPath($fileName, 'footer-signature')

    ->subject('Your Ecard')

    ->text($messageText)

    ->html('<h4>Vous avez recu un message :</h4></br>
            <img src="cid:footer-signature"> ');



$mailer->send($email); 

