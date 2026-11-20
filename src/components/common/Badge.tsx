import React from 'react';
import { EventSeverity, AutonomyLevel } from '../../types';

export const SeverityBadge: React.FC<{ severity: EventSeverity }> = ({ severity }) => {
  const styles = {
    critical: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20',
    high: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
    medium: 'bg-blue-50 text-primary-dark border-primary-light ring-primary/20',
    low: 'bg-slate-50 text-slate-700 border-slate-200 ring-slate-500/20',
  }[severity];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider border ring-1 ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        severity === 'critical' ? 'bg-rose-500 animate-pulse' :
        severity === 'high' ? 'bg-amber-500' :
        severity === 'medium' ? 'bg-primary' : 'bg-slate-400'
      }`} />
      {severity}
    </span>
  );
};

export const TrustScoreBadge: React.FC<{ score: number; showLabel?: boolean }> = ({ score, showLabel = true }) => {
  const isHigh = score >= 0.90;
  const isMed = score >= 0.75 && score < 0.90;

  const colorClass = isHigh
    ? 'bg-teal-50 text-teal-dark border-teal-200'
    : isMed
    ? 'bg-amber-50 text-amber-dark border-amber-200'
    : 'bg-rose-50 text-rose-dark border-rose-200';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium border ${colorClass}`}>
      {showLabel && <span className="text-[10px] uppercase font-sans text-slate-500">Trust:</span>}
      <span>{(score * 100).toFixed(0)}%</span>
    </span>
  );
};

export const AutonomyBadge: React.FC<{ level: AutonomyLevel }> = ({ level }) => {
  const map: Record<AutonomyLevel, { name: string; style: string }> = {
    inform: { name: 'Level 1: Inform', style: 'bg-slate-100 text-slate-700 border-slate-300' },
    advise: { name: 'Level 2: Advise', style: 'bg-blue-50 text-primary border-primary/30' },
    approve: { name: 'Level 3: Human Approve', style: 'bg-amber-50 text-amber-800 border-amber-300 font-semibold' },
    autonomous: { name: 'Level 4: Playbooks', style: 'bg-teal-50 text-teal-800 border-teal-300' },
  };

  const item = map[level];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${item.style}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {item.name}
    </span>
  );
};
