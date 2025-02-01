import { ListingItem } from '@/components/charts/types/Chart';

export interface PageLinks {
  first?: { href: string };
  next?: { href: string };
  last?: { href: string };
  'current-page'?: { href: string };
  currentPage?: { href: string };
  totalPages?: { href: string };
  prev?: { href: string };
}

export interface ListingTableProps {
  items: ListingItem[];
  onPageChange: (url: string) => Promise<void>;
  isLoading: boolean;
}
