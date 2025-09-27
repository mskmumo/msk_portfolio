import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      SMTP_HOST: process.env.SMTP_HOST ? 'SET' : 'MISSING',
      SMTP_PORT: process.env.SMTP_PORT ? 'SET' : 'MISSING',
      SMTP_USER: process.env.SMTP_USER ? 'SET' : 'MISSING',
      SMTP_PASS: process.env.SMTP_PASS ? 'SET' : 'MISSING',
      SMTP_FROM: process.env.SMTP_FROM ? 'SET' : 'MISSING',
      SMTP_TO: process.env.SMTP_TO ? 'SET' : 'MISSING',
    };

    console.log("Environment variables check:", envCheck);

    // If any are missing, return the status
    if (Object.values(envCheck).includes('MISSING')) {
      return NextResponse.json({
        success: false,
        message: "Some environment variables are missing",
        env: envCheck
      });
    }

    // Try to create transporter and verify connection
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("Testing SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection successful!");

    return NextResponse.json({
      success: true,
      message: "SMTP configuration is working correctly",
      env: envCheck
    });

  } catch (error) {
    console.error("SMTP test failed:", error);
    return NextResponse.json({
      success: false,
      message: "SMTP connection failed",
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        SMTP_HOST: process.env.SMTP_HOST ? 'SET' : 'MISSING',
        SMTP_PORT: process.env.SMTP_PORT ? 'SET' : 'MISSING',
        SMTP_USER: process.env.SMTP_USER ? 'SET' : 'MISSING',
        SMTP_PASS: process.env.SMTP_PASS ? 'SET' : 'MISSING',
        SMTP_FROM: process.env.SMTP_FROM ? 'SET' : 'MISSING',
        SMTP_TO: process.env.SMTP_TO ? 'SET' : 'MISSING',
      }
    }, { status: 500 });
  }
}
