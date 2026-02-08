import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes, Region, ThemeMode } from '../styles/themes';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
    region: Region;
    setRegion: (region: Region) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Theme Mode State
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem('app-theme') as ThemeMode;
        if (savedTheme) return savedTheme;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    });

    // Region State
    const [region, setRegion] = useState<Region>(() => {
        const savedRegion = localStorage.getItem('app-region') as Region;
        return savedRegion || 'Global';
    });

    // Effect: Apply Theme & Region
    useEffect(() => {
        localStorage.setItem('app-theme', theme);
        localStorage.setItem('app-region', region);

        const root = document.documentElement;
        const currentTheme = themes[region] || themes['Global'];

        // 1. Apply Dark Mode Class
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // 2. Apply CSS Variables for Colors
        // Primary Colors
        Object.entries(currentTheme.palette.primary).forEach(([shade, value]) => {
            root.style.setProperty(`--color-primary-${shade}`, value);
        });

        // Secondary Colors
        Object.entries(currentTheme.palette.secondary).forEach(([shade, value]) => {
            root.style.setProperty(`--color-secondary-${shade}`, value);
        });

        // Accent Colors
        if (currentTheme.palette.accent) {
            Object.entries(currentTheme.palette.accent).forEach(([shade, value]) => {
                root.style.setProperty(`--color-accent-${shade}`, value);
            });
        }

        // You can extend this for other palette types (success, warning, etc.)

    }, [theme, region]);

    // Effect: Auto-detect Region (if not set)
    useEffect(() => {
        const saved = localStorage.getItem('app-region');
        if (!saved) {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // Simple heuristic mapping
            if (timeZone.includes('Calcutta') || timeZone.includes('Asia/Kolkata')) {
                setRegion('India');
            } else if (timeZone.includes('America')) {
                setRegion('USA');
            } else {
                setRegion('Global');
            }
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, region, setRegion }}>
            {children}
        </ThemeContext.Provider>
    );
};
