# EmailJS Setup Guide

Your contact form is now integrated with EmailJS! Follow these steps to complete the setup:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (e.g., "service_abc123")

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Configure these template variables:
   - `from_name` - sender's name
   - `from_email` - sender's email
   - `message` - the message content
   - `to_email` - your email (set default to alexdemesa22@gmail.com)

5. Save and note down your **Template ID** (e.g., "template_xyz789")

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., "abcdefghij12345")

## Step 5: Update Your Code
Open `src/app/components/home/contact/contact.component.ts` and replace:

```typescript
private emailJsConfig = {
  serviceId: 'YOUR_SERVICE_ID',        // Replace with your Service ID
  templateId: 'YOUR_TEMPLATE_ID',      // Replace with your Template ID
  publicKey: 'YOUR_PUBLIC_KEY'         // Replace with your Public Key
};
```

With your actual credentials:

```typescript
private emailJsConfig = {
  serviceId: 'service_abc123',         // Your actual Service ID
  templateId: 'template_xyz789',       // Your actual Template ID
  publicKey: 'abcdefghij12345'         // Your actual Public Key
};
```

## Step 6: Test
1. Save your changes
2. Restart your development server if needed
3. Fill out the contact form on your portfolio
4. Check your email inbox for the message!

## Free Tier Limits
- 200 emails per month
- Perfect for a portfolio website

## Fallback Behavior
Until you configure EmailJS, the form will automatically fall back to the mailto method (opens default email client).

## Troubleshooting
- **Emails not sending?** Check browser console for errors
- **Wrong email address?** Update `to_email` in the template
- **CORS errors?** Make sure you're using the Public Key, not API Key
- **Rate limiting?** Free tier has 200 emails/month limit

## Alternative Services
If you prefer a different service:
- **FormSpree**: https://formspree.io/ (50 submissions/month free)
- **Netlify Forms**: Free with Netlify hosting
- **AWS SES**: More complex but scalable

---

**Need help?** Check EmailJS documentation: https://www.emailjs.com/docs/
