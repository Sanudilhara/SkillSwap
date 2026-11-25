import { Link, NavLink, Outlet } from 'react-router';
import Brand from './Brand.jsx';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3"
        href="#main-content"
      >
        Skip to content
      </a>
      <header className="relative z-10 border-b border-violet-100/70 bg-white/95">
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Brand />
          <nav
            className="order-3 flex w-full justify-center gap-5 text-xs font-medium text-slate-600 sm:gap-7 sm:text-sm lg:order-none lg:w-auto"
            aria-label="Main navigation"
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'border-b-2 border-violet-500 pb-1 text-violet-600'
                  : 'pb-1 hover:text-violet-600'
              }
              to="/"
              end
            >
              Home
            </NavLink>
            <NavLink className="hover:text-violet-600" to="/about">
              About
            </NavLink>
            <a className="hover:text-violet-600" href="/#how-it-works">
              How it works
            </a>
          </nav>
          <div className="flex items-center gap-4 text-sm font-semibold sm:gap-6">
            <NavLink
              className="text-slate-700 hover:text-violet-600"
              to="/login"
            >
              Log in
            </NavLink>
            <Link className="btn-primary px-5 py-2.5 text-sm" to="/register">
              Register
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex flex-1 flex-col" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="border-t border-violet-100 bg-white">
        <div className="site-container flex flex-col items-center justify-between gap-5 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} SkillSwap. A little sharing goes a long
            way.
          </p>
          <div className="flex gap-6">
            <Link className="hover:text-violet-600" to="/account">
              My account
            </Link>
            <Link className="hover:text-violet-600" to="/about">
              About SkillSwap
            </Link>
            <Link className="hover:text-violet-600" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
