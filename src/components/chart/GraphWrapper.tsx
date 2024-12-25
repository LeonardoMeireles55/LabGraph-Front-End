import React, { useState } from 'react';
import { LabGraphProps } from '../../types/chartInterfaces';
import LabGraph from './LabGraph';
import DualLineLabGraph from './DualLineLabGraph';
import { TbChartLine, TbChartAreaLine } from 'react-icons/tb';

const GraphWrapper: React.FC<LabGraphProps> = ({ testList, analyticsType }) => {

    const [isDualView, setIsDualView] = useState(false);

    return (
        <div className="relative w-full">
            {isDualView ? (
                <DualLineLabGraph testList={testList} analyticsType={analyticsType} />
            ) : (
                <LabGraph testList={testList} analyticsType={analyticsType} />
            )}
            <button
                onClick={() => setIsDualView(!isDualView)}
                className="absolute right-20 md:right-20 top-4 md:top-5 z-50 flex items-center  p-1 md:p-1.5 shadow-xl rounded-full hover:scale-105"
                title={isDualView ? "Single view" : "Dual view"}
            >
                <span className="text-textPrimary hover:text-textSecondary">
                    {isDualView ? (
                        <TbChartLine className="h-6 w-6" />
                    ) : (
                        <TbChartAreaLine className="h-6 w-6" />
                    )}
                </span>
            </button>
        </div>
    );
};

export default GraphWrapper;
