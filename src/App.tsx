import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Shell } from './components/layout/Shell';

// View Imports
import { ExecutiveOverview } from './components/views/ExecutiveOverview';
import { OrchestrationWorkflow } from './components/views/OrchestrationWorkflow';
import { DataSources } from './components/views/DataSources';
import { ConnectAndTrust } from './components/views/ConnectAndTrust';
import { AssetContext } from './components/views/AssetContext';
import { KnowledgeGraph } from './components/views/KnowledgeGraph';
import { EventsAndAnomalies } from './components/views/EventsAndAnomalies';
import { RootCauseAnalysis } from './components/views/RootCauseAnalysis';
import { OperationalKPIs } from './components/views/OperationalKPIs';
import { ContextAPI } from './components/views/ContextAPI';
import { DigitalTwin } from './components/views/DigitalTwin';
import { SirachDecisionCenter } from './components/views/SirachDecisionCenter';
import { ApprovalActionCenter } from './components/views/ApprovalActionCenter';
import { OutcomeFeedback } from './components/views/OutcomeFeedback';
import { ScadaIntegration } from './components/views/ScadaIntegration';
import { IndustrySolutions } from './components/views/IndustrySolutions';
import { ModuleCatalog } from './components/views/ModuleCatalog';
import { GovernancePhasing } from './components/views/GovernancePhasing';
import { EcosystemIntegration } from './components/views/EcosystemIntegration';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shell />}>
            <Route index element={<ExecutiveOverview />} />
            <Route path="workflow" element={<OrchestrationWorkflow />} />
            <Route path="governance" element={<GovernancePhasing />} />
            <Route path="sources" element={<DataSources />} />
            <Route path="connect-trust" element={<ConnectAndTrust />} />
            <Route path="assets" element={<AssetContext />} />
            <Route path="graph" element={<KnowledgeGraph />} />
            <Route path="events" element={<EventsAndAnomalies />} />
            <Route path="root-cause" element={<RootCauseAnalysis />} />
            <Route path="kpis" element={<OperationalKPIs />} />
            <Route path="context-api" element={<ContextAPI />} />
            <Route path="ecosystem" element={<EcosystemIntegration />} />
            <Route path="digital-twin" element={<DigitalTwin />} />
            <Route path="decisions" element={<SirachDecisionCenter />} />
            <Route path="approvals" element={<ApprovalActionCenter />} />
            <Route path="outcomes" element={<OutcomeFeedback />} />
            <Route path="scada" element={<ScadaIntegration />} />
            <Route path="industries" element={<IndustrySolutions />} />
            <Route path="modules" element={<ModuleCatalog />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
