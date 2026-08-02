import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../lib/api';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/leaderboard/'));
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        setEntries(normalizeCollectionResponse(payload, 'leaderboard'));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {loading && <p>Loading leaderboard…</p>}
        {error && <div className="alert alert-warning">{error}</div>}
        {!loading && !error && (
          <ul className="list-group">
            {entries.length === 0 ? (
              <li className="list-group-item">No leaderboard entries yet.</li>
            ) : (
              entries.map((entry, index) => (
                <li key={`${entry.name || 'entry'}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{entry.name || 'Anonymous'}</span>
                  <span className="badge bg-primary rounded-pill">{entry.points ?? 0} pts</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
