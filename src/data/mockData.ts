import { Asset, IndustrialEvent, SirachDecision, ApprovalRequest, OutcomeRecord, DataSourceItem } from '../types';

export const SITES = [
  { id: 'riverside', name: 'Riverside Plant', location: 'Columbus, OH', type: 'Continuous Processing', activeAssets: 14, health: 91 },
  { id: 'water-station-7', name: 'Water Utility – Station 7', location: 'Austin, TX', type: 'Water Treatment & Pumping', activeAssets: 8, health: 87 },
  { id: 'fulfillment-3', name: 'Fulfillment Center – Site 3', location: 'Allentown, PA', type: 'Automated Logistics', activeAssets: 10, health: 95 },
];

export const DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'src-01',
    name: 'Riverside Line 2 OPC UA Server',
    protocol: 'OPC UA',
    category: 'OT Control',
    site: 'Riverside Plant',
    status: 'connected',
    latencyMs: 18,
    dataGaps: 0,
    receivedTagsCount: 4210,
    trustRating: 0.99,
    lastPoll: '2 seconds ago',
    sampleRecord: {
      timestamp: '2026-11-20T14:32:01.428Z',
      nodeId: 'ns=2;s=Line2.Pump104.BearingTemp',
      value: 78.4,
      statusCode: 'Good',
      unit: '°C'
    }
  },
  {
    id: 'src-02',
    name: 'OSIsoft PI Enterprise Historian',
    protocol: 'Historian (PI)',
    category: 'OT Historian',
    site: 'Riverside Plant',
    status: 'connected',
    latencyMs: 34,
    dataGaps: 2,
    receivedTagsCount: 18400,
    trustRating: 0.96,
    lastPoll: '5 seconds ago',
    sampleRecord: {
      timestamp: '2026-11-20T14:31:55.000Z',
      tag: 'RIV_L2_P104_TT104A',
      value: 78.2,
      quality: '192_GOOD',
      confidence: 0.98
    }
  },
  {
    id: 'src-03',
    name: 'Trestara CMMS / EAM Gateway',
    protocol: 'REST / ERP',
    category: 'IT Enterprise',
    site: 'Riverside Plant',
    status: 'connected',
    latencyMs: 110,
    dataGaps: 0,
    receivedTagsCount: 840,
    trustRating: 0.98,
    lastPoll: '12 seconds ago',
    sampleRecord: {
      workOrderId: 'WO-3381',
      assetCode: 'P-104',
      type: 'Condition-Based Maintenance',
      status: 'Open - Assigned',
      assignedTechnician: 'J. Patel'
    }
  },
  {
    id: 'src-04',
    name: 'Veloris ERP Sales & Order Stream',
    protocol: 'REST / ERP',
    category: 'IT Enterprise',
    site: 'Riverside Plant',
    status: 'connected',
    latencyMs: 145,
    dataGaps: 0,
    receivedTagsCount: 320,
    trustRating: 0.99,
    lastPoll: '1 minute ago',
    sampleRecord: {
      salesOrderId: 'SO-4471',
      customer: 'Apex Beverage Brands',
      orderValue: '$1,200,000',
      shippingDeadline: '2026-11-21T18:00:00Z',
      assignedLine: 'Line 2'
    }
  },
  {
    id: 'src-05',
    name: 'MQTT Edge Vibration Gateway (Banner)',
    protocol: 'MQTT',
    category: 'IoT Edge',
    site: 'Riverside Plant',
    status: 'connected',
    latencyMs: 42,
    dataGaps: 1,
    receivedTagsCount: 1250,
    trustRating: 0.95,
    lastPoll: '3 seconds ago',
    sampleRecord: {
      topic: 'sensors/vibration/line2/p104/axis_z',
      rms_velocity_mms: 4.82,
      peak_acceleration_g: 2.14,
      sensorHealth: 'Good'
    }
  },
  {
    id: 'src-06',
    name: 'LIMS Quality Lab Ingestion Bus',
    protocol: 'LIMS',
    category: 'Quality Lab',
    site: 'Riverside Plant',
    status: 'connected',
    latencyMs: 240,
    dataGaps: 0,
    receivedTagsCount: 460,
    trustRating: 0.97,
    lastPoll: '15 minutes ago',
    sampleRecord: {
      sampleId: 'LIMS-B884-21',
      productCode: 'BEV-SYRUP-A',
      viscosity_cSt: 42.1,
      ph: 6.84,
      qaApproval: 'Passed'
    }
  },
  {
    id: 'src-07',
    name: 'Station 7 Remote RTU #1 (Cellular DNP3)',
    protocol: 'RTU / Modbus',
    category: 'OT Control',
    site: 'Water Utility – Station 7',
    status: 'degraded',
    latencyMs: 2400,
    dataGaps: 8,
    receivedTagsCount: 340,
    trustRating: 0.74,
    lastPoll: '42 seconds ago (Stale feed flagged)',
    sampleRecord: {
      rtuAddress: 701,
      modbusRegister: 40012,
      dischargePressure_psi: 62.4,
      carrierSignal_dbm: -108,
      flag: 'DEGRADED_CELLULAR_LINK'
    }
  },
  {
    id: 'src-08',
    name: 'Station 7 High-Service Pump VFD Bus',
    protocol: 'RTU / Modbus',
    category: 'OT Control',
    site: 'Water Utility – Station 7',
    status: 'connected',
    latencyMs: 65,
    dataGaps: 0,
    receivedTagsCount: 780,
    trustRating: 0.98,
    lastPoll: '4 seconds ago',
    sampleRecord: {
      driveId: 'VFD-PUMP-7A',
      outputFrequency_hz: 58.2,
      motorCurrent_amps: 142.6,
      dcBusVoltage: 680
    }
  },
  {
    id: 'src-09',
    name: 'Station 7 Water Quality Spectrometer',
    protocol: 'REST / ERP',
    category: 'Quality Lab',
    site: 'Water Utility – Station 7',
    status: 'connected',
    latencyMs: 85,
    dataGaps: 0,
    receivedTagsCount: 190,
    trustRating: 0.99,
    lastPoll: '20 seconds ago',
    sampleRecord: {
      analyzerId: 'CL2-MON-07',
      residualChlorine_mgL: 1.42,
      turbidity_NTU: 0.08,
      temp_c: 18.2
    }
  },
  {
    id: 'src-10',
    name: 'Site 3 Induct PLC Siemens S7-1500',
    protocol: 'OPC UA',
    category: 'OT Control',
    site: 'Fulfillment Center – Site 3',
    status: 'connected',
    latencyMs: 14,
    dataGaps: 0,
    receivedTagsCount: 6800,
    trustRating: 0.99,
    lastPoll: '1 second ago',
    sampleRecord: {
      dbNumber: 24,
      sorterBeltSpeed_mps: 2.4,
      divertConfirm_bool: true,
      jamSensorState: 'Clear'
    }
  },
  {
    id: 'src-11',
    name: 'Site 3 Shoe Sorter Optical Scanner Array',
    protocol: 'MQTT',
    category: 'IoT Edge',
    site: 'Fulfillment Center – Site 3',
    status: 'connected',
    latencyMs: 22,
    dataGaps: 0,
    receivedTagsCount: 1450,
    trustRating: 0.97,
    lastPoll: '2 seconds ago',
    sampleRecord: {
      scannerId: 'SCAN-INDUCT-B',
      readSuccessRate_pct: 99.88,
      barcodeScanCount: 14210,
      photoEyeLux: 340
    }
  },
  {
    id: 'src-12',
    name: 'Thorium EHS Permit & Safety Core',
    protocol: 'REST / ERP',
    category: 'IT Enterprise',
    site: 'Riverside Plant',
    status: 'connected',
    latencyMs: 98,
    dataGaps: 0,
    receivedTagsCount: 210,
    trustRating: 0.99,
    lastPoll: '4 minutes ago',
    sampleRecord: {
      permitNumber: 'PER-HW-8841',
      permitType: 'Hot Work & Lockout-Tagout',
      status: 'Pre-Approved for Night Shift',
      safetyOfficer: 'R. Simmons'
    }
  }
];

