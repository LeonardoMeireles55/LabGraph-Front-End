import Loading from '@/components/shared/utils/components/loading';
import React from 'react';
import { ListingTableProps } from '../../features/types/ListiningTable';
import MobileItemCard from './mobile-item-card';
import TableRow from './table-row';

const tableHeaders = [
  'Date',
  'Test',
  'Level Test',
  'Lot Number',
  'Standard Deviation',
  'Mean Test',
  'Values',
  'Unit',
  'Rules',
];

const ListingTable: React.FC<ListingTableProps> = ({ items }) => {
  return (
    <div className='flex h-min w-full flex-col justify-between'>
      <table className='hidden rounded-md bg-surface shadow-md shadow-shadow md:table'>
        <thead className='rounded-lg bg-muted'>
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className='border-b border-border px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <TableRow key={index} item={item} />
          ))}
        </tbody>
      </table>
      <div className='grid grid-cols-4 place-content-center gap-4 px-2 text-center md:hidden'>
        {items.map((item, index) => (
          <MobileItemCard key={index} item={item} />
        ))}
      </div>
      {items.length === 0 ? (
        <div className=' rounded-md py-2 text-center text-textSecondary md:shadow-md md:shadow-shadow'>
          <Loading />
        </div>
      ) : null}
    </div>
  );
};

export default ListingTable;
