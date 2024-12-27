import formatDateWithTime from '../../commons/date-selector/constants/formatDateWithTime';
import testFormatFix from './testFormatFix';
import UrlAnalyticsByNameAndDateLevelProps from '../types/urlAnalyticsByNameAndDateLevelProps';

const urlAnalyticsByNameAndDateAndLevel = (props: UrlAnalyticsByNameAndDateLevelProps) => {
    const { analyticsType, name, level, date } = props;

    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/search/date-range?name=`;
    const meanAndDeviationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/mean-standard-deviation?name=`;

    const startDate = formatDateWithTime(date.initialYear, date.initialMonth, date.initialDay);
    const endDate = formatDateWithTime(date.secondYear, date.secondMonth, date.secondDay);

    const url = `${baseUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`;
    const urlMeanAndDeviation = `${meanAndDeviationUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`;

    return { url, urlMeanAndDeviation };
};

export default urlAnalyticsByNameAndDateAndLevel;