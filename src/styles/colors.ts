const lightColors = {
    // Primary Colors - More Refined and Balanced
    primary: '#3B82F6',       // Soft, professional blue with better contrast
    secondary: '#10B981',     // Vibrant, clean green
    accent: '#F59E0B',        // Warm, slightly muted yellow-orange
    danger: '#EF4444',        // Clear, assertive red
    
    // Neutral Colors - Enhanced Depth and Subtlety
    background: '#F9FAFB',    // Ultra-light, soft gray-white
    surface: '#FFFFFF',       // Pure white surface for clean contrast
    muted: '#E5E7EB',         // Soft, light gray for secondary elements
    // navbar: '#3B82F6',
    
    // Text Colors - Improved Readability
    textPrimary: '#111827',   // Very dark blue-gray for primary text
    textSecondary: '#4B5563', // Softer gray for secondary text
    
    // Accent Utilities
    gridLines: 'rgba(209, 213, 219, 0.5)', // Soft, light grid lines
    border: '#D1D5DB',        // Clean, light border color
    
    // Data Visualization Colors - Balanced and Accessible
    meanLine: 'rgba(16, 185, 129, 0.8)',   // Green with transparency
    sd1: 'rgba(245, 158, 11, 0.8)',        // Amber for first standard deviation
    sd3: 'rgba(239, 68, 68, 0.8)',         // Red for second standard deviation
    sd2: 'rgba(124, 58, 237, 0.8)',        // Deep purple for third standard deviation
    
    // Additional Utilities
    navbar: '#F3F4F6',        // Very light gray for navbar
    white: '#FFFFFF',         // Pure white
    green: '#10B981',         // Consistent green for positive actions
    
    // New Additions for Enhanced Depth
    shadow: 'rgba(0, 0, 0, 0.08)', // Subtle shadow for depth
    overlay: 'rgba(0, 0, 0, 0.04)' // Light overlay for subtle interactions
};

const darkColors = {
    // Primary Colors - Deep and Sophisticated
    primary: '#2563EB',       // Rich, deep blue
    secondary: '#059669',     // Deep, saturated green
    accent: '#D97706',        // Deep amber
    danger: '#DC2626',        // Intense, clear red
    
    // Neutral Colors - Rich Dark Tones
    background: '#0F172A',    // Very dark blue-black
    surface: '#1E293B',       // Slightly lighter dark blue-gray
    muted: '#475569',         // Medium dark gray
    
    // Text Colors - Optimized for Dark Mode
    textPrimary: '#F9FAFB',   // Almost white for primary text
    textSecondary: '#CBD5E1', // Soft, light blue-gray
    
    // Accent Utilities
    gridLines: 'rgba(255, 255, 255, 0.1)', // Very subtle grid lines
    border: '#334155',        // Dark, subtle border
    
    // Data Visualization Colors - Vibrant in Dark Mode
    meanLine: 'rgba(16, 185, 129, 0.9)',   // Bright green
    sd1: 'rgba(245, 158, 11, 0.9)',        // Bright amber
    sd2: 'rgba(239, 68, 68, 0.9)',         // Bright red
    sd3: 'rgba(139, 92, 246, 0.9)',        // Bright purple
    
    // Additional Utilities
    navbar: '#1E293B',        // Dark blue-gray for navbar
    white: '#FFFFFF',         // Pure white (consistent with light theme)
    green: '#059669',         // Deep green for positive actions
    
    // New Additions for Dark Mode Depth
    shadow: 'rgba(0, 0, 0, 0.3)',  // More pronounced shadow
    overlay: 'rgba(255, 255, 255, 0.05)' // Subtle light overlay
};

export default { lightColors, darkColors };