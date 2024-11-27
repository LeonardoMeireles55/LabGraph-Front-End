import React from 'react';

interface MeanAndDeviationDisplayProps {
  mean: number;
  sd: number;
  ownMean: number;
  ownSd: number;
}

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({ mean, sd, ownMean, ownSd }) => {
  return (
    <><div className="flex flex-col text-sm p-0 gap-0 m-0 text-textSecondary">
      <span>Média Bula: <span className='text-sm text-textPrimary'>{" " +  mean.toFixed(2)}</span></span>
      <span>Desvio Bula: <span className='text-sm text-textPrimary'>{" " + sd.toFixed(2)}</span></span>
    </div><div className="flex flex-col text-sm p-0 gap-0 m-0 text-textSecondary">
        <span>| Média Calculada: <span className='text-sm text-textPrimary'>{" " + (typeof ownMean === 'number' && !isNaN(ownMean) ? ownMean.toFixed(2) : 0)}</span></span>
        <span>| Desvio Calculado: <span className='text-sm text-textPrimary'>{" " + (typeof ownSd === 'number' && !isNaN(ownSd) ? ownSd.toFixed(2) : 0)}</span></span>
      </div></>

  );
};

export default MeanAndDeviationDisplay;