export const ASSETS: Asset[] = [
  {
    id: 'P-104',
    name: 'Centrifugal Slurry Pump P-104',
    code: 'RIV-A2-L2-P104',
    siteId: 'riverside',
    area: 'Area B (Packaging & Fill)',
    line: 'Line 2 (High-Speed Bottling)',
    category: 'Pump',
    healthScore: 68,
    healthStatus: 'degrading',
    operatingHours: 8420,
    criticality: 'A (High)',
    owner: 'J. Patel (Reliability Lead)',
    openWorkOrderId: 'WO-3381',
    activeEventId: 'EVT-104',
    limits: 'Max Bearing Temp: 85°C · Max Vibration: 5.5 mm/s',
    maintenanceSchedule: 'Preventive Overhaul every 10,000 hrs',
    lastServiceDate: '2026-08-14',
    orderAtRisk: 'Apex Beverage #4471 ($1.2M, ships Friday)',
    sensors: [
      {
        id: 'sen-104-1',
        tag: 'TT-104A',
        name: 'Inboard Drive-End Bearing Temperature',
        unit: '°C',
        currentValue: 78.4,
        normalRange: [45.0, 65.0],
        warningRange: [65.0, 80.0],
        criticalLimit: 85.0,
        rateOfChange: '+17.0°C in 36h',
        trustScore: 0.98,
        status: 'warning',
        lastUpdated: '10s ago'
      },
      {
        id: 'sen-104-2',
        tag: 'VIB-104',
        name: 'Horizontal Bearing Housing Vibration',
        unit: 'mm/s',
        currentValue: 4.82,
        normalRange: [0.8, 2.8],
        warningRange: [2.8, 5.0],
        criticalLimit: 5.5,
        rateOfChange: '+1.4 mm/s in 24h',
        trustScore: 0.96,
        status: 'warning',
        lastUpdated: '12s ago'
      },
      {
        id: 'sen-104-3',
        tag: 'AMP-104',
        name: 'Pump Motor Phase Current',
        unit: 'A',
        currentValue: 84.6,
        normalRange: [70.0, 85.0],
        warningRange: [85.0, 95.0],
        criticalLimit: 100.0,
        rateOfChange: '+6.2 A in 12h',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '5s ago'
      },
      {
        id: 'sen-104-4',
        tag: 'PT-104',
        name: 'Discharge Fluid Pressure',
        unit: 'bar',
        currentValue: 6.2,
        normalRange: [5.8, 6.8],
        warningRange: [5.0, 7.2],
        criticalLimit: 7.8,
        rateOfChange: '-0.3 bar',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '8s ago'
      }
    ]
  },
  {
    id: 'P-105',
    name: 'Secondary Feed Booster Pump P-105',
    code: 'RIV-A2-L2-P105',
    siteId: 'riverside',
    area: 'Area B (Packaging & Fill)',
    line: 'Line 2 (High-Speed Bottling)',
    category: 'Pump',
    healthScore: 94,
    healthStatus: 'optimal',
    operatingHours: 4120,
    criticality: 'B (Medium)',
    owner: 'J. Patel',
    limits: 'Max Temp: 85°C · Max Vibration: 4.8 mm/s',
    maintenanceSchedule: 'Quarterly Seal Inspection',
    lastServiceDate: '2026-10-02',
    sensors: [
      {
        id: 'sen-105-1',
        tag: 'TT-105',
        name: 'Drive End Bearing Temp',
        unit: '°C',
        currentValue: 54.2,
        normalRange: [45.0, 65.0],
        warningRange: [65.0, 80.0],
        criticalLimit: 85.0,
        rateOfChange: '+0.2°C',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '14s ago'
      },
      {
        id: 'sen-105-2',
        tag: 'VIB-105',
        name: 'Radial Vibration',
        unit: 'mm/s',
        currentValue: 1.6,
        normalRange: [0.8, 2.5],
        warningRange: [2.5, 4.2],
        criticalLimit: 5.0,
        rateOfChange: '0.0 mm/s',
        trustScore: 0.98,
        status: 'normal',
        lastUpdated: '14s ago'
      }
    ]
  },
  {
    id: 'C-202',
    name: 'Main Infeed Conveyor C-202',
    code: 'RIV-A2-L2-C202',
    siteId: 'riverside',
    area: 'Area B (Packaging & Fill)',
    line: 'Line 2 (High-Speed Bottling)',
    category: 'Conveyor',
    healthScore: 88,
    healthStatus: 'good',
    operatingHours: 12100,
    criticality: 'A (High)',
    owner: 'M. Chen',
    limits: 'Belt Tension: 1200 N · Max Speed: 3.2 m/s',
    maintenanceSchedule: 'Monthly lubrication',
    lastServiceDate: '2026-11-01',
    sensors: [
      {
        id: 'sen-202-1',
        tag: 'SPD-202',
        name: 'Conveyor Linear Velocity',
        unit: 'm/s',
        currentValue: 2.85,
        normalRange: [2.5, 3.1],
        warningRange: [2.0, 3.4],
        criticalLimit: 3.8,
        rateOfChange: 'Stable',
        trustScore: 0.97,
        status: 'normal',
        lastUpdated: '3s ago'
      },
      {
        id: 'sen-202-2',
        tag: 'TRQ-202',
        name: 'Drive Motor Output Torque',
        unit: 'Nm',
        currentValue: 412,
        normalRange: [320, 480],
        warningRange: [480, 560],
        criticalLimit: 620,
        rateOfChange: '+18 Nm',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '6s ago'
      }
    ]
  },
  {
    id: 'TK-101',
    name: 'Holding & Mixing Tank TK-101',
    code: 'RIV-A1-L1-TK101',
    siteId: 'riverside',
    area: 'Area A (Ingredients & Batching)',
    line: 'Line 1 (Syrup Preparation)',
    category: 'Tank',
    healthScore: 92,
    healthStatus: 'good',
    operatingHours: 6700,
    criticality: 'B (Medium)',
    owner: 'S. Alva',
    limits: 'Capacity: 25,000 L · Max Temp: 92°C',
    maintenanceSchedule: 'CIP Sanitization daily',
    lastServiceDate: '2026-11-19',
    sensors: [
      {
        id: 'sen-101-1',
        tag: 'LT-101',
        name: 'Hydrostatic Level Transmitter',
        unit: '%',
        currentValue: 74.2,
        normalRange: [20.0, 85.0],
        warningRange: [15.0, 90.0],
        criticalLimit: 95.0,
        rateOfChange: '-1.2%/h',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '12s ago'
      },
      {
        id: 'sen-101-2',
        tag: 'TT-101',
        name: 'Internal Batch Core Temp',
        unit: '°C',
        currentValue: 42.8,
        normalRange: [38.0, 48.0],
        warningRange: [35.0, 52.0],
        criticalLimit: 58.0,
        rateOfChange: 'Stable',
        trustScore: 0.98,
        status: 'normal',
        lastUpdated: '10s ago'
      }
    ]
  },
  {
    id: 'W-PUMP-701',
    name: 'High-Lift Discharge Pump 701',
    code: 'WST-P7-P701',
    siteId: 'water-station-7',
    area: 'Station 7 (Remote Pressure Hub)',
    line: 'Trunk Line Delta',
    category: 'Pump',
    healthScore: 71,
    healthStatus: 'degrading',
    operatingHours: 14890,
    criticality: 'A (High)',
    owner: 'R. Davis (District Operator)',
    limits: 'Discharge: 80 psi · Max Draw: 160 A',
    maintenanceSchedule: 'Impeller balance biannual',
    lastServiceDate: '2026-05-12',
    activeEventId: 'EVT-W701',
    sensors: [
      {
        id: 'sen-701-1',
        tag: 'PT-701',
        name: 'Header Discharge Pressure',
        unit: 'psi',
        currentValue: 62.4,
        normalRange: [68.0, 78.0],
        warningRange: [60.0, 82.0],
        criticalLimit: 55.0,
        rateOfChange: '-8.2 psi in 48h',
        trustScore: 0.74,
        status: 'warning',
        lastUpdated: '42s ago'
      },
      {
        id: 'sen-701-2',
        tag: 'AMP-701',
        name: 'Motor Input Current',
        unit: 'A',
        currentValue: 146.2,
        normalRange: [110.0, 135.0],
        warningRange: [135.0, 150.0],
        criticalLimit: 160.0,
        rateOfChange: '+14 A (Impeller wear symptom)',
        trustScore: 0.74,
        status: 'warning',
        lastUpdated: '42s ago'
      }
    ]
  },
  {
    id: 'SRT-301',
    name: 'High-Speed Cross-Belt Sorter 301',
    code: 'FLM-SRT-S3',
    siteId: 'fulfillment-3',
    area: 'Induct & Sorting Hall',
    line: 'Wave Sorter 3',
    category: 'Sorter',
    healthScore: 79,
    healthStatus: 'degrading',
    operatingHours: 9240,
    criticality: 'A (High)',
    owner: 'K. Novak',
    limits: 'Max Mis-Sort: 0.005% · Speed: 2.8 m/s',
    maintenanceSchedule: 'Optical Sensor Calibration Biweekly',
    lastServiceDate: '2026-11-04',
    activeEventId: 'EVT-F301',
    orderAtRisk: '312 Prime Orders in Wave 4',
    sensors: [
      {
        id: 'sen-301-1',
        tag: 'OPT-301B',
        name: 'Induct Lane B Photo-Eye Optical Clarity',
        unit: '%',
        currentValue: 64.2,
        normalRange: [85.0, 100.0],
        warningRange: [60.0, 85.0],
        criticalLimit: 50.0,
        rateOfChange: '-18% (Dust film accumulation)',
        trustScore: 0.94,
        status: 'warning',
        lastUpdated: '4s ago'
      },
      {
        id: 'sen-301-2',
        tag: 'ERR-301',
        name: 'Mis-Sort Divert Defect Rate',
        unit: '%',
        currentValue: 0.038,
        normalRange: [0.0, 0.01],
        warningRange: [0.01, 0.03],
        criticalLimit: 0.05,
        rateOfChange: '+3.8x baseline',
        trustScore: 0.98,
        status: 'critical',
        lastUpdated: '2s ago'
      }
    ]
  },
  {
    id: 'W-PUMP-702',
    name: 'Standby High-Lift Pump 702',
    code: 'WST-P7-P702',
    siteId: 'water-station-7',
    area: 'Station 7 (Remote Pressure Hub)',
    line: 'Trunk Line Delta',
    category: 'Pump',
    healthScore: 96,
    healthStatus: 'optimal',
    operatingHours: 3200,
    criticality: 'A (High)',
    owner: 'R. Davis',
    limits: 'Discharge: 80 psi · Max Draw: 160 A',
    maintenanceSchedule: 'Weekly automated test spin',
    lastServiceDate: '2026-11-15',
    sensors: [
      {
        id: 'sen-702-1',
        tag: 'PT-702',
        name: 'Standby Header Pressure',
        unit: 'psi',
        currentValue: 74.8,
        normalRange: [68.0, 78.0],
        warningRange: [60.0, 82.0],
        criticalLimit: 55.0,
        rateOfChange: 'Stable',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '10s ago'
      },
      {
        id: 'sen-702-2',
        tag: 'AMP-702',
        name: 'Standby Motor Current',
        unit: 'A',
        currentValue: 0.0,
        normalRange: [0.0, 135.0],
        warningRange: [135.0, 150.0],
        criticalLimit: 160.0,
        rateOfChange: 'Ready for duty cycle',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '10s ago'
      }
    ]
  },
  {
    id: 'SRT-201',
    name: 'Parallel Cross-Belt Sorter 201',
    code: 'FLM-SRT-S2',
    siteId: 'fulfillment-3',
    area: 'Induct & Sorting Hall',
    line: 'Wave Sorter 2',
    category: 'Sorter',
    healthScore: 97,
    healthStatus: 'optimal',
    operatingHours: 6100,
    criticality: 'A (High)',
    owner: 'K. Novak',
    limits: 'Max Mis-Sort: 0.005% · Speed: 2.8 m/s',
    maintenanceSchedule: 'Biweekly optical inspection',
    lastServiceDate: '2026-11-12',
    sensors: [
      {
        id: 'sen-201-1',
        tag: 'OPT-201',
        name: 'Photo-Eye Clarity',
        unit: '%',
        currentValue: 98.4,
        normalRange: [85.0, 100.0],
        warningRange: [60.0, 85.0],
        criticalLimit: 50.0,
        rateOfChange: 'Optimal',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '5s ago'
      },
      {
        id: 'sen-201-2',
        tag: 'CAP-201',
        name: 'Available Spare Induct Capacity',
        unit: '%',
        currentValue: 42.0,
        normalRange: [20.0, 60.0],
        warningRange: [10.0, 80.0],
        criticalLimit: 95.0,
        rateOfChange: 'Ready for wave reroute',
        trustScore: 0.99,
        status: 'normal',
        lastUpdated: '5s ago'
      }
    ]
  }
];

