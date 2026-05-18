import React from 'react';

import {
  Bell,
  CheckCheck,
  Clock3,
  FileText,
  AlertTriangle,
} from 'lucide-react';

import Menu from '@/components/common/menu';

import * as S from './NotificationsMenu.styles';

const notifications = [
  {
    id: 1,
    title: 'New leave request',
    description:
      'Mamadou Diallo submitted a leave request.',
    time: '5 min ago',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Payroll processing',
    description:
      'Payroll generation completed successfully.',
    time: '20 min ago',
    icon: CheckCheck,
  },
  {
    id: 3,
    title: 'System warning',
    description:
      'Database backup delayed.',
    time: '1 hour ago',
    icon: AlertTriangle,
  },
];

const NotificationsMenu = () => {
  return (
    <Menu>

      <Menu.Trigger>

        <S.NotificationButton>

          <Bell size={20} />

          <S.NotificationBadge>
            {notifications.length}
          </S.NotificationBadge>

        </S.NotificationButton>

      </Menu.Trigger>

      <Menu.Content
        align="end"
        width="38rem"
      >

        <S.MenuHeader>

          <div>
            <h3>Notifications</h3>
            <p>
              You have
              {' '}
              {notifications.length}
              {' '}
              unread notifications
            </p>
          </div>

        </S.MenuHeader>

        <S.NotificationsList>

          {notifications.map((notification) => {
            const Icon =
              notification.icon;

            return (
              <S.NotificationItem
                key={notification.id}
              >

                <S.NotificationIcon>
                  <Icon size={18} />
                </S.NotificationIcon>

                <S.NotificationContent>

                  <S.NotificationTitle>
                    {notification.title}
                  </S.NotificationTitle>

                  <S.NotificationDescription>
                    {notification.description}
                  </S.NotificationDescription>

                  <S.NotificationTime>

                    <Clock3 size={14} />

                    <span>
                      {notification.time}
                    </span>

                  </S.NotificationTime>

                </S.NotificationContent>

              </S.NotificationItem>
            );
          })}

        </S.NotificationsList>

        <Menu.Divider />

        <Menu.Item
          icon={CheckCheck}
          onClick={() => {
            console.log(
              'Mark all as read'
            );
          }}
        >
          Mark all as read
        </Menu.Item>

      </Menu.Content>

    </Menu>
  );
};

export default NotificationsMenu;