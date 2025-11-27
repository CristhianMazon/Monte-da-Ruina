import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Save, LogOut, CheckCircle } from 'lucide-react';
// IMPORTAÇÃO NOVA:
import { PRESET_AVATARS } from '../utils/avatars';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser, logout } = useAuth();
    
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [customLink, setCustomLink] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setPhotoUrl(user.photo || PRESET_AVATARS[0]);
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        const finalPhoto = customLink.trim() ? customLink : photoUrl;
        updateUser({ name, photo: finalPhoto });
        onClose();
    };

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-[#580011] border-4 border-[#FBBF24] p-6 sm:p-8 rounded-3xl w-full max-w-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-[#FBBF24]/60 hover:text-[#FBBF24] transition-colors z-10">
                    <X className="w-8 h-8" />
                </button>

                <h2 className="text-3xl font-extrabold text-[#FBBF24] font-serif uppercase tracking-widest text-center mb-6 border-b-2 border-[#FBBF24]/20 pb-4 shrink-0">
                    Identidade do Jogador
                </h2>

                <div className="flex flex-col gap-6">
                    <div>
                        <label className="text-[#FBBF24] font-extrabold text-sm uppercase ml-1 mb-1 block">Seu Nome (Alcunha)</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#1a0f0a] border-2 border-[#FBBF24]/30 rounded-xl p-4 text-[#FBBF24] font-bold text-lg focus:border-[#FBBF24] focus:outline-none transition-all"
                            placeholder="Digite seu nome..."
                            disabled // Trava o nome para garantir unicidade
                        />
                        <p className="text-[#FBBF24]/40 text-xs mt-1 ml-1">O nome é sua identidade única e não pode ser alterado.</p>
                    </div>

                    <div>
                        <label className="text-[#FBBF24] font-extrabold text-sm uppercase ml-1 mb-3 block">Escolha seu Retrato</label>
                        <div className="grid grid-cols-5 gap-3 sm:gap-4 p-4 bg-black/20 rounded-2xl border border-[#FBBF24]/10">
                            {PRESET_AVATARS.map((avatar, index) => {
                                const isSelected = photoUrl === avatar && !customLink;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => { setPhotoUrl(avatar); setCustomLink(""); }}
                                        className={`relative rounded-xl aspect-square overflow-hidden border-2 transition-all duration-200 group shadow-lg bg-[#e6d5b8]
                                            ${isSelected ? 'border-[#FBBF24] shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110 z-10 ring-2 ring-[#FBBF24]/50' : 'border-[#FBBF24]/20 hover:border-[#FBBF24]/60 hover:scale-105'}
                                        `}
                                    >
                                        <img src={avatar} alt={`Avatar ${index}`} className="w-full h-full object-cover" />
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                                                <CheckCircle className="w-10 h-10 text-[#3AFF7A] fill-black/80 drop-shadow-xl" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="border-t border-[#FBBF24]/10 pt-4">
                        <details className="group">
                            <summary className="text-[#FBBF24]/50 text-xs font-bold uppercase cursor-pointer hover:text-[#FBBF24] list-none flex items-center gap-2 select-none">
                                <span>+ Usar imagem da internet (Avançado)</span>
                            </summary>
                            <input 
                                type="text" 
                                value={customLink}
                                onChange={(e) => setCustomLink(e.target.value)}
                                placeholder="Cole a URL da sua imagem aqui..."
                                className="w-full mt-2 bg-[#1a0f0a] border border-[#FBBF24]/20 rounded-lg p-3 text-[#FBBF24] text-sm focus:border-[#FBBF24]/50 focus:outline-none placeholder-[#FBBF24]/20"
                            />
                        </details>
                    </div>

                    <div className="flex gap-4 mt-2">
                        <button onClick={handleLogout} className="flex-1 py-3 bg-red-900/40 hover:bg-red-900/80 text-red-200 font-bold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-transparent hover:border-red-500 transition-all">
                            <LogOut className="w-5 h-5" /> Sair
                        </button>
                        <button onClick={handleSave} className="flex-[2] py-3 bg-[#FBBF24] hover:bg-[#d9a520] text-[#580011] font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all active:scale-95">
                            <Save className="w-5 h-5" /> Salvar Identidade
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;