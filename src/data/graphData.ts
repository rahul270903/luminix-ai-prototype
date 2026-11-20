export interface GraphNode {
  id: string;
  name: string;
  type: 'Site' | 'Area' | 'Line' | 'Asset' | 'Sensor' | 'Event' | 'WorkOrder' | 'Person' | 'Customer' | 'Product' | 'Order';
  category: string;
  details: Record<string, string>;
  status?: 'optimal' | 'warning' | 'critical' | 'active' | 'open' | 'normal';
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type?: 'hierarchy' | 'telemetry' | 'operational' | 'business' | 'governance';
}

export const GRAPH_NODES: GraphNode[] = [
  // Site
  { id: 'site-riv', name: 'Riverside Plant', type: 'Site', category: 'Facility', details: { location: 'Columbus, OH', units: '3 Areas', status: 'Operating' } },
  // Area
  { id: 'area-b', name: 'Area B (Packaging & Fill)', type: 'Area', category: 'Production Area', details: { facility: 'Riverside Plant', floor: 'Level 1' } },
  // Line
  { id: 'line-2', name: 'Line 2 (High-Speed Bottling)', type: 'Line', category: 'Production Line', details: { speed: '600 bpm', status: 'Running - Degraded MTBF' } },
  // Asset
  { id: 'P-104', name: 'Pump P-104 (Slurry)', type: 'Asset', category: 'Centrifugal Pump', details: { code: 'RIV-A2-L2-P104', health: '68% (Degrading)', critical: 'Tier A' }, status: 'warning' },
  { id: 'P-105', name: 'Pump P-105 (Booster)', type: 'Asset', category: 'Booster Pump', details: { code: 'RIV-A2-L2-P105', health: '94% (Optimal)' }, status: 'optimal' },
  { id: 'C-202', name: 'Conveyor C-202', type: 'Asset', category: 'Infeed Conveyor', details: { code: 'RIV-A2-L2-C202', health: '88% (Good)' }, status: 'normal' },
  // Sensor
  { id: 'TT-104A', name: 'TT-104A Bearing Temp', type: 'Sensor', category: 'RTD Sensor', details: { reading: '78.4 °C', limit: '85.0 °C', trust: '0.98' }, status: 'warning' },
  { id: 'VIB-104', name: 'VIB-104 Bearing Vibration', type: 'Sensor', category: 'Accelerometer', details: { reading: '4.82 mm/s', limit: '5.5 mm/s', trust: '0.96' }, status: 'warning' },
  { id: 'AMP-104', name: 'AMP-104 Motor Current', type: 'Sensor', category: 'Current Transducer', details: { reading: '84.6 A', limit: '100.0 A', trust: '0.99' }, status: 'normal' },
  // Event
  { id: 'EVT-104', name: 'Event EVT-104 (Bearing Temp)', type: 'Event', category: 'Active Anomaly', details: { severity: 'Critical', daysToLimit: '2 days', status: 'Active' }, status: 'critical' },
  // Work Order
  { id: 'WO-3381', name: 'Work Order WO-3381', type: 'WorkOrder', category: 'CMMS Maintenance', details: { system: 'Trestara EAM', scope: 'Bearing Replacement', shift: 'Night' }, status: 'open' },
  // Person
  { id: 'person-patel', name: 'J. Patel (Reliability Lead)', type: 'Person', category: 'Staff', details: { role: 'Reliability Engineer', shift: 'First Shift', certified: 'Vib Level III' } },
  { id: 'person-vance', name: 'E. Vance (Plant VP)', type: 'Person', category: 'Executive', details: { role: 'VP Operations', approvalAuthority: '$50,000' } },
  // Customer & Order & Product
  { id: 'cust-apex', name: 'Apex Beverage Brands', type: 'Customer', category: 'Tier 1 Customer', details: { account: 'APX-9941', status: 'Key Account' } },
  { id: 'order-4471', name: 'Customer Order #4471', type: 'Order', category: 'Sales Contract', details: { value: '$1,200,000', deadline: 'Friday 18:00 EST', status: 'At Risk' }, status: 'warning' },
  { id: 'prod-citrus', name: 'Citrus Spark 500ml', type: 'Product', category: 'Finished Goods', details: { sku: 'BEV-CSP-500', targetVolume: '140,000 cases' } },

  // Water Station 7 Cluster
  { id: 'site-water', name: 'Water Utility Station 7', type: 'Site', category: 'Municipal Plant', details: { location: 'Austin, TX', service: '45,000 residents' } },
  { id: 'W-PUMP-701', name: 'Discharge Pump 701', type: 'Asset', category: 'High-Lift Pump', details: { health: '71% (Degrading)', pressure: '62.4 psi' }, status: 'warning' },
  { id: 'EVT-W701', name: 'Event EVT-W701 (Impeller Wear)', type: 'Event', category: 'SCADA Anomaly', details: { severity: 'High', trust: '0.74 (Stale feed flag)' }, status: 'warning' },

  // Fulfillment Center Site 3 Cluster
  { id: 'site-fulf', name: 'Fulfillment Center Site 3', type: 'Site', category: 'Logistics Hub', details: { location: 'Allentown, PA', sorters: '4 Sorter Halls' } },
  { id: 'SRT-301', name: 'Cross-Belt Sorter 301', type: 'Asset', category: 'Package Sorter', details: { health: '79%', misSortRate: '0.038%' }, status: 'warning' },
  { id: 'EVT-F301', name: 'Event EVT-F301 (Optics)', type: 'Event', category: 'Induct Anomaly', details: { severity: 'Medium', ordersAtRisk: '312 packages' }, status: 'normal' }
];

