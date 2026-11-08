import { useState } from 'react';
import PageHeading from '../../components/PageHeading.jsx';
import StudentCard from '../../components/StudentCard.jsx';
import { students } from '../../data/demoData.js';

export default function DiscoverStudentsPage({ profile, connections, onConnect }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const filtered = students.filter(student => {
    const text = [student.name, student.university, ...student.teach, ...student.learn].join(' ').toLowerCase();
    return text.includes(search.trim().toLowerCase()) && (category === 'All categories' || student.category === category);
  });
  return (
    <div>
      <PageHeading title="Discover Students" description="Different skills. Shared possibilities. Find someone you can learn with." />
      <div className="panel mb-6 grid gap-4 sm:grid-cols-[1fr_220px]">
        <div><label className="form-label" htmlFor="student-search">Search the community</label><input className="form-input" id="student-search" type="search" placeholder="Search names, universities, or skills..." value={search} onChange={event => setSearch(event.target.value)} /></div>
        <div><label className="form-label" htmlFor="student-category">Skill category</label><select className="form-input" id="student-category" value={category} onChange={event => setCategory(event.target.value)}>{['All categories', 'Technology', 'Design', 'Photography', 'Music', 'Languages'].map(item => <option key={item}>{item}</option>)}</select></div>
      </div>
      <p className="mb-4 text-xs text-slate-500">{filtered.length} sample {filtered.length === 1 ? 'student' : 'students'} found</p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map(student => <StudentCard key={student.id} student={student} profile={profile} connection={connections.find(item => item.studentId === student.id)} onConnect={onConnect} />)}</div>
      {filtered.length === 0 && <div className="empty-state"><p>No students match those filters. Try a different skill or name.</p><button className="auth-link mt-3" onClick={() => { setSearch(''); setCategory('All categories'); }}>Clear filters</button></div>}
    </div>
  );
}
