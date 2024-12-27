import formatDateWithTime from '../../commons/date-selector/constants/formatDateWithTime';
import UrlAnalyticsByNameAndDateProps from '../types/urlAnalyticsByNameAndDateProps';
import testFormatFix from './testFormatFix';


const urlByNameAndDate = (props: UrlAnalyticsByNameAndDateProps) => {
    const { analyticsType, name, date, levelSize } = props;

    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/search/date-range?name=`;
    const meanAndDeviationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/mean-standard-deviation?name=`;

    const startDate = formatDateWithTime(date.initialYear, date.initialMonth, date.initialDay);
    const endDate = formatDateWithTime(date.secondYear, date.secondMonth, date.secondDay);

    const urls: string[] = [];
    const meanDeviationUrls: string[] = [];

    for (let level = 1; level <= levelSize; level++) {
        urls.push(`${baseUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`);
        meanDeviationUrls.push(`${meanAndDeviationUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`);
    }

    return { urls, meanDeviationUrls };
};

export default urlByNameAndDate;