import Dates from "./dates";

export interface UrlAnalyticsByNameAndDateProps {
    analyticsType: string;
    name: string;
    levelSize: number;
    date: Dates;
}

export interface UrlAnalyticsByNameAndDatePropsNew {
    analyticsType: string;
    name: string;
    date: Dates;
}