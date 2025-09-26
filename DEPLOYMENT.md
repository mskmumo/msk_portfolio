# 🚀 Deployment Guide for Vercel

## 📧 Email Configuration

### Environment Variables Required:

Add these to your Vercel project settings:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mumo.mwangangi@strathmore.edu
SMTP_PASS=pyzx jggp lqaj rvxn
SMTP_FROM=mumo.mwangangi@strathmore.edu
SMTP_TO=mumo.mwangangi@strathmore.edu
```

### Steps to Configure in Vercel:

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Select your project

2. **Navigate to Settings:**
   - Click the "Settings" tab
   - Click "Environment Variables" in the sidebar

3. **Add Variables:**
   - Click "Add New"
   - Enter variable name (e.g., `SMTP_HOST`)
   - Enter variable value (e.g., `smtp.gmail.com`)
   - Select environments: Production, Preview, Development
   - Click "Save"

4. **Repeat for All Variables:**
   - Add all 6 SMTP variables listed above

5. **Redeploy:**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### 🔍 Troubleshooting:

**If emails still don't work:**

1. **Check Gmail Settings:**
   - Ensure 2FA is enabled on your Gmail account
   - Verify the app password is correct
   - Make sure "Less secure app access" is disabled

2. **Check Vercel Logs:**
   - Go to your deployment
   - Click "View Function Logs"
   - Look for SMTP errors

3. **Test Locally:**
   - Run `npm run dev`
   - Test the contact form
   - Check console for errors

### 📱 Fallback Contact Methods:

If email fails, users will see:
- Your phone number: +254 110 018 735
- Your email: mskmumo@gmail.com
- WhatsApp button (already implemented)

### 🔒 Security Notes:

- Environment variables are encrypted in Vercel
- Never commit `.env.local` to Git
- Use `.env.example` for team members
- Rotate app passwords regularly