export const EVENTS: IndustrialEvent[] = [
  {
    id: 'EVT-104',
    name: 'Bearing Temperature Rising on Pump P-104',
    assetId: 'P-104',
    assetName: 'Centrifugal Slurry Pump P-104',
    siteId: 'riverside',
    siteName: 'Riverside Plant',
    area: 'Area B (Packaging & Fill)',
    line: 'Line 2 (High-Speed Bottling)',
    severity: 'critical',
    status: 'active',
    timestamp: '2026-11-20 10:14:22 EST',
    trustScore: 0.98,
    daysToLimit: 2,
    assignedOwner: 'J. Patel',
    description: 'Bearing temperature sensor TT-104A has elevated 17°C over the past 36 hours. Current value 78.4°C is 6.6°C below critical shutdown trip (85°C). Correlated horizontal vibration (VIB-104) has risen from 3.2 to 4.82 mm/s.',
    ordersAtRisk: [
      { id: 'SO-4471', customer: 'Apex Beverage Brands', value: '$1,200,000', deadline: 'Friday, 18:00 EST' },
      { id: 'SO-4489', customer: 'Horizon Foods', value: '$340,000', deadline: 'Saturday, 12:00 EST' }
    ],
    sirachRecommendationId: 'SIR-DEC-104',
    rootCauseSummary: 'Premature drive-end roller bearing cage spalling compounded by degraded grease lubrication viscosity after 8,420 operational run hours.'
  },
  {
    id: 'EVT-W701',
    name: 'Station 7 Remote Pump Impeller Cavitation & Wear',
    assetId: 'W-PUMP-701',
    assetName: 'High-Lift Discharge Pump 701',
    siteId: 'water-station-7',
    siteName: 'Water Utility – Station 7',
    area: 'Station 7 (Remote Pressure Hub)',
    line: 'Trunk Line Delta',
    severity: 'high',
    status: 'investigating',
    timestamp: '2026-11-20 08:45:10 CST',
    trustScore: 0.74,
    daysToLimit: 4,
    assignedOwner: 'R. Davis',
    description: 'Header discharge pressure dropped to 62.4 psi while motor current escalated to 146.2 A. Telemetry was flagged as degraded due to a 42s cellular packet gap before recovery.',
    ordersAtRisk: [
      { id: 'MUNI-DIST-7', customer: 'Metro Municipal Zone 7', value: '45,000 residents', deadline: 'Continuous Water Supply' }
    ],
    sirachRecommendationId: 'SIR-DEC-W701',
    rootCauseSummary: 'Suspension grit wear on bronze impeller vanes causing internal recirculation and suction cavitation.'
  },
  {
    id: 'EVT-F301',
    name: 'Sorter 3 Induct Lane B Optical Sensor Contamination',
    assetId: 'SRT-301',
    assetName: 'High-Speed Cross-Belt Sorter 301',
    siteId: 'fulfillment-3',
    siteName: 'Fulfillment Center – Site 3',
    area: 'Induct & Sorting Hall',
    line: 'Wave Sorter 3',
    severity: 'medium',
    status: 'acknowledged',
    timestamp: '2026-11-20 11:02:45 EST',
    trustScore: 0.94,
    daysToLimit: 1,
    assignedOwner: 'K. Novak',
    description: 'Photo-eye clarity dropped to 64.2% causing mis-sort rate to climb to 0.038%. 312 packages in the upcoming afternoon shipping wave will miss sorting induct targets if uncorrected.',
    ordersAtRisk: [
      { id: 'WAVE-4-PRIME', customer: 'E-Commerce Priority Wave', value: '$84,000 shipping value', deadline: 'Today, 16:30 EST' }
    ],
    sirachRecommendationId: 'SIR-DEC-F301',
    rootCauseSummary: 'Corrugated dust particle accumulation on lens housing following 14 days of high-velocity cardboard carton transit.'
  }
];

