export const signupTemp = function (name: string, token: string) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="padding: 20px; background-color: #4CAF50; color: white; text-align: center;">
                    <h1>Welcome to AITI App, ${name}!</h1>
                </div>
                <div style="padding: 20px;">
                    <p>Dear ${name},</p>
                    <p>Thank you for signing up for our service! To complete your registration and verify your email, please click the button below:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="https://yourdomain.com/verify-email?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                    </div>
                    <p>If you did not request this registration, please ignore this email or contact our support team for assistance.</p>
                    <p>Best Regards,<br/>The AITI App Team</p>
                </div>
                <div style="padding: 10px; background-color: #f1f1f1; text-align: center; font-size: 12px; color: #777;">
                    <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
                    <p><a href="https://yourdomain.com/verify-email?token=${token}" style="color: #4CAF50;">https://yourdomain.com/verify-email?token=${token}</a></p>
                    <p style="font-size: 10px;">If you didn't sign up for this account, please ignore this email or contact us immediately.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    const text = `
        Login, A request to create your AITI account was received.
        Use this OTP to confirm your account and log in`;
    const subject = `Welcome to AITI`

    return {
        html: html,
        text: text,
        subject:subject
    }
}
