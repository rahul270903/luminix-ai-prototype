import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  X,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Database,
  Cpu,
  Layers,
  BarChart3,
  Code2,
  FileCheck,
  Send,
  Sparkles
} from 'lucide-react';

interface StepInfo {
  stepNumber: number;
  stageName: string;
  stageCode: 'connect' | 'model' | 'detect' | 'measure' | 'serve' | 'decide';
  title: string;
  headline: string;
  whatIsHappening: string;
  relevantData: Record<string, string | number>;
  contextAdded: string[];
  whyNextNeeded: string;
  actionRoute: string;
  actionLabel: string;
}

const STEPS: StepInfo[] = [
  {
    stepNumber: 1,
    stageName: 'CONNECT',
    stageCode: 'connect',
    title: 'Ingestion & Trust Scoring of Raw OT Signals',
    headline: 'Historian and OPC UA data received without touching control systems.',
    whatIsHappening: 'Luminix connectors (LX-01 & LX-S1) in the plant DMZ poll OSIsoft PI Historian and the Riverside Line 2 OPC UA server. Every raw point is time-aligned, checked for flatlines, and scored for trustworthiness (LX-04). 2 minor gaps flagged; 91.2% of points pass the confidence threshold.',
    relevantData: {
      'Source 1': 'OSIsoft PI Historian (PI-RIV-01)',
      'Source 2': 'Line 2 OPC UA (Kepware Server)',
      'Tag Read': 'RIV_L2_P104_TT104A',
      'Raw Value': '78.4 °C (Normal: 45-65°C)',
      'Trust Score': '0.98 / 1.00 (High)',
      'Control Path': 'STRICT READ-ONLY AIR GAP'
    },
    contextAdded: [
      'Verified physical timestamp synchronization',
      'Trust score (0.98) attached to prevent spurious alarm trips',
      'Engineering unit standardized from raw mV to °C'
    ],
    whyNextNeeded: 'A raw sensor tag "TT-104A" has no meaning on its own. It must be semantically anchored into the plant asset topology and operational hierarchy.',
    actionRoute: '/connect-trust',
    actionLabel: 'Inspect Connect & Trust Layer'
  },
  {
    stepNumber: 2,
    stageName: 'MODEL',
    stageCode: 'model',
    title: 'Asset & Process Context Mapping',
    headline: 'Sensor TT-104A mapped to Pump P-104, Line 2, Area B, Riverside Plant.',
    whatIsHappening: 'Luminix Asset Context Model (LX-02) and Knowledge Graph (LX-03) bind the temperature tag to Centrifugal Slurry Pump P-104. The asset model enriches the telemetry with operating limits (85°C trip), equipment owner (J. Patel), and connects it to open work order WO-3381 and customer order #4471 in ERP.',
    relevantData: {
      'Hierarchy': 'Riverside → Area B → Line 2 → P-104',
      'Asset Type': 'Centrifugal Slurry Pump (Tier A)',
      'Responsible Lead': 'J. Patel (Reliability Lead)',
      'Operating Limits': 'Warning: 80°C · Critical Limit: 85°C',
      'Linked WO': 'Trestara WO-3381 (Draft Overhaul)',
      'Linked Order': 'Apex Beverage #4471 ($1.2M value)'
    },
    contextAdded: [
      'Tag linked to physical equipment and line criticality',
      'Owner and operating thresholds contextualized',
      'Upstream/downstream process dependencies mapped'
    ],
    whyNextNeeded: 'Now that the equipment boundary is modeled, the continuous telemetry stream must be evaluated against anomaly models to detect abnormal drift before failure.',
    actionRoute: '/assets',
    actionLabel: 'View Asset Context Hierarchy'
  },
  {
    stepNumber: 3,
    stageName: 'DETECT',
    stageCode: 'detect',
    title: 'Anomaly Event & Days-to-Limit Forecasting',
    headline: 'Bearing temperature rises 17°C in 36 hours, approaching operating limit.',
    whatIsHappening: 'The Event Detection engine (LX-05) identifies that TT-104A has risen from 61.4°C to 78.4°C. Anomaly algorithms calculate a Days-to-Limit forecast of 2.0 days before breaching the 85°C thermal trip. The event is enriched with root-cause timeline assembly (LX-07) showing correlated motor vibration spikes.',
    relevantData: {
      'Event ID': 'EVT-104',
      'Severity': 'CRITICAL (Tier 1)',
      'Temp Rate': '+17.0°C in 36 hours',
      'Days to Limit': '2.0 Days (Projected Nov 22, 10:00)',
      'Vibration (VIB-104)': '4.82 mm/s (approaching 5.5 limit)',
      'Active Threat': 'Catastrophic motor seizure during production'
    },
    contextAdded: [
      'Alarms transformed into a single contextualized operational event',
      'Root-cause timeline cross-referencing vibration, grease logs, and current',
      'Days-to-limit countdown established'
    ],
    whyNextNeeded: 'Single asset anomalies must be weighed against line-wide operational metrics (OEE, MTBF) to determine broader systemic impact.',
    actionRoute: '/events',
    actionLabel: 'Examine Event & Anomaly Dossier'
  },
  {
    stepNumber: 4,
    stageName: 'MEASURE',
    stageCode: 'measure',
    title: 'Operational KPI Impact & Degradation Analysis',
    headline: 'Line 2 MTBF is declining; unplanned stops are increasing.',
    whatIsHappening: 'The Operational KPI Layer (LX-06) computes live metrics and cross-site benchmarks (LX-10). Line 2 Mean Time Between Failures (MTBF) has dropped 14% over the last 10 operating days, with 82% of the micro-stop variance traced directly to Pump P-104 bearing friction.',
    relevantData: {
      'Line 2 OEE': '78.2% (Target: 85.0%)',
      'Line 2 MTBF': '42.5 hrs (Down from 58.0 hrs baseline)',
      'Unplanned Downtime': '+4.2 hrs this month',
      'Energy Intensity': '+6.8% kWh/case due to mechanical drag',
      'Site Comparison': 'Line 2 trailing Plant Best (Line 1 at 86.4%)'
    },
    contextAdded: [
      'Governed, standardized OEE and MTBF formulas applied',
      'Variance attributed directly to the degrading pump bearing',
      'Quantified lost production capacity'
    ],
    whyNextNeeded: 'AI agents and decision-makers require a secure, cited retrieval interface to pull this complete multi-system context together.',
    actionRoute: '/kpis',
    actionLabel: 'Inspect Operational KPIs'
  },
  {
    stepNumber: 5,
    stageName: 'SERVE',
    stageCode: 'serve',
    title: 'Governed Context API Query & Citation Assembly',
    headline: 'Luminix serves trusted context, maintenance history, and customer order exposure.',
    whatIsHappening: 'Sirach invokes the Luminix Context API (LX-09): `GET /context/assets/P-104?caller=sirach&user=coo`. Luminix verifies RBAC permissions, packages the facts with cryptographic source citations (historian, Trestara, Veloris ERP), and serves a verified JSON payload with audit logging.',
    relevantData: {
      'Endpoint': 'GET /context/assets/P-104',
      'Caller / Role': 'sirach / Plant Operations Executive',
      'Trust Rating': '0.98 Verified',
      'Citations': '["historian:TT-104A", "trestara:WO-3381", "veloris:SO-4471"]',
      'Exposure': '$1.2M order at risk (Apex Beverage #4471)',
      'Audit Record': 'a-77812 (Cryptographically signed)'
    },
    contextAdded: [
      'Unified enterprise context package in sub-100ms',
      'Lineage tracking citing every individual database tag',
      'Full regulatory compliance and query audit logging'
    ],
    whyNextNeeded: 'With guaranteed facts, the Sirach decision engine can now reason over trade-offs and simulate alternative operational actions.',
    actionRoute: '/context-api',
    actionLabel: 'Open Context API Explorer'
  },
  {
    stepNumber: 6,
    stageName: 'DECIDE',
    stageCode: 'decide',
    title: 'Sirach Multi-Option Reasoning & Recommendation',
    headline: 'Sirach compares options and recommends bearing replacement during night shift.',
    whatIsHappening: 'Sirach simulates 4 operational alternatives (A: Run to threshold, B: Throttle load 25%, C: Night shift replacement, D: Emergency stop). Option C is ranked #1 with 94% confidence: replacement during scheduled 02:00-04:30 sanitation costs $18k and ensures $1.2M Order #4471 ships on Friday without unplanned line downtime.',
    relevantData: {
      'Option A': 'Run to Limit ($0 direct, 88% catastrophic seizure risk)',
      'Option B': 'Throttle Load 25% ($64k loss, late delivery penalty)',
      'Option C (Top)': 'Night Shift Overhaul ($18k, 0h unplanned stop)',
      'Option D': 'Emergency Trip ($148k cost, 4,200 dumped bottles)',
      'Selected': 'Option C (Confidence: 94%)',
      'AI Stance': 'DEMO AI OUTPUT · Governance Level: Approve'
    },
    contextAdded: [
      'Comparative financial exposure vs repair cost analysis',
      'Parts availability verified in warehouse (Bin C-14: SKF-6318)',
      'EHS hot work permit verified in Thorium'
    ],
    whyNextNeeded: 'In accordance with Level 3 Autonomy (Human Approve), Sirach cannot execute actions without explicit authorized human sign-off.',
    actionRoute: '/decisions',
    actionLabel: 'Explore Sirach Decision Center'
  },
  {
    stepNumber: 7,
    stageName: 'DECIDE',
    stageCode: 'decide',
    title: 'Human Approval & Governance Gate',
    headline: 'Plant VP reviews recommendation, evidence, and authorizes the maintenance request.',
    whatIsHappening: 'The decision request REQ-8812 appears in the Approval & Action Center inbox. The Plant VP (E. Vance) inspects the supporting telemetry evidence, verified warehouse inventory, and clicks "Approve". If rejected, the human provides a reason and feedback reroutes to Sirach.',
    relevantData: {
      'Request ID': 'REQ-8812',
      'Approver': 'E. Vance (VP Plant Operations)',
      'Authority Limit': '$50,000 (Cost $18,000 is within limit)',
      'Status': 'Pending Review → Approved',
      'Safety Check': 'No control write path; strictly dispatching business WO'
    },
    contextAdded: [
      'Legally binding human authorization record',
      'Approval timestamp and role logged in audit chain',
      'Pre-requisite gate satisfied for automated downstream dispatch'
    ],
    whyNextNeeded: 'Upon human authorization, Sirach agents must orchestrate work order creation in Trestara CMMS and parts purchase in SAIGEN ERP.',
    actionRoute: '/approvals',
    actionLabel: 'Go to Human Approval Inbox'
  },
  {
    stepNumber: 8,
    stageName: 'SERVE',
    stageCode: 'serve',
    title: 'Business Action Execution Simulation',
    headline: 'Simulate creation of maintenance work order and parts purchase request.',
    whatIsHappening: 'Sirach agents act through enterprise APIs: Trestara CMMS updates Work Order WO-3381 from draft to scheduled status (assigned to technician J. Patel for 02:00 EST tonight). SAIGEN ERP generates PO-9921 to reorder replacement bearing kit SKF-6318.',
    relevantData: {
      'CMMS System': 'Trestara Work Order WO-3381 Scheduled',
      'ERP System': 'SAIGEN Purchase Order PO-9921 Issued ($2,400)',
      'Assigned Tech': 'J. Patel (Vibration Certified Level III)',
      'Scheduled Window': 'Tonight 02:00 - 04:30 EST (Sanitation shift)',
      'Control Systems': '0 PLC/SCADA commands issued (READ-ONLY SAFE)'
    },
    contextAdded: [
      'Enterprise transaction confirmations received',
      'Maintenance schedule synchronized with plant production schedule',
      'Parts replenishment requisition triggered'
    ],
    whyNextNeeded: 'Once the maintenance crew completes the repair, the physical results and operational outcome must be logged to complete the continuous learning loop.',
    actionRoute: '/approvals',
    actionLabel: 'View Executed Actions Queue'
  },
  {
    stepNumber: 9,
    stageName: 'SERVE',
    stageCode: 'serve',
    title: 'Outcome Recording & Verification',
    headline: 'Technician records completed maintenance, vibration drops, and avoided downtime.',
    whatIsHappening: 'The maintenance team swaps the drive-end bearing, verifies laser shaft alignment, and submits outcome record OUT-904. Sensor TT-104A immediately cools from 78.4°C down to 52.1°C, and vibration drops from 4.82 mm/s to 1.4 mm/s. $1.2M Order #4471 ships on Friday with zero defects.',
    relevantData: {
      'Outcome ID': 'OUT-904',
      'Result': 'Optimal Restored · Order Protected',
      'Downtime Avoided': '18 hours of unplanned downtime avoided ($340,000 value)',
      'Actual Cost': '$17,450 (Below estimated $18,000 budget)',
      'Post-Repair Temp': '52.1 °C (Normal baseline restored)',
      'Post-Repair Vib': '1.4 mm/s (Within standard limits)'
    },
    contextAdded: [
      'Physical verification of defect resolution',
      'Actual vs projected financial savings calculated',
      'Work order marked closed in CMMS'
    ],
    whyNextNeeded: 'The recorded outcome must now feed back into the Knowledge Graph and asset context so Sirach learns and improves its models.',
    actionRoute: '/outcomes',
    actionLabel: 'Open Outcome Feedback Center'
  },
  {
    stepNumber: 10,
    stageName: 'CONNECT',
    stageCode: 'connect',
    title: 'Feedback Loop: Enriching the Knowledge Graph',
    headline: 'Outcome updates simulated event history, asset health, and AI decision models.',
    whatIsHappening: 'The decision loop closes: The outcome is linked back into the Luminix Knowledge Graph (LX-03). Pump P-104 health score rebounds from 68% (degrading) to 92% (optimal). Event EVT-104 is marked resolved. The decision result enriches Sirach’s reinforcement baseline, ensuring even higher accuracy on future equipment anomalies.',
    relevantData: {
      'Asset Health Score': 'Rebounded from 68% to 92% (Optimal)',
      'Event Status': 'EVT-104 Resolved',
      'Knowledge Graph': '+1 Outcome Edge, +1 Solution Node linked to P-104',
      'Sirach AI Model': 'Advice-acceptance metric updated (84% overall)',
      'Loop Status': 'CLOSED-LOOP CONTINUOUS ORCHESTRATION COMPLETE'
    },
    contextAdded: [
      'Historical precedence record stored for future bearing failures',
      'Confidence calibration updated for vibration-thermal correlation',
      'Asset digital twin updated to full operational capacity'
    ],
    whyNextNeeded: 'The orchestration cycle is complete! Luminix guarantees that every future operational decision is made on verified, contextualized facts.',
    actionRoute: '/workflow',
    actionLabel: 'Return to Orchestration Workflow'
  }
];

