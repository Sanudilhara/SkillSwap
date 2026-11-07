import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div>
          <p className="eyebrow">A community built on sharing</p>
          <h1>Learn something new. Share what you know.</h1>
          <p className="hero-description">
            You have a skill someone wants to learn. They have one you have
            always wanted to try. Find your people and grow together.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/register">Get started</Link>
            <Link className="button button-secondary" to="/login">Log in</Link>
          </div>
        </div>
        <aside className="exchange-card" aria-label="An example skill exchange">
          <p className="eyebrow">A little exchange. A lot of possibility.</p>
          <div className="skill-example">
            <span className="skill-icon" aria-hidden="true">Aa</span>
            <div>
              <strong>Share your English skills</strong>
              <p>Help someone find their words.</p>
            </div>
          </div>
          <p className="exchange-label">Learn from each other</p>
          <div className="skill-example">
            <span className="skill-icon" aria-hidden="true">&lt;/&gt;</span>
            <div>
              <strong>Discover web development</strong>
              <p>Build something you are proud of.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="how-it-works" aria-labelledby="how-it-works-title">
        <p className="eyebrow">Better together</p>
        <h2 id="how-it-works-title">How SkillSwap works</h2>
        <div className="steps">
          <article>
            <span className="step-number">01</span>
            <h3>Share your skills</h3>
            <p>Tell the community what you can teach and what you want to learn.</p>
          </article>
          <article>
            <span className="step-number">02</span>
            <h3>Find a learning partner</h3>
            <p>Discover students with skills and interests that complement yours.</p>
          </article>
          <article>
            <span className="step-number">03</span>
            <h3>Learn together</h3>
            <p>Exchange knowledge, practice something new, and help each other grow.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
