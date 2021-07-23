import nodemailer from 'nodemailer';

const mailerClient = nodemailer.createTransport({
  host: 'smtppro.zoho.in',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default mailerClient;
