import { Link } from 'react-router';

const skills = [
  { name: 'Web development', icon: '</>', description: 'Bring your ideas to the web.', color: 'bg-violet-100 text-violet-600' },
  { name: 'Design', icon: '✦', description: 'Make something worth a second look.', color: 'bg-pink-100 text-pink-600' },
  { name: 'Languages', icon: 'Aa', description: 'Find a whole new way to connect.', color: 'bg-orange-100 text-orange-600' },
  { name: 'Music', icon: '♫', description: 'Turn a little practice into a melody.', color: 'bg-sky-100 text-sky-600' },
  { name: 'Data & analytics', icon: '↗', description: 'Discover the stories behind numbers.', color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Photography', icon: '◎', description: 'See the everyday a little differently.', color: 'bg-amber-100 text-amber-700' },
];

export default function HomePage() {
  return (
    <div>
      <section className="page-gradient overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[650px] lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/85 px-4 py-1.5 text-[10px] font-bold tracking-wide text-violet-600 uppercase shadow-sm sm:text-xs">
              <span className="size-2 rounded-full bg-linear-to-r from-orange-300 to-pink-400" aria-hidden="true" />
              A community built on sharing
            </p>
            <h1 className="mt-7 text-[42px] leading-[1.08] font-bold tracking-[-1.8px] sm:text-6xl lg:text-[58px] xl:text-[64px]">
              Learn something<br />
              <span className="decoration-amber-200 decoration-6 underline underline-offset-4">new.</span><br />
              <span className="gradient-text">Share what you<br className="hidden xl:block" /> know.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              You have a skill someone wants to learn. They have one you have always wanted to try. Find your people and grow together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="btn-primary" to="/register">Get started <span aria-hidden="true">→</span></Link>
              <a className="btn-secondary" href="#how-it-works">How it works</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/60 pt-6 text-xs text-slate-600">
              <span className="flex items-center gap-2"><span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-600" aria-hidden="true">✓</span>Free reciprocal exchange</span>
              <span className="flex items-center gap-2"><span className="text-base text-violet-500" aria-hidden="true">✦</span>Real people. Shared curiosity.</span>
            </div>
          </div>

          <aside className="rounded-3xl border border-white bg-linear-to-b from-white to-violet-50/90 p-5 shadow-2xl shadow-fuchsia-900/10 sm:p-7" aria-label="An example skill exchange">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] font-bold tracking-wide text-violet-700 uppercase">A little exchange. A lot of possibility.</p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[9px] font-bold tracking-wide text-emerald-700 uppercase">Example match</span>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm shadow-violet-100">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white shadow-md shadow-violet-200" aria-hidden="true">Aa</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-sm font-bold sm:text-base">Share your English skills</h2>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Teaching</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">Help someone find their words.</p>
                  <p className="mt-3 text-[10px] text-slate-500"><span className="font-semibold text-violet-600">Partner: Elena R.</span><span className="mx-2">·</span>English enthusiast</p>
                </div>
              </div>
            </div>
            <div className="relative my-5 flex justify-center">
              <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-violet-200" />
              <span className="relative rounded-full bg-linear-to-r from-violet-600 via-pink-500 to-orange-400 px-4 py-1.5 text-[10px] font-bold text-white shadow-md shadow-pink-200"><span className="mr-2" aria-hidden="true">↕</span>Learn from each other</span>
            </div>
            <div className="rounded-2xl border border-pink-200 bg-white p-5 shadow-sm shadow-pink-100">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-pink-500 to-orange-400 text-lg font-bold text-white shadow-md shadow-orange-200" aria-hidden="true">&lt;/&gt;</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-sm font-bold sm:text-base">Discover web development</h2>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">Learning</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">Build something you are proud of.</p>
                  <p className="mt-3 text-[10px] text-slate-500"><span className="font-semibold text-pink-600">Partner: Marcus T.</span><span className="mx-2">·</span>Frontend enthusiast</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
              <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-300" />Illustrative profiles</span>
              <span className="font-semibold text-violet-600">1:1 knowledge exchange</span>
            </div>
          </aside>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="section-label">Big possibilities. Simple beginnings.</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A new skill is a connection away.</h2>
          <p className="mt-4 text-slate-500">A little of your time. A little of their know-how. Something great together.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-violet-100 bg-violet-50/60 p-7">
            <span className="flex size-11 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-600">01</span>
            <h3 className="mt-5 text-lg font-bold">Share your skills</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Tell the community what you can teach and what you would love to learn.</p>
          </article>
          <article className="rounded-2xl border border-pink-100 bg-pink-50/60 p-7">
            <span className="flex size-11 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">02</span>
            <h3 className="mt-5 text-lg font-bold">Find your people</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Discover students whose skills and interests complement your own.</p>
          </article>
          <article className="rounded-2xl border border-orange-100 bg-orange-50/60 p-7">
            <span className="flex size-11 items-center justify-center rounded-xl bg-orange-100 font-bold text-orange-600">03</span>
            <h3 className="mt-5 text-lg font-bold">Grow together</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Exchange knowledge, try something new, and celebrate the little breakthroughs.</p>
          </article>
        </div>
      </section>

      <section id="explore-skills" className="border-y border-violet-100 bg-slate-50/70 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="section-label">Follow your curiosity</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What will you learn next?</h2>
          <p className="mt-4 text-slate-500">Explore a few possibilities for your next skill exchange.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <article key={skill.name} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-xl font-bold ${skill.color}`} aria-hidden="true">{skill.icon}</span>
                <div><h3 className="font-bold">{skill.name}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{skill.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="px-5 py-20 sm:px-8">
        <div className="page-gradient mx-auto max-w-6xl rounded-3xl border border-violet-100 px-6 py-14 text-center sm:px-12">
          <p className="section-label">Your people are out there</p>
          <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">Different skills. Shared possibilities.</h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-600">You do not have to be an expert to make a difference. Bring your curiosity, share what you know, and discover what you can do together.</p>
          <Link className="btn-primary mt-8" to="/register">Find your next chapter <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}
