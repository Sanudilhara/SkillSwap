import { Link, NavLink, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import Brand from './components/Brand.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3" href="#main-content">Skip to content</a>
      <header className="relative z-10 border-b border-violet-100/70 bg-white/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Brand />
          <nav className="order-3 flex w-full justify-center gap-5 text-xs font-medium text-slate-600 sm:gap-7 sm:text-sm lg:order-none lg:w-auto" aria-label="Main navigation">
            <NavLink className={({ isActive }) => isActive ? 'border-b-2 border-violet-500 pb-1 text-violet-600' : 'pb-1 hover:text-violet-600'} to="/" end>Home</NavLink>
            <a className="hover:text-violet-600" href="/#how-it-works">How it works</a>
            <a className="hover:text-violet-600" href="/#explore-skills">Explore skills</a>
            <a className="hover:text-violet-600" href="/#community">Community</a>
          </nav>
          <div className="flex items-center gap-4 text-sm font-semibold sm:gap-6">
            <NavLink className="text-slate-700 hover:text-violet-600" to="/login">Log in</NavLink>
            <Link className="btn-primary px-5 py-2.5 text-sm" to="/register">Register</Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={
            <section className="page-gradient px-5 py-28 text-center">
              <p className="section-label">A little detour</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight">Page not found</h1>
              <Link className="btn-primary mt-8" to="/">Return home <span aria-hidden="true">→</span></Link>
            </section>
          } />
        </Routes>
      </main>

      <footer className="border-t border-violet-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:px-8 lg:px-10">
          <p>© {new Date().getFullYear()} SkillSwap. A little sharing goes a long way.</p>
          <div className="flex gap-6">
            <Link className="hover:text-violet-600" to="/about">About SkillSwap</Link>
            <Link className="hover:text-violet-600" to="/forgot-password">Forgot password?</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
