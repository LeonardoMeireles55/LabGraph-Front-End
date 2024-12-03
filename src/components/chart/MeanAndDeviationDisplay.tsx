import React from 'react';

interface MeanAndDeviationDisplayProps {
  mean: number;
  sd: number;
  ownMean: number | null;
  ownSd: number | null;
  unitValue: string | null;
}

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({ mean, sd, ownMean, ownSd, unitValue }) => {
  return (
    <div className="w-full flex flex-row text-xs gap-4 text-textSecondary">
      <div className="flex flex-col">
        <span>Média Bula:</span>
        <span className="text-textPrimary">{mean.toFixed(2) + " "}{unitValue}</span>
        <span>Desvio Bula:</span>
        <span className="text-textPrimary">{sd.toFixed(2) + " "}{unitValue}</span>
      </div>
      <div className="flex flex-col">
        <span>Média Calculado:</span>
        <span className="text-textPrimary">
          {typeof ownMean === 'number' && !isNaN(ownMean) ? ownMean.toFixed(2) + " " : "0"}{unitValue}
        </span>
        <span>Desvio Calculado:</span>
        <span className="text-textPrimary">
          {typeof ownSd === 'number' && !isNaN(ownSd) ? ownSd.toFixed(2) + " " : "0"}{unitValue}
        </span>
      </div>
    </div>
  );
};

export default MeanAndDeviationDisplay;
