import React, { useState } from 'react';
import { SEIRETSU_APPS } from '../../data/ecosystemData';
import { SeiretsuApp } from '../../types';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Play,
  CheckCircle2,
  BrainCircuit,
  MessageSquare,
  FileCheck,
  Box,
  Cpu,
  Sparkles,
  ExternalLink,
  Lock
} from 'lucide-react';

export const EcosystemIntegration: React.FC = () => {
  const [selectedAppId, setSelectedAppId] = useState<string>('sirach');
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveLog, setLiveLog] = useState<string | null>(null);

  const activeApp = SEIRETSU_APPS.find(a => a.id === selectedAppId) || SEIRETSU_APPS[0];

  const handleSimulate = () => {
    setIsSimulating(true);
    setLiveLog(null);
    setTimeout(() => {
      setIsSimulating(false);
      setLiveLog(`[SEIRETSU-BUS] Query authenticated. Context served to ${activeApp.name}. Write-back action confirmed into knowledge graph.`);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-primary-light text-primary font-bold px-2 py-0.5 rounded">
              Seiretsu Portfolio Architecture (Section 2 & 8)
            </span>
            <span className="text-xs text-slate-500">· Governed Fact Retrieval & Write-Back</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Seiretsu Application Ecosystem & Consumers
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Luminix sits between plant OT/IT sources and every AI agent or application. Applications consume governed facts through LX-09 and write back operational decisions, work orders, and outcomes.
          </p>
        </div>
      </div>

      {/* Layered Reference Architecture Flow Diagram */}
      <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 text-white space-y-6">
        <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
          Layered Ecosystem Architecture (Figure 1 & 7 from PDF)
        </div>

        {/* 4 Layers Display */}
        <div className="space-y-3 text-xs font-mono">
          {/* Consumers Layer */}
          <div className="p-3 bg-navy-900 rounded-xl border border-blue-500/30">
            <div className="text-slate-400 text-[10px] uppercase font-bold mb-2 flex items-center justify-between">
              <span>CONSUMERS LAYER (Seiretsu Applications)</span>
              <span className="text-teal font-sans">Reads Governed Facts · Writes Back Actions</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {SEIRETSU_APPS.map(app => (
                <button
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-2.5 rounded-lg border text-left transition ${
                    selectedAppId === app.id
                      ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/40 font-bold'
                      : 'bg-navy-950/80 border-slate-700 text-slate-300 hover:bg-navy-800'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{app.name}</div>
                  <div className="text-[9px] text-slate-400 truncate">{app.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Governed Facts Bus */}
          <div className="py-1 text-center text-amber-400 font-mono text-[11px] flex items-center justify-center gap-2">
            <span>▲ Governed Facts with Citations & Permission Checks (LX-09 Context API) ▲</span>
          </div>

          {/* Luminix Core Layer */}
          <div className="p-3 bg-navy-900 rounded-xl border border-amber-500/30 space-y-2">
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center justify-between">
              <span>LUMINIX CONTEXT LAYER (Modules LX-01 to LX-10)</span>
              <span className="text-amber-400">Read-Only Ground Truth Engine</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
              <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
                <span className="text-amber-300 font-bold block">SERVE</span>
                <span className="text-[10px] text-slate-400">LX-09 API · LX-08 Twin</span>
              </div>
              <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
                <span className="text-amber-300 font-bold block">DETECT & MEASURE</span>
                <span className="text-[10px] text-slate-400">LX-05 · LX-07 · LX-06 · LX-10</span>
              </div>
              <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
                <span className="text-amber-300 font-bold block">MODEL</span>
                <span className="text-[10px] text-slate-400">LX-02 Hierarchy · LX-03 Graph</span>
              </div>
              <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
                <span className="text-amber-300 font-bold block">CONNECT & TRUST</span>
                <span className="text-[10px] text-slate-400">LX-01 · LX-04 · LX-S1..S4</span>
              </div>
            </div>
          </div>

          {/* Plant Sources Layer */}
          <div className="p-3 bg-navy-900 rounded-xl border border-teal-500/30">
            <div className="text-slate-400 text-[10px] uppercase font-bold mb-1 flex items-center justify-between">
              <span>SOURCES LAYER (Read-Only: OPC UA · MQTT · Historian · ERP · LIMS)</span>
              <span className="text-emerald-400">NO WRITE PATH TO CONTROL</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-300">
              <span className="px-2 py-0.5 bg-slate-800 rounded">SCADA / PLC</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded">Historian (OSIsoft PI)</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded">IoT Gateways (MQTT)</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded">LIMS Quality Lab</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded">ERP & EAM (Veloris, Trestara)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive App Consumer Inspector */}
      <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeApp.color }} />
              <h3 className="text-lg font-bold text-navy-900">{activeApp.name}</h3>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Category: {activeApp.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{activeApp.role}</p>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? 'Processing Query...' : 'Simulate API Consumer Call'}</span>
          </button>
        </div>

        {/* Detailed Contract Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              What it Uses Luminix For (Inputs)
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {activeApp.usesLuminixFor}
            </p>
          </div>

          <div className="p-4 bg-primary-light/40 rounded-xl border border-primary/20 space-y-1.5">
            <span className="text-[10px] font-bold text-primary-dark uppercase tracking-wider block">
              What it Writes Back (Outputs / Enriched Loop)
            </span>
            <p className="text-navy-900 leading-relaxed font-medium">
              {activeApp.writesBack}
            </p>
          </div>
        </div>

        {/* Real-World Use Case Example */}
        <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
          <span className="font-bold text-amber-900 block">Example Live Operational Interaction:</span>
          <p className="text-slate-800 font-mono text-[11px]">{activeApp.exampleAction}</p>
        </div>

        {/* Query & Response Console */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Consumer Query & Cited Payload Contract
          </div>
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-3 border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px]">Endpoint:</span>
              <span className="text-emerald-400">{activeApp.sampleQuery}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Cited Response:</span>
              <pre className="text-white text-[11px] overflow-x-auto">
                {JSON.stringify(activeApp.sampleResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {liveLog && (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
            <span>{liveLog}</span>
          </div>
        )}
      </div>
    </div>
  );
};
