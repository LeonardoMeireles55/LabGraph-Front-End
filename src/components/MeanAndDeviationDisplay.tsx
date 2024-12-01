import React from 'react';

interface MeanAndDeviationDisplayProps {
  mean: number;
  sd: number;
  ownMean: number;
  ownSd: number;
  unitValue: string;
}

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({ mean, sd, ownMean, ownSd, unitValue }) => {
  return (
    <><div className="flex flex-col text-xs p-0 gap-0 m-0 text-textSecondary">
      <span>Média Bula: </span>
      <span className='text-xs text-textPrimary'>{" " +  mean.toFixed(2)+ " "}{unitValue}</span>
      <span>Desvio Bula: </span>
      <span className='text-xs text-textPrimary'>{" " + sd.toFixed(2)+ " "}{unitValue}</span>
    </div><div className="flex flex-col text-xs p-0 gap-0 m-0 text-textSecondary">
        <span> Média Calculada: </span>
        <span className='text-xs text-textPrimary'>{" " + (typeof ownMean === 'number' && !isNaN(ownMean) ? ownMean.toFixed(2)+ " " : 0)}{unitValue}</span>
        <span> Desvio Calculado: </span>
        <span className='text-xs text-textPrimary'>{" " + (typeof ownSd === 'number' && !isNaN(ownSd) ? ownSd.toFixed(2)+ " " : 0)}{unitValue}</span> 
      </div></>

  );
};

export default MeanAndDeviationDisplay;
