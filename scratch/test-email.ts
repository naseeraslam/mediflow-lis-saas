import { sendEmail } from "../src/lib/email";

async function testResendHTML() {
  console.log("Sending real 2FA test email via Resend API Key...");
  const code = "948201";
  const cleanEmail = "naseeraslamkhan016@gmail.com";

  const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MediFlow 2FA Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="min-height: 100vh; background-color: #020617; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%); padding: 32px 30px; text-align: center;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; width: 48px; height: 48px; background-color: #ffffff; border-radius: 12px; line-height: 48px; font-weight: bold; font-size: 24px; color: #0f172a;">
                      🧬
                    </div>
                    <h1 style="margin: 12px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 800;">MediFlow LIS SaaS</h1>
                    <p style="margin: 4px 0 0 0; color: #ccfbf1; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">ISO 15189 Medical Infrastructure</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px; background-color: #0f172a;">
              <h2 style="margin: 0 0 12px 0; color: #f8fafc; font-size: 18px; font-weight: 700;">🔐 Two-Factor Security Authentication</h2>
              <p style="margin: 0 0 24px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                A sign-in attempt was detected for your account <strong style="color: #cbd5e1;">${cleanEmail}</strong>. Use the One-Time Security Passcode (OTP) below to complete authentication:
              </p>

              <!-- 6-Digit Passcode Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr>
                  <td align="center" style="background-color: #020617; border: 1px solid #0d9488; border-radius: 14px; padding: 24px;">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 900; color: #2dd4bf; letter-spacing: 8px; display: block; text-shadow: 0 0 20px rgba(45, 212, 191, 0.4);">
                      ${code}
                    </span>
                    <span style="display: block; margin-top: 10px; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      ⏱️ Valid for 10 Minutes Only
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.5;">
                If you did not initiate this authentication request, please ignore this email or notify your laboratory administrator immediately.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #020617; padding: 20px 30px; border-top: 1px solid #1e293b; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.5;">
                © 2026 MediFlow Medical LIS SaaS. Architectural Vision by <strong>Sher Muhammad</strong>.
              </p>
              <p style="margin: 4px 0 0 0; color: #475569; font-size: 10px;">
                Strict Row-Level Multi-Tenant Data Isolation Active
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const success = await sendEmail({
    to: cleanEmail,
    subject: `🔐 MediFlow Live 2FA Verification Passcode: ${code}`,
    html: htmlTemplate,
  });

  console.log("Result:", success);
}

testResendHTML();
