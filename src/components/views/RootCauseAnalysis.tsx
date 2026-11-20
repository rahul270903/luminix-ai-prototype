import React, { useState } from 'react';
import { ROOT_CAUSE_TIMELINE_P104 } from '../../data/mockData';
import {
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  FileText,
  Cpu,
  BrainCircuit,
  Database,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Search
} from 'lucide-react';
import { TrustScoreBadge } from '../common/Badge';

export const RootCauseAnalysis: React.FC = () => {
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    4: true,
  });

  const toggleIndex = (idx: number) => {
    setExpandedIndices(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    ROOT_CAUSE_TIMELINE_P104.forEach((_, i) => (all[i] = true));
    setExpandedIndices(all);
  };

  const collapseAll = () => {
    setExpandedIndices({});
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
              Investigation Dossier (LX-07)
            </span>
            <span className="text-xs text-slate-500">· Incident EVT-104 · 6 Independent Sources Correlated</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Root-Cause Context Assembly: Pump P-104 Thermal Anomaly
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated correlation of historian telemetry, vibration spectra, maintenance logs, technician greasing logs, and orders at risk.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition"
          >
            Expand All Timeline Events
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Main Investigation Split: Timeline on Left, AI Inference on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chronological Timeline (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Multi-Source Chronological Timeline (T-36h to Present)</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Time-aligned via LX-01 edge bus</span>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-200 space-y-4 ml-3">
            {ROOT_CAUSE_TIMELINE_P104.map((item, idx) => {
              const isExpanded = !!expandedIndices[idx];
              const isCritical = item.status === 'critical';
              const isWarning = item.status === 'warning';
              const isDecision = item.status === 'decision';

              return (
                <div key={idx} className="relative group">
                  {/* Timeline bullet node */}
                  <span
                    className={`absolute -left-[31px] top-3.5 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                      isCritical ? 'bg-rose-500 ring-4 ring-rose-200' :
                      isWarning ? 'bg-amber-500' :
                      isDecision ? 'bg-primary ring-4 ring-primary-light' : 'bg-slate-400'
                    }`}
                  />

                  {/* Timeline Card */}
                  <div className={`p-4 rounded-xl border transition ${
                    isCritical ? 'bg-rose-50/50 border-rose-200' :
                    isDecision ? 'bg-primary-light/30 border-primary/30' :
                    'bg-white border-surface-border'
                  }`}>
                    <div
                      onClick={() => toggleIndex(idx)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-navy-900">{item.time}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {item.source}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-navy-900 mt-1">{item.title}</h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <TrustScoreBadge score={item.trust} />
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-700 leading-relaxed space-y-2">
                        <p>{item.detail}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                          <span>Evidence Category: {item.category.toUpperCase()}</span>
                          <span className="text-teal font-medium">Source Record Citing Enforced</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Automated Diagnostic Conclusion */}
        <div className="space-y-5">
          {/* Diagnostic Conclusion Box */}
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold text-navy-900">Root-Cause Conclusion</h3>
              </div>
              <span className="font-mono text-xs font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                92.4% CONFIDENCE
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <strong>Primary Physical Cause:</strong> Mechanical fatigue spalling on the drive-end bearing outer raceway (BPFO @ 142 Hz). Greasing performed at T-28h failed to dissipate heat due to compromised cage geometry.
            </div>

            {/* Supporting Causes Evaluated */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Hypotheses Evaluated & Scored
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-lg">
                  <div className="flex justify-between font-bold text-teal-900">
                    <span>Bearing Cage Spalling</span>
                    <span className="font-mono">92.4% Match</span>
                  </div>
                  <div className="text-[11px] text-teal-800 mt-0.5">Corroborated by 142 Hz vibration peak and current draw.</div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg opacity-75">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Lubrication Starvation</span>
                    <span className="font-mono">34.1% Match</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Ruled out: 40g grease injected at T-28h; heat continued climbing.</div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg opacity-60">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Hydraulic Cavitation</span>
                    <span className="font-mono">11.8% Match</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Suction head pressure (PT-104) steady at 6.2 bar.</div>
                </div>
              </div>
            </div>

            {/* Immediate Investigation Recommendation */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-amber-900 block">Recommended Verification Action:</span>
              <p className="text-amber-800 leading-snug">
                Perform visual borescopic inspection of drive-end bearing seals during 02:00 sanitation break. Pre-stage laser alignment kit in Bay 4.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
