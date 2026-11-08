import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import Brand from './Brand.jsx';
import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';

const navigation = [
  { label: 'Overview', items: [['Dashboard', 'dashboard', 'dashboard'], ['My Matches', 'matches', 'matches'], ['Discover Students', 'students', 'discover']] },
  { label: 'Learn together', items: [['Connections', 'connections', 'connections'], ['Messages', 'messages', 'messages'], ['Sessions', 'sessions', 'sessions'], ['Notifications', 'notifications', 'notifications'], ['Reviews', 'reviews', 'reviews']] },
  { label: 'Your space', items: [['My Profile', 'profile', 'profile'], ['Edit Profile', 'profile/edit', 'edit'], ['My Skills', 'skills', 'skills'], ['Settings', 'settings', 'settings']] },
];

export default function WorkspaceLayout({ profile, unreadCount, notice, onDismissNotice, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f8f9fd]" onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false); }}>
      <a href="#workspace-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:p-3">Skip to content</a>
      <div className="flex items-center justify-between border-b border-violet-100 bg-white px-5 py-4 lg:hidden">
        <Brand />
        <button className="rounded-lg p-2 text-violet-600" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="workspace-sidebar" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside id="workspace-sidebar" className={`${menuOpen ? 'block' : 'hidden'} border-r border-violet-100 bg-white p-5 lg:sticky lg:top-0 lg:block lg:h-dvh lg:overflow-y-auto`}>
          <div className="mb-8 hidden px-2 pt-2 lg:block"><Brand /></div>
          <nav aria-label="Workspace navigation" className="space-y-6">
            {navigation.map(group => (
              <div key={group.label}>
                <p className="mb-2 px-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{group.label}</p>
                <div className="space-y-1">
                  {group.items.map(([label, path, icon]) => (
                    <NavLink key={path} to={`/app/${path}`} end={path === 'profile'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${isActive ? 'bg-violet-50 text-violet-700' : 'text-slate-500 hover:bg-slate-50 hover:text-violet-600'}`}>
                      <Icon name={icon} className="size-[18px] shrink-0" />{label}
                      {path === 'notifications' && unreadCount > 0 && <span className="ml-auto rounded-full bg-pink-100 px-2 text-[10px] font-bold text-pink-700">{unreadCount}</span>}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <Link className="mt-7 flex items-center gap-3 border-t border-slate-100 px-3 pt-5 text-xs text-slate-500 hover:text-violet-600" to="/login"><Icon name="exit" className="size-4" />Leave preview</Link>
        </aside>
        <div className="min-w-0">
          <header className="flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-8">
            <div><p className="text-sm font-semibold">Hello, {profile.name.split(' ')[0]} <span aria-hidden="true">✦</span></p><p className="mt-0.5 text-xs text-slate-400">A little progress, every day.</p></div>
            <div className="flex items-center gap-4">
              <Link className="relative rounded-xl border border-slate-100 p-2.5 text-slate-500 hover:text-violet-600" aria-label={`Notifications, ${unreadCount} unread`} to="/app/notifications"><Icon name="notifications" />{unreadCount > 0 && <span className="absolute right-2 top-2 size-2 rounded-full bg-pink-500" />}</Link>
              <Link to="/app/profile" aria-label="View my profile"><Avatar name={profile.name} /></Link>
            </div>
          </header>
          <div className="border-b border-violet-100 bg-violet-50/70 px-5 py-2.5 text-[11px] leading-relaxed text-violet-700 sm:px-8"><strong>Demo workspace.</strong> Sample profiles and local actions. No account is signed in. Changes reset when you refresh.</div>
          <main id="workspace-content" tabIndex={-1} className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9">
            {notice && <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm text-violet-700"><p role="status">{notice}</p><button className="shrink-0 rounded p-1" onClick={onDismissNotice} aria-label="Dismiss notification"><Icon name="close" className="size-4" /></button></div>}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
