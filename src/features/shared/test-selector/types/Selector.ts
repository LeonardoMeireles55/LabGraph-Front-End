import { LevelGroupResponse, ListingItem } from '@/features/charts/types/Chart';

export interface CommonTestSelectorProps {
  list: string[];
  analyticsType: string;
  name: string;
  level: number;
  setListingItem: (data: ListingItem[]) => void;
  isLoading: (data: boolean) => void;
}

export interface TestSelectorProps {
  analyticsType: string;
  list: string[];
  name: string;
  setListinig: (data: LevelGroupResponse[]) => void;
}