export const GRAPH_EDGES: GraphEdge[] = [
  // Riverside Hierarchy
  { id: 'e-riv-area', source: 'site-riv', target: 'area-b', label: 'contains area', type: 'hierarchy' },
  { id: 'e-area-line', source: 'area-b', target: 'line-2', label: 'contains line', type: 'hierarchy' },
  { id: 'e-line-p104', source: 'line-2', target: 'P-104', label: 'operates asset', type: 'hierarchy' },
  { id: 'e-line-p105', source: 'line-2', target: 'P-105', label: 'operates asset', type: 'hierarchy' },
  { id: 'e-line-c202', source: 'line-2', target: 'C-202', label: 'operates asset', type: 'hierarchy' },

  // P-104 Sensors
  { id: 'e-p104-tt', source: 'P-104', target: 'TT-104A', label: 'monitored by', type: 'telemetry' },
  { id: 'e-p104-vib', source: 'P-104', target: 'VIB-104', label: 'monitored by', type: 'telemetry' },
  { id: 'e-p104-amp', source: 'P-104', target: 'AMP-104', label: 'monitored by', type: 'telemetry' },

  // P-104 Operational Events & Work
  { id: 'e-p104-evt', source: 'P-104', target: 'EVT-104', label: 'triggered event', type: 'operational' },
  { id: 'e-p104-wo', source: 'P-104', target: 'WO-3381', label: 'open work order', type: 'operational' },
  { id: 'e-p104-owner', source: 'P-104', target: 'person-patel', label: 'engineered by', type: 'governance' },
  { id: 'e-wo-approver', source: 'WO-3381', target: 'person-vance', label: 'pending approval by', type: 'governance' },

  // Business connections
  { id: 'e-line-prod', source: 'line-2', target: 'prod-citrus', label: 'currently bottling', type: 'business' },
  { id: 'e-order-prod', source: 'order-4471', target: 'prod-citrus', label: 'order batch', type: 'business' },
  { id: 'e-order-cust', source: 'order-4471', target: 'cust-apex', label: 'contract with', type: 'business' },
  { id: 'e-p104-order', source: 'P-104', target: 'order-4471', label: 'bottlenecks order', type: 'business' },
  { id: 'e-evt-order', source: 'EVT-104', target: 'order-4471', label: 'exposes order', type: 'business' },

  // Water Station 7
  { id: 'e-w7-pump', source: 'site-water', target: 'W-PUMP-701', label: 'remote asset', type: 'hierarchy' },
  { id: 'e-w7-evt', source: 'W-PUMP-701', target: 'EVT-W701', label: 'active anomaly', type: 'operational' },

  // Fulfillment Site 3
  { id: 'e-fulf-srt', source: 'site-fulf', target: 'SRT-301', label: 'induct hall asset', type: 'hierarchy' },
  { id: 'e-srt-evt', source: 'SRT-301', target: 'EVT-F301', label: 'divert anomaly', type: 'operational' }
];
