'use client';

import { useSelector } from 'react-redux';
import RequireAuth from '@/utils/auth/RequireAuth';
import Sidebar from '@/components/platform/layout/Sidebar';
import Topbar from '@/components/platform/layout/Topbar';
import * as S from '@/components/platform/layout/PlatformLayout.styles';
import ChatWidget from '@/components/platform/ai/ChatWidget';
import Loading from '@/components/common/Loading';

export default function PlatformLayout({ children }) {
  const { sidebarCollapsed } = useSelector((state) => state.global);

  return (
    <RequireAuth LoadingComponent={<Loading variant='fullscreen' size='lg'/>}>
      <S.LayoutContainer>
        <Sidebar />
        <S.MainContent collapsed={sidebarCollapsed ? "true" : "false"}>
          <Topbar />
          <S.PageWrapper>{children}</S.PageWrapper>
          <ChatWidget />
        </S.MainContent>
      </S.LayoutContainer>
    </RequireAuth>
      
  );
}

// import RequireAuth from '@/utils/auth/RequireAuth';

// const PlatformLayout = ({
//   children
// }) => {
//   return (
//     <RequireAuth>
//       {children}
//     </RequireAuth>
//   )
// }

// export default PlatformLayout