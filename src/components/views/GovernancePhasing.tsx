import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AutonomyLevel } from '../../types';
import {
  Shield,
  Layers,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  Calendar,
  AlertTriangle,
  Info,
  ChevronRight,
  Sliders
} from 'lucide-react';
import { AutonomyBadge } from '../common/Badge';

export const GovernancePhasing: React.FC = () => {
  const { autonomyLevel, setAutonomyLevel, showToast } = useApp();
  const [selectedPhase, setSelectedPhase] = useState<number>(2);

  const raciData = [
    { activity: 'Connector onboarding (LX-01, LX-S)', ot: 'R / A', steward: 'C', ops: 'C', exec: 'I', agent: '-' },
    { activity: 'Trust rules & thresholds (LX-04)', ot: 'C', steward: 'R / A', ops: 'C', exec: 'I', agent: '-' },
    { activity: 'Asset model & graph upkeep (LX-02/03)', ot: 'R', steward: 'A', ops: 'C', exec: '-', agent: '-' },
    { activity: 'Event triage & root cause (LX-05/07)', ot: 'I', steward: 'C', ops: 'R / A', exec: 'I', agent: 'C' },
    { activity: 'KPI definitions & normalization (LX-06)', ot: 'C', steward: 'R', ops: 'C', exec: 'A', agent: '-' },
    { activity: 'Operational decision approval (Sirach)', ot: '-', steward: '-', ops: 'C', exec: 'R / A', agent: 'C' },
    { activity: 'Action execution (WO, PO, dispatch)', ot: '-', steward: '-', ops: 'A', exec: 'I', agent: 'R' },
    { activity: 'Outcome review & feedback loop', ot: 'I', steward: 'R', ops: 'R', exec: 'A', agent: 'C' },
  ];

  const phases = [
    {
      phase: 1,
      name: 'Phase 1 · Foundation',
      months: 'Months 0-6',
      modules: 'LX-01 · 02 · 04 · 06 · 09 · SCADA LX-S1/S2',
      autonomy: 'Inform + Advise · 1 Pilot Site',
      gate: 'Gate: ≥ 90% Context Coverage',
      status: 'Completed',
      desc: 'Connect plant signals, model ISA-95 asset hierarchy, establish data trust scoring, and stand up governed Context API.'
    },
    {
      phase: 2,
      name: 'Phase 2 · Decide',
      months: 'Months 6-12',
      modules: 'LX-03 · 05 · 07 · 10 · SCADA LX-S3/S4',
      autonomy: 'Approve Level · Multi-Site Tenancy',
      gate: 'Gate: ≥ 60% Advice Acceptance Rate',
      status: 'Current Operational Phase',
      desc: 'Build industrial knowledge graph, activate multi-source root-cause assembly, cross-site benchmarks, and human approval workflow.'
    },
    {
      phase: 3,
      name: 'Phase 3 · Act',
      months: 'Months 12-24',
      modules: 'LX-08 · Autonomous Playbooks · GovCloud',
      autonomy: 'Pre-Approved Bounded Playbooks',
      gate: 'Continuous Verification & Audit',
      status: 'Planned',
      desc: 'Digital twin real-time data foundation, pre-approved autonomous playbooks within strict financial/safety limits, and GovCloud deployment.'
    }
  ];

  const handleLevelChange = (lvl: AutonomyLevel) => {
    setAutonomyLevel(lvl);
    showToast(`Autonomy governance level changed to: ${lvl.toUpperCase()}`, 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
              Governance & Phasing (Section 7, 11 & 12)
            </span>
            <span className="text-xs text-slate-500">· Deployment Gates & RACI Responsibilities</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Deployment Roadmap, Stage Gates & Governance
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Context first, then decisions, then bounded action. Three phased stage gates protect operational safety and executive authority.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AutonomyBadge level={autonomyLevel} />
        </div>
      </div>

      {/* Autonomy Level Control Console */}
      <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-navy-900">
              Interactive Autonomy Policy Switcher (Section 7)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Selected: <strong className="text-navy-900 capitalize">{autonomyLevel}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {(['inform', 'advise', 'approve', 'autonomous'] as const).map(lvl => {
            const isSelected = autonomyLevel === lvl;
            const labels = {
              inform: { title: 'Level 1: Inform', subtitle: 'Events and context surfaced. Human decides and acts.' },
              advise: { title: 'Level 2: Advise', subtitle: 'Sirach ranks options with cost, risk, and citations. Human chooses.' },
              approve: { title: 'Level 3: Human Approve', subtitle: 'Sirach prepares action (WO, PO, dispatch). Runs only on human sign-off.' },
              autonomous: { title: 'Level 4: Playbooks', subtitle: 'Pre-approved playbooks run within set bounds. Every run is audited.' },
            }[lvl];

            return (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-primary-light/50 border-primary ring-2 ring-primary/30 shadow-sm'
                    : 'bg-slate-50 border-surface-border hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-navy-900 mb-1">{labels.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{labels.subtitle}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] font-mono text-primary font-semibold">
                  {isSelected ? '✓ ACTIVE POLICY' : 'Select Policy →'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Phase Deployment Roadmap & Stage Gates (Section 11) */}
      <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-900">
              Deployment Phasing & Stage Gates (Figure 10 from PDF)
            </h3>
            <p className="text-xs text-slate-500">
              Each phase must pass its verifiable quantitative gate before advancing autonomy or scale.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map(ph => {
            const isSelected = selectedPhase === ph.phase;
            return (
              <div
                key={ph.phase}
                onClick={() => setSelectedPhase(ph.phase)}
                className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-primary bg-primary-light/30 shadow-sm ring-2 ring-primary/20'
                    : 'border-surface-border bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-navy-900">{ph.months}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {ph.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-navy-900">{ph.name}</h4>
                  <div className="text-xs font-mono text-primary font-semibold mt-1">{ph.modules}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ph.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="text-xs font-mono font-bold text-teal-dark bg-teal-50 border border-teal-200 p-2 rounded-lg text-center">
                    {ph.gate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success Metrics Table (Table from Page 16 of PDF) */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Governed Program Success Metrics
          </h4>
          <div className="overflow-x-auto border border-surface-border rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-surface-border">
                <tr>
                  <th className="py-2.5 px-3">Success Metric</th>
                  <th className="py-2.5 px-3">Definition</th>
                  <th className="py-2.5 px-3">Target (Proposed)</th>
                  <th className="py-2.5 px-3">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border font-mono">
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-navy-900 font-sans">Context Coverage</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">Share of critical tags mapped to assets with trust score</td>
                  <td className="py-2.5 px-3 text-primary">≥ 90% before Phase 2</td>
                  <td className="py-2.5 px-3 text-teal font-bold">94.8% (Passed)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-navy-900 font-sans">Trusted Points</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">Share of served points above trust threshold</td>
                  <td className="py-2.5 px-3 text-primary">≥ 90%</td>
                  <td className="py-2.5 px-3 text-teal font-bold">91.2% (Passed)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-navy-900 font-sans">Advice Acceptance</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">Share of Sirach recommendations accepted by approvers</td>
                  <td className="py-2.5 px-3 text-primary">≥ 60% before Phase 3</td>
                  <td className="py-2.5 px-3 text-teal font-bold">84.6% (On Track)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-navy-900 font-sans">Alarm-to-Action Time</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">Time from event raised to approved action</td>
                  <td className="py-2.5 px-3 text-primary">Baseline reduction target</td>
                  <td className="py-2.5 px-3 text-navy-900 font-bold">-48% faster</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-navy-900 font-sans">Business Exposure Avoided</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">Value of orders or service protected by early action</td>
                  <td className="py-2.5 px-3 text-primary">Tracked per decision</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">$2.14M protected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RACI Matrix & Operating Rhythm (Section 7) */}
      <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-bold text-navy-900">
            Roles & Responsibilities RACI Matrix (Page 11 from PDF)
          </h3>
          <p className="text-xs text-slate-500">
            R = Responsible, A = Accountable, C = Consulted, I = Informed
          </p>
        </div>

        <div className="overflow-x-auto border border-surface-border rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-surface-border">
              <tr>
                <th className="py-2.5 px-3">Operational Activity</th>
                <th className="py-2.5 px-3 text-center">OT / IT Eng</th>
                <th className="py-2.5 px-3 text-center">Data Steward</th>
                <th className="py-2.5 px-3 text-center">Operations / Reliability</th>
                <th className="py-2.5 px-3 text-center">Executive</th>
                <th className="py-2.5 px-3 text-center">Sirach Agents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border font-mono">
              {raciData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-medium text-navy-900 font-sans">{row.activity}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-navy-900">{row.ot}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-teal">{row.steward}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-primary">{row.ops}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-amber-700">{row.exec}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-rose-600">{row.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Operating Rhythm Cards */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Governed Operating Rhythm
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-navy-900 block font-mono">Continuous</span>
              <p className="text-slate-600 mt-1">Live context feed, trust monitoring, event raising (LX-04/05).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-navy-900 block font-mono">Per Shift</span>
              <p className="text-slate-600 mt-1">Event review, handover with root-cause timelines (LX-07).</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-navy-900 block font-mono">Weekly</span>
              <p className="text-slate-600 mt-1">KPI review against governed definitions. Advice-acceptance tracking.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-navy-900 block font-mono">Monthly</span>
              <p className="text-slate-600 mt-1">Cross-site benchmark (LX-10), model tuning, playbook review.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
