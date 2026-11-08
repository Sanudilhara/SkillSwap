import { Link } from 'react-router';
import PageHeading from '../../components/PageHeading.jsx';
import Avatar from '../../components/Avatar.jsx';

export default function MyProfilePage({ profile }) {
  return (
    <div>
      <PageHeading title="My Profile" description="A little about you, and everything you are curious about."><Link className="btn-primary text-sm" to="/app/profile/edit">Edit profile →</Link></PageHeading>
      <section className="panel overflow-hidden">
        <div className="page-gradient -mx-5 -mt-5 h-28 sm:-mx-6 sm:-mt-6" />
        <div className="relative -mt-10"><span className="inline-flex rounded-2xl border-4 border-white"><Avatar name={profile.name} large /></span></div>
        <h2 className="mt-4 text-2xl font-bold">{profile.name}</h2>
        <p className="mt-2 text-sm text-slate-500">{profile.field} · {profile.university}</p>
        <p className="mt-2 text-xs text-slate-400">{profile.location || 'Location not added'}</p>
        <h3 className="mt-8 font-bold">A little about me</h3><p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{profile.bio || 'Tell your future learning partners a little about yourself.'}</p>
      </section>
      <div className="mt-6 grid gap-6 md:grid-cols-2">{[['teach', 'What I can teach', 'bg-emerald-50 text-emerald-700'], ['learn', 'What I want to learn', 'bg-orange-50 text-orange-700']].map(([type, title, color]) => <section className="panel" key={type}><h2 className="font-bold">{title}</h2><div className="mt-5 flex flex-wrap gap-2">{profile[type].map(skill => <span className={`badge ${color}`} key={skill}>{skill}</span>)}{profile[type].length === 0 && <p className="text-sm text-slate-500">No skills added yet.</p>}</div><Link className="auth-link mt-6 inline-block text-xs" to="/app/skills">Manage skills →</Link></section>)}</div>
    </div>
  );
}
