import React from 'react';
import { ListingTableProps } from '../../features/types/ListiningTable';
import TableRow from './table-row';
import MobileItemCard from './mobile-item-card';

const tableHeaders = [
  'Date',
  'Test',
  'Level',
  'Lot',
  'Standard Deviation',
  'Mean',
  'Values',
  'Unit',
  'Rules'
];

const ListingTable: React.FC<ListingTableProps> = ({ items }) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <p className='text-textPrimary bg-danger p-2 rounded-md'>Error: No data available or invalid data format.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-between w-full h-min rounded-lg shadow-xl'>
      <table className='hidden bg-background md:table'>
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

      {items.length === 0 && (
        <div className='py-2 text-center bg-background text-muted'>No items to display</div>
      )}
    </div>
  );
};

export default ListingTable;
