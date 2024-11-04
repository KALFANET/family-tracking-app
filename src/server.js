const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// קביעת פרטי המייל לשליחת הזמנות
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// מסלול לשליחת הזמנה במייל
app.post('/api/invite', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'הזמנה להצטרף לקבוצה',
    text: `שלום, אתה מוזמן להצטרף לקבוצה. לחץ על הקישור הבא כדי להירשם: http://localhost:3000/register`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'Invitation sent' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
