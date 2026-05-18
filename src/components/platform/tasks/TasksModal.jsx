import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '@/components/common/Modal';

import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '@/store/features/tasks/tasksApi';
import { useSearchEmployeesQuery } from '@/store/features/employees/employeesApi';
import { useSearchProjectsQuery } from '@/store/features/projects/projectsApi';

import { taskSchema, updateTaskSchema } from '@/schemas/taskSchema';

import * as S from '../Modal.styles'; // you can keep the same modal styles
import AsyncSearchSelect from '@/components/common/forms/AsyncSearchSelect';
import { toast } from 'sonner';

export default function TaskModal({ isOpen, onClose, task }) {
  const isEditing = !!task;
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const defaultValues = {
    title: '',
    description: '',
    type: 'Tâche de Bureau',
    status: 'A Faire',
    percentage: 0,
    priority: 'Médium',
    assignedTo: [],       // array of user IDs
    startDate: '',
    dueDate: '',
    projectId: '',        // will be a search select or plain input
    // categories: '',
    notes: '',
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEditing ? updateTaskSchema : taskSchema),
    defaultValues,
  });

  // When editing, populate the form with the existing task
  useEffect(() => {
    if (task) {
      const formatted = {
        ...task,
        assignedTo: Array.isArray(task.assignedTo)
          ? task.assignedTo.map((u) => ({ value: u?._id, label: `${u?.firstName} ${u?.lastName}`}))
          : {},
        // assignedTo: Array.isArray(task.assignedTo)
        //   ? task.assignedTo.map((u) => (u?._id ? u._id : u)) // extract _id if populated
        //   : [],
        startDate: task.startDate
          ? new Date(task.startDate).toISOString().split('T')[0]
          : '',
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split('T')[0]
          : '',
        projectId: {value: task.projectId?._id || task.projectId || '', label: task.projectId.name || ""},
      };
      reset(formatted);
    } else {
      reset(defaultValues);
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    console.log("Tasks Data (onSubmit) ::: ", data);
    try {
      const payload = {
        ...data,

        projectId: data?.projectId?.value,

        assignedTo: data?.assignedTo?.map(
          (employee) => employee.value
        ),
      };

      // return console.log("Tasks Payload (onSubmit) ::: ", payload);

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
      console.log('Erreur lors de l\'enregistrement', err);
      toast.error(`Erreur: ${err?.data?.message || err.message}`);
    }
  };

  const onError = (errors) => {
    console.log('❌ Validation errors:', errors);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Modifier la tâche' : 'Nouvelle tâche'}
      size="lg"
    >
      <S.Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Informations principales */}
        <S.Section>
          <S.SectionTitle>Informations principales</S.SectionTitle>

          <S.Field>
            <S.Label>Titre *</S.Label>
            <S.Input {...register('title')} placeholder="Nom de la tâche" />
            {errors.title && <S.Error>{errors.title.message}</S.Error>}
          </S.Field>

          <S.Field>
            <S.Label>Description</S.Label>
            <S.TextArea
              {...register('description')}
              rows={3}
              placeholder="Décrivez la tâche..."
            />
            {errors.description && <S.Error>{errors.description.message}</S.Error>}
          </S.Field>

          <S.Grid>
            <S.Field>
              <S.Label>Type</S.Label>
              <S.Select {...register('type')}>
                <option value="Réunion">Réunion</option>
                <option value="Mission de Terrain">Mission de Terrain</option>
                <option value="Atelier de Formation">Atelier de Formation</option>
                <option value="Tâche de Bureau">Tâche de Bureau</option>
                <option value="Autre">Autre</option>
              </S.Select>
            </S.Field>

            <S.Field>
              <S.Label>Statut</S.Label>
              <S.Select {...register('status')}>
                <option value="A Faire">A Faire</option>
                <option value="En Cours">En Cours</option>
                <option value="Terminé">Terminé</option>
              </S.Select>
            </S.Field>

            <S.Field>
              <S.Label>Priorité</S.Label>
              <S.Select {...register('priority')}>
                <option value="Elevée">Elevée</option>
                <option value="Médium">Médium</option>
                <option value="Bas">Bas</option>
              </S.Select>
            </S.Field>

            {/* <S.Field>
              <S.Label>Catégories</S.Label>
              <S.Input
                {...register('categories')}
                placeholder="Ex: RH, Administration, Projet IP..."
              />
            </S.Field> */}
          </S.Grid>
        </S.Section>

        {/* Dates et progression */}
        <S.Section>
          <S.SectionTitle>Planification</S.SectionTitle>

          <S.Grid>
            <S.Field>
              <S.Label>Date de début *</S.Label>
              <S.Input
                type="date"
                {...register('startDate')}
              />
              {errors.startDate && <S.Error>{errors.startDate.message}</S.Error>}
            </S.Field>

            <S.Field>
              <S.Label>Date d’échéance</S.Label>
              <S.Input
                type="date"
                {...register('dueDate')}
              />
              {errors.dueDate && <S.Error>{errors.dueDate.message}</S.Error>}
            </S.Field>
          </S.Grid>

          <S.Field>
            <S.Label>Progression (%)</S.Label>
            <S.Input
              type="number"
              min="0"
              max="100"
              {...register('percentage', { valueAsNumber: true })}
            />
            {errors.percentage && <S.Error>{errors.percentage.message}</S.Error>}
          </S.Field>
        </S.Section>

        {/* Assignation & Projet */}
        <S.Section>
          <S.SectionTitle>Assignation & projet</S.SectionTitle>

          {/* Multi-select for assigned employees */}
          <S.Field>
            {/* <AsyncSearchSelect
              name="assignedTo"
              control={control}
              label="Assigné à"
              queryHook={useSearchEmployeesQuery}
              mapOption={(employee) => ({
                value: employee._id,
                label: `${employee.firstName} ${employee.lastName}`,
              })}
              isMulti={true}
              placeholder="Rechercher des employés..."
            /> */}
            <AsyncSearchSelect
              name="assignedTo"
              control={control}
              label="Assignée à"

              queryHook={useSearchEmployeesQuery}

              isMulti

              mapOption={(employee) => ({
                value: employee._id,
                label: `${employee.firstName} ${employee.lastName}`,
              })}
            />
          </S.Field>

          {/* Project ID – placeholder: replace with an AsyncSearchSelect for projects when available */}
          <S.Field>
            <AsyncSearchSelect
              name="projectId"
              control={control}
              label="Projet"

              queryHook={useSearchProjectsQuery}

              mapOption={(project) => ({
                value: project._id,
                label: project.name,
              })}

              placeholder="Rechercher un projet..."
            />
            {/* <S.Label>Projet</S.Label>
            <S.Input
              {...register('projectId')}
              placeholder="ID du projet (ex: 64fa...)"
            />
            {errors.projectId && <S.Error>{errors.projectId.message}</S.Error>} */}
          </S.Field>
        </S.Section>

        {/* Notes */}
        <S.Section>
          <S.SectionTitle>Notes</S.SectionTitle>

          <S.Field>
            <S.Label>Notes (min. 20 caractères)</S.Label>
            <S.TextArea
              {...register('notes')}
              rows={5}
              placeholder="Informations supplémentaires..."
            />
            {errors.notes && <S.Error>{errors.notes.message}</S.Error>}
          </S.Field>
        </S.Section>

        <S.Actions>
          <S.CancelButton type="button" onClick={onClose}>
            Annuler
          </S.CancelButton>

          <S.SubmitButton
            type="submit"
            disabled={isCreating || isUpdating}
          >
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