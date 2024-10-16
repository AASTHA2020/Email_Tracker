// backend/routes/jobRoutes.js
const express = require('express');
const Job = require('../models/Job'); // Import Job model
const router = express.Router();

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs from the database
    res.json(jobs); // Send jobs as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new job
router.post('/', async (req, res) => {
  const job = new Job(req.body); // Create a new job instance

  try {
    const savedJob = await job.save(); // Save the job to the database
    res.status(201).json(savedJob); // Send back the saved job
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
