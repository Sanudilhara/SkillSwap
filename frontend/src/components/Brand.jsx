import { Link } from 'react-router';

export default function Brand() {
  return (
    <Link className="inline-flex shrink-0 items-center gap-2.5" to="/" aria-label="SkillSwap home">
      <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 via-fuchsia-500 to-orange-400 text-lg font-bold text-white shadow-md shadow-fuchsia-200" aria-hidden="true">↕</span>
      <span className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-xl font-bold tracking-tight text-transparent">SkillSwap</span>
    </Link>
  );
}
