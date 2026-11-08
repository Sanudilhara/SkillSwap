import { Link } from 'react-router';
import PageHeading from '../../components/PageHeading.jsx';
import Icon from '../../components/Icon.jsx';
import Avatar from '../../components/Avatar.jsx';
import StudentCard from '../../components/StudentCard.jsx';
import { students } from '../../data/demoData.js';

export default function DashboardPage({ profile, matches, connections, sessions, onConnect }) {
  const upcoming = sessions.filter(session => session.status === 'upcoming');
  const stats = [
    { label: 'Skills to share', value: profile.teach.length, icon: 'skills', path: '/app/skills', color: 'bg-violet-100 text-violet-600' },
    { label: 'Mutual matches', value: matches.length, icon: 'matches', path: '/app/matches', color: 'bg-pink-100 text-pink-600' },
    { label: 'Connections', value: connections.filter(item => item.status === 'accepted').length, icon: 'connections', path: '/app/connections', color: 'bg-orange-100 text-orange-600' },
    { label: 'Upcoming sessions', value: upcoming.length, icon: 'sessions', path: '/app/sessions', color: 'bg-sky-100 text-sky-600' },
  ];
  return (
    <div>
      <PageHeading title="Dashboard" description="Your next little breakthrough starts here." />
      <section className="page-gradient mb-7 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-violet-100 p-6 sm:p-8">
        <div><p className="section-label">Keep your curiosity going</p><h2 className="mt-3 text-2xl font-bold tracking-tight">You have something worth sharing.</h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">Meet a new learning partner, share a skill, and make a little progress together.</p></div>
        <Link className="btn-primary text-sm" to="/app/students">Discover students <Icon name="arrow" className="size-4" /></Link>
      </section>
      <div className="mb-9 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map(stat => <Link className="panel transition hover:border-violet-200" key={stat.label} to={stat.path}><span className={`mb-4 inline-flex rounded-xl p-2.5 ${stat.color}`}><Icon name={stat.icon} /></span><p className="text-3xl font-bold">{stat.value}</p><p className="mt-2 text-xs text-slate-500">{stat.label}</p></Link>)}
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-bold">People you could learn with</h2><Link className="auth-link text-xs" to="/app/matches">View all matches →</Link></div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{matches.slice(0, 3).map(student => <StudentCard key={student.id} student={student} profile={profile} connection={connections.find(item => item.studentId === student.id)} onConnect={onConnect} />)}</div>
      {matches.length === 0 && <div className="empty-state">Add teaching and learning skills to find reciprocal matches. <Link className="auth-link" to="/app/skills">Update my skills</Link></div>}
      <div className="mb-5 mt-9 flex items-center justify-between gap-3"><h2 className="text-lg font-bold">Your next sessions</h2><Link className="auth-link text-xs" to="/app/sessions">View sessions →</Link></div>
      <div className="panel space-y-5">
        {upcoming.length === 0 && <p className="text-sm text-slate-500">No upcoming sessions. Plan a little time to learn together.</p>}
        {upcoming.slice(0, 3).map(session => { const student = students.find(item => item.id === session.studentId); return <div className="flex flex-wrap items-center gap-4" key={session.id}><Avatar name={student.name} color={student.color} /><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{session.topic}</p><p className="mt-1 text-xs text-slate-500">With {student.name} · {session.date} at {session.time}</p></div><span className="badge bg-sky-50 text-sky-700">{session.duration} minutes</span></div>; })}
      </div>
    </div>
  );
}
