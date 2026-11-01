import Avatar from '../components/Avatar';
import { ArrowUpRight, ArrowRight, Users, Check } from 'lucide-react';

function getStatusLabel(connection) {
  if (connection.status === 'accepted') return 'Connected';
  if (connection.status === 'rejected') return 'Declined';
  if (connection.incoming) return 'Wants to connect with you';
  return 'Request sent';
}

export default function ConnectionsPage({
  connections,
  busy,
  onRespond,
  onViewProfile,
  onNavigate,
}) {
  return (
    <section className="connections-section">
      <div className="section-title">
        <h2>
          Your community{' '}
          <span className="soft-count">{connections.length}</span>
        </h2>
      </div>
      {connections.length ? (
        connections.map((connection) => (
          <article className="connection-row" key={connection.id}>
            <Avatar student={connection.student} />
            <div>
              <button
                className="name-button"
                onClick={() => onViewProfile(connection.student)}
              >
                <h3>{connection.student.name}</h3>
              </button>
              <p>{connection.student.university}</p>
              <span className="tag learn">{getStatusLabel(connection)}</span>
            </div>
            {connection.incoming && connection.status === 'pending' ? (
              <div className="request-actions">
                <button
                  className="outline-button"
                  disabled={busy === connection.id}
                  onClick={() => onRespond(connection.id, 'rejected')}
                >
                  Decline
                </button>
                <button
                  className="primary"
                  disabled={busy === connection.id}
                  onClick={() => onRespond(connection.id, 'accepted')}
                >
                  <Check size={15} /> Accept
                </button>
              </div>
            ) : (
              <button
                className="outline-button"
                onClick={() => onViewProfile(connection.student)}
              >
                View profile <ArrowUpRight size={15} />
              </button>
            )}
          </article>
        ))
      ) : (
        <div className="empty-state">
          <Users size={36} />
          <h3>Your community starts here</h3>
          <p>
            Find a student who shares your curiosity and send your first
            request.
          </p>
          <button className="primary" onClick={() => onNavigate('Discover')}>
            Discover students <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
