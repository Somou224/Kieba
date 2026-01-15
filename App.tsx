
import React, { useState } from 'react';
import { AppMode } from './types';
import LandingPage from './views/LandingPage';
import AppView from './views/AppView';
import AuthView from './views/AuthView';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.LANDING);

  const renderContent = () => {
    switch (mode) {
      case AppMode.LANDING:
        return <LandingPage onLaunch={() => setMode(AppMode.AUTH)} />;
      case AppMode.AUTH:
        return <AuthView onLogin={() => setMode(AppMode.APP)} />;
      case AppMode.APP:
        return (
          <div className="flex flex-col items-center py-0 md:py-10">
            <AppView />
            <button 
              onClick={() => setMode(AppMode.LANDING)}
              className="fixed bottom-32 right-8 bg-white/20 backdrop-blur-lg p-2 rounded-full hidden md:block text-slate-400 hover:text-slate-600 transition"
              title="Retour au site"
            >
              <HomeIcon size={20} />
            </button>
          </div>
        );
      default:
        return <LandingPage onLaunch={() => setMode(AppMode.AUTH)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {renderContent()}
    </div>
  );
};

const HomeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export default App;
