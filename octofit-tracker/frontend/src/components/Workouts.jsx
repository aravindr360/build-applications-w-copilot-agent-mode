import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../lib/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/workouts/'));
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        setWorkouts(normalizeCollectionResponse(payload, 'workouts'));
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {loading && <p>Loading workouts…</p>}
        {error && <div className="alert alert-warning">{error}</div>}
        {!loading && !error && (
          <ul className="list-group">
            {workouts.length === 0 ? (
              <li className="list-group-item">No workouts scheduled yet.</li>
            ) : (
              workouts.map((workout, index) => (
                <li key={`${workout.name || 'workout'}-${index}`} className="list-group-item">
                  <strong>{workout.name || 'Workout'}</strong>
                  <div className="text-muted">
                    {workout.duration ? `${workout.duration} min` : 'Duration pending'}
                    {workout.focus ? ` • ${workout.focus}` : ''}
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

export default Workouts;
