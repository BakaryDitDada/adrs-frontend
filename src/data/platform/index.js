import { Badge } from "@/components/common/Common.styles";
import { employmentStatusArray, returnStringifiedValue } from "@/utils";
import { formatOverflowList } from "@/utils/formatOverflowList";

// EMPLOYEES DATA
export const employeesFilteredPDFData = (data) => data.map((employee) => ({
  // ID: employee._id,
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
    cellRenderer: (value) => <Badge status={value}>{returnStringifiedValue(value, employmentStatusArray) || value}</Badge>,
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
  // ID: leave._id,
  ["Employé(e)"]:
    (leave.employeeId?.firstName || "-") + " " + (leave.employeeId?.lastName || "-") || "-",
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
    (leave.employeeId?.firstName || "-") + " " + (leave.employeeId?.lastName || "-") || "-",
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
      cellRenderer: (_, row) => (row.employeeId?.firstName || "-") + " " + (row.employeeId?.lastName || "-") || '-',
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
    { badge: 'actions', header: 'Actions', actionsDisplayMode: "dropdown" },
  ];

// tasksFilteredPDFData – used for PDF export (fewer columns)
export const tasksFilteredPDFData = (data) =>
  data.map((task) => ({
    // ID: task._id,
    Titre: task.title,
    Type: task.type || "—",
    Statut: task.status || "—",
    Priorité: task.priority || "—",
    Progression: task.percentage != null ? `${task.percentage}%` : "—",
    "Assigné à": Array.isArray(task.assignedTo)
      ? task.assignedTo.length > 0
        ? task.assignedTo
            .map((u) => (u?.firstName ? `${u.firstName} ${u.lastName}` : u))
            .join(", ")
        : "—"
      : "—",
    "Date de début": task.startDate
      ? new Date(task.startDate).toLocaleDateString()
      : "—",
    "Date d’échéance": task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : "—",
  }));

// tasksFilteredExcelData – richer export for Excel
export const tasksFilteredExcelData = (data) =>
  data.map((task) => ({
    ID: task._id,
    Titre: task.title,
    Description: task.description || "—",
    Type: task.type || "—",
    Statut: task.status || "—",
    Priorité: task.priority || "—",
    Progression: task.percentage != null ? `${task.percentage}%` : "—",
    "Assigné à": Array.isArray(task.assignedTo)
      ? task.assignedTo
          .map((u) => (u?.firstName ? `${u.firstName} ${u.lastName}` : u))
          .join(", ")
      : "—",
    "Date de début": task.startDate
      ? new Date(task.startDate).toLocaleDateString()
      : "—",
    "Date d’échéance": task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : "—",
    Projet: task.projectId?.name || task.projectId || "—",     // if populated
    Catégories: task.categories || "—",
    Notes: task.notes || "—",
    "Date de création": task.createdAt
      ? new Date(task.createdAt).toLocaleDateString()
      : "—",
  }));

// tasksTableData – columns for CustomTable
export const tasksTableData = [
  { header: "Titre", field: "title" },
  { header: "Type", field: "type", cellRenderer: (value) => value || "—" },
  {
    header: "Statut",
    field: "status",
    // We assume you import StatusBadge from your tasksPage.styles
    cellRenderer: (value) => <Badge status={value}>{value || "—"}</Badge>,
  },
  {
    header: "Priorité",
    field: "priority",
    cellRenderer: (value) => <Badge status={value}>{value || "—"}</Badge>,
    // cellRenderer: (value) => <PriorityBadge priority={value}>{value || "—"}</PriorityBadge>,
  },
  {
    header: "%",
    field: "percentage",
    cellRenderer: (value) => (value != null ? `${value}%` : "—"),
  },
  {
    header: "Assigné à",
    field: "assignedTo",
    cellRenderer: (value) => formatOverflowList(
      value.map((u) =>
        `${u.firstName} ${u.lastName}`
      )
    ),
  },
  {
    header: "Date de début",
    field: "startDate",
    type: "date",
  },
  {
    header: "Échéance",
    field: "dueDate",
    type: "date",
  },
  { badge: "actions", header: "Actions", actionsDisplayMode: "dropdown" },
];