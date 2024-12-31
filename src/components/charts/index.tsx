import React from 'react';
import { LabGraphProps } from './types/Chart';
import LabGraph from './single-line';
import MultipleLineLabGraph from './multiple-line';
import { useGraph } from '@/contexts/GraphContext';

const GraphWrapper: React.FC<LabGraphProps> = ({ testList, analyticsType, levelListSize }) => {
    const { viewMode } = useGraph();

    const Graph = viewMode === 'single' ? LabGraph : MultipleLineLabGraph;

    return (
            <Graph levelListSize={levelListSize} testList={testList} analyticsType={analyticsType}   />
    );
};

export default GraphWrapper;
