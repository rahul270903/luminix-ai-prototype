import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { GuidedDemoModal } from './GuidedDemoModal';
import { SearchModal } from '../common/SearchModal';
import { ToastContainer } from '../common/ToastContainer';
import { SafetyBanner } from '../common/SafetyBanner';

export const Shell: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface-bg text-navy-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <SafetyBanner />
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <GuidedDemoModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};
