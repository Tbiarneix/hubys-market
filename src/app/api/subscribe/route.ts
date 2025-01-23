import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: '27e1a7b9-a059-45a6-94b0-7b0d4a40dffe',
    });

    await resend.emails.send({
      from: 'Hubys <no-reply@hubys.app>',
      to: email,
      subject: 'Bienvenue dans la liste d\'attente Hubys !',
      html: `
        <div>
          <h1>Merci de rejoindre la liste d'attente Hubys !</h1>
          <p>Nous sommes ravis de t'avoir parmi nous. Tu seras parmi les premiers à être informé quand l'application sera disponible.</p>
          <p>À très bientôt !</p>
          <p>L'équipe Hubys</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'Hubys <noreply@hubys.app>',
      to: 'hubys.app@gmail.com',
      subject: 'Nouvelle inscription à la liste d\'attente !',
      html: `
        <div>
          <h1>Nouvelle inscription !</h1>
          <p>Email: ${email}</p>
          <p>Date: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