export const SIRACH_DECISIONS: Record<string, SirachDecision> = {
  'SIR-DEC-104': {
    id: 'SIR-DEC-104',
    eventId: 'EVT-104',
    eventName: 'Bearing temperature rising on Pump P-104',
    assetId: 'P-104',
    assetName: 'Centrifugal Slurry Pump P-104',
    timestamp: '2026-11-20 10:18:00 EST',
    contextSummary: 'Luminix verified fact: TT-104A reached 78.4°C (+17°C in 36h) with trust score 0.98. Line 2 MTBF has dropped 14% over past 10 days. Customer order #4471 ($1.2M) ships Friday. Pre-existing draft work order WO-3381 exists in Trestara. Spare bearing kit SKF-6318 in stock (Bin C-14).',
    businessExposure: '$1,200,000 customer contract penalty + $85,000/hr unplanned line downtime',
    confidence: 0.94,
    status: 'recommended',
    selectedOptionId: 'C',
    options: [
      {
        id: 'A',
        title: 'Continue Monitoring (Run to Threshold)',
        description: 'Keep line running at 100% capacity and monitor TT-104A every 15 minutes. Intervene only if reading breaches 84.5°C trip threshold.',
        estimatedCost: '$0 direct (Catastrophic risk up to $420,000)',
        productionImpact: '0 hours planned downtime; 18-36h probable catastrophic motor freeze',
        riskRating: 'High',
        confidenceScore: 0.22,
        recommended: false,
        approvalRequired: true,
        timeline: 'Immediate failure window within 48 hours',
        supportingEvidence: [
          'Historical MTBF trend indicates 88% probability of catastrophic seizure within 44 hours',
          'Shaft deflection risk exceeds manufacturer allowable tolerances by 24%',
          'Would cause immediate unannounced shutdown during peak Friday fulfillment'
        ]
      },
      {
        id: 'B',
        title: 'Reduce Operating Load by 25%',
        description: 'Throttle Line 2 infeed conveyor C-202 and pump speed by 25% to drop frictional bearing heat by an estimated 6°C, extending life by ~4 days.',
        estimatedCost: '$64,000 in lost production output',
        productionImpact: '25% throughput reduction on Line 2; Order #4471 delayed by 18 hours',
        riskRating: 'Medium',
        confidenceScore: 0.61,
        recommended: false,
        approvalRequired: true,
        timeline: 'Buys 3.5 days of degraded operation',
        supportingEvidence: [
          'Thermodynamic model projects bearing temp equilibrium at ~72.5°C under 75% load',
          'Causes late shipment fine on Apex Beverage contract #4471 ($120k penalty)',
          'Does not resolve mechanical cage fatigue'
        ]
      },
      {
        id: 'C',
        title: 'Replace Bearing During Night Shift (Recommended)',
        description: 'Execute planned 2.5-hour bearing changeover during scheduled sanitation window tonight (02:00 - 04:30 EST). Pre-stage bearing kit #SKF-6318 from warehouse bin C-14. Assign technician J. Patel. Expedite WO-3381 and generate PO-9921 for stock replenishment.',
        estimatedCost: '$18,000 (Parts $2,400 + Shift Labor $15,600)',
        productionImpact: '0 hours unplanned downtime (absorbed within planned sanitation window)',
        riskRating: 'Low',
        confidenceScore: 0.94,
        recommended: true,
        approvalRequired: true,
        timeline: 'Tonight 02:00 - 04:30 EST (2.5 hours)',
        supportingEvidence: [
          'Luminix Context API confirms spare kit SKF-6318 is physically in stock at Warehouse Bin C-14',
          'Thorium EHS confirms Hot Work permit PER-HW-8841 already pre-cleared for night shift',
          'Guarantees on-time dispatch of $1.2M Order #4471 on Friday morning',
          'Reduces Line 2 MTBF vulnerability to 0%'
        ]
      },
      {
        id: 'D',
        title: 'Emergency Immediate Line Shutdown',
        description: 'Immediately stop Line 2 bottling line, lock out Pump P-104, and execute hot changeover now.',
        estimatedCost: '$148,000 ($85,000/hr line stoppage x 1.75 hours)',
        productionImpact: '1.75 hours immediate emergency downtime; 4,200 bottles dumped to sewer',
        riskRating: 'Medium',
        confidenceScore: 0.48,
        recommended: false,
        approvalRequired: true,
        timeline: 'Immediate 105 minutes stoppage',
        supportingEvidence: [
          'Prevents equipment destruction but incurs unnecessary daytime line stoppage penalty',
          'Sanitation team is not currently staged, leading to product scrap loss'
        ]
      }
    ]
  },
  'SIR-DEC-W701': {
    id: 'SIR-DEC-W701',
    eventId: 'EVT-W701',
    eventName: 'Station 7 Remote Pump Impeller Cavitation & Wear',
    assetId: 'W-PUMP-701',
    assetName: 'High-Lift Discharge Pump 701',
    timestamp: '2026-11-20 09:05:00 CST',
    contextSummary: 'Luminix verified fact: Cellular RTU 7 recovered after 42s stale period. Discharge pressure dropped to 62.4 psi (-8.2 psi) while motor current rose to 146.2 A (+14A), indicating bronze impeller wear. 45,000 municipal residents depend on Trunk Line Delta.',
    businessExposure: 'Loss of municipal water pressure < 50 psi triggering EPA health boil advisory',
    confidence: 0.91,
    status: 'recommended',
    selectedOptionId: 'C',
    options: [
      {
        id: 'A',
        title: 'Continue Monitoring & Trend Pressure',
        description: 'Keep Pump 701 running at present setpoint. Monitor pressure drop every 10 minutes.',
        estimatedCost: '$0 direct (High regulatory penalty risk)',
        productionImpact: 'High risk of suction cavitation collapse within 24 hours',
        riskRating: 'High',
        confidenceScore: 0.18,
        recommended: false,
        approvalRequired: true,
        timeline: 'Immediate failure hazard',
        supportingEvidence: ['Impeller vane cavitation will cause catastrophic bronze seal fracture']
      },
      {
        id: 'B',
        title: 'Emergency Field Crew Dispatch to Station 7',
        description: 'Dispatch mobile service van 45 miles to remote Station 7 for emergency teardown.',
        estimatedCost: '$4,800 in emergency field labor & vehicle transit',
        productionImpact: 'Requires 4-hour local line depressurization',
        riskRating: 'Medium',
        confidenceScore: 0.52,
        recommended: false,
        approvalRequired: true,
        timeline: 'Transit time 90 minutes + 3h repair',
        supportingEvidence: ['Overkill when automatic standby pump is installed and available']
      },
      {
        id: 'C',
        title: 'Divert Duty to Standby Pump 702 & Schedule CMMS Overhaul (Recommended)',
        description: 'Issue SCADA automated sequencing to transfer duty to Standby Pump 702. Generate Trestara work order WO-4412 for scheduled impeller replacement during Tuesday low-demand window.',
        estimatedCost: '$1,200 (Scheduled repair vs $18k emergency overhaul)',
        productionImpact: '0 municipal pressure loss (Seamless duty cycle switchover)',
        riskRating: 'Low',
        confidenceScore: 0.91,
        recommended: true,
        approvalRequired: true,
        timeline: 'Immediate SCADA transfer (12 seconds)',
        supportingEvidence: [
          'Standby Pump 702 verified 100% operational in last weekly exercise cycle',
          'Preserves header pressure above 72 psi for 45,000 residents',
          'Prevents pump casing erosion'
        ]
      },
      {
        id: 'D',
        title: 'Throttle Downstream Trunk Pressure Zone',
        description: 'Throttle zone pressure control valve to 55 psi to reduce load on Pump 701.',
        estimatedCost: '$12,000 in customer pressure complaints & low flow fines',
        productionImpact: 'Low pressure experienced by 12,000 hilltop customers',
        riskRating: 'High',
        confidenceScore: 0.28,
        recommended: false,
        approvalRequired: true,
        timeline: 'Immediate valve throttling',
        supportingEvidence: ['Causes low-pressure boil-water alerts in municipal sector 4']
      }
    ]
  },
  'SIR-DEC-F301': {
    id: 'SIR-DEC-F301',
    eventId: 'EVT-F301',
    eventName: 'Sorter 3 Induct Lane B Optical Sensor Contamination',
    assetId: 'SRT-301',
    assetName: 'High-Speed Cross-Belt Sorter 301',
    timestamp: '2026-11-20 11:10:00 EST',
    contextSummary: 'Luminix verified fact: PLC photo-eye clarity dropped to 64.2% causing mis-sort rate to climb to 0.038% (3.8x baseline). 312 packages in upcoming Wave 4 are at risk of missing 16:30 dispatch truck departure.',
    businessExposure: '$84,000 shipping value + $35,000 SLA penalty for missed prime carrier cutoff',
    confidence: 0.96,
    status: 'recommended',
    selectedOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Continue Running Sorter 3 at Full Speed',
        description: 'Ignore optical degradation and maintain current sorting induct rate.',
        estimatedCost: '$35,000 late fulfillment carrier SLA fines',
        productionImpact: '312 packages mis-sorted into hospital recirc lane; truck departs empty',
        riskRating: 'High',
        confidenceScore: 0.12,
        recommended: false,
        approvalRequired: true,
        timeline: 'Immediate shipment cutoff in 45 minutes',
        supportingEvidence: ['Mis-sort trajectory indicates 18% error rate on glossy prime parcels']
      },
      {
        id: 'B',
        title: 'Reroute Wave 4 to Sorter 2 & Execute 5-Min Optical Lens Wipe (Recommended)',
        description: 'Reroute incoming 312 carton wave to parallel Sorter 2. Dispatch floor tech for rapid 5-minute isopropyl wipe of Sorter 3 photo-eye lens.',
        estimatedCost: '$350 (Internal technician labor)',
        productionImpact: '0 packages delayed (Wave 4 sorted on Sorter 2 on-time)',
        riskRating: 'Low',
        confidenceScore: 0.96,
        recommended: true,
        approvalRequired: true,
        timeline: 'Immediate 5-minute intervention',
        supportingEvidence: [
          'Parallel Sorter 2 currently has 42% spare throughput capacity',
          '312 Prime packages sorted and loaded onto trailer before 16:30 dispatch',
          'Returns Sorter 3 optical clarity back to 98%'
        ]
      },
      {
        id: 'C',
        title: 'Reduce Sorter Speed by 50%',
        description: 'Slow cross-belt linear speed from 2.8 m/s to 1.4 m/s to assist degraded optical reading.',
        estimatedCost: '$14,000 in induct backlog congestion',
        productionImpact: 'Sort rate drops from 14,800 to 7,400 pkgs/hr; induct gridlock',
        riskRating: 'Medium',
        confidenceScore: 0.42,
        recommended: false,
        approvalRequired: true,
        timeline: 'Immediate slowdown',
        supportingEvidence: ['Causes upstream jam sensor alarms on primary induct conveyor C-101']
      },
      {
        id: 'D',
        title: 'Complete Induct Hall 3 Stoppage',
        description: 'E-stop all 4 sorters in Induct Hall 3 for full electrical sensor recalibration.',
        estimatedCost: '$92,000 facility-wide logistics paralysis',
        productionImpact: '14,000 cartons backed up across all shipping bays',
        riskRating: 'High',
        confidenceScore: 0.08,
        recommended: false,
        approvalRequired: true,
        timeline: '45-minute total facility shutdown',
        supportingEvidence: ['Completely unnecessary for a minor optical dust film']
      }
    ]
  }
};

