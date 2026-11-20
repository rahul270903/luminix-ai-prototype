import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteId, AutonomyLevel } from '../../types';
import {
  ShieldCheck,
  Lock,
  SunMedium,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  Cpu,
  KeyRound,
  Shield,
  Layers,
  Sparkles,
  Server,
  Activity,
  AlertCircle
} from 'lucide-react';

export const SignInScreen: React.FC = () => {
  const { signIn, presetUsers } = useApp();

  const [activeTab, setActiveTab] = useState<'personas' | 'credentials'>('personas');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(presetUsers[0].id);

  // Form inputs for credentials
  const [email, setEmail] = useState('e.vance@riverside-industrial.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [targetSite, setTargetSite] = useState<SiteId>('all');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handlePersonaSignIn = (presetId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      signIn({ userPresetId: presetId });
      setIsLoading(false);
    }, 400);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      signIn({ email, password });
      setIsLoading(false);
    }, 500);
  };

  const handleSsoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      signIn({ userPresetId: 'user-vance' });
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row bg-slate-900 text-white font-sans overflow-x-hidden">
      {/* Left Column: Industrial Brand & Zero Write Architecture */}
      <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
              <SunMedium className="w-6 h-6 text-navy-950" />
            </div>
            <div>
              <div className="text-xl font-black tracking-wider text-white flex items-center gap-2">
                <span>LUMINIX</span>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-primary text-white">Ai</span>
              </div>
              <div className="text-xs font-mono text-slate-400">Industrial Data Context Layer</div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal border border-teal-500/30 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              Seiretsu Ai Ecosystem Operational Gateway
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Industrial context for autonomous operations.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Luminix continuously ingests, models, and trust-scores raw telemetry from SCADA, Historians, PLCs, and IoT edge nodes, serving verifiable operational facts to AI decision centers without touching industrial control write paths.
            </p>
          </div>

          {/* 3 Architectural Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-teal font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero Write Path</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Read-only OT taps. Luminix never issues direct commands to PLCs, RTUs, or actuators.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-primary-light font-semibold text-xs">
                <Layers className="w-4 h-4 shrink-0" />
                <span>ISA-95 Context</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Maps physical equipment to CMMS work orders, EHS permits, and ERP sales commitments.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Cpu className="w-4 h-4 shrink-0" />
                <span>Sirach Decisioning</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                AI evaluates operational options and financial risk; humans authorize every action.
              </p>
            </div>
          </div>
        </div>

        {/* Live Ingestion Telemetry Footer */}
        <div className="relative z-10 pt-8 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>12 Connectors Active</span>
            </span>
            <span>·</span>
            <span>24,830 Governed Tags</span>
            <span>·</span>
            <span className="text-teal">99.4% Trust Rating</span>
          </div>
          <span className="text-[11px] text-slate-400">FIPS 140-3 · SOC2 Type II</span>
        </div>
      </div>

      {/* Right Column: Authentication Form / Persona Switcher */}
      <div className="lg:w-1/2 p-6 lg:p-14 flex flex-col justify-center bg-slate-950">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                Enterprise Session Login
              </span>
              <span className="text-[10px] font-mono bg-navy-800 text-slate-400 px-2 py-0.5 rounded border border-navy-700">
                PROTOTYPE DEMO
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Sign in to Luminix Ai
            </h2>
            <p className="text-xs text-slate-400">
              Select an industrial operator persona or sign in with your enterprise credentials.
            </p>
          </div>

          {/* Tab Switcher: Personas vs Credentials */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('personas')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                activeTab === 'personas'
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>1-Click Personas</span>
            </button>
            <button
              onClick={() => setActiveTab('credentials')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                activeTab === 'credentials'
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Enterprise Credentials</span>
            </button>
          </div>

          {/* TAB 1: 1-Click Persona Selection */}
          {activeTab === 'personas' ? (
            <div className="space-y-3">
              <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">
                Select an Authorized Role:
              </div>

              <div className="space-y-2.5">
                {presetUsers.map(u => {
                  const isSelected = selectedPersonaId === u.id;
                  return (
                    <div
                      key={u.id}
                      onClick={() => setSelectedPersonaId(u.id)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                          : 'border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ring-2 ${
                          isSelected
                            ? 'bg-primary text-white ring-primary/40'
                            : 'bg-navy-800 text-slate-300 ring-slate-700'
                        }`}>
                          {u.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{u.name}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-teal border border-slate-700">
                              {u.siteName.split('(')[0]}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 font-medium">{u.role}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            Authority: {u.approvalLimit} · Policy: {u.autonomyPolicy.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePersonaSignIn(u.id);
                        }}
                        disabled={isLoading}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                          isSelected
                            ? 'bg-primary text-white hover:bg-primary-hover shadow-sm'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <span>Sign In</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Instant Sign In Primary Button */}
              <button
                onClick={() => handlePersonaSignIn(selectedPersonaId)}
                disabled={isLoading}
                className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-primary-hover hover:brightness-105 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Luminix Cockpit as Selected Persona</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* TAB 2: Standard Enterprise Credentials Form */
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 block">
                  Enterprise Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300 block">
                    Password / Token
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">Demo: any key accepted</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-9 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-2xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 block">
                  Target Industrial Facility
                </label>
                <select
                  value={targetSite}
                  onChange={e => setTargetSite(e.target.value as SiteId)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                >
                  <option value="all">All Facilities (Global Tenancy)</option>
                  <option value="riverside">Riverside Plant (Food & Beverage)</option>
                  <option value="water-station-7">Water Utility – Station 7 (Austin, TX)</option>
                  <option value="fulfillment-3">Fulfillment Center – Site 3 (Logistics)</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-primary focus:ring-0"
                  />
                  <span>Remember session on this DMZ terminal</span>
                </label>

                <a href="#demo" onClick={(e) => { e.preventDefault(); handleSsoSignIn(); }} className="text-xs text-primary hover:underline">
                  SSO Help
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow flex items-center justify-center gap-2 transition"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize & Sign In</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Enterprise SSO Alternative */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <button
              onClick={handleSsoSignIn}
              disabled={isLoading}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Shield className="w-3.5 h-3.5 text-teal" />
              <span>Continue with Seiretsu Okta / Azure Entra ID SSO</span>
            </button>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Industrial Control Write Path Policy</span>
              </div>
              <p className="leading-relaxed">
                Authentication grants read-only contextual access to OT/IT telemetry streams. Machine setpoint modifications require Sirach governance and human authorization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
