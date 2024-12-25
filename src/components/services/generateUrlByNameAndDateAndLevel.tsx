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

const generateUrlAnalyticsByNameAndDateAndLevel = (props: GenerateUrlAnalyticsByNameAndDate) => {
    const { analyticsType, name, level, date } = props;

    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/search/date-range?name=`;
    const meanAndDeviationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/mean-standard-deviation?name=`;

    const startDate = formatDateWithTime(date.initialYear, date.initialMonth, date.initialDay);
    const endDate = formatDateWithTime(date.secondYear, date.secondMonth, date.secondDay);

    const url = `${baseUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`;
    const urlMeanAndDeviation = `${meanAndDeviationUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`;

    return { url, urlMeanAndDeviation };
};

export default generateUrlAnalyticsByNameAndDateAndLevel;