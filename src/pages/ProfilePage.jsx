import Avatar from '../components/Avatar';
import { ArrowUpRight, GraduationCap, LogOut } from 'lucide-react';

export default function ProfilePage({
  user,
  demo,
  onEditProfile,
  onSignIn,
  onSignOut,
}) {
  return (
    <section className="profile-page">
      <div className="profile-cover">
        <div className="profile-cover-art">✧</div>
      </div>
      <div className="profile-page-body">
        <div className="profile-title">
          <Avatar student={user} />
          <button className="outline-button" onClick={onEditProfile}>
            Edit profile <ArrowUpRight size={16} />
          </button>
        </div>
        <h2>{user.name}</h2>
        <p className="university">
          <GraduationCap size={16} />
          {user.university || 'Add your university'}
          {user.field && ` · ${user.field}`}
        </p>
        <p className="profile-bio">
          {user.bio ||
            'Share a little about yourself so other students can get to know you.'}
        </p>
        <div className="profile-skills">
          <div>
            <span className="skill-label">WHAT I CAN TEACH</span>
            <div className="tags">
              {user.teach.map((skill) => (
                <span className="tag teach" key={skill}>
                  {skill}
                </span>
              ))}
              {!user.teach.length && <p>No skills added yet.</p>}
            </div>
          </div>
          <div>
            <span className="skill-label">WHAT I WANT TO LEARN</span>
            <div className="tags">
              {user.learn.map((skill) => (
                <span className="tag learn" key={skill}>
                  {skill}
                </span>
              ))}
              {!user.learn.length && <p>What are you curious about?</p>}
            </div>
          </div>
        </div>
        <div className="profile-account">
          {demo && (
            <p>Demo workspace · Data resets when the server restarts.</p>
          )}
          <button className="text-button" onClick={onSignIn}>
            Sign in to another account
          </button>
          <button className="text-button" onClick={onSignOut}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>
    </section>
  );
}
