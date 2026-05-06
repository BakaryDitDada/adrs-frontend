import React from 'react';
import RequireAuth from '@/utils/auth/RequireAuth';

const PlatformLayout = ({
  children
}) => {
  return (
    <RequireAuth>
      {children}
    </RequireAuth>
  )
}

export default PlatformLayout