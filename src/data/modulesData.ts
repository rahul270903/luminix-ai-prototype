import { ModuleInfo } from '../types';

export const MODULES: ModuleInfo[] = [
  {
    id: 'LX-01',
    name: 'Industrial Data Connection',
    stage: 'connect',
    shortDescription: 'Read-only connectors to historians, PLC/SCADA via OPC UA and MQTT, IoT gateways, LIMS, MES, ERP, EAM and GIS.',
    detailedDescription: 'Sits in the plant DMZ and establishes high-throughput, read-only connections into operational historians, SCADA systems, PLC tags, and enterprise business applications. Ensures absolute isolation from control write pathways.',
    primaryUser: 'OT/IT engineers',
    phase: 'Phase 1',
    inputs: ['OPC UA tag tables', 'MQTT broker topics', 'OSIsoft PI points', 'REST API streams', 'Modbus registers'],
    outputs: ['Normalized point stream', 'Schema registry metadata', 'Ingestion timestamps'],
    dependencies: ['Plant DMZ network access', 'Read-only service accounts'],
    connectedModules: ['LX-04', 'LX-S1', 'LX-02'],
    status: 'operational',
    exampleData: {
      active_connections: 18,
      ingested_points_sec: 42500,
      protocol_distribution: { 'OPC UA': '42%', 'OSIsoft PI': '30%', 'MQTT': '18%', 'REST': '10%' }
    }
  },
  {
    id: 'LX-02',
    name: 'Asset and Process Context Model',
    stage: 'model',
    shortDescription: 'Site → area → line → asset → sensor hierarchy. Every tag mapped to its asset, unit, limits and owner.',
    detailedDescription: 'Transforms disconnected signal addresses into a semantic digital asset tree based on ISA-95 standards. Enriches raw tags with operating engineering units, physical limits, equipment criticality, and responsible engineers.',
    primaryUser: 'Reliability and data engineers',
    phase: 'Phase 1',
    inputs: ['Raw tag streams', 'Asset register (EAM/CMMS)', 'P&ID drawings', 'Engineering spec sheets'],
    outputs: ['Governed Asset Tree', 'Sensor metadata bindings', 'Operating boundary definitions'],
    dependencies: ['LX-01', 'LX-04'],
    connectedModules: ['LX-03', 'LX-05', 'LX-06', 'LX-S3', 'LX-S4'],
    status: 'operational',
    exampleData: {
      modeled_assets: 840,
      mapped_tags: 12450,
      coverage_rate: '94.8%',
      hierarchy_depth: '5 tiers (Site to Sensor)'
    }
  },
  {
    id: 'LX-03',
    name: 'Industrial Knowledge Graph',
    stage: 'model',
    shortDescription: 'Links assets, work orders, permits, incidents, people, products, customers and contracts.',
    detailedDescription: 'Cross-domain graph engine connecting physical asset topologies with business execution artifacts. Allows instant traversal from a high vibration telemetry reading to open work orders, affected production batches, and delivery penalties.',
    primaryUser: 'Data engineers, AI agents',
    phase: 'Phase 2',
    inputs: ['Asset models (LX-02)', 'CMMS work orders (Trestara)', 'ERP sales & inventory (Veloris)', 'EHS permits (Thorium)'],
    outputs: ['Entity-relationship graph', 'Contextual semantic queries', 'Lineage graphs'],
    dependencies: ['LX-02', 'Enterprise ERP/EAM integration'],
    connectedModules: ['LX-05', 'LX-07', 'LX-09'],
    status: 'active',
    exampleData: {
      graph_nodes: 148200,
      graph_edges: 684100,
      traversal_latency_ms: 12,
      cross_system_links: '18 ERP-to-OT links'
    }
  },
  {
    id: 'LX-04',
    name: 'Data Quality and Trust Scoring',
    stage: 'connect',
    shortDescription: 'Flags gaps, stale feeds, out-of-range values and unit errors. Attaches a trust score to every point served.',
    detailedDescription: 'Continuous data integrity engine. Evaluates statistical noise, flatlines, telemetry dropouts, sensor drift, and transmission latency, computing a real-time trust coefficient between 0.00 and 1.00 for every single data point.',
    primaryUser: 'Data stewards',
    phase: 'Phase 1',
    inputs: ['Raw time series', 'Edge packet metadata', 'Physical tolerance tables'],
    outputs: ['Per-point trust score (0-1.00)', 'Stale feed alerts', 'Data gap event logs'],
    dependencies: ['LX-01'],
    connectedModules: ['LX-01', 'LX-02', 'LX-05', 'LX-S2'],
    status: 'operational',
    exampleData: {
      average_trust_score: 0.942,
      points_above_threshold: '91.8%',
      stale_tags_flagged: 14,
      gap_detection_window: '5s sliding'
    }
  },
  {
    id: 'LX-05',
    name: 'Event and Anomaly Detection',
    stage: 'detect',
    shortDescription: 'Turns bare tag alarms into contextualized events: which asset, how serious, what is at risk.',
    detailedDescription: 'Combines threshold rules, statistical baseline anomalies, and multi-sensor drift models to upgrade noisy alarms into high-fidelity operational events linked with estimated days-to-limit and customer impact.',
    primaryUser: 'Operations, reliability',
    phase: 'Phase 2',
    inputs: ['Trust-scored telemetry (LX-04)', 'Asset boundaries (LX-02)', 'Historical baseline models'],
    outputs: ['Contextual events', 'Days-to-limit forecasts', 'Financial risk valuations'],
    dependencies: ['LX-02', 'LX-04'],
    connectedModules: ['LX-07', 'LX-09', 'Sirach Decision Center'],
    status: 'active',
    exampleData: {
      active_events: 5,
      alarm_compression_ratio: '88% reduction in noise',
      mean_lead_time_to_failure: '38 hours'
    }
  },
  {
    id: 'LX-06',
    name: 'Operational KPI Layer',
    stage: 'measure',
    shortDescription: 'Governed definitions and live values for OEE, MTBF, MTTR, energy intensity, emissions, yield and uptime.',
    detailedDescription: 'Centralizes version-controlled operational metric definitions across all production sites. Ensures OEE calculations in California match OEE calculations in Ohio by applying consistent normalization algorithms.',
    primaryUser: 'Plant and regional leaders',
    phase: 'Phase 1',
    inputs: ['Asset run states (LX-S4)', 'Production output counts', 'Energy meter readings', 'Maintenance logs'],
    outputs: ['Standardized OEE', 'MTBF/MTTR trends', 'Normalized energy intensity (kWh/unit)'],
    dependencies: ['LX-02', 'LX-04'],
    connectedModules: ['LX-10', 'LX-09', 'LX-S3'],
    status: 'operational',
    exampleData: {
      governed_metrics: 48,
      definition_version: 'v3.2.1-governed',
      recalculation_interval: '60 seconds'
    }
  },
  {
    id: 'LX-07',
    name: 'Root-Cause Context Assembly',
    stage: 'detect',
    shortDescription: 'One timeline per event, combining sensor data, maintenance history, shift logs, permits and prior incidents.',
    detailedDescription: 'Automatically stitches together a multi-stream chronological dossier when an anomaly is detected. Correlates temperature spikes with motor vibration, technician grease logs, operator setpoint changes, and ambient conditions.',
    primaryUser: 'Reliability, EHS investigators',
    phase: 'Phase 2',
    inputs: ['Detected events (LX-05)', 'Telemetry history (LX-01)', 'Work orders (LX-03)', 'Shift handovers'],
    outputs: ['Correlated investigation timeline', 'Leading indicator candidates', 'Confidence scores'],
    dependencies: ['LX-03', 'LX-05'],
    connectedModules: ['LX-09', 'Sirach Decision Engine'],
    status: 'active',
    exampleData: {
      timeline_sources_blended: 7,
      causal_inference_confidence: '92.4%',
      investigation_assembly_speed: '< 800ms'
    }
  },
  {
    id: 'LX-08',
    name: 'Digital Twin Data Foundation',
    stage: 'serve',
    shortDescription: 'Current-state asset data and 2D/3D references that twin and simulation tools can consume.',
    detailedDescription: 'Powers spatial and simulation layers by streaming synced physical asset states, live sensor coordinates, hydraulic flow simulations, and thermal gradients directly into 2D plant layouts and 3D CAD/BIM engines.',
    primaryUser: 'Engineering, plant simulation teams',
    phase: 'Phase 3',
    inputs: ['Asset models (LX-02)', 'Live telemetry streams', 'CAD/BIM geometric models'],
    outputs: ['Websocket state stream', 'Geometric spatial bindings', 'Thermal/vibration overlays'],
    dependencies: ['LX-02', 'LX-06'],
    connectedModules: ['LX-09', 'Digital Twin UI'],
    status: 'pilot',
    exampleData: {
      synced_spatial_nodes: 320,
      stream_latency: '45ms',
      supported_formats: ['glTF', 'USDZ', 'SVG Spatial Grid']
    }
  },
  {
    id: 'LX-09',
    name: 'Context API for AI and Apps',
    stage: 'serve',
    shortDescription: 'One governed API and retrieval layer, so Sirach, Nikolai, SAIGEN, Trestara and Thorium answer from the same facts.',
    detailedDescription: 'The enterprise AI retrieval gateway. Enforces strict attribute-based access control (ABAC), injects verifiable cryptographic citations for every fact, and logs complete audit trails for every query executed by AI agents.',
    primaryUser: 'All Seiretsu apps, AI agents',
    phase: 'Phase 1',
    inputs: ['REST/GraphQL/gRPC queries', 'Agent identity credentials', 'User authorization tokens'],
    outputs: ['Cited JSON payload', 'Audit log entries', 'Fact trust scores'],
    dependencies: ['LX-02', 'LX-03', 'LX-04', 'LX-05', 'LX-06'],
    connectedModules: ['Sirach', 'Nikolai', 'SAIGEN', 'Trestara', 'Thorium'],
    status: 'operational',
    exampleData: {
      daily_api_queries: 184500,
      p99_latency_ms: 68,
      citation_coverage: '100% of facts cited'
    }
  },
  {
    id: 'LX-10',
    name: 'Cross-Site Benchmarking',
    stage: 'measure',
    shortDescription: 'Like-for-like comparison of assets, lines and plants using normalized context.',
    detailedDescription: 'Normalizes operational metrics across disparate geographical facilities regardless of varying equipment manufacturers, raw material quality, ambient climate, or local shift rosters to spotlight performance gaps.',
    primaryUser: 'COO, regional operational leaders',
    phase: 'Phase 2',
    inputs: ['Governed KPIs (LX-06)', 'Production volume normalization tables', 'Multi-site asset trees'],
    outputs: ['Normalized efficiency rankings', 'Best-in-class gap analysis', 'Improvement opportunity sizing'],
    dependencies: ['LX-06'],
    connectedModules: ['Executive Overview', 'LX-09'],
    status: 'active',
    exampleData: {
      benchmarked_sites: 3,
      normalized_lines: 12,
      identified_value_gap: '$340,000 / month'
    }
  },
  // SCADA Expansion Modules
  {
    id: 'LX-S1',
    name: 'RTU and MTU Telemetry',
    stage: 'connect',
    shortDescription: 'Ingests the sensor data RTUs store and forward when the MTU polls them. Timestamps, normalizes and trust-scores every point.',
    detailedDescription: 'Taps directly into SCADA Master Terminal Unit (MTU) polling cycles and remote field Remote Terminal Units (RTUs). Handles store-and-forward buffers, compensates for telemetry jitter, and verifies polling consistency.',
    primaryUser: 'OT engineers, SCADA specialists',
    phase: 'Phase 1',
    inputs: ['RTU poll buffers', 'MTU serial/Ethernet bridge', 'DNP3 / Modbus TCP packets'],
    outputs: ['Trust-scored poll records', 'Communication timestamp alignment'],
    dependencies: ['SCADA network tap', 'Read-only gateway'],
    connectedModules: ['LX-01', 'LX-04', 'LX-02'],
    status: 'operational',
    isScadaExpansion: true,
    exampleData: {
      polled_rtus: 42,
      polling_cadence: '1000ms',
      buffer_replay_success: '99.98%'
    }
  },
  {
    id: 'LX-S2',
    name: 'Communications Network Health',
    stage: 'connect',
    shortDescription: 'Monitors the two-way link for gaps, latency and stale feeds. Holds degraded data out of decisions until the feed recovers.',
    detailedDescription: 'Continuously measures packet loss, round-trip latency, jitter, and link dropouts across wireless, fiber optic, and twisted-pair telemetry lines. Prevents faulty decision-making on frozen or stale telemetry.',
    primaryUser: 'SCADA network administrators, data stewards',
    phase: 'Phase 1',
    inputs: ['Network heartbeat pings', 'Packet loss counters', 'Cellular signal RSSI'],
    outputs: ['Link health status', 'Stale-data freeze flags', 'Degraded feed containment'],
    dependencies: ['LX-S1'],
    connectedModules: ['LX-04', 'LX-05'],
    status: 'operational',
    isScadaExpansion: true,
    exampleData: {
      active_links_monitored: 58,
      average_latency_ms: 24,
      stale_protection_trips: 3
    }
  },
  {
    id: 'LX-S3',
    name: 'HMI Context Overlay',
    stage: 'serve',
    shortDescription: 'Reads HMI tag sets and screens. Returns asset context, KPIs and trends to the operator views already in use.',
    detailedDescription: 'Bridges modern Luminix context back into traditional plant operator workstations. Injects live MTBF, maintenance reminders, and Sirach recommendations right onto Wonderware, Ignition, or FactoryTalk screens.',
    primaryUser: 'Plant operators, shift supervisors',
    phase: 'Phase 2',
    inputs: ['HMI screen metadata', 'Active operator tag bindings', 'Luminix Context API (LX-09)'],
    outputs: ['HMI web widgets', 'Contextual tooltips for operators', 'Active shift advisory'],
    dependencies: ['LX-02', 'LX-06', 'LX-09'],
    connectedModules: ['LX-02', 'LX-06', 'LX-09'],
    status: 'active',
    isScadaExpansion: true,
    exampleData: {
      connected_hmi_terminals: 24,
      overlay_render_time: '< 100ms',
      operator_advisory_clicks: 142
    }
  },
  {
    id: 'LX-S4',
    name: 'PLC Input Mapping',
    stage: 'model',
    shortDescription: 'Maps input states (motor speed, run state, load) and output commands into the knowledge graph as read-only facts.',
    detailedDescription: 'Performs deterministic bitmask and registry decoding for Siemens S7, Rockwell ControlLogix, and Schneider PLCs. Converts raw binary states (0x00FF) into human-readable digital twin facts without issuing control signals.',
    primaryUser: 'Controls engineers, automation architects',
    phase: 'Phase 2',
    inputs: ['PLC I/O memory racks', 'Run state coils', 'Analog input registers (0-10V, 4-20mA)'],
    outputs: ['Categorized operational states (Running, Idle, Faulted, E-Stop)', 'Load % tags'],
    dependencies: ['LX-02', 'Safety DMZ conduit'],
    connectedModules: ['LX-02', 'LX-03', 'LX-05'],
    status: 'active',
    isScadaExpansion: true,
    exampleData: {
      mapped_coils: 1840,
      analog_registers_decoded: 3200,
      safety_barrier_status: 'HARDWARE READ-ONLY AIR GAP'
    }
  }
];
