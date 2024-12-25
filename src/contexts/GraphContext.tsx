import React, { createContext, useContext, useState } from 'react';

type ViewMode = 'single' | 'dual';

interface GraphContextType {
    viewMode: ViewMode;
    toggleView: () => void;
    setViewMode: (mode: ViewMode) => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('single');

    const toggleView = () => {
        setViewMode(current => current === 'single' ? 'dual' : 'single');
    };

    return (
        <GraphContext.Provider value={{ viewMode, toggleView, setViewMode }}>
            {children}
        </GraphContext.Provider>
    );
};

export const useGraph = () => {
    const context = useContext(GraphContext);
    if (!context) throw new Error('useGraph must be used within a GraphProvider');
    return context;
};
