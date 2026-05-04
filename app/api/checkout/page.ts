import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()

  try {
    // 📩 EMAIL TO YOU (ADMIN)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'cazimirconstant@gmail.com',
      subject: 'New ShootFlow Booking',
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${body.Client_Name}</p>
        <p><strong>Email:</strong> ${body.Email}</p>
        <p><strong>Phone:</strong> ${body.Phone}</p>
        <p><strong>Shoot Type:</strong> ${body.Shoot_Type}</p>
        <p><strong>Date:</strong> ${body.Shoot_Date}</p>
        <p><strong>Location:</strong> ${body.Location}</p>
        <p><strong>Budget:</strong> ${body.Budget}</p>
        <p><strong>Notes:</strong> ${body.Notes}</p>
      `,
    })

    // 📩 EMAIL TO CLIENT
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: body.Email,
      subject: 'Your Booking Request - ShootFlow',
      html: `
        <h2>Booking Received 🎉</h2>
        <p>Hi ${body.Client_Name},</p>

        <p>Thank you for your booking request. We’ve received your submission and will review it shortly.</p>

        <p><strong>Session Details:</strong></p>
        <ul>
          <li><strong>Type:</strong> ${body.Shoot_Type}</li>
          <li><strong>Date:</strong> ${body.Shoot_Date}</li>
          <li><strong>Location:</strong> ${body.Location}</li>
        </ul>

        <p>We’ll be in touch soon with availability and next steps.</p>

        <p>— ShootFlow</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error })
  }
}