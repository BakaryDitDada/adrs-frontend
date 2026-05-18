import React, { forwardRef } from 'react';

import * as S from './Topbar.styles';

const UserMenuTrigger = forwardRef(
  (
    {
      user,
      onClick,
    },
    ref
  ) => {
    return (
      <S.UserMenuButton
        ref={ref}
        type="button"
        onClick={onClick}
      >
        <S.Avatar>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </S.Avatar>

        <S.UserInfo>

          <S.UserName>
            {user?.firstName}
            {' '}
            {user?.lastName}
          </S.UserName>

          <S.UserRole>
            {user?.role}
          </S.UserRole>

        </S.UserInfo>

      </S.UserMenuButton>
    );
  }
);

UserMenuTrigger.displayName =
  'UserMenuTrigger';

export default UserMenuTrigger;