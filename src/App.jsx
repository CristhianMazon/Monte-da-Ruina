import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import FooterAds from './components/FooterAds';
import GameScreen from './views/GameScreen';
import StatsScreen from './views/StatsScreen';
import SupportScreen from './views/SupportScreen';
import WalletScreen from './views/WalletScreen';
import LoginScreen from './views/LoginScreen';

const MainApp = () => {
    const { user } = useAuth();
    const [currentView, setCurrentView] = useState('game');

    if (!user) {
        // Também aplica o zoom na tela de login para ficar padrão
        return (
            <div style={{ zoom: '0.8' }} className="w-full h-full">
                <LoginScreen />
            </div>
        );
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
            {/* MUDANÇA AQUI: Adicionei style={{ zoom: '0.8' }} 
                Isso aplica 80% de escala em TUDO (Header, Jogo, Rodapé),
                simulando o "Ctrl -" do navegador para caber perfeitamente em 1080p.
            */}
            <div 
                style={{ zoom: '0.8' }} 
                className="min-h-screen bg-[#580011] text-gray-100 font-serif font-bold selection:bg-[#FBBF24] selection:text-[#580011] flex flex-col relative overflow-x-hidden"
            >
                
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                
                <main className="container mx-auto px-4 pb-32 flex justify-center w-full flex-1">
                     {renderView()}
                </main>

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