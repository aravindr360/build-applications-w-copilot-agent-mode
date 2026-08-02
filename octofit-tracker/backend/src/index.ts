import express from 'express';
import { connectDatabase } from './config/database.ts';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from './models/index.ts';

export const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 8000;

export const getApiBaseUrl = (portNumber: number, codespaceName?: string) => {
  const resolvedCodespaceName = codespaceName === undefined ? process.env.CODESPACE_NAME : codespaceName;

  return resolvedCodespaceName
    ? `https://${resolvedCodespaceName}-8000.app.github.dev`
    : `http://localhost:${portNumber}`;
};

const baseUrl = getApiBaseUrl(port);

const fallbackUsers = [{ name: 'Ada', email: 'ada@example.com', role: 'captain' }];
const fallbackTeams = [{ name: 'Rocket Squad', members: 4 }];
const fallbackActivities = [{ type: 'run', duration: 30, notes: 'Morning run' }];
const fallbackLeaderboard = [{ name: 'Ada', points: 1200 }];
const fallbackWorkouts = [{ name: 'HIIT', duration: 20, focus: 'cardio' }];

const withApiUrl = (payload: object) => ({ apiUrl: baseUrl, ...payload });

app.get('/api/health', (_req, res) => {
  res.json(withApiUrl({ status: 'ok' }));
});

app.get('/api/users/', async (_req, res) => {
  try {
    await connectDatabase();
    const users = await User.find().lean();
    res.json(withApiUrl({ users }));
  } catch {
    res.json(withApiUrl({ users: fallbackUsers }));
  }
});

app.post('/api/users/', async (req, res) => {
  try {
    await connectDatabase();
    const user = await User.create(req.body);
    res.status(201).json(withApiUrl({ user }));
  } catch {
    res.status(201).json(withApiUrl({ user: { ...req.body, role: req.body.role || 'member' } }));
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    await connectDatabase();
    const teams = await Team.find().lean();
    res.json(withApiUrl({ teams }));
  } catch {
    res.json(withApiUrl({ teams: fallbackTeams }));
  }
});

app.post('/api/teams/', async (req, res) => {
  try {
    await connectDatabase();
    const team = await Team.create(req.body);
    res.status(201).json(withApiUrl({ team }));
  } catch {
    res.status(201).json(withApiUrl({ team: req.body }));
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    await connectDatabase();
    const activities = await Activity.find().lean();
    res.json(withApiUrl({ activities }));
  } catch {
    res.json(withApiUrl({ activities: fallbackActivities }));
  }
});

app.post('/api/activities/', async (req, res) => {
  try {
    await connectDatabase();
    const activity = await Activity.create(req.body);
    res.status(201).json(withApiUrl({ activity }));
  } catch {
    res.status(201).json(withApiUrl({ activity: req.body }));
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    await connectDatabase();
    const leaderboard = await LeaderboardEntry.find().lean();
    res.json(withApiUrl({ leaderboard }));
  } catch {
    res.json(withApiUrl({ leaderboard: fallbackLeaderboard }));
  }
});

app.post('/api/leaderboard/', async (req, res) => {
  try {
    await connectDatabase();
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(withApiUrl({ entry }));
  } catch {
    res.status(201).json(withApiUrl({ entry: req.body }));
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    await connectDatabase();
    const workouts = await Workout.find().lean();
    res.json(withApiUrl({ workouts }));
  } catch {
    res.json(withApiUrl({ workouts: fallbackWorkouts }));
  }
});

app.post('/api/workouts/', async (req, res) => {
  try {
    await connectDatabase();
    const workout = await Workout.create(req.body);
    res.status(201).json(withApiUrl({ workout }));
  } catch {
    res.status(201).json(withApiUrl({ workout: req.body }));
  }
});

export const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  void startServer();
}
