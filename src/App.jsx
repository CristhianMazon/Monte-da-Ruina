import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importe o AuthProvider
import Header from './components/Header';
import GameScreen from './views/GameScreen';
import StatsScreen from './views/StatsScreen';
import SupportScreen from './views/SupportScreen';
import WalletScreen from './views/WalletScreen';
import LoginScreen from './views/LoginScreen'; // Importe a tela de Login

// Componente interno que decide qual tela mostrar
const MainApp = () => {
    const { user } = useAuth(); // Pega o usuário do contexto
    const [currentView, setCurrentView] = useState('game');

    // Se não estiver logado, retorna a tela de Login
    if (!user) {
        return <LoginScreen />;
    }

    // Se estiver logado, mostra o app normal
    const renderView = () => {
        switch(currentView) {
            case 'game': return <GameScreen />;
            case 'stats': return <StatsScreen />;
            case 'support': return <SupportScreen />;
            case 'wallet': return <WalletScreen />;
            default: return <GameScreen />;
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

// Componente Raiz
function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;