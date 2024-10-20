import express from 'express'; 
import Job from '../models/Job.js'; // Import the existing Job model

const router = express.Router();

// Route to get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs
    res.json(jobs); // Return the jobs in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Route to create a new job
router.post('/', async (req, res) => {
  const { name, email, contact, address } = req.body; // Extract data from request body

  try {
    const newJob = new Job({ name, email, contact, address }); // Create new Job document
    await newJob.save(); // Save to MongoDB
    res.status(201).json(newJob); // Return the created job
  } catch (error) {
    res.status(400).json({ message: 'Error creating job' });
  }
});

// Route to update a job by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, address } = req.body; // Extract updated data from request body

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, { name, email, contact, address }, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(updatedJob); // Return the updated job
  } catch (error) {
    res.status(400).json({ message: 'Error updating job' });
  }
});

// Route to delete a job by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting job' });
  }
});

export default router;
