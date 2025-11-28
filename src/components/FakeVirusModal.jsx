import React, { useState, useEffect, useRef } from 'react';
import { X, Skull, ShieldAlert } from 'lucide-react';

const HACKER_LOGS = [
    "Connecting to host 192.168.0.1...",
    "Bypassing firewall security...",
    "Accessing C:/Windows/System32...",
    "Downloading payload: TROJAN_HORSE_V2.exe...",
    "Injecting malicious script...",
    "Stealing browser passwords...",
    "Encrypting hard drive...",
    "Uploading photos to Dark Web...",
    "Deleting System32...",
    "Formatting C: drive...",
    "Installing crypto miner...",
    "ERROR: CRITICAL FAILURE...",
    "RETRYING CONNECTION..."
];

const FakeVirusModal = ({ isOpen, onClose }) => {
    const [logs, setLogs] = useState([]);
    const [showReveal, setShowReveal] = useState(false);
    const [progress, setProgress] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setLogs([]);
            setShowReveal(false);
            setProgress(0);

            // Adiciona logs estilo Matrix
            let logIndex = 0;
            const logInterval = setInterval(() => {
                if (logIndex < HACKER_LOGS.length) {
                    setLogs(prev => [...prev, HACKER_LOGS[logIndex]]);
                    logIndex++;
                    // Rola para baixo automaticamente
                    if (scrollRef.current) {
                        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                    }
                } else {
                    clearInterval(logInterval);
                    // Mostra a revelação depois dos logs
                    setTimeout(() => setShowReveal(true), 1000);
                }
            }, 300); // Velocidade das linhas

            // Barra de progresso fake
            const progressInterval = setInterval(() => {
                setProgress(old => {
                    if (old >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    return old + Math.random() * 10;
                });
            }, 400);

            return () => {
                clearInterval(logInterval);
                clearInterval(progressInterval);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] bg-black flex flex-col font-mono p-4 md:p-10">
            
            {!showReveal ? (
                // TELA DE "VÍRUS/HACKER"
                <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 h-full justify-center">
                    <div className="text-red-500 font-bold text-2xl animate-pulse flex items-center gap-2 uppercase">
                        <ShieldAlert className="w-8 h-8" />
                        ALERTA DE SEGURANÇA CRÍTICO
                    </div>
                    
                    <div className="w-full bg-gray-900 h-6 rounded-full border border-red-500 overflow-hidden relative">
                        <div 
                            className="h-full bg-red-600 transition-all duration-200" 
                            style={{ width: `${progress}%` }}
                        ></div>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white z-10">
                            INFECTANDO SISTEMA: {Math.min(100, progress).toFixed(0)}%
                        </span>
                    </div>

                    <div 
                        ref={scrollRef}
                        className="flex-1 bg-black border-2 border-green-500 p-4 rounded-lg overflow-y-auto font-mono text-green-500 text-sm md:text-lg shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                    >
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1">
                                <span className="text-green-300 mr-2">{`>`}</span>
                                {log}
                            </div>
                        ))}
                        <div className="animate-pulse">_</div>
                    </div>
                </div>
            ) : (
                // TELA DE TROLLAGEM (A Revelação)
                <div className="absolute inset-0 bg-[#580011] flex flex-col items-center justify-center text-center p-6 animate-in zoom-in duration-300">
                    <div className="bg-black/30 p-8 rounded-[3rem] border-4 border-[#FBBF24] shadow-2xl max-w-2xl">
                        <Skull className="w-24 h-24 text-[#FBBF24] mx-auto mb-6 animate-bounce" />
                        
                        <h1 className="text-4xl md:text-6xl font-black text-[#FBBF24] font-serif uppercase tracking-widest mb-4 drop-shadow-md">
                            FOI TROLADO, COWBOY!
                        </h1>
                        
                        <p className="text-white text-xl md:text-2xl font-serif mb-8 leading-relaxed">
                            Achou mesmo que ia ganhar dinheiro fácil clicando em propaganda? 
                            <br/><br/>
                            <span className="text-[#FBBF24] font-bold">Isso aqui é o Velho Oeste.</span> 
                            <br/>
                            O único vírus aqui é a sua ganância. 😂
                        </p>

                        <button 
                            onClick={onClose}
                            className="px-8 py-4 bg-[#FBBF24] text-[#580011] font-black text-xl rounded-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
                        >
                            VOLTAR PRO JOGO (COM VERGONHA)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FakeVirusModal;