// components/MeanAndDeviationDisplay.tsx
import React from 'react';

interface MeanAndDeviationDisplayProps {
  mean: number;
  sd: number;
  ownMean: number;
  ownSd: number;
}

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({ mean, sd, ownMean, ownSd }) => {
  return (
    <><div className="flex flex-col text-sm p-0 gap-0 m-0 text-gray-200">
      <span>Média Bula: <span className='text-sm text-gray-50'>{" " +  mean.toFixed(2)}</span></span>
      <span>Desvio Bula: <span className='text-sm text-gray-50'>{" " + sd.toFixed(2)}</span></span>
    </div><div className="flex flex-col text-sm p-0 gap-0 m-0 text-gray-200">
        <span>| Média Calculada: <span className='text-sm text-gray-50'>{" " + ownMean.toFixed(2)}</span></span>
        <span>| Desvio Calculado: <span className='text-sm text-gray-50'>{" " + ownSd.toFixed(2)}</span></span>
      </div></>

  );
};

export default MeanAndDeviationDisplay;
