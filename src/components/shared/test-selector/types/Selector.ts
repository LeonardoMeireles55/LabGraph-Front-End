import { ListingsData } from "@/components/charts/types/Chart";

export interface TestSelectorProps {
    list: string[];
    analyticsType: string;
    name: string;
    level?: number;
    setDataJson: (data: any) => void;
}

export interface TestSelectorProps {
    levelListSize: number;
    list: string[];
    analyticsType: string;
    name: string;
    setListinig: (data: ListingsData) => void;
}
