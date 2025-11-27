import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import GameScreen from './views/GameScreen';
import StatsScreen from './views/StatsScreen';
import SupportScreen from './views/SupportScreen';
import WalletScreen from './views/WalletScreen';
import LoginScreen from './views/LoginScreen';

const MainApp = () => {
    const { user } = useAuth();
    const [currentView, setCurrentView] = useState('game');

    if (!user) {
        return <LoginScreen />;
    }

    const renderView = () => {
        switch(currentView) {
            // MUDANÇA AQUI: Passando 'navigateTo' para o GameScreen
            case 'game': return <GameScreen navigateTo={setCurrentView} />;
            case 'stats': return <StatsScreen />;
            case 'support': return <SupportScreen />;
            case 'wallet': return <WalletScreen />;
            default: return <GameScreen navigateTo={setCurrentView} />;
        }
    }

    return (
        <GameProvider>
            <div className="min-h-screen bg-[#580011] text-gray-100 font-serif font-bold selection:bg-[#FBBF24] selection:text-[#580011]">
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                <main className="container mx-auto px-4 pb-12 flex justify-center w-full">
                    {renderView()}
                </main>
            </div>
        </GameProvider>
    );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;