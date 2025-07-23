import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);


async function connectToMongoDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log(' Connected to MongoDB');
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
  }
}

connectToMongoDB();

export default User;
