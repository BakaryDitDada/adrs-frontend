'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import {
  Users,
  FolderKanban,
  CalendarClock,
  ListTodo,
} from 'lucide-react';

import {
  useGetDashboardChartsQuery,
  useGetDashboardStatsQuery,
} from '@/store/features/dashboard/dashboardApi';

const BarChartComponent = dynamic(
  () => import('@/components/common/BarChart'),
  {
    ssr: false,
  }
);

import DashboardKPISkeleton from '@/components/common/loading/DashboardKPISkeleton';
import ChartSkeleton from '@/components/common/loading/ChartSkeleton';

import * as S from './dashboard.styles';

import { ChartsGrid } from '@/components/common/Charts.styles';

export default function DashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
  } = useGetDashboardStatsQuery();

  const {
    data: chartsData,
    isLoading: chartsLoading,
    isError: chartsError,
  } = useGetDashboardChartsQuery();

  const kpiCards = [
    {
      title: 'Employé(e)s en activité',
      value: stats?.data?.totalActiveEmployees || 0,
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Projets au total',
      value: stats?.data?.totalProjects || 0,
      icon: FolderKanban,
      color: 'secondary',
    },
    {
      title: 'Congés en attente',
      value: stats?.data?.pendingLeaves || 0,
      icon: CalendarClock,
      color: 'warning',
    },
    {
      title: 'Tâches en cours',
      value: stats?.data?.totalInProgressTasks || 0,
      icon: ListTodo,
      color: 'success',
    },
  ];

  const employeesByDepartment =
    chartsData?.data?.employeesByDepartment || [];

  const projectsByStatus =
    chartsData?.data?.projectsByStatus || [];

  return (
    <S.Container>
      <S.Header>
        <h1>Tableau de bord</h1>
        <p>
          Bienvenue ! Voici un aperçu de votre agence.
        </p>
      </S.Header>

      {/* KPI SECTION */}
      <S.KPIGrid>
        {statsLoading
          ? [...Array(4)].map((_, index) => (
              <DashboardKPISkeleton key={index} />
            ))
          : kpiCards.map((card) => {
              const Icon = card.icon;

              return (
                <S.KPICard key={card.title}>
                  <S.KPIIcon color={card.color}>
                    <Icon size={24} />
                  </S.KPIIcon>

                  <S.KPIContent>
                    <S.KPIValue>
                      {card.value}
                    </S.KPIValue>

                    <S.KPILabel>
                      {card.title}
                    </S.KPILabel>
                  </S.KPIContent>
                </S.KPICard>
              );
            })}
      </S.KPIGrid>

      {/* CHARTS SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ChartsGrid>
          {chartsLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <BarChartComponent
                title="Projets / Statut"
                data={projectsByStatus}
                name="PROJETS"
              />

              <BarChartComponent
                title="Employés / Département"
                data={employeesByDepartment}
                name="EMPLOYÉ(E)S"
              />
            </>
          )}
        </ChartsGrid>
      </motion.div>
    </S.Container>
  );
}