import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Asset } from '../../types';
import {
  Box,
  Layers,
  Activity,
  Zap,
  Thermometer,
  Radio,
  AlertTriangle,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Cpu,
  Info,
  Building2
} from 'lucide-react';
import { TrustScoreBadge } from '../common/Badge';

export const DigitalTwin: React.FC = () => {
  const { assets, events, simulateIncomingData, selectedSite } = useApp();
  const [selectedAssetId, setSelectedAssetId] = useState<string>('P-104');
  const [viewMode, setViewMode] = useState<'health' | 'values' | 'temperature' | 'vibration' | 'energy' | 'events'>('health');

  // Auto-switch selected asset when site changes
  useEffect(() => {
    if (selectedSite === 'water-station-7') {
      setSelectedAssetId('W-PUMP-701');
    } else if (selectedSite === 'fulfillment-3') {
      setSelectedAssetId('SRT-301');
    } else {
      setSelectedAssetId('P-104');
    }
  }, [selectedSite]);

  const selectedAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  const viewModes = [
    { id: 'health', label: 'Asset Health', icon: Activity },
    { id: 'values', label: 'Live Values', icon: Radio },
    { id: 'temperature', label: 'Thermal Profile', icon: Thermometer },
    { id: 'vibration', label: 'Vibration Dynamics', icon: Activity },
    { id: 'energy', label: 'Power & Energy', icon: Zap },
    { id: 'events', label: 'Active Anomalies', icon: AlertTriangle },
  ];

  const schematicConfigs = {
    riverside: {
      title: 'RIVERSIDE_PLANT // AREA_B // LINE_2_SCHEMATIC',
      facilityName: 'Riverside Plant Line 2 Continuous Bottling Hall',
      flow: ['RAW INGREDIENT FEED', 'PACKAGING & FILL ZONE', 'PALLETIZING DISPATCH'],
      assets: [
        { id: 'P-104', label: 'PUMP P-104', sub: 'Slurry Centrifugal', statusBadge: 'CRITICAL (68%)', statusColor: 'rose', icon: Cpu, isAlert: true },
        { id: 'P-105', label: 'PUMP P-105', sub: 'Secondary Booster', statusBadge: 'OPTIMAL (94%)', statusColor: 'teal', icon: Cpu, isAlert: false },
        { id: 'C-202', label: 'CONVEYOR C-202', sub: 'High-Speed Infeed', statusBadge: 'GOOD (88%)', statusColor: 'teal', icon: Activity, isAlert: false },
      ]
    },
    'water-station-7': {
      title: 'WATER_UTILITY_STATION_7 // PRESSURE_HUB // TRUNK_DELTA_SCHEMATIC',
      facilityName: 'Station 7 Remote Pumping Gallery & Header',
      flow: ['RAW WATER STORAGE', 'HIGH-LIFT PUMPING GALLERY', 'MUNICIPAL TRUNK DELTA'],
      assets: [
        { id: 'W-PUMP-701', label: 'PUMP 701 (DUTY)', sub: 'High-Lift Discharge 62.4 psi', statusBadge: 'CAVITATION (74%)', statusColor: 'amber', icon: Cpu, isAlert: true },
        { id: 'W-PUMP-702', label: 'PUMP 702 (STANDBY)', sub: 'Ready for SCADA switchover', statusBadge: 'STANDBY (96%)', statusColor: 'teal', icon: Cpu, isAlert: false },
        { id: 'W-PUMP-701', label: 'TRUNK HEADER PT-701', sub: 'Header Pressure 62.4 psi', statusBadge: 'PRESSURE DROP', statusColor: 'amber', icon: Activity, isAlert: true },
      ]
    },
    'fulfillment-3': {
      title: 'FULFILLMENT_SITE_3 // INDUCT_HALL // CROSS_BELT_WAVE_SCHEMATIC',
      facilityName: 'Fulfillment Center Site 3 High-Speed Wave Sorter',
      flow: ['INCOMING PALLET INFEED', 'HIGH-SPEED OPTICAL SORTATION', 'CARRIER DOCK DISPATCH'],
      assets: [
        { id: 'SRT-301', label: 'CROSS-BELT SORTER 301', sub: 'Induct Lane B (Photo-Eye)', statusBadge: 'ADVISORY (78%)', statusColor: 'amber', icon: Cpu, isAlert: true },
        { id: 'SRT-201', label: 'PARALLEL SORTER 201', sub: 'Wave Sorter 2 (42% Spare)', statusBadge: 'SPARE 42% (97%)', statusColor: 'teal', icon: Cpu, isAlert: false },
        { id: 'SRT-301', label: 'OPTICAL ARRAY 301B', sub: 'Clarity 64.2% (Dust Film)', statusBadge: 'DUST DETECTED', statusColor: 'amber', icon: Activity, isAlert: true },
      ]
    },
    all: {
      title: 'ENTERPRISE_FLEET // MULTI_SITE_SYNTHESIS // SPATIAL_TWIN',
      facilityName: 'Fleet Spatial Assets Surveillance Cockpit',
      flow: ['MULTI-SITE INGESTION', 'NORMALIZED TOPOLOGY', 'CLOSED-LOOP DISPATCH'],
      assets: [
        { id: 'P-104', label: 'RIVERSIDE P-104', sub: 'Bearing Heating (78.4°C)', statusBadge: 'CRITICAL (68%)', statusColor: 'rose', icon: Cpu, isAlert: true },
        { id: 'W-PUMP-701', label: 'STATION 7 PUMP 701', sub: 'Impeller Recirculation', statusBadge: 'DEGRADED (74%)', statusColor: 'amber', icon: Cpu, isAlert: true },
        { id: 'SRT-301', label: 'SITE 3 SORTER 301', sub: 'Optical Lens Contamination', statusBadge: 'ADVISORY (78%)', statusColor: 'amber', icon: Cpu, isAlert: true },
      ]
    }
  };

  const activeSchematic = schematicConfigs[selectedSite] || schematicConfigs.all;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">
              Spatial Foundation (LX-08)
            </span>
            <span className="text-xs text-slate-500 font-mono">· {activeSchematic.facilityName}</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Digital Twin Plant View
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized 2D spatial asset layout with live telemetry overlays, thermal gradient mapping, and equipment health status.
          </p>
        </div>

        <button
          onClick={simulateIncomingData}
          className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Live Sensor Stream</span>
        </button>
      </div>

      {/* Layer View Mode Toggles */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {viewModes.map(mode => {
          const Icon = mode.icon;
          const isSelected = viewMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                  : 'bg-white text-slate-600 border-surface-border hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Twin Layout: Schematic on Left, Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plant Floor Schematic (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm text-white flex flex-col justify-between min-h-[500px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{activeSchematic.title}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              Mode: {viewMode}
            </span>
          </div>

          {/* Visual Process Line Layout */}
          <div className="py-6 px-2 my-auto">
            {/* Flow Header */}
            <div className="text-center text-[11px] font-mono text-slate-400 mb-4 flex items-center justify-center gap-2">
              <span>{activeSchematic.flow[0]}</span>
              <span>→</span>
              <span>{activeSchematic.flow[1]}</span>
              <span>→</span>
              <span>{activeSchematic.flow[2]}</span>
            </div>

            {/* Industrial Plant SVG / CSS Machine Topology */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeSchematic.assets.map((item, idx) => {
                const isSelected = selectedAssetId === item.id;
                const Icon = item.icon;
                return (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => setSelectedAssetId(item.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition relative group ${
                      isSelected
                        ? 'border-amber-400 bg-slate-800/90 shadow-lg ring-4 ring-amber-400/20'
                        : 'border-slate-700 bg-slate-800/40 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-amber-400">{item.label}</span>
                      <span className={`text-[10px] px-1.5 rounded border ${
                        item.statusColor === 'rose'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                          : item.statusColor === 'amber'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-teal-500/20 text-teal-400 border-teal-500/40'
                      }`}>
                        {item.statusBadge}
                      </span>
                    </div>

                    <div className="h-20 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-800">
                      <Icon className={`w-10 h-10 ${item.isAlert ? 'text-amber-400 animate-pulse' : 'text-teal'}`} />
                      {viewMode === 'temperature' && (
                        <div className="absolute inset-0 bg-rose-600/25 flex items-center justify-center font-mono font-bold text-rose-300 text-sm">
                          {item.id === 'P-104' ? '78.4 °C (+17°C)' : item.id === 'W-PUMP-701' ? '46.2 °C' : 'Normal Temp'}
                        </div>
                      )}
                      {viewMode === 'vibration' && (
                        <div className="absolute inset-0 bg-amber-600/25 flex items-center justify-center font-mono font-bold text-amber-300 text-sm">
                          {item.id === 'P-104' ? '4.82 mm/s (BPFO)' : '1.24 mm/s'}
                        </div>
                      )}
                      {viewMode === 'values' && (
                        <div className="absolute inset-0 flex items-center justify-center font-mono text-primary-light text-xs font-bold text-center px-2">
                          {item.sub}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-[11px] text-slate-300 flex justify-between">
                      <span className="truncate">{item.sub}</span>
                      <span className={`font-mono font-bold ${item.isAlert ? 'text-rose-400' : 'text-teal'}`}>
                        {item.isAlert ? 'Active Alert' : 'Normal'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Telemetry Sync Status */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            <span>Spatial Bindings: 320 nodes synchronized</span>
            <span className="text-teal">WebSocket State Feed: 45ms latency</span>
          </div>
        </div>

        {/* Selected Asset Digital Twin Inspector Panel */}
        <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-xs space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-surface-border">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">{selectedAsset.code}</span>
              <h3 className="text-base font-bold text-navy-900">{selectedAsset.name}</h3>
              <p className="text-xs text-slate-500">{selectedAsset.area} · {selectedAsset.line}</p>
            </div>
            <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
              selectedAsset.healthScore < 70 ? 'bg-rose-100 text-rose-800' :
              selectedAsset.healthScore < 85 ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
            }`}>
              {selectedAsset.healthScore}%
            </span>
          </div>

          {/* Operational Boundaries */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase text-[10px] block">Operating Limits</span>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-mono text-[11px]">
              {selectedAsset.limits}
            </div>
          </div>

          {/* Live Sensors on this Asset */}
          <div className="space-y-2">
            <span className="font-bold text-slate-500 uppercase text-[10px] block">
              Bound Telemetry Points ({selectedAsset.sensors.length})
            </span>
            <div className="space-y-1.5 max-h-56 overflow-y-auto">
              {selectedAsset.sensors.map(s => (
                <div key={s.id} className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold font-mono text-navy-900">{s.tag}</span>
                    <span className="text-[11px] text-slate-500 block">{s.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold text-xs ${
                      s.status === 'warning' ? 'text-amber-600' :
                      s.status === 'critical' ? 'text-rose-600' : 'text-navy-900'
                    }`}>
                      {s.currentValue} {s.unit}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{s.rateOfChange || 'Stable'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Work Order / Event */}
          {selectedAsset.openWorkOrderId && (
            <div className="p-3 bg-primary-light/60 border border-primary/30 rounded-xl text-xs space-y-1">
              <span className="font-bold text-primary-dark block">Open Work Order Assigned</span>
              <div className="flex justify-between text-[11px] font-mono">
                <span>ID: {selectedAsset.openWorkOrderId}</span>
                <span className="text-teal font-semibold">Pre-Staged Parts</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
