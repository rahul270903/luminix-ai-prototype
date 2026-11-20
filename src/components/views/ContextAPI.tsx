import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Code2,
  Play,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  Server,
  FileCheck
} from 'lucide-react';

export const ContextAPI: React.FC = () => {
  const { assets, showToast } = useApp();

  const [assetId, setAssetId] = useState('P-104');
  const [callerApp, setCallerApp] = useState('sirach');
  const [userRole, setUserRole] = useState('coo');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [response, setResponse] = useState<any>({
    status: 200,
    permission_check: 'COO role granted for sirach',
    audit_id: 'a-77812',
    timestamp: '2026-11-20T14:35:12.842Z',
    latency_ms: 64,
    asset: 'Centrifugal Slurry Pump P-104',
    asset_code: 'RIV-A2-L2-P104',
    line: 'Riverside / Line 2 (Bottling)',
    health: 'degrading',
    health_score: 68,
    days_to_limit: 2,
    order_at_risk: '#4471 ($1.2M Apex Beverage Brands)',
    open_wo: 'WO-3381',
    overall_trust: 0.98,
    telemetry: [
      { tag: 'TT-104A', value: 78.4, unit: '°C', status: 'warning', trust: 0.98 },
      { tag: 'VIB-104', value: 4.82, unit: 'mm/s', status: 'warning', trust: 0.96 },
      { tag: 'AMP-104', value: 84.6, unit: 'A', status: 'normal', trust: 0.99 }
    ],
    citations: [
      'historian:TT-104A (OSIsoft PI)',
      'trestara:WO-3381 (CMMS Overhaul)',
      'veloris:SO-4471 (Sales Order)',
      'thorium:PER-HW-8841 (Hot Work Permit)'
    ]
  });

  const handleRunQuery = () => {
    setIsLoading(true);
    setTimeout(() => {
      const asset = assets.find(a => a.id === assetId) || assets[0];
      setResponse({
        status: 200,
        permission_check: `${userRole.toUpperCase()} role verified for application '${callerApp}'`,
        audit_id: `a-${Math.floor(70000 + Math.random() * 9999)}`,
        timestamp: new Date().toISOString(),
        latency_ms: Math.floor(45 + Math.random() * 30),
        asset: asset.name,
        asset_code: asset.code,
        line: `${asset.siteId.toUpperCase()} / ${asset.line}`,
        health: asset.healthStatus,
        health_score: asset.healthScore,
        days_to_limit: asset.id === 'P-104' ? 2 : 45,
        order_at_risk: asset.orderAtRisk || 'None',
        open_wo: asset.openWorkOrderId || 'None',
        overall_trust: 0.98,
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
      });
      setIsLoading(false);
      showToast('Context API query executed with verified cryptographic citations', 'success');
    }, 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('JSON payload copied to clipboard', 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">
              Retrieval Gateway (LX-09)
            </span>
            <span className="text-xs text-slate-500">· RBAC & Verifiable Citations</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Luminix Context API Explorer
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            The enterprise AI retrieval layer. Sirach, Nikolai, SAIGEN, Trestara, and Thorium consume one governed set of facts with cryptographic citations and audit trails.
          </p>
        </div>
      </div>

      {/* Interactive Query Builder & Response Console */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 p-6 shadow-sm space-y-6">
        {/* Request Endpoint Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto">
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              GET
            </span>
            <span className="text-white">
              https://api.luminix.ai/v1/context/assets/{assetId}?caller={callerApp}&user={userRole}
            </span>
          </div>

          <button
            onClick={handleRunQuery}
            disabled={isLoading}
            className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isLoading ? 'Fetching Context...' : 'Run Context Query'}</span>
          </button>
        </div>

        {/* Query Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="text-slate-400 block mb-1 font-sans">Target Asset:</label>
            <select
              value={assetId}
              onChange={e => setAssetId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 focus:outline-none"
            >
              {assets.map(a => (
                <option key={a.id} value={a.id}>{a.name} ({a.id})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-sans">Consuming Application (Caller):</label>
            <select
              value={callerApp}
              onChange={e => setCallerApp(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 focus:outline-none"
            >
              <option value="sirach">Sirach AI (Decisions)</option>
              <option value="nikolai">Nikolai (Chat & Voice)</option>
              <option value="saigen">SAIGEN (ERP AI)</option>
              <option value="trestara">Trestara (EAM / CMMS)</option>
              <option value="thorium">Thorium (EHS / Risk)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-sans">User Authorization Role:</label>
            <select
              value={userRole}
              onChange={e => setUserRole(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 focus:outline-none"
            >
              <option value="coo">COO / Executive</option>
              <option value="plant_mgr">Plant Operations Manager</option>
              <option value="reliability_lead">Reliability Engineer</option>
              <option value="shift_tech">Shift Technician</option>
            </select>
          </div>
        </div>

        {/* Response JSON Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">200 OK</span>
              <span>· {response.latency_ms} ms</span>
              <span>· Audit ID: {response.audit_id}</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre className="p-4 bg-navy-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto border border-navy-800 max-h-96">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>

        {/* Security & Lineage Footnote */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-teal">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ABAC Verification: {response.permission_check}</span>
          </span>
          <span>100% of Served Facts Citing Historical Sources</span>
        </div>
      </div>
    </div>
  );
};
