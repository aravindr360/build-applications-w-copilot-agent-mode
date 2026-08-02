import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../lib/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/teams/'));
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        setTeams(normalizeCollectionResponse(payload, 'teams'));
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {loading && <p>Loading teams…</p>}
        {error && <div className="alert alert-warning">{error}</div>}
        {!loading && !error && (
          <ul className="list-group">
            {teams.length === 0 ? (
              <li className="list-group-item">No teams found.</li>
            ) : (
              teams.map((team, index) => (
                <li key={`${team.name || 'team'}-${index}`} className="list-group-item">
                  <strong>{team.name || 'Untitled team'}</strong>
                  <div className="text-muted">
                    {team.members ? `${team.members} members` : 'Member count pending'}
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Teams;
