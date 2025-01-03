import Dates from './dates';

export default interface UrlAnalyticsByNameAndDateLevelProps {
  analyticsType: string;
  name: string;
  level: number;
  date: Dates;
}
