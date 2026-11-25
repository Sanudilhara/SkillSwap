import { NavLink } from 'react-router';
import Icon from './Icon.jsx';
import Brand from './Brand.jsx';

export const sidebarGroups = [
  {
    title: 'Main',
    links: [
      { label: 'Dashboard', path: 'dashboard', icon: 'dashboard' },
      { label: 'Discover Students', path: 'students', icon: 'discover' },
      { label: 'My Matches', path: 'matches', icon: 'people' },
      { label: 'My Profile', path: 'profile', icon: 'profile' },
    ],
  },
  {
    title: 'My Learning',
    links: [
      { label: 'My Skills', path: 'skills', icon: 'book' },
      { label: 'Connection Requests', path: 'requests', icon: 'mail' },
      { label: 'My Connections', path: 'connections', icon: 'user-check' },
      { label: 'Sessions', path: 'sessions', icon: 'sessions' },
      { label: 'Messages', path: 'messages', icon: 'messages' },
      { label: 'Reviews', path: 'reviews', icon: 'reviews' },
    ],
  },
  {
    title: 'Other',
    links: [
      { label: 'Notifications', path: 'notifications', icon: 'notifications' },
      { label: 'Settings', path: 'settings', icon: 'gear' },
    ],
  },
];

export default function Sidebar({ open, onClose, onLogout, unreadCount = 0 }) {
  return (
    <aside
      id="workspace-sidebar"
      className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 flex-col overflow-y-auto border-r border-violet-100 bg-linear-to-b from-white via-white to-violet-50 shadow-xl shadow-violet-950/5 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:shadow-none ${open ? 'flex' : 'hidden'}`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-violet-100/70 px-6 py-6">
        <div>
          <Brand />
          <p className="mt-2 pl-12 text-[11px] font-medium text-slate-400">
            Learn. Share. Grow.
          </p>
        </div>
        <button
          type="button"
          className="-mr-3 rounded-xl p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <Icon name="close" className="size-4" />
        </button>
      </div>
      <nav
        aria-label="Workspace navigation"
        className="flex-1 space-y-6 px-3 py-6"
      >
        {sidebarGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-2 px-3 text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
              {group.title}
            </h2>
            <div className="space-y-1">
              {group.links.map((link) => (
                <NavLink
                  key={link.path}
                  to={`/app/${link.path}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${isActive ? 'bg-linear-to-r from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-200/70' : 'text-slate-600 hover:bg-violet-100/60 hover:text-violet-700'}`
                  }
                >
                  <Icon
                    name={link.icon}
                    className="size-[18px] shrink-0 opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <span>{link.label}</span>
                  {link.path === 'notifications' && unreadCount > 0 && (
                    <span className="ml-auto rounded-full bg-fuchsia-100 px-2 py-0.5 text-[10px] font-bold text-fuchsia-700">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="shrink-0 border-t border-violet-100 px-3 py-4">
        <button
          type="button"
          className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
          onClick={onLogout}
        >
          <Icon name="exit" className="size-[18px] shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
