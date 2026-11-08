import { Link, useNavigate } from 'react-router';
import PageHeading from '../../components/PageHeading.jsx';

export default function EditProfilePage({ profile, onSave }) {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const changes = { name: data.get('name').trim(), university: data.get('university').trim(), field: data.get('field').trim(), location: data.get('location').trim(), bio: data.get('bio').trim() };
    if (!changes.name || !changes.university || !changes.field) return;
    onSave(changes);
    navigate('/app/profile');
  }
  return (
    <div>
      <PageHeading title="Edit Profile" description="Help your next learning partner get to know you." />
      <form className="panel max-w-3xl space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className="form-label" htmlFor="profile-name">Full name</label><input className="form-input" id="profile-name" name="name" defaultValue={profile.name} maxLength={100} pattern=".*\S.*" required /></div>
          <div><label className="form-label" htmlFor="profile-university">University</label><input className="form-input" id="profile-university" name="university" defaultValue={profile.university} maxLength={120} pattern=".*\S.*" required /></div>
          <div><label className="form-label" htmlFor="profile-field">Field of study</label><input className="form-input" id="profile-field" name="field" defaultValue={profile.field} maxLength={120} pattern=".*\S.*" required /></div>
          <div><label className="form-label" htmlFor="profile-location">Location</label><input className="form-input" id="profile-location" name="location" defaultValue={profile.location} maxLength={120} /></div>
        </div>
        <div><label className="form-label" htmlFor="profile-bio">About me</label><textarea className="form-input min-h-36 resize-y" id="profile-bio" name="bio" defaultValue={profile.bio} maxLength={600} rows={5} /><p className="mt-2 text-xs text-slate-400">Up to 600 characters. Share your interests and what you enjoy learning.</p></div>
        <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5"><button className="btn-primary text-sm" type="submit">Save profile</button><Link className="btn-secondary text-sm" to="/app/profile">Cancel</Link></div>
      </form>
    </div>
  );
}
