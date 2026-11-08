import { Link } from 'react-router';

export default function AboutPage() {
  return (
    <section className="page-gradient px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="section-label">About SkillSwap</p>
        <h1 className="mt-5 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">Everyone has<br /><span className="gradient-text">something to teach.</span></h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">SkillSwap brings students together to share knowledge and discover new skills. The project is currently in its initial development phase.</p>
        <Link className="btn-primary mt-8" to="/register">Find your people <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
