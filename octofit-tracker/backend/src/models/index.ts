import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'member' },
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: { type: Number, default: 0 },
});

const activitySchema = new Schema({
  type: { type: String, required: true },
  duration: { type: Number, default: 0 },
  notes: { type: String, default: '' },
});

const leaderboardSchema = new Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 0 },
});

const workoutSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, default: 0 },
  focus: { type: String, default: 'general' },
});

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
