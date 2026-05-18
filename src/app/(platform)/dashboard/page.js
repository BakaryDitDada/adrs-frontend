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

// import BarChartComponent from '@/components/common/BarChart';

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


// 'use client';

// import { motion } from 'framer-motion';
// import { Users, FolderKanban, CalendarClock, DollarSign, ListTodo } from 'lucide-react';

// import { useGetDashboardChartsQuery, useGetDashboardStatsQuery } from '@/store/features/dashboard/dashboardApi';
// import BarChartComponent from '@/components/common/BarChart';
// import * as S from './dashboard.styles';
// import { ChartsGrid } from '@/components/common/Charts.styles';

// const SAMPLE_EMPLOYEES_BY_DEPARTMENT = [
//   { label: 'Informatique', count: 12 },
//   { label: 'Ressources Humaines', count: 8 },
//   { label: 'Marketing', count: 5 },
//   { label: 'Ventes', count: 10 },
// ];

// const SAMPLE_PROJECTS_BY_STATUS = [
//   { label: 'En cours', count: 7 },
//   { label: 'Terminé', count: 15 },
//   { label: 'En attente', count: 3 },
//   { label: 'Annulé', count: 2 },
// ];

// export default function DashboardPage() {
//   const { data: stats, isLoading } = useGetDashboardStatsQuery();
//     const {
//     data: chartsData,
//     isLoading: chartsLoading,
//     isError: chartsError,
//   } = useGetDashboardChartsQuery();

//   const employeesByDepartment =
//     chartsData?.data?.employeesByDepartment && chartsData?.data?.employeesByDepartment.length > 0
//       ? chartsData?.data?.employeesByDepartment
//       : chartsError || !chartsData
//       ? SAMPLE_EMPLOYEES_BY_DEPARTMENT
//       : chartsData?.data?.employeesByDepartment;
  
//   const projectsByStatus =
//     chartsData?.data?.projectsByStatus && chartsData?.data?.projectsByStatus.length > 0
//       ? chartsData?.data?.projectsByStatus
//       : chartsError || !chartsData
//       ? SAMPLE_PROJECTS_BY_STATUS
//       : chartsData?.data?.projectsByStatus;

//   const isUsingMockData = chartsError || !chartsData;

//   const kpiCards = [
//     {
//       title: 'Employé(e)s en activité',
//       value: stats?.data?.totalActiveEmployees || 0,
//       icon: Users,
//       color: 'primary',
//     },
//     {
//       title: 'Projets au total',
//       value: stats?.data?.totalProjects || 0,
//       icon: FolderKanban,
//       color: 'secondary',
//     },
//     {
//       title: 'Congés en attente',
//       value: stats?.data?.pendingLeaves || 0,
//       icon: CalendarClock,
//       color: 'warning',
//     },
//     {
//       title: 'Tâches en cours',
//       value: stats?.data?.totalInProgressTasks || 0,
//       icon: ListTodo,
//       color: 'success',
//     },
//   ];

//   return (
//     <S.Container>
//       <S.Header>
//         <h1>Tableau de bord</h1>
//         <p>Bienvenue ! Voici un aperçu de votre agence.</p>
//       </S.Header>

//       <S.KPIGrid>
//         {kpiCards.map((card) => {
//           const Icon = card.icon;
//           return (
//             <S.KPICard key={card.title}>
//               <S.KPIIcon color={card.color}>
//                 <Icon size={24} />
//               </S.KPIIcon>
//               <S.KPIContent>
//                 <S.KPIValue>{isLoading ? '...' : card.value}</S.KPIValue>
//                 <S.KPILabel>{card.title}</S.KPILabel>
//               </S.KPIContent>
//             </S.KPICard>
//           );
//         })}
//       </S.KPIGrid>

//       {/* CHARTS SECTION */}
//       {/* {isUsingMockData && (
//         <S.MockDataBanner>
//           ⚠️ Backend non disponible – Données d&apos;exemple affichées.
//         </S.MockDataBanner>
//       )} */}

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         <ChartsGrid>
//           <BarChartComponent
//             title="Projets / Statut"
//             data={projectsByStatus}
//             isLoading={chartsLoading}
//             name={"PROJETS"}
//           />
//           <BarChartComponent
//             title="Employés / Département"
//             data={employeesByDepartment}
//             isLoading={chartsLoading}
//             name={"EMPLOYÉ(E)S"}
//           />
//         </ChartsGrid>
//       </motion.div>
  
//     </S.Container>
//   );
// }