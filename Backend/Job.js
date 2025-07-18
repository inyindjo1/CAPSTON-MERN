
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  position: String,
  company: String,
  location: String,
  remote: Boolean,
  url: String,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
