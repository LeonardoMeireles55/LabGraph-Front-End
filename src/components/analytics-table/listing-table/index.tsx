import React from 'react';
import { ListingTableProps } from '../../features/types/ListiningTable';
import MobileItemCard from './mobile-item-card';
import TableRow from './table-row';

const tableHeaders = [
  'Date',
  'Test',
  'Level',
  'Lot',
  'Standard Deviation',
  'Mean',
  'Values',
  'Unit',
  'Rules',
];

const ListingTable: React.FC<ListingTableProps> = ({ items }) => {
  return (
    <div className='flex flex-col justify-between w-full h-min rounded-lg shadow-xl'>
      <table className='hidden bg-surface md:table'>
        <thead className='bg-muted rounded-lg'>
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
      <div className='grid content-center justify-center grid-cols-4 px-2 text-center md:hidden'>
        {items.map((item, index) => (
          <MobileItemCard key={index} item={item} />
        ))}
      </div>
      {items.length === 0 ? (
        <div className='py-2 text-center bg-surface text-textSecondary'>
          please select another date range and level.
        </div>
      ) : null}
    </div>
  );
};

export default ListingTable;
