import Avatar from './Avatar';
import {
  ArrowUpRight,
  Sparkles,
  Users,
  BookOpen,
  ArrowLeftRight,
  ChevronDown,
  Compass,
} from 'lucide-react';

export default function Sidebar({
  menu,
  page,
  user,
  matchCount,
  pendingCount,
  onNavigate,
  onEditProfile,
  onSignIn,
}) {
  return (
    <aside className={`sidebar ${menu ? 'open' : ''}`}>
      <a
        className="brand"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('Discover');
        }}
      >
        <span className="brand-icon">
          <ArrowLeftRight size={22} />
        </span>
        SkillSwap<span className="brand-period">.</span>
      </a>
      <span className="workspace-label">YOUR WORKSPACE</span>
      <nav>
        {[
          ['Discover', Compass],
          ['My matches', Sparkles],
          ['Connections', Users],
          ['My profile', BookOpen],
        ].map(([label, Icon]) => (
          <button
            key={label}
            className={`nav-item ${page === label ? 'active' : ''}`}
            onClick={() => onNavigate(label)}
          >
            <Icon size={19} />
            {label}
            {label === 'My matches' && (
              <span className="nav-count">{matchCount}</span>
            )}
            {label === 'Connections' && pendingCount > 0 && (
              <span className="nav-count">{pendingCount}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="sidebar-tip">
        <span className="tip-icon">
          <Sparkles size={19} />
        </span>
        <h4>
          A little give.
          <br />A lot to gain.
        </h4>
        <p>
          Your next skill starts with
          <br />a simple hello.
        </p>
        <button onClick={onEditProfile}>
          Share your skills <ArrowUpRight size={15} />
        </button>
        <div className="tip-orbit" />
      </div>
      <div className="sidebar-bottom">
        <div className="student-community">
          <span className="community-dot" /> Made for curious minds
        </div>
        {user ? (
          <button className="account" onClick={() => onNavigate('My profile')}>
            <Avatar student={user} small />
            <span>
              <strong>{user.name}</strong>
              <small>View your profile</small>
            </span>
            <ChevronDown size={15} />
          </button>
        ) : (
          <button className="primary" onClick={onSignIn}>
            Sign in
          </button>
        )}
      </div>
    </aside>
  );
}
