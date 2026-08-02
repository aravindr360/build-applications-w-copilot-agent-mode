import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

const Overview = () => (
  <div className="row g-4">
    <div className="col-lg-6">
      <Users />
    </div>
    <div className="col-lg-6">
      <Teams />
    </div>
    <div className="col-lg-6">
      <Activities />
    </div>
    <div className="col-lg-6">
      <Leaderboard />
    </div>
    <div className="col-12">
      <Workouts />
    </div>
  </div>
);

function App() {
  const codespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim();

  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <p className="text-uppercase text-muted mb-1">Octofit Tracker</p>
            <h1 className="h2 mb-0">Multi-tier fitness dashboard</h1>
          </div>
          <Link className="btn btn-outline-primary" to="/">
            Open dashboard
          </Link>
        </div>
        <p className="mt-3 text-muted">
          API requests target{' '}
          <strong>
            {codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'}
          </strong>
          . Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when running in GitHub Codespaces.
        </p>
      </header>

      <nav className="nav nav-pills mb-4 flex-wrap">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