export const APPROVAL_REQUESTS: ApprovalRequest[] = [
  {
    id: 'REQ-8812',
    title: 'Pump P-104 Drive-End Bearing Replacement on Night Shift',
    requestType: 'Maintenance Work Order',
    assetId: 'P-104',
    assetName: 'Centrifugal Slurry Pump P-104',
    siteName: 'Riverside Plant',
    businessImpact: 'Protects $1.2M Apex Beverage Order #4471 shipping Friday; prevents $420k catastrophic failure',
    cost: '$18,000 (Labor + Parts)',
    recommendation: 'Approve execution of WO-3381 during 02:00-04:30 sanitation window tonight. Issue PO-9921 to replenish SKF-6318 stock.',
    evidence: [
      'TT-104A rose 17°C in 36h (Trust: 0.98)',
      'VIB-104 at 4.82 mm/s approaching 5.5 limit',
      'Spare bearing SKF-6318 in stock at Bin C-14',
      'Hot Work permit pre-approved in Thorium'
    ],
    requestingAgent: 'Sirach Reliability Agent',
    status: 'pending',
    submittedAt: '2026-11-20 10:20 EST',
    decisionId: 'SIR-DEC-104',
    eventId: 'EVT-104'
  },
  {
    id: 'REQ-8809',
    title: 'Water Station 7: Divert to Standby Pump 702',
    requestType: 'Setpoint Modification',
    assetId: 'W-PUMP-701',
    assetName: 'High-Lift Discharge Pump 701',
    siteName: 'Water Utility – Station 7',
    businessImpact: 'Preserves municipal pressure header above 65 psi for 45,000 residents',
    cost: '$1,200 (SCADA dispatch)',
    recommendation: 'Authorize automated valve sequencing to transfer duty cycle to Standby Pump 702 and schedule mobile inspection.',
    evidence: [
      'Discharge pressure drop to 62.4 psi with current spike to 146.2A',
      'Telemetry recovered after 42s cellular link delay'
    ],
    requestingAgent: 'Sirach Reliability Agent',
    status: 'approved',
    submittedAt: '2026-11-20 09:10 CST',
    approvedAt: '2026-11-20 09:14 CST',
    approvedBy: 'R. Davis (District Lead)',
    decisionId: 'SIR-DEC-W701',
    eventId: 'EVT-W701'
  },
  {
    id: 'REQ-8795',
    title: 'Sorter 3 Induct Lens Cleaning & Wave 4 Reroute',
    requestType: 'Maintenance Work Order',
    assetId: 'SRT-301',
    assetName: 'High-Speed Cross-Belt Sorter 301',
    siteName: 'Fulfillment Center – Site 3',
    businessImpact: 'Protects 312 Prime delivery packages from missing 16:30 dispatch truck departure',
    cost: '$350 (Internal maintenance shift)',
    recommendation: 'Reroute incoming Wave 4 carton wave to Sorter 2; perform 5-minute lens wipe on Sorter 3 photo-eye.',
    evidence: [
      'Photo-eye clarity dropped to 64.2%',
      'Mis-sort rate jumped to 0.038% on Sorter 3'
    ],
    requestingAgent: 'Sirach Quality Agent',
    status: 'approved',
    submittedAt: '2026-11-20 11:15 EST',
    approvedAt: '2026-11-20 11:18 EST',
    approvedBy: 'K. Novak (Operations Mgr)',
    decisionId: 'SIR-DEC-F301',
    eventId: 'EVT-F301'
  }
];

