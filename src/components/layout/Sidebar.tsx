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
  SunMedium,
  LogOut
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
  const { approvalRequests, events, scadaNetworkCondition, currentUser, signOut } = useApp();

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

      {/* Footer Operator Profile & Sign Out Action */}
      <div className="p-3 border-t border-navy-800 bg-navy-950/70 text-xs">
        {!collapsed ? (
          <div className="space-y-2.5">
            {/* Operator Card */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-navy-900/80 border border-navy-800/80">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center font-bold text-[11px] shrink-0 ring-1 ring-primary/40">
                  {currentUser?.initials || 'EV'}
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-white text-[11px] truncate leading-tight">
                    {currentUser?.name || 'E. Vance'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate leading-tight">
                    {currentUser?.role.split('/')[0] || 'Executive'}
                  </div>
                </div>
              </div>

              <button
                onClick={signOut}
                title="Sign out of Luminix"
                className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-navy-800 transition shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>LUMINIX v1.0</span>
              </span>
              <span className="text-teal font-semibold">Seiretsu Ai</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={signOut}
              title={`Signed in as ${currentUser?.name}. Click to sign out.`}
              className="w-7 h-7 rounded-md bg-navy-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 flex items-center justify-center text-[10px] font-bold font-mono transition"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Luminix Active" />
          </div>
        )}
      </div>
    </aside>
  );
};
