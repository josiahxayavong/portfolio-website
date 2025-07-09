# Email Setup Instructions

## 1. Sign up for Resend
1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address

## 2. Get your API Key
1. Go to your Resend dashboard
2. Navigate to "API Keys"
3. Create a new API key
4. Copy the API key

## 3. Set up your environment variable
1. Create a `.env.local` file in your project root
2. Add: `RESEND_API_KEY=your_actual_api_key_here`
3. Replace `your_actual_api_key_here` with your real API key

## 4. Domain Setup (Optional but Recommended)
For production, you should verify a domain:
1. In Resend dashboard, go to "Domains"
2. Add your domain (e.g., yourdomain.com)
3. Follow the DNS verification steps
4. Update the "from" email in the API route to use your domain

## 5. Testing
- For development, you can use Resend's test domain
- The form will send emails to josiahxaya@gmail.com
- Check your spam folder initially

## 6. Alternative Services
If you prefer other services:
- **EmailJS**: Client-side email sending
- **Formspree**: Form handling service
- **SendGrid**: Enterprise email service
- **Nodemailer**: If you have your own SMTP server

## 7. Deploy
When you deploy to Vercel:
1. Add the RESEND_API_KEY environment variable in your Vercel dashboard
2. The API route will automatically work
