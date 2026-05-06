import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/common/Modal';
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from '@/store/features/employees/employeesApi';
import { EmployeeSchema as employeeSchema } from '@/schemas/employeeSchema';
import * as S from '../Modal.styles';

export default function EmployeeModal({ isOpen, onClose, employee }) {
  const isEditing = !!employee;
  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  const defaultValues = {
    employeeId: '',
    firstName: '',
    lastName: '',
    workEmail: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    nationalId: '',
    address: { street: '', city: '', state: '', postalCode: '', country: '' },
    contact: { phone: '', personalEmail: '' },
    position: '',
    department: '',
    hireDate: '',
    contractType: 'permanent',
    contractEndDate: '',
    employmentStatus: 'active',
    terminationDate: '',
    salaryInfo: { 
      baseSalary: 0,
      currency: 'XOF',
      payFrequency: 'monthly',
      bankAccount: { bankName: '', accountNumber: '', accountHolder: '' },
      allowances: { transportation: 0, housing: 0, other: 0 },
      deductions: { tax: 0, socialSecurity: 0, other: 0 },
    },
    leaveBalance: { annual: 0, sick: 0, unpaid: 0 },
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  useEffect(() => {
    if (employee) {
      const formatted = {
        ...employee,
        dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth).toISOString().split('T')[0] : '',
        hireDate: employee.hireDate ? new Date(employee.hireDate).toISOString().split('T')[0] : '',
        contractEndDate: employee.contractEndDate ? new Date(employee.contractEndDate).toISOString().split('T')[0] : '',
        terminationDate: employee.terminationDate ? new Date(employee.terminationDate).toISOString().split('T')[0] : '',
      };
      reset(formatted);
    } else {
      reset(defaultValues);
    }
  }, [employee, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateEmployee({ id: employee._id, ...data }).unwrap();
      } else {
        await createEmployee(data).unwrap();
      }
      onClose();
    } catch (err) {
      console.log('Erreur lors de l\'enregistrement', err);  
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Modifier l\'employé' : 'Nouvel employé'} size="lg">
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {/* Informations de base */}
        <S.Section>
          <S.SectionTitle>Informations de base</S.SectionTitle>
          <S.Grid>
            <S.Field>
              <S.Label>Identifiant employé *</S.Label>
              <S.Input {...register('employeeId')} placeholder="AGRI-001" />
              {errors.employeeId && <S.Error>{errors.employeeId.message}</S.Error>}
            </S.Field>
            <S.Field>
              <S.Label>Email professionnel *</S.Label>
              <S.Input {...register('workEmail')} type="email" placeholder="prenom.nom@entreprise.com" />
              {errors.workEmail && <S.Error>{errors.workEmail.message}</S.Error>}
            </S.Field>
          </S.Grid>

          <S.Grid>
            <S.Field>
              <S.Label>Prénom *</S.Label>
              <S.Input {...register('firstName')} />
              {errors.firstName && <S.Error>{errors.firstName.message}</S.Error>}
            </S.Field>
            <S.Field>
              <S.Label>Nom *</S.Label>
              <S.Input {...register('lastName')} />
              {errors.lastName && <S.Error>{errors.lastName.message}</S.Error>}
            </S.Field>
          </S.Grid>

          <S.Grid>
            <S.Field>
              <S.Label>Date de naissance</S.Label>
              <S.Input type="date" {...register('dateOfBirth')} />
            </S.Field>
            <S.Field>
              <S.Label>Genre</S.Label>
              <S.Select {...register('gender')}>
                <option value="">Sélectionner...</option>
                <option value="Male">Masculin</option>
                <option value="Female">Féminin</option>
              </S.Select>
            </S.Field>
          </S.Grid>

          <S.Grid>
            <S.Field>
              <S.Label>Situation matrimoniale</S.Label>
              <S.Select {...register('maritalStatus')}>
                <option value="">Sélectionner...</option>
                <option value="single">Célibataire</option>
                <option value="married">Marié(e)</option>
                <option value="divorced">Divorcé(e)</option>
                <option value="widowed">Veuf/Veuve</option>
              </S.Select>
            </S.Field>
            <S.Field>
              <S.Label>Identifiant national (NINA)</S.Label>
              <S.Input {...register('nationalId')} placeholder="NINA123456789" />
            </S.Field>
          </S.Grid>
        </S.Section>

        {/* Contact & Adresse */}
        <S.Section>
          <S.SectionTitle>Contact</S.SectionTitle>
          <S.Grid>
            <S.Field>
              <S.Label>Téléphone *</S.Label>
              <S.Input {...register('contact.phone')} placeholder="+22370123456" />
              {errors.contact?.phone && <S.Error>{errors.contact.phone.message}</S.Error>}
            </S.Field>
            <S.Field>
              <S.Label>Email personnel *</S.Label>
              <S.Input type="email" {...register('contact.personalEmail')} placeholder="exemple@domaine.com" />
              {errors.contact?.personalEmail && <S.Error>{errors.contact.personalEmail.message}</S.Error>}
            </S.Field>
          </S.Grid>
          <S.Field>
            <S.Label>Adresse (rue)</S.Label>
            <S.Input {...register('address.street')} placeholder="Rue 123" />
          </S.Field>
          <S.Grid>
            <S.Field>
              <S.Label>Ville</S.Label>
              <S.Input {...register('address.city')} placeholder="Bamako" />
            </S.Field>
            <S.Field>
              <S.Label>Région</S.Label>
              <S.Input {...register('address.state')} />
            </S.Field>
          </S.Grid>
          <S.Grid>
            <S.Field>
              <S.Label>Code postal</S.Label>
              <S.Input {...register('address.postalCode')} />
            </S.Field>
            <S.Field>
              <S.Label>Pays</S.Label>
              <S.Input {...register('address.country')} placeholder="Mali" />
            </S.Field>
          </S.Grid>
        </S.Section>

        {/* Emploi et contrat */}
        <S.Section>
          <S.SectionTitle>Emploi et contrat</S.SectionTitle>
          <S.Grid>
            <S.Field>
              <S.Label>Poste *</S.Label>
              <S.Input {...register('position')} placeholder="Ingénieur des Constructions Civiles" />
              {errors.position && <S.Error>{errors.position.message}</S.Error>}
            </S.Field>
            <S.Field>
              <S.Label>Département *</S.Label>
              <S.Input {...register('department')} placeholder="Infrastructures" />
              {errors.department && <S.Error>{errors.department.message}</S.Error>}
            </S.Field>
          </S.Grid>
          <S.Grid>
            <S.Field>
              <S.Label>Date d&apos;embauche *</S.Label>
              <S.Input type="date" {...register('hireDate')} />
              {errors.hireDate && <S.Error>{errors.hireDate.message}</S.Error>}
            </S.Field>
            <S.Field>
              <S.Label>Type de contrat *</S.Label>
              <S.Select {...register('contractType')}>
                <option value="permanent">CDI</option>
                <option value="fixed-term">CDD</option>
                <option value="intern">Stage</option>
                <option value="consultant">Consultant</option>
              </S.Select>
            </S.Field>
          </S.Grid>
          <S.Grid>
            <S.Field>
              <S.Label>Date de fin de contrat (si CDD)</S.Label>
              <S.Input type="date" {...register('contractEndDate')} />
            </S.Field>
            <S.Field>
              <S.Label>Statut d&apos;emploi</S.Label>
              <S.Select {...register('employmentStatus')}>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="terminated">Licencié</option>
                <option value="on-leave">En congé</option>
              </S.Select>
            </S.Field>
          </S.Grid>
          <S.Field>
            <S.Label>Date de cessation</S.Label>
            <S.Input type="date" {...register('terminationDate')} />
          </S.Field>
        </S.Section>

        {/* Informations salariales */}
        <S.Section>
          <S.SectionTitle>Informations salariales</S.SectionTitle>
          <S.Grid>
            <S.Field>
              <S.Label>Salaire de base * (XOF)</S.Label>
              <S.Input type="number" step="0.01" {...register('salaryInfo.baseSalary', { valueAsNumber: true })} />
              {errors.salaryInfo?.baseSalary && <S.Error>{errors.salaryInfo.baseSalary.message}</S.Error>}
            </S.Field>
            <S.Field>
              <S.Label>Devise</S.Label>
              <S.Input {...register('salaryInfo.currency')} defaultValue="XOF" />
            </S.Field>
          </S.Grid>
          <S.Grid>
            <S.Field>
              <S.Label>Fréquence de paiement</S.Label>
              <S.Select {...register('salaryInfo.payFrequency')}>
                <option value="monthly">Mensuel</option>
                <option value="bi-weekly">Bimensuel</option>
                <option value="weekly">Hebdomadaire</option>
              </S.Select>
            </S.Field>
          </S.Grid>
          <S.Field>
            <S.Label>Compte bancaire (optionnel)</S.Label>
            <S.Grid>
              <S.Input placeholder="Nom de la banque" {...register('salaryInfo.bankAccount.bankName')} />
              <S.Input placeholder="Numéro de compte" {...register('salaryInfo.bankAccount.accountNumber')} />
              <S.Input placeholder="Titulaire du compte" {...register('salaryInfo.bankAccount.accountHolder')} />
            </S.Grid>
          </S.Field>
          <S.SubSection>
            <S.Label>Indemnités</S.Label>
            <S.Grid>
              <S.Field>
                <S.Label>Transport</S.Label>
                <S.Input type="number" step="0.01" {...register('salaryInfo.allowances.transportation', { valueAsNumber: true })} />
              </S.Field>
              <S.Field>
                <S.Label>Logement</S.Label>
                <S.Input type="number" step="0.01" {...register('salaryInfo.allowances.housing', { valueAsNumber: true })} />
              </S.Field>
              <S.Field>
                <S.Label>Autre</S.Label>
                <S.Input type="number" step="0.01" {...register('salaryInfo.allowances.other', { valueAsNumber: true })} />
              </S.Field>
            </S.Grid>
          </S.SubSection>
          <S.SubSection>
            <S.Label>Déductions</S.Label>
            <S.Grid>
              <S.Field>
                <S.Label>Impôts</S.Label>
                <S.Input type="number" step="0.01" {...register('salaryInfo.deductions.tax', { valueAsNumber: true })} />
              </S.Field>
              <S.Field>
                <S.Label>Sécurité sociale</S.Label>
                <S.Input type="number" step="0.01" {...register('salaryInfo.deductions.socialSecurity', { valueAsNumber: true })} />
              </S.Field>
              <S.Field>
                <S.Label>Autre</S.Label>
                <S.Input type="number" step="0.01" {...register('salaryInfo.deductions.other', { valueAsNumber: true })} />
              </S.Field>
            </S.Grid>
          </S.SubSection>
        </S.Section>

        {/* Solde de congés */}
        <S.Section>
          <S.SectionTitle>Solde de congés</S.SectionTitle>
          <S.Grid>
            <S.Field>
              <S.Label>Annuel (jours)</S.Label>
              <S.Input type="number" {...register('leaveBalance.annual', { valueAsNumber: true })} />
            </S.Field>
            <S.Field>
              <S.Label>Maladie (jours)</S.Label>
              <S.Input type="number" {...register('leaveBalance.sick', { valueAsNumber: true })} />
            </S.Field>
            <S.Field>
              <S.Label>Sans solde (jours)</S.Label>
              <S.Input type="number" {...register('leaveBalance.unpaid', { valueAsNumber: true })} />
            </S.Field>
          </S.Grid>
        </S.Section>

        <S.Actions>
          <S.CancelButton type="button" onClick={onClose}>Annuler</S.CancelButton>
          <S.SubmitButton type="submit" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? 'Enregistrement...' : (isEditing ? 'Mettre à jour' : 'Créer')}
          </S.SubmitButton>
        </S.Actions>
      </S.Form>
    </Modal>
  );
}