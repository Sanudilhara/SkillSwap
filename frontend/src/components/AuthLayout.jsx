export default function AuthLayout({ children }) {
  return (
    <div className="page-gradient px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <aside className="hidden lg:block">
          <p className="section-label">Made for curious minds</p>
          <h2 className="mt-6 text-5xl leading-tight font-bold tracking-tight">
            A little sharing.<br />
            <span className="gradient-text">A world of possibility.</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate-600">The thing you know could be someone else's next big discovery. Let's learn from each other.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-violet-700">&lt;/&gt; Coding</span>
            <span className="rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-pink-600">✦ Design</span>
            <span className="rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-orange-700">Aa Languages</span>
          </div>
          <div className="mt-10 rounded-2xl border border-white bg-white/60 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-violet-100 text-xl text-violet-600" aria-hidden="true">✧</span>
              <p className="font-semibold">Everyone has something to teach.</p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">Share a skill. Discover a new perspective. Make learning a little more human.</p>
          </div>
          <p className="mt-6 text-xs text-slate-500">Built around curiosity, connection, and a little kindness.</p>
        </aside>
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white bg-white/95 p-6 shadow-xl shadow-violet-200/40 sm:p-9">
          {children}
        </div>
      </div>
    </div>
  );
}
