import { Link, useParams } from 'react-router';
import Avatar from '../../components/Avatar.jsx';
import PageHeading from '../../components/PageHeading.jsx';
import { students } from '../../data/demoData.js';
import { getMatch } from '../../utils/matches.js';

export default function StudentDetailsPage({ profile, connections, onConnect }) {
  const { studentId } = useParams();
  const student = students.find(item => item.id === studentId);
  if (!student) return <div><PageHeading title="Student not found" description="This sample profile does not exist." /><Link className="auth-link" to="/app/students">Back to discovery</Link></div>;
  const connection = connections.find(item => item.studentId === studentId);
  const active = connection && ['pending', 'accepted'].includes(connection.status);
  const match = getMatch(profile, student);
  return (
    <div>
      <Link className="auth-link mb-5 inline-block text-xs" to="/app/students">← Back to discovery</Link>
      <PageHeading title="Student Profile Details" description="Get to know a possible learning partner." />
      <section className="panel">
        <div className="flex flex-wrap items-center justify-between gap-5"><div className="flex items-center gap-4"><Avatar name={student.name} color={student.color} large /><div><h2 className="text-xl font-bold">{student.name}</h2><p className="mt-2 text-sm text-slate-500">{student.field}</p><p className="mt-1 text-xs text-slate-400">{student.university}</p></div></div>{match.mutual && <span className="badge bg-violet-50 text-violet-700">✦ Mutual match</span>}</div>
        <h3 className="mt-7 font-bold">About {student.name.split(' ')[0]}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{student.bio}</p><p className="mt-4 text-xs text-slate-400">{student.location} · Sample profile</p>
        <div className="mt-6 flex flex-wrap gap-3">{active ? <Link className="btn-secondary text-sm" to="/app/connections">{connection.status === 'accepted' ? 'Connected' : connection.direction === 'incoming' ? 'Respond to request' : 'Request sent'}</Link> : <button className="btn-primary text-sm" onClick={() => onConnect(studentId)}>Send connection request</button>}{connection?.status === 'accepted' && <Link className="btn-primary text-sm" to={`/app/messages?student=${student.id}`}>Send message →</Link>}</div>
      </section>
      <div className="mt-6 grid gap-6 md:grid-cols-2">{[['teach', 'Can teach', 'bg-emerald-50 text-emerald-700'], ['learn', 'Wants to learn', 'bg-orange-50 text-orange-700']].map(([type, title, color]) => <section className="panel" key={type}><h2 className="font-bold">{title}</h2><div className="mt-5 flex flex-wrap gap-2">{student[type].map(skill => <span className={`badge ${color}`} key={skill}>{skill}</span>)}</div></section>)}</div>
      <section className="panel mt-6"><h2 className="font-bold">Your exchange possibilities</h2><p className="mt-3 text-sm text-slate-600">You can learn: <strong>{match.canLearn.join(', ') || 'No shared learning skills yet'}</strong></p><p className="mt-2 text-sm text-slate-600">You can teach: <strong>{match.canTeach.join(', ') || 'No shared teaching skills yet'}</strong></p></section>
    </div>
  );
}
