import React, { createContext, useContext, useState } from 'react';
import {
  SiteId,
  AutonomyLevel,
  IndustrialEvent,
  ApprovalRequest,
  OutcomeRecord,
  DataSourceItem,
  Asset,
  SirachDecision,
  UserProfile
} from '../types';
import {
  SITES,
  ASSETS,
  EVENTS,
  APPROVAL_REQUESTS,
  OUTCOME_HISTORY,
  DATA_SOURCES,
  SIRACH_DECISIONS,
  PRESET_USERS
} from '../data/mockData';

export type ScadaNetworkState = 'healthy' | 'latency' | 'packet-loss' | 'stale-data' | 'offline';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  selectedSite: SiteId;
  setSelectedSite: (site: SiteId) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedLine: string;
  setSelectedLine: (line: string) => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  autonomyLevel: AutonomyLevel;
  setAutonomyLevel: (level: AutonomyLevel) => void;
  activeIndustryId: string;
  setActiveIndustryId: (id: string) => void;

  assets: Asset[];
  events: IndustrialEvent[];
  approvalRequests: ApprovalRequest[];
  outcomes: OutcomeRecord[];
  dataSources: DataSourceItem[];
  sirachDecisions: Record<string, SirachDecision>;

  scadaNetworkCondition: ScadaNetworkState;
  setScadaNetworkCondition: (condition: ScadaNetworkState) => void;

  // Guided demo state
  isGuidedDemoOpen: boolean;
  guidedStep: number;
  openGuidedDemo: (step?: number) => void;
  closeGuidedDemo: () => void;
  nextGuidedStep: () => void;
  prevGuidedStep: () => void;
  restartGuidedDemo: () => void;

  // Actions
  approveRequest: (id: string) => void;
  rejectRequest: (id: string, reason: string) => void;
  acknowledgeEvent: (id: string) => void;
  assignEventOwner: (id: string, owner: string) => void;
  submitOutcome: (outcome: Omit<OutcomeRecord, 'id' | 'timestamp'>) => void;
  simulateIncomingData: () => void;
  resetDemoData: () => void;

  // Global search modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Notifications
  notifications: Array<{ id: string; title: string; time: string; type: 'info' | 'warning' | 'success'; read: boolean }>;
  markAllNotificationsRead: () => void;

  // User Authentication & Session
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  signIn: (params?: { userPresetId?: string; email?: string; password?: string }) => boolean;
  signOut: () => void;
  switchUser: (userPresetId: string) => void;
  presetUsers: UserProfile[];

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSite, setSelectedSite] = useState<SiteId>('riverside');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedLine, setSelectedLine] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [autonomyLevel, setAutonomyLevel] = useState<AutonomyLevel>('approve');
  const [activeIndustryId, setActiveIndustryId] = useState<string>('food-beverage');

  const [assets, setAssets] = useState<Asset[]>(ASSETS);
  const [events, setEvents] = useState<IndustrialEvent[]>(EVENTS);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(APPROVAL_REQUESTS);
  const [outcomes, setOutcomes] = useState<OutcomeRecord[]>(OUTCOME_HISTORY);
  const [dataSources, setDataSources] = useState<DataSourceItem[]>(DATA_SOURCES);
  const [sirachDecisions, setSirachDecisions] = useState<Record<string, SirachDecision>>(SIRACH_DECISIONS);

  const [scadaNetworkCondition, setScadaNetworkConditionState] = useState<ScadaNetworkState>('healthy');

  // Guided demo
  const [isGuidedDemoOpen, setIsGuidedDemoOpen] = useState(false);
  const [guidedStep, setGuidedStep] = useState(0);

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // User Authentication & Session
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(PRESET_USERS[0]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const signIn = (params?: { userPresetId?: string; email?: string; password?: string }): boolean => {
    let userToLogin = PRESET_USERS[0];
    if (params?.userPresetId) {
      const found = PRESET_USERS.find(u => u.id === params.userPresetId);
      if (found) userToLogin = found;
    } else if (params?.email) {
      const found = PRESET_USERS.find(u => u.email.toLowerCase() === params.email?.toLowerCase());
      if (found) {
        userToLogin = found;
      } else {
        const namePart = params.email.split('@')[0];
        const initials = namePart.substring(0, 2).toUpperCase();
        userToLogin = {
          id: `custom-${Date.now()}`,
          name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
          initials: initials || 'US',
          email: params.email,
          role: 'Plant Operations Specialist',
          title: 'Authorized Industrial Context Operator',
          department: 'Plant Operations & Engineering',
          siteId: 'all',
          siteName: 'All Sites (Global Access)',
          approvalLimit: '$10,000',
          securityClearance: 'Level 2 (OT Telemetry Access)',
          seiretsuId: 'US-SEC-DEMO-99',
          autonomyPolicy: 'advise'
        };
      }
    }

    setCurrentUser(userToLogin);
    setIsAuthenticated(true);
    if (userToLogin.siteId !== 'all') {
      setSelectedSite(userToLogin.siteId);
    }
    setAutonomyLevel(userToLogin.autonomyPolicy);
    showToast(`Welcome back, ${userToLogin.name} (${userToLogin.role})`, 'success');
    return true;
  };

  const signOut = () => {
    setIsAuthenticated(false);
    showToast('Signed out of Luminix Enterprise Session', 'info');
  };

  const switchUser = (userPresetId: string) => {
    const found = PRESET_USERS.find(u => u.id === userPresetId);
    if (found) {
      setCurrentUser(found);
      setIsAuthenticated(true);
      if (found.siteId !== 'all') {
        setSelectedSite(found.siteId);
      }
      setAutonomyLevel(found.autonomyPolicy);
      showToast(`Switched active operator to: ${found.name} (${found.role})`, 'info');
    }
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'notif-1', title: 'TT-104A reached 78.4°C on Pump P-104 (2 days to limit)', time: '12m ago', type: 'warning' as const, read: false },
    { id: 'notif-2', title: 'Sirach recommended Option C: Night shift bearing replacement', time: '8m ago', type: 'info' as const, read: false },
    { id: 'notif-3', title: 'Station 7 RTU cellular telemetry recovered after 42s stale period', time: '1h ago', type: 'success' as const, read: true },
    { id: 'notif-4', title: 'Context API: 184,500 queries processed today with 100% citation coverage', time: '2h ago', type: 'info' as const, read: true },
  ]);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // SCADA condition update
  const setScadaNetworkCondition = (condition: ScadaNetworkState) => {
    setScadaNetworkConditionState(condition);
    setDataSources(prev => prev.map(src => {
      if (src.protocol === 'RTU / Modbus' || src.id === 'src-07') {
        if (condition === 'healthy') {
          return { ...src, status: 'connected', latencyMs: 45, dataGaps: 0, trustRating: 0.99 };
        } else if (condition === 'latency') {
          return { ...src, status: 'degraded', latencyMs: 3800, dataGaps: 2, trustRating: 0.82 };
        } else if (condition === 'packet-loss') {
          return { ...src, status: 'degraded', latencyMs: 820, dataGaps: 14, trustRating: 0.68 };
        } else if (condition === 'stale-data') {
          return { ...src, status: 'degraded', latencyMs: 5600, dataGaps: 22, trustRating: 0.52 };
        } else if (condition === 'offline') {
          return { ...src, status: 'offline', latencyMs: 0, dataGaps: 50, trustRating: 0.1 };
        }
      }
      return src;
    }));
    showToast(`SCADA Network Condition set to: ${condition.toUpperCase()}`, condition === 'healthy' ? 'success' : 'warning');
  };

  // Approve request
  const approveRequest = (id: string) => {
    setApprovalRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'approved',
          approvedAt: new Date().toLocaleTimeString(),
          approvedBy: 'E. Vance (Plant VP)'
        };
      }
      return req;
    }));

    // Update corresponding decision
    const req = approvalRequests.find(r => r.id === id);
    if (req && req.decisionId) {
      setSirachDecisions(prev => {
        const dec = prev[req.decisionId];
        if (dec) {
          return {
            ...prev,
            [req.decisionId]: { ...dec, status: 'approved' }
          };
        }
        return prev;
      });
    }

    showToast(`Request ${id} Approved: Dispatched into business execution queue (Trestara/SAIGEN)`, 'success');
  };

  // Reject request
  const rejectRequest = (id: string, reason: string) => {
    setApprovalRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'rejected',
          rejectionReason: reason
        };
      }
      return req;
    }));

    showToast(`Request ${id} Rejected: Feedback routed back to Sirach agent`, 'warning');
  };

  // Acknowledge event
  const acknowledgeEvent = (id: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === id) {
        return { ...evt, status: 'acknowledged' };
      }
      return evt;
    }));
    showToast(`Event ${id} acknowledged by operator`, 'info');
  };

  // Assign event owner
  const assignEventOwner = (id: string, owner: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === id) {
        return { ...evt, assignedOwner: owner, status: 'investigating' };
      }
      return evt;
    }));
    showToast(`Event ${id} assigned to ${owner}`, 'info');
  };

  // Submit outcome
  const submitOutcome = (outcomeData: Omit<OutcomeRecord, 'id' | 'timestamp'>) => {
    const newId = `OUT-${Math.floor(900 + Math.random() * 100)}`;
    const newRecord: OutcomeRecord = {
      ...outcomeData,
      id: newId,
      timestamp: new Date().toISOString().split('T')[0]
    };
    setOutcomes(prev => [newRecord, ...prev]);

    // Update asset health
    setAssets(prev => prev.map(a => {
      if (a.id === outcomeData.assetId) {
        return {
          ...a,
          healthScore: 92,
          healthStatus: 'optimal',
          activeEventId: undefined,
          openWorkOrderId: undefined,
          orderAtRisk: undefined,
          sensors: a.sensors.map(s => {
            if (s.tag === 'TT-104A') {
              return { ...s, currentValue: 52.1, status: 'normal', rateOfChange: 'Stable (-26.3°C post-repair)' };
            }
            if (s.tag === 'VIB-104') {
              return { ...s, currentValue: 1.4, status: 'normal', rateOfChange: '-3.42 mm/s' };
            }
            return s;
          })
        };
      }
      return a;
    }));

    // Resolve event
    setEvents(prev => prev.map(e => {
      if (e.assetId === outcomeData.assetId) {
        return { ...e, status: 'resolved' };
      }
      return e;
    }));

    showToast(`Outcome ${newId} recorded! Knowledge graph and asset context updated.`, 'success');
  };

  // Simulate incoming data
  const simulateIncomingData = () => {
    setDataSources(prev => prev.map(src => ({
      ...src,
      receivedTagsCount: src.receivedTagsCount + Math.floor(Math.random() * 150) + 20,
      latencyMs: Math.max(8, src.latencyMs + Math.floor(Math.random() * 10) - 5),
      lastPoll: 'Just now'
    })));

    setAssets(prev => prev.map(asset => {
      if (asset.id === 'P-104') {
        const delta = Number((Math.random() * 0.4 - 0.1).toFixed(1));
        return {
          ...asset,
          sensors: asset.sensors.map(s => {
            if (s.tag === 'TT-104A') {
              const newVal = Number((s.currentValue + delta).toFixed(1));
              return { ...s, currentValue: newVal, lastUpdated: 'Just now' };
            }
            return { ...s, lastUpdated: 'Just now' };
          })
        };
      }
      return asset;
    }));

    showToast('Simulated incoming OT/IT data packets across all 12 connectors', 'info');
  };

  // Reset demo
  const resetDemoData = () => {
    setSelectedSite('riverside');
    setSelectedArea('all');
    setSelectedLine('all');
    setTimeRange('24h');
    setAutonomyLevel('approve');
    setActiveIndustryId('food-beverage');
    setAssets(ASSETS);
    setEvents(EVENTS);
    setApprovalRequests(APPROVAL_REQUESTS);
    setOutcomes(OUTCOME_HISTORY);
    setDataSources(DATA_SOURCES);
    setSirachDecisions(SIRACH_DECISIONS);
    setScadaNetworkConditionState('healthy');
    setGuidedStep(0);
    showToast('Platform reset to initial baseline demo state', 'info');
  };

  // Guided demo controls
  const openGuidedDemo = (step = 0) => {
    setGuidedStep(step);
    setIsGuidedDemoOpen(true);
  };
  const closeGuidedDemo = () => setIsGuidedDemoOpen(false);
  const nextGuidedStep = () => setGuidedStep(prev => Math.min(prev + 1, 9));
  const prevGuidedStep = () => setGuidedStep(prev => Math.max(prev - 1, 0));
  const restartGuidedDemo = () => setGuidedStep(0);

  return (
    <AppContext.Provider
      value={{
        selectedSite,
        setSelectedSite,
        selectedArea,
        setSelectedArea,
        selectedLine,
        setSelectedLine,
        timeRange,
        setTimeRange,
        autonomyLevel,
        setAutonomyLevel,
        activeIndustryId,
        setActiveIndustryId,
        assets,
        events,
        approvalRequests,
        outcomes,
        dataSources,
        sirachDecisions,
        scadaNetworkCondition,
        setScadaNetworkCondition,
        isGuidedDemoOpen,
        guidedStep,
        openGuidedDemo,
        closeGuidedDemo,
        nextGuidedStep,
        prevGuidedStep,
        restartGuidedDemo,
        approveRequest,
        rejectRequest,
        acknowledgeEvent,
        assignEventOwner,
        submitOutcome,
        simulateIncomingData,
        resetDemoData,
        isSearchOpen,
        setIsSearchOpen,
        notifications,
        markAllNotificationsRead,
        currentUser,
        isAuthenticated,
        signIn,
        signOut,
        switchUser,
        presetUsers: PRESET_USERS,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
