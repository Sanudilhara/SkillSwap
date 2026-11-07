import { Link } from 'react-router';

export default function HomePage() {
  return (
    <section>
      <p className="eyebrow">Welcome to SkillSwap</p>
      <h1>Learn something new. Share what you know.</h1>
      <p>A place for students to exchange skills and learn from each other.</p>
      <Link className="button" to="/about">About SkillSwap</Link>
    </section>
  );
}