export const OUTCOME_HISTORY: OutcomeRecord[] = [
  {
    id: 'OUT-901',
    actionTaken: 'Bearing assembly replacement & laser shaft alignment on Pump P-102',
    assetId: 'P-102',
    assetName: 'Syrup Dosing Pump P-102',
    siteName: 'Riverside Plant',
    completionTime: '2026-11-12 04:15 EST',
    result: 'Optimal Restored',
    downtimeAvoided: '14 hours unplanned downtime avoided',
    costIncurred: '$14,200',
    approver: 'E. Vance (Plant VP)',
    technician: 'J. Patel',
    evidence: ['Post-maintenance vibration dropped from 4.9 mm/s to 1.1 mm/s', 'Bearing temp normalized to 48.2°C'],
    notes: 'Replaced bearing showed significant brinelling from prior water ingress. Added enhanced labyrinth seal.',
    timestamp: '2026-11-12'
  },
  {
    id: 'OUT-898',
    actionTaken: 'Acoustic leak isolation and gate valve seat adjustment at Station 4',
    assetId: 'W-VLV-401',
    assetName: 'Isolation Gate Valve V-401',
    siteName: 'Water Utility – Station 7',
    completionTime: '2026-11-08 16:30 CST',
    result: 'Defect Mitigated',
    downtimeAvoided: 'Estimated 80,000 gallons treated water loss prevented',
    costIncurred: '$3,800',
    approver: 'R. Davis',
    technician: 'T. Briggs',
    evidence: ['Flow balance between RTU-4 and RTU-5 returned to 99.8% balance'],
    notes: 'Valve packing gland repacked with PTFE braided rings.',
    timestamp: '2026-11-08'
  },
  {
    id: 'OUT-892',
    actionTaken: 'Variable frequency drive capacitor bank preventative swap on Conveyor C-101',
    assetId: 'C-101',
    assetName: 'Primary Carton Infeed C-101',
    siteName: 'Riverside Plant',
    completionTime: '2026-10-28 03:00 EST',
    result: 'Optimal Restored',
    downtimeAvoided: '6 hours line downtime avoided',
    costIncurred: '$6,400',
    approver: 'E. Vance',
    technician: 'M. Chen',
    evidence: ['DC bus voltage ripple decreased from 8.2% to 0.4%'],
    notes: 'Thermal imaging showed capacitor heating before outright catastrophic rupture.',
    timestamp: '2026-10-28'
  }
];

