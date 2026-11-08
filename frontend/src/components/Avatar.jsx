export default function Avatar({ name, color = 'bg-violet-100 text-violet-700', large = false }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('');
  return <span className={`inline-flex shrink-0 items-center justify-center rounded-2xl font-bold ${large ? 'size-20 text-2xl' : 'size-11 text-sm'} ${color}`} aria-hidden="true">{initials}</span>;
}
