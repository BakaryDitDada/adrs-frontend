import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '@/components/common/Modal';

import {
  useCreateLeaveMutation,
  useUpdateLeaveMutation,
} from '@/store/features/leaves/leavesApi';
import { useSearchEmployeesQuery } from '@/store/features/employees/employeesApi';

import { leaveSchema } from '@/schemas/leaveSchema';

import * as S from '../Modal.styles';
import AsyncSearchSelect from '@/components/common/forms/AsyncSearchSelect';
import { toast } from 'sonner';

export default function LeaveModal({ isOpen, onClose, leave }) {
  const isEditing = !!leave;
  const [createLeave, { isLoading: isCreating }] = useCreateLeaveMutation();
  const [updateLeave, { isLoading: isUpdating }] = useUpdateLeaveMutation();

  const defaultValues = {
    employeeId: '',
    type: 'Annuel',
    startDate: '',
    endDate: '',
    days: 1,
    reason: '',
    status: 'En attente',
    rejectionReason: '',
    // attachment: '',
    // emergencyContact: {
    //   name: '',
    //   phone: '',
    // },
    // handoverNotes: '',
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues,
  });

  // console.log("Leave Data ::: ", leave);

  // useEffect(() => {
  //   if (leave) {
  //     const formatted = {
  //       ...leave,
  //       employeeId: leave.employeeId?._id || leave.employeeId || '',
  //       approvedBy: leave.approvedBy?._id || leave.approvedBy || '',
  //       startDate: leave.startDate
  //         ? new Date(leave.startDate).toISOString().split('T')[0]
  //         : '',
  //       endDate: leave.endDate
  //         ? new Date(leave.endDate).toISOString().split('T')[0]
  //         : '',
  //       approvedAt: leave.approvedAt
  //         ? new Date(leave.approvedAt).toISOString().split('T')[0]
  //         : '',
  //     };

  //     reset(formatted);
  //   } else {
  //     reset(defaultValues);
  //   }
  // }, [leave, reset]);

    useEffect(() => {
    if (leave) {
      const formatted = {
        ...leave,
        employeeId: leave.employeeId?._id || leave.employeeId || '',
        approvedBy: leave.approvedBy?._id || leave.approvedBy || '',
        startDate: leave.startDate
          ? new Date(leave.startDate).toISOString().split('T')[0]
          : '',
        endDate: leave.endDate
          ? new Date(leave.endDate).toISOString().split('T')[0]
          : '',
        approvedAt: leave.approvedAt
          ? new Date(leave.approvedAt).toISOString().split('T')[0]
          : '',
      };
      // Optional: if the API stores 'vacation' but schema expects 'Annuel',
      // you must map it here, e.g.:
      // if (formatted.type === 'vacation') formatted.type = 'Annuel';
      reset(formatted);
    } else {
      reset(defaultValues); // will use the current userId
    }
  }, [leave, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateLeave({
          id: leave._id,
          ...data, 
        }).unwrap();
      } else {
        await createLeave(data).unwrap();
      }

      onClose();
    } catch (err) {
      console.log("Erreur lors de l'enregistrement", err);
      toast.error(`Erreur lors de l'enregistrement: ${err?.data.message}`)
    }
  };

  const onError = (errors) => {
    console.log('❌ Validation errors:', errors);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Modifier le congé' : 'Nouvelle demande de congé'}
      size="lg"
    >
      <S.Form onSubmit={handleSubmit(onSubmit, onError)}  ref={(el) => console.log('Form element tag:', el?.tagName)}>
        {/* Informations principales */}
        <S.Section>
          <S.SectionTitle>Informations principales</S.SectionTitle>

          <S.Grid>
            <S.Field>
              <AsyncSearchSelect
                name="employeeId"
                control={control}
                label="Employé"

                queryHook={useSearchEmployeesQuery}

                mapOption={(employee) => ({
                  value: employee._id,
                  label: `${employee.firstName} ${employee.lastName}`,
                })}

                placeholder="Rechercher un employé..."
              />
              {/* <S.Label>Employé(e) *</S.Label>
              <S.Input
                {...register('employeeId')}
                placeholder="ID de l'employé(e)"
              />
              {errors.employeeId && (
                <S.Error>{errors.employeeId.message}</S.Error>
              )} */}
            </S.Field>

            <S.Field>
              <S.Label>Type de congé *</S.Label>
              <S.Select {...register('type')}>
                <option value="Annuel">Congé annuel</option>
                <option value="Maladie">Congé maladie</option>
                <option value="Maternité">Congé maternité</option>
                <option value="Non payé">Congé non payé</option>
                <option value="Autre">Autre</option>
              </S.Select>
              {errors.type && (
                <S.Error>{errors.type.message}</S.Error>
              )}
            </S.Field>
          </S.Grid>

          <S.Grid>
            <S.Field>
              <S.Label>Date de début *</S.Label>
              <S.Input
                type="date"
                {...register('startDate')}
              />
              {errors.startDate && (
                <S.Error>{errors.startDate.message}</S.Error>
              )}
            </S.Field>

            <S.Field>
              <S.Label>Date de fin *</S.Label>
              <S.Input
                type="date"
                {...register('endDate')}
              />
              {errors.endDate && (
                <S.Error>{errors.endDate.message}</S.Error>
              )}
            </S.Field>
          </S.Grid>

          <S.Grid>
            <S.Field>
              <S.Label>Durée (jours) *</S.Label>
              <S.Input
                type="number"
                min="1"
                {...register('days', {
                  valueAsNumber: true,
                })}
              />
              {errors.days && (
                <S.Error>{errors.days.message}</S.Error>
              )}
            </S.Field>

            <S.Field>
              <S.Label>Statut *</S.Label>
              <S.Select {...register('status')}>
                <option value="En attente">En attente</option>
                <option value="Approuvé">Approuvé</option>
                <option value="Rejeté">Rejeté</option>
                <option value="Annulé">Annulé</option>
              </S.Select>
            </S.Field>
          </S.Grid>

          <S.Field>
            <S.Label>Motif / Raison *</S.Label>
            <S.TextArea
              {...register('reason')}
              rows={4}
              placeholder="Décrivez la raison de la demande..."
            />
            {errors.reason && (
              <S.Error>{errors.reason.message}</S.Error>
            )}
          </S.Field>
        </S.Section>

        {/* Validation & approbation */}
        <S.Section>
          <S.SectionTitle>Validation & approbation</S.SectionTitle>

          {/* <S.Grid>
            <S.Field>
              <S.Label>Approuvé par</S.Label>
              <S.Input
                {...register('approvedBy')}
                placeholder="ID du responsable"
              />
            </S.Field>

            <S.Field>
              <S.Label>Date d’approbation</S.Label>
              <S.Input
                type="date"
                {...register('approvedAt')}
              />
            </S.Field>
          </S.Grid> */}

          <S.Field>
            <S.Label>Motif du rejet (si applicable)</S.Label>
            <S.TextArea
              {...register('rejectionReason')}
              rows={3}
              placeholder="Raison du rejet..."
            />
          </S.Field>
        </S.Section>

        {/* Contact d'urgence */}
        {/* <S.Section>
          <S.SectionTitle>Contact d’urgence</S.SectionTitle>

          <S.Grid>
            <S.Field>
              <S.Label>Nom</S.Label>
              <S.Input
                {...register('emergencyContact.name')}
                placeholder="Nom complet"
              />
            </S.Field>

            <S.Field>
              <S.Label>Téléphone</S.Label>
              <S.Input
                {...register('emergencyContact.phone')}
                placeholder="+22370000000"
              />
            </S.Field>
          </S.Grid>
        </S.Section> */}

        {/* Documents & passation */}
        {/* <S.Section>
          <S.SectionTitle>Documents & passation</S.SectionTitle>

          <S.Field>
            <S.Label>Pièce jointe (URL ou référence)</S.Label>
            <S.Input
              {...register('attachment')}
              placeholder="Certificat médical, document RH..."
            />
          </S.Field>

          <S.Field>
            <S.Label>Notes de passation</S.Label>
            <S.TextArea
              {...register('handoverNotes')}
              rows={4}
              placeholder="Instructions pour la continuité des tâches..."
            />
          </S.Field>
        </S.Section> */}

        <S.Actions>
          <S.CancelButton
            type="button"
            onClick={onClose}
          >
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