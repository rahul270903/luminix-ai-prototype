import React, { useState } from 'react';
import { GRAPH_NODES, GRAPH_EDGES, GraphNode } from '../../data/graphData';
import {
  Share2,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  ArrowRight,
  Info,
  Maximize2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const KnowledgeGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('P-104');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const nodeTypes = ['all', 'Site', 'Area', 'Line', 'Asset', 'Sensor', 'Event', 'WorkOrder', 'Person', 'Customer', 'Order', 'Product'];

  // Colors per node type
  const typeColors: Record<string, { bg: string; border: string; text: string; fill: string }> = {
    Site: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800', fill: '#9333EA' },
    Area: { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-800', fill: '#4F46E5' },
    Line: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800', fill: '#2563EB' },
    Asset: { bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-800', fill: '#0D9488' },
    Sensor: { bg: 'bg-cyan-100', border: 'border-cyan-300', text: 'text-cyan-800', fill: '#06B6D4' },
    Event: { bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-800', fill: '#E11D48' },
    WorkOrder: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-800', fill: '#D97706' },
    Person: { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-800', fill: '#059669' },
    Customer: { bg: 'bg-fuchsia-100', border: 'border-fuchsia-300', text: 'text-fuchsia-800', fill: '#C026D3' },
    Order: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-800', fill: '#DB2777' },
    Product: { bg: 'bg-sky-100', border: 'border-sky-300', text: 'text-sky-800', fill: '#0284C7' },
  };

  const selectedNode = GRAPH_NODES.find(n => n.id === selectedNodeId) || GRAPH_NODES[3];

  // Connected edges
  const connectedEdges = GRAPH_EDGES.filter(
    e => e.source === selectedNode.id || e.target === selectedNode.id
  );

  // Neighbor nodes
  const neighborNodeIds = connectedEdges.map(e =>
    e.source === selectedNode.id ? e.target : e.source
  );

  const neighborNodes = GRAPH_NODES.filter(n => neighborNodeIds.includes(n.id));

  // Filtered nodes for the interactive graph
  const filteredNodes = GRAPH_NODES.filter(n => {
    const matchesType = filterType === 'all' || n.type === filterType;
    const matchesSearch =
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Calculate SVG positions for nice layout
  // Center is selectedNode: (450, 240)
  // Neighbors placed in circle around center
  const centerX = 440;
  const centerY = 240;
  const radius = 170;

  const positions: Record<string, { x: number; y: number }> = {
    [selectedNode.id]: { x: centerX, y: centerY },
  };

  neighborNodes.forEach((neighbor, idx) => {
    const angle = (idx / neighborNodes.length) * 2 * Math.PI - Math.PI / 2;
    positions[neighbor.id] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
              Topology & Semantic Model (LX-03)
            </span>
            <span className="text-xs text-slate-500">· 148,200 Graph Nodes · 684,100 Graph Edges</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Industrial Knowledge Graph Explorer
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-domain graph engine connecting physical machine sensors with ERP sales orders, work orders, people, and customer contracts.
          </p>
        </div>

        {/* Search and Node Type Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search graph entities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-1 focus:ring-primary w-48"
            />
          </div>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none"
          >
            {nodeTypes.map(t => (
              <option key={t} value={t}>
                {t === 'all' ? 'All Node Types' : t}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSelectedNodeId('P-104')}
            className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-2xs hover:bg-primary-hover transition"
          >
            Focus Pump P-104
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Graph on Left, Node Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Graph Canvas (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[540px]">
          {/* Canvas Header / Legend */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-300">
                Focus Node: <strong className="text-white">{selectedNode.name}</strong> ({selectedNode.type})
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {neighborNodes.length} direct relationships mapped
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full h-[450px] my-auto">
            <svg className="w-full h-full" viewBox="0 0 880 480">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="18"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
                </marker>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Edges */}
              {neighborNodes.map(neighbor => {
                const p1 = positions[selectedNode.id];
                const p2 = positions[neighbor.id];
                if (!p1 || !p2) return null;

                const edge = connectedEdges.find(
                  e =>
                    (e.source === selectedNode.id && e.target === neighbor.id) ||
                    (e.target === selectedNode.id && e.source === neighbor.id)
                );

                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;

                return (
                  <g key={neighbor.id}>
                    <line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="#475569"
                      strokeWidth="2"
                      strokeDasharray={edge?.type === 'operational' ? '4 4' : undefined}
                      markerEnd="url(#arrowhead)"
                    />
                    {edge && (
                      <text
                        x={midX}
                        y={midY - 6}
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                        className="bg-slate-900"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Neighbor Nodes */}
              {neighborNodes.map(n => {
                const pos = positions[n.id];
                if (!pos) return null;
                const color = typeColors[n.type] || typeColors.Asset;

                return (
                  <g
                    key={n.id}
                    onClick={() => setSelectedNodeId(n.id)}
                    className="cursor-pointer transition transform hover:scale-110"
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="22"
                      fill="#1E293B"
                      stroke={color.fill}
                      strokeWidth="3"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                    >
                      {n.type.slice(0, 3).toUpperCase()}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 36}
                      fill="#E2E8F0"
                      fontSize="11"
                      fontWeight="500"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                    >
                      {n.name}
                    </text>
                  </g>
                );
              })}

              {/* Center Selected Node */}
              <g className="cursor-pointer">
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="34"
                  fill="#0F172A"
                  stroke="#4F7DF3"
                  strokeWidth="4"
                  filter="url(#glow)"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="28"
                  fill="#4F7DF3"
                  opacity="0.25"
                />
                <text
                  x={centerX}
                  y={centerY + 5}
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                >
                  {selectedNode.id}
                </text>
                <text
                  x={centerX}
                  y={centerY + 52}
                  fill="#F8FAFC"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                >
                  {selectedNode.name}
                </text>
              </g>
            </svg>
          </div>

          {/* Quick Node Type Pill Legend */}
          <div className="flex items-center gap-1.5 flex-wrap z-10 pt-2 border-t border-slate-800 text-[10px]">
            {Object.entries(typeColors).slice(0, 8).map(([type, c]) => (
              <span key={type} className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.fill }} />
                <span>{type}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Selected Entity Context & Traversal Panel */}
        <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-xs space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase font-mono ${typeColors[selectedNode.type]?.bg} ${typeColors[selectedNode.type]?.text}`}>
                {selectedNode.type}
              </span>
              <span className="text-xs font-mono text-slate-400">Node ID: {selectedNode.id}</span>
            </div>
            <h3 className="text-lg font-bold text-navy-900">{selectedNode.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Category: {selectedNode.category}</p>
          </div>

          {/* Entity Attributes Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Entity Attributes
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs font-mono space-y-1.5">
              {Object.entries(selectedNode.details).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-none last:pb-0">
                  <span className="text-slate-500 capitalize">{k}:</span>
                  <span className="font-semibold text-navy-900">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Neighbor Traversal List */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Connected Relationships ({neighborNodes.length})</span>
              <span className="text-[10px] text-slate-400">Click to Traverse</span>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {neighborNodes.map(neighbor => {
                const edge = connectedEdges.find(
                  e =>
                    (e.source === selectedNode.id && e.target === neighbor.id) ||
                    (e.target === selectedNode.id && e.source === neighbor.id)
                );

                return (
                  <div
                    key={neighbor.id}
                    onClick={() => setSelectedNodeId(neighbor.id)}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-primary/50 hover:bg-slate-50 cursor-pointer transition flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="font-bold text-navy-900 group-hover:text-primary transition">
                        {neighbor.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {edge?.label} → {neighbor.type}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Primary Use-Case Citation Callout */}
          {selectedNode.id === 'P-104' && (
            <div className="p-3 bg-primary-light/60 border border-primary/30 rounded-xl text-xs text-navy-900 space-y-1">
              <div className="font-bold text-primary-dark flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Primary Scenario: Pump P-104 Context Chain</span>
              </div>
              <p className="text-slate-700 leading-snug">
                P-104 links upstream to Bottling Line 2 and customer order #4471 ($1.2M), and links downstream to sensor TT-104A and work order WO-3381. Sirach uses this graph traversal to prove financial risk before recommending repair.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
