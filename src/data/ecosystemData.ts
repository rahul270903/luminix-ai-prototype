import { SeiretsuApp } from '../types';

export const SEIRETSU_APPS: SeiretsuApp[] = [
  {
    id: 'sirach',
    name: 'Sirach Ai',
    role: 'Autonomous Operational Reasoning & Decision Engine',
    category: 'Decisions',
    usesLuminixFor: 'Asset health, anomaly events, governed KPIs, root-cause timelines, customer order exposure.',
    writesBack: 'Decisions, ranked options, human approvals, and outcome feedback (into the knowledge graph).',
    exampleAction: 'Ranks bearing swap vs. run-to-limit for Pump P-104 with 94% confidence.',
    sampleQuery: 'GET /context/decisions/evaluate?event=EVT-104&horizon=48h',
    sampleResponse: {
      decision: 'Option C Recommended',
      confidence: 0.94,
      cost: '$18,000',
      unplannedDowntimeAvoided: '18 hours',
      citations: ['historian:TT-104A', 'trestara:WO-3381', 'veloris:SO-4471']
    },
    color: '#4F7DF3'
  },
  {
    id: 'nikolai',
    name: 'Nikolai',
    role: 'Industrial Natural Language Chat & Voice Assistant',
    category: 'Chat & Voice',
    usesLuminixFor: 'Grounded factual operational answers with verifiable source citations.',
    writesBack: 'Operator questions asked, voice transcripts, technician feedback.',
    exampleAction: 'Answers: "Why is Line 2 MTBF down?" citing Pump P-104 bearing friction.',
    sampleQuery: 'POST /context/query { "prompt": "Why did Line 2 OEE dip today?" }',
    sampleResponse: {
      answer: 'Line 2 OEE dropped to 78.2% at 12:00 due to bearing thermal friction on Pump P-104 (sensor TT-104A at 78.4°C). Order #4471 is exposed.',
      citations: ['LX-06:OEE_v3', 'historian:TT-104A', 'trestara:WO-3381']
    },
    color: '#27B6A8'
  },
  {
    id: 'saigen',
    name: 'SAIGEN',
    role: 'ERP AI Supply Chain & Automated Requisitioning',
    category: 'ERP AI',
    usesLuminixFor: 'Operational machine context for ERP material planning, procurement, and shipping schedules.',
    writesBack: 'Purchase orders, stock reservations, vendor expedite notices, delivery schedule revisions.',
    exampleAction: 'Issues PO-9921 for replacement bearing kit #SKF-6318 after night shift approval.',
    sampleQuery: 'POST /erp/requisitions/auto-generate { "asset": "P-104", "part": "SKF-6318" }',
    sampleResponse: {
      poNumber: 'PO-9921',
      vendor: 'Motion Industries Inc.',
      amount: '$2,400.00',
      status: 'Issued & Confirmed for Re-stocking'
    },
    color: '#8B5CF6'
  },
  {
    id: 'trestara',
    name: 'Trestara',
    role: 'Next-Gen Enterprise Asset Management (EAM / CMMS)',
    category: 'EAM / CMMS',
    usesLuminixFor: 'Continuous condition and anomaly event context for predictive maintenance scheduling.',
    writesBack: 'Maintenance work orders, parts staging confirmations, technician shift logs, task completions.',
    exampleAction: 'Creates and schedules WO-3381 for night shift (02:00-04:30 EST) with pre-staged parts.',
    sampleQuery: 'POST /eam/work-orders/schedule { "wo": "WO-3381", "window": "Night Sanitation" }',
    sampleResponse: {
      workOrderId: 'WO-3381',
      technician: 'J. Patel (Certified Vib Level III)',
      bay: 'Bay 4',
      partsStaged: 'Warehouse Bin C-14 verified'
    },
    color: '#E9AC45'
  },
  {
    id: 'thorium',
    name: 'Thorium',
    role: 'Environmental Health, Safety (EHS) & Operational Risk',
    category: 'EHS / Risk',
    usesLuminixFor: 'Live telemetry, permits, gas sensors, lockout-tagout states, and incident history around assets.',
    writesBack: 'Risk assessments, hot-work permits, safety clearances, compliance audits.',
    exampleAction: 'Pre-clears Hot Work & Lockout permit PER-HW-8841 before night shift bearing overhaul.',
    sampleQuery: 'GET /ehs/permits/verify?asset=P-104&type=HOT_WORK',
    sampleResponse: {
      permitNumber: 'PER-HW-8841',
      safetyOfficer: 'R. Simmons',
      status: 'Pre-Cleared for 02:00 EST Window',
      lotoProtocol: 'LOTO-ELEC-480V-P104 active'
    },
    color: '#E45D5D'
  },
  {
    id: 'twin-bi',
    name: 'Twin / BI Analytics',
    role: '2D/3D Plant Twins & Executive Business Intelligence',
    category: 'Twin / BI',
    usesLuminixFor: 'Current machine state, 2D coordinates, 3D glTF models, and standardized KPI streams.',
    writesBack: 'Visual annotations, spatial heatmaps, executive dashboard bookmarks.',
    exampleAction: 'Renders 2D thermal layout showing Pump P-104 in critical red state.',
    sampleQuery: 'WS /stream/spatial/v1/line2',
    sampleResponse: {
      syncedNodes: 320,
      gradient: 'Thermal Excursion at coordinates [440, 240]',
      fps: 60
    },
    color: '#06B6D4'
  }
];
