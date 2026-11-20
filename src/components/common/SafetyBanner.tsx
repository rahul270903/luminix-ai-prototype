import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const SafetyBanner: React.FC<{ compact?: boolean }> = ({ compact }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-700 text-xs font-medium">
        <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span className="font-semibold tracking-wide">READ-ONLY INDUSTRIAL DATA</span>
        <span className="hidden sm:inline text-amber-600/70">· NO CONTROL WRITE PATH</span>
      </div>
    );
  }

  return (
    <div className="bg-navy-900 border-l-4 border-amber-500 text-white px-4 py-2.5 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 my-3">
      <div className="flex items-start md:items-center gap-3">
        <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-md shrink-0 mt-0.5 md:mt-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide text-xs uppercase bg-amber-500 text-navy-950 px-2 py-0.5 rounded font-mono">
              Critical Safety Architecture
            </span>
            <span className="text-sm font-semibold text-slate-200">
              READ-ONLY INDUSTRIAL DATA · NO CONTROL WRITE PATH
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Luminix never issues commands to PLCs, RTUs, or HMIs. Operations actions are routed exclusively through Sirach agents into business systems (work orders, purchase orders, dispatch) with mandatory human approval.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 text-xs text-slate-400 self-end md:self-center">
        <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
        <span className="font-mono">DMZ AIR-GAP ENFORCED</span>
      </div>
    </div>
  );
};
