import Avatar from './Avatar';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';

export default function StudentProfile({
  student,
  connection,
  busy,
  onConnect,
}) {
  return (
    <>
      <Avatar student={student} />
      <h2 id="modal-title">{student.name}</h2>
      <p className="university">
        <GraduationCap size={15} />
        {student.university}
      </p>
      <p className="modal-bio">{student.bio}</p>
      <p className="skill-label">CAN TEACH</p>
      <div className="tags">
        {student.teach.map((skill) => (
          <span className="tag teach" key={skill}>
            {skill}
          </span>
        ))}
      </div>
      <p className="skill-label modal-learn">WANTS TO LEARN</p>
      <div className="tags">
        {student.learn.map((skill) => (
          <span className="tag learn" key={skill}>
            {skill}
          </span>
        ))}
      </div>
      {student.mutual && (
        <p className="match-explanation">
          <Sparkles size={17} /> You can help each other learn. A great match!
        </p>
      )}
      <button
        className="primary full-width"
        disabled={Boolean(connection) || busy === student.id}
        onClick={() => onConnect(student)}
      >
        {connection ? 'Request already made' : 'Send connection request'}
        <ArrowRight size={16} />
      </button>
    </>
  );
}
