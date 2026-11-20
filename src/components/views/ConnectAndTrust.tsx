import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Layers,
  Filter,
  Search,
  RefreshCw,
  Clock,
  Radio,
  Sliders,
  TrendingUp
} from 'lucide-react';
import { TrustScoreBadge } from '../common/Badge';

export const ConnectAndTrust: React.FC = () => {
  const { assets, dataSources, simulateIncomingData } = useApp();
  const [trustThreshold, setTrustThreshold] = useState<number>(0.90);

  // Stale and anomaly points
  const flaggedPoints = [
    {
      tag: 'WST-P7-PT701',
      source: 'Station 7 Remote RTU #1',
      site: 'Water Utility – Station 7',
      issue: 'Stale feed: Telemetry flatline for 42s',
      currentValue: '62.4 psi',
      trustScore: 0.74,
      status: 'Quarantined from AI decisions'
    },
    {
      tag: 'RIV_L2_P104_TT104A',
      source: 'OSIsoft PI Historian',
      site: 'Riverside Plant',
      issue: 'Thermal excursion: Rate of change exceeds normal (+17°C/36h)',
      currentValue: '78.4 °C',
      trustScore: 0.98,
      status: 'Active Event EVT-104 Raised'
    },
    {
      tag: 'FLM-SRT-OPT301B',
      source: 'Site 3 Induct Optical Array',
      site: 'Fulfillment Center – Site 3',
      issue: 'Optical signal degradation: Optical clarity below 70%',
      currentValue: '64.2 %',
      trustScore: 0.94,
      status: 'Maintenance advisory issued'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
              Data Integrity Engine (LX-04)
            </span>
            <span className="text-xs text-slate-500">· 12,450 Real-Time Tags Scored</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Data Quality & Trust Scoring
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Detects telemetry gaps, stale flatlines, out-of-range spikes, and unit mismatch. Every served data point carries an auditable trust coefficient.
          </p>
        </div>

        <button
          onClick={simulateIncomingData}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Run Integrity Evaluation</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs">
          <div className="text-xs text-slate-500">Fleet Trust Score</div>
          <div className="text-2xl font-bold font-mono text-teal mt-1">0.942</div>
          <div className="text-[11px] text-teal mt-0.5 font-medium">+0.018 vs last week</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs">
          <div className="text-xs text-slate-500">Points Above Threshold</div>
          <div className="text-2xl font-bold font-mono text-navy-900 mt-1">91.2%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Threshold: ≥ {(trustThreshold * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs">
          <div className="text-xs text-slate-500">Stale Feeds Flagged</div>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1">1 Feed</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Quarantined from Sirach AI</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs">
          <div className="text-xs text-slate-500">Data Gaps Detected</div>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1">2 Gaps</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Replayed from edge buffer</div>
        </div>
      </div>

      {/* Interactive Trust Threshold Controller */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-navy-900">
              Governance Gate: Trust Threshold Setting
            </h3>
          </div>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary-light text-primary">
            Minimum Required Trust: {(trustThreshold * 100).toFixed(0)}%
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Points scoring below this coefficient are automatically labeled as degraded and withheld from Sirach decision engines.
        </p>
        <div className="flex items-center gap-4 pt-1">
          <input
            type="range"
            min="0.70"
            max="0.99"
            step="0.01"
            value={trustThreshold}
            onChange={e => setTrustThreshold(parseFloat(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="font-mono text-xs font-bold text-navy-900 w-12 text-right">
            {(trustThreshold * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Flagged Points Table */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Integrity Violations & Quarantined Feeds</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">{flaggedPoints.length} active exceptions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-surface-border">
              <tr>
                <th className="py-2.5 px-3">Tag & Source</th>
                <th className="py-2.5 px-3">Site</th>
                <th className="py-2.5 px-3">Detected Integrity Issue</th>
                <th className="py-2.5 px-3">Value</th>
                <th className="py-2.5 px-3">Trust Score</th>
                <th className="py-2.5 px-3">Governance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {flaggedPoints.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-navy-900">{item.tag}</div>
                    <div className="text-[11px] text-slate-400">{item.source}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{item.site}</td>
                  <td className="py-3 px-3 text-slate-700 font-medium">{item.issue}</td>
                  <td className="py-3 px-3 font-mono font-bold text-navy-900">{item.currentValue}</td>
                  <td className="py-3 px-3">
                    <TrustScoreBadge score={item.trustScore} />
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
