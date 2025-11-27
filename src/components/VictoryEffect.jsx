import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gem, CircleDollarSign, Star } from 'lucide-react';

const VictoryEffect = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Gera 50 itens com propriedades aleatórias
        const newItems = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Posição horizontal (0-100%)
            delay: Math.random() * 2, // Atraso aleatório para não cair tudo junto
            duration: 2 + Math.random() * 3, // Tempo de queda
            type: Math.random() > 0.6 ? 'gem' : Math.random() > 0.3 ? 'star' : 'coin', // Probabilidade dos itens
            scale: 0.5 + Math.random() * 1, // Tamanho variado
        }));
        setItems(newItems);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ y: -100, x: `${item.x}vw`, opacity: 1, rotate: 0 }}
                    animate={{ 
                        y: '110vh', 
                        rotate: 360 * (Math.random() > 0.5 ? 1 : -1) // Roda para esq ou dir
                    }}
                    transition={{ 
                        duration: item.duration, 
                        delay: item.delay, 
                        ease: "linear", 
                        repeat: Infinity // Cai infinitamente enquanto a vitória estiver na tela
                    }}
                    className="absolute top-0"
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
        </div>
    );
};

export default VictoryEffect;