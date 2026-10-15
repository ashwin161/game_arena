import React from 'react';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/useGame';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { CampaignPage } from './pages/CampaignPage';
import { RandomPage } from './pages/RandomPage';
import { ArenaPage } from './pages/ArenaPage';
import { MissionsPage } from './pages/MissionsPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

import { AuthProvider } from './context/AuthContext';

const MainContent: React.FC = () => {
  const { currentPage, currentMissionId, selectedLanguage } = useGame();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'onboarding' && <OnboardingPage />}
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'campaign' && <CampaignPage />}
        {currentPage === 'random' && <RandomPage />}
        {currentPage === 'arena' && <ArenaPage key={`${currentMissionId}-${selectedLanguage}`} />}
        {currentPage === 'missions' && <MissionsPage />}
        {currentPage === 'progress' && <ProgressPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </GameProvider>
  );
}
