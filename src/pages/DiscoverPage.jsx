import { useState } from 'react';
import StudentCard from '../components/StudentCard';
import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Sparkles,
  Users,
  BookOpen,
  ArrowLeftRight,
  X,
  Code2,
  Palette,
  Languages,
  Music2,
  Briefcase,
} from 'lucide-react';

const categories = [
  ['All skills', LayoutGrid],
  ['Technology', Code2],
  ['Design & Creative', Palette],
  ['Languages', Languages],
  ['Music & Arts', Music2],
  ['Business', Briefcase],
];
export default function DiscoverPage({
  page,
  students,
  connections,
  busy,
  onConnect,
  onViewProfile,
  onEditProfile,
  onNavigate,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All skills');
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedUniversity, setSelectedUniversity] =
    useState('All universities');
  const [showFilters, setShowFilters] = useState(false);

  function resetFilters() {
    setSearchQuery('');
    setSelectedCategory('All skills');
    setSelectedUniversity('All universities');
  }

  const visibleStudents = students.filter((student) => {
    const matchesPage = page !== 'My matches' || student.mutual;
    const matchesCategory =
      selectedCategory === 'All skills' ||
      student.category === selectedCategory;
    const matchesUniversity =
      selectedUniversity === 'All universities' ||
      student.university === selectedUniversity;
    const searchableText = [
      student.name,
      student.university,
      ...student.teach,
      ...student.learn,
    ]
      .join(' ')
      .toLowerCase();
    const matchesSearch = searchableText.includes(searchQuery.toLowerCase());
    return matchesPage && matchesCategory && matchesUniversity && matchesSearch;
  });
  if (sortBy === 'name')
    visibleStudents.sort((first, second) =>
      first.name.localeCompare(second.name),
    );

  const universities = [
    ...new Set(students.map((student) => student.university).filter(Boolean)),
  ];
  const skillCount = new Set(students.flatMap((student) => student.teach)).size;
  const connectedCount = connections.filter(
    (connection) => connection.status === 'accepted',
  ).length;

  function findMatches() {
    onNavigate('My matches');
    document
      .getElementById('discovery')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleEmptyStateClick() {
    if (page === 'My matches') onEditProfile();
    else resetFilters();
  }

  return (
    <>
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <Sparkles size={13} /> KNOWLEDGE GOES BOTH WAYS
          </span>
          <h2>
            Your next skill is
            <br />
            someone’s superpower.
          </h2>
          <p>
            Swap what you know for what you want to learn.
            <br />
            No price tags. Just possibilities.
          </p>
          <button onClick={findMatches}>
            Find my matches <ArrowRight size={16} />
          </button>
        </div>
        <div className="exchange-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-dot dot-one" />
          <div className="art-dot dot-two" />
          <div className="floating-skill skill-code">
            <span>
              <Code2 size={22} />
            </span>
            <div>
              <small>I can teach</small>
              <strong>Python</strong>
            </div>
            <i>✦</i>
          </div>
          <div className="exchange-circle">
            <ArrowLeftRight size={31} />
          </div>
          <div className="floating-skill skill-design">
            <span>
              <Palette size={22} />
            </span>
            <div>
              <small>I can teach</small>
              <strong>UI/UX Design</strong>
            </div>
            <i>✦</i>
          </div>
          <span className="art-star star-one">✧</span>
          <span className="art-star star-two">✦</span>
          <span className="art-caption">
            A little exchange. A whole new world.
          </span>
        </div>
      </section>
      <section className="stats-row">
        <div>
          <span className="stat-icon sage">
            <Users size={18} />
          </span>
          <p>
            <strong>
              {students.length + 1} <span>curious students</span>
            </strong>
            <small>And a place for you</small>
          </p>
        </div>
        <div>
          <span className="stat-icon peach">
            <BookOpen size={18} />
          </span>
          <p>
            <strong>
              {skillCount} <span>skills to explore</span>
            </strong>
            <small>From coding to creativity</small>
          </p>
        </div>
        <div>
          <span className="stat-icon lavender">
            <ArrowLeftRight size={18} />
          </span>
          <p>
            <strong>
              {connectedCount} <span>your connections</span>
            </strong>
            <small>Learning is better together</small>
          </p>
        </div>
      </section>
      <section id="discovery" className="discovery">
        <div className="section-title">
          <div>
            <h2>
              {page === 'My matches'
                ? 'Made for a skill swap'
                : 'Meet your next learning partner'}{' '}
              <span className="soft-count">{visibleStudents.length}</span>
            </h2>
            <p>
              {page === 'My matches'
                ? 'Partners with complementary teaching and learning interests.'
                : 'Different talents. Shared curiosity. Endless possibilities.'}
            </p>
          </div>
          <label className="sort-label">
            Sort by:{' '}
            <select
              aria-label="Sort students"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
        <div className="search-row">
          <label className="search-input">
            <Search size={19} />
            <input
              aria-label="Search students and skills"
              placeholder="Try ‘Python’, ‘Photography’, or a fellow student’s name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="icon-button"
                aria-label="Clear search"
                onClick={() => setSearchQuery('')}
              >
                <X size={15} />
              </button>
            )}
            <span className="search-hint">Explore a little</span>
          </label>
          <button
            className={`outline-button ${showFilters ? 'selected' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} /> Filters
            {selectedUniversity !== 'All universities' && (
              <span className="filter-dot" />
            )}
          </button>
        </div>
        {showFilters && (
          <div className="filter-panel">
            <label>
              University
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                <option>All universities</option>
                {universities.map((universityName) => (
                  <option key={universityName}>{universityName}</option>
                ))}
              </select>
            </label>
            <button className="text-button" onClick={resetFilters}>
              Reset filters
            </button>
          </div>
        )}
        <div className="category-row">
          {categories.map(([name, Icon]) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`category ${selectedCategory === name ? 'selected' : ''}`}
            >
              <Icon size={15} />
              {name}
            </button>
          ))}
        </div>
        <div className="cards-grid">
          {visibleStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              connection={connections.find(
                (connection) =>
                  connection.from === student.id ||
                  connection.to === student.id,
              )}
              busy={busy}
              onConnect={onConnect}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
        {!visibleStudents.length && (
          <div className="empty-state">
            <Search size={30} />
            <h3>
              {page === 'My matches'
                ? 'Your next match is out there'
                : 'No students found just yet'}
            </h3>
            <p>
              {page === 'My matches'
                ? 'Add more teaching and learning skills to find complementary partners.'
                : 'Try a different skill or broaden your filters.'}
            </p>
            <button className="outline-button" onClick={handleEmptyStateClick}>
              {page === 'My matches' ? 'Edit my skills' : 'Clear filters'}
            </button>
          </div>
        )}
        <div className="discovery-end">
          <span />
          <p>
            A world of knowledge, right on your campus <Sparkles size={13} />
          </p>
          <span />
        </div>
      </section>
    </>
  );
}
