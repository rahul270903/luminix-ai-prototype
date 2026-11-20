import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, X, Cpu, AlertTriangle, Layers, BookOpen, ArrowRight } from 'lucide-react';
import { MODULES } from '../../data/modulesData';
import { ASSETS, EVENTS } from '../../data/mockData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredAssets = ASSETS.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.code.toLowerCase().includes(q) ||
    a.id.toLowerCase().includes(q)
  );

  const filteredEvents = EVENTS.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.id.toLowerCase().includes(q) ||
    e.assetName.toLowerCase().includes(q)
  );

  const filteredModules = MODULES.filter(m =>
    m.id.toLowerCase().includes(q) ||
    m.name.toLowerCase().includes(q) ||
    m.stage.toLowerCase().includes(q)
  );

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-navy-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl border border-surface-border w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-surface-border gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search assets (P-104), events (EVT-104), modules (LX-01), or topics..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-navy-900 placeholder:text-slate-400 focus:outline-none text-sm"
          />
          <kbd className="hidden sm:inline-block text-[11px] font-mono px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 shadow-xs">
            ESC
          </kbd>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-slate-400 hover:text-navy-900 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Shortcuts */}
          {!q && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                Suggested Quick Jumps
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                <button
                  onClick={() => handleSelect('/workflow')}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 text-left text-sm text-navy-900 group"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    <span>Orchestration Workflow</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                </button>
                <button
                  onClick={() => handleSelect('/decisions')}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 text-left text-sm text-navy-900 group"
                >
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-teal" />
                    <span>Sirach Decision Center</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal" />
                </button>
                <button
                  onClick={() => handleSelect('/scada')}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 text-left text-sm text-navy-900 group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber" />
                    <span>SCADA Integration Architecture</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber" />
                </button>
                <button
                  onClick={() => handleSelect('/approvals')}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 text-left text-sm text-navy-900 group"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose" />
                    <span>Pending Human Approvals</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose" />
                </button>
              </div>
            </div>
          )}

          {/* Filtered Assets */}
          {filteredAssets.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                Assets ({filteredAssets.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredAssets.map(asset => (
                  <button
                    key={asset.id}
                    onClick={() => handleSelect('/assets')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-primary-light/50 text-left text-sm group transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <div className="font-medium text-navy-900">{asset.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{asset.code} · {asset.line}</div>
                      </div>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      Health: {asset.healthScore}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Events */}
          {filteredEvents.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                Events & Anomalies ({filteredEvents.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredEvents.map(evt => (
                  <button
                    key={evt.id}
                    onClick={() => handleSelect('/events')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-amber-50 text-left text-sm group transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber shrink-0" />
                      <div>
                        <div className="font-medium text-navy-900">{evt.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{evt.id} · {evt.siteName}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold uppercase text-rose-600">
                      {evt.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Modules */}
          {filteredModules.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                Modules ({filteredModules.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredModules.map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => handleSelect('/modules')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 text-left text-sm group transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-teal shrink-0" />
                      <div>
                        <span className="font-mono font-bold text-xs text-primary bg-primary-light px-1.5 py-0.5 rounded mr-2">
                          {mod.id}
                        </span>
                        <span className="font-medium text-navy-900">{mod.name}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 uppercase font-mono">
                      Stage: {mod.stage}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && filteredAssets.length === 0 && filteredEvents.length === 0 && filteredModules.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              No matching assets, events, or modules found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
