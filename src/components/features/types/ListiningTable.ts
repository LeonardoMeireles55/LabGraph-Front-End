import { ListingItem } from '@/components/charts/types/Chart';

export interface PageLinks {
  first?: { href: string };
  next?: { href: string };
  last?: { href: string };
  'current-page'?: { href: string };
  prev?: { href: string };
}

export interface ListingTableProps {

  items: ListingItem[];

  pageInfos: any;

  onPageChange: (url: string) => Promise<void>;

}

