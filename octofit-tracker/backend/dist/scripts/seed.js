import { connectDatabase } from "../config/database.js";
import { Activity, LeaderboardEntry, Team, User, Workout, } from "../models/index.js";
await connectDatabase();
console.log('Seed the octofit_db database with test data');
const sampleUsers = [
    {
        name: 'Ava Patel',
        email: 'ava.patel@example.com',
        role: 'captain',
        fitnessGoal: 'Marathon prep',
        city: 'Seattle',
    },
    {
        name: 'Noah Chen',
        email: 'noah.chen@example.com',
        role: 'member',
        fitnessGoal: 'Strength training',
        city: 'Austin',
    },
    {
        name: 'Mina Alvarez',
        email: 'mina.alvarez@example.com',
        role: 'member',
        fitnessGoal: 'Weight loss',
        city: 'Denver',
    },
];
const sampleTeams = [
    {
        name: 'Trail Blazers',
        members: 12,
        captain: 'Ava Patel',
        focus: 'endurance',
    },
    {
        name: 'Iron Crew',
        members: 8,
        captain: 'Noah Chen',
        focus: 'strength',
    },
];
const sampleActivities = [
    {
        type: 'run',
        duration: 35,
        distanceKm: 5.6,
        intensity: 'moderate',
        notes: 'Morning jog around the lake',
        date: new Date('2026-08-01T06:30:00.000Z'),
    },
    {
        type: 'strength',
        duration: 45,
        distanceKm: 0,
        intensity: 'high',
        notes: 'Full-body circuit training',
        date: new Date('2026-08-02T18:00:00.000Z'),
    },
    {
        type: 'cycle',
        duration: 60,
        distanceKm: 22,
        intensity: 'moderate',
        notes: 'Steady ride with tempo intervals',
        date: new Date('2026-08-02T07:15:00.000Z'),
    },
];
const sampleLeaderboardEntries = [
    {
        name: 'Ava Patel',
        points: 1420,
        streak: 9,
        team: 'Trail Blazers',
    },
    {
        name: 'Noah Chen',
        points: 1310,
        streak: 6,
        team: 'Iron Crew',
    },
    {
        name: 'Mina Alvarez',
        points: 1240,
        streak: 5,
        team: 'Trail Blazers',
    },
];
const sampleWorkouts = [
    {
        name: 'Tempo Run',
        duration: 30,
        focus: 'cardio',
        difficulty: 'intermediate',
        equipment: 'running shoes',
    },
    {
        name: 'Upper Body Strength',
        duration: 40,
        focus: 'strength',
        difficulty: 'intermediate',
        equipment: 'dumbbells',
    },
    {
        name: 'Mobility Flow',
        duration: 20,
        focus: 'recovery',
        difficulty: 'beginner',
        equipment: 'mat',
    },
];
await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
]);
const [users, teams, activities, leaderboardEntries, workouts] = await Promise.all([
    User.insertMany(sampleUsers),
    Team.insertMany(sampleTeams),
    Activity.insertMany(sampleActivities),
    LeaderboardEntry.insertMany(sampleLeaderboardEntries),
    Workout.insertMany(sampleWorkouts),
]);
console.log('Seed complete', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboardEntries: leaderboardEntries.length,
    workouts: workouts.length,
});
