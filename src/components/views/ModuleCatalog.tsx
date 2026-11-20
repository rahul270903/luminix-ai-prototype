import React, { useState } from 'react';
import { MODULES } from '../../data/modulesData';
import { ModuleInfo, StageId } from '../../types';
import {
  Layers,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Database,
  Cpu,
  AlertTriangle,
  BarChart3,
  Code2,
  BrainCircuit,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const ModuleCatalog: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModule, setActiveModule] = useState<ModuleInfo | null>(null);

  const filteredModules = MODULES.filter(m => {
    const matchesStage = selectedStage === 'all' || m.stage === selectedStage;
    const matchesQuery =
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesQuery;
  });

  const getStageColor = (stage: StageId) => {
    switch (stage) {
      case 'connect': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'model': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'detect': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'measure': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'serve': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'decide': return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-primary-light text-primary font-bold px-2 py-0.5 rounded">
              Platform Specifications
            </span>
            <span className="text-xs text-slate-500">· 10 Core Modules + 4 SCADA Connectors</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Luminix Module Catalog (LX-01 to LX-10 & LX-S1 to LX-S4)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Architectural definition, ingestion requirements, primary personas, and phase assignments.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-1 focus:ring-primary w-48"
            />
          </div>

          <select
            value={selectedStage}
            onChange={e => setSelectedStage(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none"
          >
            <option value="all">All Functional Stages</option>
            <option value="connect">Stage 01: CONNECT</option>
            <option value="model">Stage 02: MODEL</option>
            <option value="detect">Stage 03: DETECT</option>
            <option value="measure">Stage 04: MEASURE</option>
            <option value="serve">Stage 05: SERVE</option>
          </select>
        </div>
      </div>

      {/* Grid of Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map(mod => (
          <div
            key={mod.id}
            onClick={() => setActiveModule(mod)}
            className="bg-white rounded-xl border border-surface-border p-4 shadow-2xs hover:border-primary/50 hover:shadow-sm cursor-pointer transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs bg-navy-900 text-amber-400 px-2 py-0.5 rounded">
                  {mod.id}
                </span>
                <div className="flex items-center gap-1.5">
                  {mod.isScadaExpansion && (
                    <span className="text-[10px] font-mono font-semibold bg-teal-50 text-teal-dark border border-teal-200 px-1.5 py-0.2 rounded">
                      SCADA
                    </span>
                  )}
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStageColor(mod.stage)}`}>
                    {mod.stage}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-navy-900 group-hover:text-primary transition">
                {mod.name}
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {mod.shortDescription}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-mono">{mod.phase}</span>
              <span className="text-primary font-medium flex items-center gap-1 group-hover:underline">
                <span>Inspect Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Module Detail Modal */}
      {activeModule && (
        <Modal
          isOpen={!!activeModule}
          onClose={() => setActiveModule(null)}
          title={`${activeModule.id} — ${activeModule.name}`}
          subtitle={`Functional Stage: ${activeModule.stage.toUpperCase()} · ${activeModule.phase}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5 text-xs text-slate-700">
            <div>
              <h5 className="font-bold text-navy-900 mb-1 text-sm">Detailed Architecture & Function</h5>
              <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700">
                {activeModule.detailedDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">Primary Persona</span>
                <span className="text-navy-900 font-bold text-xs">{activeModule.primaryUser}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">Operational Status</span>
                <span className="text-teal font-bold text-xs capitalize flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeModule.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-bold text-navy-900 mb-2">Ingestion Inputs</h5>
                <ul className="space-y-1.5 bg-white p-3 border border-slate-200 rounded-lg font-mono text-[11px]">
                  {activeModule.inputs.map((inp, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary font-bold">→</span>
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-navy-900 mb-2">Governed Outputs</h5>
                <ul className="space-y-1.5 bg-white p-3 border border-slate-200 rounded-lg font-mono text-[11px]">
                  {activeModule.outputs.map((out, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-teal font-bold">✓</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-navy-900 mb-1">Live Module Telemetry & Statistics</h5>
              <pre className="p-3 bg-navy-950 text-emerald-400 rounded-lg font-mono text-xs overflow-x-auto border border-navy-800">
                {JSON.stringify(activeModule.exampleData, null, 2)}
              </pre>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
