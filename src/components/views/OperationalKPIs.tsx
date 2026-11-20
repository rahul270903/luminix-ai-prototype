import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Layers,
  Activity,
  Zap,
  Clock,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';

export const OperationalKPIs: React.FC = () => {
  const [selectedKpi, setSelectedKpi] = useState('oee');

  const benchmarkData = [
    { site: 'Riverside Line 1', oee: 86.4, mtbf: 58.0, energy: 17.8, yield: 98.6 },
    { site: 'Riverside Line 2 (Current)', oee: 78.2, mtbf: 42.5, energy: 19.8, yield: 97.2 },
    { site: 'Water Station 7', oee: 82.1, mtbf: 72.0, energy: 16.4, yield: 99.1 },
    { site: 'Fulfillment Site 3', oee: 88.5, mtbf: 94.0, energy: 14.2, yield: 99.8 },
  ];

  const mtbfTrendData = [
    { day: 'Day 1', line2: 58.0, line1: 59.2 },
    { day: 'Day 3', line2: 56.4, line1: 58.8 },
    { day: 'Day 5', line2: 52.1, line1: 59.0 },
    { day: 'Day 7', line2: 48.0, line1: 58.5 },
    { day: 'Day 9', line2: 43.8, line1: 59.1 },
    { day: 'Day 10 (Now)', line2: 42.5, line1: 58.9 }, // degrading due to P-104
  ];

  const governedDefinitions = [
    {
      kpi: 'Overall Equipment Effectiveness (OEE)',
      formula: 'Availability × Performance × Quality',
      version: 'v3.2.1-governed',
      effectiveDate: '2026-01-15',
      governingBody: 'Global Manufacturing Excellence Council',
      notes: 'Normalized for product viscosity, bottle neck diameter, and fill temperature tolerances.'
    },
    {
      kpi: 'Mean Time Between Failures (MTBF)',
      formula: 'Total Operating Run Hours ÷ Unplanned Breakdown Count',
      version: 'v2.8.0-governed',
      effectiveDate: '2026-02-01',
      governingBody: 'Asset Reliability Standards Office',
      notes: 'Micro-stops < 3 minutes logged separately as operational pauses rather than mechanical breakdowns.'
    },
    {
      kpi: 'Energy Intensity Index (kWh/unit)',
      formula: 'Total Plant kW Ingress ÷ Produced Finished Salable Cases',
      version: 'v1.4.2-governed',
      effectiveDate: '2026-03-10',
      governingBody: 'Sustainability & ESG Audit Group',
      notes: 'Weather-normalized against degree-day heating/cooling loads.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
              KPI Governance & Benchmarking (LX-06 & LX-10)
            </span>
            <span className="text-xs text-slate-500">· Governed Formulas v3.2.1</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Operational KPIs & Cross-Site Benchmarking
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Governed definitions and normalized performance comparisons across production lines and multi-site facilities.
          </p>
        </div>
      </div>

      {/* Cross-Site Benchmark Comparison Chart */}
      <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-navy-900">
              Cross-Site Like-for-Like Benchmarking (LX-10)
            </h3>
            <p className="text-xs text-slate-500">
              Line 2 lag (-8.2% OEE) is directly attributable to Pump P-104 mechanical friction and micro-stoppages.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['oee', 'mtbf', 'energy', 'yield'] as const).map(k => (
              <button
                key={k}
                onClick={() => setSelectedKpi(k)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase font-mono transition ${
                  selectedKpi === k
                    ? 'bg-white text-navy-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={benchmarkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="site" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#101827', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey={selectedKpi} fill="#4F7DF3" radius={[6, 6, 0, 0]} name={`${selectedKpi.toUpperCase()} Score`} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MTBF Degradation Trend Chart */}
      <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-navy-900">
            Line 2 MTBF Degradation Curve vs Plant Baseline (Line 1)
          </h3>
          <p className="text-xs text-slate-500">
            Over the past 10 days, Line 2 MTBF has dropped from 58.0 hours down to 42.5 hours as bearing friction worsened.
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mtbfTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[35, 65]} stroke="#94a3b8" fontSize={11} unit="h" />
              <Tooltip
                contentStyle={{ backgroundColor: '#101827', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="line2" stroke="#E45D5D" strokeWidth={3} name="Line 2 (Degrading Pump P-104)" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="line1" stroke="#27B6A8" strokeWidth={2} strokeDasharray="4 4" name="Line 1 Benchmark" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Governed Definitions Table */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal" />
          <span>Governed Operational KPI Semantics Registry</span>
        </h3>
        <p className="text-xs text-slate-500">
          Guarantees that every plant and AI agent calculates metrics with identical mathematical definitions.
        </p>

        <div className="space-y-3 pt-1">
          {governedDefinitions.map((def, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-navy-900 text-sm">{def.kpi}</span>
                <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                  {def.version}
                </span>
              </div>
              <div className="font-mono text-primary font-semibold">
                Formula: {def.formula}
              </div>
              <div className="text-slate-600 leading-relaxed font-sans">
                {def.notes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
