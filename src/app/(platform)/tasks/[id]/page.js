'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation'; // or 'next/router' depending on your setup
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Info,
  Users,
  Calendar,
  ListTodo,
  Paperclip,
  Activity,
  Check,
  MoreVertical,
  Notebook,
  Download,
} from 'lucide-react';

import { useGetTaskQuery, useDeleteTaskMutation } from '@/store/features/tasks/tasksApi';

import DetailPage from '@/components/common/DetailPage'; // the generic shell
import * as S from '@/components/common/DetailPage.styles'; // all styled components
import { Badge } from '@/components/common/Common.styles';
import AvatarStack from '@/components/ui/avatar/AvatarStack';
import { formatDate } from '@/utils';
import ProgressBar from '@/components/ui/ProgressBar';

// ---------- MOCK DATA (would come from props/API) ----------
const taskData = {
  id: '6a05b7e93059334ac95b2efa',
  title: 'Redaction du rapport annuel',
  subtitle: undefined, // optional
  description:
    'Ceci est un test de description pour la tâche. Cette tâche consiste à préparer et finaliser le rapport annuel financier et opérationnel.',
  status: 'En cours',
  priority: 'medium',

  assignedTo: [
    { id: 1, name: 'Awa Traoré', avatar: 'https://i.pravatar.cc/100?img=32' },
    { id: 2, name: 'Mamadou Diallo', avatar: 'https://i.pravatar.cc/100?img=15' },
  ],

  dates: {
    createdAt: '22 Mai 2025, 10:30',
    startDate: '25 Mai 2025',
    dueDate: '05 Juin 2025, 18:00',
    updatedAt: '22 Mai 2025, 11:15',
  },

  details: {
    category: 'Documentation',
    tags: ['Rapport', 'Finance'],
    estimatedTime: '16h',
    spentTime: '6h',
    completion: '40%',
  },

  attachments: [
    { id: 1, name: 'rapport_annuel_2024.pdf', size: '1.4 MB', date: '22 Mai 2025' },
    { id: 2, name: 'donnees_financieres.xlsx', size: '850 KB', date: '22 Mai 2025' },
  ],

  subtasks: [
    { id: 1, label: 'Collecte des données', completed: true, date: '20 Mai 2025' },
    { id: 2, label: 'Rédaction de la section financière', completed: true, date: '23 Mai 2025' },
    { id: 3, label: 'Relecture et corrections', completed: false, date: null },
    { id: 4, label: 'Validation finale', completed: false, date: null },
  ],
};

// const workflowSteps = [
//   { id: 1, label: 'Non démarrée', status: 'not_started' },
//   { id: 2, label: 'En cours', status: 'in_progress' },
//   { id: 3, label: 'Bloquée', status: 'blocked' },
//   { id: 4, label: 'En validation', status: 'in_review' },
//   { id: 5, label: 'Terminée', status: 'completed' },
//   { id: 6, label: 'Annulée', status: 'cancelled' },
// ];
const workflowSteps = [
  {
    id: '1',
    label: 'Création de la tâche',
    description: 'Tâche initialisée par le chef de projet',
    status: 'Achevée',
    assignee: {
      id: 'u1',
      name: 'Bakary Dramé',
      avatar: '/avatars/bakary.png',
    },
    createdAt: '2026-05-12T09:30:00Z',
    completedAt: '2026-05-12T09:42:00Z',
  },

  {
    id: '2',
    label: 'Analyse fonctionnelle',
    description: 'Validation des besoins métier',
    status: 'Achevée',
    assignee: {
      id: 'u2',
      name: 'Aminata Diallo',
      avatar: '/avatars/aminata.png',
    },
    createdAt: '2026-05-12T10:00:00Z',
    completedAt: '2026-05-13T14:15:00Z',
  },

  {
    id: '3',
    label: 'Développement',
    description: 'Implémentation frontend et backend',
    status: 'En cours',
    // status: 'in_progress',
    assignee: {
      id: 'u3',
      name: 'Moussa Traoré',
      avatar: '/avatars/moussa.png',
    },
    createdAt: '2026-05-13T15:00:00Z',
    estimatedCompletion: '2026-05-18T18:00:00Z',
    progress: 72,
  },

  {
    id: '4',
    label: 'Validation QA',
    description: 'Tests qualité et validation fonctionnelle',
    status: 'Non débutée',
    // status: 'not_started',
    assignee: {
      id: 'u4',
      name: 'Fatoumata Coulibaly',
      avatar: '/avatars/fatoumata.png',
    },
  },

  {
    id: '5',
    label: 'Déploiement',
    description: 'Mise en production',
    status: 'Bloquée',
    assignee: {
      id: 'u5',
      name: 'Admin DevOps',
      avatar: '/avatars/devops.png',
    },
    blockedReason: 'Validation QA requise avant déploiement',
  },
];

