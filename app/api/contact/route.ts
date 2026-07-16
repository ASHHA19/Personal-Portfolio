import { NextResponse } from 'next/server'
import { profile } from '@/lib/portfolio-data'

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const subject = `Portfolio inquiry from ${name}`
    const text = `${message}\n\nFrom: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}`

    const mailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY ?? ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [profile.email],
        subject,
        text,
      }),
    })

    if (!mailResponse.ok) {
      throw new Error('Email delivery failed')
    }

    if (phone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      const twilioPayload = new URLSearchParams({
        From: process.env.TWILIO_PHONE_NUMBER,
        To: phone,
        Body: `New portfolio message from ${name}: ${message}`,
      })

      await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: twilioPayload.toString(),
        },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to send message' }, { status: 500 })
  }
}
