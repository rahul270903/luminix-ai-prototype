import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  GitBranch,
  Database,
  ShieldCheck,
  Cpu,
  Share2,
  AlertTriangle,
  GitPullRequest,
  BarChart3,
  Code2,
  Box,
  BrainCircuit,
  CheckSquare,
  Repeat,
  Radio,
  Factory,
  Layers,
  ChevronLeft,
  ChevronRight,
  SunMedium
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: any;
  highlight?: boolean;
  count?: number;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { approvalRequests, events, scadaNetworkCondition } = useApp();

  const pendingApprovalsCount = approvalRequests.filter(r => r.status === 'pending').length;
  const activeEventsCount = events.filter(e => e.status === 'active').length;

  const navSections: NavSection[] = [
    {
      heading: 'Operations & Strategy',
      items: [
        { path: '/', label: 'Executive Overview', icon: LayoutDashboard },
        { path: '/workflow', label: 'Orchestration Workflow', icon: GitBranch, highlight: true },
        { path: '/governance', label: 'Governance & Phasing', icon: ShieldCheck },
        { path: '/modules', label: 'Module Catalog (LX-01..10)', icon: Layers },
      ]
    },
    {
      heading: 'Data Ingestion & Quality',
      items: [
        { path: '/sources', label: 'Data Sources', icon: Database },
        { path: '/connect-trust', label: 'Connect & Trust', icon: ShieldCheck },
        { path: '/scada', label: 'SCADA Integration', icon: Radio, badge: scadaNetworkCondition !== 'healthy' ? 'Alert' : undefined },
      ]
    },
    {
      heading: 'Semantic Model & Twin',
      items: [
        { path: '/assets', label: 'Asset Context', icon: Cpu },
        { path: '/graph', label: 'Knowledge Graph', icon: Share2 },
        { path: '/digital-twin', label: 'Digital Twin', icon: Box },
      ]
    },
    {
      heading: 'Detection & Analytics',
      items: [
        { path: '/events', label: 'Events & Anomalies', icon: AlertTriangle, count: activeEventsCount, badgeColor: 'bg-rose text-white' },
        { path: '/root-cause', label: 'Root Cause Analysis', icon: GitPullRequest },
        { path: '/kpis', label: 'Operational KPIs', icon: BarChart3 },
      ]
    },
    {
      heading: 'AI Decisioning & Loop',
      items: [
        { path: '/context-api', label: 'Context API', icon: Code2 },
        { path: '/ecosystem', label: 'Ecosystem Consumers', icon: Layers },
        { path: '/decisions', label: 'Sirach Decision Center', icon: BrainCircuit, badge: 'AI' },
        { path: '/approvals', label: 'Approval & Action Center', icon: CheckSquare, count: pendingApprovalsCount, badgeColor: 'bg-amber text-navy-950 font-bold' },
        { path: '/outcomes', label: 'Outcome Feedback', icon: Repeat },
        { path: '/industries', label: 'Industry Solutions', icon: Factory },
      ]
    }
  ];

  return (
    <aside
      className={`bg-navy-900 border-r border-navy-800 text-slate-300 flex flex-col shrink-0 transition-all duration-300 relative z-20 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-navy-800">
        {!collapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
              <SunMedium className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>LUMINIX</span>
                <span className="text-[10px] bg-primary/20 text-primary-light font-mono px-1.5 py-0.2 rounded">Ai</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">Industrial Data Context Layer</div>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <SunMedium className="w-5 h-5 text-amber-400" />
          </div>
        )}

        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-navy-800 transition"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navSections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-0.5">
            {!collapsed && (
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-1">
                {sec.heading}
              </div>
            )}
            {sec.items.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-sm font-semibold'
                        : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                    } ${item.highlight && !collapsed ? 'border-l-2 border-amber-400' : ''}`
                  }
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.count !== undefined && item.count > 0 && (
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-primary-light text-primary-dark'}`}>
                          {item.count}
                        </span>
                      )}
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-navy-800 text-teal border border-navy-700">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Profile & Ecosystem Notice */}
      <div className="p-3 border-t border-navy-800 bg-navy-950/60 text-xs">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Ecosystem</span>
              <span className="font-mono text-[10px] text-teal font-semibold">Seiretsu Ai</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LUMINIX v1.0 · DEMO</span>
            </div>
          </div>
        ) : (
          <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto" title="Luminix Active" />
        )}
      </div>
    </aside>
  );
};
