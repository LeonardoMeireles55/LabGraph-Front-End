import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
    isValid: boolean;
    validateToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isValid, setIsValid] = useState(true);
    const router = useRouter();

    const validateToken = useCallback(async () => {
        if (router.pathname === '/signup' || router.pathname === '/login') return;

        try {
            const response = await fetch('/api/validate-token');
            const data = await response.json();

            setIsValid(data.valid);
            if (!data.valid) {
                localStorage.removeItem('remembered');
                router.push('/login');
            }
        } catch (error) {
            console.error('Token validation error:', error);
            setIsValid(false);
            localStorage.removeItem('remembered');
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        validateToken();
        const interval = setInterval(validateToken, 60000);
        return () => clearInterval(interval);
    }, [validateToken]);

    return (
        <AuthContext.Provider value={{ isValid, validateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};