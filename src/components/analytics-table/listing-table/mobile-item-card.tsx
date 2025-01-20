
import React from 'react';
import { ListingItem } from '@/components/charts/types/Chart';

interface MobileItemCardProps {
  item: ListingItem;
}

const MobileItemCard: React.FC<MobileItemCardProps> = ({ item }) => {
  return (
    <div className='p-2 border rounded-md shadow-md border-border bg-surface'>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Test: <span className='text-textPrimary'>{item.name}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Level: <span className='text-textPrimary'>{item.level}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Standard Deviation: <span className='text-textPrimary'>{item.sd.toFixed(2)}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Mean: <span className='text-textPrimary'>{item.mean.toFixed(2)}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Date: <span className='text-textPrimary'>{item.date}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Values: <span className='text-textPrimary'>{item.value.toFixed(2)}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Unit: <span className='text-textPrimary'>{item.unit_value}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Rules: <span className='text-textPrimary'>{item.rules}</span>
      </p>
    </div>
  );
};

export default MobileItemCard;