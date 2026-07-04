"use client";

import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  FolderKanban,
  CheckSquare,
  FileText,
  Bot,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { setSidebarCollapsed, setSidebarOpen } from '@/store/globalSlice';
import { selectCurrentUser } from '@/store/features/auth/authSlice';
import * as S from './Sidebar.styles';

const navItems = [
  { label: 'Tableau de Bord', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Employé(e)s', href: '/employees', icon: Users },
  { label: 'Congés', href: '/leaves', icon: Calendar },
  { label: 'Paiements', href: '/payrolls', icon: DollarSign },
  { label: 'Projets', href: '/dash-projects', icon: FolderKanban },
  { label: 'Tâches', href: '/tasks', icon: CheckSquare },
  { label: 'Documents', href: '/dash-docs', icon: FileText },
  { label: 'Rapports IA', href: '/ai-reports', icon: Bot },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { sidebarOpen, sidebarCollapsed } = useSelector((state) => state.global);
  const user = useSelector(selectCurrentUser);

  
  const isAdminOrHR = user?.role === 'admin' || user?.role === 'hr';
  
  // console.log("Current User ::: ", user, " Is Admin Or HR ::: ", isAdminOrHR);
  // ✅ Merge basic + restricted if admin/hr
  // const filteredNavItems = isAdminOrHR
  //   ? [...restrictedNavItems, ...basicNavItems]
  //   : basicNavItems;

    const filteredNavItems = navItems.filter((item) => {
      if (item.href === '/employees' || item.href === '/payrolls' || item.href === '/ai-reports') {
        return isAdminOrHR;
      }
      return true;
    });

  const toggleCollapse = () => {
    dispatch(setSidebarCollapsed(!sidebarCollapsed));
  };

  const closeMobileDrawer = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <S.DesktopSidebar collapsed={sidebarCollapsed ? "true" : undefined}>
        <S.LogoWrapper className='mb'>
          <S.Logo href={'#'} onClick={closeMobileDrawer}>
            {!sidebarCollapsed ? (
              <>
                <S.LogoImage>
                  <span className="green">A</span>
                  <span className="yellow">D</span>
                  <span className="red">RS</span>
                </S.LogoImage>
                <S.LogoText>
                  <h1>Mali</h1>
                </S.LogoText>
              </>
            ) : (
              <S.LogoImage>
                <span className="green">A</span>
                <span className="yellow">D</span>
                <span className="red">RS</span>
              </S.LogoImage>
            )}
          </S.Logo>
        </S.LogoWrapper>

        <S.Nav>
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link key={item.href} href={item.href} passHref className={isActive ? "active nav__link" : "nav__link"}>
                <S.NavItem $active={isActive ? "true" : undefined} $collapsed={sidebarCollapsed}>
                  <Icon size={20} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </S.NavItem>
              </Link>
            );
          })}
        </S.Nav>

        <S.CollapseButton onClick={toggleCollapse}>
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </S.CollapseButton>
      </S.DesktopSidebar>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <S.MobileDrawer
            as={motion.div}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <S.LogoWrapper className='mb'>
              <S.Logo href="/" onClick={closeMobileDrawer}>
                <S.LogoImage>
                  <span className="green">A</span>
                  <span className="yellow">D</span>
                  <span className="red">RS</span>
                </S.LogoImage>
                <S.LogoText>
                  <h1>Mali</h1>
                </S.LogoText>
              </S.Logo>
            </S.LogoWrapper>

            <S.Nav>
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link key={item.href} href={item.href} passHref>
                    <S.NavItem $active={isActive ? "true" : undefined}>
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </S.NavItem>
                  </Link>
                );
              })}
            </S.Nav>
          </S.MobileDrawer>
        )}
      </AnimatePresence>

      {sidebarOpen && <S.Overlay onClick={closeMobileDrawer} />}
    </>
  );
}