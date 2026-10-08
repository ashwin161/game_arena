import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { ArenaPage } from './pages/ArenaPage';
import { MissionsPage } from './pages/MissionsPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';

const MainContent: React.FC = () => {
  const { currentPage } = useGame();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'arena' && <ArenaPage />}
        {currentPage === 'missions' && <MissionsPage />}
        {currentPage === 'progress' && <ProgressPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
}
