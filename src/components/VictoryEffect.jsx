import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // Importação Mágica
import { motion } from 'framer-motion';
import { Gem, CircleDollarSign, Star } from 'lucide-react';

const VictoryEffect = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Aumentei para 80 itens para preencher bem a tela toda
        const newItems = Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // Posição em % da tela
            delay: Math.random() * 2, 
            duration: 2 + Math.random() * 3, 
            type: Math.random() > 0.6 ? 'gem' : Math.random() > 0.3 ? 'star' : 'coin', 
            scale: 0.5 + Math.random() * 1, 
        }));
        setItems(newItems);
    }, []);

    // createPortal joga esse HTML direto no <body>, fugindo do Zoom do App
    return createPortal(
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    // Usando 'left' em % garante que espalhe na largura total
                    initial={{ top: -100, left: `${item.left}%`, opacity: 1, rotate: 0 }}
                    animate={{ 
                        top: '120vh', // Garante que caia até sumir lá embaixo
                        rotate: 360 * (Math.random() > 0.5 ? 1 : -1) 
                    }}
                    transition={{ 
                        duration: item.duration, 
                        delay: item.delay, 
                        ease: "linear", 
                        repeat: Infinity 
                    }}
                    className="absolute"
                    style={{ scale: item.scale }}
                >
                    {item.type === 'gem' && (
                        <Gem className="w-12 h-12 text-[#3AFF7A] fill-[#3AFF7A]/40 drop-shadow-[0_0_10px_rgba(58,255,122,0.8)]" />
                    )}
                    {item.type === 'coin' && (
                        <CircleDollarSign className="w-12 h-12 text-[#FBBF24] fill-[#FBBF24]/40 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                    )}
                    {item.type === 'star' && (
                        <Star className="w-8 h-8 text-yellow-200 fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                    )}
                </motion.div>
            ))}
        </div>,
        document.body // Alvo do Portal
    );
};

export default VictoryEffect;