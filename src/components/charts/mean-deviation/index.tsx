import React from 'react';
import { MeanAndDeviationDisplayProps } from '../types/Chart';

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({
  mean,
  sd,
  ownMean,
  ownSd,
  unitValue,
}) => {
  return (
    <div className='mt:mt-4 md:ml-8 flex w-full flex-col md:gap-2 text-xs font-light text-textPrimary md:mt-0 md:flex-row'>
      <div className='flex flex-row justify-start md:flex-col'>
        <span>Média Bula:</span>
        <span className='text-textPrimary'>
          {mean ? mean.toFixed(2) + (unitValue ? ` (${unitValue})` : '') : ' '}
        </span>
      </div>
      <div className='flex flex-row justify-start md:flex-col'>
        <span>Desvio Bula:</span>
        <span className='text-textPrimary'>
          {sd ? sd.toFixed(2) + (unitValue ? ` (${unitValue})` : '') : ' '}
        </span>
      </div>
      <div className='flex flex-row justify-start md:flex-col'>
        <span>Média Calculado:</span>
        <span className='text-textPrimary'>
          {typeof ownMean === 'number' && !isNaN(ownMean)
            ? ownMean.toFixed(2) + (unitValue ? ` (${unitValue})` : '')
            : ''}
        </span>
      </div>
      <div className='flex flex-row justify-start md:flex-col'>
        <span>Desvio Calculado:</span>
        <span className='text-textPrimary'>
          {typeof ownSd === 'number' && !isNaN(ownSd)
            ? ownSd.toFixed(2) + (unitValue ? ` (${unitValue})` : '')
            : ''}
        </span>
      </div>
    </div>
  );
};

export default React.memo(MeanAndDeviationDisplay);
