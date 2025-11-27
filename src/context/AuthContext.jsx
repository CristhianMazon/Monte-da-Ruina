import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("monte_ruina_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (name, password) => {
        // Agora o user pode ter a propriedade 'photo' (URL)
        const newUser = { name, password, photo: null }; 
        localStorage.setItem("monte_ruina_user", JSON.stringify(newUser));
        setUser(newUser);
    };

    // --- NOVA FUNÇÃO: ATUALIZAR DADOS ---
    const updateUser = (updatedData) => {
        // Mescla os dados antigos com os novos (ex: mantém a senha, muda a foto)
        const newUser = { ...user, ...updatedData };
        localStorage.setItem("monte_ruina_user", JSON.stringify(newUser));
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem("monte_ruina_user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};