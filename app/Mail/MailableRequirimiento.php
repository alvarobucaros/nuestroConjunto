<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailableRequirimiento extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct()
    {
    
    }

    public function build()
    {
        return $this->view('myHtmlEmail')
                    ->subject('Email de Prueba');
    }

    /**
     * Get the message envelope.
     */
    public function XXenvelope(): Envelope
    {
        // return new Envelope(
        //     subject: 'Mailable Requirimiento',
        // );
        return new Envelope(
         //   from: new Address('alvarobucaros@hotmail', 'Remitente de Prueba'),
            subject: 'Email de Prueba',
        );
    }

    /**
     * Get the message content definition.
     */
    public function XXcontent(): Content
    {
        return new Content(
          
            view: 'myHtmlEmail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
