import formatDateWithTime from '../utils/formatDateWithTime';
import testFormatFix from '../utils/testFormatFix';

interface Dates {
    initialDay: number;
    initialMonth: number;
    initialYear: number;
    secondDay: number;
    secondMonth: number;
    secondYear: number;
}

interface GenerateUrlAnalyticsByNameAndDate {
    analyticsType: string;
    name: string;
    level: number;
    date: Dates;
}

const generateUrlAnalyticsByNameAndDate = (props: GenerateUrlAnalyticsByNameAndDate) => {
    const { analyticsType, name, level, date } = props;

    const baseUrl = `https://leomeireles-dev.xyz/api/${analyticsType}/results/search/date-range?name=`;
    const meanAndDeviationUrl = `https://leomeireles-dev.xyz/api/${analyticsType}/results/mean-standard-deviation?name=`;

    const startDate = formatDateWithTime(date.initialYear, date.initialMonth, date.initialDay);
    const endDate = formatDateWithTime(date.secondYear, date.secondMonth, date.secondDay);

    const url = `${baseUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`;
    const urlMeanAndDeviation = `${meanAndDeviationUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`;

    return { url, urlMeanAndDeviation };
};

export default generateUrlAnalyticsByNameAndDate;
