import PageHeading from '../../components/PageHeading.jsx';

export default function MySkillsPage({ profile, onAdd, onRemove }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (onAdd(data.get('type'), data.get('skill').trim())) form.reset();
  }
  return (
    <div>
      <PageHeading title="My Skills" description="The things you know. The things you cannot wait to try." />
      <form className="panel mb-6" onSubmit={handleSubmit}>
        <h2 className="mb-5 font-bold">Add a little possibility</h2>
        <div className="grid items-end gap-4 sm:grid-cols-[1fr_1fr_auto]">
          <div><label className="form-label" htmlFor="skill-name">Skill name</label><input className="form-input" id="skill-name" name="skill" placeholder="e.g. Photography" maxLength={40} pattern=".*\S.*" required /></div>
          <div><label className="form-label" htmlFor="skill-type">I would like to</label><select className="form-input" id="skill-type" name="type"><option value="teach">Teach this skill</option><option value="learn">Learn this skill</option></select></div>
          <button className="btn-primary text-sm" type="submit">Add skill +</button>
        </div>
      </form>
      <div className="grid gap-6 md:grid-cols-2">{[['teach', 'Skills I can teach', 'bg-emerald-50 text-emerald-700'], ['learn', 'Skills I want to learn', 'bg-orange-50 text-orange-700']].map(([type, title, color]) => <section className="panel" key={type}><h2 className="font-bold">{title} <span className="ml-2 text-xs font-normal text-slate-400">{profile[type].length} skills</span></h2><div className="mt-5 flex flex-wrap gap-2">{profile[type].map(skill => <span className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium ${color}`} key={skill}>{skill}<button className="rounded px-1 text-base" type="button" aria-label={`Remove ${skill} from ${type === 'teach' ? 'teaching' : 'learning'} skills`} onClick={() => onRemove(type, skill)}>×</button></span>)}{profile[type].length === 0 && <p className="text-sm text-slate-500">No skills yet. Add your first one above.</p>}</div></section>)}</div>
      <p className="mt-6 text-xs leading-relaxed text-slate-500">Tip: use the same skill names as other students. Mutual matches update as you change your skills. Skill names ignore letter case.</p>
    </div>
  );
}
