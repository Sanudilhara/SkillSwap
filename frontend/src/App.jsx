import { Link, NavLink, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link className="brand" to="/">SkillSwap</Link>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={
            <section>
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </section>
          } />
        </Routes>
      </main>

      <footer>SkillSwap &middot; Learn together. Grow together.</footer>
    </div>
  );
}
