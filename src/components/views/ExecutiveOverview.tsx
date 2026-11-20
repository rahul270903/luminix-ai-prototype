import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Cpu,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  TrendingUp,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SeverityBadge, TrustScoreBadge } from '../common/Badge';

export const ExecutiveOverview: React.FC = () => {
  const {
    selectedSite,
    timeRange,
    assets,
    events,
    approvalRequests,
    outcomes,
    openGuidedDemo,
    approveRequest
  } = useApp();

  const navigate = useNavigate();

  // Mock performance chart data
  const productionData = [
    { time: '00:00', oee: 84, target: 85, output: 420 },
    { time: '04:00', oee: 83, target: 85, output: 415 },
    { time: '08:00', oee: 81, target: 85, output: 390 },
    { time: '12:00', oee: 78, target: 85, output: 360 }, // drop due to P-104 friction
    { time: '16:00', oee: 79, target: 85, output: 375 },
    { time: '20:00', oee: 80, target: 85, output: 385 },
  ];

  const trustDistributionData = [
    { name: 'High Trust (≥ 0.90)', value: 91.2, color: '#27B6A8' },
    { name: 'Medium Trust (0.75-0.89)', value: 6.4, color: '#E9AC45' },
    { name: 'Degraded / Flagged (< 0.75)', value: 2.4, color: '#E45D5D' },
  ];

  const energyTrendData = [
    { day: 'Mon', intensity: 19.4, baseline: 18.5 },
    { day: 'Tue', intensity: 18.9, baseline: 18.5 },
    { day: 'Wed', intensity: 19.8, baseline: 18.5 }, // spike from friction
    { day: 'Thu', intensity: 18.6, baseline: 18.5 },
    { day: 'Fri', intensity: 18.2, baseline: 18.5 },
  ];

  const pendingApprovals = approvalRequests.filter(r => r.status === 'pending');
  const activeEvents = events.filter(e => e.status === 'active');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Guided Demo Trigger & Executive Context */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-slate-800 text-white p-5 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-navy-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-primary/20 text-primary-light px-2 py-0.5 rounded">
              Closed-Loop Operational Intelligence
            </span>
            <span className="text-xs text-slate-300">· Active Site: {selectedSite.toUpperCase()}</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Executive Operations Cockpit · Seiretsu Ecosystem
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Luminix continuously ingests and trust-scores 42,500 points/sec across plant systems without touching control paths. Governed context is served to Sirach AI for ranked decision intelligence.
          </p>
        </div>

        <button
          onClick={() => openGuidedDemo(0)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-950 font-bold text-xs rounded-lg shadow flex items-center gap-2 shrink-0 transition"
        >
          <Sparkles className="w-4 h-4 text-navy-950" />
          <span>Launch Guided Demo Scenario (P-104)</span>
        </button>
      </div>

      {/* 8 Primary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Context Coverage */}
        <div
          onClick={() => navigate('/assets')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-primary/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Context Coverage</span>
            <Cpu className="w-4 h-4 text-primary group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">94.8%</div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+2.1% mapped this month</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">12,450 / 13,100 tags modeled</div>
        </div>

        {/* Trusted Data Points */}
        <div
          onClick={() => navigate('/connect-trust')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-teal/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Trusted Data Points</span>
            <ShieldCheck className="w-4 h-4 text-teal group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">91.2%</div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Above 0.90 trust threshold</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">2 gaps flagged, 1 stale feed</div>
        </div>

        {/* Active Events */}
        <div
          onClick={() => navigate('/events')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-rose/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Active Events</span>
            <AlertTriangle className="w-4 h-4 text-rose group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-2 font-mono">
            {activeEvents.length} <span className="text-xs text-slate-400 font-sans font-normal">(1 Critical)</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>P-104 Bearing Temp Excursion</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">$1.2M contract exposure</div>
        </div>

        {/* Plant Availability */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-primary/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Plant Availability</span>
            <Activity className="w-4 h-4 text-primary group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">96.4%</div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.8% vs last week</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Target: 95.0% SLA</div>
        </div>

        {/* Overall Equipment Effectiveness (OEE) */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-amber/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Overall OEE</span>
            <BarChart className="w-4 h-4 text-amber group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">81.4%</div>
          <div className="flex items-center gap-1 text-[11px] text-amber-700 mt-1 font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-1.2% (Line 2 Bottling dip)</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Governed formula v3.2</div>
        </div>

        {/* MTBF */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-amber/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Line 2 MTBF</span>
            <Clock className="w-4 h-4 text-amber group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">42.5 h</div>
          <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-14% (Degrading pump)</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Traced to Pump P-104</div>
        </div>

        {/* MTTR */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-teal/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Mean Time To Repair</span>
            <Clock className="w-4 h-4 text-teal group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">2.4 h</div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <TrendingDown className="w-3.5 h-3.5 text-teal" />
            <span>-0.4 h faster resolution</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">With pre-staged parts kits</div>
        </div>

        {/* Energy Intensity */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-primary/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Energy Intensity</span>
            <Zap className="w-4 h-4 text-primary group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">18.2 kWh</div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>-3.1% kWh/case cooled</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Benchmarked to plant best</div>
        </div>
      </div>

      {/* Main Grid: Charts & Operations Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Production Performance & Trust Quality */}
        <div className="lg:col-span-2 space-y-6">
          {/* Production Performance Chart */}
          <div className="bg-white p-5 rounded-xl border border-surface-border shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-navy-900">Line 2 OEE & Hourly Output Curve</h3>
                <p className="text-xs text-slate-500">Noticeable dip at 12:00 correlated with P-104 bearing temperature spike</p>
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded">
                Live OPC UA Telemetry
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productionData}>
                  <defs>
                    <linearGradient id="oeeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F7DF3" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#4F7DF3" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[70, 95]} stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#101827', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="oee" stroke="#4F7DF3" strokeWidth={2.5} fillOpacity={1} fill="url(#oeeGrad)" name="Actual OEE %" />
                  <Line type="monotone" dataKey="target" stroke="#E9AC45" strokeDasharray="4 4" strokeWidth={1.5} name="Target OEE (85%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Critical Assets Table */}
          <div className="bg-white p-5 rounded-xl border border-surface-border shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-navy-900">Critical Monitored Assets</h3>
                <p className="text-xs text-slate-500">Tier A assets under continuous anomaly surveillance</p>
              </div>
              <button
                onClick={() => navigate('/assets')}
                className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>View All 30 Assets</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-surface-border">
                  <tr>
                    <th className="py-2.5 px-3">Asset Name</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Health</th>
                    <th className="py-2.5 px-3">Key Reading</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {assets.slice(0, 4).map(asset => (
                    <tr key={asset.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-3 font-medium text-navy-900">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-slate-400" />
                          <span>{asset.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{asset.code}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <div>{asset.area}</div>
                        <div className="text-[10px] text-slate-400">{asset.line}</div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          asset.healthScore < 70 ? 'bg-rose-100 text-rose-800' :
                          asset.healthScore < 85 ? 'bg-amber-100 text-amber-800' :
                          'bg-teal-100 text-teal-800'
                        }`}>
                          {asset.healthScore}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-mono text-navy-900 font-semibold">
                          {asset.sensors[0]?.tag}: {asset.sensors[0]?.currentValue} {asset.sensors[0]?.unit}
                        </div>
                        <div className="text-[10px] text-slate-400">{asset.sensors[0]?.rateOfChange}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                          asset.healthStatus === 'degrading' ? 'bg-rose-500 animate-ping' :
                          asset.healthStatus === 'good' ? 'bg-teal-500' : 'bg-emerald-500'
                        }`} />
                        <span className="capitalize text-slate-700">{asset.healthStatus}</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => navigate('/assets')}
                          className="px-2 py-1 bg-slate-100 hover:bg-primary hover:text-white rounded text-[11px] text-slate-600 font-medium transition"
                        >
                          Context
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Sirach Decision Recommendations, Approvals & Trust Distribution */}
        <div className="space-y-6">
          {/* Urgent Sirach Recommendation Card */}
          <div className="bg-gradient-to-br from-white to-primary-light/30 p-5 rounded-xl border border-primary/30 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wide text-primary-dark">
                  Sirach Recommendation
                </span>
              </div>
              <span className="text-[10px] font-mono bg-primary text-white px-2 py-0.5 rounded font-bold">
                94% CONFIDENCE
              </span>
            </div>

            <h4 className="text-sm font-bold text-navy-900 mb-1">
              Pump P-104 Bearing Overhaul Tonight
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Sirach evaluated 4 operational paths. Recommends Option C: Execute 2.5h bearing replacement during scheduled 02:00 sanitation window.
            </p>

            <div className="bg-white/80 p-3 rounded-lg border border-primary/20 space-y-2 text-xs mb-3 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Cost:</span>
                <span className="font-semibold text-navy-900">$18,000 (Parts in stock)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unplanned Downtime:</span>
                <span className="font-semibold text-teal-dark">0 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Exposure Protected:</span>
                <span className="font-semibold text-emerald-600">$1,200,000 (Order #4471)</span>
              </div>
            </div>

            {/* Quick Action Button */}
            {pendingApprovals.length > 0 ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => approveRequest('REQ-8812')}
                  className="flex-1 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Night Overhaul</span>
                </button>
                <button
                  onClick={() => navigate('/decisions')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition"
                >
                  Compare Options
                </button>
              </div>
            ) : (
              <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal" />
                <span>Overhaul approved and scheduled in Trestara CMMS</span>
              </div>
            )}
          </div>

          {/* Data Quality & Trust Score Gauge */}
          <div className="bg-white p-5 rounded-xl border border-surface-border shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-navy-900">Data Trust Score (LX-04)</h3>
              <TrustScoreBadge score={0.912} />
            </div>
            <p className="text-xs text-slate-500 mb-4">Continuous integrity checking on 12,450 active tags</p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trustDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {trustDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [`${val}%`, 'Share']}
                    contentStyle={{ backgroundColor: '#101827', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 mt-2">
              {trustDistributionData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px]">{item.name}</span>
                  </div>
                  <span className="font-mono font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Outcome Summary */}
          <div className="bg-white p-5 rounded-xl border border-surface-border shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-navy-900">Recent Outcome Feed</h3>
              <button
                onClick={() => navigate('/outcomes')}
                className="text-xs text-primary hover:underline font-medium"
              >
                View History
              </button>
            </div>
            <div className="space-y-3">
              {outcomes.slice(0, 2).map(outcome => (
                <div key={outcome.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900">{outcome.assetName}</span>
                    <span className="text-[10px] text-teal-dark bg-teal-50 px-1.5 py-0.5 rounded font-medium border border-teal-200">
                      {outcome.result}
                    </span>
                  </div>
                  <div className="text-slate-600 line-clamp-1">{outcome.actionTaken}</div>
                  <div className="text-[11px] text-slate-500 font-mono pt-1 flex justify-between">
                    <span>Avoided: {outcome.downtimeAvoided}</span>
                    <span className="text-teal font-semibold">{outcome.costIncurred}</span>
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
