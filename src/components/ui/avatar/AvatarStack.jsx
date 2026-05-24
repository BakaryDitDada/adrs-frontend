import Avatar from './Avatar';
import * as S from './AvatarStack.styles';

export default function AvatarStack({
  users = [],
  max = 3,
  size = 'md',
  showTooltip = true,
  emptyLabel = 'Non assigné',
}) {
  if (!users?.length) {
    return (
      <S.EmptyLabel>
        {emptyLabel}
      </S.EmptyLabel>
    );
  }

  const visibleUsers = users.slice(0, max);

  const remaining = users.length - max;

  return (
    <S.Container>
      {visibleUsers.map((user, index) => (
        <S.AvatarWrapper
          key={user._id || index}
        >
          <Avatar
            user={user}
            size={size}
            showTooltip={showTooltip}
          />
        </S.AvatarWrapper>
      ))}

      {remaining > 0 && (
        <S.RemainingCount $size={size}>
          +{remaining}
        </S.RemainingCount>
      )}
    </S.Container>
  );
}