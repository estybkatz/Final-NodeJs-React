const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

// Configure Nodemailer with your email provider's settings
const transporter = nodemailer.createTransport({
  service: "your_email_provider",
  auth: {
    user: "your_email_username",
    pass: "your_email_password",
  },
});

// Endpoint to handle the email sending
app.post("/send-email", (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: "your_email@example.com", // Replace with your email
    to: email,
    subject: "Your Subject Here",
    text: "Your Email Body Here",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred while sending the email:", error.message);
      res.status(500).send("Error occurred while sending the email");
    } else {
      console.log("Email sent successfully!", info.response);
      res.send("Email sent successfully!");
    }
  });
});
