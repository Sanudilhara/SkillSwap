export default function Avatar({ student, small = false }) {
  let imageUrl = student.picture;

  if (!imageUrl && student.avatar) {
    imageUrl = `https://i.pravatar.cc/120?img=${student.avatar}`;
  }

  const initials =
    student.initials ||
    student.name
      ?.split(' ')
      .map((name) => name[0])
      .slice(0, 2)
      .join('');

  function hideBrokenImage(event) {
    event.currentTarget.style.display = 'none';
  }

  return (
    <span
      className={`avatar ${student.color || 'sage'} ${small ? 'small' : ''}`}
    >
      {imageUrl && (
        <img key={imageUrl} src={imageUrl} alt="" onError={hideBrokenImage} />
      )}
      <span>{initials}</span>
    </span>
  );
}
