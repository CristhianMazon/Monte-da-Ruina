import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { Settings } from 'lucide-react';
import ProfileModal from './ProfileModal'; // Importe o Modal

const Header = ({ currentView, setCurrentView }) => {
    const { balance } = useGame();
    const { user } = useAuth(); 
    
    // Estado para controlar o modal
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
    const tabs = [
        { id: 'game', label: 'Início' },
        { id: 'stats', label: 'Estatísticas' },
        { id: 'wallet', label: 'Saque/Depósito' },
        { id: 'support', label: 'Suporte' },
    ];

    // Lógica para decidir qual imagem mostrar no header
    const avatarImage = user?.photo 
        ? user.photo 
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user ? user.name : 'Guest'}&backgroundColor=b6e3f4`;

    return (
        <>
            <header className="w-full bg-black/30 border-b-2 border-[#FBBF24]/40 px-6 py-4 mb-8 backdrop-blur-md shadow-2xl relative z-50">
                <style>{`
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>

                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    <nav className="flex gap-3 overflow-x-auto w-full md:w-auto p-4 justify-center md:justify-start no-scrollbar">
                        {tabs.map(tab => {
                            const isActive = currentView === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setCurrentView(tab.id)}
                                    className={`
                                        px-6 py-2 rounded-full text-base font-extrabold uppercase tracking-widest transition-all duration-300 whitespace-nowrap border-2
                                        ${isActive 
                                            ? 'bg-[#FBBF24] text-[#580011] border-[#FBBF24] shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-105' 
                                            : 'bg-transparent text-[#FBBF24] border-transparent hover:border-[#FBBF24]/50 hover:bg-[#FBBF24]/10'
                                        }
                                    `}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-5 ml-auto bg-black/40 px-5 py-2 rounded-full border-2 border-[#FBBF24]/30 flex-shrink-0">
                        <div className="text-right">
                            <div className="text-[#FBBF24]/80 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                                {user ? user.name : 'Visitante'}
                            </div>
                            <div className="text-[#FBBF24] font-black text-2xl tracking-wide font-serif leading-none drop-shadow-md">
                                R$ {balance.toFixed(2)}
                            </div>
                        </div>
                        
                        {/* Botão de Perfil: Abre o Modal */}
                        <button 
                            onClick={() => setIsProfileOpen(true)}
                            className="w-12 h-12 rounded-full bg-[#1a0f0a] border-2 border-[#FBBF24] flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.2)] overflow-hidden relative group cursor-pointer transition-transform active:scale-95"
                            title="Editar Perfil"
                        >
                             <img 
                                src={avatarImage} 
                                alt="User" 
                                className="w-full h-full object-cover transform group-hover:opacity-50 transition-all duration-300" 
                            />
                            {/* Ícone de Engrenagem ao passar o mouse */}
                            <Settings className="absolute w-6 h-6 text-[#FBBF24] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Renderiza o Modal se estiver aberto */}
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </>
    );
};

export default Header;