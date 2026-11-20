export type SiteId = 'riverside' | 'water-station-7' | 'fulfillment-3' | 'all';

export type AutonomyLevel = 'inform' | 'advise' | 'approve' | 'autonomous';

export type StageId = 'connect' | 'model' | 'detect' | 'measure' | 'serve' | 'decide';

export type EventSeverity = 'critical' | 'high' | 'medium' | 'low';
export type EventStatus = 'active' | 'investigating' | 'acknowledged' | 'resolved';

export interface SensorPoint {
  id: string;
  tag: string;
  name: string;
  unit: string;
  currentValue: number;
  normalRange: [number, number];
  warningRange: [number, number];
  criticalLimit: number;
  rateOfChange?: string;
  trustScore: number; // 0.00 to 1.00
  status: 'normal' | 'warning' | 'critical' | 'stale';
  lastUpdated: string;
}

export interface Asset {
  id: string;
  name: string;
  code: string;
  siteId: 'riverside' | 'water-station-7' | 'fulfillment-3';
  area: string;
  line: string;
  category: 'Pump' | 'Conveyor' | 'Compressor' | 'Tank' | 'Motor' | 'Sorter';
  healthScore: number; // 0 to 100
  healthStatus: 'optimal' | 'good' | 'degrading' | 'critical';
  operatingHours: number;
  criticality: 'A (High)' | 'B (Medium)' | 'C (Standard)';
  owner: string;
  openWorkOrderId?: string;
  activeEventId?: string;
  sensors: SensorPoint[];
  limits: string;
  maintenanceSchedule: string;
  lastServiceDate: string;
  orderAtRisk?: string;
}

export interface IndustrialEvent {
  id: string;
  name: string;
  assetId: string;
  assetName: string;
  siteId: string;
  siteName: string;
  area: string;
  line: string;
  severity: EventSeverity;
  status: EventStatus;
  timestamp: string;
  trustScore: number;
  daysToLimit: number;
  assignedOwner: string;
  description: string;
  ordersAtRisk: Array<{ id: string; customer: string; value: string; deadline: string }>;
  sirachRecommendationId?: string;
  rootCauseSummary: string;
}

export interface ModuleInfo {
  id: string; // e.g. LX-01, LX-S1
  name: string;
  stage: StageId;
  shortDescription: string;
  detailedDescription: string;
  primaryUser: string;
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3';
  inputs: string[];
  outputs: string[];
  dependencies: string[];
  connectedModules: string[];
  exampleData: any;
  status: 'active' | 'operational' | 'pilot' | 'planned';
  isScadaExpansion?: boolean;
}

export interface SirachOption {
  id: 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  estimatedCost: string;
  productionImpact: string;
  riskRating: 'Very Low' | 'Low' | 'Medium' | 'High';
  confidenceScore: number; // e.g. 0.94
  recommended: boolean;
  approvalRequired: boolean;
  timeline: string;
  supportingEvidence: string[];
}

export interface SirachDecision {
  id: string;
  eventId: string;
  eventName: string;
  assetId: string;
  assetName: string;
  timestamp: string;
  contextSummary: string;
  businessExposure: string;
  confidence: number;
  options: SirachOption[];
  selectedOptionId?: 'A' | 'B' | 'C' | 'D';
  status: 'evaluating' | 'recommended' | 'submitted' | 'approved' | 'rejected' | 'executed';
}

export interface ApprovalRequest {
  id: string;
  title: string;
  requestType: 'Maintenance Work Order' | 'Parts Purchase' | 'Load Reduction' | 'Emergency Protocol' | 'Setpoint Modification';
  assetId: string;
  assetName: string;
  siteName: string;
  businessImpact: string;
  cost: string;
  recommendation: string;
  evidence: string[];
  requestingAgent: 'Sirach Reliability Agent' | 'Sirach Energy Agent' | 'Sirach Quality Agent';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  decisionId: string;
  eventId: string;
  rejectionReason?: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface OutcomeRecord {
  id: string;
  actionTaken: string;
  assetId: string;
  assetName: string;
  siteName: string;
  completionTime: string;
  result: 'Optimal Restored' | 'Defect Mitigated' | 'Order Protected' | 'Partial Recovery';
  downtimeAvoided: string;
  costIncurred: string;
  approver: string;
  technician: string;
  evidence: string[];
  notes: string;
  timestamp: string;
}

export interface DataSourceItem {
  id: string;
  name: string;
  protocol: 'OPC UA' | 'MQTT' | 'Historian (PI)' | 'REST / ERP' | 'RTU / Modbus' | 'LIMS' | 'MES';
  category: 'OT Control' | 'OT Historian' | 'IT Enterprise' | 'IoT Edge' | 'Quality Lab';
  site: string;
  status: 'connected' | 'degraded' | 'offline' | 'pending';
  latencyMs: number;
  dataGaps: number;
  receivedTagsCount: number;
  trustRating: number;
  lastPoll: string;
  sampleRecord: Record<string, any>;
}

export interface IndustrySolution {
  id: string;
  name: string;
  tagline: string;
  scadaNeed: string;
  luminixOrchestration: string;
  keyModules: string[];
  kpis: string[];
  exampleEvents: string[];
  sirachRecommendations: string[];
  expectedBusinessValue: string[];
  sampleDatasetNotes: string;
}

export interface SeiretsuApp {
  id: string;
  name: string;
  role: string;
  category: 'Decisions' | 'Chat & Voice' | 'ERP AI' | 'EAM / CMMS' | 'EHS / Risk' | 'Twin / BI';
  usesLuminixFor: string;
  writesBack: string;
  exampleAction: string;
  sampleQuery: string;
  sampleResponse: Record<string, any>;
  color: string;
}

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  title: string;
  department: string;
  siteId: SiteId;
  siteName: string;
  approvalLimit: string;
  securityClearance: string;
  seiretsuId: string;
  autonomyPolicy: AutonomyLevel;
}

