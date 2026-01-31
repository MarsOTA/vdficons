export type ScreenType = 'DASHBOARD' | 'STAFF' | 'CREAZIONE' | 'GENERATORE';

export type UserRole =
  | 'REDATTORE'
  | 'APPROVATORE'
  | 'COMPILATORE_A'
  | 'COMPILATORE_B'
  | 'COMPILATORE_C'
  | 'COMPILATORE_D';

export enum EventStatus {
  IN_COMPILAZIONE = 'IN COMPILAZIONE',
  ATTESA_APPROVAZIONE = 'ATTESA APPROVAZIONE',
  APPROVATO = 'APPROVATO',
  CRITICO = 'CRITICO',
  COMPLETATO = 'COMPLETATO'
}

export interface VehicleRequirements {
  APS: number;
  AS: number;
  ABP: number;
}

export interface PersonnelRequirement {
  role: 'DIR' | 'CP' | 'VIG' | 'ALTRO';
  qty: number;

  assignedIds: (string | null)[];                 // dimensione qty
  entrustedGroups?: (string | null)[];            // dimensione qty: gruppo attualmente proprietario dello slot (A/B/C/D) oppure null
  entrustedByGroups?: (string | null)[];          // dimensione qty: chi ha passato (provenienza)

  // Contatore passaggi del testimone (0..4). Quando >=4 e slot ancora vuoto, lo slot diventa "VACANTE".
  entrustPassCount?: number[];                    // dimensione qty

  specializations?: string[];
}

export interface OperationalEvent {
  id: string;
  code: string;
  location: string;
  date: string;
  timeWindow: string;
  status: EventStatus;
  vehicles: VehicleRequirements;
  requirements: PersonnelRequirement[];
  approvedByAdmin?: boolean;
  isOlympic?: boolean;
  requiredSpecializations?: string[];
  createdBy?: string;
}

export interface Operator {
  id: string;
  name: string;
  rank: string;
  group: string; // A, B, C, D
  subgroup: string; // A1, A2...
  qualification: 'DIR' | 'CP' | 'VIG' | 'ALTRO';
  available: boolean;
  statusMessage?: string;
  assignedHours: number;
  specializations?: string[];
  sede?: string;
  tipoPatente?: string;
}
