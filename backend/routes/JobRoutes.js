import express from 'express';
import nodemailer from 'nodemailer';
import Job from '../models/Job.js';  // Import the Job model
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Route to get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();  // Fetch all jobs from MongoDB
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Route to send emails to selected companies
router.post('/send-mails', async (req, res) => {
  const { emails } = req.body;  // The array of company emails sent from frontend

  if (!emails || emails.length === 0) {
    return res.status(400).json({ message: 'No emails provided' });
  }

  try {
    // Configure Nodemailer with Gmail credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send emails to all selected companies
    for (let email of emails) {
      const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender email from environment variable
        to: email,  // Recipient company email
        subject: 'Application for MERN Stack Developer Role',
        text: 'Hi there,\n\nI am interested in the MERN Stack Developer position. Looking forward to your response.\n\nBest regards,\nYour Name'
      };

      // Send email using Nodemailer
      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails', error });
  }
});

export default router;
