import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Menu as MenuIcon, Sun, Moon, Bell, Edit, Trash, UserPlus, Settings, LogOut, UserPen, LogOutIcon } from 'lucide-react';
import { toggleTheme, toggleSidebar } from '@/store/globalSlice';
import { useSignoutMutation as useLogoutMutation } from '@/store/features/auth/authApi';
import { signOut as logoutAction } from '@/store/features/auth/authSlice';
import * as S from './Topbar.styles';
import Menu from '@/components/common/menu';
import ThemeToggle from '@/components/common/ThemeToggle';
import UserMenuTrigger from './UserMenuTrigger';
import NotificationsMenu from './NotificationsMenu';

export default function Topbar() {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      console.log("Logout ::: ", res);
      dispatch(logoutAction());
      // window.location.href = '/auth';
      router.push("/auth");
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  return (
    <S.TopBarContainer>
      <S.LeftSection>
        <S.MenuButton onClick={() => dispatch(toggleSidebar())}>
          <MenuIcon size={24} />
        </S.MenuButton>
        <S.PageTitle>ADRS-GES+</S.PageTitle> {/* Dynamic later */}
      </S.LeftSection>

      <S.RightSection>
               
        <NotificationsMenu />

        <S.UserMenu style={{cursor: "pointer"}}>
          <Menu>

            <Menu.Trigger asChild className={"user__info-button"}>
              <UserMenuTrigger user={user} />
            </Menu.Trigger>

            <Menu.Content align="end">

              <Menu.Item
                icon={UserPen}
                onClick={() => handleEdit(item)}
              >
                Profil
              </Menu.Item>

              <Menu.Item
                icon={Settings}
                onClick={() => handleEdit(item)}
              >
                Paramètres
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item icon={LogOutIcon} variant="danger" onClick={handleLogout}>
                Se déconnecter
              </Menu.Item>

              {/* <Menu.Item
                icon={Trash}
                variant="danger"
                onClick={() => handleDelete(item._id)}
              >
                Supprimer
              </Menu.Item> */}

            </Menu.Content>

          </Menu>

          {/* <S.LogoutButton style={{ borderColor: "red" }}>Se déconnecter</S.LogoutButton> */}
        </S.UserMenu>

        <ThemeToggle />
      </S.RightSection>
    </S.TopBarContainer>
  );
}