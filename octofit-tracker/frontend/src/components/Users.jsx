import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../lib/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/users/'));
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        setUsers(normalizeCollectionResponse(payload, 'users'));
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {loading && <p>Loading users…</p>}
        {error && <div className="alert alert-warning">{error}</div>}
        {!loading && !error && (
          <ul className="list-group">
            {users.length === 0 ? (
              <li className="list-group-item">No users found.</li>
            ) : (
              users.map((user, index) => (
                <li key={`${user.email || user.name || 'user'}-${index}`} className="list-group-item">
                  <strong>{user.name || 'Unnamed user'}</strong>
                  <div className="text-muted">
                    {user.email || 'Email pending'}
                    {user.role ? ` • ${user.role}` : ''}
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

export default Users;
