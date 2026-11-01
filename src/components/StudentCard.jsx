import Avatar from './Avatar';
import {
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Plus,
  Check,
  GraduationCap,
  LoaderCircle,
} from 'lucide-react';

export default function StudentCard({
  student,
  connection,
  busy,
  onConnect,
  onViewProfile,
}) {
  const isBusy = busy === student.id;
  let connectionLabel = 'Connect';
  if (connection) {
    if (connection.status === 'accepted') connectionLabel = 'Connected';
    else if (connection.status === 'rejected') connectionLabel = 'Declined';
    else if (connection.incoming) connectionLabel = 'Received';
    else connectionLabel = 'Requested';
  }
  return (
    <article className="student-card">
      <div className="card-top">
        <Avatar student={student} />
        <button
          className="icon-button profile-arrow"
          aria-label={`View ${student.name}'s profile`}
          onClick={() => onViewProfile(student)}
        >
          <ArrowUpRight size={19} />
        </button>
        {student.mutual && (
          <span className="match-tag">
            <Sparkles size={11} /> Great match
          </span>
        )}
      </div>
      <button className="name-button" onClick={() => onViewProfile(student)}>
        <h3>{student.name}</h3>
      </button>
      <p className="university">
        <GraduationCap size={14} />
        {student.university}
      </p>
      <p className="bio">{student.bio}</p>
      <div className="skill-group">
        <span className="skill-label">
          <ArrowUpRight size={12} /> CAN TEACH
        </span>
        <div className="tags">
          {student.teach.map((skill) => (
            <span className="tag teach" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="skill-group">
        <span className="skill-label learn-label">
          <BookOpen size={11} /> WANTS TO LEARN
        </span>
        <div className="tags">
          {student.learn.map((skill) => (
            <span className="tag learn" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <span>
          <span className="online-dot" /> Open to exchange
        </span>
        <button
          className={`connect-button ${connection ? 'requested' : ''}`}
          disabled={Boolean(connection) || isBusy}
          onClick={() => onConnect(student)}
        >
          {isBusy && <LoaderCircle size={14} className="spin" />}
          {!isBusy && connection && <Check size={14} />}
          {!isBusy && !connection && <Plus size={14} />} {connectionLabel}
        </button>
      </div>
    </article>
  );
}
