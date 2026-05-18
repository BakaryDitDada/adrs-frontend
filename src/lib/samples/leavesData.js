export const SAMPLE_LEAVES = [
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e01',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d01', // Amadou Diallo
    type: 'Annuel',
    startDate: '2026-04-10T00:00:00.000Z',
    endDate: '2026-04-20T00:00:00.000Z',
    days: 7,
    reason: 'Congé familial au village',
    status: 'Approuvé',
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e02',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d02', // Fatou Coulibaly
    type: 'Maladie',
    startDate: '2026-05-01T00:00:00.000Z',
    endDate: '2026-05-03T00:00:00.000Z',
    days: 2,
    reason: 'Paludisme',
    status: 'Approuvé',
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e03',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d03', // Ibrahim Traore
    type: 'Non payé',
    startDate: '2026-06-01T00:00:00.000Z',
    endDate: '2026-06-15T00:00:00.000Z',
    days: 10,
    reason: 'Voyage personnel à l’étranger',
    status: 'En attente',
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e04',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d04', // Aminata Kone
    type: 'Annuel',
    startDate: '2026-07-20T00:00:00.000Z',
    endDate: '2026-08-05T00:00:00.000Z',
    days: 12,
    reason: 'Vacances estivales',
    status: 'Approuvé',
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e05',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d05', // Moussa Keita
    type: 'Maladie',
    startDate: '2026-03-15T00:00:00.000Z',
    endDate: '2026-03-17T00:00:00.000Z',
    days: 2,
    reason: 'Consultation médicale',
    status: 'Rejeté',
    rejectionReason: 'Certificat médical non fourni',
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e06',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d01', // Amadou Diallo
    type: 'Autre',
    startDate: '2026-08-01T00:00:00.000Z',
    endDate: '2026-08-01T12:00:00.000Z',
    days: 0.5,
    reason: 'Démarche administrative',
    status: 'Annulé',
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e07',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d02', // Fatou Coulibaly
    type: 'Annuel',
    startDate: '2026-09-05T00:00:00.000Z',
    endDate: '2026-09-09T00:00:00.000Z',
    days: 5,
    status: 'En attente',   // no reason provided (optional)
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e08',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d03', // Ibrahim Traore
    type: 'Maladie',
    startDate: '2026-02-10T00:00:00.000Z',
    endDate: '2026-02-12T00:00:00.000Z',
    days: 2,
    reason: 'Grippe sévère',
    status: 'Approuvé',
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e09',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d04', // Aminata Kone
    type: 'Non payé',
    startDate: '2026-10-01T00:00:00.000Z',
    endDate: '2026-10-10T00:00:00.000Z',
    days: 7,
    reason: 'Formation personnelle',
    status: 'En attente',
  },
  {
    _id: '64fa1b2c3d4e5f6a7b8c9e10',
    employeeId: '64fa1b2c3d4e5f6a7b8c9d05', // Moussa Keita
    type: 'Annuel',
    startDate: '2026-12-20T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    days: 8,
    reason: 'Fêtes de fin d’année',
    status: 'Approuvé',
  },
];

export const getSampleLeavesResponse = () => ({
  data: SAMPLE_LEAVES,
  total: SAMPLE_LEAVES.length,
});