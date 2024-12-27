import Dates from "./dates";

export default interface UrlAnalyticsByNameAndDateProps {
    analyticsType: string;
    name: string;
    levelSize: number;
    date: Dates;
}