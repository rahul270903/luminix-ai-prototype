import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OutcomeRecord } from '../../types';
import {
  Repeat,
  CheckCircle2,
  Plus,
  Clock,
  DollarSign,
  TrendingUp,
  FileCheck,
  Share2,
  Sparkles,
  ChevronRight,
  User,
  ShieldCheck
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const OutcomeFeedback: React.FC = () => {
  const { outcomes, submitOutcome, assets } = useApp();

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    actionTaken: 'Bearing assembly replacement & laser shaft alignment on Pump P-104',
    assetId: 'P-104',
    assetName: 'Centrifugal Slurry Pump P-104',
    siteName: 'Riverside Plant',
    completionTime: 'Tonight 04:15 EST',
    result: 'Optimal Restored' as const,
    downtimeAvoided: '18 hours unplanned downtime ($340,000)',
    costIncurred: '$17,450',
    approver: 'E. Vance (Plant VP)',
    technician: 'J. Patel (Lead Tech)',
    notes: 'Bearing raceway spalling confirmed. Replaced with SKF-6318. Post-start temperature 52.1°C, vibration 1.4 mm/s.',
    evidence: ['Bearing temp returned from 78.4°C to 52.1°C', 'Vibration dropped from 4.82 mm/s to 1.4 mm/s']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOutcome(formData);
    setIsRecordModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
              Closed-Loop Feedback (Knowledge Graph Enrichment)
            </span>
            <span className="text-xs text-slate-500">· Model Reinforcement</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Outcome Feedback & Continuous Learning
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Record physical results of executed actions. Each outcome is written back into the knowledge graph to calibrate future Sirach recommendations.
          </p>
        </div>

        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 shrink-0 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Operational Outcome</span>
        </button>
      </div>

      {/* Outcome Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs">
          <div className="text-xs text-slate-500">Total Downtime Avoided</div>
          <div className="text-2xl font-bold font-mono text-teal mt-1">38.2 Hours</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across 10 verified outcomes</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs">
          <div className="text-xs text-slate-500">Advice-Acceptance Rate</div>
          <div className="text-2xl font-bold font-mono text-primary mt-1">84.6%</div>
          <div className="text-[11px] text-teal mt-0.5 font-medium">Exceeds Phase 2 gate (≥ 60%)</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs">
          <div className="text-xs text-slate-500">Commercial Value Protected</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">$2,140,000</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Customer orders delivered on-time</div>
        </div>
      </div>

      {/* Outcome History Table / Cards */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Recorded Operational Outcomes ({outcomes.length})
        </div>

        <div className="grid grid-cols-1 gap-4">
          {outcomes.map(out => (
            <div
              key={out.id}
              className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-navy-900 text-teal-300 px-2.5 py-0.5 rounded">
                    {out.id}
                  </span>
                  <h3 className="text-sm font-bold text-navy-900">{out.assetName}</h3>
                  <span className="text-xs text-slate-400 font-mono">· {out.siteName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-mono">
                    ✓ {out.result}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{out.completionTime}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 block uppercase text-[10px]">Action Executed</span>
                <p className="text-xs font-medium text-navy-900 mt-0.5">{out.actionTaken}</p>
                {out.notes && (
                  <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                    {out.notes}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-slate-50/60 p-3 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block text-[10px] font-sans">Downtime Avoided</span>
                  <span className="font-bold text-teal">{out.downtimeAvoided}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-sans">Actual Cost</span>
                  <span className="font-bold text-navy-900">{out.costIncurred}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-sans">Executive Approver</span>
                  <span className="font-medium text-slate-700">{out.approver}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-sans">Lead Technician</span>
                  <span className="font-medium text-slate-700">{out.technician}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Physical Verification Evidence
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {out.evidence.map((ev, i) => (
                    <span key={i} className="px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg border border-teal-200 text-[11px] font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                      <span>{ev}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Outcome Modal */}
      {isRecordModalOpen && (
        <Modal
          isOpen={isRecordModalOpen}
          onClose={() => setIsRecordModalOpen(false)}
          title="Record Operational Outcome (Close the Loop)"
          subtitle="Writes results back to knowledge graph, resolves active event, and restores asset health."
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-navy-900 block mb-1">Target Asset:</label>
              <select
                value={formData.assetId}
                onChange={e => {
                  const asset = assets.find(a => a.id === e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    assetId: e.target.value,
                    assetName: asset?.name || prev.assetName
                  }));
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-navy-900 focus:outline-none"
              >
                {assets.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.id})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-navy-900 block mb-1">Action Taken:</label>
              <input
                type="text"
                value={formData.actionTaken}
                onChange={e => setFormData(prev => ({ ...prev, actionTaken: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-navy-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-navy-900 block mb-1">Operational Result:</label>
                <select
                  value={formData.result}
                  onChange={e => setFormData(prev => ({ ...prev, result: e.target.value as any }))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-navy-900 focus:outline-none"
                >
                  <option value="Optimal Restored">Optimal Restored</option>
                  <option value="Defect Mitigated">Defect Mitigated</option>
                  <option value="Order Protected">Order Protected</option>
                  <option value="Partial Recovery">Partial Recovery</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-navy-900 block mb-1">Actual Incurred Cost:</label>
                <input
                  type="text"
                  value={formData.costIncurred}
                  onChange={e => setFormData(prev => ({ ...prev, costIncurred: e.target.value }))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-navy-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-navy-900 block mb-1">Downtime Avoided:</label>
              <input
                type="text"
                value={formData.downtimeAvoided}
                onChange={e => setFormData(prev => ({ ...prev, downtimeAvoided: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-navy-900 block mb-1">Technician Notes & Verification:</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-navy-900 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRecordModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-sm"
              >
                Submit Outcome & Update Knowledge Graph
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
