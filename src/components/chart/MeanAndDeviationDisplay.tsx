import React from 'react';
import { MeanAndDeviationDisplayProps } from '../../types/chartInterfaces';

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({ mean, sd, ownMean, ownSd, unitValue }) => {
    return (
        <div className="flex w-full flex-row gap-2 text-xs font-light text-textPrimary">
            <div className="flex flex-col">
                <span>Média Bula:</span>
                <span className="text-textPrimary">
                    {mean ? mean.toFixed(2) + (unitValue ? ` (${unitValue})` : '') : ' '}
                </span>
                <span>Desvio Bula:</span>
                <span className="text-textPrimary">
                    {sd ? sd.toFixed(2) + (unitValue ? ` (${unitValue})` : '') : ' '}
                </span>
            </div>
            <div className="flex flex-col">
                <span>Média Calculado:</span>
                <span className="text-textPrimary">
                    {typeof ownMean === 'number' && !isNaN(ownMean)
                        ? ownMean.toFixed(2) + (unitValue ? ` (${unitValue})` : '')
                        : ''}
                </span>
                <span>Desvio Calculado:</span>
                <span className="text-textPrimary">
                    {typeof ownSd === 'number' && !isNaN(ownSd)
                        ? ownSd.toFixed(2) + (unitValue ? ` (${unitValue})` : '')
                        : ''}
                </span>
            </div>
        </div>
    );
};

export default MeanAndDeviationDisplay;
