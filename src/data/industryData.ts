import { IndustrySolution } from '../types';

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'food-beverage',
    name: 'Food & Beverage Processing',
    tagline: 'High-speed packaging, pasteurization lines & hygienic batching',
    scadaNeed: 'Improve production quality and quantity. Reduce costs and waste.',
    luminixOrchestration: 'Link LIMS quality results and waste records to the line, batch and asset that produced them. Detect drift in temperatures, fill weights and line speed. Sirach recommends adjustments and maintenance windows.',
    keyModules: ['LX-01', 'LX-02', 'LX-04', 'LX-05', 'LX-06', 'LX-S4'],
    kpis: ['Line Yield (98.4%)', 'Product Waste % (1.2%)', 'Line OEE (84.2%)', 'Cost per Unit ($0.14)'],
    exampleEvents: [
      'Fill nozzle #4 volumetric drift detected on Bottling Line 1',
      'Pasteurizer HTST zone 2 temperature deviation (-1.8°C from setpoint)',
      'Sealer pressure fluctuation on Pouch Line 3 during shift change'
    ],
    sirachRecommendations: [
      'Adjust nozzle stroke length during planned 15-min CIP changeover',
      'Extend hold tube transit cycle by 4.2 seconds to guarantee lethality without stopping line',
      'Dispatch technician for seal gasket replacement with pre-staged parts kit #FB-881'
    ],
    expectedBusinessValue: [
      '$420,000 annual reduction in giveaway/overfill',
      'Zero pathogen batch quarantine incidents',
      '3.4% boost in overall line packaging speed'
    ],
    sampleDatasetNotes: 'Focuses on high-frequency filler telemetry, CIP thermal curves, and weight-cell records.'
  },
  {
    id: 'pharma-biotech',
    name: 'Pharmaceutical & Biotech',
    tagline: 'Bioreactors, cleanrooms, lyophilizers & validated continuous processing',
    scadaNeed: 'Keep equipment at optimal levels. Reduce maintenance costs. Maximize production.',
    luminixOrchestration: 'Trust-scored equipment data with full lineage for compliance-sensitive environments. Root-cause timelines join batch records, maintenance and deviations. Condition-based maintenance runs through Trestara.',
    keyModules: ['LX-02', 'LX-03', 'LX-04', 'LX-07', 'LX-09'],
    kpis: ['Uptime (99.8%)', 'MTBF (840 hrs)', 'Maintenance Cost ($/hr)', 'Batch Right-First-Time (99.2%)'],
    exampleEvents: [
      'Bioreactor BR-04 dissolved oxygen sensor drift (trust score dropped to 0.72)',
      'HVAC Cleanroom Suite B differential pressure drop below 15 Pa threshold',
      'Autoclave 2 door seal micro-leak detected during pre-vacuum hold'
    ],
    sirachRecommendations: [
      'Trigger dual-probe cross-validation before automated nutrient dosing commences',
      'Initiate automated air handler blower ramp-up (+8%) to preserve laminar pressure cascade',
      'Log GxP exception ticket in Thorium EHS and schedule preventative seal inspection'
    ],
    expectedBusinessValue: [
      'Protection of $2.4M active biologic batches against deviation spoilage',
      '80% reduction in paper-based audit trail collation time for 21 CFR Part 11',
      '35% reduction in unplanned cleanroom downtime'
    ],
    sampleDatasetNotes: 'Emphasizes tamper-evident audit trails, sensor trust scoring, and strict electronic signatures.'
  },
  {
    id: 'water-wastewater',
    name: 'Water & Wastewater',
    tagline: 'Distributed lift stations, filtration beds, chlorination & trunk mains',
    scadaNeed: 'Efficient plants. Monitor storage tanks, pump stations and treatment facilities. Prevent cyberattacks and keep safety measures in place.',
    luminixOrchestration: 'Read-only RTU/MTU telemetry across distributed sites, with link-health monitoring for remote pump stations. Tank levels and pump performance are modeled per asset. Read-only conduits keep attack surface small, and Thorium adds safety and permit context.',
    keyModules: ['LX-S1', 'LX-S2', 'LX-02', 'LX-05', 'LX-10'],
    kpis: ['Pump Efficiency (88.6%)', 'Energy per ML (310 kWh/ML)', 'Alarm Response Time (3.2 min)', 'Data Coverage (96.4%)'],
    exampleEvents: [
      'Remote Station 7 cellular link stale for 42s; pressure drop plus rising current',
      'Clearwell reservoir level dropping faster than downstream demand curve',
      'Chlorine dosing pump stroke frequency mismatch at Intake Basin 3'
    ],
    sirachRecommendations: [
      'Hold degraded telemetry from decisions; switch to standby pump Station 7B upon link recovery',
      'Isolate segment 14 for acoustic leak detection survey and alert field dispatch',
      'Verify backup secondary dosing solenoid valve status and notify municipal water authority'
    ],
    expectedBusinessValue: [
      '18% reduction in peak-hour grid pumping power consumption',
      'Zero regulatory EPA/DEP discharge violations across 14 remote sub-stations',
      'Guaranteed cyber-resilient air-gap with 100% read-only isolation'
    ],
    sampleDatasetNotes: 'Features store-and-forward RTU cellular telemetry, pressure profiles, and pump kW curves.'
  },
  {
    id: 'hvac-commercial',
    name: 'HVAC & Commercial Buildings',
    tagline: 'Central chiller plants, air handlers, thermal storage & campus microgrids',
    scadaNeed: 'Regulate HVAC, lighting and input systems. Maximize occupant comfort with minimum energy.',
    luminixOrchestration: 'HMI overlay gives facility teams asset context and governed energy KPIs. Benchmarking compares buildings and floors like for like. Sirach schedules setpoint reviews and maintenance.',
    keyModules: ['LX-S3', 'LX-06', 'LX-10', 'LX-05'],
    kpis: ['Energy Usage (18.4 kWh/m²)', 'Comfort Exceptions (< 0.4%)', 'Chiller COP (5.82)', 'Equipment Uptime (99.4%)'],
    exampleEvents: [
      'Chiller #2 condenser water delta-T degrading below design benchmark (3.2°C vs 5.5°C)',
      'Variable Air Volume (VAV) box 4-12 damper stuck at 85% in zone 4B',
      'Enthalpy economizer cycle hunting observed during humid ambient morning transition'
    ],
    sirachRecommendations: [
      'Execute tube-fouling brush cycle on Chiller #2 during low occupancy weekend window',
      'Override actuator position to test stroke; generate work order for maintenance crew',
      'Calibrate outdoor dewpoint sensor TT-EXT-02 to prevent premature compressor cycling'
    ],
    expectedBusinessValue: [
      '$185,000 seasonal electricity savings via peak demand shaving',
      '94% tenant thermal comfort satisfaction score',
      'Extension of central chiller overhaul lifecycle by 3.5 years'
    ],
    sampleDatasetNotes: 'Focuses on degree-day normalized energy intensity, ASHRAE comfort bands, and chiller load curves.'
  },
  {
    id: 'energy-pipelines',
    name: 'Energy Pipelines & Utilities',
    tagline: 'Transmission pipelines, compression stations, valves & substation grids',
    scadaNeed: 'Mostly automated, with manual intervention when needed. Alarms when activity deviates from normal. Reliability and fewer human errors.',
    luminixOrchestration: 'Context-rich events replace bare alarms. Each shows the asset, segment, severity and history, so operators intervene sooner and with fewer errors. Root-cause timelines support investigations. Executives approve dispatch at the Approve level.',
    keyModules: ['LX-05', 'LX-07', 'LX-S1', 'LX-S2', 'LX-09'],
    kpis: ['Alarm-to-Action Time (1.8 min)', 'Unplanned Outages (0)', 'False Alarm Rate (< 1.5%)', 'Pipeline Flow Balance (99.9%)'],
    exampleEvents: [
      'Compressor Station CS-42 stage-2 discharge vibration excursion (+3.8 mm/s)',
      'Segment 108 differential acoustic pressure wave detected during line pack',
      'Substation RTU battery backup voltage dropping below 23.4 VDC'
    ],
    sirachRecommendations: [
      'Throttle inlet guide vanes by 6% and schedule vibration diagnostic crew dispatch',
      'Correlate upstream valve transit time to rule out transient surge before emergency trip',
      'Dispatch mobile generator van to Substation RTU node with priority safety escort'
    ],
    expectedBusinessValue: [
      'Elimination of catastrophic pipeline pressure trips',
      '72% reduction in nuisance control room alarm fatigue',
      'Auditable regulatory pipeline compliance reporting in seconds'
    ],
    sampleDatasetNotes: 'Emphasizes millisecond DNP3 timestamps, transient pressure monitoring, and GIS pipeline chains.'
  },
  {
    id: 'seafood-processing',
    name: 'Seafood Processing',
    tagline: 'Flash freezing tunnels, filleting lines, cold storage & cold-chain trace',
    scadaNeed: 'Consistency, guaranteed quality and yield. Maximum machine performance to reduce costs.',
    luminixOrchestration: 'Cold-chain and processing-line data linked to lots and customers. Machine performance KPIs are compared across shifts and plants. Quality excursions trace back to the asset and time window.',
    keyModules: ['LX-02', 'LX-03', 'LX-06', 'LX-05', 'LX-10'],
    kpis: ['Product Yield % (94.1%)', 'Temp Excursions (0)', 'Freezer Line OEE (87.5%)', 'Processing Cost ($0.82/kg)'],
    exampleEvents: [
      'IQF Blast Tunnel #1 evaporator coil defrost cycle overdue; air velocity declining 18%',
      'Filleting Station 3 laser portioning blade vibration indicating edge dulling',
      'Refrigerated Container staging bay temp rose to -16.4°C (threshold: -18.0°C)'
    ],
    sirachRecommendations: [
      'Initiate hot-gas defrost sequence during upcoming 20-minute line sanitization break',
      'Swap automated cutting head with sharp spare module #KN-402 (estimated downtime 4 mins)',
      'Reroute pallet lot #SF-9042 to Cold Storage Vault A and verify door thermal curtains'
    ],
    expectedBusinessValue: [
      'Zero rejected export shipments due to unbroken cold chain telemetry proof',
      '1.8% yield gain on high-value Atlantic salmon fillets ($310,000 / year)',
      'Compliance with international HACCP and FDA FSMA food safety guidelines'
    ],
    sampleDatasetNotes: 'Features blast freezer thermal profiles, continuous load scales, and customer lot tracking.'
  },
  {
    id: 'sorting-fulfillment',
    name: 'Sorting & Fulfillment',
    tagline: 'Cross-belt sorters, shoe sorters, high-speed inducts & automated AS/RS',
    scadaNeed: 'Monitor and control machines. Prevent mistakes. Keep performance high.',
    luminixOrchestration: 'PLC input mapping on sorters and conveyors (speed, jams, mis-sorts) feeds event detection. Errors are caught before orders ship. Sirach sends maintenance through Trestara and changes to order priorities through SAIGEN.',
    keyModules: ['LX-S4', 'LX-05', 'LX-06', 'LX-09'],
    kpis: ['Mis-sort Rate (0.012%)', 'Throughput/hr (14,800 pkgs)', 'Conveyor Uptime (99.7%)', 'Orders at Risk (0)'],
    exampleEvents: [
      'Sorter 3 induct lane B photo-eye degradation causing rising mis-sort rate (312 orders at risk)',
      'Main merge conveyor C-202 motor torque spike (88% of thermal trip threshold)',
      'Automated guided vehicle (AGV) charging dock #8 communication intermittent'
    ],
    sirachRecommendations: [
      'Reroute upcoming sorting wave to Sorter 2 and schedule 5-min optical sensor lens cleaning',
      'Temporarily lower induct feed rate by 12% to prevent motor overload until shift close',
      'Redirect automated fleet to Charging Hub B and dispatch hardware technician'
    ],
    expectedBusinessValue: [
      'Protection of $1.8M daily prime delivery commitments from miss-ship penalties',
      'Prevention of 42 hours of peak holiday season conveyor gridlock',
      'Real-time automated rerouting with zero lost packages'
    ],
    sampleDatasetNotes: 'Focuses on microsecond divert confirmations, optical sensor signals, and ERP order tracking.'
  },
  {
    id: 'energy-refrigeration',
    name: 'Energy Management & Refrigeration',
    tagline: 'Multi-compressor racks, thermal evaporators, condenser banks & demand response',
    scadaNeed: 'Track machine performance and circuit operations. Manage availability. Real-time parameters, alarms, trends and reports. Keep costs down.',
    luminixOrchestration: 'Circuit and compressor telemetry is trust-scored and modeled. Governed energy KPIs and automated reports are built on cited facts. Benchmarks find the worst-performing sites and assets.',
    keyModules: ['LX-S1', 'LX-04', 'LX-06', 'LX-10', 'LX-08'],
    kpis: ['Energy Cost ($0.088/kWh)', 'System Availability (99.9%)', 'Daily Alarm Count (< 5)', 'kWh per Unit Cooled (4.12)'],
    exampleEvents: [
      'Compressor Rack A-1 lead screw compressor superheat anomaly (hunting between 4°C and 16°C)',
      'Condenser fan stage 3 contactor chatter resulting in rapid power factor degradation',
      'Utility peak grid tariff window alert in 45 minutes; projected rate spike of 320%'
    ],
    sirachRecommendations: [
      'Adjust electronic expansion valve (EEV) PID integral gain by -15% to stabilize suction flow',
      'Switch lead duty to Compressor Rack A-2 and generate work order for contactor replacement',
      'Pre-chill cold thermal storage buffers to -24°C prior to peak tariff trigger window'
    ],
    expectedBusinessValue: [
      '$290,000 yearly utility savings through intelligent demand charge mitigation',
      '22% reduction in compressor thermal wear and tear',
      'Automated ESG Scope 2 carbon accounting reports delivered directly to executive suite'
    ],
    sampleDatasetNotes: 'Emphasizes circuit power meters, suction/discharge pressures, and utility tariff rate schedules.'
  }
];
