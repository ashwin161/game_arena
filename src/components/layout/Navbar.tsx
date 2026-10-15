import React, { useState } from 'react';
import { 
  Code2, 
  Volume2, 
  VolumeX, 
  Layers, 
  Dices, 
  Settings as SettingsIcon, 
  Home, 
  Compass, 
  User, 
  Play, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { useGame } from '../../context/useGame';
import { useAuth } from '../../context/useAuth';
import type { PageType } from '../../types/game';
import { HowItWorksModal } from '../modals/HowItWorksModal';
import { sound } from '../../utils/sound';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, stats, settings, updateSettings, profile } = useGame();
  const { user, signInWithGoogle } = useAuth();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const playerNavItems: { id: PageType; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'campaign', label: 'Campaign', icon: Layers },
    { id: 'random', label: 'Random', icon: Dices },
    { id: 'arena', label: 'Arena', icon: Code2 },
    { id: 'progress', label: 'Progress', icon: Compass },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const visitorNavItems: { id: PageType; label: string; icon: React.ElementType }[] = [
    { id: 'landing', label: 'Home', icon: Home },
  ];

  const currentNavItems = profile.isOnboarded ? playerNavItems : visitorNavItems;

  const handleNavClick = (page: PageType) => {
    sound.click();
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleBrandClick = () => {
    sound.click();
    if (profile.isOnboarded) {
      setCurrentPage('home');
    } else {
      setCurrentPage('landing');
    }
  };

  return (
    <>
      <header className="w-full bg-white/85 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40 shadow-sm shadow-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={handleBrandClick}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-all">
              <Code2 className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-sans font-black text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 group-hover:from-purple-700 group-hover:to-indigo-600 transition-colors">
                  CODEBREAK
                </span>
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-purple-700/80 font-semibold tracking-wider uppercase -mt-0.5 hidden sm:inline">
                Interactive Coding Arena
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-purple-100/70 text-purple-900 border border-purple-200 shadow-sm'
                      : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-purple-600 rounded-full" />
                  )}
                </button>
              );
            })}

            {!profile.isOnboarded && (
              <button
                onClick={() => {
                  sound.click();
                  setShowHowItWorks(true);
                }}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-purple-900 hover:bg-purple-50/60 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>How It Works</span>
              </button>
            )}
          </nav>

          {/* Right Section: XP Pill + Auth + Sound Toggle */}
          <div className="flex items-center space-x-3">
            {/* If player, show XP Pill & Operative Name */}
            {profile.isOnboarded && (
              <div 
                onClick={() => handleNavClick('profile')}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white/90 border border-purple-200/80 rounded-xl text-xs shadow-sm cursor-pointer hover:border-purple-300 transition-all"
              >
                <div className="hidden sm:block text-[11px] text-slate-700 font-semibold border-r border-purple-100 pr-2">
                  {user?.displayName || profile.name}
                </div>
                <div className="flex items-center space-x-1 text-purple-700 font-bold">
                  <span className="text-[10px] text-purple-500 font-mono">LVL</span>
                  <span>{stats.level}</span>
                </div>
                <div className="w-1 h-3 bg-purple-100 rounded-full" />
                <div className="flex items-center space-x-1 text-amber-600 font-bold">
                  <span>{stats.xp}</span>
                  <span className="text-[10px] text-amber-500 font-mono">XP</span>
                </div>
              </div>
            )}

            {/* Google Auth Status / Sign-in Button */}
            {user ? (
              <div 
                onClick={() => handleNavClick('profile')}
                title={`Signed in as ${user.displayName || user.email}`}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User Avatar'}
                    className="w-8 h-8 rounded-full border border-purple-200 shadow-sm group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-sans text-xs font-bold flex items-center justify-center shadow-sm">
                    {(user.displayName || 'U')[0].toUpperCase()}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-purple-50 border border-purple-200/90 rounded-xl text-slate-700 font-medium text-xs shadow-sm transition-all cursor-pointer"
                title="Sign in with Google"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* If visitor, show Enter CTA */}
            {!profile.isOnboarded && (
              <button
                onClick={() => {
                  sound.click();
                  setCurrentPage('onboarding');
                }}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-xs rounded-xl shadow-sm shadow-purple-500/20 cursor-pointer transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Get Started</span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                settings.soundEnabled
                  ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100/60'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
              title={settings.soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-purple-100 p-4 space-y-2">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-100/80 text-purple-900 border border-purple-200'
                      : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-purple-700" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {!profile.isOnboarded && (
              <button
                onClick={() => {
                  sound.click();
                  setMobileMenuOpen(false);
                  setCurrentPage('onboarding');
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Get Started</span>
              </button>
            )}
          </div>
        )}
      </header>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <HowItWorksModal onClose={() => setShowHowItWorks(false)} />
      )}
    </>
  );
};
