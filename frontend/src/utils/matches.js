// A mutual match means you each teach something the other wants to learn.
export function getMatch(profile, student) {
  const sameSkill = (first, second) => first.toLowerCase() === second.toLowerCase();
  const canLearn = student.teach.filter(skill => profile.learn.some(wanted => sameSkill(skill, wanted)));
  const canTeach = profile.teach.filter(skill => student.learn.some(wanted => sameSkill(skill, wanted)));
  return { canLearn, canTeach, mutual: canLearn.length > 0 && canTeach.length > 0 };
}
