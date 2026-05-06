import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '@/components/common/Modal';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '@/store/features/tasks/tasksApi';
import { taskSchema } from '@/schemas/taskSchema';

import * as S from '../Modal.styles';
import AsyncMultiSelect from '@/components/common/forms/AsyncMultiSelect';

const defaultValues = {
  title: '',
  description: '',
  type: '',
  status: '',
  percentage: '',
  priority: '',
  assignedTo: '',
  attachments: '',
  startDate: '',
  dueDate: '',
  projectId: '',
  categories: '',
  notes: '',
};

function idsToString(value) {
  if (!value) return '';
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item : item?._id))
      .filter(Boolean)
      .join(', ');
  }
  if (typeof value === 'object' && value._id) return value._id;
  return String(value);
}

function toIdArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function TaskModal({ isOpen, onClose, task }) {
  const isEditing = !!task;

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(taskSchema),
  //   defaultValues,
  // });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title || '',
        description: task.description || '',
        type: task.type || '',
        status: task.status || '',
        percentage:
          task.percentage !== undefined && task.percentage !== null
            ? String(task.percentage)
            : '',
        priority: task.priority || '',
        assignedTo: idsToString(task.assignedTo),
        attachments: idsToString(task.attachments),
        startDate: task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        projectId: task.projectId?._id || task.projectId || '',
        categories: task.categories || '',
        notes: task.notes || '',
      });
    } else {
      reset(defaultValues);
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        percentage:
          data.percentage === '' || data.percentage === undefined
            ? undefined
            : Number(data.percentage),
        assignedTo: toIdArray(data.assignedTo),
        attachments: toIdArray(data.attachments),
        projectId: data.projectId || undefined,
        type: data.type || undefined,
        status: data.status || undefined,
        priority: data.priority || undefined,
        categories: data.categories || undefined,
        description: data.description || undefined,
        dueDate: data.dueDate || undefined,
        notes: data.notes || undefined,
      };

      if (isEditing) {
        await updateTask({
          id: task._id,
          ...payload,
        }).unwrap();
      } else {
        await createTask(payload).unwrap();
      }

      onClose();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement", err);
    }
  };

  const onError = (validationErrors) => {
    console.log('❌ Validation errors:', validationErrors);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Modifier la tâche' : 'Nouvelle tâche'}
      size="lg"
    >
      <S.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <S.Section>
          <S.SectionTitle>Informations principales</S.SectionTitle>

          <S.Grid>
            <S.Field>
              <S.Label>Titre *</S.Label>
              <S.Input {...register('title')} placeholder="Titre de la tâche" />
              {errors.title && <S.Error>{errors.title.message}</S.Error>}
            </S.Field>

            <S.Field>
              <S.Label>Type</S.Label>
              <S.Select {...register('type')}>
                <option value="">Sélectionner</option>
                <option value="Réunion">Réunion</option>
                <option value="Mission de Terrain">Mission de Terrain</option>
                <option value="Atelier de Formation">Atelier de Formation</option>
                <option value="Tâche de Bureau">Tâche de Bureau</option>
                <option value="Autre">Autre</option>
              </S.Select>
              {errors.type && <S.Error>{errors.type.message}</S.Error>}
            </S.Field>
          </S.Grid>

          <S.Field>
            <S.Label>Description</S.Label>
            <S.TextArea
              {...register('description')}
              rows={4}
              placeholder="Description de la tâche..."
            />
            {errors.description && <S.Error>{errors.description.message}</S.Error>}
          </S.Field>

          <S.Grid>
            <S.Field>
              <S.Label>Statut</S.Label>
              <S.Select {...register('status')}>
                <option value="">Sélectionner</option>
                <option value="A Faire">A Faire</option>
                <option value="En Cours">En Cours</option>
                <option value="Terminé">Terminé</option>
              </S.Select>
              {errors.status && <S.Error>{errors.status.message}</S.Error>}
            </S.Field>

            <S.Field>
              <S.Label>Priorité</S.Label>
              <S.Select {...register('priority')}>
                <option value="">Sélectionner</option>
                <option value="Elevée">Elevée</option>
                <option value="Médium">Médium</option>
                <option value="Bas">Bas</option>
              </S.Select>
              {errors.priority && <S.Error>{errors.priority.message}</S.Error>}
            </S.Field>
          </S.Grid>

          <S.Grid>
            <S.Field>
              <S.Label>Progression (%)</S.Label>
              <S.Input
                type="number"
                min="0"
                max="100"
                {...register('percentage')}
              />
              {errors.percentage && <S.Error>{errors.percentage.message}</S.Error>}
            </S.Field>

            <S.Field>
              <S.Label>Projet ID</S.Label>
              <S.Input
                {...register('projectId')}
                placeholder="ID du projet"
              />
              {errors.projectId && <S.Error>{errors.projectId.message}</S.Error>}
            </S.Field>
          </S.Grid>

          <S.Grid>
            <S.Field>
              <S.Label>Date de début *</S.Label>
              <S.Input type="date" {...register('startDate')} />
              {errors.startDate && <S.Error>{errors.startDate.message}</S.Error>}
            </S.Field>

            <S.Field>
              <S.Label>Date d’échéance</S.Label>
              <S.Input type="date" {...register('dueDate')} />
              {errors.dueDate && <S.Error>{errors.dueDate.message}</S.Error>}
            </S.Field>
          </S.Grid>

          <S.Field>
            <AsyncMultiSelect
              name="assignedTo"
              control={control}
              label="Assignés"
              queryHook={useSearchUsersQuery}
              mapOption={(user) => ({
                value: user._id,
                label: user.fullName,
              })}
            />
            {/* <S.Label>Assignés (IDs séparés par des virgules)</S.Label>
            <S.TextArea
              {...register('assignedTo')}
              rows={2}
              placeholder="64f1..., 64f2..., 64f3..."
            />
            {errors.assignedTo && <S.Error>{errors.assignedTo.message}</S.Error>} */}
          </S.Field>

          <S.Field>
            <S.Label>Pièces jointes (IDs séparés par des virgules)</S.Label>
            <S.TextArea
              {...register('attachments')}
              rows={2}
              placeholder="64f1..., 64f2..., 64f3..."
            />
            {errors.attachments && <S.Error>{errors.attachments.message}</S.Error>}
          </S.Field>

          <S.Field>
            <S.Label>Catégories</S.Label>
            <S.Input
              {...register('categories')}
              placeholder="Catégorie principale"
            />
            {errors.categories && <S.Error>{errors.categories.message}</S.Error>}
          </S.Field>

          <S.Field>
            <S.Label>Notes</S.Label>
            <S.TextArea
              {...register('notes')}
              rows={4}
              placeholder="Notes détaillées..."
            />
            {errors.notes && <S.Error>{errors.notes.message}</S.Error>}
          </S.Field>
        </S.Section>

        <S.Actions>
          <S.CancelButton type="button" onClick={onClose}>
            Annuler
          </S.CancelButton>

          <S.SubmitButton type="submit" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating
              ? 'Enregistrement...'
              : isEditing
              ? 'Mettre à jour'
              : 'Créer'}
          </S.SubmitButton>
        </S.Actions>
      </S.Form>
    </Modal>
  );
}