import { z } from "zod";

export const EmployeeSchema = z.object({
  employeeId: z.string().min(1, "L'identifiant employé est requis"),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  workEmail: z.string().email("Email invalide").min(1, "L'email professionnel est requis"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['Homme', 'Femme']).optional(),
  maritalStatus: z.enum(["Célébataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"]).optional(),
  nationalId: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  contact: z.object({
    phone: z.string().min(1, "Le numéro de téléphone est requis"),
    personalEmail: z.string().email("Email invalide").min(1, "L'email personnel est requis"),
  }),
  position: z.string().min(1, "Le poste est requis"),
  department: z.string().min(1, "Le département est requis"),
  hireDate: z.string().min(1, "La date d'embauche est requise"),
  contractType: z.enum(["CDI", "CDD", "Stagiaire", "Consultant", "Fonctionnaire"], {
    required_error: "Le type de contrat est requis",
    invalid_type_error: "Veuillez sélectionner un type de contrat valide",
  }),
  contractEndDate: z.string().optional(),
  employmentStatus: z.enum(['En activité', 'En formation', 'Licencié', 'En congé', 'Contrat terminé', 'A la retraite']).default('En activité'),
  terminationDate: z.string().optional(),
  salaryInfo: z.object({
    baseSalary: z.coerce.number().min(0, "Le salaire doit être positif"),
    currency: z.string().default('XOF'),
    payFrequency: z.enum(["Mensuel", "Hebdomadaire", "Bi-hebdomadaire"]),
    bankAccount: z.object({
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      accountHolder: z.string().optional(),
    }).optional(),
    allowances: z.object({
      transportation: z.number().optional().default(0),
      housing: z.number().optional().default(0),
      other: z.number().optional().default(0),
    }).optional(),
    deductions: z.object({
      tax: z.number().optional().default(0),
      socialSecurity: z.number().optional().default(0),
      other: z.number().optional().default(0),
    }).optional(),
  }),
  leaveBalance: z.object({
    annual: z.number().optional().default(0),
    sick: z.number().optional().default(0),
    unpaid: z.number().optional().default(0),
  }).optional(),
});

// export const EMPLOYEE_FIELDS = Object.keys(EmployeeSchema .shape);

/**
 * Recursively extracts all leaf paths in dot notation.
 * Example: ['firstName', 'lastName', ..., 'salaryInfo.baseSalary', 'salaryInfo.currency', ...]
 */
export function getLeafFieldPaths(schema, prefix = '') {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    let paths = [];
    for (const key in shape) {
      const subSchema = shape[key];
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (subSchema instanceof z.ZodObject) {
        // Recurse into nested object
        paths = paths.concat(getLeafFieldPaths(subSchema, newPrefix));
      } else {
        paths.push(newPrefix);
      }
    }
    return paths;
  }
  return [];
}

// All available leaf paths that can appear in a column header
export const EMP_LEAF_FIELDS = getLeafFieldPaths(EmployeeSchema);
