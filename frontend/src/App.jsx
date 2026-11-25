import { Link, Navigate, Route, Routes } from 'react-router';
import Portal from './pages/workspace/Portal.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import PublicLayout from './components/PublicLayout.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/account"
          element={<Navigate to="/app/dashboard" replace />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="*"
          element={
            <section className="page-gradient px-5 py-28 text-center">
              <p className="section-label">A little detour</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight">
                Page not found
              </h1>
              <Link className="btn-primary mt-8" to="/">
                Return home <span aria-hidden="true">→</span>
              </Link>
            </section>
          }
        />
      </Route>
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <Portal />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
