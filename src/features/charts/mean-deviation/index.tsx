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
    <div className='mt:mt-4 flex w-full flex-col text-xs font-light text-textPrimary md:ml-8 md:mt-0 md:flex-row md:gap-2'>
      <div className='flex flex-row justify-start md:flex-col'>
        <span>Mean (Reference):</span>
        <span className='text-textPrimary'>
          {mean ? mean.toFixed(2) + (unitValue ? ` (${unitValue})` : '') : ' '}
        </span>
      </div>
      <div className='flex flex-row justify-start md:flex-col'>
        <span>Deviation (Reference):</span>
        <span className='text-textPrimary'>
          {sd ? sd.toFixed(2) + (unitValue ? ` (${unitValue})` : '') : ' '}
        </span>
      </div>
      <div className='flex flex-row justify-start md:flex-col'>
        <span>Calculated Mean:</span>
        <span className='text-textPrimary'>
          {typeof ownMean === 'number' && !isNaN(ownMean)
            ? ownMean.toFixed(2) + (unitValue ? ` (${unitValue})` : '')
            : ''}
        </span>
      </div>
      <div className='flex flex-row justify-start md:flex-col'>
        <span>Calculated Deviation:</span>
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