export const ROOT_CAUSE_TIMELINE_P104 = [
  {
    time: 'T-36h (Nov 19, 02:00 EST)',
    source: 'OSIsoft PI Historian (TT-104A)',
    category: 'telemetry',
    title: 'Bearing Temperature Inflection Point',
    detail: 'Temperature reading departed from 30-day baseline of 61.4°C, rising at steady slope of +0.47°C/hr.',
    trust: 0.99,
    status: 'info'
  },
  {
    time: 'T-28h (Nov 19, 10:00 EST)',
    source: 'Trestara EAM Shift Log',
    category: 'maintenance',
    title: 'Routine Grease Regreasing Logged',
    detail: 'Technician logged 40g lithium complex grease injection. Post-greasing thermal dissipation spike was absent.',
    trust: 0.98,
    status: 'warning'
  },
  {
    time: 'T-20h (Nov 19, 18:00 EST)',
    source: 'Banner Edge MQTT (VIB-104)',
    category: 'telemetry',
    title: 'High-Frequency Vibration Spike (BPFO Harmonic)',
    detail: 'Spectral vibration revealed distinct peak at 142 Hz corresponding to Ball Pass Frequency Outer Race (BPFO) defect.',
    trust: 0.96,
    status: 'warning'
  },
  {
    time: 'T-12h (Nov 20, 02:00 EST)',
    source: 'Riverside Line 2 OPC UA (AMP-104)',
    category: 'telemetry',
    title: 'Motor Phase Current Elevates',
    detail: 'Drive motor current drew +6.2 A higher than normal baseline at same 2,400 RPM pump speed, indicating mechanical drag.',
    trust: 0.99,
    status: 'warning'
  },
  {
    time: 'T-2h (Nov 20, 10:14 EST)',
    source: 'Luminix Event Engine (LX-05)',
    category: 'event',
    title: 'Contextual Anomaly Event EVT-104 Raised',
    detail: 'Threshold breached 78°C warning level. Days-to-limit calculated as 2.0 days before 85°C trip. Order #4471 linked.',
    trust: 0.98,
    status: 'critical'
  },
  {
    time: 'T-1h (Nov 20, 10:18 EST)',
    source: 'Sirach Decision Center (SIR-DEC-104)',
    category: 'decision',
    title: 'Option C Recommended to Plant VP',
    detail: 'Night shift bearing replacement recommended. 94% confidence. Parts verified in warehouse. Work order drafted.',
    trust: 0.94,
    status: 'decision'
  }
];
