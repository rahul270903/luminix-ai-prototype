import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Asset } from '../../types';
import {
  Cpu,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  User,
  Clock,
  Sparkles
} from 'lucide-react';
import { TrustScoreBadge } from '../common/Badge';

export const AssetContext: React.FC = () => {
  const { assets } = useApp();
  const [search, setSearch] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<string>('P-104');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAssets = assets.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.line.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const selectedAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
              Context Model (LX-02)
            </span>
            <span className="text-xs text-slate-500">· ISA-95 Standard Hierarchy Builder</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Asset & Process Context Model
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Site → Area → Line → Asset → Sensor. Maps every raw tag address to physical equipment boundaries, limits, and responsible engineers.
          </p>
        </div>
      </div>

      {/* Main Split: Assets Table on Left, Asset Context Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Asset Directory (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search asset, code, line..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none shadow-2xs"
            >
              <option value="all">All Asset Categories</option>
              <option value="Pump">Pumps</option>
              <option value="Conveyor">Conveyors</option>
              <option value="Tank">Tanks & Vessels</option>
              <option value="Sorter">Sorters</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-surface-border shadow-xs overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-surface-border">
                <tr>
                  <th className="py-2.5 px-3">Asset</th>
                  <th className="py-2.5 px-3">Location Hierarchy</th>
                  <th className="py-2.5 px-3">Criticality</th>
                  <th className="py-2.5 px-3">Health</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filteredAssets.map(asset => {
                  const isSelected = asset.id === selectedAssetId;
                  return (
                    <tr
                      key={asset.id}
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-primary-light/40 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="font-bold text-navy-900">{asset.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{asset.code}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <div>{asset.area}</div>
                        <div className="text-[10px] text-slate-400">{asset.line}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-700">{asset.criticality}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                          asset.healthScore < 70 ? 'bg-rose-100 text-rose-800' :
                          asset.healthScore < 85 ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          {asset.healthScore}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="capitalize text-slate-700">{asset.healthStatus}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Deep Asset Context Dossier */}
        <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs space-y-5">
          <div className="flex items-start justify-between pb-3 border-b border-surface-border">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">{selectedAsset.code}</span>
              <h3 className="text-base font-bold text-navy-900">{selectedAsset.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedAsset.line}</p>
            </div>
            <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
              selectedAsset.healthScore < 70 ? 'bg-rose-100 text-rose-800' :
              selectedAsset.healthScore < 85 ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
            }`}>
              Health: {selectedAsset.healthScore}%
            </span>
          </div>

          {/* Operational Boundaries */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase text-[10px] block">Governed Operating Limits</span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-mono text-xs">
              {selectedAsset.limits}
            </div>
          </div>

          {/* Asset Ownership & Maintenance */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-sans">Owner / Lead</span>
              <span className="font-bold text-navy-900">{selectedAsset.owner}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-sans">Run Hours</span>
              <span className="font-bold text-navy-900">{selectedAsset.operatingHours.toLocaleString()} hrs</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 col-span-2">
              <span className="text-slate-400 block text-[10px] font-sans">Maintenance Schedule</span>
              <span className="font-medium text-slate-800">{selectedAsset.maintenanceSchedule}</span>
            </div>
          </div>

          {/* Mapped Sensors */}
          <div className="space-y-2">
            <span className="font-bold text-slate-500 uppercase text-[10px] block">
              Bound Telemetry Sensors ({selectedAsset.sensors.length})
            </span>
            <div className="space-y-1.5 max-h-56 overflow-y-auto">
              {selectedAsset.sensors.map(sen => (
                <div key={sen.id} className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold font-mono text-navy-900">{sen.tag}</span>
                    <span className="text-[11px] text-slate-500 block">{sen.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-navy-900">
                      {sen.currentValue} {sen.unit}
                    </span>
                    <TrustScoreBadge score={sen.trustScore} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
