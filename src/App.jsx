import { useEffect, useState } from 'react';
import { ArrowLeftRight, Heart, LoaderCircle, Plus, X } from 'lucide-react';
import api from './api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Modal from './components/Modal';
import AuthForm from './components/AuthForm';
import ProfileForm from './components/ProfileForm';
import StudentProfile from './components/StudentProfile';
import DiscoverPage from './pages/DiscoverPage';
import ConnectionsPage from './pages/ConnectionsPage';
import ProfilePage from './pages/ProfilePage';

const pageHeadings = {
  Discover: {
    title: 'Good things happen when you share.',
    description: 'Learn something new. Teach what you love. Find your people.',
  },
  'My matches': {
    title: 'Your skills. Their next chapter.',
    description:
      'You have something to teach each other. That’s a great place to start.',
  },
  Connections: {
    title: 'Start with a connection.',
    description: 'Meet your learning partners and manage your requests.',
  },
  'My profile': {
    title: 'A little more about you.',
    description: 'Let your curiosity introduce you to the right people.',
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [page, setPage] = useState('Discover');
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState('');
  const [authError, setAuthError] = useState('');

  async function loadWorkspace() {
    const [profile, studentList, connectionList] = await Promise.all([
      api('/me'),
      api('/students'),
      api('/connections'),
    ]);

    setUser(profile);
    setStudents(studentList);
    setConnections(connectionList);
  }

  useEffect(() => {
    async function initializeApp() {
      try {
        const health = await api('/health');
        setDemo(health.mode === 'demo');

        if (localStorage.getItem('skillswap-token')) {
          try {
            await loadWorkspace();
            return;
          } catch {
            // A token from a previous demo server may have expired.
            localStorage.removeItem('skillswap-token');
          }
        }

        if (health.mode === 'demo') {
          const session = await api('/auth/demo', { method: 'POST' });
          localStorage.setItem('skillswap-token', session.token);
          await loadWorkspace();
        } else {
          setModal({ type: 'login' });
        }
      } catch {
        setAuthError(
          'Cannot reach the server. Start the app with npm run dev.',
        );
      } finally {
        setLoading(false);
      }
    }

    initializeApp();
  }, []);

  useEffect(() => {
    if (!notice) return;

    const timeout = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(timeout);
  }, [notice]);

  function navigate(nextPage) {
    setPage(nextPage);
    setMenuOpen(false);
  }

  function openAuthForm(mode) {
    setAuthError('');
    setModal({ type: mode });
  }

  function openProfileForm() {
    if (user) {
      setModal({ type: 'profile' });
    } else {
      openAuthForm('register');
    }
  }

  function viewStudent(student) {
    setModal({ type: 'student', student });
  }

  function signOut() {
    localStorage.removeItem('skillswap-token');
    setUser(null);
    setStudents([]);
    setConnections([]);
    openAuthForm('login');
    navigate('Discover');
  }

  function findConnection(studentId) {
    return connections.find(
      (connection) =>
        connection.from === studentId || connection.to === studentId,
    );
  }

  async function sendConnectionRequest(student) {
    setBusy(student.id);

    try {
      await api('/connections', {
        method: 'POST',
        body: JSON.stringify({ to: student.id }),
      });
      await loadWorkspace();
      setNotice(`Connection request sent to ${student.name.split(' ')[0]}.`);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy('');
    }
  }

  async function respondToRequest(requestId, status) {
    setBusy(requestId);

    try {
      await api(`/connections/${requestId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      await loadWorkspace();
      setNotice(
        status === 'accepted' ? 'You’re connected!' : 'Request declined.',
      );
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy('');
    }
  }

  async function authenticate(event) {
    event.preventDefault();
    setAuthError('');
    setBusy('auth');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    try {
      const session = await api(`/auth/${modal.type}`, {
        method: 'POST',
        body: JSON.stringify(values),
      });
      localStorage.setItem('skillswap-token', session.token);
      await loadWorkspace();
      setModal(null);
      setNotice(`Welcome, ${session.user.name.split(' ')[0]}!`);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setBusy('');
    }
  }

  async function saveProfile(event) {
    event.preventDefault();
    setBusy('profile');

    const form = event.currentTarget;
    const profile = Object.fromEntries(new FormData(form));
    profile.teach = profile.teach
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);
    profile.learn = profile.learn
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    try {
      await api('/me', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
      await loadWorkspace();
      setModal(null);
      setNotice('Your profile has been updated.');
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy('');
    }
  }

  const pendingCount = connections.filter(
    (connection) => connection.incoming && connection.status === 'pending',
  ).length;
  const matchCount = students.filter((student) => student.mutual).length;
  const heading = pageHeadings[page];
  const isDiscoveryPage = page === 'Discover' || page === 'My matches';

  if (loading) {
    return (
      <div className="loading-screen">
        <span className="brand-icon">
          <ArrowLeftRight />
        </span>
        <h2>SkillSwap</h2>
        <LoaderCircle className="spin" />
        <p>Finding your learning community…</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {menuOpen && (
        <div className="sidebar-shade" onClick={() => setMenuOpen(false)} />
      )}
      <Sidebar
        menu={menuOpen}
        page={page}
        user={user}
        matchCount={matchCount}
        pendingCount={pendingCount}
        onNavigate={navigate}
        onEditProfile={openProfileForm}
        onSignIn={() => openAuthForm('login')}
      />

      <div className="main-shell">
        <Header
          page={page}
          demo={demo}
          user={user}
          pendingCount={pendingCount}
          onOpenMenu={() => setMenuOpen(true)}
          onNavigate={navigate}
        />

        <main>
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                <span /> THE STUDENT-TO-STUDENT COMMUNITY
              </div>
              <h1>{heading.title}</h1>
              <p>{heading.description}</p>
            </div>
            {page !== 'My profile' && (
              <button
                className="outline-button edit-skills"
                onClick={openProfileForm}
              >
                <Plus size={16} /> Add your skills
              </button>
            )}
          </div>

          {isDiscoveryPage && (
            <DiscoverPage
              key={page}
              page={page}
              students={students}
              connections={connections}
              busy={busy}
              onConnect={sendConnectionRequest}
              onViewProfile={viewStudent}
              onEditProfile={openProfileForm}
              onNavigate={navigate}
            />
          )}

          {page === 'Connections' && (
            <ConnectionsPage
              connections={connections}
              busy={busy}
              onRespond={respondToRequest}
              onViewProfile={viewStudent}
              onNavigate={navigate}
            />
          )}

          {page === 'My profile' && user && (
            <ProfilePage
              user={user}
              demo={demo}
              onEditProfile={openProfileForm}
              onSignIn={() => openAuthForm('login')}
              onSignOut={signOut}
            />
          )}

          {!user && (
            <div className="empty-state">
              <h2>Welcome to SkillSwap</h2>
              <p>{authError || 'Sign in to meet your learning community.'}</p>
              <button className="primary" onClick={() => openAuthForm('login')}>
                Sign in
              </button>
            </div>
          )}

          <footer className="page-footer">
            <span>Learn together. Grow together.</span>
            <span>
              Made for students, by curious minds. <Heart size={12} />
            </span>
          </footer>
        </main>
      </div>

      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button
            className="icon-button"
            aria-label="Dismiss notification"
            onClick={() => setNotice('')}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {modal && (
        <Modal canClose={Boolean(user)} onClose={() => setModal(null)}>
          {modal.type === 'student' && (
            <StudentProfile
              student={modal.student}
              connection={findConnection(modal.student.id)}
              busy={busy}
              onConnect={sendConnectionRequest}
            />
          )}

          {modal.type === 'profile' && user && (
            <ProfileForm user={user} busy={busy} onSave={saveProfile} />
          )}

          {(modal.type === 'login' || modal.type === 'register') && (
            <AuthForm
              mode={modal.type}
              busy={busy}
              error={authError}
              demo={demo}
              onSubmit={authenticate}
              onChangeMode={openAuthForm}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