// ---------- PAGE COMPONENT ----------
export default function TaskDetailPage() {
  const {id} = useParams();
  const router = useRouter();

  const { data: res, isLoading, isError } = useGetTaskQuery(id);

  const task = res?.data || taskData;

  const handleDelete = () => {
    console.log('Delete task', task.id);
    // your deletion logic
  };

  const actions = [
    { label: 'Back', icon: ArrowLeft, onClick: () => router.push('/tasks') },
    { label: 'Edit', icon: Pencil, onClick: () => router.push(`/tasks?edit=${task.id}`), variant: 'primary' },
    { label: 'Delete', icon: Trash2, onClick: handleDelete, variant: 'danger' },
  ];

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Tasks', href: '/tasks' },
    { label: `Task #${task.id}` },
  ];

  // ---- Sidebar Content ----
  const sidebar = (
    <>
      {/* Assignees */}
      <S.Card>
        <S.CardHeader>
          <S.CardTitleWrapper>
            <S.CardIcon><Users size={18} /></S.CardIcon>
            <S.CardTitle>Tâche assignée à</S.CardTitle>
          </S.CardTitleWrapper>
        </S.CardHeader>
        <S.AssigneeList>
          {taskData.assignedTo.map((a) => (
            <S.Avatar key={a._id || a.id} src={a.avatar} alt={a.name} />
            // <S.Avatar key={a._id} src={a.avatar} alt={a.name} />
          ))}
          <S.AddAvatar>+</S.AddAvatar>
        </S.AssigneeList>
      </S.Card>

      {/* Dates */}
      <S.Card>
        <S.CardHeader>
          <S.CardTitleWrapper>
            <S.CardIcon><Calendar size={18} /></S.CardIcon>
            <S.CardTitle>Dates</S.CardTitle>
          </S.CardTitleWrapper>
        </S.CardHeader>
        <S.MetadataList>
          <S.MetadataRow><span>Créée le</span><strong>{formatDate(task.createdAt)}</strong></S.MetadataRow>
          <S.MetadataRow><span>Date de début</span><strong>{formatDate(task.startDate)}</strong></S.MetadataRow>
          <S.MetadataRow><span>Date de fin</span><strong>{formatDate(task.dueDate)}</strong></S.MetadataRow>
          <S.MetadataRow><span>Mise à jour le</span><strong>{formatDate(task.updatedAt)}</strong></S.MetadataRow>
        </S.MetadataList>
      </S.Card>

      {/* Details */}
      <S.Card>
        <S.CardHeader>
          <S.CardTitleWrapper>
            <S.CardIcon><ListTodo size={18} /></S.CardIcon>
            <S.CardTitle>Details</S.CardTitle>
          </S.CardTitleWrapper>
        </S.CardHeader>
        <S.MetadataList>
          <S.MetadataRow>
            <span>Category</span>
            <S.Tag>{taskData.details.category}</S.Tag>
          </S.MetadataRow>
          <S.MetadataRow>
            <span>Tags</span>
            <S.TagGroup>
              {taskData.details.tags.map((tag) => (
                <S.Tag key={tag}>{tag}</S.Tag>
              ))}
            </S.TagGroup>
          </S.MetadataRow>
          <S.MetadataRow><span>Estimated Time</span><strong>{taskData.details.estimatedTime}</strong></S.MetadataRow>
          <S.MetadataRow><span>Spent Time</span><strong>{taskData.details.spentTime}</strong></S.MetadataRow>
          <S.MetadataRow><span>Completion</span><strong>{taskData.details.completion}</strong></S.MetadataRow>
        </S.MetadataList>
      </S.Card>

      {/* Attachments */}
      <S.Card>
        <S.CardHeader>
          <S.CardTitleWrapper>
            <S.CardIcon><Paperclip size={18} /></S.CardIcon>
            <S.CardTitle>Attachments</S.CardTitle>
          </S.CardTitleWrapper>
        </S.CardHeader>
        <S.AttachmentList>
          {taskData.attachments.map((att) => (
            <S.AttachmentItemWrapper key={att.id}>
              <S.AttachmentItem>
                <S.AttachmentName>{att.name}</S.AttachmentName>
                <S.AttachmentMeta>{att.size} • {att.date}</S.AttachmentMeta>
              </S.AttachmentItem>
              <Download size={20} />
            </S.AttachmentItemWrapper>
          ))}
        </S.AttachmentList>
      </S.Card>
    </>
  );

  // ---- Main Content ----
  const mainContent = (
    <>
      {/* General Information */}
      <S.Card>
        <S.CardHeader>
          <S.CardTitleWrapper>
            <S.CardIcon><Info size={18} /></S.CardIcon>
            <S.CardTitle>Information Générale</S.CardTitle>
          </S.CardTitleWrapper>
        </S.CardHeader>
        <S.Divider />
        <S.InfoContainer>
          <S.InfoContent>
            <S.InfoTitle>{task.title}</S.InfoTitle>
            <S.InfoDescription>{task.description}</S.InfoDescription>
          </S.InfoContent>
          <S.InfoFooter>
            <S.InfoFooterSection>
              <Badge status={task.status}>{task.status}</Badge>
              <Badge status={task.priority}>{task.priority}</Badge>
            </S.InfoFooterSection>
            <S.InfoFooterSection>
              <AvatarStack 
                users={task?.assignedTo}
                size='lg'
                max={3}
              />
            </S.InfoFooterSection>
          </S.InfoFooter>
        </S.InfoContainer>
      </S.Card>

      {/* Progress / Workflow */}
      <ProgressBar data={workflowSteps} />
      {/* <S.Card>
        <S.CardHeader>
          <S.CardTitleWrapper>
            <S.CardIcon><Activity size={18} /></S.CardIcon>
            <S.CardTitle>Etat d&apos;avancement</S.CardTitle>
          </S.CardTitleWrapper>
          <S.StepsCompleted>
            {workflowSteps.filter((s) => s.status === 'completed').length} sur {workflowSteps.length} étapes completées
          </S.StepsCompleted>
        </S.CardHeader>
        <S.ProgressWrapper>
          {workflowSteps.map((step, index) => (
            <S.StepItem key={step.id}>
              {index !== workflowSteps.length - 1 && (
                <S.StepLine $completed={step.status === 'Achevée'} />
              )}
              <S.StepCircle status={step.status}>
                {step.status === 'Achevée' ? <Check size={16} /> : step.id}
              </S.StepCircle>
              <S.StepContent>
                <S.StepLabel>{step.label}</S.StepLabel>
                <S.StepStatus status={step.status}>{step.status}</S.StepStatus>
              </S.StepContent>
            </S.StepItem>
          ))}
        </S.ProgressWrapper>
      </S.Card> */}

      {/* Description */}
      <S.Card>
        <S.CardHeader>
          <S.CardTitleWrapper>
            <S.CardIcon><Notebook size={18} /></S.CardIcon>
            <S.CardTitle>Notes</S.CardTitle>
          </S.CardTitleWrapper>
        </S.CardHeader>
        <S.Description>{task.notes}</S.Description>
      </S.Card>

      {/* Subtasks */}
      <S.Card>
        <S.CardHeader>
          <S.CardTitleWrapper>
            <S.CardIcon><ListTodo size={18} /></S.CardIcon>
            <S.CardTitle>Sous Tâches</S.CardTitle>
          </S.CardTitleWrapper>
        </S.CardHeader>
        <S.SubtaskList>
          {taskData.subtasks.map((sub) => (
            <S.SubtaskItem key={sub.id}>
              <S.SubtaskLeft>
                <S.Checkbox $completed={sub.completed}>
                  {sub.completed && <Check size={14} />}
                </S.Checkbox>
                <S.SubtaskLabel $completed={sub.completed}>{sub.label}</S.SubtaskLabel>
              </S.SubtaskLeft>
              <S.SubtaskRight>
                <S.SubtaskDate>{sub.date || '-'}</S.SubtaskDate>
                <S.Avatar src="https://i.pravatar.cc/100?img=12" alt="Assignee" />
                <MoreVertical size={16} />
              </S.SubtaskRight>
            </S.SubtaskItem>
          ))}
        </S.SubtaskList>
        <S.AddSubtask>+ Add subtask</S.AddSubtask>
      </S.Card>
    </>
  );

  return (
    <DetailPage
      breadcrumbs={breadcrumbs}
      title={task.title}
      subtitle={task?.subtitle}
      actions={actions}
      sidebar={sidebar}
    >
      {mainContent}
    </DetailPage>
  );
}