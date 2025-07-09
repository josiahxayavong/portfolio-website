/* this is a Next.js API Route Handler. it runs on the server, not the browser.
this is the secure backend for my contact form. it receives the form data,
validates it, and then uses the Resend service to send an email to me. */

// importing types from Next.js for handling server requests and responses
import { type NextRequest, NextResponse } from "next/server"

// importing the Resend library for sending emails
import { Resend } from "resend"

// initializing the Resend client with my secret API key.
// 'process.env.RESEND_API_KEY' securely reads the key from an environment variable.
const resend = new Resend(process.env.RESEND_API_KEY)

// this is the main function that handles incoming POST requests to '/api/contact'
export async function POST(request: NextRequest) {
  try {
    // parse the JSON data from the request body
    const { name, email, message } = await request.json()

    // basic server-side validation to make sure all fields are present
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // validate the email format using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // using the resend.emails.send() method to send the email
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // using Resend's default sending address for now
      to: ["josiahxaya@gmail.com"], // this is my personal email where I'll receive messages
      subject: `New Contact Form Message from ${name}`, // dynamic subject line with the sender's name
      // a more detailed HTML template for the email body
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <h3 style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })

    // if the email sends successfully, return a success response
    return NextResponse.json({ success: true, data })
  } catch (error) {
    // if there's an error, log it to the server console and return a generic error message
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
