import { Badge } from "@/components/common/Common.styles";
import { employmentStatusArray, returnStringifiedValue } from "@/utils";

// EMPLOYEES DATA
export const employeesFilteredPDFData = (data) => data.map((employee) => ({
  ID: employee._id,
  ["Matricule"]: employee.employeeId,
  ["Nom"]: employee.lastName,
  ["Prénom"]: employee.firstName,
  ["Email professionnel"]: employee.workEmail,
  ["Poste"]: employee.position,
  ["Département"]: employee.department,
  ["Statut"]: employee.employmentStatus,
  ["Date d'embauche"]: employee.hireDate
    ? new Date(employee.hireDate).toLocaleDateString()
    : "—",
  ["Type de contrat"]: employee.contractType,
}));

export const employeesFilteredExcelData = (data) => data.map((employee) => ({
  ID: employee._id,
  ["Matricule"]: employee.employeeId,
  ["Nom"]: employee.lastName,
  ["Prénom"]: employee.firstName,
  ["Email professionnel"]: employee.workEmail,
  ["Poste"]: employee.position,
  ["Département"]: employee.department,
  ["Statut"]: employee.employmentStatus,
  ["Date d'embauche"]: employee.hireDate
    ? new Date(employee.hireDate).toLocaleDateString()
    : "—",
  ["Type de contrat"]: employee.contractType,
  ["Salaire de base"]: employee.salaryInfo?.baseSalary
    ? employee.salaryInfo?.baseSalary
    : "-",
  ["Devise"]: employee?.salaryInfo?.currency || "-",
  ["Fréquence de paiement"]: employee?.salaryInfo?.payFrequency || "-",
  ["Numéro de téléphone"]: employee?.contact?.phone || "-",
  ["Email personnel"]: employee?.contact?.personalEmail || "-",
}));

export const employeesTableData = [
  { header: 'ID', field: 'employeeId' },
  { header: 'Prénom', field: 'firstName' },
  { header: 'Nom', field: 'lastName' },
  {
    header: 'Email professionnel',
    field: 'workEmail',
    cellRenderer: (value) => <a href={`mailto:${value}`}>{value}</a>,
  },
  { header: 'Poste', field: 'position' },
  { header: 'Département', field: 'department' },
  {
    header: 'Statut',
    field: 'employmentStatus',
    cellRenderer: (value) => <Badge status={value}>{returnStringifiedValue(value, employmentStatusArray)}</Badge>,
  },
  {
    header: 'Date d’embauche',
    field: 'hireDate',
    type: 'date',
  },
  { badge: 'actions', header: 'Actions' },
];

// LEAVES DATA
export const leavesFilteredPDFData = (data) => data.map((leave) => ({
  ID: leave._id,
  ["Employé(e)"]:
    leave.employeeId?.firstName + " " + leave.employeeId?.lastName || "-",
  ["Type de congé"]: leave.type,
  ["Date de début"]: leave.startDate
    ? new Date(leave.startDate).toLocaleDateString()
    : "—",
  ["Date de fin"]: leave.endDate
    ? new Date(leave.endDate).toLocaleDateString()
    : "—",
  ["Durée"]: leave.days || "-",
  ["Statut"]: leave.status,
  ["Raison"]: leave.reason || "-",
}));

export const leavesFilteredExcelData = (data) => data.map((leave) => ({
  ID: leave._id,
  ["Employé(e)"]:
    leave.employeeId?.firstName + " " + leave.employeeId?.lastName || "-",
  ["Type de congé"]: leave.type,
  ["Date de début"]: leave.startDate
    ? new Date(leave.startDate).toLocaleDateString()
    : "—",
  ["Date de fin"]: leave.endDate
    ? new Date(leave.endDate).toLocaleDateString()
    : "—",
  ["Durée"]: leave.days || "-",
  ["Statut"]: leave.status,
  ["Raison"]: leave.reason || "-",
  ["Approuvé par"]: leave.approvedBy?.username || "-",
  ["Date de création"]: leave.createdAt
    ? new Date(leave.createdAt).toLocaleDateString()
    : "—",
}));

export const leavesTableData = [
    {
      header: 'Employé(e)',
      field: 'employeeId',
      cellRenderer: (_, row) => row.employeeId?.firstName + " " + row.employeeId?.lastName || '-',
    },
    { header: 'Type de congé', field: 'type' },
    {
      header: 'Date de début',
      field: 'startDate',
      type: 'date',
    },
    {
      header: 'Date de fin',
      field: 'endDate',
      type: 'date',
    },
    { header: 'Durée', field: 'days' },
    {
      header: 'Statut',
      field: 'status',
      // cellRenderer: (value) => <S.Badge status={value}>{returnStringifiedValue(value, leaveStatusArray)}</S.Badge>,
      cellRenderer: (value) => <Badge status={value}>{value}</Badge>,
    },
    { header: 'Raison', field: 'reason' },
    { badge: 'actions', header: 'Actions' },
  ];
