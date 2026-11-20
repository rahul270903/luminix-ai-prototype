import React from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { GuidedDemoModal } from './GuidedDemoModal';
import { SearchModal } from '../common/SearchModal';
import { ToastContainer } from '../common/ToastContainer';
import { SafetyBanner } from '../common/SafetyBanner';
import { SignInScreen } from '../auth/SignInScreen';

export const Shell: React.FC = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <>
        <SignInScreen />
        <ToastContainer />
      </>
    );
  }

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
