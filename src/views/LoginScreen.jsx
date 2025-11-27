import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, User, ArrowRight, AlertTriangle } from 'lucide-react';

const LoginScreen = () => {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Limpa erros anteriores

        if (!name.trim() || !password.trim()) {
            setError("Preencha todos os campos, forasteiro.");
            return;
        }

        // Chama o login e espera o resultado
        const result = login(name, password);

        if (!result.success) {
            // Se falhou (senha errada), mostra o erro na tela
            setError(result.message);
        } 
        // Se sucesso, o AuthContext atualiza o 'user' e o App redireciona automaticamente
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#580011] px-4">
            <div className="max-w-md w-full bg-black/30 border-4 border-[#FBBF24] p-10 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                
                {/* Brilho de fundo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#FBBF24]/20 blur-[80px] pointer-events-none"></div>

                <div className="text-center mb-10 relative z-10">
                    <h1 className="text-5xl font-extrabold text-[#FBBF24] font-serif tracking-widest drop-shadow-lg uppercase mb-2">
                        LOGIN
                    </h1>
                    <p className="text-[#FBBF24]/60 font-serif text-lg">Identifique-se para entrar no Monte.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    
                    {/* Input Nome */}
                    <div className="space-y-2">
                        <label className="text-[#FBBF24] font-extrabold ml-2 text-sm uppercase tracking-wider">Nome de Jogador</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FBBF24]/50 w-6 h-6" />
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#1a0f0a] border-2 border-[#FBBF24]/30 rounded-xl py-4 pl-14 pr-4 text-[#FBBF24] placeholder-[#FBBF24]/20 font-bold focus:outline-none focus:border-[#FBBF24] focus:shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all"
                                placeholder="Seu nome..."
                            />
                        </div>
                    </div>

                    {/* Input Senha */}
                    <div className="space-y-2">
                        <label className="text-[#FBBF24] font-extrabold ml-2 text-sm uppercase tracking-wider">Senha de Acesso</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FBBF24]/50 w-6 h-6" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1a0f0a] border-2 border-[#FBBF24]/30 rounded-xl py-4 pl-14 pr-4 text-[#FBBF24] placeholder-[#FBBF24]/20 font-bold focus:outline-none focus:border-[#FBBF24] focus:shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all"
                                placeholder="******"
                            />
                        </div>
                    </div>

                    {/* Mensagem de Erro */}
                    {error && (
                        <div className="flex items-center gap-3 text-red-300 bg-red-900/40 p-4 rounded-xl border border-red-500/50 animate-pulse">
                            <AlertTriangle className="w-6 h-6 shrink-0" />
                            <p className="font-bold text-sm leading-tight">{error}</p>
                        </div>
                    )}

                    <button 
                        type="submit"
                        className="mt-4 w-full bg-[#FBBF24] hover:bg-[#d9a520] text-[#580011] font-black py-4 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] uppercase text-xl tracking-widest transition-transform active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        Entrar <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;