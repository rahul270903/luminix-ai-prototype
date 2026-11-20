import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SiteId } from '../../types';
import {
  Search,
  Bell,
  Sparkles,
  RotateCcw,
  Building2,
  Calendar,
  ChevronDown,
  User,
  Shield,
  Check,
  Radio
} from 'lucide-react';
import { SITES } from '../../data/mockData';

export const Header: React.FC = () => {
  const {
    selectedSite,
    setSelectedSite,
    timeRange,
    setTimeRange,
    openGuidedDemo,
    resetDemoData,
    setIsSearchOpen,
    notifications,
    markAllNotificationsRead,
    autonomyLevel,
    setAutonomyLevel,
    showToast
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAutonomyMenu, setShowAutonomyMenu] = useState(false);

  const closeAllMenus = () => {
    setShowNotifications(false);
    setShowSiteDropdown(false);
    setShowProfileMenu(false);
    setShowAutonomyMenu(false);
  };

  const handleSiteSelect = (siteId: SiteId) => {
    setSelectedSite(siteId);
    setShowSiteDropdown(false);
    const siteNames: Record<SiteId, string> = {
      'all': 'All Facilities (Fleet Overview)',
      'riverside': 'Riverside Plant (Columbus, OH)',
      'water-station-7': 'Water Utility – Station 7 (Austin, TX)',
      'fulfillment-3': 'Fulfillment Center – Site 3 (Allentown, PA)'
    };
    showToast(`Active Facility switched to: ${siteNames[siteId]}`, 'info');
  };

  const handleTimeRangeSelect = (tr: '1h' | '24h' | '7d' | '30d') => {
    setTimeRange(tr);
    const rangeLabels: Record<string, string> = {
      '1h': '1 Hour (Real-Time)',
      '24h': '24 Hours (Day Shift)',
      '7d': '7 Days (Weekly View)',
      '30d': '30 Days (Governed Monthly)'
    };
    showToast(`Time window updated to: ${rangeLabels[tr]}`, 'info');
  };

  const location = useLocation();

  // Breadcrumb mapping
  const routeNames: Record<string, { title: string; section: string }> = {
    '/': { title: 'Executive Overview', section: 'Operations' },
    '/workflow': { title: 'Interactive Orchestration Workflow', section: 'Core Engine' },
    '/governance': { title: 'Governance, Phasing & RACI', section: 'Strategy & Gates' },
    '/sources': { title: 'Industrial Data Sources', section: 'Data Ingestion' },
    '/connect-trust': { title: 'Connect & Trust Scoring', section: 'Data Quality' },
    '/assets': { title: 'Asset & Process Context Model', section: 'Digital Model' },
    '/graph': { title: 'Industrial Knowledge Graph', section: 'Topology' },
    '/events': { title: 'Events & Anomaly Detection', section: 'Detection' },
    '/root-cause': { title: 'Root Cause Analysis', section: 'Investigations' },
    '/kpis': { title: 'Operational KPIs & Governance', section: 'Analytics' },
    '/context-api': { title: 'Luminix Context API Explorer', section: 'Developer & AI' },
    '/ecosystem': { title: 'Seiretsu Ecosystem Consumers', section: 'Portfolio Integration' },
    '/digital-twin': { title: 'Digital Twin Plant View', section: 'Spatial Twin' },
    '/decisions': { title: 'Sirach Decision Center', section: 'AI Decisioning' },
    '/approvals': { title: 'Approval & Action Center', section: 'Human Governance' },
    '/outcomes': { title: 'Outcome Feedback & Closed Loop', section: 'Continuous Learning' },
    '/scada': { title: 'SCADA Integration Architecture', section: 'OT Systems' },
    '/industries': { title: 'Industry Solutions', section: 'Verticals' },
    '/modules': { title: 'Module Catalog (LX-01 to LX-10 & SCADA)', section: 'Platform Specs' },
  };

  const currentRoute = routeNames[location.pathname] || { title: 'Luminix Ai', section: 'Platform' };
  const unreadCount = notifications.filter(n => !n.read).length;

  const currentSiteName =
    selectedSite === 'all'
      ? 'All Industrial Sites'
      : SITES.find(s => s.id === selectedSite)?.name || 'Riverside Plant';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-surface-border shadow-xs">
      {/* Global Transparent Backdrop for Dismissing Open Menus */}
      {(showSiteDropdown || showNotifications || showProfileMenu || showAutonomyMenu) && (
        <div
          className="fixed inset-0 z-30 bg-black/5"
          onClick={closeAllMenus}
        />
      )}

      {/* Top Notification / Demo Banner */}
      <div className="bg-navy-950 text-slate-300 text-[11px] px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            DEMO SIMULATION MODE
          </span>
          <span className="hidden md:inline text-slate-400">
            Industrial data, sensor streams & Sirach AI recommendations are mock simulations.
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Autonomy Level Switcher in Header */}
          <div className="relative">
            <button
              onClick={() => setShowAutonomyMenu(!showAutonomyMenu)}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-navy-900 px-2 py-0.5 rounded border border-navy-700"
            >
              <Shield className="w-3 h-3 text-teal" />
              <span>Autonomy: <strong className="text-white capitalize">{autonomyLevel}</strong></span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showAutonomyMenu && (
              <div className="absolute right-0 mt-1 w-56 bg-white text-navy-900 rounded-lg shadow-xl border border-surface-border p-1.5 z-40">
                <div className="text-[10px] font-semibold text-slate-400 uppercase px-2.5 py-1">
                  Change Autonomy Policy
                </div>
                {(['inform', 'advise', 'approve', 'autonomous'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setAutonomyLevel(lvl);
                      setShowAutonomyMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs capitalize text-left transition ${
                      autonomyLevel === lvl ? 'bg-primary-light font-bold text-primary-dark' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>{lvl === 'approve' ? 'Human Approve (L3)' : lvl}</span>
                    {autonomyLevel === lvl && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={resetDemoData}
            title="Reset simulated data and events to baseline"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs & Page Title */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-surface-muted">
            <span>{currentRoute.section}</span>
            <span>/</span>
            <span className="text-navy-900 font-medium">{currentRoute.title}</span>
          </div>
          <h1 className="text-lg font-bold text-navy-900 tracking-tight leading-tight">
            {currentRoute.title}
          </h1>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs text-slate-600 transition border border-slate-200/60"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search assets, events, modules...</span>
            <kbd className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-300 text-slate-500 shadow-2xs">
              Ctrl+K
            </kbd>
          </button>

          {/* Launch Guided Workflow Prominent Button */}
          <button
            onClick={() => openGuidedDemo(0)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-primary to-primary-hover shadow-sm hover:shadow hover:brightness-105 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>Launch Guided Workflow</span>
          </button>

          {/* Site Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSiteDropdown(!showSiteDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-surface-border rounded-lg text-xs font-medium text-navy-900 hover:bg-slate-50 transition shadow-2xs"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="max-w-[140px] truncate">{currentSiteName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showSiteDropdown && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-surface-border p-1.5 z-40">
                <div className="text-[10px] font-semibold text-slate-400 uppercase px-2.5 py-1">
                  Select Active Facility
                </div>
                <button
                  onClick={() => handleSiteSelect('all')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs text-left transition ${
                    selectedSite === 'all' ? 'bg-primary-light font-bold text-primary-dark' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-primary" />
                    <span>All Sites (Global View)</span>
                  </div>
                  {selectedSite === 'all' && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
                {SITES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleSiteSelect(s.id as SiteId)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs text-left transition ${
                      selectedSite === s.id ? 'bg-primary-light font-bold text-primary-dark' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-navy-900">{s.name}</div>
                      <div className="text-[11px] text-slate-400">{s.location} · {s.activeAssets} assets</div>
                    </div>
                    {selectedSite === s.id && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time Range Selector */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            {(['1h', '24h', '7d', '30d'] as const).map(tr => (
              <button
                key={tr}
                onClick={() => handleTimeRangeSelect(tr)}
                className={`px-2 py-1 text-xs font-medium rounded-md transition ${
                  timeRange === tr
                    ? 'bg-white text-navy-900 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-surface-border p-3 z-40">
                <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                  <span className="text-xs font-bold text-navy-900">Notifications ({notifications.length})</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-primary hover:underline font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-lg text-xs transition ${
                        n.read ? 'bg-slate-50 text-slate-500' : 'bg-primary-light/40 text-navy-900 font-medium'
                      }`}
                    >
                      <div className="leading-snug">{n.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 border-l border-surface-border"
            >
              <div className="w-8 h-8 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-xs ring-2 ring-primary/20">
                EV
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-surface-border p-2 z-40 text-xs">
                <div className="p-2 border-b border-surface-border">
                  <div className="font-bold text-navy-900">E. Vance</div>
                  <div className="text-slate-400">VP Plant Operations</div>
                  <div className="text-[10px] font-mono text-primary mt-0.5">Approval Authority: $50,000</div>
                </div>
                <div className="pt-2 text-slate-500 space-y-1">
                  <div className="px-2 py-1 text-slate-600">Enterprise Role: COO / VP Operations</div>
                  <div className="px-2 py-1 text-slate-600">Seiretsu ID: US-RIV-EXEC-01</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
