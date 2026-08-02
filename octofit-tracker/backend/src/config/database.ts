import mongoose from 'mongoose';

export const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.warn(
      'MongoDB unavailable, continuing without persistence:',
      error instanceof Error ? error.message : error,
    );
  }
};
