import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    // Honeypot
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.log("Contact submission (email not configured):", parsed.data);
      return NextResponse.json({ ok: true });
    }

    // TODO: Integrate SendGrid or preferred email provider
    // For now, acknowledge
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


