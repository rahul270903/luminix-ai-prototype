import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApprovalRequest } from '../../types';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  Clock,
  DollarSign,
  AlertTriangle,
  BrainCircuit,
  ShieldCheck,
  Send,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const ApprovalActionCenter: React.FC = () => {
  const { approvalRequests, approveRequest, rejectRequest, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [viewEvidenceRequest, setViewEvidenceRequest] = useState<ApprovalRequest | null>(null);
  const [infoRequest, setInfoRequest] = useState<ApprovalRequest | null>(null);

  const pendingRequests = approvalRequests.filter(r => r.status === 'pending');
  const historyRequests = approvalRequests.filter(r => r.status !== 'pending');

  const handleConfirmReject = () => {
    if (!rejectingRequestId || !rejectReason.trim()) {
      showToast('Please provide a reason for rejecting the action', 'warning');
      return;
    }
    rejectRequest(rejectingRequestId, rejectReason);
    setRejectingRequestId(null);
    setRejectReason('');
  };

  const handleRequestInfo = (req: ApprovalRequest) => {
    showToast(`Inquiry sent to ${req.requestingAgent}: Requesting additional vibration harmonic charts`, 'info');
    setInfoRequest(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
              Human Governance Gate (Level 3 Autonomy)
            </span>
            <span className="text-xs text-slate-500">· Plant VP Authority: $50,000</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mt-1">
            Approval & Action Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational sign-off inbox. Sirach agents prepare business work orders, dispatch notices, and purchase requests for human approval.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'pending'
                ? 'bg-white text-navy-900 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-navy-900'
            }`}
          >
            Pending Actions ({pendingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'history'
                ? 'bg-white text-navy-900 shadow-2xs'
                : 'text-slate-500 hover:text-navy-900'
            }`}
          >
            Signed & Executed ({historyRequests.length})
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {activeTab === 'pending' && pendingRequests.length === 0 && (
          <div className="bg-white p-12 rounded-2xl border border-surface-border text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-teal mx-auto" />
            <h3 className="text-base font-bold text-navy-900">Inbox Zero · No Pending Human Approvals</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              All Sirach AI recommendations have been authorized or reviewed. Plant systems and execution queues are up to date.
            </p>
          </div>
        )}

        {(activeTab === 'pending' ? pendingRequests : historyRequests).map(req => {
          const isPending = req.status === 'pending';
          const isApproved = req.status === 'approved';
          const isRejected = req.status === 'rejected';

          return (
            <div
              key={req.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition space-y-4 ${
                isPending ? 'border-primary/40 shadow-sm' : 'border-surface-border'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-navy-900 text-amber-400 px-2 py-0.5 rounded">
                      {req.id}
                    </span>
                    <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {req.requestType}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded font-mono ${
                      isPending ? 'bg-amber-100 text-amber-900' :
                      isApproved ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy-900 mt-1">{req.title}</h3>
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">
                    Target: {req.assetName} · Site: {req.siteName} · Agent: {req.requestingAgent}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Estimated Financials</span>
                  <span className="text-base font-bold text-navy-900 font-mono">{req.cost}</span>
                </div>
              </div>

              {/* Recommendation & Business Impact Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Sirach Proposed Action</span>
                  <p className="font-medium text-navy-900 mt-0.5 leading-relaxed">{req.recommendation}</p>
                </div>
                <div className="p-3 bg-primary-light/40 rounded-xl border border-primary/20">
                  <span className="text-primary-dark block text-[10px] font-bold uppercase">Business Impact & Value Protection</span>
                  <p className="font-medium text-navy-900 mt-0.5 leading-relaxed">{req.businessImpact}</p>
                </div>
              </div>

              {/* Action Buttons for Pending */}
              {isPending && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewEvidenceRequest(req)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Evidentiary Dossier ({req.evidence.length})</span>
                    </button>

                    <button
                      onClick={() => setInfoRequest(req)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Request More Info</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRejectingRequestId(req.id)}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject with Reason</span>
                    </button>

                    <button
                      onClick={() => approveRequest(req.id)}
                      className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Authorize & Sign Off</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Signed Status Note */}
              {!isPending && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between font-mono">
                  <span className="text-slate-500">
                    {isApproved
                      ? `Approved by ${req.approvedBy} at ${req.approvedAt}`
                      : `Rejected: "${req.rejectionReason}"`}
                  </span>
                  <span className="text-teal font-semibold">Trestara Dispatch Synchronized</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reject Reason Modal */}
      {rejectingRequestId && (
        <Modal
          isOpen={!!rejectingRequestId}
          onClose={() => setRejectingRequestId(null)}
          title="Reject Proposed Sirach Action"
          subtitle="Mandatory feedback loop: Your reason will retrain Sirach's decision models."
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-navy-900 font-bold block mb-1">
                Reason for Rejection:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Sanitation window is shortened due to emergency product run; postpone overhaul to weekend..."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-navy-900 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingRequestId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-xs"
              >
                Confirm Rejection & Route Feedback
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Evidence Modal */}
      {viewEvidenceRequest && (
        <Modal
          isOpen={!!viewEvidenceRequest}
          onClose={() => setViewEvidenceRequest(null)}
          title={`Evidentiary Dossier: ${viewEvidenceRequest.id}`}
          subtitle={`Supporting data compiled for ${viewEvidenceRequest.assetName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="text-slate-600">
              Sirach cited the following facts from Luminix's verified data context layer to justify this recommendation:
            </div>
            <ul className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {viewEvidenceRequest.evidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span className="font-mono text-slate-800">{ev}</span>
                </li>
              ))}
            </ul>
            <div className="text-right pt-2">
              <button
                onClick={() => setViewEvidenceRequest(null)}
                className="px-4 py-2 bg-primary text-white font-bold rounded-lg text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Request Info Modal */}
      {infoRequest && (
        <Modal
          isOpen={!!infoRequest}
          onClose={() => setInfoRequest(null)}
          title="Inquire with Requesting Agent"
          subtitle={`Agent: ${infoRequest.requestingAgent}`}
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Send an inquiry to Sirach to request deeper FFT spectra, historical comparison runs, or inventory verification.
            </p>
            <div className="p-3 bg-slate-100 rounded-lg font-mono">
              Proposed query: "Requesting additional vibration harmonic charts and warehouse stock check confirmation."
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setInfoRequest(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRequestInfo(infoRequest)}
                className="px-4 py-2 bg-primary text-white font-bold rounded-lg"
              >
                Submit Inquiry
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
