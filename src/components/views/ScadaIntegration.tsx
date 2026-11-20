import React, { useState } from 'react';
import { useApp, ScadaNetworkState } from '../../context/AppContext';
import {
  Radio,
  Server,
  Wifi,
  Activity,
  Layers,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Monitor,
  ArrowRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { MODULES } from '../../data/modulesData';
import { Modal } from '../common/Modal';

export const ScadaIntegration: React.FC = () => {
  const { scadaNetworkCondition, setScadaNetworkCondition, dataSources } = useApp();
  const [selectedComponent, setSelectedComponent] = useState<string | null>('rtu');
  const [activeModuleModal, setActiveModuleModal] = useState<string | null>(null);

  const scadaModules = MODULES.filter(m => m.isScadaExpansion);

  const components = [
    {
      id: 'sensors',
      name: 'Sensors',
      subtitle: 'Field Devices',
      desc: 'RTDs, pressure transmitters, accelerometers, flow meters measuring process physics.',
      tapPoint: 'Hardwired 4-20mA / HART / Modbus inputs to local RTU racks',
      contextGained: 'Physical signal ground truth, engineering calibration units',
      linkedModule: 'LX-S1'
    },
    {
      id: 'rtu',
      name: 'RTUs',
      subtitle: 'Remote Terminal Units',
      desc: 'Collect and store field telemetry in edge buffers until commanded or polled by the MTU.',
      tapPoint: 'LX-S1 taps store-and-forward buffers via read-only Modbus/DNP3 bridges',
      contextGained: 'Which asset, which line, how trustworthy, and since when',
      linkedModule: 'LX-S1'
    },
    {
      id: 'comms',
      name: 'Comms Network',
      subtitle: 'Wireless · Fiber · Twisted Pair',
      desc: 'Two-way telemetry transport connecting remote pump stations, pipelines, and factory cells to master host.',
      tapPoint: 'LX-S2 packet sniffing and ping heartbeat monitors in plant DMZ',
      contextGained: 'Link jitter, packet dropouts, stale telemetry detection',
      linkedModule: 'LX-S2'
    },
    {
      id: 'mtu',
      name: 'MTU',
      subtitle: 'Master Terminal Unit / Server',
      desc: 'Central SCADA server / PLC polling RTUs, executing alarm logic, and maintaining real-time database.',
      tapPoint: 'Primary read tap through OPC UA server or MQTT sparkplug B bridge',
      contextGained: 'Poll cadence, master clock timestamps, links to enterprise records',
      linkedModule: 'LX-S4'
    },
    {
      id: 'hmi',
      name: 'HMI',
      subtitle: 'Operator Workstations',
      desc: 'Wonderware, Ignition, or FactoryTalk screens monitored by control room engineers.',
      tapPoint: 'LX-S3 companion web overlays and Context API widgets injected into screens',
      contextGained: 'Asset history, maintenance status, governed KPIs next to live values',
      linkedModule: 'LX-S3'
    }
  ];

  const networkConditions: Array<{ id: ScadaNetworkState; label: string; desc: string }> = [
    { id: 'healthy', label: 'Healthy (Normal)', desc: 'Full link speed, 18-35ms latency, 0% packet loss' },
    { id: 'latency', label: 'High Latency', desc: 'Cellular tower congestion, 3800ms ping delay' },
    { id: 'packet-loss', label: 'Packet Loss (15%)', desc: 'Intermittent signal dropouts, partial buffers' },
    { id: 'stale-data', label: 'Stale Feed (> 30s)', desc: 'Values frozen, triggers LX-S2 quarantine' },
    { id: 'offline', label: 'Link Offline', desc: 'Complete loss of connection, edge buffering active' },
  ];

  const activeCompData = components.find(c => c.id === selectedComponent) || components[1];

  return (
    <div className="space-y-6 pb-12">
      {/* Prominent Safety Architecture Alert */}
      <div className="bg-navy-950 border-2 border-amber-500 p-5 rounded-2xl shadow-md text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-amber-500 text-navy-950 font-bold">
              Mandatory OT Cyber-Physical Boundary
            </span>
            <span className="text-sm font-bold text-amber-300">
              READ-ONLY INDUSTRIAL DATA · NO CONTROL WRITE PATH
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Luminix maintains a hardware-enforced one-way data flow from the OT control zone to the plant DMZ. It never issues setpoints, start/stop pulses, or control commands to PLCs, RTUs, MTUs, or HMIs. All corrective actions route through Sirach into business applications with mandatory human approval.
          </p>
        </div>

        <div className="shrink-0 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center">
          <Lock className="w-6 h-6 text-amber-400 mx-auto mb-1" />
          <span className="font-mono text-[10px] text-amber-300 font-bold block">
            AIR-GAP CONDUIT ACTIVE
          </span>
        </div>
      </div>

      {/* Network Condition Simulator Bar */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-primary" />
              <span>SCADA Communications Network Condition Simulator</span>
            </h3>
            <p className="text-xs text-slate-500">
              Simulate telemetry degradation to observe how LX-S2 and LX-04 automatically quarantine stale feeds from AI decisions.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
            Current: {scadaNetworkCondition.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {networkConditions.map(cond => (
            <button
              key={cond.id}
              onClick={() => setScadaNetworkCondition(cond.id)}
              className={`p-3 rounded-xl border text-left transition ${
                scadaNetworkCondition === cond.id
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-slate-50 border-surface-border hover:bg-slate-100 text-navy-900'
              }`}
            >
              <div className="font-bold text-xs">{cond.label}</div>
              <div className={`text-[10px] line-clamp-1 mt-0.5 ${
                scadaNetworkCondition === cond.id ? 'text-primary-light' : 'text-slate-400'
              }`}>
                {cond.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SCADA Stack Diagram */}
      <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-navy-900">
            SCADA Architecture & Luminix Read-Only Tap Points
          </h3>
          <p className="text-xs text-slate-500">
            Click on any SCADA component or connector module below to view data ingress specifications.
          </p>
        </div>

        {/* 5-Step Physical SCADA Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {components.map((comp, idx) => {
            const isSelected = selectedComponent === comp.id;
            return (
              <div
                key={comp.id}
                onClick={() => setSelectedComponent(comp.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition relative group ${
                  isSelected
                    ? 'border-primary bg-primary-light/40 shadow-sm ring-2 ring-primary/20'
                    : 'border-surface-border bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span>STEP 0{idx + 1}</span>
                  {comp.id === 'rtu' && <Radio className="w-4 h-4 text-primary" />}
                  {comp.id === 'comms' && <Wifi className="w-4 h-4 text-teal" />}
                  {comp.id === 'mtu' && <Server className="w-4 h-4 text-amber" />}
                  {comp.id === 'hmi' && <Monitor className="w-4 h-4 text-purple-600" />}
                  {comp.id === 'sensors' && <Activity className="w-4 h-4 text-rose" />}
                </div>

                <div className="font-bold text-sm text-navy-900">{comp.name}</div>
                <div className="text-[11px] text-slate-500">{comp.subtitle}</div>

                <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Tap:</span>
                  <span className="font-bold text-primary">{comp.linkedModule}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected SCADA Component Inspector Drawer */}
        <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              {activeCompData.name} ({activeCompData.subtitle})
            </span>
            <span className="text-teal text-[11px]">Tap Connector: {activeCompData.linkedModule}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans">
            <div>
              <span className="text-slate-400 text-xs block font-mono">Operational Role:</span>
              <p className="text-xs text-slate-300 mt-0.5">{activeCompData.desc}</p>
            </div>
            <div>
              <span className="text-slate-400 text-xs block font-mono">Luminix Integration Tap:</span>
              <p className="text-xs text-slate-300 mt-0.5">{activeCompData.tapPoint}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 font-sans">
            <span className="text-emerald-400 text-xs font-mono">Context Gained for AI Reasoning:</span>
            <span className="text-xs text-slate-200 ml-2">{activeCompData.contextGained}</span>
          </div>
        </div>

        {/* 4 SCADA Connector Family Modules (LX-S1 to LX-S4) */}
        <div>
          <h4 className="text-sm font-bold text-navy-900 mb-3">
            SCADA Expansion Connector Families (LX-S1 to LX-S4)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scadaModules.map(mod => (
              <div
                key={mod.id}
                onClick={() => setActiveModuleModal(mod.id)}
                className="p-4 rounded-xl border border-surface-border bg-white hover:border-teal hover:shadow-sm cursor-pointer transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-xs bg-teal-100 text-teal-900 px-2 py-0.5 rounded">
                      {mod.id}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{mod.phase}</span>
                  </div>
                  <h5 className="font-bold text-xs text-navy-900 leading-snug">{mod.name}</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{mod.shortDescription}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-primary font-medium flex items-center justify-between">
                  <span>View Specifications</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for SCADA Module Inspection */}
      {activeModuleModal && (
        <Modal
          isOpen={!!activeModuleModal}
          onClose={() => setActiveModuleModal(null)}
          title={`SCADA Module ${activeModuleModal}`}
          subtitle="Seiretsu Industrial Expansion Specification"
        >
          {(() => {
            const mod = scadaModules.find(m => m.id === activeModuleModal);
            if (!mod) return null;
            return (
              <div className="space-y-4 text-xs">
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {mod.detailedDescription}
                </p>
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Primary User</span>
                    <span className="font-bold text-navy-900">{mod.primaryUser}</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Operational Feeds</span>
                    <span className="font-bold text-teal">{mod.connectedModules.join(', ')}</span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-navy-900 block mb-1">Live Telemetry Metrics</span>
                  <pre className="p-3 bg-navy-950 text-emerald-400 rounded-lg font-mono text-xs">
                    {JSON.stringify(mod.exampleData, null, 2)}
                  </pre>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}
    </div>
  );
};
