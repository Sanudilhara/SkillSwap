import { Check } from 'lucide-react';

export default function ProfileForm({ user, busy, onSave }) {
  return (
    <form onSubmit={onSave}>
      <span className="eyebrow">MAKE YOURSELF KNOWN</span>
      <h2 id="modal-title">Your story starts here.</h2>
      <p className="form-description">
        Share what you know and what you’re curious about.
      </p>
      <div className="form-grid">
        <label>
          Your name
          <input name="name" defaultValue={user.name} required maxLength={80} />
        </label>
        <label>
          University
          <input
            name="university"
            defaultValue={user.university}
            maxLength={120}
          />
        </label>
      </div>
      <label>
        Field of study
        <input
          name="field"
          defaultValue={user.field}
          maxLength={120}
          placeholder="e.g. Computer Science"
        />
      </label>
      <label>
        About you
        <textarea
          name="bio"
          defaultValue={user.bio}
          maxLength={1000}
          rows={3}
          placeholder="A little about you and how you like to learn…"
        />
      </label>
      <label>
        Profile picture URL <span>(optional)</span>
        <input
          name="picture"
          type="url"
          defaultValue={user.picture}
          placeholder="https://…"
          maxLength={500}
        />
      </label>
      <label>
        Skills you can teach
        <input
          name="teach"
          defaultValue={user.teach.join(', ')}
          placeholder="Python, Photography, Spanish"
        />
        <small>Separate each skill with a comma. Up to 15 skills.</small>
      </label>
      <label>
        Skills you want to learn
        <input
          name="learn"
          defaultValue={user.learn.join(', ')}
          placeholder="UI/UX Design, Finnish"
        />
      </label>
      <button className="primary full-width" disabled={busy === 'profile'}>
        {busy === 'profile' ? 'Saving…' : 'Save my profile'}
        <Check size={16} />
      </button>
    </form>
  );
}
