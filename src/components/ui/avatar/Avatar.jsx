import * as S from './Avatar.styles';

export default function Avatar({
  user,
  size = 'md',
  showTooltip = true,
}) {
  if (!user) return null;

  const initials = `${(`${user.firstName?.[0] || ''}${
    user.lastName?.[0] || ''
  }`) || (`${user.username?.[0]}${user.username?.[1]}`)}`.toUpperCase();

  const fullName =
    `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <S.Container
      $size={size}
      title={showTooltip ? fullName : undefined}
    >
      {user.avatar ? (
        <S.Image
          src={user.avatar}
          alt={fullName}
        />
      ) : (
        initials
      )}
    </S.Container>
  );
}