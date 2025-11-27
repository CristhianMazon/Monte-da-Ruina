import React, { createContext, useContext, useState, useEffect } from "react";
import { getRandomAvatar } from "../utils/avatars";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const activeSession = localStorage.getItem("monte_ruina_active_user");
        if (activeSession) {
            const userData = JSON.parse(localStorage.getItem(`monte_ruina_user_${activeSession}`));
            if (userData) {
                setUser(userData);
            }
        }
        setLoading(false);
    }, []);

    // MUDANÇA: A função login agora retorna um objeto com { success, message }
    const login = (name, password) => {
        // Normaliza o nome para evitar "Cristhian" vs "cristhian" criando contas diferentes
        // Usamos o ID em minúsculo para a chave, mas salvamos o nome original para exibição
        const userId = name.trim(); 
        const storageKey = `monte_ruina_user_${userId}`;
        
        const existingUserString = localStorage.getItem(storageKey);

        if (existingUserString) {
            // --- CENÁRIO: USUÁRIO EXISTE (TENTATIVA DE LOGIN) ---
            const existingUser = JSON.parse(existingUserString);
            
            // VALIDAÇÃO DE SENHA
            if (existingUser.password === password) {
                localStorage.setItem("monte_ruina_active_user", userId);
                setUser(existingUser);
                return { success: true };
            } else {
                // Senha errada: Retorna erro e NÃO LOGA
                return { success: false, message: "Senha incorreta! Tente novamente." };
            }

        } else {
            // --- CENÁRIO: NOVO USUÁRIO (CADASTRO) ---
            const newUser = { 
                name: userId, // Nome original
                password, 
                photo: getRandomAvatar() 
            };
            
            localStorage.setItem(storageKey, JSON.stringify(newUser));
            localStorage.setItem("monte_ruina_active_user", userId);
            setUser(newUser);
            return { success: true, isNew: true };
        }
    };

    const updateUser = (updatedData) => {
        const userId = user.name.trim();
        const storageKey = `monte_ruina_user_${userId}`;
        
        const newUser = { ...user, ...updatedData };
        localStorage.setItem(storageKey, JSON.stringify(newUser));
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem("monte_ruina_active_user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};