import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import nodemailer from "nodemailer";

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Email template function
const createEmailTemplate = (data: {
  name: string;
  email: string;
  phone: string;
  budget: string;
  subject: string;
  message: string;
}) => {
  return {
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚀 New Contact Form Submission</h2>
              <p>You have received a new message through your portfolio website.</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Name:</span>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <span class="label">📧 Email:</span>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              
              <div class="field">
                <span class="label">📱 Phone:</span>
                <div class="value">${data.phone}</div>
              </div>
              
              <div class="field">
                <span class="label">💰 Budget (KSh):</span>
                <div class="value">${data.budget}</div>
              </div>
              
              <div class="field">
                <span class="label">📋 Subject:</span>
                <div class="value">${data.subject}</div>
              </div>
              
              <div class="field">
                <span class="label">💬 Message:</span>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
              <p>Reply directly to this email to respond to ${data.name}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Budget (KSh): ${data.budget}
Subject: ${data.subject}

Message:
${data.message}

Sent at: ${new Date().toLocaleString()}
    `
  };
};

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    // Honeypot check
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("Contact submission (SMTP not configured):", parsed.data);
      return NextResponse.json({ 
        error: "Email service not configured. Please try again later." 
      }, { status: 500 });
    }

    try {
      // Create transporter
      const transporter = createTransporter();

      // Verify connection configuration
      await transporter.verify();

      // Create email content
      const emailTemplate = createEmailTemplate(parsed.data);

      // Send email to you
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_FROM}>`,
        to: process.env.SMTP_TO,
        replyTo: parsed.data.email,
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html,
      });

      // Send confirmation email to the sender
      await transporter.sendMail({
        from: `"Mumo Mwangangi" <${process.env.SMTP_FROM}>`,
        to: parsed.data.email,
        subject: "Thank you for contacting me!",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
                .cta { background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>✨ Thank You for Reaching Out!</h2>
                </div>
                <div class="content">
                  <p>Hi <strong>${parsed.data.name}</strong>,</p>
                  
                  <p>Thank you for contacting me through my portfolio website. I've received your message and I'm excited to learn more about your project!</p>
                  
                  <p><strong>Here's what happens next:</strong></p>
                  <ul>
                    <li>🔍 I'll review your message and project requirements</li>
                    <li>📞 I'll get back to you within 24 hours</li>
                    <li>💡 We can schedule a call to discuss your needs in detail</li>
                  </ul>
                  
                  <p>In the meantime, feel free to check out my latest work and connect with me on social media.</p>
                  
                  <div style="text-align: center;">
                    <a href="https://wa.me/254110018735?text=Hi%20Mumo,%20I%20just%20submitted%20a%20contact%20form%20on%20your%20website" class="cta">💬 Chat on WhatsApp</a>
                  </div>
                  
                  <p>Looking forward to working together!</p>
                  
                  <p>Best regards,<br>
                  <strong>Mumo Mwangangi</strong><br>
                  Software Developer & Data Analyst</p>
                </div>
                <div class="footer">
                  <p>This is an automated confirmation. Please don't reply to this email.</p>
                  <p>For urgent matters, call me at +254 110 018 735</p>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
Hi ${parsed.data.name},

Thank you for contacting me through my portfolio website. I've received your message and I'm excited to learn more about your project!

Here's what happens next:
- I'll review your message and project requirements
- I'll get back to you within 24 hours  
- We can schedule a call to discuss your needs in detail

Looking forward to working together!

Best regards,
Mumo Mwangangi
Software Developer & Data Analyst

For urgent matters, call me at +254 110 018 735
        `
      });

      console.log("Email sent successfully to:", process.env.SMTP_TO);
      return NextResponse.json({ 
        ok: true, 
        message: "Message sent successfully! I'll get back to you soon." 
      });

    } catch (emailError) {
      console.error("Email sending error:", emailError);
      console.error("Error details:", {
        message: emailError instanceof Error ? emailError.message : 'Unknown error',
        stack: emailError instanceof Error ? emailError.stack : 'No stack trace',
        env: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER ? 'SET' : 'NOT SET',
          pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET'
        }
      });
      return NextResponse.json({ 
        error: "Failed to send email. Please try again or contact me directly.",
        details: emailError instanceof Error ? emailError.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ 
      error: "Server error. Please try again later." 
    }, { status: 500 });
  }
}


