import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  fitnessGoal: { type: String, default: 'Stay active' },
  city: { type: String, default: 'Remote' },
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: { type: Number, default: 0 },
  captain: { type: String, default: '' },
  focus: { type: String, default: 'general' },
});

const activitySchema = new Schema({
  type: { type: String, required: true },
  duration: { type: Number, default: 0 },
  distanceKm: { type: Number, default: 0 },
  intensity: { type: String, default: 'moderate' },
  notes: { type: String, default: '' },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  team: { type: String, default: 'Independent' },
});

const workoutSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, default: 0 },
  focus: { type: String, default: 'general' },
  difficulty: { type: String, default: 'beginner' },
  equipment: { type: String, default: 'none' },
});

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
