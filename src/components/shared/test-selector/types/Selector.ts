import { LevelGroupResponse, ListingItem } from '@/components/charts/types/Chart';

export interface CommonTestSelectorProps {
  list: string[];
  analyticsType: string;
  name: string;
  level: number;
  setListingItem: (data: ListingItem[]) => void;
}

export interface TestSelectorProps {
  analyticsType: string;
  list: string[];
  name: string;
  setListinig: (data: LevelGroupResponse[]) => void;
}
