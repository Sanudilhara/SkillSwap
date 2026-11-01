import Avatar from './Avatar';
import { Bell, Menu } from 'lucide-react';

export default function Header({
  page,
  demo,
  user,
  pendingCount,
  onOpenMenu,
  onNavigate,
}) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <button
          className="icon-button mobile-menu"
          aria-label="Open navigation"
          onClick={onOpenMenu}
        >
          <Menu size={22} />
        </button>
        <span>Community</span>
        <span className="slash">/</span>
        <strong>{page}</strong>
      </div>
      <div className="topbar-right">
        {demo && <span className="demo-badge">Demo workspace</span>}
        <button
          className="notification-button"
          aria-label="View connection requests"
          onClick={() => onNavigate('Connections')}
        >
          <Bell size={19} />
          {pendingCount > 0 && <span />}
        </button>
        {user && (
          <button
            className="top-avatar"
            aria-label="Open profile"
            onClick={() => onNavigate('My profile')}
          >
            <Avatar student={user} small />
          </button>
        )}
      </div>
    </header>
  );
}
