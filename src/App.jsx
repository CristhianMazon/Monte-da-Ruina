import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import FooterAds from './components/FooterAds'; // <--- IMPORTE AQUI
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
            case 'game': return <GameScreen navigateTo={setCurrentView} />;
            case 'stats': return <StatsScreen />;
            case 'support': return <SupportScreen />;
            case 'wallet': return <WalletScreen />;
            default: return <GameScreen navigateTo={setCurrentView} />;
        }
    }

    return (
        <GameProvider>
            {/* Adicionei 'relative' e 'overflow-hidden' para garantir que nada vaze */}
            <div className="min-h-screen bg-[#580011] text-gray-100 font-serif font-bold selection:bg-[#FBBF24] selection:text-[#580011] flex flex-col relative overflow-x-hidden">
                
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                
                {/* Adicionei 'pb-32' (padding-bottom) para o conteúdo não ficar escondido atrás do banner */}
                <main className="container mx-auto px-4 pb-32 flex justify-center w-full flex-1">
                     {renderView()}
                </main>

                {/* O BANNER ENTRA AQUI NO FINAL */}
                <FooterAds />
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