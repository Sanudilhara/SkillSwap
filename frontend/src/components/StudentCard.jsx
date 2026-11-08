import { Link } from 'react-router';
import Avatar from './Avatar.jsx';
import { getMatch } from '../utils/matches.js';

export default function StudentCard({ student, profile, connection, onConnect }) {
  const match = getMatch(profile, student);
  const active = connection && ['pending', 'accepted'].includes(connection.status);
  return (
    <article className="panel flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <Avatar name={student.name} color={student.color} />
        {match.mutual && <span className="badge bg-violet-50 text-violet-700">✦ Mutual match</span>}
      </div>
      <Link className="mt-4 font-bold hover:text-violet-600" to={`/app/students/${student.id}`}>{student.name}</Link>
      <p className="mt-1 text-xs text-slate-500">{student.university}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">{student.bio}</p>
      <div className="mt-5 space-y-3">
        <div><p className="mb-2 text-[10px] font-bold tracking-wide text-slate-400 uppercase">Can teach</p><div className="flex flex-wrap gap-1.5">{student.teach.map(skill => <span className="badge bg-emerald-50 text-emerald-700" key={skill}>{skill}</span>)}</div></div>
        <div><p className="mb-2 text-[10px] font-bold tracking-wide text-slate-400 uppercase">Wants to learn</p><div className="flex flex-wrap gap-1.5">{student.learn.map(skill => <span className="badge bg-orange-50 text-orange-700" key={skill}>{skill}</span>)}</div></div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        <Link className="btn-secondary flex-1 px-3 py-2 text-xs" to={`/app/students/${student.id}`}>View profile</Link>
        {active ? <Link className="btn-secondary flex-1 px-3 py-2 text-xs" to="/app/connections">{connection.status === 'accepted' ? 'Connected' : connection.direction === 'incoming' ? 'Respond' : 'Request sent'}</Link> : <button className="btn-primary flex-1 px-3 py-2 text-xs" onClick={() => onConnect(student.id)}>Connect</button>}
      </div>
    </article>
  );
}
