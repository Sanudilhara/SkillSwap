export const initialProfile = {
  name: 'Alex Morgan',
  university: 'University of Helsinki',
  field: 'Computer Science',
  location: 'Helsinki, Finland',
  bio: 'Curious about design, photography, and the little things that make the web better. Happy to share what I know about coding!',
  teach: ['React', 'Python'],
  learn: ['UI/UX Design', 'Photography'],
};

export const students = [
  { id: 'elena', name: 'Elena Rossi', university: 'Aalto University', field: 'Design', location: 'Espoo, Finland', bio: 'Design student who loves making digital experiences feel human. I would love to bring my ideas to life with React.', teach: ['UI/UX Design', 'English'], learn: ['React', 'Finnish'], category: 'Design', color: 'bg-violet-100 text-violet-700' },
  { id: 'marcus', name: 'Marcus Thompson', university: 'University of Helsinki', field: 'Media Studies', location: 'Helsinki, Finland', bio: 'Always chasing good light and a new story. Looking for someone to help me get started with Python.', teach: ['Photography', 'Video Editing'], learn: ['Python'], category: 'Photography', color: 'bg-orange-100 text-orange-700' },
  { id: 'aisha', name: 'Aisha Khan', university: 'Tampere University', field: 'Data Science', location: 'Tampere, Finland', bio: 'I enjoy finding patterns in data and explaining them simply. Next on my list: learning the basics of design.', teach: ['Python', 'Data Analysis'], learn: ['UI/UX Design'], category: 'Technology', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'noah', name: 'Noah Lee', university: 'Aalto University', field: 'Music Technology', location: 'Espoo, Finland', bio: 'Guitar player and bedroom producer. I want to build a little website for my music.', teach: ['Guitar', 'Music Production'], learn: ['React'], category: 'Music', color: 'bg-sky-100 text-sky-700' },
  { id: 'sofia', name: 'Sofia Chen', university: 'University of Turku', field: 'Interaction Design', location: 'Turku, Finland', bio: 'A sketchbook, a coffee, and a good design problem. I would love to learn Python and share my design process.', teach: ['UI/UX Design', 'Illustration'], learn: ['Python'], category: 'Design', color: 'bg-pink-100 text-pink-700' },
  { id: 'oliver', name: 'Oliver Reed', university: 'University of Helsinki', field: 'Languages', location: 'Helsinki, Finland', bio: 'Language enthusiast who believes the best way to learn is through conversation. Hoping to pick up the guitar next.', teach: ['Spanish', 'English'], learn: ['Guitar'], category: 'Languages', color: 'bg-amber-100 text-amber-700' },
];

export const initialConnections = [
  { id: 'c1', studentId: 'elena', direction: 'incoming', status: 'pending' },
  { id: 'c2', studentId: 'marcus', direction: 'outgoing', status: 'pending' },
  { id: 'c3', studentId: 'sofia', direction: 'outgoing', status: 'accepted' },
  { id: 'c4', studentId: 'noah', direction: 'incoming', status: 'pending' },
];

export const initialMessages = [
  { id: 'm1', studentId: 'sofia', sender: 'student', text: 'Hi Alex! Excited to exchange skills. What would you like to explore in our design session?', time: '10:20' },
  { id: 'm2', studentId: 'sofia', sender: 'me', text: 'Hi Sofia! I would love to learn how to turn a rough idea into a clear wireframe.', time: '10:24' },
  { id: 'm3', studentId: 'sofia', sender: 'student', text: 'Sounds great! Bring an idea for a small app and we can work through it together.', time: '10:26' },
];

export const initialSessions = [
  { id: 's1', studentId: 'sofia', topic: 'From idea to wireframe', date: '2026-11-10', time: '16:00', duration: '45', status: 'upcoming' },
  { id: 's2', studentId: 'sofia', topic: 'Python basics: a friendly introduction', date: '2026-11-03', time: '15:00', duration: '60', status: 'completed' },
];

export const initialNotifications = [
  { id: 'n1', title: 'A new connection request', text: 'Elena would like to exchange skills with you.', path: '/app/connections', read: false },
  { id: 'n2', title: 'Your next learning session', text: 'Your sample wireframing session with Sofia is ready to view.', path: '/app/sessions', read: false },
  { id: 'n3', title: 'Welcome to your learning space', text: 'Explore the demo and make yourself at home.', path: '/app/dashboard', read: true },
];

export const initialReviews = [
  { id: 'r1', studentId: 'sofia', direction: 'received', rating: 5, text: 'Alex makes coding feel approachable. Patient explanations and lots of useful examples. A lovely skill exchange!' },
];

export const initialSettings = { emailUpdates: true, sessionReminders: true, discoverable: true, language: 'English' };