export const GuidedDemoModal: React.FC = () => {
  const {
    isGuidedDemoOpen,
    guidedStep,
    closeGuidedDemo,
    nextGuidedStep,
    prevGuidedStep,
    restartGuidedDemo,
    approveRequest
  } = useApp();

  const navigate = useNavigate();

  if (!isGuidedDemoOpen) return null;

  const currentStep = STEPS[guidedStep] || STEPS[0];
  const isFirst = guidedStep === 0;
  const isLast = guidedStep === STEPS.length - 1;

  const handleNavigate = (route: string) => {
    closeGuidedDemo();
    navigate(route);
  };

  const stageColors = {
    connect: 'bg-blue-600 text-white',
    model: 'bg-teal text-white',
    detect: 'bg-amber text-navy-950 font-semibold',
    measure: 'bg-purple-600 text-white',
    serve: 'bg-indigo-600 text-white',
    decide: 'bg-rose text-white',
  }[currentStep.stageCode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-surface-border w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-900 text-white border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 text-primary-light rounded-lg">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                  Interactive Guided Scenario
                </span>
                <span className="text-xs text-slate-400">· Riverside Plant Pump P-104</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                Step {currentStep.stepNumber} of 10: {currentStep.title}
              </h2>
            </div>
          </div>
          <button
            onClick={closeGuidedDemo}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar with 6 Stages */}
        <div className="bg-navy-950 px-6 py-2.5 border-b border-navy-800 flex items-center justify-between overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 w-full">
            {STEPS.map((s, idx) => {
              const active = idx === guidedStep;
              const completed = idx < guidedStep;
              return (
                <div
                  key={s.stepNumber}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                    active
                      ? 'bg-amber-400 ring-2 ring-amber-400/30'
                      : completed
                      ? 'bg-teal'
                      : 'bg-navy-800'
                  }`}
                  title={`Step ${idx + 1}: ${s.stageName}`}
                />
              );
            })}
          </div>
          <div className="shrink-0 ml-4 flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wide ${stageColors}`}>
              STAGE: {currentStep.stageName}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Headline Banner */}
          <div className="p-4 bg-slate-50 border border-surface-border rounded-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              Core Operational Event
            </div>
            <p className="text-base font-semibold text-navy-900 leading-relaxed">
              {currentStep.headline}
            </p>
          </div>

          {/* 2 Column Layout: Explanation & Data Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: What is happening & Context Added */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                  What is Happening
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-white p-3.5 border border-slate-200 rounded-lg">
                  {currentStep.whatIsHappening}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                  Context Added to Knowledge Graph
                </h4>
                <ul className="space-y-1.5 bg-teal-50/60 p-3.5 border border-teal-200/60 rounded-lg text-xs text-slate-700">
                  {currentStep.contextAdded.map((ctx, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal font-bold shrink-0 mt-0.5">•</span>
                      <span>{ctx}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Relevant Data & Why Next Needed */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-amber" />
                  Telemetry & System Records
                </h4>
                <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg font-mono text-xs space-y-2 border border-slate-800">
                  {Object.entries(currentStep.relevantData).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-start gap-2 border-b border-slate-800/80 pb-1.5 last:border-none last:pb-0">
                      <span className="text-slate-400 shrink-0">{key}:</span>
                      <span className="text-emerald-400 text-right font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  Why the Next Stage is Needed
                </h4>
                <p className="text-xs text-slate-600 bg-amber-50/60 border border-amber-200/60 p-3.5 rounded-lg leading-relaxed">
                  {currentStep.whyNextNeeded}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Step Quick-Action (e.g. Approve on step 7) */}
          {guidedStep === 6 && (
            <div className="bg-primary-light/50 border border-primary/20 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-primary" />
                <div>
                  <div className="text-sm font-semibold text-navy-900">Interactive Action Available: Approve REQ-8812</div>
                  <div className="text-xs text-slate-600">Simulate the human executive signing off on the $18,000 night shift overhaul.</div>
                </div>
              </div>
              <button
                onClick={() => {
                  approveRequest('REQ-8812');
                  nextGuidedStep();
                }}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm shrink-0 flex items-center gap-1.5 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve & Advance
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-surface-border flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={restartGuidedDemo}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-200/70 rounded-lg flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restart Scenario
            </button>
            <button
              onClick={() => handleNavigate(currentStep.actionRoute)}
              className="px-3 py-2 text-xs font-medium text-primary hover:bg-primary-light rounded-lg flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {currentStep.actionLabel}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevGuidedStep}
              disabled={isFirst}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                isFirst
                  ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                  : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Step
            </button>

            {isLast ? (
              <button
                onClick={closeGuidedDemo}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-teal hover:bg-teal-dark text-white flex items-center gap-1.5 shadow-sm transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                Finish Guided Walkthrough
              </button>
            ) : (
              <button
                onClick={nextGuidedStep}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-primary hover:bg-primary-hover text-white flex items-center gap-1.5 shadow-sm transition"
              >
                Next Step ({guidedStep + 2}/10)
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
