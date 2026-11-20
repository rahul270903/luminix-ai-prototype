import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StageId, IndustrialEvent, Asset } from '../../types';
import {
  Database,
  Cpu,
  AlertTriangle,
  BarChart3,
  Code2,
  BrainCircuit,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Layers,
  Sparkles,
  Lock,
  RefreshCw,
  Search,
  Filter,
  Check,
  Info
} from 'lucide-react';
import { SeverityBadge, TrustScoreBadge } from '../common/Badge';
import { MODULES } from '../../data/modulesData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const OrchestrationWorkflow: React.FC = () => {
  const [activeStage, setActiveStage] = useState<StageId>('connect');
  const [activeScenario, setActiveScenario] = useState<'p104' | 'water' | 'sorter'>('p104');
  const [selectedSourceId, setSelectedSourceId] = useState<string>('src-01');
  const [selectedHierarchyId, setSelectedHierarchyId] = useState<string>('P-104');
  const [selectedEventId, setSelectedEventId] = useState<string>('EVT-104');
  const [selectedApiAssetId, setSelectedApiAssetId] = useState<string>('P-104');
  const [selectedApiCaller, setSelectedApiCaller] = useState<string>('sirach');
  const [selectedApiRole, setSelectedApiRole] = useState<string>('coo');
  const [apiResponse, setApiResponse] = useState<any | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'riv': true,
    'area-b': true,
    'line-2': true,
    'water-site': true,
    'fulf-site': true,
  });

  const handleScenarioChange = (scen: 'p104' | 'water' | 'sorter') => {
    setActiveScenario(scen);
    if (scen === 'p104') {
      setSelectedSourceId('src-01');
      setSelectedHierarchyId('P-104');
      setSelectedEventId('EVT-104');
      setSelectedApiAssetId('P-104');
    } else if (scen === 'water') {
      setSelectedSourceId('src-07');
      setSelectedHierarchyId('W-PUMP-701');
      setSelectedEventId('EVT-W701');
      setSelectedApiAssetId('W-PUMP-701');
    } else if (scen === 'sorter') {
      setSelectedSourceId('src-10');
      setSelectedHierarchyId('SRT-301');
      setSelectedEventId('EVT-F301');
      setSelectedApiAssetId('SRT-301');
    }
  };

  const {
    dataSources,
    assets,
    events,
    sirachDecisions,
    simulateIncomingData,
    acknowledgeEvent,
    assignEventOwner,
    approveRequest,
    openGuidedDemo
  } = useApp();

  const navigate = useNavigate();

  const stages: Array<{
    id: StageId;
    step: string;
    name: string;
    icon: any;
    tagline: string;
    modules: string[];
    color: string;
  }> = [
    { id: 'connect', step: '01', name: 'CONNECT', icon: Database, tagline: 'Read OT/IT sources & score trust', modules: ['LX-01', 'LX-04', 'LX-S1', 'LX-S2'], color: 'from-blue-600 to-indigo-700' },
    { id: 'model', step: '02', name: 'MODEL', icon: Cpu, tagline: 'Map hierarchy & knowledge graph', modules: ['LX-02', 'LX-03', 'LX-S3', 'LX-S4'], color: 'from-teal-600 to-emerald-700' },
    { id: 'detect', step: '03', name: 'DETECT', icon: AlertTriangle, tagline: 'Alarms to contextual events', modules: ['LX-05', 'LX-07'], color: 'from-amber-600 to-amber-700' },
    { id: 'measure', step: '04', name: 'MEASURE', icon: BarChart3, tagline: 'Governed KPIs & benchmarks', modules: ['LX-06', 'LX-10'], color: 'from-purple-600 to-purple-800' },
    { id: 'serve', step: '05', name: 'SERVE', icon: Code2, tagline: 'One governed API, RBAC & citations', modules: ['LX-09', 'LX-08'], color: 'from-indigo-600 to-blue-800' },
    { id: 'decide', step: '06', name: 'DECIDE', icon: BrainCircuit, tagline: 'Sirach reasons, ranks & human approves', modules: ['Sirach Decision Engine'], color: 'from-rose-600 to-pink-700' },
  ];

  const currentStageMeta = stages.find(s => s.id === activeStage)!;

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleRunApiQuery = () => {
    setIsQuerying(true);
    setTimeout(() => {
      const asset = assets.find(a => a.id === selectedApiAssetId) || assets[0];
      setApiResponse({
        status: 200,
        permission_check: `${selectedApiRole.toUpperCase()} role granted for ${selectedApiCaller}`,
        audit_id: `a-${Math.floor(70000 + Math.random() * 9999)}`,
        data: {
          asset: asset.name,
          asset_code: asset.code,
          line: `${asset.siteId.toUpperCase()} / ${asset.line}`,
          health: asset.healthStatus,
          health_score: asset.healthScore,
          days_to_limit: asset.id === 'P-104' ? 2 : 45,
          order_at_risk: asset.orderAtRisk ? '#4471 ($1.2M Apex Beverage)' : 'None',
          open_wo: asset.openWorkOrderId || 'None',
          trust: 0.98,
          active_event: asset.activeEventId || 'None',
          telemetry: asset.sensors.map(s => ({
            tag: s.tag,
            value: s.currentValue,
            unit: s.unit,
            status: s.status,
            trust: s.trustScore
          })),
          citations: [
            `historian:${asset.sensors[0]?.tag || 'TT-104A'}`,
            `trestara:${asset.openWorkOrderId || 'WO-3381'}`,
            `veloris:SO-4471`,
            `thorium:PER-HW-8841`
          ]
        }
      });
      setIsQuerying(false);
    }, 350);
  };

  const activeDataSource = dataSources.find(d => d.id === selectedSourceId) || dataSources[0];
  const activeEvent = events.find(e => e.id === selectedEventId) || events[0];
  const activeDecisionKey = activeScenario === 'water' ? 'SIR-DEC-W701' : activeScenario === 'sorter' ? 'SIR-DEC-F301' : 'SIR-DEC-104';
  const activeDecision = sirachDecisions[activeDecisionKey] || sirachDecisions['SIR-DEC-104'];
  const matchingRequestId = activeScenario === 'water' ? 'REQ-8809' : activeScenario === 'sorter' ? 'REQ-8795' : 'REQ-8812';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Workflow Architectural Motto */}
      <div className="bg-navy-900 border border-navy-700 text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold mb-1">
            End-to-End Orchestration Architecture
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Sirach decides. Luminix makes sure it decides on the right facts.
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl mt-1">
            Six functional stages take raw operational signals and turn them into trusted, contextualized facts. Closed-loop outcome recording enriches the knowledge graph with every operational decision.
          </p>
        </div>

        <button
          onClick={() => openGuidedDemo(0)}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-950 font-bold text-xs rounded-xl shadow flex items-center gap-2 shrink-0 transition"
        >
          <Sparkles className="w-4 h-4 text-navy-950" />
          <span>Launch 10-Step Guided Demo</span>
        </button>
      </div>

      {/* Worked Example Scenarios from PDF (Figure 3, 8 & 9) */}
      <div className="bg-white p-3.5 rounded-2xl border border-surface-border shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>Select Architecture Worked Example (From PDF):</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">Updates live stream, hierarchy, and decision scope</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <button
            onClick={() => handleScenarioChange('p104')}
            className={`p-3 rounded-xl border text-left transition ${
              activeScenario === 'p104'
                ? 'bg-primary-light/50 border-primary ring-2 ring-primary/20 shadow-2xs font-bold'
                : 'bg-slate-50 border-surface-border hover:bg-slate-100 text-navy-900'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-navy-900">Figure 3: Riverside Plant</span>
              <span className="text-[10px] font-mono text-rose-600 font-bold">P-104 Bearing</span>
            </div>
            <div className="text-[11px] text-slate-500 font-normal mt-0.5">
              TT-104A rises 17°C in 36h. Order #4471 ($1.2M) at risk. Night shift overhaul recommended.
            </div>
          </button>

          <button
            onClick={() => handleScenarioChange('water')}
            className={`p-3 rounded-xl border text-left transition ${
              activeScenario === 'water'
                ? 'bg-primary-light/50 border-primary ring-2 ring-primary/20 shadow-2xs font-bold'
                : 'bg-slate-50 border-surface-border hover:bg-slate-100 text-navy-900'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-navy-900">Figure 8: Water Utility</span>
              <span className="text-[10px] font-mono text-amber-600 font-bold">Station 7 RTU</span>
            </div>
            <div className="text-[11px] text-slate-500 font-normal mt-0.5">
              Cellular link stale 42s; pressure drops & current rises. Divert to Standby Pump 702.
            </div>
          </button>

          <button
            onClick={() => handleScenarioChange('sorter')}
            className={`p-3 rounded-xl border text-left transition ${
              activeScenario === 'sorter'
                ? 'bg-primary-light/50 border-primary ring-2 ring-primary/20 shadow-2xs font-bold'
                : 'bg-slate-50 border-surface-border hover:bg-slate-100 text-navy-900'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-navy-900">Figure 9: Sorting Center</span>
              <span className="text-[10px] font-mono text-teal-dark font-bold">Sorter 3 Induct</span>
            </div>
            <div className="text-[11px] text-slate-500 font-normal mt-0.5">
              PLC optical defect triggers mis-sorts. Reroute wave to Sorter 2 & clean photo-eye lens.
            </div>
          </button>
        </div>
      </div>

      {/* 6 Stage Interactive Navigation Bar */}
      <div className="bg-white p-3 rounded-2xl border border-surface-border shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`flex flex-col p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'border-primary bg-primary-light/40 shadow-sm ring-2 ring-primary/20'
                    : 'border-surface-border bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {/* Step pill */}
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  {stage.name}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {stage.tagline}
                </div>

                {/* Modules involved */}
                <div className="flex items-center gap-1 mt-2 flex-wrap">
                  {stage.modules.map((m, i) => (
                    <span key={i} className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1 py-0.2 rounded">
                      {m}
                    </span>
                  ))}
                </div>

                {/* Direction indicator arrow */}
                {idx < stages.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Closed-loop feedback indicator */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal"></span>
            <span className="font-medium text-navy-900">↺ Closed-Loop Feedback:</span>
            <span>Outcomes (decision, approver, result) enrich context & are written back into the knowledge graph.</span>
          </div>
          <button
            onClick={() => navigate('/outcomes')}
            className="text-primary hover:underline font-medium text-xs flex items-center gap-1"
          >
            <span>View Recorded Outcomes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stage Detail Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-navy-900 text-amber-400 px-2.5 py-0.5 rounded">
                STAGE {currentStageMeta.step}
              </span>
              <h3 className="text-xl font-bold text-navy-900 tracking-tight">
                {currentStageMeta.name} — {currentStageMeta.tagline}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Responsible Modules: {currentStageMeta.modules.join(', ')} · Never issues write commands to control equipment
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeStage === 'connect' && (
              <button
                onClick={simulateIncomingData}
                className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Simulate Incoming Data</span>
              </button>
            )}

            {/* Advance to next stage button */}
            {activeStage !== 'decide' ? (
              <button
                onClick={() => {
                  const nextIdx = stages.findIndex(s => s.id === activeStage) + 1;
                  setActiveStage(stages[nextIdx].id);
                }}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                <span>Next: {stages[stages.findIndex(s => s.id === activeStage) + 1]?.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveStage('connect')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                <span>Cycle to Stage 01 (CONNECT)</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Stage Content Sub-View */}
        <div className="pt-6">
          {/* ========================================================= */}
          {/* STAGE 1: CONNECT */}
          {/* ========================================================= */}
          {activeStage === 'connect' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Connectors List */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Ingested OT / IT Connectors ({dataSources.length})
                  </div>
                  <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                    {dataSources.map(src => {
                      const isSelected = src.id === selectedSourceId;
                      return (
                        <div
                          key={src.id}
                          onClick={() => setSelectedSourceId(src.id)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                            isSelected
                              ? 'bg-primary-light border-primary/50 shadow-2xs'
                              : 'bg-white border-surface-border hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-navy-900">{src.name}</span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase ${
                              src.status === 'connected' ? 'bg-teal-100 text-teal-800' :
                              src.status === 'degraded' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                              'bg-rose-100 text-rose-800'
                            }`}>
                              {src.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                            <span>{src.protocol} · {src.site}</span>
                            <span className="font-mono">{src.latencyMs}ms</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Source Detailed Inspector */}
                <div className="md:col-span-2 bg-slate-50 rounded-xl p-5 border border-surface-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">{activeDataSource.name}</h4>
                      <p className="text-xs text-slate-500">{activeDataSource.category} · Protocol: {activeDataSource.protocol}</p>
                    </div>
                    <TrustScoreBadge score={activeDataSource.trustRating} />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                      <div className="text-[11px] text-slate-500">Poll Latency</div>
                      <div className="text-lg font-bold font-mono text-navy-900">{activeDataSource.latencyMs} ms</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                      <div className="text-[11px] text-slate-500">Data Gaps (24h)</div>
                      <div className="text-lg font-bold font-mono text-amber-600">{activeDataSource.dataGaps}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                      <div className="text-[11px] text-slate-500">Received Tags</div>
                      <div className="text-lg font-bold font-mono text-primary">{activeDataSource.receivedTagsCount.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Sample Raw Stream Ingestion Packet */}
                  <div>
                    <div className="text-xs font-bold text-slate-500 mb-1 flex items-center justify-between">
                      <span>Live Ingested Telemetry Packet (Read-Only)</span>
                      <span className="text-[10px] text-slate-400 font-mono">Last poll: {activeDataSource.lastPoll}</span>
                    </div>
                    <pre className="p-3 bg-navy-950 text-emerald-400 rounded-lg font-mono text-xs overflow-x-auto border border-navy-800">
                      {JSON.stringify(activeDataSource.sampleRecord, null, 2)}
                    </pre>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong>Trust Quality Engine (LX-04):</strong> Evaluates noise, flatlines, telemetry dropouts, and physical range limits. If data gaps or stale readings persist, data points are flagged and held out of AI decisions until recovery.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STAGE 2: MODEL */}
          {/* ========================================================= */}
          {activeStage === 'model' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Interactive ISA-95 Hierarchy Tree */}
                <div className="bg-slate-50 p-4 rounded-xl border border-surface-border">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    ISA-95 Plant Hierarchy (LX-02)
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    {/* Site Level */}
                    <div>
                      <div
                        onClick={() => toggleNode('riv')}
                        className="flex items-center gap-1.5 p-1.5 rounded hover:bg-slate-200 cursor-pointer font-bold text-navy-900"
                      >
                        {expandedNodes['riv'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        <span>🏭 Riverside Plant (Site)</span>
                      </div>

                      {expandedNodes['riv'] && (
                        <div className="pl-4 space-y-1.5 mt-1 border-l border-slate-300 ml-2">
                          {/* Area Level */}
                          <div
                            onClick={() => toggleNode('area-b')}
                            className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-200 cursor-pointer font-semibold text-slate-800"
                          >
                            {expandedNodes['area-b'] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            <span>📦 Area B (Packaging & Fill)</span>
                          </div>

                          {expandedNodes['area-b'] && (
                            <div className="pl-4 space-y-1 border-l border-slate-300 ml-2">
                              {/* Line Level */}
                              <div
                                onClick={() => toggleNode('line-2')}
                                className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-200 cursor-pointer font-medium text-slate-700"
                              >
                                {expandedNodes['line-2'] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                <span>⚡ Line 2 (Bottling)</span>
                              </div>

                              {expandedNodes['line-2'] && (
                                <div className="pl-4 space-y-1 border-l border-slate-300 ml-2">
                                  {/* Asset Level: P-104 */}
                                  <div
                                    onClick={() => setSelectedHierarchyId('P-104')}
                                    className={`p-1.5 rounded cursor-pointer flex items-center justify-between ${
                                      selectedHierarchyId === 'P-104'
                                        ? 'bg-primary text-white font-bold'
                                        : 'hover:bg-slate-200 text-navy-900'
                                    }`}
                                  >
                                    <span>⚙️ Pump P-104 (Slurry)</span>
                                    <span className="text-[10px] bg-rose-500 text-white px-1 rounded">68%</span>
                                  </div>

                                  {/* Asset Level: P-105 */}
                                  <div
                                    onClick={() => setSelectedHierarchyId('P-105')}
                                    className={`p-1.5 rounded cursor-pointer flex items-center justify-between ${
                                      selectedHierarchyId === 'P-105'
                                        ? 'bg-primary text-white font-bold'
                                        : 'hover:bg-slate-200 text-navy-900'
                                    }`}
                                  >
                                    <span>⚙️ Pump P-105 (Booster)</span>
                                    <span className="text-[10px] bg-teal text-white px-1 rounded">94%</span>
                                  </div>

                                  {/* Asset Level: C-202 */}
                                  <div
                                    onClick={() => setSelectedHierarchyId('C-202')}
                                    className={`p-1.5 rounded cursor-pointer flex items-center justify-between ${
                                      selectedHierarchyId === 'C-202'
                                        ? 'bg-primary text-white font-bold'
                                        : 'hover:bg-slate-200 text-navy-900'
                                    }`}
                                  >
                                    <span>⚙️ Conveyor C-202</span>
                                    <span className="text-[10px] bg-teal text-white px-1 rounded">88%</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Water Station 7 Site */}
                    <div>
                      <div
                        onClick={() => toggleNode('water-site')}
                        className="flex items-center gap-1.5 p-1.5 rounded hover:bg-slate-200 cursor-pointer font-bold text-navy-900"
                      >
                        {expandedNodes['water-site'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        <span>💧 Water Utility Station 7</span>
                      </div>
                      {expandedNodes['water-site'] && (
                        <div className="pl-4 space-y-1 mt-1 border-l border-slate-300 ml-2">
                          <div
                            onClick={() => setSelectedHierarchyId('W-PUMP-701')}
                            className={`p-1.5 rounded cursor-pointer flex items-center justify-between ${
                              selectedHierarchyId === 'W-PUMP-701'
                                ? 'bg-primary text-white font-bold'
                                : 'hover:bg-slate-200 text-navy-900'
                            }`}
                          >
                            <span>⚙️ Pump 701 (High-Lift)</span>
                            <span className="text-[10px] bg-amber-500 text-white px-1 rounded">71%</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fulfillment Center Site 3 */}
                    <div>
                      <div
                        onClick={() => toggleNode('fulf-site')}
                        className="flex items-center gap-1.5 p-1.5 rounded hover:bg-slate-200 cursor-pointer font-bold text-navy-900"
                      >
                        {expandedNodes['fulf-site'] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        <span>📦 Fulfillment Center Site 3</span>
                      </div>
                      {expandedNodes['fulf-site'] && (
                        <div className="pl-4 space-y-1 mt-1 border-l border-slate-300 ml-2">
                          <div
                            onClick={() => setSelectedHierarchyId('SRT-301')}
                            className={`p-1.5 rounded cursor-pointer flex items-center justify-between ${
                              selectedHierarchyId === 'SRT-301'
                                ? 'bg-primary text-white font-bold'
                                : 'hover:bg-slate-200 text-navy-900'
                            }`}
                          >
                            <span>⚙️ Sorter 301 (Cross-Belt)</span>
                            <span className="text-[10px] bg-amber-500 text-white px-1 rounded">79%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selected Asset Context Dossier */}
                <div className="md:col-span-2 bg-white rounded-xl p-5 border border-surface-border space-y-4">
                  {(() => {
                    const asset = assets.find(a => a.id === selectedHierarchyId) || assets[0];
                    return (
                      <>
                        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-navy-900">{asset.name}</h4>
                              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                {asset.code}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {asset.siteId.toUpperCase()} → {asset.area} → {asset.line}
                            </p>
                          </div>
                          <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                            asset.healthScore < 70 ? 'bg-rose-100 text-rose-800' :
                            asset.healthScore < 85 ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                          }`}>
                            Health: {asset.healthScore}%
                          </span>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                            <span className="text-slate-400 block text-[10px]">Criticality Tier</span>
                            <span className="font-semibold text-navy-900">{asset.criticality}</span>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                            <span className="text-slate-400 block text-[10px]">Equipment Owner</span>
                            <span className="font-semibold text-navy-900">{asset.owner}</span>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                            <span className="text-slate-400 block text-[10px]">Open Work Order</span>
                            <span className="font-semibold text-primary font-mono">{asset.openWorkOrderId || 'None'}</span>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 sm:col-span-2">
                            <span className="text-slate-400 block text-[10px]">Operating Limits</span>
                            <span className="font-medium text-slate-700">{asset.limits}</span>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                            <span className="text-slate-400 block text-[10px]">Exposure at Risk</span>
                            <span className="font-semibold text-rose-600 truncate block">{asset.orderAtRisk || 'None'}</span>
                          </div>
                        </div>

                        {/* Connected Sensors Table */}
                        <div>
                          <div className="text-xs font-bold text-navy-900 mb-2">
                            Modeled Sensors & Live Readings ({asset.sensors.length})
                          </div>
                          <div className="divide-y divide-surface-border border border-surface-border rounded-lg overflow-hidden text-xs">
                            {asset.sensors.map(sen => (
                              <div key={sen.id} className="p-2.5 flex items-center justify-between bg-white hover:bg-slate-50 transition">
                                <div>
                                  <div className="font-mono font-bold text-navy-900">{sen.tag}</div>
                                  <div className="text-[11px] text-slate-500">{sen.name}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-mono font-bold text-navy-900">
                                    {sen.currentValue} {sen.unit}
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    Limit: {sen.criticalLimit} {sen.unit} · Trust: {(sen.trustScore * 100).toFixed(0)}%
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STAGE 3: DETECT */}
          {/* ========================================================= */}
          {activeStage === 'detect' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Anomaly Event Feed */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Active Operational Events ({events.length})
                  </div>
                  <div className="space-y-2">
                    {events.map(evt => {
                      const isSelected = evt.id === selectedEventId;
                      return (
                        <div
                          key={evt.id}
                          onClick={() => setSelectedEventId(evt.id)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                            isSelected
                              ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300 shadow-2xs'
                              : 'bg-white border-surface-border hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <SeverityBadge severity={evt.severity} />
                            <span className="text-[10px] font-mono text-slate-400">{evt.id}</span>
                          </div>
                          <div className="text-xs font-bold text-navy-900 leading-snug">{evt.name}</div>
                          <div className="text-[11px] text-slate-500 mt-1">
                            {evt.assetName} · {evt.siteName}
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-mono mt-2 pt-1 border-t border-slate-100">
                            <span className="text-rose-600 font-semibold">{evt.daysToLimit} days to limit</span>
                            <TrustScoreBadge score={evt.trustScore} showLabel={false} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Event Dossier & Investigation Drawer */}
                <div className="md:col-span-2 bg-white rounded-xl p-5 border border-surface-border space-y-4">
                  <div className="flex items-start justify-between pb-3 border-b border-surface-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <SeverityBadge severity={activeEvent.severity} />
                        <h4 className="text-base font-bold text-navy-900">{activeEvent.name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 font-mono">
                        Event ID: {activeEvent.id} · Timestamp: {activeEvent.timestamp} · Owner: {activeEvent.assignedOwner}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => acknowledgeEvent(activeEvent.id)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition"
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={() => navigate('/root-cause')}
                        className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
                      >
                        <span>Investigate Root Cause</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                    <strong>Event Anomaly Diagnostic:</strong> {activeEvent.description}
                  </div>

                  {/* Root cause preliminary summary */}
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                    <strong>Root Cause Context Assembly (LX-07):</strong> {activeEvent.rootCauseSummary}
                  </div>

                  {/* Orders at Risk */}
                  <div>
                    <div className="text-xs font-bold text-navy-900 mb-2">Commercial Exposure at Risk</div>
                    <div className="space-y-2">
                      {activeEvent.ordersAtRisk.map((ord, idx) => (
                        <div key={idx} className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-navy-900">{ord.customer}</span>
                            <span className="font-mono text-slate-500 ml-2">({ord.id})</span>
                            <div className="text-[11px] text-slate-500">Shipping Deadline: {ord.deadline}</div>
                          </div>
                          <span className="font-bold text-rose-700 font-mono text-sm">{ord.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STAGE 4: MEASURE */}
          {/* ========================================================= */}
          {activeStage === 'measure' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">OEE (Line 2)</div>
                  <div className="text-2xl font-bold font-mono text-navy-900 mt-1">78.2%</div>
                  <div className="text-[11px] text-rose-600 font-medium mt-1">▼ -6.8% below 85% target</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">MTBF (Line 2)</div>
                  <div className="text-2xl font-bold font-mono text-amber-700 mt-1">42.5 h</div>
                  <div className="text-[11px] text-rose-600 font-medium mt-1">▼ -14% degradation</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Unplanned Stops</div>
                  <div className="text-2xl font-bold font-mono text-rose-600 mt-1">4.2 h</div>
                  <div className="text-[11px] text-slate-500 mt-1">This rolling 30-day window</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Energy Intensity</div>
                  <div className="text-2xl font-bold font-mono text-navy-900 mt-1">19.8 kWh</div>
                  <div className="text-[11px] text-amber-600 font-medium mt-1">▲ +1.3 kWh due to friction</div>
                </div>
              </div>

              {/* Cross-Site Benchmarking Panel */}
              <div className="bg-white p-5 rounded-xl border border-surface-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-navy-900">Cross-Site Benchmarking (LX-10)</h4>
                    <p className="text-xs text-slate-500">Normalized performance comparison across plants and bottling lines</p>
                  </div>
                  <button
                    onClick={() => navigate('/kpis')}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Open KPI Layer
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span>Riverside Plant — Line 1 (Best in Class)</span>
                      <span className="font-mono text-teal-dark font-bold">86.4% OEE</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-teal h-full rounded-full" style={{ width: '86.4%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span>Riverside Plant — Line 2 (Current Incident)</span>
                      <span className="font-mono text-amber-700 font-bold">78.2% OEE (Gap: -8.2%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '78.2%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span>Water Station 7 — High Service Line</span>
                      <span className="font-mono text-slate-700 font-bold">82.1% OEE</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '82.1%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STAGE 5: SERVE */}
          {/* ========================================================= */}
          {activeStage === 'serve' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                      GET
                    </span>
                    <span className="font-mono text-xs text-white">
                      /context/assets/{selectedApiAssetId}?caller={selectedApiCaller}&user={selectedApiRole}
                    </span>
                  </div>

                  <button
                    onClick={handleRunApiQuery}
                    disabled={isQuerying}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 self-start sm:self-auto transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isQuerying ? 'Executing Query...' : 'Run Context Query'}</span>
                  </button>
                </div>

                {/* Query Parameter Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Target Asset:</label>
                    <select
                      value={selectedApiAssetId}
                      onChange={e => setSelectedApiAssetId(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 focus:outline-none"
                    >
                      <option value="P-104">Pump P-104 (Slurry)</option>
                      <option value="P-105">Pump P-105 (Booster)</option>
                      <option value="C-202">Conveyor C-202</option>
                      <option value="W-PUMP-701">Station 7 Pump 701</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Consuming Application:</label>
                    <select
                      value={selectedApiCaller}
                      onChange={e => setSelectedApiCaller(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 focus:outline-none"
                    >
                      <option value="sirach">Sirach AI (Decisions)</option>
                      <option value="nikolai">Nikolai (Chat & Voice)</option>
                      <option value="saigen">SAIGEN (ERP AI)</option>
                      <option value="trestara">Trestara (EAM / CMMS)</option>
                      <option value="thorium">Thorium (EHS / Risk)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Caller RBAC Role:</label>
                    <select
                      value={selectedApiRole}
                      onChange={e => setSelectedApiRole(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded p-1.5 focus:outline-none"
                    >
                      <option value="coo">COO / Executive</option>
                      <option value="plant_mgr">Plant Operations Manager</option>
                      <option value="reliability_lead">Reliability Engineer</option>
                      <option value="shift_tech">Shift Technician</option>
                    </select>
                  </div>
                </div>

                {/* API Response Display */}
                <div>
                  <div className="text-xs font-mono text-slate-400 mb-1 flex items-center justify-between">
                    <span>Response Payload (JSON with Citations & Trust)</span>
                    {apiResponse && (
                      <span className="text-emerald-400">200 OK · {apiResponse.permission_check}</span>
                    )}
                  </div>
                  <pre className="p-4 bg-navy-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto border border-navy-800 max-h-72">
                    {JSON.stringify(
                      apiResponse || {
                        status: 200,
                        permission_check: 'COO role granted for sirach',
                        audit_id: 'a-77812',
                        asset: 'Pump P-104',
                        line: 'Riverside / Line 2',
                        health: 'degrading',
                        days_to_limit: 2,
                        order_at_risk: '#4471',
                        open_wo: 'WO-3381',
                        trust: 0.98,
                        citations: ['historian:TT-104A', 'trestara:WO-3381', 'veloris:SO-4471']
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STAGE 6: DECIDE */}
          {/* ========================================================= */}
          {activeStage === 'decide' && (
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-navy-900 to-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    DEMO AI OUTPUT · SIRACH REASONING
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">
                    Event: {activeDecision.eventName} ({activeDecision.eventId})
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Exposure: {activeDecision.businessExposure}
                  </p>
                </div>

                <button
                  onClick={() => navigate('/decisions')}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm transition"
                >
                  Full Decision Dossier
                </button>
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeDecision.options.map(opt => (
                  <div
                    key={opt.id}
                    className={`p-4 rounded-xl border transition ${
                      opt.recommended
                        ? 'bg-primary-light/40 border-primary ring-2 ring-primary/20 shadow-sm'
                        : 'bg-white border-surface-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          opt.recommended ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="text-xs font-bold text-navy-900">{opt.title}</span>
                      </div>
                      {opt.recommended && (
                        <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-mono">
                          ★ RECOMMENDED ({opt.confidenceScore * 100}%)
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {opt.description}
                    </p>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1 text-xs font-mono mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Cost:</span>
                        <span className="font-semibold text-navy-900">{opt.estimatedCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Risk:</span>
                        <span className={`font-semibold ${
                          opt.riskRating === 'High' ? 'text-rose-600' :
                          opt.riskRating === 'Medium' ? 'text-amber-600' : 'text-teal'
                        }`}>{opt.riskRating}</span>
                      </div>
                    </div>

                    {opt.recommended && (
                      <button
                        onClick={() => approveRequest(matchingRequestId)}
                        className="w-full py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Sign Off & Approve Action</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
