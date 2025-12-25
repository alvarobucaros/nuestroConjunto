<?php

namespace App\Services;

// use Illuminate\Http\Request;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
// use Inertia\Inertia;
// use Illuminate\Http\Response; // Para respuestas HTTP

//use App\Models\TuModelo;

class MailService
{
public function enviarCorreo($destinatario, $asunto, $cuerpo)
    {
    
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->SMTPDebug = 0;
            $mail->Host       = env('MAIL_HOST');
            $mail->SMTPAuth   = true;
            $mail->Username   = env('MAIL_USERNAME');
            $mail->Password   = 'mtse zwta arhk jxgb'; #env('MAIL_PASSWORD');
            $mail->SMTPSecure = env('MAIL_ENCRYPTION');
            $mail->Port       = env('MAIL_PORT');
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->isHTML(true);
$mail->SMTPOptions = array (
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
    );
            $mail->addAddress($destinatario);           
            $mail->Subject = $asunto;
            $mail->Body    = $cuerpo;



            if ($mail->send()) {
                return ('success Email sent successfully!');
            } else {
                return ('error Email sending failed.');
            }
        } catch (Exception $e) {
            return ('error Message could not be sent. Mailer Error:' . $mail->ErrorInfo);
        }

    }

 
}
