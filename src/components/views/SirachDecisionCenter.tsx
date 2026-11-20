import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SirachOption } from '../../types';
import {
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Cpu,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  Send
} from 'lucide-react';
import { SeverityBadge, TrustScoreBadge } from '../common/Badge';

export const SirachDecisionCenter: React.FC = () => {
  const {
    sirachDecisions,
    approveRequest,
    approvalRequests,
    openGuidedDemo
  } = useApp();

  const navigate = useNavigate();
  const [activeDecisionKey, setActiveDecisionKey] = useState<string>('SIR-DEC-104');
  const decision = sirachDecisions[activeDecisionKey] || sirachDecisions['SIR-DEC-104'];
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D'>('C');

  const selectedOption = decision.options.find(o => o.id === selectedOptionId) || decision.options[0];
  const pendingRequest = approvalRequests.find(r => r.decisionId === decision.id);

  const handleDecisionSwitch = (key: string) => {
    setActiveDecisionKey(key);
    const targetDec = sirachDecisions[key];
    const recOpt = targetDec?.options.find(o => o.recommended)?.id || 'A';
    setSelectedOptionId(recOpt as any);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Platform Distinction Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-indigo-950 text-white p-5 rounded-2xl border border-navy-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase bg-amber-500 text-navy-950 font-bold px-2 py-0.5 rounded">
              DECISION ARCHITECTURE
            </span>
            <span className="text-xs text-slate-300">· Seiretsu Ecosystem Roles</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Luminix supplies the facts. Sirach makes the call.
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-0.5 leading-relaxed">
            <strong>Luminix</strong> contextualizes raw signals and serves verifiable, cited evidence. <strong>Sirach AI</strong> reasons over trade-offs, computes financial exposures, ranks operational actions, and seeks human approval.
          </p>
        </div>

        <button
          onClick={() => openGuidedDemo(5)}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-950 font-bold text-xs rounded-xl shadow flex items-center gap-2 shrink-0 transition"
        >
          <Sparkles className="w-4 h-4 text-navy-950" />
          <span>Walkthrough Step 6: Decide</span>
        </button>
      </div>

      {/* Active Decision Target Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'SIR-DEC-104', label: 'Riverside: Pump P-104 Thermal Anomaly (Figure 3)', site: 'Riverside' },
          { key: 'SIR-DEC-W701', label: 'Water Utility: Pump 701 Impeller Wear (Figure 8)', site: 'Austin, TX' },
          { key: 'SIR-DEC-F301', label: 'Fulfillment: Sorter 3 Photo-Eye Mis-Sort (Figure 9)', site: 'Allentown, PA' },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => handleDecisionSwitch(item.key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              activeDecisionKey === item.key
                ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                : 'bg-white text-slate-700 border-surface-border hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Event Context Header */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                INCIDENT {decision.eventId}
              </span>
              <h3 className="text-base font-bold text-navy-900">
                {decision.eventName}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Asset: {decision.assetName} · Line 2 (Bottling) · Riverside Plant
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">Sirach Confidence</span>
              <span className="text-sm font-bold font-mono text-primary">
                {(decision.confidence * 100).toFixed(0)}% Certainty
              </span>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-lg uppercase font-mono">
              Status: {decision.status}
            </span>
          </div>
        </div>

        {/* Luminix Verified Ground Truth */}
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-navy-900">
            <ShieldCheck className="w-4 h-4 text-teal" />
            <span>Luminix Verified Ground Truth Context (Served via Context API)</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-sans">
            {decision.contextSummary}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-200/80">
            <span>Citations: [historian:TT-104A, trestara:WO-3381, veloris:SO-4471]</span>
            <span className="text-rose-600 font-semibold">Business Exposure: {decision.businessExposure}</span>
          </div>
        </div>
      </div>

      {/* 4 Multi-Option Comparison Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-navy-900">
            Sirach Ranked Operational Alternatives (Select to Compare)
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Autonomous Level: Human Approve (L3)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {decision.options.map(opt => {
            const isSelected = opt.id === selectedOptionId;
            return (
              <div
                key={opt.id}
                onClick={() => setSelectedOptionId(opt.id)}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-primary bg-primary-light/40 shadow-sm ring-2 ring-primary/30'
                    : 'border-surface-border bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      opt.recommended ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    {opt.recommended && (
                      <span className="text-[10px] font-bold text-teal bg-teal-50 px-2 py-0.5 rounded font-mono">
                        TOP RANKED
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-navy-900 leading-snug">{opt.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cost:</span>
                    <span className="font-semibold text-navy-900">{opt.estimatedCost.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk:</span>
                    <span className={`font-semibold ${
                      opt.riskRating === 'High' ? 'text-rose-600' :
                      opt.riskRating === 'Medium' ? 'text-amber-600' : 'text-teal'
                    }`}>{opt.riskRating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Option Detailed Reasoning & Evidence */}
      <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                {selectedOption.id}
              </span>
              <h3 className="text-base font-bold text-navy-900">
                Detailed Evaluation: Option {selectedOption.id} — {selectedOption.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Estimated Downtime: {selectedOption.productionImpact}
            </p>
          </div>

          {/* Action Approval Button */}
          {pendingRequest && pendingRequest.status === 'pending' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => approveRequest(pendingRequest.id)}
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Option {selectedOption.id} for Execution</span>
              </button>
              <button
                onClick={() => navigate('/approvals')}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition"
              >
                Go to Approval Inbox
              </button>
            </div>
          ) : (
            <div className="px-4 py-2 bg-teal-50 border border-teal-200 rounded-xl text-teal-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal" />
              <span>Approved & Executed: WO-3381 and PO-9921 Scheduled</span>
            </div>
          )}
        </div>

        {/* Detailed Metrics Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Estimated Cost</span>
            <span className="text-base font-bold text-navy-900">{selectedOption.estimatedCost}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Risk Assessment</span>
            <span className={`text-base font-bold ${
              selectedOption.riskRating === 'High' ? 'text-rose-600' :
              selectedOption.riskRating === 'Medium' ? 'text-amber-600' : 'text-teal'
            }`}>{selectedOption.riskRating}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Execution Timeline</span>
            <span className="text-base font-bold text-navy-900">{selectedOption.timeline}</span>
          </div>
        </div>

        {/* Supporting Evidence Citations */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Sirach Evidentiary Reasoning & Citations
          </h4>
          <ul className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
            {selectedOption.supportingEvidence.map((ev, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <span className="leading-relaxed">{ev}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
