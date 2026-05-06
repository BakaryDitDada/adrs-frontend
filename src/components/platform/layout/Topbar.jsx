import { useDispatch, useSelector } from 'react-redux';
import { Menu, Sun, Moon, Bell } from 'lucide-react';
import { toggleTheme, toggleSidebar } from '@/store/globalSlice';
import { useSignoutMutation as useLogoutMutation } from '@/store/features/auth/authApi';
import { signOut as logoutAction } from '@/store/features/auth/authSlice';
import * as S from './Topbar.styles';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function TopBar() {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      window.location.href = '/auth';
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  return (
    <S.TopBarContainer>
      <S.LeftSection>
        <S.MenuButton onClick={() => dispatch(toggleSidebar())}>
          <Menu size={24} />
        </S.MenuButton>
        <S.PageTitle>ADRS-GES+</S.PageTitle> {/* Dynamic later */}
      </S.LeftSection>

      <S.RightSection>
               
        <S.IconButton>
          <Bell size={20} />
        </S.IconButton>
        <S.UserMenu style={{cursor: "pointer"}}>
          <S.Avatar>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </S.Avatar>
          <S.UserInfo>
            <S.UserName>
              {user?.firstName} {user?.lastName}
            </S.UserName>
            <S.UserRole>{user?.role}</S.UserRole>
          </S.UserInfo>
          <S.LogoutButton style={{ borderColor: "red" }} onClick={handleLogout}>Se déconnecter</S.LogoutButton>
        </S.UserMenu>

        <ThemeToggle />
      </S.RightSection>
    </S.TopBarContainer>
  );
}