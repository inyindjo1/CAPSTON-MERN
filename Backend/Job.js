
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  position: String,
  company: String,
  location: String,
  remote: Boolean,
  url: String,
});

const Job = mongoose.model('Job', jobSchema);

export async function saveJob(jobData) {
  try {
    const job = new Job(jobData);
    const savedJob = await job.save();
    console.log('Job saved:', savedJob);
    return savedJob;
  } catch (error) {
    console.error(' Error saving job:', error);
    throw error;
  }
}

export default Job;
