import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../lib/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
        const response = await fetch(buildApiUrl('/api/activities/'));
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        setActivities(normalizeCollectionResponse(payload, 'activities'));
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {loading && <p>Loading activities…</p>}
        {error && <div className="alert alert-warning">{error}</div>}
        {!loading && !error && (
          <ul className="list-group">
            {activities.length === 0 ? (
              <li className="list-group-item">No activities recorded yet.</li>
            ) : (
              activities.map((activity, index) => (
                <li key={`${activity.type || 'activity'}-${index}`} className="list-group-item">
                  <strong>{activity.type || 'Activity'}</strong>
                  <div className="text-muted">
                    {activity.duration ? `${activity.duration} min` : 'Duration pending'}
                    {activity.notes ? ` • ${activity.notes}` : ''}
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

export default Activities;
