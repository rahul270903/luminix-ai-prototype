import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IndustrialEvent, EventSeverity, EventStatus } from '../../types';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Clock,
  DollarSign,
  User,
  ArrowRight,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';
import { SeverityBadge, TrustScoreBadge } from '../common/Badge';

export const EventsAndAnomalies: React.FC = () => {
  const { events, acknowledgeEvent, assignEventOwner, selectedSite } = useApp();
  const navigate = useNavigate();

  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredEvents = events.filter(evt => {
    const matchesSev = severityFilter === 'all' || evt.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || evt.status === statusFilter;
    const matchesSite = selectedSite === 'all' || evt.siteId === selectedSite;
    const matchesSearch =
      evt.name.toLowerCase().includes(search.toLowerCase()) ||
      evt.assetName.toLowerCase().includes(search.toLowerCase()) ||
      evt.id.toLowerCase().includes(search.toLowerCase());
    return matchesSev && matchesStatus && matchesSite && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
              Event Intelligence (LX-05)
            </span>
            <span className="text-xs text-slate-500">· Alarm Suppression & Days-to-Limit Forecasting</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Events & Anomaly Detection
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upgrades noisy PLC/SCADA alarms into contextualized operational events linked to asset criticality, days-to-limit, and customer sales order exposure.
          </p>
        </div>

        <button
          onClick={() => navigate('/decisions')}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 shrink-0 transition"
        >
          <BrainCircuit className="w-4 h-4" />
          <span>Open Sirach Decision Center</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by name or asset..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none shadow-2xs"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none shadow-2xs"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map(evt => (
          <div
            key={evt.id}
            className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs space-y-4 hover:border-primary/40 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-border">
              <div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={evt.severity} />
                  <span className="font-mono font-bold text-xs bg-navy-900 text-amber-400 px-2 py-0.5 rounded">
                    {evt.id}
                  </span>
                  <span className="text-xs font-mono text-slate-500">· {evt.timestamp}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 mt-1">{evt.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  Asset: {evt.assetName} · Location: {evt.siteName} ({evt.line})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <TrustScoreBadge score={evt.trustScore} />
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200">
                  {evt.daysToLimit} Days to Limit
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {evt.description}
            </p>

            {/* Orders at Risk */}
            {evt.ordersAtRisk.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Commercial Orders Exposed to Failure
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {evt.ordersAtRisk.map((ord, i) => (
                    <div key={i} className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-navy-900">{ord.customer}</span>
                        <span className="text-slate-500 font-mono text-[11px] ml-1">({ord.id})</span>
                        <div className="text-[10px] text-slate-500">Ships: {ord.deadline}</div>
                      </div>
                      <span className="font-bold text-rose-700 font-mono">{ord.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>Owner: <strong>{evt.assignedOwner}</strong></span>
                <span>· Status: <strong className="capitalize text-navy-900">{evt.status}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                {evt.status === 'active' && (
                  <button
                    onClick={() => acknowledgeEvent(evt.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition"
                  >
                    Acknowledge
                  </button>
                )}

                <button
                  onClick={() => navigate('/root-cause')}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  <span>Investigate Root Cause</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigate('/decisions')}
                  className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition"
                >
                  <span>Review Sirach Options</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
