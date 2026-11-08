import { Link } from 'react-router';
import PageHeading from '../../components/PageHeading.jsx';
import StudentCard from '../../components/StudentCard.jsx';

export default function MyMatchesPage({ profile, matches, connections, onConnect }) {
  return (
    <div>
      <PageHeading title="My Matches" description="You have something to teach each other. That is a great place to start."><Link className="btn-secondary text-sm" to="/app/skills">Update my skills</Link></PageHeading>
      <div className="mb-6 rounded-xl border border-violet-100 bg-violet-50 p-4 text-xs leading-relaxed text-violet-700">A mutual match teaches at least one skill you want to learn, and wants to learn at least one skill you teach. You have <strong>{matches.length} mutual {matches.length === 1 ? 'match' : 'matches'}</strong>.</div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{matches.map(student => <StudentCard key={student.id} student={student} profile={profile} connection={connections.find(item => item.studentId === student.id)} onConnect={onConnect} />)}</div>
      {matches.length === 0 && <div className="empty-state"><p>No mutual matches yet. Add a few skills to open up more possibilities.</p><Link className="auth-link mt-3 inline-block" to="/app/skills">Add your skills →</Link></div>}
    </div>
  );
}
