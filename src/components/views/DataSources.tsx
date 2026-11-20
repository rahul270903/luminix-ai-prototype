import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DataSourceItem } from '../../types';
import {
  Database,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Radio,
  Server,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { TrustScoreBadge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const DataSources: React.FC = () => {
  const { dataSources, simulateIncomingData, selectedSite } = useApp();
  const [search, setSearch] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState('all');
  const [inspectSource, setInspectSource] = useState<DataSourceItem | null>(null);
  const [filterBySite, setFilterBySite] = useState<boolean>(true);

  const siteNameMap: Record<string, string> = {
    'riverside': 'Riverside Plant',
    'water-station-7': 'Water Utility – Station 7',
    'fulfillment-3': 'Fulfillment Center – Site 3'
  };

  const filteredSources = dataSources.filter(src => {
    const matchesSite = !filterBySite || selectedSite === 'all' || src.site === siteNameMap[selectedSite];
    const matchesSearch =
      src.name.toLowerCase().includes(search.toLowerCase()) ||
      src.site.toLowerCase().includes(search.toLowerCase());
    const matchesProto = selectedProtocol === 'all' || src.protocol === selectedProtocol;
    return matchesSite && matchesSearch && matchesProto;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-primary-light text-primary font-bold px-2 py-0.5 rounded">
              Ingestion Connectors (LX-01)
            </span>
            <span className="text-xs text-slate-500">· 12 Active Enterprise & Plant Taps</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Industrial & Enterprise Data Sources
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous read-only ingestion across SCADA, Historians, PLC tags, IoT gateways, LIMS labs, and ERP business systems.
          </p>
        </div>

        <button
          onClick={simulateIncomingData}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition shrink-0"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          <span>Simulate Incoming Packets</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search source by name or facility..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
          </div>

          {selectedSite !== 'all' && (
            <button
              onClick={() => setFilterBySite(!filterBySite)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition whitespace-nowrap ${
                filterBySite
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{filterBySite ? 'Facility Scoped' : 'All Sites'}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedProtocol}
            onChange={e => setSelectedProtocol(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none shadow-2xs"
          >
            <option value="all">All Protocols</option>
            <option value="OPC UA">OPC UA</option>
            <option value="MQTT">MQTT</option>
            <option value="Historian (PI)">Historian (PI)</option>
            <option value="REST / ERP">REST / ERP</option>
            <option value="RTU / Modbus">RTU / Modbus</option>
          </select>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map(src => (
          <div
            key={src.id}
            onClick={() => setInspectSource(src)}
            className="bg-white rounded-2xl border border-surface-border p-4 shadow-2xs hover:border-primary/50 hover:shadow-sm cursor-pointer transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {src.protocol}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  src.status === 'connected' ? 'bg-teal-100 text-teal-800' :
                  src.status === 'degraded' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {src.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-navy-900 group-hover:text-primary transition leading-snug">
                {src.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{src.category} · {src.site}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Latency:</span>
                <span className="font-bold text-navy-900">{src.latencyMs} ms</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Ingested Tags:</span>
                <span className="font-bold text-primary">{src.receivedTagsCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400 text-[10px] font-sans">Last Poll: {src.lastPoll}</span>
                <TrustScoreBadge score={src.trustRating} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Source Modal */}
      {inspectSource && (
        <Modal
          isOpen={!!inspectSource}
          onClose={() => setInspectSource(null)}
          title={`Connector Inspection: ${inspectSource.name}`}
          subtitle={`Protocol: ${inspectSource.protocol} · Category: ${inspectSource.category}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-3 font-mono">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-400 block text-[10px]">Ping Latency</span>
                <span className="text-base font-bold text-navy-900">{inspectSource.latencyMs} ms</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-400 block text-[10px]">Data Gaps (24h)</span>
                <span className="text-base font-bold text-amber-600">{inspectSource.dataGaps}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-400 block text-[10px]">Active Tags</span>
                <span className="text-base font-bold text-primary">{inspectSource.receivedTagsCount}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-navy-900 block mb-1">
                Sample Live Payload (Read-Only)
              </span>
              <pre className="p-3.5 bg-navy-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto border border-navy-800">
                {JSON.stringify(inspectSource.sampleRecord, null, 2)}
              </pre>
            </div>

            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
              <span>Connector is sandboxed in the plant DMZ with read-only credentials.</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
