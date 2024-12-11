import { useEffect, useState } from 'react';

// Definindo as cores para light e dark modes
const lightColors = {
    primary: '#3B82F6',       // Soft, professional blue with better contrast
    secondary: '#10B981',     // Vibrant, clean green
    accent: '#F59E0B',        // Warm, slightly muted yellow-orange
    danger: '#EF4444',        // Clear, assertive red
    background: '#F9FAFB',    // Ultra-light, soft gray-white
    surface: '#FFFFFF',       // Pure white surface for clean contrast
    muted: '#E5E7EB',         // Soft, light gray for secondary elements
    textPrimary: '#111827',   // Very dark blue-gray for primary text
    textSecondary: '#4B5563', // Softer gray for secondary text
    gridLines: 'rgba(209, 213, 219, 0.5)', // Soft, light grid lines
    border: '#D1D5DB',        // Clean, light border color
    meanLine: 'rgba(16, 185, 129, 0.8)',   // Green with transparency
    sd1: 'rgba(245, 158, 11, 0.8)',        // Amber for first standard deviation
    sd2: 'rgba(124, 58, 237, 0.8)',        // Deep purple for third standard deviation
    sd3: 'rgba(239, 68, 68, 0.8)',         // Red for second standard deviation
    shadow: 'rgba(0, 0, 0, 0.08)', // Subtle shadow for depth
    overlay: 'rgba(0, 0, 0, 0.04)', // Light overlay for subtle interactions
    navbar: '#F3F4F6',        // Very light gray for navbar
    white: '#FFFFFF',         // Pure white
    green: '#10B981',         // Consistent green for positive actions
};

const darkColors = {
    primary: '#2563EB',       // Rich, deep blue
    secondary: '#059669',     // Deep, saturated green
    accent: '#D97706',        // Deep amber
    danger: '#DC2626',        // Intense, clear red
    background: '#0F172A',    // Very dark blue-black
    surface: '#1E293B',       // Slightly lighter dark blue-gray
    muted: '#475569',         // Medium dark gray
    textPrimary: '#F9FAFB',   // Almost white for primary text
    textSecondary: '#CBD5E1', // Soft, light blue-gray
    gridLines: 'rgba(255, 255, 255, 0.1)', // Very subtle grid lines
    border: '#334155',        // Dark, subtle border
    meanLine: 'rgba(16, 185, 129, 0.9)',   // Bright green
    sd1: 'rgba(245, 158, 11, 0.9)',        // Bright amber
    sd2: 'rgba(239, 68, 68, 0.9)',         // Bright red
    sd3: 'rgba(139, 92, 246, 0.9)',        // Bright purple
    shadow: 'rgba(0, 0, 0, 0.3)',  // More pronounced shadow
    overlay: 'rgba(255, 255, 255, 0.05)',
    navbar: '#F3F4F6',        // Very light gray for navbar
    white: '#FFFFFF',         // Pure white
    green: '#10B981',         // Consistent green for positive actions 
};

const useColors = () => {
    const [colors, setColors] = useState(lightColors);

    useEffect(() => {
        // Verifique o tema salvo no localStorage
        const savedTheme = localStorage.getItem('theme');

        // Caso já tenha algo salvo no localStorage, use isso
        if (savedTheme === 'dark') {
            setColors(darkColors);
        } else {
            setColors(lightColors);
        }
    }, []); // O primeiro useEffect é para definir a cor inicial

    const changeTheme = (theme: string) => {
        console.log('Changing theme to:', theme);
        if (theme === 'dark') {
            setColors(darkColors);
            localStorage.setItem('theme', 'dark');
        } else {
            setColors(lightColors);
            localStorage.setItem('theme', 'light');
        }
    };

    return { colors, changeTheme };  // Exponha a função para mudar o tema também
};

export default useColors;