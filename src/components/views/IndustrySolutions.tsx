import React from 'react';
import { INDUSTRY_SOLUTIONS } from '../../data/industryData';
import { useApp } from '../../context/AppContext';
import {
  Factory,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const IndustrySolutions: React.FC = () => {
  const { activeIndustryId, setActiveIndustryId, showToast } = useApp();

  const activeIndustry =
    INDUSTRY_SOLUTIONS.find(i => i.id === activeIndustryId) || INDUSTRY_SOLUTIONS[0];

  const handleSelectIndustry = (id: string) => {
    setActiveIndustryId(id);
    const ind = INDUSTRY_SOLUTIONS.find(i => i.id === id);
    showToast(`Switched active operational profile to: ${ind?.name}`, 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-primary-light text-primary font-bold px-2 py-0.5 rounded">
              SCADA Expansion Verticals (Section 10)
            </span>
            <span className="text-xs text-slate-500">· 8 SCADA-Heavy Target Industries</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Industrial Solutions & Vertical Architectures
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an industry below to adapt Luminix module bindings, governed KPIs, and Sirach decision playbooks to that operational domain.
          </p>
        </div>
      </div>

      {/* 8 Industry Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {INDUSTRY_SOLUTIONS.map(ind => {
          const isSelected = ind.id === activeIndustryId;
          return (
            <button
              key={ind.id}
              onClick={() => handleSelectIndustry(ind.id)}
              className={`p-3.5 rounded-xl border text-left transition relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/20'
                  : 'bg-white border-surface-border hover:bg-slate-50 text-navy-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Factory className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
                <h4 className="font-bold text-xs leading-snug">{ind.name}</h4>
                <p className={`text-[10px] line-clamp-1 mt-1 ${isSelected ? 'text-primary-light' : 'text-slate-500'}`}>
                  {ind.tagline}
                </p>
              </div>

              <div className={`mt-3 pt-2 border-t text-[10px] font-mono flex items-center justify-between ${
                isSelected ? 'border-primary-hover text-primary-light' : 'border-slate-100 text-slate-400'
              }`}>
                <span>{ind.keyModules.length} Modules</span>
                <span>Active →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Industry Comprehensive Profile */}
      <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-navy-900 text-amber-400 font-bold">
                VERTICAL BLUEPRINT
              </span>
              <h3 className="text-xl font-bold text-navy-900">{activeIndustry.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{activeIndustry.tagline}</p>
          </div>

          <span className="text-xs font-mono bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-lg font-semibold">
            Currently Applied to Simulation
          </span>
        </div>

        {/* Challenge vs Luminix Orchestration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Core Operational SCADA Need
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {activeIndustry.scadaNeed}
            </p>
          </div>

          <div className="p-4 bg-primary-light/50 rounded-xl border border-primary/20 space-y-1.5">
            <span className="text-xs font-bold text-primary-dark uppercase tracking-wider block">
              Luminix Ai Orchestration Architecture
            </span>
            <p className="text-navy-900 leading-relaxed font-medium">
              {activeIndustry.luminixOrchestration}
            </p>
          </div>
        </div>

        {/* Governed KPIs & Bound Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Governed Operational KPIs (LX-06)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {activeIndustry.kpis.map((kpi, i) => (
                <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-navy-900">
                  {kpi}
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Assigned Luminix Modules
            </span>
            <div className="flex flex-wrap gap-2">
              {activeIndustry.keyModules.map((mod, i) => (
                <span key={i} className="px-3 py-1.5 bg-navy-900 text-amber-300 rounded-lg text-xs font-mono font-bold">
                  {mod}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              Dataset profile: {activeIndustry.sampleDatasetNotes}
            </p>
          </div>
        </div>

        {/* Example Events & Sirach Decisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Common Anomaly Events (LX-05)
            </span>
            <ul className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700">
              {activeIndustry.exampleEvents.map((evt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{evt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Sirach Decision Recommendations
            </span>
            <ul className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700">
              {activeIndustry.sirachRecommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <BrainCircuit className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expected Business Value */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Expected Business Value & ROI Metrics
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {activeIndustry.expectedBusinessValue.map((val, i) => (
              <div key={i} className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 flex items-start gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
