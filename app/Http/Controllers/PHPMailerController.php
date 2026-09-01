<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use Inertia\Inertia;
use Illuminate\Http\Response; // Para respuestas HTTP



class PHPMailerController extends Controller
{

    public function index()
    {
       return Inertia::render('Aplicacion/UnCorreo');
    }

    public function store(Request $request)
    {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->SMTPDebug = 0;
            $mail->Host       = env('MAIL_HOST');
            $mail->SMTPAuth   = true;
            $mail->Username   = env('MAIL_USERNAME');
            $mail->Password   = env('MAIL_PASSWORD');
            $mail->SMTPSecure = env('MAIL_ENCRYPTION');
            $mail->Port       = env('MAIL_PORT');

            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->addAddress($request->email);

            $mail->isHTML(true);
            $mail->Subject = $request->subject;
            $mail->Body    = $request->body;

            if ($mail->send()) {
                return back()->with('success', 'Email sent successfully!');
            } else {
                return back()->with('error', 'Email sending failed.');
            }
        } catch (Exception $e) {
            return back()->with('error', "Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        }
    }

    


}