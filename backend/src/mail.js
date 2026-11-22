import nodemailer from 'nodemailer';

export function configureMail(app) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) return;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === '465',
    ...(process.env.SMTP_USER
      ? {
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        }
      : {}),
    connectionTimeout: 10000,
  });
  app.locals.sendResetMail = (to, url) =>
    transport.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: 'Reset your SkillSwap password',
      text: `Use this link to reset your SkillSwap password: ${url}\n\nThis link expires in 30 minutes. If you did not request this, you can ignore this email.`,
    });
}
