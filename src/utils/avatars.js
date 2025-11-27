// src/utils/avatars.js

// Função para gerar avatares de animais (Emoji + Fundo colorido)
export const getAnimalAvatar = (emoji, bgColor) => {
    const svgString = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
            <rect width='100' height='100' fill='${bgColor}'/>
            <text x='50' y='55' font-size='60' text-anchor='middle' dy='.3em'>${emoji}</text>
        </svg>
    `.trim().replace(/\s+/g, ' ');
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

// A LISTA OFICIAL DE 10 AVATARES
export const PRESET_AVATARS = [
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sheriff",   
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Bandit",    
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Madam",     
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Gambler",   
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Bartender", 
    getAnimalAvatar("🐺", "#2d3748"), // Lobo
    getAnimalAvatar("🐻", "#78350f"), // Urso
    getAnimalAvatar("🐎", "#b45309"), // Cavalo
    getAnimalAvatar("🐂", "#4a0404"), // Boi/Touro
    getAnimalAvatar("🦅", "#1e3a8a"), // Águia
];

// Função para pegar um aleatório (para novos usuários)
export const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * PRESET_AVATARS.length);
    return PRESET_AVATARS[randomIndex];
};