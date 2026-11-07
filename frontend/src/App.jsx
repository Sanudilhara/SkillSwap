import { Link, NavLink, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link className="brand" to="/">SkillSwap</Link>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink className="nav-register" to="/register">Register</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={
            <section>
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </section>
          } />
        </Routes>
      </main>

      <footer>
        <span>SkillSwap &middot; Learn together. Grow together.</span>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </footer>
    </div>
  );
}
