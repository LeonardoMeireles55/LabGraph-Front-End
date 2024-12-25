import React from 'react';
import { LabGraphProps } from '../../types/chartInterfaces';
import LabGraph from './LabGraph';
import MultipleLineLabGraph from './MultipleLineLabGraph';
import { useGraph } from '@/contexts/GraphContext';

const GraphWrapper: React.FC<LabGraphProps> = ({ testList, analyticsType, levelListSize }) => {
    const { viewMode } = useGraph();

    const Graph = viewMode === 'single' ? LabGraph : MultipleLineLabGraph;

    return (
        <div className="relative w-full">
            <Graph levelListSize={levelListSize} testList={testList} analyticsType={analyticsType}   />
        </div>
    );
};

export default GraphWrapper;
